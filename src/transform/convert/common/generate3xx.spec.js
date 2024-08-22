import {expect} from 'chai';

import {READERS} from '@natlibfi/fixura';
import generateTests from '@natlibfi/fixugen';

import * as fieldGenerator from './generate3xx';
import {createValueInterface} from '../util';

// Run tests
generate300();
generate336();
generate337();
generate338();
generate341();

// Test functions
function generate300() {
  generateTests({
    callback,
    path: [__dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate3xx', 'generate300'],
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

    const result = fieldGenerator.generate300(valueInterface);
    expect(result).to.eql(output);
  }
}

function generate336() {
  generateTests({
    callback,
    path: [__dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate3xx', 'generate336'],
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
    expect(result).to.eql(output);
  }
}


function generate337() {
  generateTests({
    callback,
    path: [__dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate3xx', 'generate337'],
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
    expect(result).to.eql(output);
  }
}

function generate338() {
  generateTests({
    callback,
    path: [__dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate3xx', 'generate338'],
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
    expect(result).to.eql(output);
  }
}

function generate341() {
  generateTests({
    callback,
    path: [__dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate3xx', 'generate341'],
    recurse: false,
    useMetadataFile: true,
    fixura: {
      reader: READERS.JSON,
      failWhenNotFound: true
    }
  });

  function callback({getFixture}) {
    const output = getFixture('output.json');

    const result = fieldGenerator.generate341();
    expect(result).to.eql(output);
  }
}
