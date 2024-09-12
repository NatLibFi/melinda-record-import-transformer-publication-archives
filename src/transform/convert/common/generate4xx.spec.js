import {expect} from 'chai';

import {READERS} from '@natlibfi/fixura';
import generateTests from '@natlibfi/fixugen';

import * as fieldGenerator from './generate4xx';
import {createValueInterface} from '../util';

// Run tests
generate490();

// Test functions
function generate490() {
  generateTests({
    callback,
    path: [__dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate4xx', 'generate490'],
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

    const result = fieldGenerator.generate490(valueInterface);
    expect(result).to.eql(output);
  }
}
