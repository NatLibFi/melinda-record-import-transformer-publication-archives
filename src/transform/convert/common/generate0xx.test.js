import assert from 'node:assert';

import {READERS} from '@natlibfi/fixura';
import generateTests from '@natlibfi/fixugen';

import * as fieldGenerator from './generate0xx.js';
import {createValueInterface} from '../util/index.js';

// Run tests
generate020();
generate024();
generate040();
generate041();
generate042();

// Test functions
function generate020() {
  generateTests({
    callback,
    path: [import.meta.dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate0xx', 'generate020'],
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

    const result = fieldGenerator.generate020(valueInterface);
    assert.deepStrictEqual(result, output);
  }
}

function generate024() {
  generateTests({
    callback,
    path: [import.meta.dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate0xx', 'generate024'],
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

    const result = fieldGenerator.generate024(valueInterface);
    assert.deepStrictEqual(result, output);
  }
}

function generate040() {
  generateTests({
    callback,
    path: [import.meta.dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate0xx', 'generate040'],
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

    const result = fieldGenerator.generate040();
    assert.deepStrictEqual(result, output);
  }
}

function generate041() {
  generateTests({
    callback,
    path: [import.meta.dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate0xx', 'generate041'],
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

    const result = fieldGenerator.generate041(valueInterface);
    assert.deepStrictEqual(result, output);
  }
}

function generate042() {
  generateTests({
    callback,
    path: [import.meta.dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate0xx', 'generate042'],
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

    const result = fieldGenerator.generate042();
    assert.deepStrictEqual(result, output);
  }
}
