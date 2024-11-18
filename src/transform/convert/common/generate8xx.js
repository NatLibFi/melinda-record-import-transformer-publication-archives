import {createHash} from 'crypto';

import {clone} from '@natlibfi/melinda-commons';
import {MarcRecord} from '@natlibfi/marc-record';

import {isOpenAccess, isValidLink} from '../util';
import {sourceConfig} from '../../../config';

/**
 * Generates field 856 ($u, $y: optional).
 * @param {Object} ValueInterface containing getFieldValues function
 * @returns Empty array or array containing field 856 ($u, $y)
 */
export function generate856({getFieldValues}) {
  const publicAccessFields = generatePublicAccessFields({getFieldValues});
  const otherUrnFields = generateOtherUrnFields({getFieldValues});

  return publicAccessFields.concat(otherUrnFields);

  /**
   * Generation prioritization if open access fields are to be generated:
   *   1. If dc.identifier.urn has value(s), generate subfields using all these values
   *   2. If dc.identifier.doi/dc.identifier.uri have value(s), generate subfields using all these values
  */
  function generatePublicAccessFields({getFieldValues}) {
    const openAccess = isOpenAccess({getFieldValues});

    if (openAccess) {
      const subfields = generateSubfields({getFieldValues});
      return subfields.length > 0 ? [{tag: '856', ind1: '4', ind2: '0', subfields}] : [];
    }

    return [];


    function generateSubfields({getFieldValues}) {
      const linkSubfields = generateLinkSubfields({getFieldValues});
      return linkSubfields.length > 0 ? linkSubfields.concat({code: 'y', value: 'Linkki verkkoaineistoon'}) : [];
    }

    function generateLinkSubfields({getFieldValues}) {
      const urn = generateUrn({getFieldValues});
      const doi = generateU('dc.identifier.doi', {getFieldValues});
      const uri = generateU('dc.identifier.uri', {getFieldValues});

      if (urn.length > 0) {
        return urn;
      }

      return doi.concat(uri);

      // NB: URN needs to be in proper format (http|https://urn.fi/<value>) or otherwise it will not be used in subfield generation
      function generateUrn({getFieldValues}) {
        const values = getFieldValues('dc.identifier.urn');
        return values
          .filter(urnIsValid)
          .map(mapUrnValue)
          .map(v => ({code: 'u', value: v}));
      }

      function generateU(path, {getFieldValues}) {
        const values = getFieldValues(path);
        return values.filter(value => isValidLink(value)).map(value => ({code: 'u', value}));
      }
    }
  }

  function generateOtherUrnFields({getFieldValues}) {
    const urn = getFieldValues('dc.relation.urn');
    const firstUrnValue = urn.length > 0 ? urn[0] : null;
    const validUrn = urnIsValid(firstUrnValue);

    if (!firstUrnValue || !validUrn) {
      return [];
    }

    return [{tag: '856', ind1: '4', ind2: '2', subfields: [{code: 'u', value: mapUrnValue(firstUrnValue)}]}];
  }

  function urnIsValid(urn) {
    return (/https?:\/\/urn.fi\//u).test(urn) || (/^URN:/u).test(urn);
  }

  function mapUrnValue(urn) {
    return (/https?:\/\/urn.fi\//u).test(urn) ? urn : `http://urn.fi/${urn}`;
  }
}

/**
 * Generates field 884 ($a, $g, $k, $q, $5).
 * Field generation is based on hardcoded mapping which is read using harvestSource.
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
        {code: 'k', value: `${sourceConfig[harvestSource].f884}:${hash}`}, // NB: transform-level checks that key exists
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
