import assert from 'node:assert';

import {READERS} from '@natlibfi/fixura';
import generateTests from '@natlibfi/fixugen';

import {createValueInterface} from '../util/index.js';
import {generateDatafieldFixtureTest} from '../../../test-utils/generate-fixture-test.js';

import * as fieldGenerator from './generate5xx.js';

const testFixtureRootPath = [import.meta.dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate5xx'];

// Refactored tests
generateDatafieldFixtureTest(testFixtureRootPath.concat('generate500'), fieldGenerator.generate500);
generateDatafieldFixtureTest(testFixtureRootPath.concat('generate500-machine-generated'), fieldGenerator.generate500MachineGenerated);
generateDatafieldFixtureTest(testFixtureRootPath.concat('generate500-description'), fieldGenerator.generate500Description);
generateDatafieldFixtureTest(testFixtureRootPath.concat('generate500-notification'), fieldGenerator.generate500Notification);
generateDatafieldFixtureTest(testFixtureRootPath.concat('generate500-level'), fieldGenerator.generate500Level);
generateDatafieldFixtureTest(testFixtureRootPath.concat('generate500-conference'), fieldGenerator.generate500Conference);

// Old tests
generate502();
generate506();
generate540();
generate594();

function generate502() {
  generateTests({
    callback,
    path: [import.meta.dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate5xx', 'generate502'],
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

    const result = fieldGenerator.generate502(valueInterface);
    assert.deepStrictEqual(result, output);
  }
}

function generate506() {
  generateTests({
    callback,
    path: [import.meta.dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate5xx', 'generate506'],
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

    const result = fieldGenerator.generate506(valueInterface);
    assert.deepStrictEqual(result, output);
  }
}

function generate540() {
  generateTests({
    callback,
    path: [import.meta.dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate5xx', 'generate540'],
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

    const result = fieldGenerator.generate540(valueInterface);
    assert.deepStrictEqual(result, output);
  }
}

function generate594() {
  generateTests({
    callback,
    path: [import.meta.dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate5xx', 'generate594'],
    recurse: false,
    useMetadataFile: true,
    fixura: {
      reader: READERS.JSON,
      failWhenNotFound: true
    }
  });

  function callback({getFixture}) {
    const output = getFixture('output.json');
    const result = fieldGenerator.generate594();
    assert.deepStrictEqual(result, output);
  }
}
