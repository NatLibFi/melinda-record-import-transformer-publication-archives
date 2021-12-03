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

export function generate245({getFields, getFieldValues}) {
  const isAddedEntry = generateIsAddedEntry();
  const titles = getFieldValues('dc.title');

  return titles.map(title => ({
    tag: '245',
    ind1: isAddedEntry ? '1' : '0',
    ind2: '0',
    subfields: [{code: 'a', value: `${title}.`}]
  }));

  function generateIsAddedEntry() {
    const fields = getFields(p => [
      'dc.contributor.author',
      'dc.author'
    ].includes(p));
    return fields.length > 0;
  }
}

export function generate246({getFieldValues}) {
  const values = getFieldValues('dc.title.alternative');
  return values.map(value => ({
    tag: '246', ind1: '1', ind2: '3',
    subfields: [{code: 'a', value}]
  }));
}

export function generate250({getFieldValues}) {
  const values = getFieldValues('dc.description.edition');
  return values.map(value => ({
    tag: '250', ind1: '', ind2: '',
    subfields: [{code: 'a', value}]
  }));
}


export function generate264({getFieldValues}) {
  const subfields = generateSubfields();

  if (subfields.length > 0) {
    return {
      tag: '264', ind1: '', ind2: '1', subfields
    };
  }

  function generateSubfields() {
    const place = generatePlace();
    const publisher = generatePublisher();
    const issueDate = generateIssueDate();

    return place.concat(publisher, issueDate);

    function generatePlace() {
      const values = getFieldValues('dc.publisher.place');
      return values.length > 0 ? [{code: 'a', value: `${values[0]}:`}] : [];
    }

    function generatePublisher() {
      const values = getFieldValues('dc.publisher');
      return values.length > 0 ? [{code: 'b', value: `${values[0]},`}] : [];
    }

    function generateIssueDate() {
      const values = getFieldValues('dc.date.issued');
      return values.length > 0 ? values.map(toSubfield) : [];

      function toSubfield(value) {
        return {code: 'c', value: `${value}.`};
      }
    }
  }
}
