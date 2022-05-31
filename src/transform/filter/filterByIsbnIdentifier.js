import {Error as NotSupportedError} from '@natlibfi/melinda-commons';

export function filterByIsbnIdentifier({getFieldValues}, options = {}) {
  if (!options.filterByIsbnIdentifier) {
    return;
  }

  const isbnIdentifier = getFieldValues('dc.identifier.isbn') || [];

  if (isbnIdentifier.length === 0) {
    throw new NotSupportedError(422, 'Unprocessable entity', 'Filter: Cannot find ISBN identifier which is a required field');
  }
}
