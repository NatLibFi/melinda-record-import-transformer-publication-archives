#!/usr/bin/env node
/**
*
* @licstart  The following is the entire license notice for the JavaScript code in this file.
*
* Publication archives record transformer for the Melinda record batch import system
*
* Copyright (C) 2018 University Of Helsinki (The National Library Of Finland)
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

import MarcRecord from 'marc-record-js';
import validateFactory from '@natlibfi/marc-record-validators-melinda';
import {TransformerUtils as utils} from '@natlibfi/melinda-record-import-commons';
import config from './config';
//Filter dummys for testing filtering
// //Development XML
import {dummyXML} from './dummyXML.js';
import {dummyJSON} from './dummyJSON.js';

start();

async function start() {
	let validate;
	const logger = utils.createLogger(); //Shared

	utils.registerSignalHandlers(); //Shared
	utils.checkEnv([]); //Custom
	console.log("Done");

	const stopHealthCheckService = utils.startHealthCheckService(process.env.HEALTH_CHECK_PORT); //Shared
	console.log("1");

	try {
		//validate = validateFactory(config.validators);

		await utils.startTransformation(transform); //Custom //Modified to provide dummy response. 
		//Starts function provided as callback ('transform') after fetching http response 
		console.log("4");
		stopHealthCheckService();
		console.log("5");
		process.exit();
	} catch (err) {
		stopHealthCheckService();
		logger.error(err);
		process.exit(-1);
	}

	//This is called as callback from startTransformation providing 
	//Precondition:
	//let response = await fetch(`${process.env.API_URL}/blobs/${process.env.BLOB_ID}/content`
	//Postcondition:
	//const records = await transformCallback(response);
	async function transform(response) {
		//response = dummyXML;
		//console.log("Dummy: ", dummyXML);
		console.log("Response: ", response); //Response from modified transformer is dummy response with mock-http
		console.log("-----------------------");
		console.log("JSON 1: ", response.json())
		// const records = await response.json();
		const records = dummyJSON;
		console.log("JSON 2: ", records);

		const convertedRecords = await Promise.all(records.map(convertRecord));
		const validationResults = await Promise.all(convertedRecords.map(r => validate(r, {
			fix: true,
			validateFixes: true
		})));

		return convertedRecords.reduce((acc, record, index) => {
			return acc.concat({
				record,
				failed: validationResults[index].failed,
				messages: validationResults[index].validators
			});
		}, []);

		function convertRecord(record) {
			const marcRecord = new MarcRecord();
			record.varFields.forEach(field => {
				if (field.content) {
					if (field.fieldTag === '_') {
						marcRecord.setLeader(field.content);
					} else {
						marcRecord.insertControlField({tag: field.marcTag, value: field.content});
					}
				} else {
					marcRecord.insertField({
						tag: field.marcTag,
						ind1: field.ind1,
						ind2: field.ind2,
						subfields: field.subfields.map(subfield => ({
							code: subfield.tag,
							value: subfield.content
						}))
					});
				}
			});

			return marcRecord;
		}
	}
}