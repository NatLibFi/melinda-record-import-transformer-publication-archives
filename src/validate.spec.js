/**
*
* @licstart  The following is the entire license notice for the JavaScript code in this file.
*
* Publication archives record transformer for the Melinda record batch import system
*
* Copyright (C) 2019-2021 University Of Helsinki (The National Library Of Finland)
*
* This file is part of melinda-record-import-transformer-publication-archives
*
* melinda-record-import-transformer-publication-archives program is free software: you can redistribute it and/or modify
* it under the terms of the GNU Affero General Public License as
* published by the Free Software Foundation, either version 3 of the
* License, or (at your option) any later version.
*
* melinda-record-import-transformer-publication-archives is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU Affero General Public License for more details.
*
* You should have received a copy of the GNU Affero General Public License
* along with this program.  If not, see <http://www.gnu.org/licenses/>.
*
* @licend  The above is the entire license notice
* for the JavaScript code in this file.
*
*/

import {expect} from 'chai';
import {MarcRecord} from '@natlibfi/marc-record';
import {READERS} from '@natlibfi/fixura';
import generateTests from '@natlibfi/fixugen';
import createValidator from './validate';

describe('validate', () => {
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
});
