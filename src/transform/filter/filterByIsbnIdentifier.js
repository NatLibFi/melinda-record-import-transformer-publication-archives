import ConversionError from '../convert/conversionError.js';

/**
 * Filter filtering items without isbn identifiers.
 * @param {{ active?: boolean; reverse?: boolean;}} param0
 * @param {boolean} [param0.active=true] Is filter active
 * @param {boolean} [param0.reverse=false] Reverse operation of filter (Pass only recods whitout ISBN)
 * @returns Object containing filter and its name
 */
export function filterByIsbnIdentifier({active = true, reverse = false}) {
  if (active) {
    return {
      filter,
      name: 'filterByIsbnIdentifier'
    };
  }
  return false;

  function filter({getFieldValues}, debugInfo = {}) {
    // <kk:field schema="dc" element="identifier" qualifier="isbn" language="none" value="978-xxx-xxx-xxx-8" />
    const isbnIdentifier = getFieldValues('dc.identifier.isbn') || [];
    // <kk:field schema="dc" element="identifier" qualifier="urn" language="en" value="URN:978-xxx-xxx-xxx-8" />
    //const isbnUrnIdentifier = getFieldValues('dc.identifier.urn').filter(field => field.match(/URN:978-/ui) || field.match(/URN:ISBN:978-/ui)) || [];
    //const hasIdentifier = isbnIdentifier.length !== 0 || isbnUrnIdentifier.length !== 0;
    const hasIdentifier = isbnIdentifier.length !== 0;


    const {identifiers, title} = debugInfo;

    if (reverse && hasIdentifier) {
      throw new ConversionError({identifiers, title}, 'Filter: Could find ISBN identifier which not allowed by the applied filter');
    }

    if (!reverse && !hasIdentifier) {
      throw new ConversionError({identifiers, title}, 'Filter: Cannot find ISBN identifier which is a required field by the applied filter');
    }
  }
}
