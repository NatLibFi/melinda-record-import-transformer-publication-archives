import {seemsValidishIssn, parseIssnFromString} from '../util';

/**
 * Generates field 490 ($a, $v, $x) if subfields $a or $x can be generated.
 * Values creation is based on are found from dc.relation.ispartofseries,
 * dc.relation.numberofseries, dc.relation.numberinseries and dc.relation.issn.
 * @param {Object} ValueInterface containing getFieldValues function
 * @returns Empty array or array containing field 490 ($a, $v, $x)
 */
export function generate490({getFieldValues}) {
  const subfields = generateSubfields();

  if (subfields.length > 0) {
    return [
      {
        tag: '490',
        ind1: '0',
        ind2: ' ',
        subfields
      }
    ];
  }

  return [];


  function generateSubfields() {
    const subfieldV = generateSubfieldV();
    const subfieldX = generateSubfieldX(subfieldV.length > 0);
    const subfieldsXandV = [...subfieldX, ...subfieldV]; // NB: order is important ($x before $v)

    const subfieldA = generateSubfieldA(subfieldsXandV.length > 0);

    // Do not generate field if only subfield $v would be available
    const fieldShoudlBeGenerated = subfieldA.length > 0 || subfieldX.length > 0;
    return fieldShoudlBeGenerated ? subfieldA.concat(subfieldsXandV) : [];

    function generateSubfieldV() {
      return getFieldValues(p => ['dc.relation.numberinseries', 'dc.relation.numberofseries'].includes(p))
        .reduceRight((acc, value) => {
          if (acc.length === 0) {
            return acc.concat({code: 'v', value});
          }

          return acc.concat({code: 'v', value: `${value} ; `});
        }, [])
      // Reverse so that subfields with ';' separator are placed first
        .reduceRight((acc, v) => acc.concat(v), []);
    }

    function generateSubfieldX(hasSeriesNumber) {
      const issnEFieldValues = getFieldValues('dc.relation.issne').map(parseIssnFromString).filter(seemsValidishIssn);
      const eIssnFieldValues = getFieldValues('dc.relation.eissn').map(parseIssnFromString).filter(seemsValidishIssn);
      const eIssnFieldValues2 = getFieldValues('dc.identifier.eissn').map(parseIssnFromString).filter(seemsValidishIssn);

      const issnFieldValues = getFieldValues('dc.relation.issn').map(parseIssnFromString).filter(seemsValidishIssn);
      const issnFieldValues2 = getFieldValues('dc.identifier.issn').map(parseIssnFromString).filter(seemsValidishIssn);

      const issnLFieldValues = getFieldValues('dc.relation.issn-l').map(parseIssnFromString).filter(seemsValidishIssn);
      const issnLFieldValues2 = getFieldValues('dc.relation.issnl').map(parseIssnFromString).filter(seemsValidishIssn);
      const issnLFieldValues3 = getFieldValues('dc.identifier.issn-l').map(parseIssnFromString).filter(seemsValidishIssn);
      const issnLFieldValues4 = getFieldValues('dc.identifier.issnl').map(parseIssnFromString).filter(seemsValidishIssn);

      const issnValues = issnEFieldValues.concat(
        eIssnFieldValues, eIssnFieldValues2,
        issnFieldValues, issnFieldValues2,
        issnLFieldValues, issnLFieldValues2, issnLFieldValues3, issnLFieldValues4
      );

      return issnValues
        .reduceRight((acc, value) => {
          if (acc.length === 0) {
            return acc.concat({code: 'x', value: hasSeriesNumber ? `${value} ;` : value});
          }

          return acc.concat({code: 'x', value: `${value}, `});
        }, [])
      // Reverse so that subfields with ',' separator are placed first
        .reduceRight((acc, v) => acc.concat(v), []);
    }

    function generateSubfieldA(hasOtherSubfields) {
      const isPartOfJournalValues = getFieldValues('dc.relation.ispartofjournal');
      const isPartOfSeriesValues = getFieldValues('dc.relation.ispartofseries');

      const values = [...isPartOfJournalValues, ...isPartOfSeriesValues];

      return values
        .reduceRight(toSubfieldA, [])
        // Reverse so that subfields with ',' separator are placed first
        .reduceRight((acc, v) => acc.concat(v), []);

      function toSubfieldA(acc, value) {
        const subfieldValue = generateValue();
        return acc.concat({code: 'a', value: subfieldValue});

        function generateValue() {
          // NB: separator depends whether there are one or many subfield $a
          if (acc.length === 0) {
            return hasOtherSubfields ? `${value},` : value;
          }

          return `${value} `;
        }
      }
    }
  }
}
