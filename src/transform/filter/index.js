import {generateSID} from '../convert/common/generateSystemFields';
import {getInputFields, createValueInterface} from '../convert/util';

import {filterByFileType} from './filterByFileType';
import {filterByIsbnIdentifier} from './filterByIsbnIdentifier';
import {filterByIssuedYear} from './filterByIssuedYear';
import {filterByMaterialType} from './filterByMaterialType';

export default ({filters, sourceMap}) => record => {
  const inputFields = getInputFields(record);
  const fieldValueInterface = createValueInterface(inputFields);
  const {getFieldValues} = fieldValueInterface;
  const identifiers = [
    ...getFieldValues('dc.identifier.isbn'),
    ...getFieldValues('dc.identifier.uri'),
    ...getFieldValues('dc.identifier.urn'),
    ...generateSID(fieldValueInterface, sourceMap, true)
  ];
  const title = getFieldValues('dc.title');

  const recordFilters = {
    raw: [filterByFileType],
    interface: [filterByMaterialType, filterByIsbnIdentifier, filterByIssuedYear]
  };

  recordFilters.raw.forEach(f => f(record, {...filters, identifiers, title}));
  recordFilters.interface.forEach(f => f(fieldValueInterface, {...filters, identifiers, title}));

  return fieldValueInterface;
};
