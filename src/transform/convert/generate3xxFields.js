export function generate300({getFieldValues}) {
  const values = getFieldValues('dc.format.extent');
  return values.map(v => ({
    tag: '300', ind1: '', ind2: '',
    subfields: [{code: 'a', value: `1 verkkoaineisto (${v} sivua)`}]
  }));
}

export function generate341() {
  return [
    {
      tag: '341', ind1: '', ind2: '',
      subfields:
      [{code: 'a', value: 'tekstiin perustuva'}]
    }
  ];
}
