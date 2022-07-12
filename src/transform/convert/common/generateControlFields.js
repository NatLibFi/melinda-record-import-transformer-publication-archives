import {formatLanguage} from '../util';

/**
 * Generates control field LDR
 * @returns Field LDR as string
 */
export function generateLDR() {
  return '00000nam a22000003i 4500';
}

/**
 * Generates control field 007
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
 * Generates control field 008
 * @param {Object} ValueInterface containing getFieldValues and getFields functions
 * @param {Object} moment Moment instance to be used for date generation
 * @returns Field 008 as string
 */
export function generate008({getFields, getFieldValues}, moment) {
  const timestamp = generateTimestamp();
  const date = generateDate();
  const country = generateCountry();
  const contentNature = generateNatureOfContent();
  const language = generateLanguage();

  return {
    tag: '008',
    value: `${timestamp}s${date}    ${country} |||||o${contentNature}|||| ||${language} c`
  };

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

  function generateLanguage() {
    const values = getFieldValues('dc.language.iso');
    return formatLanguage(values.slice(-1)[0]);
  }
}
