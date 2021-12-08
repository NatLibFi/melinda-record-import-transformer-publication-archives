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

export function generate648({getFieldValues}) {
  const values = getFieldValues('dc.coverage.temporal');
  return values.map(value => ({
    tag: '648', ind1: '', ind2: '4',
    subfields: [{code: 'a', value}]
  }));
}

export function generate650({getFieldValues}) {
  const yso = generateYso();
  const afo = generateAfo();

  return yso.concat(afo);

  function generateYso() {
    const values = getFieldValues('dc.subject.yso');
    return values.map(value => ({
      tag: '650', ind1: '', ind2: '7',
      subfields: [
        {code: 'a', value},
        {code: '2', value: 'yso'}
      ]
    }));
  }

  function generateAfo() {
    const values = getFieldValues('dc.subject.afo');
    return values.map(value => ({
      tag: '650', ind1: '', ind2: '7',
      subfields: [
        {code: 'a', value},
        {code: '2', value: 'afo'}
      ]
    }));
  }
}

export function generate651({getFieldValues}) {
  const values = getFieldValues('dc.coverage.spatial');
  return values.map(value => ({
    tag: '651', ind1: '', ind2: '4',
    subfields: [{code: 'a', value}]
  }));
}

export function generate653({getFieldValues}) {
  const values = getFieldValues(p => [
    'dc.subject.ysa',
    'dc.subject'
  ].includes(p));
  return values.map(value => ({
    tag: '653', ind1: '', ind2: '',
    subfields: [{code: 'a', value}]
  }));
}
