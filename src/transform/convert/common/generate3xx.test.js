import assert from 'node:assert';
import {Readable} from 'node:stream';

import {READERS} from '@natlibfi/fixura';
import generateTests from '@natlibfi/fixugen';

import {convertToObject} from '../../xmlParser.js';
import {createValueInterface, getInputFields} from '../util/index.js';
import {generateDatafieldFixtureTest} from '../../../test-utils/generate-fixture-test.js';
import {readTestInput} from '../../../test-utils/read-test-record.js';

import * as fieldGenerator from './generate3xx.js';

const testFixtureRootPath = [import.meta.dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate3xx'];

// Refactored tests
generateDatafieldFixtureTest(testFixtureRootPath.concat('generate341'), fieldGenerator.generate341);

// Run old tests
generate300Tests();

generate336();
generate337();
generate338();

// Note: generic abstraction not used because of additional required parameter: numberOfFiles
function generate300Tests() {
  generateTests({
    callback,
    path: testFixtureRootPath.concat('generate300'),
    recurse: false,
    useMetadataFile: true,
    fixura: {
      reader: READERS.TEXT,
      failWhenNotFound: true
    }
  });

  async function callback({getFixture, numberOfFiles, expectedError}) {
    const inputXml = getFixture('input.xml');
    const inputStream = Readable.from(inputXml);

    const xmlMetadata = await readTestInput(inputStream);
    const xmlObject = await convertToObject(xmlMetadata);

    const inputFields = getInputFields(xmlObject['kk:metadata']);
    const valueInterface = createValueInterface(inputFields);

    if (expectedError) {
      assert.throws(() => fieldGenerator.generate300(valueInterface, numberOfFiles), Error(expectedError));
      return;
    }

    const expectedDatafields = getFixture({components: ['output.json'], reader: READERS.JSON});
    const result = fieldGenerator.generate300(valueInterface, numberOfFiles);
    assert.deepStrictEqual(result, expectedDatafields, 'Resulting datafield did not match expected value');
  }
}

function generate336() {
  generateTests({
    callback,
    path: [import.meta.dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate3xx', 'generate336'],
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
    assert.deepStrictEqual(result, output);
  }
}


function generate337() {
  generateTests({
    callback,
    path: [import.meta.dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate3xx', 'generate337'],
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
    assert.deepStrictEqual(result, output);
  }
}

function generate338() {
  generateTests({
    callback,
    path: [import.meta.dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate3xx', 'generate338'],
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
    assert.deepStrictEqual(result, output);
  }
}

function generate341() {
  generateTests({
    callback,
    path: [import.meta.dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate3xx', 'generate341'],
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

    const result = fieldGenerator.generate341(valueInterface);
    assert.deepStrictEqual(result, output);
  }
}
