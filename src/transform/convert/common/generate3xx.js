/**
 * Generates field 300 ($a) based on first dc.format.extent value.
 * @param {Object} ValueInterface containing getFieldValues function
 * @param {number} numberOfFiles number of files calculated from kk:file tags
 * @returns Empty array or array containing field 300 ($a)
 */
export function generate300({getFieldValues}, numberOfFiles) {
  const [value] = getFieldValues('dc.format.extent');

  const numberOfAttachments = numberOfFiles && numberOfFiles > 1 ? numberOfFiles - 1 : 0; // NB: when there are two files, there is one attachment
  const subfieldA = value ? [{code: 'a', value: `1 verkkoaineisto (${value} sivua)`}] : [{code: 'a', value: '1 verkkoaineisto'}];
  const subfieldE = numberOfAttachments > 0 ? getSubfieldE(numberOfAttachments) : [];

  const subfields = [...subfieldA, ...subfieldE];

  return [
    {
      tag: '300', ind1: '', ind2: '',
      subfields
    }
  ];


  function getSubfieldE(numberOfAttachments) {
    return numberOfAttachments > 1 ? [{code: 'e', value: `${numberOfAttachments} liitettä`}] : [{code: 'e', value: '1 liite'}];
  }
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
