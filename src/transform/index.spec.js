import createDebugLogger from 'debug';
import moment from 'moment';
import {expect} from 'chai';

import generateTests from '@natlibfi/fixugen';
import {clone} from '@natlibfi/melinda-commons';
import {READERS} from '@natlibfi/fixura';

import createTransformer from '.';
import ConversionError from './convert/conversionError';

const debug = createDebugLogger('@natlibfi/melinda-record-import-transformer-onix:transform/index.SPEC');

generateTests({
  callback,
  path: [__dirname, '..', '..', 'test-fixtures', 'transform', 'integration'],
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
  // eslint-disable-next-line functional/no-conditional-statements
  if (expectedResult) {
    testExpectedResult();
  }

  const transform = createTransformer({moment: momentMock});

  return new Promise((resolve, reject) => {
    transform(inputData)
      .on('error', handleError)
      .on('record', r => results.push(r)) // eslint-disable-line functional/immutable-data
      .on('end', handleResults);


    // eslint-disable-next-line max-statements
    async function handleResults() {
      await Promise.all(results);
      try {
      // Deduplication tests do not test contents of record but only deduplication process
        if (testDeduplication) {
          verifyDeduplicationResult(results);
          return resolve();
        }

        // Integration tests consider only one record and its contents
        expect(results).to.have.lengthOf(1);
        const [firstResult] = results;

        expect(firstResult.failed).to.equal(expectedResult.failed);
        if (!expectedResult.failed) { // eslint-disable-line functional/no-conditional-statements
          expect(firstResult.messages).to.eql(expectedResult.messages);

          // eslint-disable-next-line functional/immutable-data
          firstResult.record = testHash ? firstResult.record : getRecordWithoutHash(firstResult.record);
          expect(firstResult.record).to.eql(expectedResult.record);
          return resolve();
        }
        debug(firstResult);
        expect(firstResult.title).to.equal(expectedResult.title);
        expect(firstResult.standardIdentifiers).to.eql(expectedResult.standardIdentifiers);
        expect(firstResult.message).to.equal(expectedResult.message);

        return resolve();

      } catch (error) {
        reject(error);
      }
    }

    function verifyDeduplicationResult(results) {
    // Deduplication tests: same record is to be given twice and should result into one successful transformation and one pre-defined error
      expect(results).to.have.lengthOf(2);
      const failedRecords = results.filter(({failed}) => failed === true);
      const successfulRecords = results.filter(({failed}) => failed === false);

      expect(failedRecords).to.have.lengthOf(1);
      expect(successfulRecords).to.have.lengthOf(1);

      const [failedRecord] = failedRecords;
      expect(failedRecord.message).to.eq('Record has already been processed once within the current blob (not allowing duplicates).');

      const [successfulRecord] = successfulRecords;
      expect(successfulRecord).to.have.property('record');
      return;
    }

    function getRecordWithoutHash(record) {
      const newRecord = clone(record);

      /* eslint-disable functional/immutable-data */
      newRecord.fields = newRecord.fields.map(field => {
        if (field.tag !== '884') {
          return field;
        }

        return {
          ...field,
          subfields: field.subfields.filter(subfield => subfield.code !== 'k')
        };
      });
      /* eslint-enable functional/immutable-data */

      return newRecord;
    }

    function handleError(err) {
      debug(err);
      try {
        if (expectedError) { // eslint-disable-line functional/no-conditional-statements
          expect(err).to.be.an('error');
          if (err instanceof ConversionError) {
            expect(err.payload).to.match(new RegExp(expectedError, 'u'));
            expect(err.status).to.match(new RegExp(expectedErrorStatus, 'u'));
            debug('Test 2');

            return resolve();
          }

          expect(err.message).to.match(new RegExp(expectedError, 'u'));
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
    expect(expectedResult.failed).to.be.a('boolean', 'Expected result should always contain failed boolean');
    if (!expectedResult.failed) {
      expect(expectedResult.record).to.be.a('object', 'Expected result should contain record object');
      expect(expectedResult.messages).to.be.a('array', 'Expected result should contain messages array');
      return;
    }

    expect(expectedResult.message).to.be.a('string', 'Failed expected result should contain message string');
    expect(expectedResult.title).to.be.a('string', 'Failed expected result should contain title string');
    expect(expectedResult.standardIdentifiers).to.be.a('array', 'Failed expected result should contain standard identifiers string array');
    return;
  }
}
