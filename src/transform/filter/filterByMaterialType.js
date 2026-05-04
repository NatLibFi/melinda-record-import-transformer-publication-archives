import ConversionError from '../convert/conversionError.js';

/**
 * Filter filtering items based on material type (dc.type.okm).
 * @param {{ active?: boolean; }} options
 * @param {boolean} [options.active=true] Is filter active
 * @returns Object containing filter and its name
 */
export function filterByMaterialType({active = true}) {
  if (active) {
    return {
      filter: materialTypeFilter,
      name: 'filterByMaterialType'
    };
  }

  return false;
}

function materialTypeFilter({getFieldValues}, debugInfo = {}) {
  const unsupportedMaterialTypes = [
    'A1', 'A2', 'A3', 'A4',
    'B1', 'B2', 'B3',
    'D1', 'D2', 'D3',
    'E1',
    'F1', 'F2', 'F3',
    'G1', 'G2', 'G3',
    'H1', 'H2',
    'I1', 'I2'
  ];

  const {identifiers, title} = debugInfo;
  const materialTypes = getFieldValues('dc.type.okm');

  const isUnsupported = materialTypes.some(
    // Uses String.prototype.include instead of regex
    mt => unsupportedMaterialTypes.some(unsupportedType => mt.toLowerCase().includes(unsupportedType.toLowerCase()))
  );

  if (isUnsupported) {
    throw new ConversionError({identifiers, title}, `Filter: Conversion does not support the given type of material (${materialTypes})`);
  }

  return;
}
