import {getAllValuesInContext} from '../convert/util';
import ConversionError from '../convert/conversionError';

/**
 * Filter filtering items that do not have filetype information included to their metadata.
 * @returns Object containing filter and its name
 */
export function filterByFileType() {
  return {
    filter,
    name: 'filterByFileType'
  };

  function filter(record, debugInfo = {}) {
    const filetypeInformation = getAllValuesInContext(record, 'kk:file');

    if (filetypeInformation.length === 0) {
      const {identifiers, title} = debugInfo;
      throw new ConversionError({identifiers, title}, 'Filter: Conversion without file type specification is not supported');
    }

    return;
  }
}
