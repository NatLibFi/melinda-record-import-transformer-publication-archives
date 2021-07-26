/**
*
* @licstart  The following is the entire license notice for the JavaScript code in this file.
*
* Publication archives record transformer for the Melinda record batch import system
*
* Copyright (C) 2019-2020 University Of Helsinki (The National Library Of Finland)
*
* This file is part of melinda-record-import-transformer-publication-archives
*
* melinda-record-import-transformer-publication-archives program is free software: you can redistribute it and/or modify
* it under the terms of the GNU Affero General Public License as
* published by the Free Software Foundation, either version 3 of the
* License, or (at your option) any later version.
*
* melinda-record-import-transformer-publication-archives is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU Affero General Public License for more details.
*
* You should have received a copy of the GNU Affero General Public License
* along with this program.  If not, see <http://www.gnu.org/licenses/>.
*
* @licend  The above is the entire license notice
* for the JavaScript code in this file.
*
*/

import langs from 'langs';
import {MarcRecord} from '@natlibfi/marc-record';
import moment from 'moment';

export default ({harvestSource, urnResolverUrl}) => record => {
  const fields = getInputFields();
  const marcRecord = new MarcRecord();

  marcRecord.leader = '01704nam a22002653i 4500'; // eslint-disable-line functional/immutable-data

  generateOutputFields().forEach(f => marcRecord.insertField(f));

  return marcRecord;

  function getInputFields() {
    return record.metadata[0]['kk:metadata'][0]['kk:field']
      .filter(field => '$' in field);
  }

  function generateOutputFields() {
    return [
      generate008(),
      generate020(),
      generate024(),
      generate041(),
      generate245(),
      generate246(),
      generate250(),
      generate264(),
      generate300(),
      generate490(),
      generate500and502(),
      generate542(),
      generate648(),
      generate650(),
      generate651(),
      generate653(),
      generate100and700(),
      generate776(),
      generate506(),
      generate540(),
      generate856(),
      generateStaticFields()
    ]
    // Remove undefined values
      .filter(v => v)
      .flat();

    function generateStaticFields() {
      return [
        {
          tag: '007', value: 'cr |||||||||||'
        },
        {
          tag: 'LOW', ind1: '', ind2: '',
          subfields: [{code: 'a', value: 'FIKKA'}]
        },
        {
          tag: '040', ind1: '', ind2: '',
          subfields: [
            {code: 'b', value: 'fin'},
            {code: 'e', value: 'rda'},
            {code: 'd', value: 'FI-NL'}
          ]
        },
        {
          tag: '042', ind1: '', ind2: '',
          subfields: [{code: 'a', value: 'finb'}]
        },
        {
          tag: '336', ind1: '', ind2: '',
          subfields: [
            {code: 'a', value: 'teksti'},
            {code: 'b', value: 'txt'},
            {code: '2', value: 'rdacontent'}
          ]
        },
        {
          tag: '337', ind1: '', ind2: '',
          subfields: [
            {code: 'a', value: 'tietokonekäyttöinen'},
            {code: 'b', value: 'c'},
            {code: '2', value: 'rdamedia'}
          ]
        },
        {
          tag: '338', ind1: '', ind2: '',
          subfields: [
            {code: 'a', value: 'verkkoaineisto'},
            {code: 'b', value: 'cr'},
            {code: '2', value: 'rdacarrier'}
          ]
        },
        {
          tag: '884', ind1: '', ind2: '',
          subfields: [{code: 'k', value: harvestSource}]
        }
      ];
    }

    function generate100and700() {
      const writers = generateWriters();
      const editors = generateEditors();

      return writers.concat(editors);

      function generateWriters() {
        const values = getFieldValues(p => [
          'dc.contributor.author',
          'dc.creator'
        ].includes(p));
        return values.map((v, index) => ({
          tag: index === 0 ? '100' : '700', ind1: '1', ind2: '',
          subfields: [
            {code: 'a', value: `${v},`},
            {code: 'e', value: 'kirjoittaja.'}
          ]
        }));
      }

      function generateEditors() {
        const values = getFieldValues('dc.contributor.editor');
        return values.map(value => ({
          tag: '700', ind1: '1', ind2: '',
          subfields: [
            {code: 'a', value},
            {code: 'e', value: 'toimittaja.'}
          ]
        }));
      }
    }

    function generate776() {
      const values = getFieldValues('dc.relation.isversionof');
      return values.map(value => ({
        tag: '776', ind1: '0', ind2: '8',
        subfields: [
          {code: 'z', value},
          {code: '9', value: 'FENNI<KEEP>'}
        ]
      }));
    }

    function generate648() {
      const values = getFieldValues('dc.coverage.temporal');
      return values.map(value => ({
        tag: '648', ind1: '', ind2: '7',
        subfields: [{code: 'a', value}]
      }));
    }

    function generate650() {
      const yso = generateYso();
      const afo = generateAfo();

      return yso.concat(afo);

      function generateYso() {
        const values = getFieldValues('dc.subject.yso');
        return values.map(value => ({
          tag: '650', ind1: '', ind2: '7',
          subfields: [
            {code: 'a', value},
            {code: '2', value: 'yso'}
          ]
        }));
      }

      function generateAfo() {
        const values = getFieldValues('dc.subject.afo');
        return values.map(value => ({
          tag: '650', ind1: '', ind2: '7',
          subfields: [
            {code: 'a', value},
            {code: '2', value: 'afo'}
          ]
        }));
      }
    }

    function generate651() {
      const values = getFieldValues('dc.coverage.spatial');
      return values.map(value => ({
        tag: '651', ind1: '', ind2: '7',
        subfields: [{code: 'a', value}]
      }));
    }

    function generate653() {
      const values = getFieldValues(p => [
        'dc.subject.ysa',
        'dc.subject'
      ].includes(p));
      return values.map(value => ({
        tag: '653', ind1: '', ind2: '',
        subfields: [{code: 'a', value}]
      }));
    }

    function generate542() {
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

    function generate300() {
      const values = getFieldValues('dc.format.extent');
      return values.map(v => ({
        tag: '300', ind1: '', ind2: '',
        subfields: [{code: 'a', value: `1 verkkoaineisto (${v} sivua)`}]
      }));
    }

    function generate250() {
      const values = getFieldValues('dc.description.edition');
      return values.map(value => ({
        tag: '250', ind1: '', ind2: '',
        subfields: [{code: 'a', value}]
      }));
    }

    function generate246() {
      const values = getFieldValues('dc.title.alternative');
      return values.map(value => ({
        tag: '246', ind1: '1', ind2: '3',
        subfields: [{code: 'a', value}]
      }));
    }

    function generate020() {
      const values = getFieldValues('dc.identifier.isbn');
      return values.map(value => {
        return {
          tag: '020', ind1: '', ind2: '',
          subfields: [
            {code: 'a', value: formatValue()},
            {code: 'q', value: 'PDF'}
          ]
        };

        function formatValue() {
          return value.replace(/ISBN|\s+|\(print\)/gu, '');
        }
      });
    }

    function generate041() {
      const values = getFieldValues('dc.language.iso');
      return values.map(v => ({
        tag: '041', ind1: '', ind2: '',
        subfields: [{code: 'a', value: formatLanguage(v)}]
      }));
    }

    function generate008() {
      const timestamp = generateTimestamp();
      const date = generateDate();
      const country = generateCountry();
      const contentNature = generateNatureOfContent();
      const language = generateLanguage();

      return {
        tag: '008',
        value: `${timestamp}s${date}    ${country} |||||o${contentNature}|||| ||${language} c`
      };

      function generateTimestamp() {
        return moment().format('YYMMDD');
      }

      function generateDate() {
        const values = getFieldValues('dc.date.issued');
        return values.length > 0 ? values[0].slice(0, 4) : '||||';
      }

      function generateCountry() {
        const values = getFieldValues('dc.publisher.country');
        return values.length > 0 ? values[0].slice(0, 2).toLowerCase() : 'fi';
      }

      function generateNatureOfContent() {
        const levels = getFields('dc.type.ontasot');
        return levels.length > 0 ? 'm   ' : '||||';
      }

      function generateLanguage() {
        const values = getFieldValues('dc.language.iso');
        return formatLanguage(values.slice(-1)[0]);
      }
    }

    function generate024() {
      const urn = generateUrnFields();
      const doi = generateDoiFields();

      return urn.concat(doi);

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
            sbufields: [
              {code: 'a', value: values[0]},
              {code: '2', value: 'urn'}
            ]
          }
        ] : [];
      }
    }

    function generate245() {
      const isAddedEntry = generateIsAddedEntry();
      const titles = getFieldValues('dc.title');

      return titles.map(title => ({
        tag: '245',
        ind1: isAddedEntry ? '1' : '0',
        ind2: '0',
        subfields: [{code: 'a', value: `${title}.`}]
      }));

      function generateIsAddedEntry() {
        const fields = getFields(p => [
          'dc.contributor.author',
          'dc.author'
        ].includes(p));
        return fields.length > 0;
      }
    }

    function generate264() {
      const subfields = generateSubfields();

      if (subfields.length > 0) {
        return {
          tag: '264', ind1: '', ind2: '1', subfields
        };
      }

      function generateSubfields() {
        const place = generatePlace();
        const publisher = generatePublisher();
        const issueDate = generateIssueDate();

        return place.concat(publisher, issueDate);

        function generatePlace() {
          const values = getFieldValues('dc.publisher.place');
          return values.length > 0 ? [{code: 'a', value: `${values[0]}:`}] : [];
        }

        function generatePublisher() {
          const values = getFieldValues('dc.publisher');
          return values.length > 0 ? [{code: 'b', value: `${values[0]},`}] : [];
        }

        function generateIssueDate() {
          const values = getFieldValues('dc.date.issued');
          return values.length > 0 ? values.map(toSubfield) : [];

          function toSubfield(value) {
            return {code: 'c', value: `${value}.`};
          }
        }
      }
    }

    function generate490() {
      const subfields = generateSubfields();

      if (subfields.length > 0) {
        return {
          tag: '490',
          ind1: '0',
          ind2: ' ',
          subfields
        };
      }

      function generateSubfields() {
        const tail = generateTail();
        return generateIsPartOfSeries(tail.length > 0).concat(tail);

        function generateIsPartOfSeries(hasTail) {
          const values = getFieldValues('dc.relation.ispartofseries');
          return values
            .reduceRight(toSubfields, [])
          // Reverse
            .reduceRight((acc, v) => acc.concat(v), []);

          function toSubfields(acc, value) {
            const subfieldValue = generateValue();
            return acc.concat({code: 'a', value: subfieldValue});

            function generateValue() {
              if (acc.length === 0) {
                return hasTail ? `${value},` : value;
              }

              return `${value} `;
            }
          }
        }

        function generateTail() {
          const seriesNumber = generateSeriesNumber();

          return generateIssn(seriesNumber.length > 0).concat(seriesNumber);

          function generateSeriesNumber() {
            return getFieldValues(p => p === 'dc.relation.numberinseries' || p === 'dc.relation.numberofseries')
              .reduceRight((acc, value) => {
                if (acc.length === 0) {
                  return acc.concat({code: 'v', value});
                }

                return acc.concat({code: 'v', value: `${value} ; `});
              }, [])
            // Reverse
              .reduceRight((acc, v) => acc.concat(v), []);
          }

          function generateIssn(hasSeriesNumber) {
            return getFieldValues('dc.relation.issn')
              .reduceRight((acc, value) => {
                if (acc.length === 0) {
                  return acc.concat({code: 'x', value: hasSeriesNumber ? `${value} ;` : value});
                }

                return acc.concat({code: 'x', value: `${value}, `});
              }, [])
            // Reverse
              .reduceRight((acc, v) => acc.concat(v), []);
          }
        }
      }
    }

    function generate500and502() {
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
                subfields: [
                  {code: 'a', value: 'Koneellisesti tuotettu tietue.'},
                  {code: '9', value: 'FENNI<KEEP>'}
                ]
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
  }


  function generate506() {
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

  function generate540() {
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

  function generate856() {
    const publicAccessFields = generatePublicAccessFields();
    const otherUrnFields = generateOtherUrnFields();

    return publicAccessFields.concat(otherUrnFields);

    function generatePublicAccessFields() {
      const accessLevel = getFieldValues('dc.rights.accesslevel');

      if (accessLevel.length === 0 || accessLevel[0] === 'openAccess') {
        const subfields = generateSubfields();
        return [{tag: '856', ind1: '4', ind2: '0', subfields}];
      }

      return [];

      function generateSubfields() {
        const linkSubfields = generateLinkSubfields();
        return linkSubfields.concat({code: 'y', value: 'Linkki verkkoaineistoon'});
      }
    }

    function generateOtherUrnFields() {
      const urn = getFieldValues('dc.relation.urn');

      return urn.length > 0 ? [
        {
          tag: '856', ind1: '4', ind2: '2',
          subfields: [{code: 'u', value: urn[0]}]
        }
      ] : [];
    }

    function generateLinkSubfields() {
      const urn = generateUrn();
      const doi = generateU('dc.identifier.doi');
      const uri = generateU('dc.identifier.uri');
      const url = generateU('dc.identifier.url');

      if (urn.length > 0) {
        return doi ? urn.concat(doi) : urn;
      }

      return doi.concat(uri, url);

      function generateUrn() {
        const values = getFieldValues('dc.identifier.urn');
        return values.map(v => ({code: 'u', value: `${urnResolverUrl}/${v}`}));
      }

      function generateU(path) {
        const values = getFieldValues(path);
        return values.map(value => ({code: 'u', value}));
      }
    }
  }

  function getFields(arg) {
    const filter = typeof arg === 'function' ? arg : p => p === arg;

    const newFields = fields.filter(field => {
      const dcPath = getDCPath(field);
      return filter(dcPath);
    });

    return newFields;
  }

  function getFieldValues(filter) {
    const fields = getFields(filter);
    return fields
      .filter(f => f.$.value)
      .map(f => f.$.value);
  }

  function getDCPath(field) {
    const dcPath = `${field.$.schema}.${field.$.element}`;

    if (field.$.qualifier) {
      return `${dcPath}.${field.$.qualifier}`;
    }

    return dcPath;
  }

  function formatLanguage(code) {
    if (code.length === 3) {
      return code;
    }

    const lang = langs.where(1, code);
    return lang ? lang['2B'] : 'und';
  }
};
