import {hasLevels, isDissertation, extractFinnishTerm, isOpenAccess} from '../util';

/**
 * Generates field 500 ($a) based on dc.description, dc.description.notification and dc.type.ontasot
 * @param {Object} ValueInterface containing getFieldValues and getFields functions
 * @returns Empty array or array containing field 500 ($a)
 */
export function generate500({getFieldValues, getFields}) {
  const hasLevel = hasLevels({getFields});
  const standardFields = generateStandardFields();

  if (hasLevel) {
    const levels = generateLevels();
    const level500 = levels.length > 0 ? levels.map(level => ({
      tag: '500', ind1: '', ind2: '',
      subfields: [{code: 'a', value: level}]
    }))
      : [];

    return standardFields.concat(level500);
  }

  return standardFields;

  function generateStandardFields() {
    const staticFields = generateStatic();
    const description = generateDescription();
    const notification = generateNotification();

    return staticFields.concat(description, notification);

    function generateStatic() {
      return [
        {
          tag: '500', ind1: '', ind2: '',
          subfields: [{code: 'a', value: 'Koneellisesti tuotettu tietue.'}]
        }
      ];
    }

    function generateDescription() {
      const values = getFieldValues('dc.description');
      return values.length > 0 ? values.map(v => {
        const separator = v.endsWith('.') ? '' : '.';
        return {
          tag: '500', ind1: '', ind2: '', subfields: [{code: 'a', value: `${v}${separator}`}]
        };
      }) : [];
    }

    function generateNotification() {
      const values = getFieldValues('dc.description.notification');
      return values.length > 0 ? values.map(value => ({
        tag: '500', ind1: '', ind2: '', subfields: [{code: 'a', value}]
      })) : [];
    }
  }

  function generateLevels() {
    const values = getFieldValues('dc.type.ontasot');
    return values.map(extractFinnishTerm).filter(v => v);
  }
}

/**
 * Generates field 502 ($a, $d, $c ,$9) if dc.type.ontasot contains information regarding dissertation.
 * Generated values are based on dc.contributor.organization, dc.date.issued and dc.contributor.faculty
 * @param {Object} ValueInterface containing getFieldValues and getFields functions
 * @returns Empty array or array containing field 502 ($a, $d, $c ,$9)
 */
export function generate502({getFieldValues}) {
  return isDissertation({getFieldValues}) ? [
    {
      tag: '502', ind1: '', ind2: '',
      subfields: generate502Subfields()
    }
  ] : [];

  function generate502Subfields() {
    const subfieldD = generateSubfieldD();
    const subfieldC = generateSubfieldC(subfieldD.length > 0);

    // Static subfields. Generated last so that separator can be evaluated
    const subfieldASeparator = subfieldC.length > 0 || subfieldD.length > 0 ? ' :' : '';
    const subfieldA = [{code: 'a', value: `Väitöskirja${subfieldASeparator}`}];
    const subfield9 = [{code: '9', value: 'FENNI<KEEP>'}];

    return [
      ...subfieldA,
      ...subfieldC,
      ...subfieldD,
      ...subfield9
    ];


    function generateSubfieldC(hasSubfieldD) {
      const [organization] = getFieldValues('dc.contributor.organization');
      const [faculty] = getFieldValues('dc.contributor.faculty');
      const subfieldEndSeparator = hasSubfieldD ? ', ' : '.';

      if (organization && faculty) {
        return [{code: 'c', value: `${organization}, ${faculty}${subfieldEndSeparator}`}];
      }

      return organization ? [{code: 'c', value: `${organization}${subfieldEndSeparator}`}] : [];
    }

    function generateSubfieldD() {
      const [date] = getFieldValues('dc.date.issued');
      if (date && date.length >= 4) {
        return [{code: 'd', value: `${date.slice(0, 4)}.`}];
      }
      return [];
    }
  }
}

