import {EventEmitter} from 'events';

import createStreamParser, {ALWAYS as streamParserAlways} from 'xml-flow';

import ConversionError from './convert/conversionError';

import convertRecord from './convert';
import createValidator from '../validate';
import filterAndCreateValueInterface from './filter';

import {convertToObject, getMetadataHeader, getRecordMetadata} from './xmlParser';
import {getAllValuesInContext, parseHeaderInformation} from './convert/util';

import {sourceConfig} from '../config';


class TransformEmitter extends EventEmitter { }

/**
 * Transform handler is an EventEmitter that emits the following signals:
 *   - record = record was transformed or transformation of individual record failed.
 *   - end = all records have been tranformed. Emits number of records as value.
 *   - error = transformation process resulted into an fatal error. Emits the error as value.
 */
export default convertOpts => (stream, {validate = true, fix = true} = {}) => {
  const {applyFilters, filterConfig} = convertOpts;

  const Emitter = new TransformEmitter();
  const validateRecord = createValidator();
  readStream(stream);

  return Emitter;

  function readStream(stream) {
    const xmlRecordEntries = [];
    let numberOfRecords = 0; // eslint-disable-line functional/no-let
    let harvestSource = false; // eslint-disable-line functional/no-let

    // Used for deduplication
    let identifiersProcessed = []; // eslint-disable-line functional/no-let,prefer-const

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
      .on('tag:record', xmlRecordEntry => xmlRecordEntries.push(xmlRecordEntry)) // eslint-disable-line functional/immutable-data
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
        identifiersProcessed.push(identifier); // eslint-disable-line functional/immutable-data
      });

      return emitter.emit('record', result);
    }


    // eslint-disable-next-line max-statements
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
        // eslint-disable-next-line functional/no-conditional-statements
        if (!harvestSource) {
          harvestSource = headerInformation?.identifier?.source;
        }

        const mandatorySourceConfig = ['fSID', 'f884'];
        if (!harvestSource || !Object.keys(sourceConfig).includes(harvestSource) || !mandatorySourceConfig.every(v => Object.keys(sourceConfig[harvestSource]).includes(v))) {
          throw new ConversionError({}, `Cannot find conversion configuration for the following harvest source or config is missing at least one of mandatory keys: ${harvestSource}`);
        }

        const {fieldValueInterface, filetype, commonErrorPayload} = filterAndCreateValueInterface(harvestSource, recordMetadata, applyFilters, filterConfig);
        const numberOfFiles = getAllValuesInContext(recordMetadata, 'kk:file').length;
        const convertedRecord = convertRecord({harvestSource, filetype, fieldValueInterface, convertOpts, numberOfFiles});

        if (validate === true || fix === true) {
          const validateFixResult = await validateRecord(convertedRecord, fix, validate);
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
            message: err.message
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
