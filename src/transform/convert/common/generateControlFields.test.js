import assert from 'node:assert';
import moment from 'moment';

import {READERS} from '@natlibfi/fixura';
import generateTests from '@natlibfi/fixugen';

import * as fieldGenerator from './generateControlFields.js';
import {createValueInterface} from '../util/index.js';

// Run tests
generateLDR();
generate007();
generate008();

// Test functions

function generateLDR() {
  generateTests({
    callback,
    path: [import.meta.dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generateControlFields', 'generateLDR'],
    recurse: false,
    useMetadataFile: true,
    fixura: {
      reader: READERS.JSON,
      failWhenNotFound: true
    }
  });

  function callback({getFixture}) {
    const output = getFixture('output.json');

    const result = fieldGenerator.generateLDR();
    assert.deepStrictEqual([result], output); // NB: jsonifying result since return value is string ja getFixture reads JSON from output.json
  }
}

function generate007() {
  generateTests({
    callback,
    path: [import.meta.dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generateControlFields', 'generate007'],
    recurse: false,
    useMetadataFile: true,
    fixura: {
      reader: READERS.JSON,
      failWhenNotFound: true
    }
  });

  function callback({getFixture}) {
    const output = getFixture('output.json');

    const result = fieldGenerator.generate007();
    assert.deepStrictEqual(result, output);
  }
}

function generate008() {
  generateTests({
    callback,
    path: [import.meta.dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generateControlFields', 'generate008'],
    recurse: false,
    useMetadataFile: true,
    fixura: {
      reader: READERS.JSON,
      failWhenNotFound: true
    }
  });

  function callback({getFixture, language = null}) {
    const input = getFixture('input.json');
    const output = getFixture('output.json');

    const valueInterface = createValueInterface(input);
    const momentMock = () => moment('2020-01-01T00:00:00');

    const result = fieldGenerator.generate008(valueInterface, language, momentMock);
    assert.deepStrictEqual(result, output);
  }
}
