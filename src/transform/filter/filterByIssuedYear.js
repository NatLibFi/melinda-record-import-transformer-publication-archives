import {Error as NotSupportedError} from '@natlibfi/melinda-commons';

/**
 * Filter filtering items based on issued year.
 * @param {Object} ValueInterface containing getFieldValues function
 * @param {Object} options Options containing info whether filter should be used
 * @returns Error if record was issued earlier than what defined in configuration, otherwise undefined
 */
export function filterByIssuedYear({getFieldValues}, options = {}) {
  if (!options.filterByIssuedYear || options.filterByIssuedYear === 0) {
    return;
  }

  const values = getFieldValues('dc.date.issued');
  const issuedYears = values.map(v => v.length >= 4 ? Number(v.slice(0, 4)) : false);

  if (issuedYears.length > 0 && issuedYears.some(v => Number(v) >= options.filterByIssuedYear)) {
    return;
  }

  throw new NotSupportedError(422, 'Unprocessable entity', 'Filter: Date issued is older than required by filter configuration');
}
