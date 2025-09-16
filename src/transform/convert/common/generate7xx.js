// Note: Generation of field 700 is defined together with generation of field 100
// Both fields (100/700) consider author information

/**
 * Generates field 776 ($z, $9) based on dc.relation.isversionof values.
 * @param {Object} ValueInterface containing getFieldValues function
 * @returns Empty array or array containing field 776 ($z, $9)
 */
export function generate776({getFieldValues}) {
  const values = getFieldValues('dc.relation.isversionof');
  return values.map(value => ({
    tag: '776', ind1: '0', ind2: ' ',
    subfields: [{code: 'z', value}]
  }));
}
