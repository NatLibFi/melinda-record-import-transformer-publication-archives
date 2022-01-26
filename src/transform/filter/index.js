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

import {getInputFields, createValueInterface} from '../common';
import {filterByFileType} from './filterByFileType';
import {filterByMaterialType} from './filterByMaterialType';

export default options => record => {
  const inputFields = getInputFields(record);
  const fieldValueInterface = createValueInterface(inputFields);

  const recordFilters = {
    raw: [filterByFileType],
    interface: [filterByMaterialType]
  };

  recordFilters.raw.forEach(f => f(record, options));
  recordFilters.interface.forEach(f => f(fieldValueInterface, options));

  return fieldValueInterface;
};
