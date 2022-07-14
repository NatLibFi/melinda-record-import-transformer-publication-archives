import {Error as NotSupportedError} from '@natlibfi/melinda-commons';

export function filterByIssuedYear({getFieldValues}, options = {}) {
  if (!options.filterByIssuedYear || options.filterByIssuedYear === 0) {
    return;
  }

  const values = getFieldValues('dc.date.issued');
  const issuedYears = values.map(v => v.length >= 4 ? Number(v.slice(0, 4)) : false);
  const {identifiers, title} = options;

  if (issuedYears.length > 0 && issuedYears.some(v => Number(v) >= options.filterByIssuedYear)) {
    return;
  }

  throw new NotSupportedError(422, {identifiers, title}, 'Filter: Date issued is older than required by filter configuration');
}
