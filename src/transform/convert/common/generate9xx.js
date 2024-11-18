/**
 * Generates 946 field. Field contains DC title in its original form.
 * @param {Object} valueInterface ValueInterface containing getFields function
 * @returns Empty array or array containing field 946 ($a, $b: optional, $5)
 */
export function generate946({getFields}) {

  /*
  Generates field only if: TitleType = 00 or 01

  Onix Code Lists: List 15: Title type code
  00 | <Description>
  01 | Distinctive title (book); Cover title (serial); Title on item (serial content item or reviewed resource)
  */

  const fields = getFields('dc.title');
  if (fields.length === 0) {
    return [];
  }

  const titleText = fields.length > 0 ? fields[0].$.value : null;
  if (!titleText) {
    return [];
  }

  return [{tag: '946', ind1: ' ', ind2: ' ', subfields: [{code: 'i', value: 'Nimeke Dublin Coressa:'}, {code: 'a', value: titleText}, {code: '5', value: 'MELINDA'}]}];
}
