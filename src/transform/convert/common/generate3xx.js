/**
 * Generates field 300 ($a) based on dc.format.extent values.
 * @param {Object} ValueInterface containing getFieldValues function
 * @returns Empty array or array containing field 300 ($a)
 */
export function generate300({getFieldValues}) {
  const [value] = getFieldValues('dc.format.extent');
  return value ? [
    {
      tag: '300', ind1: '', ind2: '',
      subfields: [{code: 'a', value: `1 verkkoaineisto (${value} sivua)`}]
    }
  ] : [];
}

/**
 * Generates field 336 ($a, $b, $2) using static values.
 * @returns Array containing field 336 ($a, $b, $2)
 */
export function generate336() {
  return [
    {
      tag: '336', ind1: '', ind2: '',
      subfields: [
        {code: 'a', value: 'teksti'},
        {code: 'b', value: 'txt'},
        {code: '2', value: 'rdacontent'}
      ]
    }
  ];
}

/**
 * Generates field 337 ($a, $b, $2) using static values.
 * @returns Array containing field 337 ($a, $b, $2)
 */
export function generate337() {
  return [
    {
      tag: '337', ind1: '', ind2: '',
      subfields: [
        {code: 'a', value: 'tietokonekäyttöinen'},
        {code: 'b', value: 'c'},
        {code: '2', value: 'rdamedia'}
      ]
    }
  ];
}

/**
 * Generates field 338 ($a, $b, $2) using static values
 * @returns Array containing field 338 ($a, $b, $2)
 */
export function generate338() {
  return [
    {
      tag: '338', ind1: '', ind2: '',
      subfields: [
        {code: 'a', value: 'verkkoaineisto'},
        {code: 'b', value: 'cr'},
        {code: '2', value: 'rdacarrier'}
      ]
    }
  ];
}

/**
 * Generates field 341 ($a) using static values
 * @returns Array containing field 341 ($a)
 */
export function generate341() {
  return [
    {
      tag: '341', ind1: '', ind2: '',
      subfields:
      [{code: 'a', value: 'tekstiin perustuva'}]
    }
  ];
}
