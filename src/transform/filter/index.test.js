import moment from 'moment';
import assert from 'node:assert';

import generateTests from '@natlibfi/fixugen';
import {READERS} from '@natlibfi/fixura';

import createTransformer from '../index.js';


generateTests({
  callback,
  path: [import.meta.dirname, '..', '..', '..', 'test-fixtures', 'transform', 'filter'],
  recurse: true,
  useMetadataFile: true,
  fixura: {
    failWhenNotFound: false
  }
});

function callback({getFixture}) {
  const momentMock = () => moment('2020-01-01T00:00:00');
  const results = [];

  const inputData = getFixture({components: ['input.xml'], reader: READERS.STREAM});
  const expectedResult = getFixture({components: ['output.json'], reader: READERS.JSON});

  const transform = createTransformer({moment: momentMock});

  return new Promise((resolve, reject) => {
    transform(inputData)
      .on('error', handleError)
      .on('record', record => results.push(record))
      .on('end', handleResults);


    async function handleResults() {
      await Promise.all(results);
      try {
        // Integration tests consider only one record and its contents
        assert.equal(results.length, 1);
        const [firstResult] = results;

        assert.equal(firstResult.failed, expectedResult.failed);
        assert.equal(firstResult.title, expectedResult.title);
        assert.deepStrictEqual(firstResult.standardIdentifiers, expectedResult.standardIdentifiers);

        assert.equal(firstResult.message, expectedResult.message);

        return resolve();

      } catch (error) {
        reject(error);
      }
    }

    // NB: filters should not result into halting errors

    function handleError(_err) {
      assert.fail('This should not fail!');
    }
  });
}
