import {isDissertation} from '../util/index.js';

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
 * Generates field 650 ($a, $2) based on values of different vocabularies
 * @param {import('../../../types.js').ValueInterface} valueInterface - valueInterface containing getFieldValues and getFields functions
 * @returns {import('../../../types.js').DataField[]}
 */
export function generate650({getFieldValues}) {
  const yso = getFieldValues('dc.subject.yso').map(v => generateControlledVocabularyField(v, 'yso'));
  const afo = getFieldValues('dc.subject.afo').map(v => generateControlledVocabularyField(v, 'afo'));
  const juho = getFieldValues('dc.subject.juho').map(v => generateControlledVocabularyField(v, 'juho'));
  const tero = getFieldValues('dc.subject.tero').map(v => generateControlledVocabularyField(v, 'tero'));

  return yso.concat(afo, juho, tero);

  /**
   * Helper function for generating f650 for given vocabulary
   * @param {string} fieldValue - value for f650 $a
   * @param {string} subfield2Value - value for f650 $2
   * @returns {import('../../../types.js').DataField[]}
   */
  function generateControlledVocabularyField(fieldValue, subfield2Value) {
    return {
      tag: '650', ind2: '7',
      subfields: [
        {code: 'a', value: fieldValue},
        {code: '2', value: subfield2Value}
      ]
    };
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
    'dc.subject.keyword',
    'dc.subject.thl'
  ].includes(p));

  return values.map(value => ({
    tag: '653', ind1: '', ind2: '',
    subfields: [{code: 'a', value}]
  }));
}

/**
 * Generates field 655 based if entry is dissertation.
 * @param {Object} ValueInterface containing getFieldValues function
 * @returns Empty array or array containing field 653 ($a)
 */
export function generate655({getFieldValues}) {
  if (!isDissertation({getFieldValues})) {
    return [];
  }

  return [
    {
      code: '655',
      subfields: [
        {code: 'a', value: 'väitöskirjat'},
        {code: '2', value: 'slm/fin'},
        {code: '0', value: 'http://urn.fi/URN:NBN:fi:au:slm:s1227'},
        {code: '9', value: 'FENNI<KEEP>'}
      ]
    },
    {
      code: '655',
      subfields: [
        {code: 'a', value: 'doktorsavhandlingar'},
        {code: '2', value: 'slm/swe'},
        {code: '0', value: 'http://urn.fi/URN:NBN:fi:au:slm:s1227'}
      ]
    }
  ];
}