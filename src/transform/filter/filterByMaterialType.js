import {Error as NotSupportedError} from '@natlibfi/melinda-commons';

/**
 * Filter filtering items based on material type (dc.type.okm).
 * @returns Object containing filter and its name
 */
export function filterByMaterialType() {
  return {
    filter,
    name: 'filterByMaterialType'
  };

  function filter({getFieldValues}, debugInfo = {}) {
    const materialType = getFieldValues('dc.type.okm');
    const {identifiers, title} = debugInfo;

    if (materialType.length > 0) {
      if (materialType.some(isUnsupportedMaterialType)) {
        throw new NotSupportedError(422, {identifiers, title}, `Filter: Conversion does not support the given type of material (${materialType})`);
      }
    }
  }

  function isUnsupportedMaterialType(mType) {
    return mType.match(/A3/ui) || mType.match(/B2/ui) || mType.match(/D2/ui);
  }
}
