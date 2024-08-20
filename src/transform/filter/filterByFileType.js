import {Error as NotSupportedError} from '@natlibfi/melinda-commons';
import {getAllValuesInContext} from '../utils';

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
      throw new NotSupportedError(422, {identifiers, title}, 'Filter: Conversion without file type specification is not supported');
    }

    return;
  }
}
