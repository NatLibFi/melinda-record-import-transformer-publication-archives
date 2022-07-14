import {Error as NotSupportedError} from '@natlibfi/melinda-commons';
import {getFileTypesInformation} from '../convert/util';

/**
 * Filter filtering items that do not have filetype information included to their metadata.
 * @param {Object} record Record object parsed using XML parser
 * @param {Object} options Options containing info whether filter should be used
 * @returns Error if filetype information cannot be found, otherwise found values
 */
export function filterByFileType(record, options = {}) {
  if (!options.filterByFileType) {
    return;
  }

  const values = getFileTypesInformation(record) || false;
  const {identifiers, title} = options;

  if (!values || values.length === 0) {
    throw new NotSupportedError(422, {identifiers, title}, 'Filter: Conversion without file type specification is not supported');
  }

  return values;
}
