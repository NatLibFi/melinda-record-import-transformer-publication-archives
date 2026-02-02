import {getSeriesIssn, getSeriesNumberInfo, getSeriesTitleInfo} from '../util/dc-record-utils.js';

/**
 * Generate f490 containing series information.
 * @param {import('../../../types.js').ValueInterface} valueInterface - valueInterface containing getFieldValues and getFields functions
 * @returns {import('../../../types.js').DataField[]}
 */
export function generate490(valueInterface) {
  const seriesTitleInfo = getSeriesTitleInfo(valueInterface);
  const seriesNumberInfo = getSeriesNumberInfo(valueInterface);
  const seriesIssn = getSeriesIssn(valueInterface);

  const hasTitlesOrIssn = seriesTitleInfo.length > 0 || seriesIssn.length > 0;
  if (!hasTitlesOrIssn) {
    return [];
  }

  // Loop through series titles to construct resulting datafields
  // Expect series information ordering be unified between different DC fields
  const resultFields = [];
  const maxSeriesTitleIdx = seriesTitleInfo.length - 1;

  for (let i = 0; i < seriesTitleInfo.length; i++) {
    const {seriesTitle, seriesNumber: seriesTitleNumber} = seriesTitleInfo[i];

    const associatedSeriesNumbers = getSeriesAssociations(seriesNumberInfo, i, maxSeriesTitleIdx);
    const associatedIssn = getSeriesAssociations(seriesIssn, i, maxSeriesTitleIdx);

    // Construct $v by utilizing only number from title
    const subfieldVValue = seriesTitleNumber || associatedSeriesNumbers.join(' ; ');
    const subfieldV = !subfieldVValue ? [] : [{code: 'v', value: subfieldVValue}];

    // Construct $x. Use all ISSN that were observed to be associated with the given serial title.
    const subfieldsX = associatedIssn.map((issn, idx, originalArray) => {
      const isLastIssn = idx === originalArray.length - 1;
      const multipleIssn = originalArray.length > 0;

      // Separate multiple $x with ', '
      if (!isLastIssn && multipleIssn) {
        return {code: 'x', value: `${issn},`};
      }

      // Separate last $x from $v with ' ;'
      if (isLastIssn && !!subfieldVValue) {
        return {code: 'x', value: `${issn} ;`};
      }

      return {code: 'x', value: `${issn}`};
    });

    // Construct $a. Punctuation is ', ' if $x or $v is available, otherwise there is no ending punctuation
    const subfieldAPunctuation = !!subfieldVValue || subfieldsX.length > 0 ? ',' : '';
    const subfieldA = {code: 'a', value: `${seriesTitle}${subfieldAPunctuation}`};

    resultFields.push({
      tag: '490',
      ind1: '0',
      subfields: [
        subfieldA,
        ...subfieldsX,
        ...subfieldV
      ]
    });
  }

  // In case no title information was not available, construct fields with only $x using issn information
  const noTitleInformation = seriesTitleInfo.length === 0;
  const hasIssnInfo = seriesIssn.length > 0;

  if (noTitleInformation && hasIssnInfo) {
    const issnOnlyFields = seriesIssn.map(issn => ({
      tag: '490',
      ind1: '0',
      subfields: [{code: 'x', value: issn}]
    }));

    return issnOnlyFields;
  }

  return resultFields;

  /**
   * Helper function to get information associated with series title.
   * Created to help with edge cases where there might be more series number or ISSN information
   * than there are information about series titles.
   * @param {string[]} associationArray - array containing associative elements
   * @param {number} currentIdx - index currently within the generative loop
   * @param {number} maxSeriesTitleIdx - max index of generative loop
   * @returns {string[]} elements that should be associated with the title in given loop index
   */
  function getSeriesAssociations(associationArray, currentIdx, maxSeriesTitleIdx) {
    // Edge case: no associations
    if (associationArray.length === 0) {
      return [];
    }

    // Edge case: If current idx is max idx, return every entry from associationArray from that idx onwards
    const isLastEntry = currentIdx === maxSeriesTitleIdx;
    if (isLastEntry) {
      return associationArray.slice(currentIdx);
    }

    return [associationArray[currentIdx]];
  }
}
