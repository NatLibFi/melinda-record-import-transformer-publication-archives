import {Error as NotSupportedError} from '@natlibfi/melinda-commons';

/**
 * Filter filtering items without isbn identifiers.
 * @param {Object} ValueInterface containing getFieldValues function
 * @param {Object} options Options containing info whether filter should be used
 * @returns Error if ISBN could not be found from dc.identifier.isbn, otherwise undefined
 */
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
