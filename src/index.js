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

import transform from './transform';
import createValidateFunction from './validate';
import {TransformerUtils as Utils} from '@natlibfi/melinda-record-import-commons';

start();

async function start() {
	const logger = Utils.createLogger();

	Utils.registerSignalHandlers();
	Utils.checkEnv();

	const stopHealthCheckService = Utils.startHealthCheckService(process.env.HEALTH_CHECK_PORT);

	try {
		logger.log('info', 'Starting melinda-record-import-transformer-helmet');
		await Utils.startTransformation(transformCallback);
		stopHealthCheckService();
		process.exit();
	} catch (err) {
		stopHealthCheckService();
		logger.error(err);
		process.exit(-1);
	}

	async function transformCallback(response) {
		logger.log('debug', 'Transforming records');
		const records = await transform(response.body);
		const validate = await createValidateFunction();
		logger.log('debug', 'Validating records');
		return validate(records, true);
	}
}
