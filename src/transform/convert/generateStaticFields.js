/**
*
* @licstart  The following is the entire license notice for the JavaScript code in this file.
*
* Publication archives record transformer for the Melinda record batch import system
*
* Copyright (C) 2019-2021 University Of Helsinki (The National Library Of Finland)
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

export function generateStaticFields(harvestSource, moment) {
  return [
    {
      tag: '007', value: 'cr |||||||||||'
    },
    {
      tag: 'LOW', ind1: '', ind2: '',
      subfields: [{code: 'a', value: 'FIKKA'}]
    },
    {
      tag: '040', ind1: '', ind2: '',
      subfields: [
        {code: 'b', value: 'fin'},
        {code: 'e', value: 'rda'},
        {code: 'd', value: 'FI-NL'}
      ]
    },
    {
      tag: '042', ind1: '', ind2: '',
      subfields: [{code: 'a', value: 'finb'}]
    },
    {
      tag: '336', ind1: '', ind2: '',
      subfields: [
        {code: 'a', value: 'teksti'},
        {code: 'b', value: 'txt'},
        {code: '2', value: 'rdacontent'}
      ]
    },
    {
      tag: '337', ind1: '', ind2: '',
      subfields: [
        {code: 'a', value: 'tietokonekäyttöinen'},
        {code: 'b', value: 'c'},
        {code: '2', value: 'rdamedia'}
      ]
    },
    {
      tag: '338', ind1: '', ind2: '',
      subfields: [
        {code: 'a', value: 'verkkoaineisto'},
        {code: 'b', value: 'cr'},
        {code: '2', value: 'rdacarrier'}
      ]
    },
    {
      tag: '594',
      subfields: [
        {code: 'a', value: 'Koneellisesti tuotettu tietue'},
        {code: '5', value: 'FENNI'}
      ]
    },
    {
      tag: '884', ind1: '', ind2: '',
      subfields: [
        {code: 'a', value: 'Dublin Core to MARC transformation'},
        {code: 'g', value: moment().format('YYYYMMDD')},
        {code: 'k', value: harvestSource},
        {code: 'q', value: 'FI-NL'},
        {code: '5', value: 'MELINDA'}
      ]
    }
  ];
}

