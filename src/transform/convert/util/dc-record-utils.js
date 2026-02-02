import {deduplicateObjects, deduplicatePrimitives} from "./generic-utils.js";

/**
 * Get DC record series name information
 * @param {import('../../../types.js').ValueInterface} valueInterface - valueInterface containing getFieldValues and getFields functions
 * @returns {{seriesTitle: string, seriesNumber: string|null}[]} array containing DC record seriers names and series number is found from title
 */
export function getSeriesTitleInfo(valueInterface) {
  const isPartOfJournalValues = valueInterface.getFieldValues('dc.relation.ispartofjournal');
  const isPartOfSeriesValues = valueInterface.getFieldValues('dc.relation.ispartofseries');

  const seriesNames = isPartOfJournalValues.concat(isPartOfSeriesValues);
  const seriesNamesInfo = seriesNames.map(extractSeriesNumber);

  return deduplicateObjects(seriesNamesInfo, 'seriesTitle');
}

/**
 * Get DC record series number information
 * @param {import('../../../types.js').ValueInterface} valueInterface - valueInterface containing getFieldValues and getFields functions
 * @returns {string[]} array containing DC record seriers names
 */
export function getSeriesNumberInfo(valueInterface) {
  const numberInSeries = valueInterface.getFieldValues('dc.relation.numberinseries');
  const numberOfSeries = valueInterface.getFieldValues('dc.relation.numberofseries');

  const seriesNumberInfo = numberInSeries.concat(numberOfSeries);
  return deduplicatePrimitives(seriesNumberInfo);
}

/**
 * Get DC record series issn information
 * @param {import('../../../types.js').ValueInterface} valueInterface - valueInterface containing getFieldValues and getFields functions
 * @returns {string[]} array containing DC record seriers names
 */
export function getSeriesIssn(valueInterface) {
  const issnFields = [
    'dc.relation.issn',
    'dc.relation.issne',
    'dc.relation.eissn',
    'dc.relation.issnl',
    'dc.relation.issn-l',
    'dc.identifier.issn',
    'dc.identifier.eissn',
    'dc.identifier.issnl',
    'dc.identifier.issn-l',
  ];

  const fieldValues = issnFields
    .map(valueInterface.getFieldValues)
    .flat()
    .map(parseIssnFromString)
    .filter(v => v !== null);

  return deduplicatePrimitives(fieldValues);
}

/**
 * Extract series number from series title if it can be identified.
 * @param {string} seriesTitle - series title
 * @returns {{seriesTitle: string, seriesNumber: string|null}}
 */
export function extractSeriesNumber(seriesTitle) {
  const serialTitleRegex = [
    new RegExp(/\s(\d{1,2}_)?\d{1,2}(\s|-|\/)\d{4}$/u),
    new RegExp(/\s\d{4}(\s|-)\d{1,2}(_\d{1,2})?[^\d]*$/u),
  ];

  const splitRegex = serialTitleRegex.find(regex => regex.test(seriesTitle));
  if (!splitRegex) {
    return {seriesTitle, seriesNumber: null};
  }

  const [seriesNumber] = splitRegex.exec(seriesTitle);
  const seriesTitleWithoutNumber = seriesTitle.replace(seriesNumber, '');

  return {
    seriesTitle: seriesTitleWithoutNumber.trim(),
    seriesNumber: seriesNumber.trim()
  };
}

/**
 * Parse ISSN value from string that may contain such value
 * @param {string} issnString - value where ISSN might be observed
 * @returns {string|null} string containing what might be valid ISSN if observed within string given as parameter, otherwise null
 */
export function parseIssnFromString(issnString) {
  const issnRegex = /\d{4}-\d{3}[0-9xX]{1}/u;
  const containsIssn = issnRegex.test(issnString);

  if (!containsIssn) {
    return null;
  }

  const [result] = issnString.match(issnRegex);
  return result;
}
