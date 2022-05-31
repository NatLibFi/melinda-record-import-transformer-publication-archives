export function generate100and700({getFieldValues}) {
  const writers = generateWriters();
  const editors = generateEditors();

  return writers.concat(editors);

  function generateWriters() {
    const values = getFieldValues(p => [
      'dc.contributor.author',
      'dc.creator'
    ].includes(p));
    return values.map((v, index) => ({
      tag: index === 0 ? '100' : '700', ind1: '1', ind2: '',
      subfields: [
        {code: 'a', value: `${v},`},
        {code: 'e', value: 'kirjoittaja.'}
      ]
    }));
  }

  function generateEditors() {
    const values = getFieldValues('dc.contributor.editor');
    return values.map(v => ({
      tag: '700', ind1: '1', ind2: '',
      subfields: [
        {code: 'a', value: `${v},`},
        {code: 'e', value: 'toimittaja.'}
      ]
    }));
  }
}
