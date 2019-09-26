/**
*
* @licstart  The following is the entire license notice for the JavaScript code in this file.
*
* Helmet record transformer for the Melinda record batch import system
*
* Copyright (C) 2019 University Of Helsinki (The National Library Of Finland)
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

import fs from 'fs';
import path from 'path';
import {expect} from 'chai';
import createValidator from './validate';

const FIXTURES_PATH = path.join(__dirname, '../test-fixtures');

describe('validate 2019', () => {
	let validate;

	before(async () => {
		validate = await createValidator();
	});

	fs.readdirSync(path.join(FIXTURES_PATH, '2019Harvests/transformed')).forEach(file => {
		it(file, async () => {
			const data = require(path.join(FIXTURES_PATH, '2019Harvests/transformed', file));
			const results = await validate(data, true, true);
			const cleaned = results.map(e => {
				return e.record;
			});
			expect(cleaned).to.eql(require(path.join(FIXTURES_PATH, '2019Harvests/valid', file)));
		}).timeout(100000);
	});
});