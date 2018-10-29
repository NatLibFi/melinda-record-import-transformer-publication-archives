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

/* eslint-disable no-unused-vars */

import moment from 'moment';
import getStream from 'get-stream';
import {MarcRecord} from '@natlibfi/marc-record';
import {TransformerUtils as Utils} from '@natlibfi/melinda-record-import-commons';
import langs from 'langs';
import fs, { write } from 'fs';


export default async function (stream) {
	var marcRecords = [];

	const records = await JSON.parse(await getStream(stream));
	var result = records.map(convertRecord);
	console.log("Transformed " + marcRecords.length + " of " + records.length);
	fs.writeFileSync('marcRecords.json', JSON.stringify(marcRecords, undefined, 2));
	return Promise.all(result);
	// return Promise.all(records.map(convertRecord)); //Original line, now replaced with broken code above for file saving

	function convertRecord(record) {
		console.log("---------- Convert record ----------")
		var control008Structure = [{
				start: 1,
				end: 7,
				value: '000000s'
			},{
				start: 8,
				end: 11,
				value: null,
				from: 'dc.date.issued',
			},{
				start: 12,
				end: 15,
				value: '    '
			},{
				start: 16,
				end: 17,
				value: 'fi',
				from: 'dc.publisher.country',
			},{
				start: 18,
				end: 35,
				value: ' |||||s|||||||| |b'
			},{
				start: 36,
				end: 38,
				value: null,
				from: 'dc.language.iso',
			},{
				start: 39,
				to: 40,
				value: '  '
			}];

		var onTaso = [];

		const marcRecord = new MarcRecord();
		var marcJSON = [];
		var marc856modifier = '2';
		var controlJSON = [];	
		var fields = record.metadata[0]['kk:metadata'][0]['kk:field'];
		
		//Function to get DC path from field
		function getDCPath(field){
			var dcPath = field['$'].schema + '.' + field['$'].element;
			if(typeof(field['$'].qualifier) !== 'undefined'){
				dcPath = dcPath + '.' + field['$'].qualifier;
			}
			return dcPath;
		}

		fields.forEach(field => {
			upsertRecord(confMap.get(getDCPath(field)), field); //Recursive function to go generate marcJSON later to be transformed to actual Marc
		});
		generateOnTaso();
		generateControlFields();
		generateMarcRecord();

		return marcRecord;

		////////////////////////////////////////////////////
		// Start of supporting functions

		//conf: configuration object: {
		// 	marcIf: enum string of cases, 
		//	marcIfUnique: boolean if unique marc instance of tag
		// 	marcTag: string for marc tag, 
		// 	marcSecondaryTag: string of secondary tag to use
		//	marcSub: string of marc subfield tag
		//	marcSecondarySub: string of secondary marc subfield tags
		//	ind1&ind2: strings of marc indicators
		// }
		//field: single field got from harvesting
		function upsertRecord(conf, field){
			if(typeof(conf) === 'undefined') return;

			//Handle special cases by marcIf, default is normal case
			switch(conf.marcIf){
				//Save onTaso fields for end parsing
				case 'onTaso':{
					onTaso.push( {dc: getDCPath(field), value: field['$'].value})
					
					//Primary tag used for generating record 500, secondary for onTaso stuff for 502
					if(conf.marcSecondaryTag){
						generateRecord({marcTag: conf.marcTag, marcSub: conf.marcSub, unique: conf.marcIfUnique, ind1: conf.ind1, ind2: conf.ind2}, field)
					}
					break;
				}
				//Save if dc.format.contet sets ind2 and modify all effected 856 fields when generating actual Marc
				case 'modify':{
					if(conf.marcTag === '856' && field['$'].value === 'else'){
						marc856modifier = '0';
					}
					break;
				}
				//First to primary tag, if tag already used generate new with secondary tag
				case 'rest':{
					var foundRec = marcJSON.find(x => x.tag === conf.marcTag);
					if(foundRec){
						upsertRecord({marcTag: conf.marcSecondaryTag, marcSub: conf.marcSecondarySub, unique: conf.marcIfUnique}, field);
						break;
					}//If foundRec === null -> no break -> default
				}
				default:{
					generateRecord(conf, field)
				}
			}
		}


		function generateRecord(conf, field) {
			//Controller fields
			if( conf.marcTag === '008'){
				modifyControlField(field);

			//Normal fields
			}else{
				var foundRec = marcJSON.find(x => x.tag === conf.marcTag);
				
				//Earlier existing record and should be unique -> push new subfield
				if(foundRec && conf.unique){
					foundRec.subfields.push({
						code: conf.marcSub,
						value: field['$'].value
					});
	
				//No earlier record or not unique -> generate new record
				}else{
					foundRec = {
						tag: conf.marcTag,
						ind1: conf.ind1 || '',
						ind2: conf.ind2 || '',
						subfields:[{
							code: conf.marcSub,
							value: field['$'].value
						}]
					};
					marcJSON.push(foundRec);
				}

				//Set possibly preset value as subfield (describing static type etc)
				if(conf.marcPresetValue){
					foundRec.subfields.push({
						code: conf.marcPresetValue.sub,
						value: conf.marcPresetValue.value
					});
				}
	
				//If secondary tag exist, field is suppose to be also saved to secondary location: generate config file with secondary fields as primary keys
				//Exception: conf.marcIf === 'rest' -> secondary values describe values for 2nd, 3th ... values (handled in upsertRecord())
				if(conf.marcSecondaryTag && (!conf.marcIf === 'rest')){
					generateRecord({marcTag: conf.marcSecondaryTag, marcSub: conf.marcSecondarySub, unique: conf.marcIfUnique, ind1: conf.marcSecondaryInd1 || conf.ind1, ind2: conf.marcSecondaryInd2 || conf.ind2, marcPresetValue: conf.marcSecondaryPresetValue}, field)
				}
			}
		};


		//Modify control field structure by field: 
		//find correct sub object by DC path -> shorten/transform if needed -> set value
		function modifyControlField(field){
			var dcPath = getDCPath(field);			
			var fieldToEdit = control008Structure.find(obj => {
				return obj.from === dcPath
			});

			var fieldVal = field['$'].value;
			switch(fieldToEdit.from){
				case 'dc.date.issued':{
					if( fieldVal > 4){
						fieldVal = fieldVal.substring(0, 4);
					}
					break;
				}				
				case 'dc.publisher.country':{
					if(fieldVal.length > 2){
						fieldVal = fieldVal.substring(0, 2);
					}
					break;
				}
				case 'dc.language.iso':{
					//Language code might be already in ISO 639-2b (3 chars)
					if(fieldVal.length === 2){
						fieldVal = langs.where(1, fieldVal)['2B']
					}
					break;
				}
			}
			fieldToEdit.value = fieldVal;
		}


		//This handles 502 field to be sure that it is generated correctly after all fields are read
		function generateOnTaso(){
			if(onTaso.find( e => { return e.dc === 'dc.type.ontasot'})){
				var rec = {
					tag: '502',
					ind1: '',
					ind2: '',
					subfields:[{
						code: 'a',
						value: onTaso.find(e => {return e.dc === 'dc.type.ontasot'}).value
					}]
				};
				
				//JOS dc.type.ontasot, niin 502$c	
				if(onTaso.find( e => { return e.dc === 'dc.contributor.organization'})){
					
					//JOS dc.type.ontasot JA dc.contributor.faculty, niin 502$c (ks. Esimerkki)
					if(onTaso.find( e => { return e.dc === 'dc.contributor.faculty'})){
						//Faculty can be like: 'fi=Yhteiskuntatieteiden tiedekunta | en=Faculty of Social Sciences|'
						var faculty = onTaso.find( e => { return e.dc === 'dc.contributor.faculty'}).value;
						if(faculty.includes('fi=') && faculty.includes(' | ')){
							faculty = faculty.substring(faculty.indexOf('fi=')+3, faculty.indexOf(' | '));
						}

						rec.subfields.push({
							code: 'c',
							value: onTaso.find( e => { return e.dc === 'dc.contributor.organization'}).value + ', ' + faculty
						});	
					
					}else{
						rec.subfields.push({
							code: conf.marcSub,
							value: onTaso.find( e => { return e.dc === 'dc.contributor.organization'}).value
						});		
					}
				}
				marcJSON.push(rec);
			}
		}


		//Generate control field after all fields are read and push to records
		function generateControlFields(){
			var controlValue008 = '';
			control008Structure.forEach(element => {
				if(typeof(element.value) === 'undefined'){
					console.log("Broken element: ", element) //ToDo
				}
				controlValue008 += element.value;
			});

			var controlField008 = {
				tag: '008',
				value: controlValue008
			};
			controlJSON.push(controlField008);
		}

		
		function generateMarcRecord(){
			marcJSON.forEach(field => {
				console.log(field)
				if(field.tag === '856' && marc856modifier){
					field.ind2 = marc856modifier;
				}
				marcRecord.insertField(field);
			});

			controlJSON.forEach(field => {
				marcRecord.insertField(field);
			});

			marcRecords.push(marcRecord); //Save all records to array for debug saving
		}
		// End of supporting functions
		////////////////////////////////////////////////////
	}
}

