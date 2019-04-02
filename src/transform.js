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

import {orderMap, conditionalCases, control007, control008Strc, standardFields, ldr, confMap} from './config';
import getStream from 'get-stream';
import {MarcRecord} from '@natlibfi/marc-record';
import {Utils} from '@natlibfi/melinda-commons';
import langs from 'langs';

const {createLogger} = Utils;

export default async function (stream) {
	// Var marcRecords = []; //Debug/Saving array

	const Logger = createLogger();
	const records = await JSON.parse(await getStream(stream));

	Logger.log('debug', `Starting conversion of ${records.length} records...`);
	return Promise.all(records.map(convertRecord));

	function convertRecord(record) {
		var control008Structure = control008Strc.map(a => Object.assign({}, a)); // Deepcopy configuration array
		var onTaso = {};

		const marcRecord = new MarcRecord();
		var marcJSON = [];
		var issued = null;
		var controlJSON = [];
		var ignoredFields = []; // Fields to ignore
		var ysaPresent = null;

		// Standard fields
		marcRecord.leader = ldr;
		controlJSON.push(control007);

		if (typeof (record.metadata) === 'undefined') {
			console.warn(JSON.stringify(record, null, 2));
			return; // Some records can be '"status": "deleted"' -> no metadata, just header
		}
		var fields = record.metadata[0]['kk:metadata'][0]['kk:field'];

		// Check condition fields before actual cycle
		conditionalFields();

		fields.forEach(field => {
			upsertRecord(confMap.get(getDCPath(field)), field, record.header[0].identifier); // Recursive function to go generate marcJSON later to be transformed to actual Marc
		});

		generateOnTaso(); // OpinnayteTaso
		generateControlFields();
		generateMarcRecord();

		return marcRecord;

		/// /////////////////////////////////////////////////
		// Start of supporting functions

		function conditionalFields() {
			fields.forEach(field => {
				// Check if conditional case exists and it has ingnored fields
				let conditionalCase = conditionalCases.get(getDCPath(field));
				if (conditionalCase) {
					if (conditionalCase.ignore) {
						ignoredFields = ignoredFields.concat(conditionalCases.get(getDCPath(field)).ignore);
					} else if (conditionalCase.ysaPresent) {
						ysaPresent = conditionalCase.ysaPresent;
					}
				}
			});
		}

		// Conf: configuration object: {
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
			if (typeof (conf) === 'undefined') {
				return false;
			}

			if (ignoredFields.includes(getDCPath(field))) { // Ignored field
				return false;
			}
			var tempConf = null;

			// Handle special cases by marcIf
			switch (conf.marcIf) {
				// Save onTaso fields for end parsing
				case 'onTaso': {
					onTaso[getDCPath(field)] = field.$.value;
					if (conf.marcSecondaryTag) { // Primary tag used for generating record 500, onTasoTag is checked later
						field.$.value = clipLang(field.$.value, 'fi='); // Clean field with language options

						tempConf = Object.assign({}, conf);
						tempConf.marcTag = tempConf.marcSecondaryTag; // Primary tag is used to onTaso, secondary for stand alone generation
						delete tempConf.marcSecondaryTag;
						generateRecord(tempConf, field);
					}
					return;
				}

				// First to primary tag, if tag already used generate new with secondary tag
				case 'rest': {
					var foundRec = marcJSON.find(x => x.tag === conf.marcTag);

					if (foundRec) {
						upsertRecord(conf.marcRest, field, recordIdentifier);
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

				// Detect subfield replacing
				case 'replace': {
					if (conf.marcReplace && conf.marcReplace.phrase === field.$.value) { // Matches replace phrase, replace
						field.$.value = conf.marcReplace.replace;
						break;
					} else { // Does not match, use original values
						if (conf.marcReplace && conf.marcReplace.removePresetIfNotMatch) {
							tempConf = Object.assign({}, conf);
							delete tempConf.presetFields; // Remove possible preset fields
							generateRecord(tempConf, field);
						} else {
							generateRecord(conf, field);
						}
						return;
					}
				}

				// Check if language field should be transformed from 2 chars to 3 chars, then normal handling
				case 'langField': {
					// Language code might be already in ISO 639-2b (3 chars)
					if (field.$.value.length === 2 && typeof (langs.where(1, field.$.value)) !== 'undefined') {
						field.$.originalValue = field.$.value;
						field.$.value = langs.where(1, field.$.value)['2B'];
					} else {
						console.warn('Record: ', recordIdentifier, ' has two char language code that cannot be transformed to three char version, this will break leader: ', field.$.value);
					}
					break;
				}

				// Conditional field are checked before parsing, if dc.subject.ysa
				case 'ysaPresent': {
					if (ysaPresent) { // Conditional field found
						generateRecord(conf.marcIfConfig, field); // Use ifConfig
						return; // Ignore normal functionality
					}
					break; // Normal functionality
				}
			}

			// Normal case
			generateRecord(conf, field);

			// Secondary tag generation with conf
			if (conf.marcSecondaryTag) {
				tempConf = Object.assign({}, conf);
				tempConf.marcTag = tempConf.marcSecondaryTag;
				delete tempConf.marcSecondaryTag;
				generateRecord(tempConf, field);
			} else if (conf.secondary) { // Different specification
				conf.secondary.forEach(secondary => {
					generateRecord(secondary, field);
				});
			}
		}

		function generateRecord(conf, field) {
			// Console.log('--- Generate ---');
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

				// Set possibly preset subfield (describing static type etc)
				if (conf.presetFields) {
					conf.presetFields.forEach(presetField => {
						foundRec.subfields.push({
							code: presetField.sub,
							value: presetField.value
						});
					});
				}

				// If secondary tag exist, field is suppose to be also saved to secondary location:
				// generate config file with secondary fields as primary keys
				if (conf.marcSecondaryTag) {
					generateRecord({marcTag: conf.marcSecondaryTag, marcSub: conf.marcSecondarySub, unique: conf.marcIfUnique, ind1: conf.marcSecondaryInd1 || conf.ind1, ind2: conf.marcSecondaryInd2 || conf.ind2, marcpresetFields: conf.marcSecondarypresetFields}, field);
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
				modify008OnTaso(); // Modify 008 leader

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
			standardFields.forEach(field => {
				try {
					marcRecord.insertField(field);
				} catch (error) {
					console.warn('Record: ', record.header[0].identifier, ' something went wrong with field: ', field);
					console.error('Error message: \'', error.message);
				}
			});

			marcJSON.forEach(field => {
				try {
					marcRecord.insertField(field);
				} catch (error) {
					console.warn('Record: ', record.header[0].identifier, ' something went wrong with field: ', field);
					if (field.subfields[0].value === '') {
						console.warn('Error message: \'', error.message, '\' (empty value)');
					} else {
						console.error('Error message: \'', error.message);
					}
				}
			});

			controlJSON.forEach(field => {
				try {
					marcRecord.insertField(field);
				} catch (error) {
					console.error('Record: ', record.header[0].identifier, ' something went wrong with field: ', field);
					console.error('Error message: \'', error.message, '\'');
				}
			});

			// MarcRecords.push(marcRecord); // Save all records to array for debug saving
		}

		function modify008OnTaso() { // Dc.type.ontaso exists, modify control field
			control008Structure[4].value = replaceAt(control008Structure[4].value, 7, 'm');

			// Replace single char at string
			function replaceAt(str, index, chr) {
				if (index > str.length - 1) {
					return str;
				}
				return str.substr(0, index) + chr + str.substr(index + 1);
			}
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
