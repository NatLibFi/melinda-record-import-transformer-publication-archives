import {READERS} from '@natlibfi/fixura';
import moment from 'moment';
import {expect} from 'chai';
import generateTests from '@natlibfi/fixugen';
import createTransformer from '.';

generateTests({
  callback,
  path: [__dirname, '..', '..', 'test-fixtures', 'transform', 'convert'],
  recurse: false,
  useMetadataFile: true,
  fixura: {
    failWhenNotFound: false
  }
});

generateTests({
  callback,
  path: [__dirname, '..', '..', 'test-fixtures', 'transform', 'filter'],
  recurse: false,
  useMetadataFile: true,
  fixura: {
    failWhenNotFound: false
  }
});

function callback({getFixture, expectedError = false, harvestSource = undefined, isLegalDeposit = false, sourceMap = {}, filters = {}, isJson = true}) {
  const momentMock = () => moment('2020-01-01T00:00:00');

  const inputData = isJson
    ? getFixture({components: ['input.json'], reader: READERS.JSON})
    : getFixture({components: ['input.xml'], reader: READERS.STREAM});
  const expectedRecord = getFixture({components: ['output.json'], reader: READERS.JSON});

  const transform = createTransformer({
    isJson,
    harvestSource: harvestSource || 'FOOBAR',
    isLegalDeposit,
    sourceMap,
    filters,
    moment: momentMock
  });

  return new Promise((resolve, reject) => {
    const results = [];

    transform(inputData, {validate: false, fix: false})
      .on('error', err => {
        if (expectedError) { // eslint-disable-line functional/no-conditional-statements
          try {
            expect(err).to.be.an('error');
            expect(err.message).to.match(new RegExp(expectedError, 'u'));
            return resolve();
          } catch {
            return reject(err);
          }
        }
        return reject(err);
      })
      .on('record', (r) => results.push(r)) // eslint-disable-line functional/immutable-data
      .on('end', () => {
        try {
          expect(results).to.have.lengthOf(1);
          const [result] = results;

          if (result.failed === false) {
            expect(result.failed).to.eql(false);
            expect(result.record.toObject()).to.eql(expectedRecord);
            return resolve();
          }

          const {failed, title, standardIdentifiers, message} = result;
          expect(failed).to.eql(expectedRecord.failed);
          expect(title).to.eql(expectedRecord.title);
          expect(standardIdentifiers).to.eql(expectedRecord.standardIdentifiers);
          expect(message).to.eql(expectedRecord.message);
          resolve();
        } catch (err) {
          reject(err);
        }
      });
  });

}
