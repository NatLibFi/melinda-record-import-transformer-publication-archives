export function generate500and502({getFieldValues, getFields}) {
  const hasLevels = generateHasLevels();
  const fields500 = generate500();
  const fields502 = generate502();

  return fields500.concat(fields502);

  function generate500() {
    const standardFields = generateStandardFields();

    if (hasLevels) {
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

  function generate502() {
    return hasLevels ? [
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

  function generateHasLevels() {
    const fields = getFields('dc.type.ontasot');
    return fields.length > 0;
  }

  function extractFinnishTerm(value) {
    const result = (/(?<a>^fi|\|fi)=(?<b>.[^|]+)/u).exec(value);
    return result && result.length === 3 ? result[2].trim() : undefined;
  }
}

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
