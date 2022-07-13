import {getHandle} from '../util';

/**
 * Generates field SID ($b, $c).
 * Field generation is based on dc.identifier.uri and pre-defined environmental variable
 * containing mapping table.
 * @param {Object} ValueInterface containing getFieldValues and getFields functions
 * @param {Object} sourceMap environmental variable containing map of valid sources
 * @returns Empty array or array containing field 856 ($u, $y)
 */
export function generateSID({getFieldValues}, sourceMap) {
  const values = getFieldValues('dc.identifier.uri');

  const validSidValues = values.reduce((acc, value) => {
    const result = getHandle(value, sourceMap);
    if (result && Object.prototype.hasOwnProperty.call(sourceMap, result.source)) {
      return acc.concat({source: sourceMap[result.source], handle: result.handle});
    }
    return acc;
  }, []);

  return validSidValues.length > 0 ? validSidValues.map(v => (
    {tag: 'SID', ind1: '', ind2: '',
      subfields: [
        {code: 'c', value: v.handle},
        {code: 'b', value: v.source}
      ]}
  )) : [];
}

/**
 * Generates field LOW ($a).
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
