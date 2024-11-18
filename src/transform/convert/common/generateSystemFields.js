import {getHandle} from '../util';
import {sourceConfig} from '../../../config';

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

  // URI fields may have multiple values. Values that correspond with the harvest source
  // are only one considered valid for SID field/debug string.
  const validSidValues = values.reduce((acc, value) => {
    const result = getHandle(value);

    if (result && result?.source === harvestSource) {
      const sourceSidValue = sourceConfig[result.source].fSID; // NB: confirming that key exists happens in transformation-level
      return acc.concat({sourceSidValue, handle: result.handle});
    }
    return acc;
  }, []);

  // Return type depends whether information is used for debugging or MARC record
  return validSidValues.length > 0 ? validSidValues.map(v => {
    if (returnDebugString) {
      return `(${v.sourceSidValue})${v.handle}`;
    }

    return {tag: 'SID', ind1: '', ind2: '', subfields: [{code: 'c', value: v.handle}, {code: 'b', value: v.sourceSidValue}]};
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
