/**
*
* @licstart  The following is the entire license notice for the JavaScript code in this file.
*
* Helmet record transformer for the Melinda record batch import system
*
* Copyright (C) 2018 University Of Helsinki (The National Library Of Finland)
*
* This file is part of melinda-record-import-transformer-helmet
*
* melinda-record-import-transformer-helmet program is free software: you can redistribute it and/or modify
* it under the terms of the GNU Affero General Public License as
* published by the Free Software Foundation, either version 3 of the
* License, or (at your option) any later version.
*
* melinda-record-import-transformer-helmet is distributed in the hope that it will be useful,
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
import transform from '../src/transform';
import {custom, utaChecked, utaSingle, utaComplex, doriaSingle} from './validResponses'
import {doria1819} from './validDoria1819'
import fs from 'fs';

const {expect} = chai;
chai.use(chaiAsPromised);

describe('Check different transformation cases', () => {
	// describe('#Custom', () => {
	// 	it('Testing all new changes', async () => {
	// 		const result = await transform(fs.createReadStream('./test/recordCustom.json', 'utf8'));
	// 		expect(result).to.eql(custom);
	// 	});
	// });

	// describe('#UTA', () => {
	// 	it('Single checked record', async () => {
	// 		const result = await transform(fs.createReadStream('./test/recordsUtaChecked.json', 'utf8'));
	// 		expect(result).to.eql(utaChecked);
	// 	});
		
	// 	it('Single record', async () => {
	// 		const result = await transform(fs.createReadStream('./test/recordsUtaSingle.json', 'utf8'));
	// 		expect(result).to.eql(utaSingle);
	// 	});

	// 	it('Multiple records', async () => {
	// 		const result = await transform(fs.createReadStream('./test/recordsUtaMultiple.json', 'utf8'));
	// 		expect(result).to.eql(utaComplex); //Give some extra time as this is loooong test
	// 	}).timeout(10000);
	// });
	  
	// describe('#Doria', () => {
	// 	it('Single complex record', async () => {
	// 		const result = await transform(fs.createReadStream('./test/recordsDoriaSingle.json', 'utf8'));
	// 		expect(result).to.eql(doriaSingle);
	// 	});
	// }); 
	
	describe('#Doria18-19', () => {
		it('18-19 records from Doria', async () => {
			const result = await transform(fs.createReadStream('./test/recordsDoria2018-19.json', 'utf8'));
			// console.log("--------------------")
			// console.log(JSON.stringify(result, null, 2))
			// console.log("--------------------")
			expect(result).to.eql(doria1819);
		}).timeout(10000);
	});
});
// console.log("--------------------")
// console.log(JSON.stringify(result, null, 2))
// console.log("--------------------")