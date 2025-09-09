import createDebugLogger from 'debug';
import moment from 'moment';
import assert from 'node:assert';

import generateTests from '@natlibfi/fixugen';
import {clone} from '@natlibfi/melinda-commons';
import {READERS} from '@natlibfi/fixura';

import createTransformer from './index.js';
import ConversionError from './convert/conversionError.js';

const debug = createDebugLogger('@natlibfi/melinda-record-import-transformer-onix:transform/index.SPEC');

generateTests({
  callback,
  path: [import.meta.dirname, '..', '..', 'test-fixtures', 'transform', 'integration'],
  recurse: false,
  useMetadataFile: true,
  fixura: {
    failWhenNotFound: false
  }
});

function callback({getFixture, testDeduplication = false, testHash = false, expectedError = false, expectedErrorStatus = '200'}) {
  const momentMock = () => moment('2020-01-01T00:00:00');
  const results = [];

  const inputData = getFixture({components: ['input.xml'], reader: READERS.STREAM});
  const expectedResult = getFixture({components: ['output.json'], reader: READERS.JSON});

  // Not all tests expect a result, some conversions attempt should not be recoverable failures
  if (expectedResult) {
    testExpectedResult();
  }

  const transform = createTransformer({moment: momentMock});

  return new Promise((resolve, reject) => {
    transform(inputData)
      .on('error', handleError)
      .on('record', r => results.push(r))
      .on('end', handleResults);

    async function handleResults() {
      await Promise.all(results);
      try {
        // Deduplication tests do not test contents of record but only deduplication process
        if (testDeduplication) {
          verifyDeduplicationResult(results);
          return resolve();
        }

        // Integration tests consider only one record and its contents
        assert.equal(results.length, 1);
        const [firstResult] = results;

        assert.equal(firstResult.failed, expectedResult.failed);
        if (!expectedResult.failed) {
          assert.deepStrictEqual(firstResult.messages, expectedResult.messages);

          firstResult.record = testHash ? firstResult.record : getRecordWithoutHash(firstResult.record);
          assert.deepStrictEqual(firstResult.record, expectedResult.record);
          return resolve();
        }
        debug(firstResult);
        assert.equal(firstResult.title, expectedResult.title);
        assert.deepStrictEqual(firstResult.standardIdentifiers, expectedResult.standardIdentifiers);
        assert.equal(firstResult.message, expectedResult.message);

        return resolve();

      } catch (error) {
        reject(error);
      }
    }

    function verifyDeduplicationResult(results) {
      // Deduplication tests: same record is to be given twice and should result into one successful transformation and one pre-defined error
      assert.equal(results.length, 2);
      const failedRecords = results.filter(({failed}) => failed === true);
      const successfulRecords = results.filter(({failed}) => failed === false);

      assert.equal(failedRecords.length, 1);
      assert.equal(successfulRecords.length, 1);

      const [failedRecord] = failedRecords;
      assert.equal(failedRecord.message, 'Record has already been processed once within the current blob (not allowing duplicates).');

      const [successfulRecord] = successfulRecords;
      assert.equal(Object.hasOwn(successfulRecord, 'record'), true);
      return;
    }

    function getRecordWithoutHash(record) {
      const newRecord = clone(record);

      newRecord.fields = newRecord.fields.map(field => {
        if (field.tag !== '884') {
          return field;
        }

        return {
          ...field,
          subfields: field.subfields.filter(subfield => subfield.code !== 'k')
        };
      });

      return newRecord;
    }

    function handleError(err) {
      debug(err);
      try {
        if (expectedError) {
          assert(err instanceof Error);
          if (err instanceof ConversionError) {
            assert.match(err.payload, new RegExp(expectedError, 'u'));
            assert.match(err.status, new RegExp(expectedErrorStatus, 'u'));
            debug('Test 2');

            return resolve();
          }

          assert.match(err.message, new RegExp(expectedError, 'u'));
          debug('Test 3');
          return resolve(err);
        }

        debug('Test 4');
        reject(err);
      } catch (error) {
        reject(error);
      }
    }
  });

  function testExpectedResult() {
    assert.equal(typeof expectedResult.failed === 'boolean', true, 'Expected result should always contain failed boolean');
    if (!expectedResult.failed) {
      assert.equal(typeof expectedResult.record === 'object', true, 'Expected result should contain record object');
      assert.equal(Array.isArray(expectedResult.messages), true, 'Expected result should contain messages array');
      return;
    }

    assert.equal(typeof expectedResult.message === 'string', true, 'Failed expected result should contain message string');
    assert.equal(typeof expectedResult.title === 'string', true, 'Failed expected result should contain title string');
    assert.equal(Array.isArray(expectedResult.standardIdentifiers), true, 'Failed expected result should contain standard identifiers string array');
    return;
  }
}
