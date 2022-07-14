import {Error as NotSupportedError} from '@natlibfi/melinda-commons';

export function filterByIsbnIdentifier({getFieldValues}, options = {}) {
  if (!options.filterByIsbnIdentifier) {
    return;
  }

  const isbnIdentifier = getFieldValues('dc.identifier.isbn') || [];
  const {identifiers, title} = options;

  if (isbnIdentifier.length === 0) {
    throw new NotSupportedError(422, {identifiers, title}, 'Filter: Cannot find ISBN identifier which is a required field');
  }
}
