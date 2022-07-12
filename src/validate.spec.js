import {expect} from 'chai';
import {MarcRecord} from '@natlibfi/marc-record';
import {READERS} from '@natlibfi/fixura';
import generateTests from '@natlibfi/fixugen';
import createValidator from './validate';

generateTests({
  path: [__dirname, '..', 'test-fixtures', 'validate'],
  useMetadataFile: true,
  recurse: false,
  fixura: {reader: READERS.JSON, failWhenNotFound: false},
  callback
});

async function callback({getFixture, isLegalDeposit}) {
  const record = new MarcRecord(getFixture('input.json'));
  const expectedResult = getFixture('output.json');

  const validate = await createValidator(isLegalDeposit);
  const result = await validate(record, {fix: true, validateFixes: true});

  expect(result.record).to.eql(expectedResult.record);
  expect(result.messages).to.eql(expectedResult.messages);
  expect(result.fail).to.eql(expectedResult.fail);
}
