import assert from 'node:assert';
import {Readable} from 'node:stream';

import {READERS} from '@natlibfi/fixura';
import generateTests from '@natlibfi/fixugen';

import * as fieldGenerator from './generate2xx.js';

import {readTestInput} from '../../../test-utils/read-test-record.js';
import {createValueInterface, getInputFields} from '../util/index.js';
import {convertToObject} from '../../xmlParser.js';

const testFixtureRootPath = [import.meta.dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate2xx'];

// Refactored tests
generate264();

// Run tests
generate245();
generate246();
generate250();

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

// Note: does not use test abstraction because of titleLanguage needs to be passed
function generate264() {
  generateTests({
    callback,
    path: testFixtureRootPath.concat('generate264'),
    recurse: false,
    useMetadataFile: true,
    fixura: {
      reader: READERS.TEXT,
      failWhenNotFound: true
    }
  });

  // This simulates the current state of processing loop but without having to wrap
  // XML into <record> and <metadata> elements to make test input files more concise
  async function callback({getFixture, expectedError, titleLanguage}) {
    const inputXml = getFixture('input.xml');
    const inputStream = Readable.from(inputXml);

    const xmlMetadata = await readTestInput(inputStream);
    const xmlObject = await convertToObject(xmlMetadata);

    const inputFields = getInputFields(xmlObject['kk:metadata']);
    const valueInterface = createValueInterface(inputFields);

    if (expectedError) {
      assert.throws(() => fieldGenerator.generate264(valueInterface, titleLanguage), Error(expectedError));
      return;
    }

    const expectedDatafields = getFixture({components: ['output.json'], reader: READERS.JSON});
    const result = fieldGenerator.generate264(valueInterface, titleLanguage);
    assert.deepStrictEqual(result, expectedDatafields, 'Resulting datafield did not match expected value');
  }
}
