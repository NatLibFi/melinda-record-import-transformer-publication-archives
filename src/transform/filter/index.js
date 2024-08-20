import createDebugLogger from 'debug';

import {applyFilters} from '../../config';

import {generateSID} from '../convert/common/generateSystemFields';
import {getInputFields, createValueInterface} from '../convert/util';

import {filterByFileType} from './filterByFileType';
import {filterByIsbnIdentifier} from './filterByIsbnIdentifier';
import {filterByIssuedYear} from './filterByIssuedYear';
import {filterByMaterialType} from './filterByMaterialType';

export default (harvestSource, record) => {
  const debug = createDebugLogger('@natlibfi/melinda-record-import/transformer-dc:filter');
  debug('Staring to define and apply filter configuration');

  const inputFields = getInputFields(record);
  const fieldValueInterface = createValueInterface(inputFields);
  const {getFieldValues} = fieldValueInterface;

  // Information required for filtering records
  const title = getFieldValues('dc.title');
  const identifiers = [
    getFieldValues('dc.identifier.isbn'),
    getFieldValues('dc.identifier.uri'),
    getFieldValues('dc.identifier.urn'),
    generateSID(harvestSource, fieldValueInterface, true)
  ].flat();


  // NB: filter definitions have following attributes:
  // - name -> name of the filter that is used when selecting filters to be applied based on config
  // - filter -> filtering function
  const availableFilters = {
    raw: [filterByFileType()],
    interface: [filterByMaterialType(), filterByIsbnIdentifier(), filterByIssuedYear()]
  };

  // Use only filters that are defined in config
  const selectedFilters = {
    raw: availableFilters.raw.filter(f => applyFilters.includes(f.name)),
    interface: availableFilters.interface.filter(f => applyFilters.includes(f.name))
  };

  const selectedFiltersNames = Object.keys(selectedFilters).map(filterType => {
    const filterNames = selectedFilters[filterType].map(f => f.name);
    return filterNames;
  }).flat();

  debug(`Following filters will be applied before transformation: ${JSON.stringify(selectedFiltersNames)}`);

  // Apply filters
  const debugInfo = {identifiers, title};
  selectedFilters.raw.forEach(f => f.filter(record, debugInfo));
  selectedFilters.interface.forEach(f => f.filter(fieldValueInterface, debugInfo));

  return {
    fieldValueInterface,
    commonErrorPayload: {title, identifiers}
  };
};
