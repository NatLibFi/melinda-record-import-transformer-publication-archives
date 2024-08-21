import ConversionError from '../convert/conversionError';

/**
 * Filter filtering items based on issued year.
 * @param filterConfig Filter configuration
 * @returns Object containing filter and its name
 */
export function filterByIssuedYear(filterConfig) {
  const filterYearNotBefore = filterConfig?.filterByIssuedYear?.filterYearNotBefore;

  return {
    filter,
    name: 'filterByIssuedYear'
  };

  function filter({getFieldValues}, debugInfo = {}) {
    // NB: default value of zero is falsy
    if (!filterYearNotBefore || isNaN(filterYearNotBefore)) {
      return;
    }

    const values = getFieldValues('dc.date.issued');
    const issuedYears = values.map(v => v.length >= 4 ? Number(v.slice(0, 4)) : false);
    const {identifiers, title} = debugInfo;

    if (issuedYears.length > 0 && issuedYears.some(v => Number(v) >= filterYearNotBefore)) {
      return;
    }

    throw new ConversionError({identifiers, title}, `Filter: Date issued information (${JSON.stringify(issuedYears)}) is older than required by filter configuration (${filterYearNotBefore})`);
  }
}
