import ConversionError from '../convert/conversionError.js';

/**
 * Filter filtering items based on issued year.
 * @param filterConfig Filter configuration
 * @returns Object containing filter and its name
 */
export function filterByIssuedYear({active = false, notBeforeYear = false, notAfterYear = false}) {
  if (active) {
    return {
      filter,
      name: 'filterByIssuedYear'
    };
  }
  return false;

  function filter({getFieldValues}, debugInfo = {}) {
    const filterBeforeMissing = !notBeforeYear || isNaN(notBeforeYear);
    const filterAfterMissing = !notAfterYear || isNaN(notAfterYear);
    const filterConfigMissing = filterBeforeMissing && filterAfterMissing;

    // NB: default value of zero is falsy
    if (filterConfigMissing) {
      return;
    }

    const values = getFieldValues('dc.date.issued');
    const issuedYears = values.map(v => v.length >= 4 ? Number(v.slice(0, 4)) : false);
    const {identifiers, title} = debugInfo;

    // Do not filter if there is no year information available
    if (issuedYears.length === 0) {
      return;
    }

    const useFilterBefore = !filterBeforeMissing;
    const useFilterAfter = !filterAfterMissing;

    const tooEarly = useFilterBefore && issuedYears.some(v => Number(v) < notBeforeYear);
    const tooLate = useFilterAfter && issuedYears.some(v => Number(v) > notAfterYear);

    if (tooEarly || tooLate) {
      throw new ConversionError({identifiers, title}, `Filter: Date issued information (${JSON.stringify(issuedYears)}) matches filter configuration (${notBeforeYear} < X < ${notAfterYear})`);
    }

    return;
  }
}
