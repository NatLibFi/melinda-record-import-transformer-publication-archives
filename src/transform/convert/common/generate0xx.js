import {formatLanguage, getHandle} from '../util';

/**
 * Generates field 020 ($a, $q) based on dc.identifier.isbn values
 * @param {Object} ValueInterface containing getFieldValues function
 * @param {string} filetype - filetype of record that is mapped to f020 $q
 * @returns Empty array or array containing field(s) 020
 */
export function generate020({getFieldValues}, filetype = 'PDF') {
  const values = getFieldValues('dc.identifier.isbn');
  return values.map(value => {
    return {
      tag: '020', ind1: '', ind2: '',
      subfields: [
        {code: 'a', value: formatValue()},
        {code: 'q', value: filetype}
      ]
    };

    function formatValue() {
      return value.replace(/ISBN|\s+|:|\(print\)/gu, '');
    }
  });
}

/**
 * Generates field 024 ($a, $2) based on dc.identifier.(urn|doi|uri) values.
 * Each value maps to a new field.
 * @param {Object} ValueInterface containing getFieldValues function
 * @returns Empty array or array containing field 024(s) ($a, $2)
 */
export function generate024({getFieldValues}) {
  const urn = generateUrnFields();
  const doi = generateDoiFields();
  const handle = generateHandleFields();

  return urn.length > 0 || doi.length > 0 ? urn.concat(doi) : handle;

  function generateUrnFields() {
    const values = getFieldValues('dc.identifier.urn');
    return values.length > 0 ? [
      {
        tag: '024', ind1: '7', ind2: '',
        subfields: [
          {code: 'a', value: values[0]},
          {code: '2', value: 'urn'}
        ]
      }
    ] : [];
  }

  function generateDoiFields() {
    const values = getFieldValues('dc.identifier.doi');
    return values.length > 0 ? [
      {
        tag: '024', ind1: '7', ind2: '',
        subfields: [
          {code: 'a', value: values[0]},
          {code: '2', value: 'urn'}
        ]
      }
    ] : [];
  }

  function generateHandleFields() {
    const values = getFieldValues('dc.identifier.uri');

    return values.length > 0 ? values.filter(v => getHandle(v) !== false).map(v => ({
      tag: '024', ind1: '7', ind2: '',
      subfields: [
        {code: 'a', value: v},
        {code: '2', value: 'hdl'}
      ]
    })) : [];
  }
}

/**
 * Generates field 040 ($b, $e, $d) using static values
 * @returns Array containing field 040 ($b, $e, $d)
 */
export function generate040() {
  return [
    {
      tag: '040', ind1: '', ind2: '',
      subfields: [
        {code: 'b', value: 'fin'},
        {code: 'e', value: 'rda'},
        {code: 'd', value: 'FI-NL'}
      ]
    }
  ];
}

/**
 * Generates field 041 ($a) based on values from dc.language.iso
 * @param {Object} ValueInterface containing getFieldValues function
 * @returns Empty array or array containing field 041 ($a)
 */
export function generate041({getFieldValues}) {
  const values = getFieldValues('dc.language.iso');
  return values.map(v => ({
    tag: '041', ind1: '', ind2: '',
    subfields: [{code: 'a', value: formatLanguage(v)}]
  }));
}

/**
 * Generates field 042 ($a) using static values
 * @returns Array containing field 042 ($a)
 */
export function generate042() {
  return [
    {
      tag: '042', ind1: '', ind2: '',
      subfields: [{code: 'a', value: 'finb'}]
    }
  ];
}

