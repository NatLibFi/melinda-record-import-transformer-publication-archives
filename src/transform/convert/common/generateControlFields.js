/**
 * Generates static control field LDR
 * @returns Field LDR as string
 */
export function generateLDR() {
  return '00000nam a22000002i 4500';
}

/**
 * Generates static control field 007
 * @returns Field 007 as string
 */
export function generate007() {
  return [
    {
      tag: '007', value: 'cr |||||||||||'
    }
  ];
}

/**
 * Generates control field 008 based on the current date and following record values:
 * - dc.date.issued
 * - dc.publisher.country
 * - dc.type.ontasot
 * - dc.language.iso
 * @param {Object} ValueInterface containing getFieldValues and getFields functions
 * @param {string|null} language language of item
 * @param {Object} moment Moment instance to be used for date generation
 * @returns Field 008 as string
 */
export function generate008({getFields, getFieldValues}, language, moment) {
  const timestamp = generateTimestamp();
  const date = generateDate();
  const country = generateCountry();
  const contentNature = generateNatureOfContent();
  const lng = language || '|||';

  return [
    {
      tag: '008',
      value: `${timestamp}s${date}    ${country} |||||o${contentNature}|||| ||${lng} c`
    }
  ];

  function generateTimestamp() {
    return moment().format('YYMMDD');
  }

  function generateDate() {
    const values = getFieldValues('dc.date.issued');
    return values.length > 0 ? values[0].slice(0, 4) : '||||';
  }

  function generateCountry() {
    const values = getFieldValues('dc.publisher.country');
    return values.length > 0 ? values[0].slice(0, 2).toLowerCase() : 'fi';
  }

  function generateNatureOfContent() {
    const levels = getFields('dc.type.ontasot');
    return levels.length > 0 ? 'm   ' : '||||';
  }
}
