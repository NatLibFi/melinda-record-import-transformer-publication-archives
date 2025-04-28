import ConversionError from '../convert/conversionError';

/**
 * Filter filtering items based on issued year.
 * @param filterConfig Filter configuration
 * @returns Object containing filter and its name
 */
export function filterByIssuedYear(filterConfig) {
  const filterYearNotAfter = filterConfig?.filterByIssuedYear?.filterYearNotAfter;
  const filterYearNotBefore = filterConfig?.filterByIssuedYear?.filterYearNotBefore;

  return {
    filter,
    name: 'filterByIssuedYear'
  };

  function filter({getFieldValues}, debugInfo = {}) {
    const filterBeforeMissing = !filterYearNotBefore || isNaN(filterYearNotBefore);
    const filterAfterMissing = !filterYearNotAfter || isNaN(filterYearNotAfter);
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

    const tooEarly = useFilterBefore && issuedYears.some(v => Number(v) < filterYearNotBefore);
    const tooLate = useFilterAfter && issuedYears.some(v => Number(v) > filterYearNotAfter);

    if (tooEarly || tooLate) {
      throw new ConversionError({identifiers, title}, `Filter: Date issued information (${JSON.stringify(issuedYears)}) matches filter configuration (${filterYearNotBefore} < X < ${filterYearNotAfter})`);
    }

    return;
  }
}
