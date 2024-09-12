import {expect} from 'chai';

import {READERS} from '@natlibfi/fixura';
import generateTests from '@natlibfi/fixugen';

import * as fieldGenerator from './generateSystemFields';
import {createValueInterface} from '../util';

// Run tests
generateSID();
generateLOW();

// Test functions

function generateSID() {
  generateTests({
    callback,
    path: [__dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generateSystemFields', 'generateSID'],
    recurse: false,
    useMetadataFile: true,
    fixura: {
      reader: READERS.JSON,
      failWhenNotFound: true
    }
  });

  function callback({getFixture, source, returnDebugString = false}) {
    const input = getFixture('input.json');
    const output = getFixture('output.json');

    const valueInterface = createValueInterface(input);

    const result = fieldGenerator.generateSID(source, valueInterface, returnDebugString);
    expect(result).to.eql(output);
  }
}

function generateLOW() {
  generateTests({
    callback,
    path: [__dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generateSystemFields', 'generateLOW'],
    recurse: false,
    useMetadataFile: true,
    fixura: {
      reader: READERS.JSON,
      failWhenNotFound: true
    }
  });

  function callback({getFixture}) {
    const output = getFixture('output.json');

    const result = fieldGenerator.generateLOW();
    expect(result).to.eql(output);
  }
}