//Some configuration settings:
//unique: should new subfields be inserted previous record (unique record) or not
//marcIf: enumeration of sort for special cases (rest, dc.type.ontasot, array)
//marcIfUnique: if if-statement is fulfilled (rest) should following record be unique
//All unclear ind* are marked as null/ToDo tag
const confMap = new Map([
	// Teoksen julkaisumaa	Oletuksena aina 'fi'	dc.publisher.country	008 (katso tarkempi ohje)
	[
		'dc.publisher.country',
		{
			label: 'Teoksen julkaisumaa',
			marcTag: '008',
			ind1: null, //ToDo: ''
			ind2: null //ToDo: ''
		}
	],
	// Teoksen kieli	 	dc.language.iso	041$a + 008	tyhjä	tyhjä	 	eng /  041 __ $a eng
	[
		'dc.language.iso',
			{
			label: 'Teoksen kieli',
			marcTag: '041', //ToDo - complex rule: 041$a + 008
			marcSub: 'a',
			marcSecondaryTag: '008',
			ind1: '',
			ind2: ''
		}
	],
	// Julkaisuaika	 	dc.date.issued	264$c + 008	tyhjä	?	 	2018 /  264 __ $c 2018
	[
		'dc.date.issued',
		{
			label: 'Julkaisuaika',
			marcTag: '264', //ToDo - complex rule: 264$c + 008
			marcSub: 'c',
			marcSecondaryTag: '008',
			ind1: '',
			ind2: null //ToDo: '?'
		}
	],
	// Verkkomonografian ISBN-numero	 	dc.identifier.isbn	020$a	tyhjä	tyhjä	 	020 __ $a 978-952-345-525-2
	[
		'dc.identifier.isbn',
		{
			label: 'Verkkomonografian ISBN-numero',
			marcTag: '020',
			marcSub: 'a',
			ind1: '',
			ind2: ''
		}
	],
	// Nimeke	 	dc.title	245$a	1	0
	[
		'dc.title',
		{
			label: 'Nimike',
			marcTag: '245',
			marcSub: 'a',
			ind1: '1',
			ind2: '0'
		},
	],
	// 	Vaihtoehtoinen nimeke	 	dc.title.alternative	246$a	1	3	 	 
	[
		'dc.title.alternative',
		{
			label: 'Vaihtoehtoinen nimeke',
			marcTag: '246',
			marcSub: 'a',
			ind1: '1',
			ind2: '3'
		},
	],
	// Julkaisun painosmerkintä	 	dc.description.edition	250$a	tyhjä	tyhjä	 	 
	[
		'dc.description.edition',
		{
			label: 'Julkaisun painosmerkintä',
			marcTag: '250',
			marcSub: 'a',
			ind1: '',
			ind2: ''
		},
	],
	// Teoksen kustannuspaikkakunta	 	dc.publisher.place	264$a	tyhjä	?	 	 
	[
		'dc.publisher.place',
		{
			label: 'Teoksen kustannuspaikkakunta',
			marcTag: '264',
			marcSub: 'a',
			ind1: '',
			ind2: null //ToDo: ?
		},
	],
	// Julkaisija (kustantaja)	Julkaisijan nimi	dc.publisher	264$b	tyhjä	1?	(Valitaan julkaisun kielen mukaan)	264 _1 $b Turun yliopisto
	[
		'dc.publisher',
		{
			label: 'Julkaisija (kustantaja)',
			marcTag: '264',
			marcSub: 'b',
			ind1: '',
			ind2: '1' //ToDo: 1?
		},
	],
	// Sivumäärä	 	dc.format.extent	300$a	tyhjä	tyhjä	 	esimerkit DC:stä?
	[
		'dc.format.extent',
		{
			label: 'Sivumäärä',
			marcTag: '300',
			marcSub: 'a',
			ind1: '',
			ind2: ''
		},
	],
	// Sarjatieto, nimeke	 	dc.relation.ispartofseries	490$a	1	tyhjä	 	490 1_ $a Turun yliopiston julkaisuja. Sarja B: Humaniora $x 2343-3191 $v 451
	[
		'dc.relation.ispartofseries',
		{
			label: 'Sarjatieto, nimeke',
			marcTag: '490',
			marcSub: 'a',
			ind1: '1',
			ind2: ''
		},
	],
	// Sarjatieto, järjestysnumero	 	dc.relation.numberinseries	490$v	1	tyhjä	 	490 1_ $a Turun yliopiston julkaisuja. Sarja B: Humaniora $x 2343-3191 $v 451
	[
		'dc.relation.numberinseries',
		{
			label: 'Sarjatieto, järjestysnumero',
			marcTag: '490',
			marcSub: 'v',
			ind1: '1',
			ind2: ''
		},
	],
	// Sarjan/lehden ISSN-numero	 	dc.relation.issn	490$x	1	tyhjä	 	490 1_ $a Turun yliopiston julkaisuja. Sarja B: Humaniora $x 2343-3191 $v 451
	[
		'dc.relation.issn',
		{
			label: 'Sarjan/lehden ISSN-numero',
			marcTag: '490',
			marcSub: 'x',
			ind1: '1',
			ind2: ''
		},
	],
	// Lyhyt kuvaus	 	dc.description	500$a	tyhjä	tyhjä	 	500  __ $a Joku huomautus.
	[
		'dc.description',
		{
			label: 'Lyhyt kuvaus',
			marcTag: '500',
			marcSub: 'a',
			ind1: '',
			ind2: ''
		},
	],
	// Muu huomautus	 	dc.description.notification	500$a	tyhjä	tyhjä	 	500  __ $a Joku huomautus.
	[
		'dc.description.notification',
		{
			label: 'Muu huomautus',
			marcTag: '500',
			marcSub: 'a',
			ind1: '',
			ind2: ''
		},
	],
	// Opinnäytteen taso	Väitöskirja/Doctoral dissertation/Doktorsavhandling/Monografiaväitöskirja/Doctoral dissertation (monograph)/Monografiavhandling/Artikkeliväitöskirja/Doctoral dissertation (article-based)/Artikelavhandling/Lisensiaatintyö/Licentiate thesis/Licentiatarbete	
	// dc.type.ontasot	500$a [kentän sisältö] + 502$a 'Väitöskirja'	tyhjä	tyhjä	 	500 __ $a Artikkeliväitöskirja  502 __ $a Väitöskirja
	[
		'dc.type.ontasot',
		{
			label: 'Opinnäytteen taso',
			marcTag: '500', //ToDo - complex rule: 500$a [kentän sisältö] + 502$a 'Väitöskirja'
			marcSub: 'a',
			marcSecondaryTag: '502',
			marcSecondarySub: 'a',
			marcIf: 'onTaso',
			ind1: '',
			ind2: ''
		},
	],
	//  	ks. esimerkki	dc.contributor.organization	JOS dc.type.ontasot, niin 502$c	 	 	 	502 __ $a Väitöskirja : $c Helsingin yliopisto, valtiotieteellinen tiedekunta, $d 2016.
	[
		'dc.contributor.organization',
		{
			label: '', //ToDo
			marcTag: '502', //ToDo - complex rule: JOS dc.type.ontasot, niin 502$c
			marcSub: 'c',
			marcIf: 'onTaso',
			ind1: null, //ToDo
			ind2: null //ToDo
		},
	],
	//  	ks. esimerkki	dc.contributor.faculty	JOS dc.type.ontasot ja dc.contributor.faculty, niin 502$c (ks. Esimerkki)	 	 	 	502 __ $a 'Väitöskirja :' $c [dc.contributor.organization] + ', ' + [dc.contributor.faculty] + ', '  $d [dc.date.issued / pelkkä vuosi=4 ekaa merkkiä]
	[
		'dc.contributor.faculty',
		{
			label: '', //ToDo
			marcTag: '502',
			marcSub: 'c',
			marcIf: 'onTaso',
			ind1: null, //ToDo
			ind2: null //ToDo
		},
	],
	// Rajattu pääsyoikeustieto	 	dc.rights.accessrights	506$a	1	tyhjä	 	 
	[
		'dc.rights.accessrights',
		{
			label: 'Rajattu pääsyoikeustieto',
			marcTag: '506',
			marcSub: 'a',
			ind1: '1',
			ind2: ''
		},
	],
	// Tiivistelmä	 	dc.description.abstract	520$a	tyhjä	tyhjä	 	520  __ $a Tiivistelmä.
	[
		'dc.description.abstract',
		{
			label: 'Tiivistelmä',
			marcTag: '520',
			marcSub: 'a',
			ind1: '',
			ind2: ''
		},
	],
	// Tekijänoikeus-/käyttöoikeustiedot	 	dc.rights	540$c	tyhjä	tyhjä	 	540  __ $c FinELib-lisenssi $u https://www.kiwi.fi/display/finelib/Ellibs
	[
		'dc.rights',
		{
			label: 'Tekijänoikeus-/käyttöoikeustiedot',
			marcTag: '540',
			marcSub: 'c',
			ind1: '',
			ind2: ''
		},
	],
	//  	 	dc.rights.accesslevel	506$a	 	 	 	 
	[
		'dc.rights.accesslevel',
		{
			label: '',
			marcTag: '506',
			marcSub: 'a',
			ind1: '',
			ind2: ''
		},
	],
	// Tekijänoikeus-/käyttöoikeussivun verkko-osoite	 	dc.rights.uri	540$u	tyhjä	tyhjä	 	 
	[
		'dc.rights.uri',
		{
			label: 'Tekijänoikeus-/käyttöoikeussivun verkko-osoite',
			marcTag: '540',
			marcSub: 'u',
			ind1: '',
			ind2: ''
		},
	],
	// Tekijänoikeus-/käyttöoikeussivun verkko-osoite	vaihtoehtoinen	dc.rights.url	540$u	tyhjä	tyhjä	 	 
	[
		'dc.rights.url',
		{
			label: 'Tekijänoikeus-/käyttöoikeussivun verkko-osoite',
			marcTag: '540',
			marcSub: 'u',
			ind1: '',
			ind2: ''
		},
	],
	// Tekijänoikeuksien haltija	 	dc.rights.copyrightholder	542$d	tyhjä	tyhjä	 	 
	[
		'dc.rights.copyrightholder',
		{
			label: 'Tekijänoikeuksien haltija',
			marcTag: '542',
			marcSub: 'd',
			ind1: '',
			ind2: ''
		},
	],
	// Muu tekijänoikeustieto	 	dc.rights.copyright	542$l	tyhjä	tyhjä	 	 
	[
		'dc.rights.copyright',
		{
			label: 'Muu tekijänoikeustieto',
			marcTag: '542',
			marcSub: '1',
			ind1: '',
			ind2: ''
		},
	],
	// Julkaisun kattavuus (aika)	 	dc.coverage.temporal	648$a	tyhjä	7	 	648 _7  $a 1900-luku  $2 ysa  
	[
		'dc.coverage.temporal',
		{
			label: 'Julkaisun kattavuus (aika)',
			marcTag: '648',
			marcSub: 'a',
			ind1: '',
			ind2: '7'
		},
	],
	// Asiasanat	tarkenne	dc.subject.ysa (esim.)	650$a, mahd. tarkenne: 650$2	tyhjä	7	 	650 _7  $a historia  $2 ysa  
	[
		'dc.subject.ysa', //ToDo: "(esim.)"
		{
			label: 'Asiasanat',
			marcTag: '650', //ToDo - complex rule: 650$a, mahd. tarkenne: 650$2
			marcSub: 'a',
			marcSecondaryTag: '650',
			marcSecondarySub: '2',
			ind1: '',
			ind2: '7'
		},
	],
	// Julkaisun kattavuus (paikka)	 	dc.coverage.spatial	651$a	tyhjä	7	 	651 _7  $a Helsinki  $2 ysa  
	[
		'dc.coverage.spatial',
		{
			label: 'Julkaisun kattavuus (paikka)',
			marcTag: '651',
			marcSub: 'a',
			ind1: '',
			ind2: '7'
		},
	],
	// Avainsanat	 	dc.subject	653$a	tyhjä	tyhjä	 	 
	[
		'dc.subject',
		{
			label: 'Avainsanat',
			marcTag: '653',
			marcSub: 'a',
			ind1: '',
			ind2: ''
		},
	],
	// Toimittaja	 	dc.contributor.editor	700$a	1	tyhjä	 	700 1_ $a Ahola, Johanna, $e toimittaja.
	[
		'dc.contributor.editor',
		{
			label: 'Toimittaja',
			marcTag: '700',
			marcSub: 'a',
			ind1: '1',
			ind2: ''
		},
	],
	// Painetun monografian ISBN-numero	 	dc.relation.isversionof	776$z (vakiofraasi i osakenttään)	0	8	 	776 08 $i Painettu: $z 9518826536
	[
		'dc.relation.isversionof',
		{
			label: 'Painetun monografian ISBN-numero',
			marcTag: '776', //ToDo: (vakiofraasi i osakenttään)
			marcSub: 'z',
			ind1: '0',
			ind2: '8'
		},
	],
	// Julkaisun DOI-tunnus	 	dc.identifier.doi	856$u	4	0	 	 
	[
		'dc.identifier.doi', //ToDo: 024$a $2 doi 7 #  //URN, DOI
		{
			label: 'Julkaisun DOI-tunnus',
			marcTag: '856',
			marcSub: 'u',
			marcSecondaryTag: '024', //ToDo: 024$a $2 doi 7 #
			marcSecondarySub: 'a',
			marcSecondaryInd1: '7',
			marcSecondaryInd2: '#',
			marcSecondaryPresetValue:{
				sub: '2',
				value: 'doi'
			},
			ind1: '4',
			ind2: '0'
		},
	],
	// Julkaisun URI	 	dc.identifier.uri	856$u	4	0	 	 
	[
		'dc.identifier.uri',
		{
			label: 'Julkaisun URI',
			marcTag: '856',
			marcSub: 'u',
			ind1: '4',
			ind2: '0'
		},
	],
	// Julkaisun URL	vaihtoehtoinen	dc.identifier.url	856$u	4	0	 	 
	[
		'dc.identifier.url', 
		{
			label: 'Julkaisun URL', //vaihtoehtoinen
			marcTag: '856',
			marcSub: 'u',
			ind1: '4',
			ind2: '0'
		},
	],
	// URN-tunnus	 	dc.identifier.urn	856$u	4	0	 	 
	[
		'dc.identifier.urn',  
		{
			label: 'URN-tunnus',
			marcTag: '856',
			marcSub: 'u',
			marcSecondaryTag: '024', //ToDo: 024$a $2 urn 7 #
			marcSecondarySub: 'a',
			marcSecondaryInd1: '7',
			marcSecondaryInd2: '#',
			marcSecondaryPresetValue:{
				sub: '2',
				value: 'urn'
			},
			ind1: '4',
			ind2: '0'
		},
	],
	// Muu verkko-osoite	 	dc.relation.url	856$u	4	2	 	 
	[
		'dc.relation.url',
		{
			label: 'Muu verkko-osoite',
			marcTag: '856',
			marcSub: 'u',
			ind1: '4',
			ind2: '2' //ToDo: If previous #4#0 should we create new record or update to #4#2 
		},
	],
	// Muu verkko-osoite	 	dc.relation.uri	 	 	 	 	 
	[
		'dc.relation.uri',
		{
			label: 'Muu verkko-osoite',
			marcTag: '', //ToDo
			ind1: null, //ToDo
			ind2: null //ToDo
		},
	],
	// Muu URN-tunnus	 	dc.relation.urn	856$u	4	2	 	 
	[
		'dc.relation.urn',
		{
			label: 'Muu URN-tunnus',
			marcTag: '856',
			marcSub: 'u',
			ind1: '4',
			ind2: '2'
		},
	],
	// Tekijä	 	dc.contributor.author	Eka 100$a, loput 700$a	1	tyhjä	 	100 1_ $a Ahola, Johanna, $e kirjoittaja.
	[
		'dc.contributor.author',
		{
			label: 'Tekijä',
			marcTag: '100', //ToDo: Eka 100$a, loput 700$a
			marcSub: 'a',
			marcIf: 'rest',
			marcIfUnique: false,
			marcSecondaryTag: '700',
			marcSecondarySub: 'a',
			ind1: '1',
			ind2: ''
		},
	],
	// Tekijä	vaihtoehtoinen	dc.creator	Eka 100$a, loput 700$a	1	tyhjä	 	700 1_ $a Ahola, Johanna, $e kirjoittaja.
	[
		'dc.creator',
		{
			label: 'Tekijä',
			marcTag: '100', //ToDo: Eka 100$a, loput 700$a
			marcSub: 'a',
			marcIf: 'rest',
			marcIfUnique: false,
			marcSecondaryTag: '700',
			marcSecondarySub: 'a',
			ind1: '1',
			ind2: ''
		},
	],
	// Tietueen sisältö	fulltext=0/metadataOnly=2/abstractOnly=2	dc.format.content	Vaikutta 856 2.indikaattoriin (0=fulltext,2=muu)	 	0 tai 2	 	 
	[
		'dc.format.content',
		{
			label: 'Tietueen sisältö',
			marcTag: '856',
			marcIf: 'modify'
		},
	]
]);