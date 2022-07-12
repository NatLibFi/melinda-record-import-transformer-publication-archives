/**
 * Generates field 490 ($a, $v, $x) if any of the subfields can be generated.
 * Values creation is based on are found from dc.relation.ispartofseries,
 * dc.relation.numberofseries, dc.relation.numberinseries and dc.relation.issn.
 * @param {Object} ValueInterface containing getFieldValues function
 * @returns Undefined or object containing field 490 ($a, $v, $x)
 */
export function generate490({getFieldValues}) {
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
