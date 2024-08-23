import {Parser} from 'xml2js';
import {toXml} from 'xml-flow';

/**
 * Convert XML to JS object
 * @param {string} node Read XML node
 * @returns Parsed JS object
 */
export function convertToObject(node) {
  const str = toXml(node);
  return toObject();

  function toObject() {
    return new Promise((resolve, reject) => {
      new Parser().parseString(str, (err, obj) => {
        if (err) {
          /* istanbul ignore next: Generic error */ return reject(err);
        }

        resolve(obj);
      });
    });
  }
}
