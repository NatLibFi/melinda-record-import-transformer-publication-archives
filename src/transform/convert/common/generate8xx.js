import {createHash} from 'crypto';

import {clone} from '@natlibfi/melinda-commons';
import {MarcRecord} from '@natlibfi/marc-record';

import {isValidLink} from '../util';
import {sourceConfig} from '../../../config';

/**
 * Generates field 856 ($u: optional, $y: optional).
 * Field generation is based on dc.rights.accesslevel value.
 * 856 fields relating to publicly available access prioritize
 * URN and DOI over URI and URL.
 * @param {Object} ValueInterface containing getFieldValues function
 * @returns Empty array or array containing field 856 ($u, $y)
 */
export function generate856({getFieldValues}) {
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
      return values.map(v => ({code: 'u', value: (/http:\/\/urn.fi\//u).test(v) ? v : `http://urn.fi/${v}`}));
    }

    function generateU(path) {
      const values = getFieldValues(path);
      return values.filter(value => isValidLink(value)).map(value => ({code: 'u', value}));
    }
  }
}

/**
 * Generates field 884 ($a, $g, $k, $q, $5).
 * Field generation is based on environmental variables value.
 * @param {string} harvestSource Source from where metadata was retrieved
 * @param {Object} moment Moment instance to be used for date generation
 * @param {Object} marcRecord MarcRecord object of transformed record
 * @returns Array containing field 884 ($a, $g, $k, $q, $5)
 */
export function generate884(harvestSource, moment, marcRecord) {
  const copyMarcRecordData = clone(marcRecord);
  const copyMarcRecord = new MarcRecord(copyMarcRecordData);

  emptyCreationDate(copyMarcRecord);
  const hash = createHash('sha256').update(JSON.stringify(copyMarcRecord)).digest('hex');

  return [
    {
      tag: '884', ind1: '', ind2: '',
      subfields: [
        {code: 'a', value: 'Dublin Core to MARC transformation'},
        {code: 'g', value: moment().format('YYYYMMDD')},
        {code: 'k', value: `${sourceConfig[harvestSource].f884}:${hash}`},
        {code: 'q', value: 'FI-NL'},
        {code: '5', value: 'MELINDA'}
      ]
    }
  ];


  function emptyCreationDate(record) {
    const [f008] = record.pop(/008/u); // eslint-disable-line functional/immutable-data
    // emptyCreationDate:
    // Normalize f008/00-05 - In non-MARC21 imports f008 'Date entered on file' gets always the current date
    // This propably should be configurable
    const newF008 = {
      tag: f008.tag,
      value: `000000${f008.value.substring(6)}`
    };

    record.insertFields([newF008]);
    return;
  }
}
