import {getAllValuesInContext} from '../convert/util/index.js';
import ConversionError from '../convert/conversionError.js';

/**
 * Filter filtering items that do not have filetype information included to their metadata.
 * @returns Object containing filter and its name
 */
export function filterByFileType({active = true}) {
  if (active) {
    return {
      filter,
      name: 'filterByFileType'
    };
  }
  return false;

  function filter(record, debugInfo = {}) {
    const filetypeInformation = getAllValuesInContext(record, 'kk:file');

    if (filetypeInformation.length === 0) {
      const {identifiers, title} = debugInfo;
      throw new ConversionError({identifiers, title}, 'Filter: Conversion without file type specification is not supported');
    }

    return;
  }
}
