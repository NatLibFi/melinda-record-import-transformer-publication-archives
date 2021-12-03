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

import chai from 'chai';
import {readdirSync} from 'fs';
import {join as joinPath} from 'path';
import fixtureFactory, {READERS} from '@natlibfi/fixura';
import {MarcRecord} from '@natlibfi/marc-record';
import createValidator, {__RewireAPI__ as RewireAPI} from './validate';

run();

function run() {
  describe('validate', () => {
    const {expect} = chai;
    const fixturesPath = joinPath(__dirname, '..', 'test-fixtures', 'validate');

    readdirSync(fixturesPath).forEach(subDir => {
      const {getFixture} = fixtureFactory({root: [
        fixturesPath,
        subDir
      ], reader: READERS.JSON});
      const record = new MarcRecord(getFixture('input.json'));
      const expectedResult = getFixture('output.json');

      it(subDir, async () => {
        RewireAPI.__Rewire__('isLegalDeposit', (() => {
          try {
            return getFixture('metadata.json')?.isLegalDeposit === true;
          } catch {
            return false;
          }
        })());

        const validate = await createValidator();
        const result = await validate(record, {fix: true, validateFixes: true});

        RewireAPI.__ResetDependency__('isLegalDeposit');
        expect(result).to.eql(expectedResult);
      });
    });
  });
}
