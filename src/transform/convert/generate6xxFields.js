export function generate648({getFieldValues}) {
  const values = getFieldValues('dc.coverage.temporal');
  return values.map(value => ({
    tag: '648', ind1: '', ind2: '4',
    subfields: [{code: 'a', value}]
  }));
}

export function generate650({getFieldValues}) {
  const yso = generateYso();
  const afo = generateAfo();

  return yso.concat(afo);

  function generateYso() {
    const values = getFieldValues('dc.subject.yso');
    return values.map(value => ({
      tag: '650', ind1: '', ind2: '7',
      subfields: [
        {code: 'a', value},
        {code: '2', value: 'yso'}
      ]
    }));
  }

  function generateAfo() {
    const values = getFieldValues('dc.subject.afo');
    return values.map(value => ({
      tag: '650', ind1: '', ind2: '7',
      subfields: [
        {code: 'a', value},
        {code: '2', value: 'afo'}
      ]
    }));
  }
}

export function generate651({getFieldValues}) {
  const values = getFieldValues('dc.coverage.spatial');
  return values.map(value => ({
    tag: '651', ind1: '', ind2: '4',
    subfields: [{code: 'a', value}]
  }));
}

export function generate653({getFieldValues}) {
  const values = getFieldValues(p => [
    'dc.subject.ysa',
    'dc.subject'
  ].includes(p));
  return values.map(value => ({
    tag: '653', ind1: '', ind2: '',
    subfields: [{code: 'a', value}]
  }));
}
