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

/* eslint-disable no-warning-comments */

import {Utils} from '@natlibfi/melinda-commons';
const {readEnvironmentVariable} = Utils;

export const enums = {
	onTaso: 'onTaso',
	rest: 'rest',
	access: 'access',
	issued: 'issued',
	replace: 'replace',
	accessUrn: 'accessUrn',
	langField: 'langField',
	ysaPresent: 'ysaPresent',
	creatorAuthor: 'creatorAuthor',
	changeSubfield: 'changeSubfield'
};

export const orderMap = new Map([
	[
		'264',
		{
			order: ['6', '8', '3', 'a', 'b', 'c', '9']
		}
	],
	[
		'490',
		{
			order: ['6', '8', '3', 'a', 'x', 'v', '9']
		}
	]
]);

export const conditionalCases = new Map([
	[
		'dc.identifier.urn',
		{
			accessUrn: true, // Save urn
			ignore: ['dc.identifier.url', 'dc.identifier.uri']
		}
	],
	[
		'dc.subject.ysa', // If field is found, ysaPresent set to true -> use marcIf rule "ysaPresent"
		{
			ysaPresent: true
		}
	],
	[
		'dc.type.ontasot',
		{
			set008Strc: {
				indObj: 4,
				indStr: 7,
				to: 'm'
			}
		}
	],
	[
		'dc.contributor.author',
		{
			creatorAuthor: true
		}
	],
	[
		'dc.creator',
		{
			creatorAuthor: true
		}
	],
	[
		'dc.relation.issn',
		{
			relationPresent: true
		}
	],
	[
		'dc.relation.numbersinseries',
		{
			relationPresent: true
		}
	],
	[
		'dc.relation.issn',
		{
			ISSNAmount: true
		}
	],
	[
		'dc.rights.accesslevel', // If public access
		{
			accesslevel: true,
			openAccess: 'openAccess' // Access not restricted
		}
	]
]);

export const ldr = '01704nam a22002653i 4500';

export const control007 = {
	tag: '007',
	value: 'cr |||||||||||'
};

export const control008Strc = [{
	start: 1,
	end: 7,
	value: '000000s'
}, {
	start: 8,
	end: 11,
	value: '----',
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
	value: ' |||||o|||||||| ||',
	from: 'onTaso'
}, {
	start: 36,
	end: 38,
	value: 'und',
	from: 'dc.language.iso'
}, {
	start: 39,
	to: 40,
	value: ' c'
}];

// Standard and static fields
export const standardFields = [{
	tag: 'LOW',
	ind1: '',
	ind2: '',
	subfields: [{
		code: 'a',
		value: 'FIKKA'
	}]
}, {
	tag: '040',
	ind1: '',
	ind2: '',
	subfields: [{
		code: 'b',
		value: 'fin'
	}, {
		code: 'e',
		value: 'rda'
	}, {
		code: 'd',
		value: 'FI-NL'
	}]
}, {
	tag: '042',
	ind1: '',
	ind2: '',
	subfields: [{
		code: 'a',
		value: 'finb'
	}]
}, {
	tag: '336',
	ind1: '',
	ind2: '',
	subfields: [{
		code: 'a',
		value: 'teksti'
	}, {
		code: 'b',
		value: 'txt'
	}, {
		code: '2',
		value: 'rdacontent'
	}]
}, {
	tag: '337',
	ind1: '',
	ind2: '',
	subfields: [{
		code: 'a',
		value: 'tietokonekäyttöinen'
	}, {
		code: 'b',
		value: 'c'
	}, {
		code: '2',
		value: 'rdamedia'
	}]
}, {
	tag: '338',
	ind1: '',
	ind2: '',
	subfields: [{
		code: 'a',
		value: 'verkkoaineisto'
	}, {
		code: 'b',
		value: 'cr'
	}, {
		code: '2',
		value: 'rdacarrier'
	}]
}, {
	tag: '500',
	ind1: '',
	ind2: '',
	subfields: [{
		code: 'a',
		value: 'Koneellisesti tuotettu tietue.'
	}, {
		code: '9',
		value: 'FENNI<KEEP>'
	}]
}, {
	tag: '506',
	ind1: '1',
	ind2: '',
	subfields: [{
		code: 'a',
		value: 'Aineisto on käytettävissä vapaakappalekirjastoissa'
	}, {
		code: 'f',
		value: 'Online access with authorization'
	}, {
		code: '2',
		value: 'star'
	}, {
		code: '5',
		value: 'FI-Vapaa'
	}, {
		code: '9',
		value: 'FENNI<KEEP>'
	}]
}, {
	tag: '506',
	ind1: '0',
	ind2: '',
	marcIf: enums.access, // Only added if public access
	subfields: [{
		code: 'a',
		value: 'Aineisto on vapaasti saatavissa.'
	}, {
		code: 'f',
		value: 'Unrestricted online access'
	}, {
		code: '2',
		value: 'star'
	}, {
		code: '9',
		value: 'FENNI<KEEP>'
	}]
}, {
	tag: '540',
	ind1: '',
	ind2: '',
	subfields: [{
		code: 'a',
		value: 'Aineisto on käytettävissä tutkimus- ja muihin tarkoituksiin;'
	}, {
		code: 'b',
		value: 'Kansalliskirjasto'
	}, {
		code: 'c',
		value: 'Laki kulttuuriaineistojen tallettamisesta ja säilyttämisestä'
	}, {
		code: 'u',
		value: 'http://www.finlex.fi/fi/laki/ajantasa/2007/20071433'
	}, {
		code: '5',
		value: 'FI-Vapaa'
	}, {
		code: '9',
		value: 'FENNI<KEEP>'
	}]
}, {
	tag: '856',
	ind1: '4',
	ind2: '0',
	addUrn: true, // Urn is added to subfield u in logic
	subfields: [{
		code: 'z',
		value: 'Käytettävissä vapaakappalekirjastoissa'
	}, {
		code: '5',
		value: 'FI-Vapaa'
	}]
}, {
	tag: '856',
	ind1: '4',
	ind2: '0',
	marcIf: enums.access, // Only added if public access
	addUrn: true, // Urn is added to subfield u in logic
	subfields: [{
		code: 'y',
		value: 'Linkki verkkoaineistoon'
	}]
}, {
	tag: '884',
	ind1: '',
	ind2: '',
	subfields: [{
		code: 'k',
		value: readEnvironmentVariable('SOURCE', {defaultValue: 'Tuntematon lähde'})
	}]
}];

