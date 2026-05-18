import assert from 'node:assert';

import {READERS} from '@natlibfi/fixura';
import generateTests from '@natlibfi/fixugen';

import {generateDatafieldFixtureTest} from '../../../test-utils/generate-fixture-test.js';

import * as fieldGenerator from './generate7xx.js';
import {createValueInterface} from '../util/index.js';

// Refactored tests
const testFixtureRootPath = [import.meta.dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate7xx'];

// generateDatafieldFixtureTest(testFixtureRootPath.concat('generate700'), fieldGenerator.generate700);
generateDatafieldFixtureTest(testFixtureRootPath.concat('generate710'), fieldGenerator.generate710);

// Old tests
// generate776();

// Test functions
function generate776() {
  generateTests({
    callback,
    path: [import.meta.dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate7xx', 'generate776'],
    recurse: false,
    useMetadataFile: true,
    fixura: {
      reader: READERS.JSON,
      failWhenNotFound: true
    }
  });

  function callback({getFixture}) {
    const input = getFixture('input.json');
    const output = getFixture('output.json');

    const valueInterface = createValueInterface(input);

    const result = fieldGenerator.generate776(valueInterface);
    assert.deepStrictEqual(result, output);
  }
}
