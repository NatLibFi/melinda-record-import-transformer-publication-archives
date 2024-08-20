import {Error as NotSupportedError} from '@natlibfi/melinda-commons';

import {filterConfig} from '../../config';

/**
 * Filter filtering items based on issued year.
 * @returns Object containing filter and its name
 */
export function filterByIssuedYear() {
  return {
    filter,
    name: 'filterByIssuedYear'
  };

  function filter({getFieldValues}, debugInfo = {}) {
    const {filterByIssuedYear: {filterYearNotBefore}} = filterConfig;

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

    throw new NotSupportedError(422, {identifiers, title}, `Filter: Date issued information (${JSON.stringify(issuedYears)}) is older than required by filter configuration (${filterYearNotBefore})`);
  }
}
