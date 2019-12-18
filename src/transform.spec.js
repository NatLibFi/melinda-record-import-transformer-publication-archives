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

'use strict';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import transform from './transform';
import fs from 'fs';

const {expect} = chai;
chai.use(chaiAsPromised);

describe('Check different transformation cases', () => {
	describe('#Doria18-19', () => {
		it('18-19 records from Doria', async () => {
			let succesRecordArray = [];
			let failedRecordsArray = [];

			const Emitter = await transform(fs.createReadStream('./test-fixtures/fetchedDoria1819Small.json', 'utf8'), {validate: false, fix: false});
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
		let succesRecordArray = [];
		let failedRecordsArray = [];

		beforeEach(async () => {
			succesRecordArray = [];
			failedRecordsArray = [];
		});

		it('Doria', async () => {
			const Emitter = await transform(fs.createReadStream('./test-fixtures/2019Harvests/fetched/Doria.json', 'utf8'), {validate: false, fix: false});

			await new Promise(resolve => {
				Emitter
					.on('end', () => {
						resolve(true);
					})
					.on('record', recordEvent);
			});

			expect(succesRecordArray.map(r => r.record)).to.eql(require('../test-fixtures/2019Harvests/transformed/Doria.json'));
		}).timeout(10000);

		it('Julkari', async () => {
			const Emitter = await transform(fs.createReadStream('./test-fixtures/2019Harvests/fetched/Julkari.json', 'utf8'), {validate: false, fix: false});

			await new Promise(resolve => {
				Emitter
					.on('end', () => {
						resolve(true);
					})
					.on('record', recordEvent);
			});

			expect(succesRecordArray.map(r => r.record)).to.eql(require('../test-fixtures/2019Harvests/transformed/Julkari.json'));
		}).timeout(10000);

		it('Lauda', async () => {
			const Emitter = await transform(fs.createReadStream('./test-fixtures/2019Harvests/fetched/Lauda.json', 'utf8'), {validate: false, fix: false});

			await new Promise(resolve => {
				Emitter
					.on('end', () => {
						resolve(true);
					})
					.on('record', recordEvent);
			});

			expect(succesRecordArray.map(r => r.record)).to.eql(require('../test-fixtures/2019Harvests/transformed/Lauda.json'));
		}).timeout(10000);

		it('Luke', async () => {
			const Emitter = await transform(fs.createReadStream('./test-fixtures/2019Harvests/fetched/Luke.json', 'utf8'), {validate: false, fix: false});

			await new Promise(resolve => {
				Emitter
					.on('end', () => {
						resolve(true);
					})
					.on('record', recordEvent);
			});

			expect(succesRecordArray.map(r => r.record)).to.eql(require('../test-fixtures/2019Harvests/transformed/Luke.json'));
		}).timeout(10000);

		it('Lutpub', async () => {
			const Emitter = await transform(fs.createReadStream('./test-fixtures/2019Harvests/fetched/Lutpub.json', 'utf8'), {validate: false, fix: false});

			await new Promise(resolve => {
				Emitter
					.on('end', () => {
						resolve(true);
					})
					.on('record', recordEvent);
			});

			expect(succesRecordArray.map(r => r.record)).to.eql(require('../test-fixtures/2019Harvests/transformed/Lutpub.json'));
		}).timeout(10000);

		it('UTA', async () => {
			const Emitter = await transform(fs.createReadStream('./test-fixtures/2019Harvests/fetched/UTA.json', 'utf8'), {validate: false, fix: false});

			await new Promise(resolve => {
				Emitter
					.on('end', () => {
						resolve(true);
					})
					.on('record', recordEvent);
			});

			expect(succesRecordArray.map(r => r.record)).to.eql(require('../test-fixtures/2019Harvests/transformed/UTA.json'));
		}).timeout(10000);

		it('uWasa', async () => {
			const Emitter = await transform(fs.createReadStream('./test-fixtures/2019Harvests/fetched/uWasa.json', 'utf8'), {validate: false, fix: false});

			await new Promise(resolve => {
				Emitter
					.on('end', () => {
						resolve(true);
					})
					.on('record', recordEvent);
			});

			expect(succesRecordArray.map(r => r.record)).to.eql(require('../test-fixtures/2019Harvests/transformed/uWasa.json'));
		}).timeout(10000);

		it('Valto, with "issued" > 2010', async () => {
			const Emitter = await transform(fs.createReadStream('./test-fixtures/2019Harvests/fetched/Valto10.json', 'utf8'), {validate: false, fix: false});

			await new Promise(resolve => {
				Emitter
					.on('end', () => {
						resolve(true);
					})
					.on('record', recordEvent);
			});

			expect(succesRecordArray.map(r => r.record)).to.eql(require('../test-fixtures/2019Harvests/transformed/Valto10.json'));
		}).timeout(10000);

		it('UTU', async () => {
			const Emitter = await transform(fs.createReadStream('./test-fixtures/2019Harvests/fetched/Utupub.json', 'utf8'), {validate: false, fix: false});

			await new Promise(resolve => {
				Emitter
					.on('end', () => {
						resolve(true);
					})
					.on('record', recordEvent);
			});

			expect(succesRecordArray.map(r => r.record)).to.eql(require('../test-fixtures/2019Harvests/transformed/Utupub.json'));
		}).timeout(10000);

		it('Theseus', async () => {
			const Emitter = await transform(fs.createReadStream('./test-fixtures/2019Harvests/fetched/Theseus.json', 'utf8'), {validate: false, fix: false});

			await new Promise(resolve => {
				Emitter
					.on('end', () => {
						resolve(true);
					})
					.on('record', recordEvent);
			});

			expect(succesRecordArray.map(r => r.record)).to.eql(require('../test-fixtures/2019Harvests/transformed/Theseus.json'));
		}).timeout(100000);

		function recordEvent(payload) {
			if (payload.failed) {
				failedRecordsArray.push(payload);
			} else {
				succesRecordArray.push(payload);
			}
		}
	});
});
