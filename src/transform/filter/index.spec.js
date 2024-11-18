import moment from 'moment';
import {expect} from 'chai';

import generateTests from '@natlibfi/fixugen';
import {READERS} from '@natlibfi/fixura';

import createTransformer from '../';


generateTests({
  callback,
  path: [__dirname, '..', '..', '..', 'test-fixtures', 'transform', 'filter'],
  recurse: true,
  useMetadataFile: true,
  fixura: {
    failWhenNotFound: false
  }
});

function callback({getFixture, filter, filterConfig = {}}) {
  const momentMock = () => moment('2020-01-01T00:00:00');
  const results = [];

  const inputData = getFixture({components: ['input.xml'], reader: READERS.STREAM});
  const expectedResult = getFixture({components: ['output.json'], reader: READERS.JSON});

  const transform = createTransformer({applyFilters: [filter], filterConfig, moment: momentMock});

  return new Promise((resolve, reject) => {
    transform(inputData)
      .on('error', handleError)
      .on('record', r => results.push(r)) // eslint-disable-line functional/immutable-data
      .on('end', handleResults);

    // eslint-disable-next-line max-statements
    async function handleResults() {
      await Promise.all(results);
      try {
        // Integration tests consider only one record and its contents
        expect(results).to.have.lengthOf(1);
        const [firstResult] = results;

        expect(firstResult.failed).to.equal(expectedResult.failed);
        expect(firstResult.title).to.equal(expectedResult.title);
        expect(firstResult.standardIdentifiers).to.eql(expectedResult.standardIdentifiers);

        expect(firstResult.message).to.equal(expectedResult.message);

        return resolve();

      } catch (error) {
        reject(error);
      }
    }

    // NB: filters should not result into halting errors
    // eslint-disable-next-line handle-callback-err, no-unused-vars
    function handleError(_) {
      expect(1).to.equal(0);
    }
  });
}
