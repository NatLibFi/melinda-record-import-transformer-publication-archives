import {getSystemId} from '../util/index.js';
import {sourceConfig, validHarvestSources} from '../../../constants.js';

/**
 * Generates field SID ($b, $c).
 * Field generation is based on dc.identifier.uri and pre-defined environmental variable
 * containing mapping table.
 * @param {Object} ValueInterface containing getFieldValues and getFields functions
 * @param {Object} sourceMap environmental variable containing map of valid sources
 * @param {boolean} returnDebugString whether to return MARC field or debug string
 * @returns Empty array or array containing field 856 ($u, $y)
 */
export function generateSID(harvestSource, {getFieldValues}, returnDebugString = false) {
  const values = getFieldValues('dc.identifier.uri');
  const oldValues = getFieldValues('dc.source.identifier');

  // URI fields may have multiple values. Values that correspond with the harvest source
  // are only one considered valid for SID field/debug string.
  const validSidValues = values.concat(oldValues).reduce((acc, value) => {
    const result = getSystemId(value);

    if (result && validHarvestSources.includes(result?.source)) {
      const sourceSidValue = sourceConfig[result.source].fSID[result.prefix]; // NB: confirming that key exists happens in transformation-level
      return acc.concat({sourceSidValue, systemId: result.systemId});
    }
    return acc;
  }, []);

  // Return type depends whether information is used for debugging or MARC record
  return validSidValues.length > 0 ? validSidValues.map(v => {
    if (returnDebugString) {
      return `(${v.sourceSidValue})${v.systemId}`;
    }

    return {tag: 'SID', ind1: '', ind2: '', subfields: [{code: 'c', value: v.systemId}, {code: 'b', value: v.sourceSidValue}]};
  }) : [];
}

/**
 * Generates static field LOW ($a).
 * @returns Array containing field LOW ($a) with FIKKA tag.
 */
export function generateLOW() {
  return [
    {
      tag: 'LOW', ind1: '', ind2: '',
      subfields: [{code: 'a', value: 'FIKKA'}]
    }
  ];
}
