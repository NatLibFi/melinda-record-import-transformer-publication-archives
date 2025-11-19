import ConversionError from '../convert/conversionError.js';

/**
 * Filter filtering items based on material type (dc.type.okm).
 * @returns Object containing filter and its name
 */
export function filterByMaterialType({active = true}) {
  if (active) {
    return {
      filter,
      name: 'filterByMaterialType'
    };
  }
  return false;

  function filter({getFieldValues}, debugInfo = {}) {
    const materialTypes = getFieldValues('dc.type.okm');

    const {identifiers, title} = debugInfo;

    if (materialTypes.length > 0) {
      if (materialTypes.some(isUnsupportedMaterialType)) {
        throw new ConversionError({identifiers, title}, `Filter: Conversion does not support the given type of material (${materialTypes})`);
      }
    }
  }

  function isUnsupportedMaterialType(mType) {
    return mType.match(/A3/ui) || mType.match(/B2/ui) || mType.match(/D2/ui);
  }
}
