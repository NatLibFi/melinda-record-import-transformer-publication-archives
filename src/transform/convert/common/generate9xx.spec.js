import {expect} from 'chai';

import {READERS} from '@natlibfi/fixura';
import generateTests from '@natlibfi/fixugen';

import * as fieldGenerator from './generate9xx';
import {createValueInterface} from '../util';

// Run tests
generate946();

// Test functions
function generate946() {
  generateTests({
    callback,
    path: [__dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate9xx', 'generate946'],
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

    const result = fieldGenerator.generate946(valueInterface);
    expect(result).to.eql(output);
  }
}
