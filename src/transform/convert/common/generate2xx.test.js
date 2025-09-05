import assert from 'node:assert';

import {READERS} from '@natlibfi/fixura';
import generateTests from '@natlibfi/fixugen';

import * as fieldGenerator from './generate2xx.js';
import {createValueInterface} from '../util/index.js';

// Run tests
generate245();
generate246();
generate250();
generate264();

// Test functions
function generate245() {
  generateTests({
    callback,
    path: [import.meta.dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate2xx', 'generate245'],
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

    const result = fieldGenerator.generate245(valueInterface);
    assert.deepStrictEqual(result, output);
  }
}

function generate246() {
  generateTests({
    callback,
    path: [import.meta.dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate2xx', 'generate246'],
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

    const result = fieldGenerator.generate246(valueInterface);
    assert.deepStrictEqual(result, output);
  }
}

function generate250() {
  generateTests({
    callback,
    path: [import.meta.dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate2xx', 'generate250'],
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

    const result = fieldGenerator.generate250(valueInterface);
    assert.deepStrictEqual(result, output);
  }
}

function generate264() {
  generateTests({
    callback,
    path: [import.meta.dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate2xx', 'generate264'],
    recurse: false,
    useMetadataFile: true,
    fixura: {
      reader: READERS.JSON,
      failWhenNotFound: true
    }
  });

  function callback({getFixture, titleLanguage = null}) {
    const input = getFixture('input.json');
    const output = getFixture('output.json');

    const valueInterface = createValueInterface(input);

    const result = fieldGenerator.generate264(valueInterface, titleLanguage);
    assert.deepStrictEqual(result, output);
  }
}
