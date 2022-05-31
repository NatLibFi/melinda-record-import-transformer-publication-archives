// Note: Generation of field 700 is defined together with generation of field 100

export function generate776({getFieldValues}) {
  const values = getFieldValues('dc.relation.isversionof');
  return values.map(value => ({
    tag: '776', ind1: '0', ind2: '8',
    subfields: [
      {code: 'z', value},
      {code: '9', value: 'FENNI<KEEP>'}
    ]
  }));
}
