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
 * Generates field 341 using accessibility feature mapping table
 * @param {import('../../../types.js').ValueInterface} valueInterface - valueInterface containing getFieldValues and getFields functions
 * @returns {import('../../../types.js').DataField[]}
 */
export function generate341({getFieldValues}) {
  // Mapping is in process and may be expanded in future.
  // 'looginen lukemisjärjestys' and 'taulukot saavutettavia' do have equal mapping by design
  // unknown accessibility has language versions with equal mapping by design
  const accessibilityFeatureMap = {
    'navigointi mahdollista': {
      ind1: '0',
      subfieldA: 'textual',
      subfieldB: 'structuralNavigation',
      subfield2: 'sapdv'
    },
    'kuvilla vaihtoehtoiset kuvaukset': {
      ind1: '0',
      subfieldA: 'visual',
      subfieldB: 'alternativeText',
      subfield2: 'sapdv'
    },
    'looginen lukemisjärjestys': {
      ind1: '0',
      subfieldA: 'textual',
      subfieldB: 'readingOrder',
      subfield2: 'sapdv'
    },
    'taulukot saavutettavia': {
      ind1: '0',
      subfieldA: 'textual',
      subfieldB: 'readingOrder',
      subfield2: 'sapdv'
    },
    'ei tietoa saavutettavuudesta': {
      ind1: '0',
      subfieldA: 'textual',
      subfieldB: 'unknown',
      subfield2: 'sapdv'
    },
    'okänd tillgänglighet': {
      ind1: '0',
      subfieldA: 'textual',
      subfieldB: 'unknown',
      subfield2: 'sapdv'
    },
    'unknown accessibility': {
      ind1: '0',
      subfieldA: 'textual',
      subfieldB: 'unknown',
      subfield2: 'sapdv'
    }
  };

  const accessibilityFeatures = getFieldValues('dc.description.accessibilityfeature')
    .map(feature => accessibilityFeatureMap[feature])
    .filter(v => v);

  const fields = accessibilityFeatures.reduce((prev, next) => {
    // Do not create duplicate field if field with matching $b already exists
    const hasMatchingField = prev.find(field => {
      const subfieldBValues = field.subfields.filter(sf => sf.code === 'b').map(sf => sf.value);
      return subfieldBValues.includes(next.subfieldB);
    });

    if (hasMatchingField) {
      return prev;
    }

    // Expand $b to existing subfield if it can be done
    const expandableFieldIdx = prev.findIndex(field => {
      const fieldSubfieldA = field.subfields.find(sf => sf.code === 'a')?.value;
      const fieldSubfieldB = field.subfields.find(sf => sf.code === 'b')?.value;
      const fieldSubfield2 = field.subfields.find(sf => sf.code === '2')?.value;

      const subfieldBNotMatches = fieldSubfieldB !== next.subfieldB;

      const subfieldAMatches = fieldSubfieldA === next.subfieldA;
      const subfield2Matches = fieldSubfield2 === next.subfield2;
      const subfieldInd1Matches = field.ind1 === next.ind1;

      const matchConditions = [subfieldAMatches, subfieldBNotMatches, subfield2Matches, subfieldInd1Matches];
      return matchConditions.every(matchCondition => matchCondition === true);
    });

    if (expandableFieldIdx !== -1) {
      const expandableField = prev[expandableFieldIdx];

      // Done to keep subfield ordering intact
      const expandableSubfieldsA = expandableField.subfields.filter(sf => sf.code === 'a');
      const expandableSubfieldsB = expandableField.subfields.filter(sf => sf.code === 'b');
      const expandableSubfields2 = expandableField.subfields.filter(sf => sf.code === '2');

      expandableField.subfields = [
        ...expandableSubfieldsA,
        ...expandableSubfieldsB,
        {code: 'b', value: next.subfieldB},
        ...expandableSubfields2
      ];

      return prev;
    }

    return [
      ...prev,
      {
        tag: '341', ind1: next.ind1,
        subfields: [
          {code: 'a', value: next.subfieldA},
          {code: 'b', value: next.subfieldB},
          {code: '2', value: next.subfield2}
        ]
      }
    ];
  }, []);

  return fields;
}
