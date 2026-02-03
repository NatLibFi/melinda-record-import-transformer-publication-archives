import assert from 'node:assert';
import {Readable} from 'node:stream';

import {READERS} from '@natlibfi/fixura';
import generateTests from '@natlibfi/fixugen';

import {readTestInput} from './read-test-record.js';
import {createValueInterface, getInputFields} from '../transform/convert/util/index.js';
import {convertToObject} from '../transform/xmlParser.js';

/**
 * Generates fixture test with following setup:
 * - Expects test function to take only one parameter: valueInterface
 * - Expects path to test root folder. Root folder should contain numbered test cases from 01 to max of 99.
 * - Expects each test to define input.xml which needs to contain <kk:metadata> as wrapper element and may contain multiple <kk:field> elements within the wrapper.
 * - Expects expected return value or error to be defined with metadata.json within test folder:
 *   - If expect to succeed, define as attribute "expectedValue". Note: for field generators you should use separate generator which will compare output against output.json which may contain MARC21 in JSON format.
 *   - If expect to fail, define as attribute "expectedError". Expectation will be of Error class having the defined message.
 * @param {string} testRootPath - path to test root
 * @param {string} testFn - function to run tests for
 * @returns {void} generates and runs the tests for given test root path and test function
 */
export function generateCommonFixtureTest(testRootPath, testFn) {
  generateTests({
    callback,
    path: testRootPath,
    recurse: false,
    useMetadataFile: true,
    fixura: {
      reader: READERS.TEXT,
      failWhenNotFound: true
    }
  });

  // This simulates the current state of processing loop but without having to wrap
  // XML into <record> and <metadata> elements to make test input files more concise
  async function callback({getFixture, expectedValue, expectedError}) {
    const inputXml = getFixture('input.xml');
    const inputStream = Readable.from(inputXml);

    const xmlMetadata = await readTestInput(inputStream);
    const xmlObject = await convertToObject(xmlMetadata);

    const inputFields = getInputFields(xmlObject['kk:metadata']);
    const valueInterface = createValueInterface(inputFields);

    if (expectedError) {
      assert.throws(() => testFn(valueInterface), Error(expectedError));
      return;
    }

    const result = testFn(valueInterface);
    assert.deepStrictEqual(result, expectedValue, 'Resulting value did not match expected value');
  }
}

/**
 * Generates fixture test with following setup:
 * - Expects test function to take only one parameter: valueInterface
 * - Expects path to test root folder. Root folder should contain numbered test cases from 01 to max of 99.
 * - Expects each test to define input.xml which needs to contain <kk:metadata> as wrapper element and may contain multiple <kk:field> elements within the wrapper.
 * - Expects output.json to contain MARC21 in JSON format that is expected as output to be located within test folder
 *   - If error is expected, define "expectedError" attribute to metadata.json
 * @param {string} testRootPath - path to test root
 * @param {string} testFn - function to run tests for
 * @returns {void} generates and runs the tests for given test root path and test function
 */
export function generateDatafieldFixtureTest(testRootPath, testFn) {
  generateTests({
    callback,
    path: testRootPath,
    recurse: false,
    useMetadataFile: true,
    fixura: {
      reader: READERS.TEXT,
      failWhenNotFound: true
    }
  });

  // This simulates the current state of processing loop but without having to wrap
  // XML into <record> and <metadata> elements to make test input files more concise
  async function callback({getFixture, expectedError}) {
    const inputXml = getFixture('input.xml');
    const inputStream = Readable.from(inputXml);

    const xmlMetadata = await readTestInput(inputStream);
    const xmlObject = await convertToObject(xmlMetadata);

    const inputFields = getInputFields(xmlObject['kk:metadata']);
    const valueInterface = createValueInterface(inputFields);

    if (expectedError) {
      assert.throws(() => testFn(valueInterface), Error(expectedError));
      return;
    }

    const expectedDatafields = getFixture({components: ['output.json'], reader: READERS.JSON});
    const result = testFn(valueInterface);
    assert.deepStrictEqual(result, expectedDatafields, 'Resulting datafield did not match expected value');
  }
}

