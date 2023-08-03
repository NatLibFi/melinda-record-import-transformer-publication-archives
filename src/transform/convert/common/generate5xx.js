import {hasLevels, isDissertation, extractFinnishTerm} from '../util';

/**
 * Generates field 500 ($a) based on dc.description, dc.description.notification and dc.type.ontasot
 * @param {Object} ValueInterface containing getFieldValues and getFields functions
 * @returns Empty array or array containing field 500 ($a)
 */
export function generate500({getFieldValues, getFields}) {
  const hasLevel = hasLevels({getFields});
  const standardFields = generateStandardFields();

  if (hasLevel) {
    const level = generateLevel();

    const level500 = level ? [
      {
        tag: '500', ind1: '', ind2: '',
        subfields: [{code: 'a', value: level}]
      }
    ] : [];

    return level500.concat(standardFields);
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
      return values.length > 0 ? values.map(v => ({
        tag: '500', ind1: '', ind2: '', subfields: [{code: 'a', value: `${v}.`}]
      })) : [];
    }

    function generateNotification() {
      const values = getFieldValues('dc.description.notification');
      return values.length > 0 ? values.map(value => ({
        tag: '500', ind1: '', ind2: '', subfields: [{code: 'a', value}]
      })) : [];
    }
  }

  function generateLevel() {
    const [value] = getFieldValues('dc.type.ontasot');
    return extractFinnishTerm(value);
  }
}

/**
 * Generates field 502 ($a, $d, $c ,$9) if dc.type.ontasot fields exist in record.
 * Generated values are based on dc.contributor.organization, dc.date.issued and dc.contributor faculty
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
    const organizations = getFieldValues('dc.contributor.organization');
    const issueDate = generateIssueDate();
    const head = [{code: 'a', value: 'Väitöskirja :'}];
    const tail = [{code: '9', value: 'FENNI<KEEP>'}];

    if (organizations.length > 0) {
      const facultySubfield = generateFacultySubfield();

      if (facultySubfield) {
        return head.concat(facultySubfield, issueDate, tail);
      }

      return head.concat(generateOrganization(), issueDate, tail);
    }

    return head.concat(tail);

    function generateIssueDate() {
      const date = getFieldValues('dc.date.issued');
      return {code: 'd', value: `${date.slice(0, 4)}.`};
    }

    function generateOrganization() {
      return {code: 'c', value: organizations[0]};
    }

    function generateFacultySubfield() {
      const faculties = getFieldValues('dc.contributor.faculty');

      if (faculties.length > 0) {
        const value = extractFinnishTerm(faculties[0]);
        return {code: 'c', value: `${organizations[0]}, ${value}, `};
      }
    }
  }
}

/**
 * Generates field 506 ($a, $f, $2 ,$9) if dc.type.ontasot fields exist in record.
 * Generated values are based on dc.rights.accesslevel and dc.rights.accessrights
 * @param {Object} ValueInterface containing getFieldValues and getFields functions
 * @returns Empty array or array containing field 506 ($a, $f, $2 ,$9)
 */
export function generate506({getFieldValues, getFields}) {
  const accessLevelFields = generateAccessLevelFields();
  const accessRightsFields = generateAccessRightsFields();

  return accessLevelFields.concat(accessRightsFields);

  function generateAccessLevelFields() {
    const accessLevel = getFieldValues('dc.rights.accesslevel');
    const fields = [
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
    ];

    return accessLevel.length === 0 || accessLevel[0] === 'openAccess' ? fields : [];
  }

  function generateAccessRightsFields() {
    const accessRights = getFields('dc.rights.accessrights');

    return accessRights.length > 0 ? [
      {
        tag: '506',
        ind1: '1',
        ind2: ' ',
        subfields: [
          {
            code: 'a',
            value: ''
          }
        ]
      }
    ] : [];
  }
}

/**
 * Generates field 540 ($u) based on dc.rights and dc.rights.uri fields
 * @param {Object} ValueInterface containing getFieldValues function
 * @returns Empty array or array containing field 540 ($u)
 */
export function generate540({getFieldValues}) {
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
