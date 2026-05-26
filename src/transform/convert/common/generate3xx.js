import {getAccessibilityFieldInfo} from '../util/accessibility-feature-map.js';

/**
 * Generates field 300 ($a) based on first dc.format.extent value.
 * @param {Object} ValueInterface containing getFieldValues function
 * @param {number} numberOfFiles number of files calculated from kk:file tags
 * @returns Empty array or array containing field 300 ($a)
 */
export function generate300({getFieldValues}, numberOfFiles) {
  const [extentValue] = getFieldValues('dc.format.extent');

  const invalidExtentSuffix = /\b[ps]\.?$/;
  const formattedExtendValue = extentValue ? extentValue.replace(invalidExtentSuffix, '').trim() : undefined;

  const numberOfAttachments = numberOfFiles && numberOfFiles > 1 ? numberOfFiles - 1 : 0; // NB: when there are two files, there is one attachment

  const useNominative = Number(formattedExtendValue) === 1;
  const pageTerm = useNominative ? 'sivu' : 'sivua';
  const subfieldA = formattedExtendValue ? [{code: 'a', value: `1 verkkoaineisto (${formattedExtendValue} ${pageTerm})`}] : [{code: 'a', value: '1 verkkoaineisto'}];
  const subfieldE = numberOfAttachments > 0 ? getSubfieldE(numberOfAttachments) : [];

  return [
    {
      tag: '300', ind1: '', ind2: '',
      subfields: subfieldA.concat(subfieldE)
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
 * Generates field 341 using accessibility feature mapping table
 * @param {import('../../../types.js').ValueInterface} valueInterface - valueInterface containing getFieldValues and getFields functions
 * @returns {import('../../../types.js').DataField[]}
 */
export function generate341({getFieldValues}) {
  // Mapping is in process and may be changed in future.
  // Note that some mappings do share mapping - this is by design and duplicates are deduplicated during processing.
  const accessibilityFeatures = getFieldValues('dc.description.accessibilityfeature')
    .map(feature => getAccessibilityFieldInfo(feature))
    .filter(v => v !== null);

  if (accessibilityFeatures.length === 0) {
    return [];
  }

  const deduplicatedFeatures = accessibilityFeatures.reduce((prev, next) => {
    const featureType = next.a;
    const currentFeatures = prev[featureType];

    const isDuplicate = currentFeatures.find(entry => entry === next.b);
    if (isDuplicate) {
      return prev;
    }

    const newFeatures = currentFeatures.concat(next.b);
    return {
      ...prev,
      [featureType]: newFeatures
    };
  }, {auditory: [], visual: [], textual: []});

  const featuresWithValues = Object.keys(deduplicatedFeatures).filter(f => deduplicatedFeatures[f].length > 0);

  // Each feature type has its own field and contains deduplicated features associated with the type in $b
  const fields = featuresWithValues.map(feature => {
    const subfieldBs = deduplicatedFeatures[feature].map(v => ({code: 'b', value: v}));

    return {
      tag: '341', ind1: '0',
      subfields: [
        {code: 'a', value: feature},
        ...subfieldBs,
        {code: '2', value: 'sapdv'}
      ]
    };
  });

  return fields;
}
