/**
 * Generates field 648 ($a) based on dc.coverage.temporal values
 * @param {Object} ValueInterface containing getFieldValues function
 * @returns Empty array or array containing field 648 ($a)
 */
export function generate648({getFieldValues}) {
  const values = getFieldValues('dc.coverage.temporal');
  return values.map(value => ({
    tag: '648', ind1: '', ind2: '4',
    subfields: [{code: 'a', value}]
  }));
}

/**
 * Generates field 650 ($a, $2) based on dc.subject.yso values.
 * $2 subfield contains static value 'yso'.
 * @param {Object} ValueInterface containing getFieldValues function
 * @returns Empty array or array containing field 650 ($a, $2)
 */
export function generate650({getFieldValues}) {
  const yso = generateYso();
  const afo = generateAfo();
  const juho = generateJuho();

  return yso.concat(afo, juho);

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

  function generateJuho() {
    const values = getFieldValues('dc.subject.juho');
    return values.map(value => ({
      tag: '650', ind1: '', ind2: '7',
      subfields: [
        {code: 'a', value},
        {code: '2', value: 'juho'}
      ]
    }));
  }
}

/**
 * Generates field 651 ($a) based on dc.coverage.spatial values.
 * @param {Object} ValueInterface containing getFieldValues function
 * @returns Empty array or array containing field 651 ($a)
 */
export function generate651({getFieldValues}) {
  const values = getFieldValues('dc.coverage.spatial');
  return values.map(value => ({
    tag: '651', ind1: '', ind2: '4',
    subfields: [{code: 'a', value}]
  }));
}

/**
 * Generates field 653 ($a) based on dc.subject.ysa and dc.subject values.
 * @param {Object} ValueInterface containing getFieldValues function
 * @returns Empty array or array containing field 653 ($a)
 */
export function generate653({getFieldValues}) {
  const values = getFieldValues(p => [
    'dc.subject.ysa',
    'dc.subject',
    'dc.subject.keyword'
  ].includes(p));

  return values.map(value => ({
    tag: '653', ind1: '', ind2: '',
    subfields: [{code: 'a', value}]
  }));
}
