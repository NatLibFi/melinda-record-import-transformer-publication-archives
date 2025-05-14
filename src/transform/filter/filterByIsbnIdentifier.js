import ConversionError from '../convert/conversionError';

/**
 * Filter filtering items without isbn identifiers.
 * @returns Object containing filter and its name
 */
export function filterByIsbnIdentifier(filterConfig) {
  const reversed = filterConfig?.filterByIsbnIdentifier?.reverse;

  return {
    filter,
    name: 'filterByIsbnIdentifier'
  };

  function filter({getFieldValues}, debugInfo = {}) {
    const isbnIdentifier = getFieldValues('dc.identifier.isbn') || [];
    const {identifiers, title} = debugInfo;

    if (reversed && isbnIdentifier.length !== 0) {
      throw new ConversionError({identifiers, title}, 'Filter: Could find ISBN identifier which not allowed by the applied filter');
    }

    if (!reversed && isbnIdentifier.length === 0) {
      throw new ConversionError({identifiers, title}, 'Filter: Cannot find ISBN identifier which is a required field by the applied filter');
    }
  }
}
