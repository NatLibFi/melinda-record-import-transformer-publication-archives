import {expect} from 'chai';

import {READERS} from '@natlibfi/fixura';
import generateTests from '@natlibfi/fixugen';

import * as fieldGenerator from './generate1xx';
import {createValueInterface} from '../util';

// Run tests
generate100and700();

// Test functions
function generate100and700() {
  generateTests({
    callback,
    path: [__dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate1xx', 'generate100and700'],
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

    const result = fieldGenerator.generate100and700(valueInteface);
    expect(result).to.eql(output);
  }
}