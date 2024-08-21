import {expect} from 'chai';

import {READERS} from '@natlibfi/fixura';
import generateTests from '@natlibfi/fixugen';

import * as fieldGenerator from './generate0xx';
import {createValueInterface} from '../util';

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
    path: [__dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate0xx', 'generate020'],
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

    const valueInteface = createValueInterface(input);

    const result = fieldGenerator.generate020(valueInteface);
    expect(result).to.eql(output);
  }
}

function generate024() {
  generateTests({
    callback,
    path: [__dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate0xx', 'generate024'],
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

    const valueInteface = createValueInterface(input);

    const result = fieldGenerator.generate024(valueInteface);
    expect(result).to.eql(output);
  }
}

function generate040() {
  generateTests({
    callback,
    path: [__dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate0xx', 'generate040'],
    recurse: false,
    useMetadataFile: true,
    fixura: {
      reader: READERS.JSON,
      failWhenNotFound: true
    }
  });

  function callback({getFixture}) {
    // eslint-disable-next-line no-unused-vars
    const input = getFixture('input.json');
    const output = getFixture('output.json');

    const result = fieldGenerator.generate040();
    expect(result).to.eql(output);
  }
}

function generate041() {
  generateTests({
    callback,
    path: [__dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate0xx', 'generate041'],
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

    const valueInteface = createValueInterface(input);

    const result = fieldGenerator.generate041(valueInteface);
    expect(result).to.eql(output);
  }
}

function generate042() {
  generateTests({
    callback,
    path: [__dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate0xx', 'generate042'],
    recurse: false,
    useMetadataFile: true,
    fixura: {
      reader: READERS.JSON,
      failWhenNotFound: true
    }
  });

  function callback({getFixture}) {
    // eslint-disable-next-line no-unused-vars
    const input = getFixture('input.json');
    const output = getFixture('output.json');

    const result = fieldGenerator.generate042();
    expect(result).to.eql(output);
  }
}
