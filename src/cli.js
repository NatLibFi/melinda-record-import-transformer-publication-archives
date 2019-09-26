#!/usr/bin/env node
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

import transform from './transform';
import createValidator from './validate';
import {Transformer} from '@natlibfi/melinda-record-import-commons';
import moment from 'moment';

const {runCLI} = Transformer;

run();

async function run() {
	const transformerSettings = {
		name: 'melinda-record-import-transformer-publication-archives',
		yargsOptions: [
			{option: 'v', conf: {alias: 'validate', default: false, type: 'boolean', describe: 'Validate records'}},
			{option: 'f', conf: {alias: 'fix', default: false, type: 'boolean', describe: 'Validate & fix records'}}
		],
		callback: startTransform
	};
	runCLI(transformerSettings);

	async function startTransform({stream, args: {validate, fix, recordsOnly}, spinner, handleRecordsOutput}) {
		const records = await transformStream(stream, validate, fix);
		if (validate || fix) {
			spinner.succeed();
			spinner.start('Validating records');

			const invalidCount = records.filter(r => r.failed).length;
			const validCount = records.length - invalidCount;
			spinner.succeed(`Validating records (Valid: ${validCount}, invalid: ${invalidCount})`);

			if (recordsOnly) {
				console.error(`Excluding ${records.filter(r => r.failed).length} failed records`);
				handleRecordsOutput(records.filter(r => !r.failed).map(r => r.record));
			} else {
				console.log(JSON.stringify(records.map(r => {
					return {record: r.record.toObject(), timestamp: moment(), ...r}; // Spread opreation "...r" removed as it caused unexpected token error
				}), undefined, 2));
			}
		} else {
			spinner.succeed();
			handleRecordsOutput(records);
		}
	}

	async function transformStream(stream, argsValidate, argsFix) {
		const records = await transform(stream);
		if (argsValidate || argsFix) {
			const validate = await createValidator();
			return validate(records, argsFix, argsValidate);
		}

		return records;
	}
}