/**
 * Generates field 506 ($a, $f, $2 ,$9) if dc.type.accesslevel fields exist in record with valid value or field does not exist.
 * Generated values are based on dc.rights.accesslevel and dc.rights.accessrights
 * @param {Object} ValueInterface containing getFieldValues and getFields functions
 * @returns Empty array or array containing field 506 ($a, $f, $2 ,$9)
 */
export function generate506({getFieldValues}) {
  const accessLevelFields = generateAccessLevelFields();
  const accessRightsFields = generateAccessRightsFields();

  return accessLevelFields.concat(accessRightsFields);

  function generateAccessLevelFields() {
    const openAccess = isOpenAccess({getFieldValues});

    return openAccess ? [
      {
        tag: '506',
        ind1: '0',
        ind2: '',
        subfields: [
          {
            code: 'a',
            value: 'Aineisto on vapaasti saatavissa.'
          },
          {
            code: 'f',
            value: 'Unrestricted online access'
          },
          {
            code: '2',
            value: 'star'
          },
          {
            code: '9',
            value: 'FENNI<KEEP>'
          }
        ]
      }
    ] : [];
  }

  function generateAccessRightsFields() {
    return getFieldValues('dc.rights.accessrights').map(value => ({
      tag: '506',
      ind1: '1',
      ind2: ' ',
      subfields: [
        {
          code: 'a',
          value
        }
      ]
    }));
  }
}

/**
 * Generates field 540 ($a/$c, $u) based on dc.rights and dc.rights.uri fields
 * @param {Object} ValueInterface containing getFieldValues function
 * @returns Empty array or array containing field 540
 */
export function generate540({getFieldValues}) {
  if (blockGeneration({getFieldValues})) {
    return [];
  }

  const rights = generateRights();
  const uri = generateUri();
  const url = generateUrl();

  return rights.concat(uri, url);

  function generateRights() {
    const values = getFieldValues('dc.rights');
    return values.map(value => {
      const subfields = generateSubfields();
      return {tag: '540', ind1: '', ind2: '', subfields};

      function generateSubfields() {
        return (/All rights reserved/u).test(value) ? [{code: 'a', value}] : [{code: 'c', value}];
      }
    });
  }

  function generateUri() {
    const values = getFieldValues('dc.rights.uri');
    return values.map(value => ({
      tag: '540', ind1: '', ind2: '',
      subfields: [{code: 'u', value}]
    }));
  }

  function generateUrl() {
    const values = getFieldValues('dc.rights.url');
    return values.map(value => ({
      tag: '540', ind1: '', ind2: '',
      subfields: [{code: 'u', value}]
    }));
  }

  function blockGeneration({getFieldValues}) {
    const rightsFields = getFieldValues('dc.rights');
    const blockValues = ['This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited.'];

    return rightsFields.some(v => blockValues.includes(v));
  }
}

/**
 * Generates field 542 ($d, $l) based on dc.rights.copyholder and dc.rights.copyright values
 * @param {Object} ValueInterface containing getFieldValues function
 * @returns Empty array or array containing field 542 ($d, $l)
 */
export function generate542({getFieldValues}) {
  const copyrightHolder = generateCopyrightHolder();
  const copyright = generateCopyright();

  return copyrightHolder.concat(copyright);

  function generateCopyrightHolder() {
    const values = getFieldValues('dc.rights.copyrightholder');
    return values.map(value => ({
      tag: '542', ind1: '', ind2: '',
      subfields: [{code: 'd', value}]
    }));
  }

  function generateCopyright() {
    const values = getFieldValues('dc.rights.copyright');
    return values.map(value => ({
      tag: '542', ind1: '', ind2: '',
      subfields: [{code: 'l', value}]
    }));
  }
}

/**
 * Generates field 594 containing note about record being machine produced record
 * @returns Array containing field 594 ($a, $5)
 */
export function generate594() {
  return [
    {
      tag: '594',
      subfields: [
        {code: 'a', value: 'Koneellisesti tuotettu tietue'},
        {code: '5', value: 'FENNI'}
      ]
    }
  ];
}
