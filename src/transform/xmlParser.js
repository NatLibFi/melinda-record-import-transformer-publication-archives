import {Parser} from 'xml2js';
import {toXml} from 'xml-flow';
import ConversionError from './convert/conversionError';

/**
 * Convert XML to JS object
 * @param {object} node Read XML node as object
 * @returns Parsed JS object
 */
export function convertToObject(node) {
  const str = toXml(node);
  const fixedString = fixHtmlEntities(str);

  return toObject(fixedString); // NB: escaped quote seems to be something xmldom cannot handle

  function toObject(str) {
    return new Promise((resolve, reject) => {
      new Parser().parseString(str, (err, obj) => {
        if (err) {
          /* istanbul ignore next: Generic error */
          return reject(err);
        }

        resolve(obj);
      });
    });
  }
}

// XML parser cannot handle characters such as ", &, etc.
function fixHtmlEntities(str) {
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('\\"', '&quot;'); // NB: if you do it other way around, the amp replaceAll will break all other transformations
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
