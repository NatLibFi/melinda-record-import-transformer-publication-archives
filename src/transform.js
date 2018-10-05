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
// import createMaterialFields from './create-material-fields';

export default async function (stream) {
	const records = await JSON.parse(await getStream(stream));
	return Promise.all(records.map(convertRecord));

	function convertRecord(record) {
		const marcRecord = new MarcRecord();		
		var fields = record.metadata[0]['kk:metadata'][0]['kk:field'];
		console.log("------- Detailing record -------")
		console.log("Record: ", record)
		console.log("--------------------------------");
		// console.log("Header: ", record.header)
		console.log("Header: ", record.header[0])
		console.log("------- Detailing record end -------");
		console.log("Fields: ", fields);
		console.log("--------------------------------");
		var sumFound = 0;
		var sumNotFound = 0;

		var found = [];
		var notFound = [];
		var conf;
		
		fields.forEach(field => {
			var dcPath = field['$'].schema + '.' + field['$'].element;
			if(typeof(field['$'].qualifier) !== 'undefined'){
				dcPath = dcPath + '.' + field['$'].qualifier;
			}
			// console.log(field['$']);
			// console.log("Path: ", dcPath);
			// console.log("Find: ", conf.get(dcPath))
			// console.log("--------------------------------");
			conf = confMap.get(dcPath)
			if(typeof(conf) !== 'undefined'){
				found.push(field);
				sumFound++;

				marcRecord.insertField({
					tag: conf.marc,
					ind1: conf.ind1,
					ind2: conf.ind2,
					// subfields: field.subfields.map(subfield => ({
					// 	code: subfield.tag,
					// 	value: subfield.content
					// }))
				});

			}else{
				notFound.push(field);
				sumNotFound++;
			}
		});

		// [
		// 	'dc.publisher.country',
		// 	{
		// 		label: 'Teoksen julkaisumaa',
		// 		marc: '008',
		// 		ind1: null, //ToDo: ''
		// 		ind2: null //ToDo: ''
		// 	}
		// ],

		console.log("Found: ")
		console.log(found)
		console.log("Not found: ")
		console.log(notFound)
		console.log("Sum founds")
		console.log("Found: ", sumFound, " not found: ", sumNotFound);
		console.log("Array lengths")
		console.log("Found length: ", found.length, " not found: ", notFound.length)
		// record.varFields.forEach(field => {
		// 	if (field.content) {
		// 		if (field.fieldTag === '_') {
		// 			marcRecord.leader = field.content;
		// 		} else {
		// 			marcRecord.insertField({tag: field.marcTag, value: field.content});
		// 		}
		// 	} else if (field.subfields) {
		// 		try {
		// 			marcRecord.insertField({
		// 				tag: field.marcTag,
		// 				ind1: field.ind1,
		// 				ind2: field.ind2,
		// 				subfields: field.subfields.map(subfield => ({
		// 					code: subfield.tag,
		// 					value: subfield.content
		// 				}))
		// 			});
		// 		} catch (err) {
		// 			if (!/^Field is invalid/.test(err.message)) {
		// 				throw err;
		// 			}
		// 		}
		// 	}
		// });

		if (!record.varFields.find(f => f.marcTag === '007')) {
			console.log("Should create fields here");
			// const fields = createMaterialFields(record) || [];
			// fields.forEach(f => {
			// 	if (f.tag === '006') {
			// 		const f006 = marcRecord.get(/^006$/).shift();

			// 		if (f006) {
			// 			marcRecord.removeField(f006);
			// 		}
			// 	}

			// 	marcRecord.insertField(f)
			// });
		}

		marcRecord.insertField({tag: 'SID', subfields: [
			{code: 'a', value: record.id},
			{code: 'b', value: 'helme'}
		]});

		return marcRecord;
	}
}

// https://www.kiwi.fi/pages/viewpage.action?pageId=97881359
// Not found:
// [ 
// This is not in spec, but sibling dc.date.issued	is
// 	{ '$':
//      { schema: 'dc',
//        element: 'date',
//        qualifier: 'accessioned', 
//        language: 'none',
//        value: '2018-09-06T12:17:17Z' } },

// This is not in spec, but sibling dc.date.issued	is
//   { '$':
//      { schema: 'dc',
//        element: 'date',
//        qualifier: 'available',
//        language: 'none',
//        value: '2018-09-06T12:17:17Z' } },

