import {EventEmitter} from 'events';

import createStreamParser from 'xml-flow';
const {ALWAYS: streamParserAlways} = createStreamParser;

import ConversionError from './convert/conversionError.js';

import convertRecord from './convert/index.js';
import createValidator from '../validate.js';
import filterAndCreateValueInterface from './filter/index.js';

import {convertToObject, getMetadataHeader, getRecordMetadata} from './xmlParser.js';
import {getAllValuesInContext, parseHeaderInformation} from './convert/util/index.js';

import {sourceConfig} from '../constants.js';


class TransformEmitter extends EventEmitter { }

/**
 * Transform handler is an EventEmitter that emits the following signals:
 *   - record = record was transformed or transformation of individual record failed.
 *   - end = all records have been tranformed. Emits number of records as value.
 *   - error = transformation process resulted into an fatal error. Emits the error as value.
 */
export default convertOpts => (stream, {validate = true, fix = true} = {}) => {
  const Emitter = new TransformEmitter();
  const validateRecord = createValidator();
  readStream(stream);

  return Emitter;

  function readStream(stream) {
    const xmlRecordEntries = [];
    let numberOfRecords = 0;
    let harvestSource = false;

    // Used for deduplication
    let identifiersProcessed = [];

    // Parsing as stream to avoid holding full XML in memory
    createStreamParser(stream, {
      strict: true,
      trim: false,
      normalize: false,
      preserveMarkup: streamParserAlways,
      simplifyNodes: false,
      useArrays: streamParserAlways
    })
      .on('error', err => Emitter.emit('error', err))
      .on('tag:record', xmlRecordEntry => xmlRecordEntries.push(xmlRecordEntry))
      .on('end', async () => {
        await Promise.all(xmlRecordEntries.map(xmlRecordEntry => processRecord(xmlRecordEntry)));
        Emitter.emit('end', numberOfRecords);
      });

    function emitUniqueRecord(emitter, result, errPayload) {
      const {identifiers} = errPayload;
      if (identifiersProcessed.some(i => identifiers.includes(i))) {
        throw new ConversionError(errPayload, 'Record has already been processed once within the current blob (not allowing duplicates).');
      }

      identifiers.forEach(identifier => {
        identifiersProcessed.push(identifier);
      });

      return emitter.emit('record', result);
    }

    async function processRecord(xmlRecordEntry) {
      try {
        // Destructuring to get the header + metadata from the xml parsed to object
        const xmlObject = await convertToObject(xmlRecordEntry);
        const headerValue = getMetadataHeader(xmlObject?.record?.header);
        const recordMetadata = getRecordMetadata(xmlObject?.record?.metadata);

        if (!headerValue) {
          throw new Error('Could not find header information for record, cannot process');
        }

        if (!recordMetadata) {
          throw new Error('Could not find record metadata to transform, cannot process');
        }

        // Header contains information regarding source and date of harvest
        const headerInformation = parseHeaderInformation(headerValue);

        // Set harvest source if it has not yet been set for the package
        if (!harvestSource) {
          harvestSource = headerInformation?.identifier?.source;
        }

        const mandatorySourceConfig = ['fSID', 'f884'];

        if (!harvestSource || !Object.keys(sourceConfig).includes(harvestSource) || !mandatorySourceConfig.every(v => Object.keys(sourceConfig[harvestSource]).includes(v))) {
          throw new ConversionError({}, `Cannot find conversion configuration for the following harvest source or config is missing at least one of mandatory keys: ${harvestSource}`);
        }

        // Verify fSID generation includes both handle and uuid configurations
        const fSidConfiguration = sourceConfig[harvestSource].fSID;
        const fSidConfigurationContainsKeys = ['10024', '11111'].every(mandatoryKey => Object.keys(fSidConfiguration).includes(mandatoryKey));
        const fSidConfigurationIsValid = ['10024', '11111'].every(mandatoryKey => typeof fSidConfiguration[mandatoryKey] === 'string' && fSidConfiguration[mandatoryKey].length > 0 && fSidConfiguration[mandatoryKey].length < 6);

        if (!fSidConfigurationContainsKeys || !fSidConfigurationIsValid) {
          throw new ConversionError({}, 'Configuration for generating fSID is invalid. Please check the configuration contains handle and uuid keys with proper values');
        }

        const mandatoryFilterConfigSchema = ['type', 'active'];

        if (!harvestSource || !Object.keys(sourceConfig[harvestSource]).includes('filters') || !mandatoryFilterConfigSchema.every(v => Object.keys(sourceConfig[harvestSource].filters).includes(v))) {
          throw new ConversionError({}, `Cannot find filter configuration for the following harvest source or config is missing at least one of mandatory keys: ${harvestSource}`);
        }

        const {fieldValueInterface, filetype, commonErrorPayload} = filterAndCreateValueInterface(harvestSource, recordMetadata, sourceConfig[harvestSource].filters);
        const numberOfFiles = getAllValuesInContext(recordMetadata, 'kk:file').length;
        const convertedRecord = convertRecord({harvestSource, filetype, fieldValueInterface, convertOpts, numberOfFiles});

        if (validate === true || fix === true) {
          const validateFixResult = await validateRecord(convertedRecord, fix, validate, commonErrorPayload);
          return emitUniqueRecord(Emitter, validateFixResult, commonErrorPayload);
        }

        return emitUniqueRecord(Emitter, {record: convertedRecord}, commonErrorPayload);

      } catch (err) {
        if (err instanceof ConversionError) {
          // Common payload
          const {title = '', identifiers} = err.payload;

          // Note: emitting error does not halt process
          return Emitter.emit('record', {
            failed: true,
            title,
            standardIdentifiers: identifiers,
            message: err.message,
            messages: [err.message]
          });
        }

        // Unmanaged errors or managed errors that should halt processing
        // Are thrown here
        throw err;
      } finally {
        // Increment number of processed records whether the transformation results into error or not
        numberOfRecords += 1;
      }
    }
  }
};
