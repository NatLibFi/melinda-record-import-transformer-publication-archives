import {hasLevels, isDissertation, extractFinnishTerm, isOpenAccess, removeHtmlTags} from '../util/index.js';

/**
 * Wrapper for f500 generators
 * @param {Object} ValueInterface containing getFieldValues and getFields functions
 * @returns Empty array or array containing field 500
 */
export function generate500(valueInterace) {
  const machineGeneratedNotification = generate500MachineGenerated(valueInterace);
  const descriptionNotification = generate500Description(valueInterace);
  const dcNotificationNotification = generate500Notification(valueInterace);
  const levelNotification = generate500Level(valueInterace);
  const conferenceNotification = generate500Conference(valueInterace);

  return machineGeneratedNotification.concat(
    descriptionNotification,
    dcNotificationNotification,
    levelNotification,
    conferenceNotification
  );
}

/**
 * Generator for f500 notification regarding machine generated record
 * @param {Object} ValueInterface containing getFieldValues and getFields functions
 * @returns Empty array or array containing field 500
 */
export function generate500MachineGenerated({getFieldValues}) {
  return [
    {
      tag: '500',
      subfields: [{code: 'a', value: 'Koneellisesti tuotettu tietue.'}]
    }
  ];
}

/**
 * Generator for f500 notification from dc.description
 * @param {Object} ValueInterface containing getFieldValues and getFields functions
 * @returns Empty array or array containing field 500
 */
export function generate500Description({getFieldValues}) {
  const values = getFieldValues('dc.description');
  return values.length > 0 ? values
    .map(removeHtmlTags)
    .map(v => {
      const separator = v.endsWith('.') ? '' : '.';
      return {
        tag: '500', subfields: [{code: 'a', value: `${v}${separator}`}]
      };
    }) : [];
}

/**
 * Generator for f500 notification from dc.description.notification
 * @param {Object} ValueInterface containing getFieldValues and getFields functions
 * @returns Empty array or array containing field 500
 */
export function generate500Notification({getFieldValues}) {
  const values = getFieldValues('dc.description.notification');
  return values.length > 0 ? values
    .map(removeHtmlTags)
    .map(value => ({
      tag: '500', subfields: [{code: 'a', value}]
    })) : [];
}

/**
 * Generator for f500 notification from dc.type.ontasot
 * @param {Object} ValueInterface containing getFieldValues and getFields functions
 * @returns Empty array or array containing field 500
 */
export function generate500Level({getFieldValues}) {
  const values = getFieldValues('dc.type.ontasot');
  const levels = values.map(extractFinnishTerm).filter(v => v);

  return levels.map(level => ({
    tag: '500',
    subfields: [{code: 'a', value: level}]
  }));
}

/**
 * Generator for f500 notification regarding conference from dc.relation.conference
 * @param {Object} ValueInterface containing getFieldValues and getFields functions
 * @returns Empty array or array containing field 500
 */
export function generate500Conference({getFieldValues}) {
  const values = getFieldValues('dc.relation.conference');
  return values.map(v => ({
    tag: '500', subfields: [{code: 'a', value: v}, {code: '9', value: 'FENNI<KEEP>'}]
  }));
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
 * Generates field 506 ($a, $f, $2 ,$9) if publication is open access publication.
 * @param {Object} ValueInterface containing getFieldValues and getFields functions
 * @returns Empty array or array containing field 506 ($a, $f, $2 ,$9)
 */
export function generate506({getFieldValues}) {
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

/**
 * Generates field 540 ($a/$c, $u) based on dc.rights and dc.rights.uri fields
 * @param {Object} ValueInterface containing getFieldValues function
 * @returns Empty array or array containing field 540
 */
export function generate540({getFieldValues}) {
  const rightsValues = getFieldValues('dc.rights');

  if (blockGeneration(rightsValues)) {
    return [];
  }

  const fieldMap = {
    'cc by-nc-nd 4.0': {
      value: 'CC BY-NC-ND 4.0',
      url: 'https://creativecommons.org/licenses/by-nc-nd/4.0/deed.fi'
    },
    'cc by-sa 4.0': {
      value: 'CC BY-SA 4.0',
      url: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fi'
    },
    'cc by-sa 4.0 nimeä-jaasamoin': {
      value: 'CC BY-SA 4.0',
      url: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fi'
    },
    'cc by-nd 4.0': {
      value: 'CC BY-ND 4.0',
      url: 'https://creativecommons.org/licenses/by-nd/4.0/deed.fi'
    },
    'cc by-nc 4.0': {
      value: 'CC BY-NC 4.0',
      url: 'https://creativecommons.org/licenses/by-nc/4.0/deed.fi'
    },
    'cc by-nc-sa 4.0': {
      value: 'CC BY-NC-SA 4.0',
      url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.fi'
    },
    'cc by 4.0': {
      value: 'CC BY 4.0',
      url: 'https://creativecommons.org/licenses/by/4.0/deed.fi'
    }
  };

  return rightsValues
    .map(v => v.toLowerCase())
    .filter(v => Object.keys(fieldMap).includes(v))
    .map(k => ({
      tag: '540', ind1: '', ind2: '',
      subfields: [
        {code: 'f', value: fieldMap[k].value},
        {code: '2', value: 'cc'},
        {code: 'u', value: fieldMap[k].url}
      ]
    }));


  function blockGeneration(rightsValues) {
    const blockValues = [
      'This publication is copyrighted. You may download, display and print it for Your own personal use. Commercial use is prohibited.',
      'Tekijänoikeuslaki (404/1961) 9 § Tekijänoikeussuojaa vailla olevat teokset',
      'Upphovsrättslag (404/1961) 9 § Verk utan upphovsrättsskydd',
      'Copyright Act (404/1961) 9 § Works excluded from protection'
    ];

    return rightsValues.some(v => blockValues.includes(v));
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