// This is not in spec, but sibling dc.type.ontasot	is
//   { '$':
//      { schema: 'dc',
//        element: 'type',
//        qualifier: 'version',
//        language: '-',
//        value: 'publishedVersion' } },

// This is not in spec, but sibling dc.type.ontasot	is
//   { '$':
//      { schema: 'dc',
//        element: 'type',
//        qualifier: 'publication',
//        language: '-',
//        value: 'article' } },

// This is not in spec, but parent dc.subject is
//   { '$':
//      { schema: 'dc',
//        element: 'subject',
//        qualifier: 'okm',
//        language: '-',
//        value: 'fi=Hoitotiede | en=Nursing|' } },

// This is not in spec, but parent dc.subject is
//   { '$':
//      { schema: 'dc',
//        element: 'subject',
//        qualifier: 'okm',
//        language: '-',
//        value: 'fi=Oikeuslääketiede ja muut lääketieteet | en=Forensic science and other medical sciences|' } },

// This is not in spec, but siblings dc.format.extent & dc.format.content are
//   { '$':
//      { schema: 'dc',
//        element: 'format',
//        qualifier: 'pagerange',
//        language: '-',
//        value: '11-20' } },

// This is not in spec, but cousin dc.identifier.doi is
//   { '$':
//      { schema: 'dc',
//        element: 'relation',
//        qualifier: 'doi',
//        language: '-',
//        value: '10.5430/cns.v7n1p11' } },

// This is not in spec
//   { '$':
//      { schema: 'dc',
//        element: 'relation',
//        qualifier: 'issue',
//        language: '-',
//        value: '1' } },

// This is not in spec, but siblings dc.relation.ispartofseries & .numberinseries & .issn & .isversionof & .url & .uri & .urn are
//   { '$':
//      { schema: 'dc',
//        element: 'relation',
//        qualifier: 'ispartofjournal',
//        language: '-',
//        value: 'Clinical Nursing Studies' } },

// This is not in spec, but siblings dc.relation.ispartofseries & .numberinseries & .issn & .isversionof & .url & .uri & .urn are
//   { '$':
//      { schema: 'dc',
//        element: 'relation',
//        qualifier: 'volume',
//        language: '-',
//        value: '7' } }
//	]