export const confMap = new Map([
	// Teoksen julkaisumaa	Oletuksena aina 'fi'	dc.publisher.country	008 (katso tarkempi ohje)
	[
		'dc.publisher.country',
		{
			label: 'Teoksen julkaisumaa',
			marcTag: '008' // Control field
		}
	],
	// Teoksen kieli	 	dc.language.iso	041$a + 008	tyhjä	tyhjä	 	eng /  041 __ $a eng
	[
		'dc.language.iso',
		{
			label: 'Teoksen kieli',
			marcTag: '041',
			marcSecondaryTags: ['008'],
			marcIf: enums.langField,
			marcSub: 'a',
			ind1: '',
			ind2: ''
		}
	],
	// Julkaisuaika	 	dc.date.issued	264$c + 008	tyhjä	1	 	2018 /  264 __ $c 2018
	[
		'dc.date.issued',
		{
			label: 'Julkaisuaika',
			marcTag: '264',
			marcSecondaryTags: ['008'],
			marcIf: enums.issued, // This saves year for multiple purposes
			marcSub: 'c',
			ind1: '',
			ind2: '1',
			unique: true,
			suffix: '.'
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
			ind2: '',
			regexRemove: /(^ISBN:)|(^ISBN)|(\s)|(\(print\))/g,
			presetFields: [{
				sub: 'q',
				value: 'PDF'
			}]
		}
	],
	// Nimeke	 	dc.title	245$a	1	0
	// Jos lähdetietueella ei ole dc.contributor.author- tai dc.creator-kenttää, niin 245 ensimmäisen indikaattorin arvo = 0
	[
		'dc.title',
		{
			label: 'Nimike',
			marcTag: '245',
			marcIf: enums.creatorAuthor, // Change ind1 if creator or author is present to 1.
			marcSub: 'a',
			ind1: '0',
			ind2: '0',
			suffix: '.'
		}
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
		}
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
		}
	],
	// Teoksen kustannuspaikkakunta	 	dc.publisher.place	264$a	tyhjä	1
	[
		'dc.publisher.place',
		{
			label: 'Teoksen kustannuspaikkakunta',
			marcTag: '264',
			marcSub: 'a',
			ind1: '',
			ind2: '1',
			unique: true,
			suffix: ':'
		}
	],
	// Julkaisija (kustantaja)	Julkaisijan nimi	dc.publisher	264$b	tyhjä	1 (Valitaan julkaisun kielen mukaan)	264 _1 $b Turun yliopisto
	[
		'dc.publisher',
		{
			label: 'Julkaisija (kustantaja)',
			marcTag: '264',
			marcSub: 'b',
			ind1: '',
			ind2: '1',
			unique: true,
			suffix: ','
		}
	],
	// Sivumäärä	 	dc.format.extent	300$a	tyhjä	tyhjä	 	esimerkit DC:stä?
	[
		'dc.format.extent',
		{
			label: 'Sivumäärä',
			marcTag: '300',
			marcSub: 'a',
			ind1: '',
			ind2: '',
			prefix: '1 verkkoaineisto (',
			suffix: ' sivua)'
		}
	],
	// Sarjatieto, nimeke	 	dc.relation.ispartofseries	490$a	1	tyhjä	 	490 1_ $a Turun yliopiston julkaisuja. Sarja B: Humaniora $x 2343-3191 $v 451
	[
		'dc.relation.ispartofseries',
		{
			label: 'Sarjatieto, nimeke',
			marcTag: '490',
			marcSub: 'a',
			ind1: '0', // 490, 1. indikaattori = 1, jos tietueella on myös kenttä 800 TAI 810 TAI 811 TAI 830 (No transformation for any of these)
			ind2: '',
			unique: true,
			regexReplace: {
				regex: /(?<=[^,]$)/gm,
				replace: ',',
				conditional: true
			}
		}
	],
	// Sarjan/lehden ISSN-numero	 	dc.relation.issn	490$x	1	tyhjä	 	490 1_ $a Turun yliopiston julkaisuja. Sarja B: Humaniora $x 2343-3191 $v 451
	[
		'dc.relation.issn',
		{
			label: 'Sarjan/lehden ISSN-numero',
			marcTag: '490',
			marcSub: 'x',
			ind1: '0',
			ind2: '',
			unique: true,
			regexReplace: { // 2 sarjan/lehden ISSN-numeroa	| 2 X dc.relation.issn | ',_' (pilkku välilyönti) toistumien väliin | 490‡x,_‡x
				regex: /$/gm,
				replace: ', ',
				last: '',
				single: ' ;' // Sarjan/lehden ISSN-numero: | dc.relation.issn | '_;' (välilyönti puolipiste) | 490‡x_;s
			}
		}
	],
	// Sarjatieto, järjestysnumero	 	dc.relation.numberinseries	490$v	1	tyhjä	 	490 1_ $a Turun yliopiston julkaisuja. Sarja B: Humaniora $x 2343-3191 $v 451
	[
		'dc.relation.numberinseries',
		{
			label: 'Sarjatieto, järjestysnumero',
			marcTag: '490',
			marcSub: 'v',
			ind1: '0',
			ind2: '',
			unique: true
		}
	],
	// Lassi: käsitellään samalla tavalla [numberinseries <-> numberinseries]
	[
		'dc.relation.numberofseries',
		{
			label: 'Sarjatieto, järjestysnumero',
			marcTag: '490',
			marcSub: 'v',
			ind1: '0',
			ind2: '',
			unique: true
		}
	],
	// Lyhyt kuvaus	 	dc.description	500$a	tyhjä	tyhjä	 	500  __ $a Joku huomautus.
	[
		'dc.description',
		{
			label: 'Lyhyt kuvaus',
			marcTag: '500',
			marcSub: 'a',
			ind1: '',
			ind2: '',
			suffix: '.'
		}
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
		}
	],
	// Opinnäytteen taso	Väitöskirja/Doctoral dissertation/Doktorsavhandling/Monografiaväitöskirja/Doctoral dissertation (monograph)/Monografiavhandling/Artikkeliväitöskirja/Doctoral dissertation (article-based)/Artikelavhandling/Lisensiaatintyö/Licentiate thesis/Licentiatarbete
	// dc.type.ontasot	500$a [kentän sisältö] + 502$a 'Väitöskirja'	tyhjä	tyhjä	 	500 __ $a Artikkeliväitöskirja  502 __ $a Väitöskirja
	[
		'dc.type.ontasot',
		{
			label: 'Opinnäytteen taso',
			marcIf: enums.onTaso
		}
	],
	//  	Ks. esimerkki	dc.contributor.organization	JOS dc.type.ontasot, niin 502$c	 	 	 	502 __ $a Väitöskirja : $c Helsingin yliopisto, valtiotieteellinen tiedekunta, $d 2016.
	[
		'dc.contributor.organization',
		{
			label: '',
			marcSub: 'c',
			marcIf: enums.onTaso,
			ind1: null,
			ind2: null
		}
	],
	//  	Ks. esimerkki	dc.contributor.faculty	JOS dc.type.ontasot ja dc.contributor.faculty, niin 502$c (ks. Esimerkki)	 	 	 	502 __ $a 'Väitöskirja :' $c [dc.contributor.organization] + ', ' + [dc.contributor.faculty] + ', '  $d [dc.date.issued / pelkkä vuosi=4 ekaa merkkiä]
	[
		'dc.contributor.faculty',
		{
			label: '',
			marcSub: 'c',
			marcIf: enums.onTaso,
			ind1: null,
			ind2: null
		}
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
		}
	],
	// // Tiivistelmä	 	dc.description.abstract	520$a	tyhjä	tyhjä	 	520  __ $a Tiivistelmä.
	// [
	// 	'dc.description.abstract',
	// 	{
	// 		label: 'Tiivistelmä',
	// 		marcTag: '520',
	// 		marcSub: 'a',
	// 		ind1: '',
	// 		ind2: ''
	// 	}
	// ],
	// Tekijänoikeus-/käyttöoikeustiedot	 	dc.rights	540$c	tyhjä	tyhjä	 	540  __ $c FinELib-lisenssi $u https://www.kiwi.fi/display/finelib/Ellibs
	[
		'dc.rights',
		{
			label: 'Tekijänoikeus-/käyttöoikeustiedot',
			marcTag: '540',
			marcSub: 'c',
			marcIf: enums.changeSubfield,
			ind1: '',
			ind2: '',
			marcIfConfig: {
				regexSub: /^(fi= All rights reserved)|(All rights reserved)/,
				replaceSub: 'a'
			}
		}
	],
	//  	 	Dc.rights.accesslevel	506$a
	[
		'dc.rights.accesslevel',
		{
			label: '',
			marcTag: '506',
			marcIf: enums.replace,
			marcReplace: {
				phrase: 'openAccess',
				replace: 'Aineisto on vapaasti saatavissa.',
				removePresetIfNotMatch: true
			},
			marcSub: 'a',
			ind1: '0',
			ind2: '',
			presetFields: [{
				sub: 'f',
				value: 'Unrestricted online access'
			}, {
				sub: '2',
				value: 'star'
			}]
		}
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
		}
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
		}
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
		}
	],
	// Muu tekijänoikeustieto	 	dc.rights.copyright	542$l	tyhjä	tyhjä
	[
		'dc.rights.copyright',
		{
			label: 'Muu tekijänoikeustieto',
			marcTag: '542',
			marcSub: 'l',
			ind1: '',
			ind2: ''
		}
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
		}
	],
	// Previously yso rule was ysa
	// Asiasanat	tarkenne	dc.subject.ys0 (esim.)	650$a, mahd. tarkenne: 650$2	tyhjä	7	 	650 _7  $a historia  $2 ysa
	[
		'dc.subject.yso',
		{
			label: 'Asiasanat',
			marcTag: '650',
			marcSub: 'a',
			ind1: '',
			ind2: '7',
			presetFields: [{
				sub: '2',
				value: 'yso'
			}]
		}
	],
	// Lisätty Lassin kanssa
	[
		'dc.subject.afo',
		{
			label: 'Asiasanat',
			marcTag: '650',
			marcSub: 'a',
			ind1: '',
			ind2: '7',
			presetFields: [{
				sub: '2',
				value: 'afo'
			}]
		}
	],
	// Ysa: 653-kenttään
	[
		'dc.subject.ysa',
		{
			label: 'Asiasanat',
			marcTag: '650',
			marcSub: 'a',
			ind1: '',
			ind2: '4'
		}
	],
	// Avainsanat	 	dc.subject	653$a	tyhjä	tyhjä
	// If only dc.subject -> 653$a
	// If dc.subject.ysa -> both 650, dc.subject subfield a, dc.subject.ysa subfield 2
	[
		'dc.subject',
		{
			label: 'Avainsanat',
			marcTag: '653',
			marcSub: 'a',
			ind1: '',
			ind2: ''
		}
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
		}
	],
	// Toimittaja	 	dc.contributor.editor	700$a	1	tyhjä	 	700 1_ $a Ahola, Johanna, $e toimittaja.
	[
		'dc.contributor.editor',
		{
			label: 'Toimittaja',
			marcTag: '700',
			marcSub: 'a',
			ind1: '1',
			ind2: '',
			presetFields: [{
				sub: 'e',
				value: 'toimittaja.'
			}]
		}
	],
	// Painetun monografian ISBN-numero	 	dc.relation.isversionof	776$z (vakiofraasi i osakenttään)	0	8	 	776 08 $i Painettu: $z 9518826536
	[
		'dc.relation.isversionof',
		{
			label: 'Painetun monografian ISBN-numero',
			marcTag: '776', // ToDo: (vakiofraasi i osakenttään)
			marcSub: 'z',
			ind1: '0',
			ind2: '8'
		}
	],
	// Julkaisun DOI-tunnus	 	dc.identifier.doi	856$u	4	0
	[
		'dc.identifier.doi',
		{
			label: 'Julkaisun DOI-tunnus',
			marcTag: '856',
			marcSub: 'u',
			ind1: '4',
			ind2: '0',
			unique: true,
			secondary: [{
				marcTag: '024',
				marcSub: 'a',
				ind1: '7',
				ind2: '',
				presetFields: [{
					sub: '2',
					value: 'doi'
				}]
			}]
		}
	],
	// Julkaisun URI	 	dc.identifier.uri	856$u	4	0
	[
		'dc.identifier.uri',
		{
			label: 'Julkaisun URI',
			marcTag: '856',
			marcSub: 'u',
			ind1: '4',
			ind2: '0',
			unique: true
		}
	],
	// Julkaisun URL	vaihtoehtoinen	dc.identifier.url	856$u	4	0
	[
		'dc.identifier.url',
		{
			label: 'Julkaisun URL', // Vaihtoehtoinen
			marcTag: '856',
			marcSub: 'u',
			ind1: '4',
			ind2: '0',
			unique: true
		}
	],
	// URN-tunnus	 	dc.identifier.urn	856$u	4	0
	[
		'dc.identifier.urn',
		{
			marcTag: '024',
			marcSub: 'a',
			ind1: '7',
			ind2: '',
			presetFields: [{
				sub: '2',
				value: 'urn'
			}]
		}
	],
	// Muu verkko-osoite	 	dc.relation.url	856$u	4	2
	// Pudotetaan tuonnissa linkkikenttä dc.relation.url
	// [
	// 	'dc.relation.url',
	// 	{
	// 		label: 'Muu verkko-osoite',
	// 		marcTag: '856',
	// 		marcSub: 'u',
	// 		ind1: '4',
	// 		ind2: '2'
	// 	}
	// ],
	// // Muu verkko-osoite	 	dc.relation.uri
	// [
	// 	'dc.relation.uri',
	// 	{
	// 		label: 'Muu verkko-osoite', // Same as dc.relation.url from Lassi
	// 		marcTag: '856',
	// 		marcSub: 'u',
	// 		ind1: 4,
	// 		ind2: 2
	// 	}
	// ],
	// Muu URN-tunnus	 	dc.relation.urn	856$u	4	2
	[
		'dc.relation.urn',
		{
			label: 'Muu URN-tunnus',
			marcTag: '856',
			marcSub: 'u',
			ind1: '4',
			ind2: '2'
		}
	],
	// Tekijä	 	dc.contributor.author	Eka 100$a, loput 700$a	1	tyhjä	 	100 1_ $a Ahola, Johanna, $e kirjoittaja.
	[
		'dc.contributor.author',
		{
			label: 'Tekijä',
			marcTag: '100',
			marcSub: 'a',
			marcIf: enums.rest,
			ind1: '1',
			ind2: '',
			suffix: ',',
			presetFields: [{
				sub: 'e',
				value: 'kirjoittaja.'
			}],
			marcIfConfig: {
				marcTag: '700',
				marcSub: 'a',
				ind1: '1',
				ind2: '',
				suffix: ',',
				presetFields: [{
					sub: 'e',
					value: 'kirjoittaja.'
				}]
			}
		}
	],
	// Tekijä	vaihtoehtoinen	dc.creator	Eka 100$a, loput 700$a	1	tyhjä	 	700 1_ $a Ahola, Johanna, $e kirjoittaja.
	[
		'dc.creator',
		{
			label: 'Tekijä',
			marcTag: '100',
			marcSub: 'a',
			marcIf: enums.rest,
			ind1: '1',
			ind2: '',
			suffix: ',',
			presetFields: [{
				sub: 'e',
				value: 'kirjoittaja.'
			}],
			marcIfConfig: {
				marcTag: '700',
				marcSub: 'a',
				ind1: '1',
				ind2: '',
				suffix: ',',
				presetFields: [{
					sub: 'e',
					value: 'kirjoittaja.'
				}]
			}
		}
	]
]);

