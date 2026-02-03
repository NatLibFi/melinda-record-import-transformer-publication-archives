import xmlFlow from 'xml-flow';
import {convertToObject} from '../transform/xmlParser.js';

/**
 * Simulate transformer readableStream for reading DC record input.
 * @param {Readable} inputStream - input XML file as readable stream
 * @returns {Promise<Object>} - Object parsed from DC record using convertXML function
 */
export async function readTestInput(inputStream) {
  return new Promise((resolve, reject) => {
    let dcRecordFound = false;

    xmlFlow(inputStream, {
      strict: true,
      trim: false,
      normalize: false,
      preserveMarkup: xmlFlow.ALWAYS,
      simplifyNodes: false,
      useArrays: xmlFlow.ALWAYS
    })
      .on('tag:kk:metadata', async xmlElement => {
        dcRecordFound = true;
        resolve(xmlElement);
      })
      .on('error', error => reject(`Error occurred during stream read of XML input: ${error}`))
      .on('end', () => {
        if (!dcRecordFound) {
          reject('Could not find DC record in given input.');
        }
      });
  });
}