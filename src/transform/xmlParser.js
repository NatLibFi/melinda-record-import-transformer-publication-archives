import {Parser} from 'xml2js';
import {toXml} from 'xml-flow';
import {DOMParser} from '@xmldom/xmldom';
import ConversionError from './convert/conversionError';

/**
 * Convert XML to JS object
 * @param {object} node Read XML node as object
 * @returns Parsed JS object
 */
export function convertToObject(node) {
  const str = toXml(node);

  return toObject(str.replaceAll('\\"', '&quot;')); // NB: escaped quote seems to be something xmldom cannot handle

  function toObject(str) {
    return new Promise((resolve, reject) => {
      // NB: required for parsing entities such as &amp;
      // see https://stackoverflow.com/a/41943379
      const xmlString = new DOMParser().parseFromString(str, 'text/xml');

      new Parser().parseString(xmlString, (err, obj) => {
        if (err) {
          /* istanbul ignore next: Generic error */ return reject(err);
        }

        resolve(obj);
      });
    });
  }
}


export function getMetadataHeader(xmlObjectRecordHeader) {
  if (!xmlObjectRecordHeader || !Array.isArray(xmlObjectRecordHeader) || xmlObjectRecordHeader.length === 0) {
    throw new ConversionError({}, 'XML record header could not be read');
  }

  return xmlObjectRecordHeader[0];
}

export function getRecordMetadata(xmlObjectRecordMetadata) {
  // const {record: {header: [headerValue], metadata: [{'kk:metadata': [recordMetadata]}]}} = await convertToObject(xmlRecordEntry);

  if (!xmlObjectRecordMetadata || !Array.isArray(xmlObjectRecordMetadata) || xmlObjectRecordMetadata.length === 0) {
    throw new ConversionError({}, 'XML record metadata could not be read');
  }

  const [firstEntry] = xmlObjectRecordMetadata;
  if (typeof firstEntry !== 'object' || !Object.keys(firstEntry).includes('kk:metadata')) {
    throw new ConversionError({}, 'XML record metadata did not contain kk:metadata');
  }

  const kkMetadata = firstEntry['kk:metadata'];
  if (!Array.isArray(kkMetadata) || kkMetadata.lenght === 0) {
    throw new ConversionError({}, 'XML record metadata kk:metada was empty');
  }

  return kkMetadata[0];
}