const confMap = new Map([
	// Teoksen julkaisumaa	Oletuksena aina 'fi'	dc.publisher.country	008 (katso tarkempi ohje)
	[
		'dc.publisher.country',
		{
			label: 'Teoksen julkaisumaa',
			marc: '008',
			ind1: null, //ToDo: ''
			ind2: null //ToDo: ''
		}
	],
	// Teoksen kieli	 	dc.language.iso	041$a + 008	tyhjä	tyhjä	 	eng /  041 __ $a eng
	[
		'dc.language.iso',
			{
			label: 'Teoksen kieli',
			marc: '041$a', //ToDo - complex rule: 041$a + 008
			marcSecondary: '008',
			ind1: null,
			ind2: null
		}
	],
	// Julkaisuaika	 	dc.date.issued	264$c + 008	tyhjä	?	 	2018 /  264 __ $c 2018
	[
		'dc.date.issued',
		{
			label: 'Julkaisuaika',
			marc: '264$c', //ToDo - complex rule: 264$c + 008
			marcSecondary: '008',
			ind1: null,
			ind2: null //ToDo: '?'
		}
	],
	// Verkkomonografian ISBN-numero	 	dc.identifier.isbn	020$a	tyhjä	tyhjä	 	020 __ $a 978-952-345-525-2
	[
		'dc.identifier.isbn',
		{
			label: 'Verkkomonografian ISBN-numero',
			marc: '020$a',
			ind1: null,
			ind2: null
		}
	],
	// Nimeke	 	dc.title	245$a	1	0
	[
		'dc.title',
		{
			label: 'Nimike',
			marc: '245$a',
			ind1: 1,
			ind2: 0
		},
	],
	// 	Vaihtoehtoinen nimeke	 	dc.title.alternative	246$a	1	3	 	 
	[
		'dc.title.alternative',
		{
			label: 'Vaihtoehtoinen nimeke',
			marc: '246$a',
			ind1: 1,
			ind2: 3
		},
	],
	// Julkaisun painosmerkintä	 	dc.description.edition	250$a	tyhjä	tyhjä	 	 
	[
		'dc.description.edition',
		{
			label: 'Julkaisun painosmerkintä',
			marc: '250$a',
			ind1: null,
			ind2: null
		},
	],
	// Teoksen kustannuspaikkakunta	 	dc.publisher.place	264$a	tyhjä	?	 	 
	[
		'dc.publisher.place',
		{
			label: 'Teoksen kustannuspaikkakunta',
			marc: '264$a',
			ind1: null,
			ind2: null //ToDo: ?
		},
	],
	// Julkaisija (kustantaja)	Julkaisijan nimi	dc.publisher	264$b	tyhjä	1?	(Valitaan julkaisun kielen mukaan)	264 _1 $b Turun yliopisto
	[
		'dc.publisher',
		{
			label: 'Julkaisija (kustantaja)',
			marc: '264$b',
			ind1: null,
			ind2: 1 //ToDo: 1?
		},
	],
	// Sivumäärä	 	dc.format.extent	300$a	tyhjä	tyhjä	 	esimerkit DC:stä?
	[
		'dc.format.extent',
		{
			label: 'Sivumäärä',
			marc: '300$a',
			ind1: null,
			ind2: null
		},
	],
	// Sarjatieto, nimeke	 	dc.relation.ispartofseries	490$a	1	tyhjä	 	490 1_ $a Turun yliopiston julkaisuja. Sarja B: Humaniora $x 2343-3191 $v 451
	[
		'dc.relation.ispartofseries',
		{
			label: 'Sarjatieto, nimeke',
			marc: '490$a',
			ind1: 1,
			ind2: null
		},
	],
	// Sarjatieto, järjestysnumero	 	dc.relation.numberinseries	490$v	1	tyhjä	 	490 1_ $a Turun yliopiston julkaisuja. Sarja B: Humaniora $x 2343-3191 $v 451
	[
		'dc.relation.numberinseries',
		{
			label: 'Sarjatieto, järjestysnumero',
			marc: '490$v',
			ind1: 1,
			ind2: null
		},
	],
	// Sarjan/lehden ISSN-numero	 	dc.relation.issn	490$x	1	tyhjä	 	490 1_ $a Turun yliopiston julkaisuja. Sarja B: Humaniora $x 2343-3191 $v 451
	[
		'dc.relation.issn',
		{
			label: 'Sarjan/lehden ISSN-numero',
			marc: '490$x',
			ind1: 1,
			ind2: null
		},
	],
	// Lyhyt kuvaus	 	dc.description	500$a	tyhjä	tyhjä	 	500  __ $a Joku huomautus.
	[
		'dc.description',
		{
			label: 'Lyhyt kuvaus',
			marc: '500$a',
			ind1: null,
			ind2: null
		},
	],
	// Muu huomautus	 	dc.description.notification	500$a	tyhjä	tyhjä	 	500  __ $a Joku huomautus.
	[
		'dc.description.notification',
		{
			label: 'Muu huomautus',
			marc: '500$a',
			ind1: null,
			ind2: null
		},
	],
	// Opinnäytteen taso	Väitöskirja/Doctoral dissertation/Doktorsavhandling/Monografiaväitöskirja/Doctoral dissertation (monograph)/Monografiavhandling/Artikkeliväitöskirja/Doctoral dissertation (article-based)/Artikelavhandling/Lisensiaatintyö/Licentiate thesis/Licentiatarbete	
	// dc.type.ontasot	500$a [kentän sisältö] + 502$a 'Väitöskirja'	tyhjä	tyhjä	 	500 __ $a Artikkeliväitöskirja  502 __ $a Väitöskirja
	[
		'dc.type.ontasot',
		{
			label: 'Opinnäytteen taso',
			marc: '500$a', //ToDo - complex rule: 500$a [kentän sisältö] + 502$a 'Väitöskirja'
			marcSecondary: '502$a',
			ind1: null,
			ind2: null
		},
	],
	//  	ks. esimerkki	dc.contributor.organization	JOS dc.type.ontasot, niin 502$c	 	 	 	502 __ $a Väitöskirja : $c Helsingin yliopisto, valtiotieteellinen tiedekunta, $d 2016.
	[
		'dc.contributor.organization',
		{
			label: '', //ToDo
			marc: '502$c', //ToDo - complex rule: JOS dc.type.ontasot, niin 502$c
			marcIf: 'dc.type.ontasot',
			ind1: null, //ToDo
			ind2: null //ToDo
		},
	],
	//  	ks. esimerkki	dc.contributor.faculty	JOS dc.type.ontasot ja dc.contributor.faculty, niin 502$c (ks. Esimerkki)	 	 	 	502 __ $a 'Väitöskirja :' $c [dc.contributor.organization] + ', ' + [dc.contributor.faculty] + ', '  $d [dc.date.issued / pelkkä vuosi=4 ekaa merkkiä]
	[
		'dc.contributor.faculty',
		{
			label: '', //ToDo
			marc: '502$c',
			marcIf: ['dc.type.ontasot', 'dc.contributor.faculty'],
			ind1: null, //ToDo
			ind2: null //ToDo
		},
	],
	// Rajattu pääsyoikeustieto	 	dc.rights.accessrights	506$a	1	tyhjä	 	 
	[
		'dc.rights.accessrights',
		{
			label: 'Rajattu pääsyoikeustieto',
			marc: '506$a',
			ind1: 1,
			ind2: null
		},
	],
	// Tiivistelmä	 	dc.description.abstract	520$a	tyhjä	tyhjä	 	520  __ $a Tiivistelmä.
	[
		'dc.description.abstract',
		{
			label: 'Tiivistelmä',
			marc: '520$a',
			ind1: null,
			ind2: null
		},
	],
	// Tekijänoikeus-/käyttöoikeustiedot	 	dc.rights	540$c	tyhjä	tyhjä	 	540  __ $c FinELib-lisenssi $u https://www.kiwi.fi/display/finelib/Ellibs
	[
		'dc.rights',
		{
			label: 'Tekijänoikeus-/käyttöoikeustiedot',
			marc: '540$c',
			ind1: null,
			ind2: null
		},
	],
	//  	 	dc.rights.accesslevel	506$a	 	 	 	 
	[
		'dc.rights.accesslevel',
		{
			label: '',
			marc: '506$a',
			ind1: null,
			ind2: null
		},
	],
	// Tekijänoikeus-/käyttöoikeussivun verkko-osoite	 	dc.rights.uri	540$u	tyhjä	tyhjä	 	 
	[
		'dc.rights.uri',
		{
			label: 'Tekijänoikeus-/käyttöoikeussivun verkko-osoite',
			marc: '540$u',
			ind1: null,
			ind2: null
		},
	],
	// Tekijänoikeus-/käyttöoikeussivun verkko-osoite	vaihtoehtoinen	dc.rights.url	540$u	tyhjä	tyhjä	 	 
	[
		'dc.rights.url',
		{
			label: 'Tekijänoikeus-/käyttöoikeussivun verkko-osoite',
			marc: '540$u',
			ind1: null,
			ind2: null
		},
	],
	// Tekijänoikeuksien haltija	 	dc.rights.copyrightholder	542$d	tyhjä	tyhjä	 	 
	[
		'dc.rights.copyrightholder',
		{
			label: 'Tekijänoikeuksien haltija',
			marc: '542$d',
			ind1: null,
			ind2: null
		},
	],
	// Muu tekijänoikeustieto	 	dc.rights.copyright	542$l	tyhjä	tyhjä	 	 
	[
		'dc.rights.copyright',
		{
			label: 'Muu tekijänoikeustieto',
			marc: '542$l',
			ind1: null,
			ind2: null
		},
	],
	// Julkaisun kattavuus (aika)	 	dc.coverage.temporal	648$a	tyhjä	7	 	648 _7  $a 1900-luku  $2 ysa  
	[
		'dc.coverage.temporal',
		{
			label: 'Julkaisun kattavuus (aika)',
			marc: '648$a',
			ind1: null,
			ind2: 7
		},
	],
	// Asiasanat	tarkenne	dc.subject.ysa (esim.)	650$a, mahd. tarkenne: 650$2	tyhjä	7	 	650 _7  $a historia  $2 ysa  
	[
		'dc.subject.ysa', //ToDo: "(esim.)"
		{
			label: 'Asiasanat',
			marc: '650$a', //ToDo - complex rule: 650$a, mahd. tarkenne: 650$2
			marcSecondary: '650$2',
			ind1: null,
			ind2: 7
		},
	],
	// Julkaisun kattavuus (paikka)	 	dc.coverage.spatial	651$a	tyhjä	7	 	651 _7  $a Helsinki  $2 ysa  
	[
		'dc.coverage.spatial',
		{
			label: 'Julkaisun kattavuus (paikka)',
			marc: '651$a',
			ind1: null,
			ind2: 7
		},
	],
	// Avainsanat	 	dc.subject	653$a	tyhjä	tyhjä	 	 
	[
		'dc.subject',
		{
			label: 'Avainsanat',
			marc: '653$a',
			ind1: null,
			ind2: null
		},
	],
	// Toimittaja	 	dc.contributor.editor	700$a	1	tyhjä	 	700 1_ $a Ahola, Johanna, $e toimittaja.
	[
		'dc.contributor.editor',
		{
			label: 'Toimittaja',
			marc: '700$a',
			ind1: 1,
			ind2: null
		},
	],
	// Painetun monografian ISBN-numero	 	dc.relation.isversionof	776$z (vakiofraasi i osakenttään)	0	8	 	776 08 $i Painettu: $z 9518826536
	[
		'dc.relation.isversionof',
		{
			label: 'Painetun monografian ISBN-numero',
			marc: '776$z', //ToDo: (vakiofraasi i osakenttään)
			ind1: null,
			ind2: null
		},
	],
	// Julkaisun DOI-tunnus	 	dc.identifier.doi	856$u	4	0	 	 
	[
		'dc.identifier.doi',
		{
			label: 'Julkaisun DOI-tunnus',
			marc: '856$u',
			ind1: 4,
			ind2: 0
		},
	],
	// Julkaisun URI	 	dc.identifier.uri	856$u	4	0	 	 
	[
		'dc.identifier.uri',
		{
			label: 'Julkaisun URI',
			marc: '856$u',
			ind1: 4,
			ind2: 0
		},
	],
	// Julkaisun URL	vaihtoehtoinen	dc.identifier.url	856$u	4	0	 	 
	[
		'dc.identifier.url',
		{
			label: 'Julkaisun URL', //vaihtoehtoinen
			marc: '856$u',
			ind1: 4,
			ind2: 0
		},
	],
	// URN-tunnus	 	dc.identifier.urn	856$u	4	0	 	 
	[
		'dc.identifier.urn',
		{
			label: 'URN-tunnus',
			marc: '856$u',
			ind1: 4,
			ind2: 0
		},
	],
	// Muu verkko-osoite	 	dc.relation.url	856$u	4	2	 	 
	[
		'dc.relation.url',
		{
			label: 'Muu verkko-osoite',
			marc: '856$u',
			ind1: 4,
			ind2: 2
		},
	],
	// Muu verkko-osoite	 	dc.relation.uri	 	 	 	 	 
	[
		'dc.relation.uri',
		{
			label: 'Muu verkko-osoite',
			marc: '', //ToDo
			ind1: null, //ToDo
			ind2: null //ToDo
		},
	],
	// Muu URN-tunnus	 	dc.relation.urn	856$u	4	2	 	 
	[
		'dc.relation.urn',
		{
			label: 'Muu URN-tunnus',
			marc: '856$u',
			ind1: 4,
			ind2: 2
		},
	],
	// Tekijä	 	dc.contributor.author	Eka 100$a, loput 700$a	1	tyhjä	 	100 1_ $a Ahola, Johanna, $e kirjoittaja.
	[
		'dc.contributor.author',
		{
			label: 'Tekijä',
			marc: '100$a', //ToDo: Eka 100$a, loput 700$a
			ind1: 1,
			ind2: null
		},
	],
	// Tekijä	vaihtoehtoinen	dc.creator	Eka 100$a, loput 700$a	1	tyhjä	 	700 1_ $a Ahola, Johanna, $e kirjoittaja.
	[
		'dc.creator',
		{
			label: 'Tekijä',
			marc: '100$a', //ToDo: Eka 100$a, loput 700$a
			ind1: 1,
			ind2: null
		},
	],
	// Tietueen sisältö	fulltext=0/metadataOnly=2/abstractOnly=2	dc.format.content	Vaikutta 856 2.indikaattoriin (0=fulltext,2=muu)	 	0 tai 2	 	 
	[
		'dc.format.content',
		{
			label: 'Tietueen sisältö',
			marc: '',
			ind1: null,
			ind2: null
		},
	]
]);

// [
// 	'dc.',
// 	{
// 		label: '',
// 		marc: '',
// 		ind1: null,
// 		ind2: null
// 	},
// ]

// var parseDublinCore = require('metadata-parser').parseDublinCore;
// console.log("Parse: ", parseDublinCore);
// parseDublinCore(record, function(error, metadata){
// 	console.log("---------- DC parse ------------");
// 	console.log(error);
// 	console.log(metadata);
// 	console.log("--------------------------------");
// });
// console.log("Past PDC")