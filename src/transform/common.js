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

import langs from 'langs';

export function createValueInterface(inputFields) {
  return {getFieldValues, getFields};

  function getFieldValues(filter) {
    const fields = getFields(filter);
    return fields
      .filter(f => f.$.value)
      .map(f => f.$.value);
  }

  function getFields(arg) {
    const filter = typeof arg === 'function' ? arg : p => p === arg;

    const newFields = inputFields.filter(field => {
      const dcPath = getDCPath(field);
      return filter(dcPath);
    });

    return newFields;
  }

  function getDCPath(field) {
    const dcPath = `${field.$.schema}.${field.$.element}`;

    if (field.$.qualifier) {
      return `${dcPath}.${field.$.qualifier}`;
    }

    return dcPath;
  }
}

export function formatLanguage(code) {
  if (code && code.length === 3) {
    return code;
  }

  const lang = langs.where(1, code);
  return lang ? lang['2B'] : 'und';
}

export function getInputFields(record) {
  return record.metadata[0]['kk:metadata'][0]['kk:field']
    .filter(field => '$' in field);
}

export function getFileTypesInformation(record) {
  const inputFields = record.metadata[0]['kk:metadata'][0]['kk:file']
    .filter(field => '$' in field);

  return inputFields.length === 0 ? [] : inputFields.map(f => f.$.type);
}
