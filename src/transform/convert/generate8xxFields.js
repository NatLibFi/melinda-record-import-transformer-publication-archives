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

import {isValidLink} from './utils';

export function generate856({getFieldValues}) {
  const publicAccessFields = generatePublicAccessFields();
  const otherUrnFields = generateOtherUrnFields();

  return publicAccessFields.concat(otherUrnFields);

  function generatePublicAccessFields() {
    const accessLevel = getFieldValues('dc.rights.accesslevel');

    if (accessLevel.length === 0 || accessLevel[0] === 'openAccess') {
      const subfields = generateSubfields();
      return [{tag: '856', ind1: '4', ind2: '0', subfields}];
    }

    return [];

    function generateSubfields() {
      const linkSubfields = generateLinkSubfields();
      return linkSubfields.concat({code: 'y', value: 'Linkki verkkoaineistoon'});
    }
  }

  function generateOtherUrnFields() {
    const urn = getFieldValues('dc.relation.urn');

    return urn.length > 0 ? [
      {
        tag: '856', ind1: '4', ind2: '2',
        subfields: [{code: 'u', value: urn[0]}]
      }
    ] : [];
  }

  function generateLinkSubfields() {
    const urn = generateUrn();
    const doi = generateU('dc.identifier.doi');
    const uri = generateU('dc.identifier.uri');
    const url = generateU('dc.identifier.url');

    if (urn.length > 0) {
      return doi ? urn.concat(doi) : urn;
    }

    return doi.concat(uri, url);

    function generateUrn() {
      const values = getFieldValues('dc.identifier.urn');
      return values.map(v => ({code: 'u', value: (/http:\/\/urn.fi\//u).test(v) ? v : `http://urn.fi/${v}`}));
    }

    function generateU(path) {
      const values = getFieldValues(path);
      return values.filter(value => isValidLink(value)).map(value => ({code: 'u', value}));
    }
  }
}
