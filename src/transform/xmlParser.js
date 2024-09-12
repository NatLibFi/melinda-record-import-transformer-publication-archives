import {Parser} from 'xml2js';
import {toXml} from 'xml-flow';
import {DOMParser} from '@xmldom/xmldom';

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
