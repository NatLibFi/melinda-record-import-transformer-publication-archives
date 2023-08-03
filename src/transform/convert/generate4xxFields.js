/**
*
* @licstart  The following is the entire license notice for the JavaScript code in this file.
*
* Publication archives record transformer for the Melinda record batch import system
*
* Copyright (C) 2019-2021 University Of Helsinki (The National Library Of Finland)
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
