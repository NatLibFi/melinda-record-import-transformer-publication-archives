import assert from 'node:assert';

import {READERS} from '@natlibfi/fixura';
import generateTests from '@natlibfi/fixugen';

import * as fieldGenerator from './generate3xx.js';
import {createValueInterface} from '../util/index.js';

import {generateDatafieldFixtureTest} from '../../../test-utils/generate-fixture-test.js';

const testFixtureRootPath = [import.meta.dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate3xx'];

// Refactored tests
generateDatafieldFixtureTest(testFixtureRootPath.concat('generate341'), fieldGenerator.generate341);

// Run old tests
// generate300();
// generate336();
// generate337();
// generate338();

// Test functions
function generate300() {
  generateTests({
    callback,
    path: [import.meta.dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate3xx', 'generate300'],
    recurse: false,
    useMetadataFile: true,
    fixura: {
      reader: READERS.JSON,
      failWhenNotFound: true
    }
  });

  function callback({getFixture, numberOfFiles = 1}) {
    const input = getFixture('input.json');
    const output = getFixture('output.json');

    const valueInterface = createValueInterface(input);

    const result = fieldGenerator.generate300(valueInterface, numberOfFiles);
    assert.deepStrictEqual(result, output);
  }
}

function generate336() {
  generateTests({
    callback,
    path: [import.meta.dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate3xx', 'generate336'],
    recurse: false,
    useMetadataFile: true,
    fixura: {
      reader: READERS.JSON,
      failWhenNotFound: true
    }
  });

  function callback({getFixture}) {
    const output = getFixture('output.json');

    const result = fieldGenerator.generate336();
    assert.deepStrictEqual(result, output);
  }
}


function generate337() {
  generateTests({
    callback,
    path: [import.meta.dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate3xx', 'generate337'],
    recurse: false,
    useMetadataFile: true,
    fixura: {
      reader: READERS.JSON,
      failWhenNotFound: true
    }
  });

  function callback({getFixture}) {
    const output = getFixture('output.json');

    const result = fieldGenerator.generate337();
    assert.deepStrictEqual(result, output);
  }
}

function generate338() {
  generateTests({
    callback,
    path: [import.meta.dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate3xx', 'generate338'],
    recurse: false,
    useMetadataFile: true,
    fixura: {
      reader: READERS.JSON,
      failWhenNotFound: true
    }
  });

  function callback({getFixture}) {
    const output = getFixture('output.json');

    const result = fieldGenerator.generate338();
    assert.deepStrictEqual(result, output);
  }
}

function generate341() {
  generateTests({
    callback,
    path: [import.meta.dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate3xx', 'generate341'],
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

    const result = fieldGenerator.generate341(valueInterface);
    assert.deepStrictEqual(result, output);
  }
}
