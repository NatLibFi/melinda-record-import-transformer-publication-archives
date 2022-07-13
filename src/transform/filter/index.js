import {getInputFields, createValueInterface} from '../convert/util';

import {filterByFileType} from './filterByFileType';
import {filterByIsbnIdentifier} from './filterByIsbnIdentifier';
import {filterByIssuedYear} from './filterByIssuedYear';
import {filterByMaterialType} from './filterByMaterialType';

export default options => record => {
  const inputFields = getInputFields(record);
  const fieldValueInterface = createValueInterface(inputFields);

  const recordFilters = {
    raw: [filterByFileType],
    interface: [filterByMaterialType, filterByIsbnIdentifier, filterByIssuedYear]
  };

  recordFilters.raw.forEach(f => f(record, options));
  recordFilters.interface.forEach(f => f(fieldValueInterface, options));

  return fieldValueInterface;
};
