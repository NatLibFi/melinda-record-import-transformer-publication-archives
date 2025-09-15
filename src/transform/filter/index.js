import createDebugLogger from 'debug';

import {generateSID} from '../convert/common/generateSystemFields.js';
import {getInputFields, createValueInterface, getRecordFiletype} from '../convert/util/index.js';

import {filterByFileType} from './filterByFileType.js';
import {filterByIsbnIdentifier} from './filterByIsbnIdentifier.js';
import {filterByIssuedYear} from './filterByIssuedYear.js';
import {filterByMaterialType} from './filterByMaterialType.js';

/**
 * Filter generator
 * @param {string} harvestSource Source where record was harvested
 * @param {object} record record transformed from XML to JS object
 * @param {[]string} applyFilters array of filter names to apply
 * @param {object} filterConfig configuration object containing filter specific configurations
 * @return object containing fieldValueInterface (for interacting with record) and commonErrorPayload to use for producing debugging information
 */
export default (harvestSource, record, applyFilters = [], filterConfig = {}) => {
  const debug = createDebugLogger('@natlibfi/melinda-record-import/transformer-dc:filter');
  debug('Staring to define and apply filter configuration');

  const inputFields = getInputFields(record);
  const fieldValueInterface = createValueInterface(inputFields);
  const {getFieldValues} = fieldValueInterface;

  // Information required for filtering records
  const titleValues = getFieldValues('dc.title');
  const title = titleValues.length > 0 ? titleValues[0] : '';
  const identifiers = [
    getFieldValues('dc.identifier.isbn'),
    getFieldValues('dc.identifier.uri'),
    getFieldValues('dc.identifier.olduri'),
    getFieldValues('dc.identifier.urn'),
    generateSID(harvestSource, fieldValueInterface, true)
  ].flat();


  // NB: filter definitions have following attributes:
  // - name -> name of the filter that is used when selecting filters to be applied based on config
  // - filter -> filtering function

  // Only some filters require config during initialization
  const availableFilters = {
    raw: [filterByFileType()],
    interface: [filterByMaterialType(), filterByIsbnIdentifier(filterConfig), filterByIssuedYear(filterConfig)]
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

  // Parse filetype. Note that this should not be done before applying filters since records without kk:file-tag may also be filtered.
  const filetype = getRecordFiletype(record);

  return {
    fieldValueInterface,
    filetype,
    commonErrorPayload: {title, identifiers}
  };
};
