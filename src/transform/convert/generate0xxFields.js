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

import {formatLanguage} from '../common';
import {getHandle} from './utils';

export function generate008({getFields, getFieldValues}, moment) {
  const timestamp = generateTimestamp();
  const date = generateDate();
  const country = generateCountry();
  const contentNature = generateNatureOfContent();
  const language = generateLanguage();

  return {
    tag: '008',
    value: `${timestamp}s${date}    ${country} |||||o${contentNature}|||| ||${language} c`
  };

  function generateTimestamp() {
    return moment().format('YYMMDD');
  }

  function generateDate() {
    const values = getFieldValues('dc.date.issued');
    return values.length > 0 ? values[0].slice(0, 4) : '||||';
  }

  function generateCountry() {
    const values = getFieldValues('dc.publisher.country');
    return values.length > 0 ? values[0].slice(0, 2).toLowerCase() : 'fi';
  }

  function generateNatureOfContent() {
    const levels = getFields('dc.type.ontasot');
    return levels.length > 0 ? 'm   ' : '||||';
  }

  function generateLanguage() {
    const values = getFieldValues('dc.language.iso');
    return formatLanguage(values.slice(-1)[0]);
  }
}

export function generate020({getFieldValues}) {
  const values = getFieldValues('dc.identifier.isbn');
  return values.map(value => {
    return {
      tag: '020', ind1: '', ind2: '',
      subfields: [
        {code: 'a', value: formatValue()},
        {code: 'q', value: 'PDF'}
      ]
    };

    function formatValue() {
      return value.replace(/ISBN|\s+|\(print\)/gu, '');
    }
  });
}

export function generate024({getFieldValues}) {
  const urn = generateUrnFields();
  const doi = generateDoiFields();
  const handle = generateHandleFields();

  return urn.length > 0 || doi.length > 0 ? urn.concat(doi) : handle;

  function generateUrnFields() {
    const values = getFieldValues('dc.identifier.urn');
    return values.length > 0 ? [
      {
        tag: '024', ind1: '7', ind2: '',
        subfields: [
          {code: 'a', value: values[0]},
          {code: '2', value: 'urn'}
        ]
      }
    ] : [];
  }

  function generateDoiFields() {
    const values = getFieldValues('dc.identifier.doi');
    return values.length > 0 ? [
      {
        tag: '024', ind1: '7', ind2: '',
        subfields: [
          {code: 'a', value: values[0]},
          {code: '2', value: 'urn'}
        ]
      }
    ] : [];
  }

  function generateHandleFields() {
    const values = getFieldValues('dc.identifier.uri');

    return values.length > 0 ? values.filter(v => getHandle(v) !== false).map(v => ({
      tag: '024', ind1: '7', ind2: '',
      subfields: [
        {code: 'a', value: v},
        {code: '2', value: 'hdl'}
      ]
    })) : [];
  }
}

export function generate041({getFieldValues}) {
  const values = getFieldValues('dc.language.iso');
  return values.map(v => ({
    tag: '041', ind1: '', ind2: '',
    subfields: [{code: 'a', value: formatLanguage(v)}]
  }));
}

