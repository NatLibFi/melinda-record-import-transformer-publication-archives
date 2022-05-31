import {Error as NotSupportedError} from '@natlibfi/melinda-commons';

export function filterByMaterialType({getFieldValues}, options = {}) {
  if (!options.filterByMaterialType) {
    return;
  }

  const materialType = getFieldValues('dc.type.okm');

  if (materialType.length > 0) {
    if (materialType.some(isUnsupportedMaterialType)) {
      throw new NotSupportedError(422, 'Unprocessable entity', 'Filter: Conversion does not support the given type of material');
    }
  }

  function isUnsupportedMaterialType(mType) {
    return mType.match(/A3/ui) || mType.match(/B2/ui) || mType.match(/D2/ui);
  }
}
