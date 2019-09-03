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
import fs from 'fs';

import validDoria1819 from './validDoria1819Small.json' //Duplicate of this in .js file to see changes in commit, remove it later
import valid19Doria  from './2019Harvests/valid19Doria.json';
import valid19Julkari  from './2019Harvests/valid19Julkari.json';
import valid19Lauda  from './2019Harvests/valid19Lauda.json';
import valid19Luke from './2019Harvests/valid19Luke.json';
import valid19Lutpub  from './2019Harvests/valid19Lutpub.json';
import valid19UTA  from './2019Harvests/valid19UTA.json';
import valid19uWasa  from './2019Harvests/valid19uWasa.json';
import valid19Valto10  from './2019Harvests/valid19Valto10.json';


const {expect} = chai;
chai.use(chaiAsPromised);

describe('Check different transformation cases', () => {
	describe('#Doria18-19', () => {
		it('18-19 records from Doria', async () => {
			const result = await transform(fs.createReadStream('./test/recordsDoria2018-19Small.json', 'utf8'));
			expect(result).to.eql(validDoria1819);
		}).timeout(100000);
	});

	describe('#2019 Harvests, 2016>', () => {
		it('Doria', async () => {
			const result = await transform(fs.createReadStream('./test/2019Harvests/fetched19Doria.json', 'utf8'));
			expect(result).to.eql(valid19Doria);
		}).timeout(10000);
		
		it('Julkari', async () => {
			const result = await transform(fs.createReadStream('./test/2019Harvests/fetched19Julkari.json', 'utf8'));
			expect(result).to.eql(valid19Julkari);
		}).timeout(10000);
		
		it('Lauda', async () => {
			const result = await transform(fs.createReadStream('./test/2019Harvests/fetched19Lauda.json', 'utf8'));
			expect(result).to.eql(valid19Lauda);
		}).timeout(10000);
		
		it('Luke', async () => {
			const result = await transform(fs.createReadStream('./test/2019Harvests/fetched19Luke.json', 'utf8'));
			expect(result).to.eql(valid19Luke);
		}).timeout(10000);
		
		it('Lutpub', async () => {
			const result = await transform(fs.createReadStream('./test/2019Harvests/fetched19Lutpub.json', 'utf8'));
			expect(result).to.eql(valid19Lutpub);
		}).timeout(10000);
		
		it('UTA', async () => {
			const result = await transform(fs.createReadStream('./test/2019Harvests/fetched19UTA.json', 'utf8'));
			expect(result).to.eql(valid19UTA);
		}).timeout(10000);
		
		it('uWasa', async () => {
			const result = await transform(fs.createReadStream('./test/2019Harvests/fetched19uWasa.json', 'utf8'));
			expect(result).to.eql(valid19uWasa);
		}).timeout(10000);

		it('Valto, with "issued" > 2010', async () => {
			const result = await transform(fs.createReadStream('./test/2019Harvests/fetched19Valto10.json', 'utf8'));
			expect(result).to.eql(valid19Valto10);
		}).timeout(10000);

		// //UTU
		// it('UTU', async () => {
		// 	const result = await transform(fs.createReadStream('./test/2019Harvests/', 'utf8'));
		// 	expect(result).to.eql(valid19);
		// }).timeout(10000);
		
		// //Theseus 
		// it('Theseus', async () => {
		// 	const result = await transform(fs.createReadStream('./test/2019Harvests/', 'utf8'));
		// 	expect(result).to.eql(valid19);
		// }).timeout(10000);
	});
	  
});
// console.log("--------------------")
// console.log(JSON.stringify(result, null, 2))
// console.log("--------------------")
