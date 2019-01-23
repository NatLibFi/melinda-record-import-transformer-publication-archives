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

/* eslint-disable default-case */

import {orderMap, confMap} from './config';
import getStream from 'get-stream';
import {MarcRecord} from '@natlibfi/marc-record';
import langs from 'langs';
import fs from 'fs';

export default async function (stream) {
	var marcRecords = [];

	const records = await JSON.parse(await getStream(stream));
	var result = records.map(convertRecord);
	console.log('Transformed ' + marcRecords.length + ' of ' + records.length);
	fs.writeFileSync('marcRecords.json', JSON.stringify(marcRecords, undefined, 2));
	return Promise.all(result);
	// Return Promise.all(records.map(convertRecord)); //Original line, now replaced with broken code above for file saving

	function convertRecord(record) {
		var control008Structure = [{
			start: 1,
			end: 7,
			value: '000000s'
		}, {
			start: 8,
			end: 11,
			value: null,
			from: 'dc.date.issued'
		}, {
			start: 12,
			end: 15,
			value: '    '
		}, {
			start: 16,
			end: 17,
			value: 'fi',
			from: 'dc.publisher.country'
		}, {
			start: 18,
			end: 35,
			value: ' |||||s|||||||| |b'
		}, {
			start: 36,
			end: 38,
			value: null,
			from: 'dc.language.iso'
		}, {
			start: 39,
			to: 40,
			value: '  '
		}];

		var onTaso = {};

		const marcRecord = new MarcRecord();
		var marcJSON = [];
		var issued = null;
		var controlJSON = [];

		// Standard fields
		marcRecord.leader = '01704nam a  002653i   00';
		controlJSON.push({ // Standard control field
			tag: '007',
			value: 'cr ||||||||||p'
		});

		if (typeof (record.metadata) === 'undefined') {
			console.warn(JSON.stringify(record, null, 2));
			return; // Some records can be '"status": "deleted"' -> no metadata, just header
		}
		var fields = record.metadata[0]['kk:metadata'][0]['kk:field'];

		fields.forEach(field => {
			upsertRecord(confMap.get(getDCPath(field)), field, record.header[0].identifier); // Recursive function to go generate marcJSON later to be transformed to actual Marc
		});

		generateOnTaso();
		generateControlFields();
		generateMarcRecord();

		return marcRecord;

		/// /////////////////////////////////////////////////
		// Start of supporting functions

		// conf: configuration object: {
		// 	marcIf: enum string of cases,
		//	marcIfUnique: boolean if unique marc instance of tag
		// 	marcTag: string for marc tag,
		// 	marcSecondaryTag: string of secondary tag to use
		//	marcSub: string of marc subfield tag
		//	marcSecondarySub: string of secondary marc subfield tags
		//	ind1&ind2: strings of marc indicators
		// }
		// field: single field got from harvesting
		function upsertRecord(conf, field, recordIdentifier) {
			// console.log('--- Upsert ---');
			// console.log('Conf: ', conf);
			// console.log('Field: ', field);
			if (typeof (conf) === 'undefined') {
				return false;
			}
			// Handle special cases by marcIf
			switch (conf.marcIf) {
				// Save onTaso fields for end parsing
				case 'onTaso': {
					onTaso[getDCPath(field)] = field.$.value;

					// Primary tag used for generating record 500, secondary marks onTaso stuff for 502 that is checked later
					if (conf.marcSecondaryTag) {
						field.$.value = clipLang(field.$.value, 'fi='); // Clean field with language options
						generateRecord(conf, field);
					}

					return;
				}

				// First to primary tag, if tag already used generate new with secondary tag
				case 'rest': {
					var foundRec = marcJSON.find(x => x.tag === conf.marcTag);

					if (foundRec) {
						upsertRecord(conf.secondary, field, recordIdentifier);
					} else {
						generateRecord(conf, field);
					}
					return;
				}

				// Save for later use
				case 'issued': {
					var fieldVal = field.$.value;
					if (fieldVal > 4) {
						issued = fieldVal.substring(0, 4);
					}
					break;
				}

				// Check if language field should be transformed from 2 chars to 3 chars, then normal handling
				case 'langField': {
					// Language code might be already in ISO 639-2b (3 chars)
					if (field.$.value.length === 2 && typeof(langs.where(1, field.$.value)) !== 'undefined') {
						field.$.originalValue = field.$.value;
						field.$.value = langs.where(1, field.$.value)['2B'];
					}else{
						console.warn("Record: ", recordIdentifier, " has two char language code that cannot be transformed to three char version, this will break leader: ", field.$.value)
					}
					break;
				}
			}

			// Normal case
			generateRecord(conf, field);

			// Secondary tag generation with conf
			if (conf.marcSecondaryTag) {
				conf.marcTag = conf.marcSecondaryTag;
				generateRecord(conf, field);
			} else if (conf.secondary) {
				generateRecord(conf.secondary, field);
			}
		}

		function generateRecord(conf, field) {
			// console.log('--- Generate ---');
			// console.log('Conf: ', conf);
			// console.log('Field: ', field);
			if (conf.marcTag === '008') { // Controller fields
				modifyControlField(field);
			} else { // Normal fields
				var foundRec = marcJSON.find(x => x.tag === conf.marcTag);
				// Earlier existing record and should be unique -> push new subfield
				if (foundRec && conf.unique) {
					// Find out if tag is suppose to be in specific order
					var orderArr = orderMap.get(conf.marcTag);
					if (orderArr && foundRec.subfields.length >= 1) {
						var indexInserted = orderArr.order.indexOf(conf.marcSub);
						var indexPos = 0;

						foundRec.subfields.forEach(element => {
							if (orderArr.order.indexOf(element.code) <= indexInserted) {
								indexPos++;
							}
						});

						foundRec.subfields.splice(indexPos, 0, {
							code: conf.marcSub,
							value: valueFixing(conf, field)
						});
					} else {
						foundRec.subfields.push({
							code: conf.marcSub,
							value: valueFixing(conf, field)
						});
					}

				// No earlier record or not unique -> generate new record
				} else {
					foundRec = {
						tag: conf.marcTag,
						ind1: conf.ind1 || '',
						ind2: conf.ind2 || '',
						subfields: [{
							code: conf.marcSub,
							value: valueFixing(conf, field)
						}]
					};
					marcJSON.push(foundRec);
				}

				// Set possibly preset value as subfield (describing static type etc)
				if (conf.presetValue) {
					foundRec.subfields.push({
						code: conf.presetValue.sub,
						value: conf.presetValue.value
					});
				}

				// If secondary tag exist, field is suppose to be also saved to secondary location: generate config file with secondary fields as primary keys
				// Exception: conf.marcIf === 'rest' -> secondary values describe values for 2nd, 3th ... values (handled in upsertRecord())
				if (conf.marcSecondaryTag && (!conf.marcIf === 'rest')) {
					generateRecord({marcTag: conf.marcSecondaryTag, marcSub: conf.marcSecondarySub, unique: conf.marcIfUnique, ind1: conf.marcSecondaryInd1 || conf.ind1, ind2: conf.marcSecondaryInd2 || conf.ind2, marcPresetValue: conf.marcSecondaryPresetValue}, field);
				}
			}

			// Adds prefix and suffix
			function valueFixing(conf, field) {
				return (conf.prefix || '') + field.$.value + (conf.suffix || '');
			}
		}

		// Modify control field structure by field:
		// find correct sub object by DC path -> shorten/transform if needed -> set value
		function modifyControlField(field) {
			var dcPath = getDCPath(field);
			var fieldToEdit = control008Structure.find(obj => {
				return obj.from === dcPath;
			});

			var fieldVal = field.$.value;
			switch (fieldToEdit.from) {
				case 'dc.date.issued': {
					if (fieldVal > 4) {
						fieldVal = fieldVal.substring(0, 4);
					}
					break;
				}
				case 'dc.publisher.country': {
					if (fieldVal.length > 2) {
						fieldVal = fieldVal.substring(0, 2);
					}
					break;
				}
			}
			fieldToEdit.value = fieldVal;
		}

		// This handles 502 field to be sure that it is generated correctly after all fields are read
		function generateOnTaso() {
			if (onTaso['dc.type.ontasot']) {
				var rec = {
					tag: '502',
					ind1: '',
					ind2: '',
					subfields: [{
						code: 'a',
						value: clipLang(onTaso['dc.type.ontasot'], 'fi=') + ' :'
					}]
				};

				// JOS dc.type.ontasot, niin 502$c
				if (onTaso['dc.contributor.organization']) {
					// JOS dc.type.ontasot JA dc.contributor.faculty, niin 502$c (ks. Esimerkki)
					if (onTaso['dc.contributor.faculty']) {
						rec.subfields.push({
							code: 'c',
							value: onTaso['dc.contributor.organization'] + ', ' + clipLang(onTaso['dc.contributor.faculty'], 'fi=') + ', '
						});
					} else {
						rec.subfields.push({
							code: 'c',
							value: onTaso['dc.contributor.organization']
						});
					}

					rec.subfields.push({
						code: 'd',
						value: issued + '.'
					});
				}
				marcJSON.push(rec);
			}
		}

		// Generate control field after all fields are read and push to records
		function generateControlFields() {
			var controlValue008 = '';
			control008Structure.forEach(element => {
				if (typeof (element.value) === 'undefined') {
					console.error('Broken record, with missing control field element: ', element.from);
				}
				controlValue008 += element.value;
			});

			var controlField008 = {
				tag: '008',
				value: controlValue008
			};

			controlJSON.push(controlField008);
		}

		// Generate actual Marc object
		function generateMarcRecord() {
			marcJSON.forEach(field => {
				try{
					marcRecord.insertField(field);
				}catch(error){
					console.error("Record: ", record.header[0].identifier, " something went wrong with field: ", field)
					console.error("Error message: '", error.message, "' (likely empty value)")
				}
			});

			controlJSON.forEach(field => {
				try{
					marcRecord.insertField(field);
				}catch(error){
					console.error("Record: ", record.header[0].identifier, " something went wrong with field: ", field)
					console.error("Error message: '", error.message, "'")
				}
			});

			marcRecords.push(marcRecord); // Save all records to array for debug saving
		}

		// Function to get DC path from field
		function getDCPath(field) {
			var dcPath = field.$.schema + '.' + field.$.element;
			if (typeof (field.$.qualifier) !== 'undefined') {
				dcPath = dcPath + '.' + field.$.qualifier;
			}
			return dcPath;
		}

		// Faculty can be like: 'fi=Yhteiskuntatieteiden tiedekunta | en=Faculty of Social Sciences|'
		function clipLang(text, identifier) {
			if (text.includes(identifier) && text.includes(' | ')) {
				return text.substring(text.indexOf(identifier) + 3, text.indexOf(' | '));
			}
			console.warn('*** Should clip language version, but something went wrong, returning original text (incomplete implementation)');
			console.warn(JSON.stringify(onTaso, null, 2));
			return text;
		}
		// End of supporting functions
		/// /////////////////////////////////////////////////
	}
}
