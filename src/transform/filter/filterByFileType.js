import {Error as NotSupportedError} from '@natlibfi/melinda-commons';
import {getFileTypesInformation} from '../common';

export function filterByFileType(record, options = {}) {
  if (!options.filterByFileType) {
    return;
  }

  const values = getFileTypesInformation(record) || false;

  if (!values || values.length === 0) {
    throw new NotSupportedError(422, 'Unprocessable entity', 'Filter: Conversion without file type specification is not supported');
  }

  return values;
}
