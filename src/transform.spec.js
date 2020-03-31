/**
*
* @licstart  The following is the entire license notice for the JavaScript code in this file.
*
* Publication archives record transformer for the Melinda record batch import system
*
* Copyright (C) 2019-2020 University Of Helsinki (The National Library Of Finland)
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

'use strict';

import fs from 'fs';
import path from 'path';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import transform from './transform';

const FIXTURES_PATH = path.join(__dirname, '../test-fixtures');

const {expect} = chai;
chai.use(chaiAsPromised);

describe('Check different transformation cases', () => {
	let succesRecordArray = [];
	let failedRecordsArray = [];

	beforeEach(async () => {
		succesRecordArray = [];
		failedRecordsArray = [];
	});

	describe('#Doria18-19', () => {
		it('18-19 records from Doria', async () => {
			const Emitter = transform(fs.createReadStream(path.join(FIXTURES_PATH, 'fetchedDoria1819Small.json'), 'utf8'), {validate: false, fix: false});
			await new Promise(resolve => {
				Emitter
					.on('end', () => {
						resolve(true);
					})
					.on('record', recordEvent);
			});

			function recordEvent(payload) {
				if (payload.failed) {
					failedRecordsArray.push(payload);
				} else {
					succesRecordArray.push(payload);
				}
			}

			expect(succesRecordArray.map(r => r.record)).to.eql(require('../test-fixtures/transformedDoria1819Small.json', 'utf8'));
		}).timeout(100000);
	});

	describe('#2019 Harvests, 2016>', () => {
		fs.readdirSync(path.join(FIXTURES_PATH, '2019Harvests/transformed')).forEach(file => {
			it(file, async () => {
				const Emitter = transform(fs.createReadStream(path.join(FIXTURES_PATH, '2019Harvests/fetched', file), 'utf8'), {validate: false, fix: false});
				await new Promise(resolve => {
					Emitter
						.on('end', () => {
							resolve(true);
						})
						.on('record', recordEvent);
				});

				expect(succesRecordArray.map(r => r.record)).to.eql(require(path.join(FIXTURES_PATH, '2019Harvests/transformed', file)));
			}).timeout(100000);
		});

		function recordEvent(payload) {
			if (payload.failed) {
				failedRecordsArray.push(payload);
			} else {
				succesRecordArray.push(payload);
			}
		}
	});
});
