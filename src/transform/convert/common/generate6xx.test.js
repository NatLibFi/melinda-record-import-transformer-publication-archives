import assert from 'node:assert';

import {READERS} from '@natlibfi/fixura';
import generateTests from '@natlibfi/fixugen';

import * as fieldGenerator from './generate6xx.js';
import {createValueInterface} from '../util/index.js';

// Run tests
generate648();
generate650();
generate651();
generate653();

// Test functions
function generate648() {
  generateTests({
    callback,
    path: [import.meta.dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate6xx', 'generate648'],
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

    const result = fieldGenerator.generate648(valueInterface);
    assert.deepStrictEqual(result, output);
  }
}

function generate650() {
  generateTests({
    callback,
    path: [import.meta.dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate6xx', 'generate650'],
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

    const result = fieldGenerator.generate650(valueInterface);
    assert.deepStrictEqual(result, output);
  }
}

function generate651() {
  generateTests({
    callback,
    path: [import.meta.dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate6xx', 'generate651'],
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

    const result = fieldGenerator.generate651(valueInterface);
    assert.deepStrictEqual(result, output);
  }
}

function generate653() {
  generateTests({
    callback,
    path: [import.meta.dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate6xx', 'generate653'],
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

    const result = fieldGenerator.generate653(valueInterface);
    assert.deepStrictEqual(result, output);
  }
}
