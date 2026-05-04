import {getContributors, getRecordTitle, translateIso6931Lang} from '../../record-utils.js';
import {capitalizeValue} from '../util/index.js';

/**
 * Generates f240 based on first dc.title value if main
 * @param {Object} valueInterface containing getFields and getFieldValues functions
 * @returns Empty array or array containing field 245 ($a)
 */
export function generate240(valueInterface) {
  const {mainAuthor} = getContributors(valueInterface);
  const {title} = getRecordTitle(valueInterface);

  if (!mainAuthor || !title) {
    return [];
  }

  const subfields = [{code: 'a', value: `${title}.`}];

  // If language is available, add it to $l
  const [language] = valueInterface.getFieldValues('dc.language.iso');
  const translatedLanguage = language ? translateIso6931Lang(language) : null;

  if (translatedLanguage) {
    subfields.push({code: 'l', value: translatedLanguage});
  }

  return [
    {
      tag: '240',
      ind1: '1',
      ind2: '0', // ind2 properly generated in validation phase by marc-record-validators-melinda:IndicatorFixes,
      subfields
    }
  ];
}

/**
 * Generates field 245 ($a) based on first dc.title value
 * @param {Object} valueInterface containing getFields and getFieldValues functions
 * @returns Empty array or array containing field 245 ($a)
 */
export function generate245(valueInterface) {
  const {mainAuthor} = getContributors(valueInterface);

  const ind1 = mainAuthor !== null ? '1' : '0';
  const ind2 = '0'; // Note ind2 is properly generated in validation phase by marc-record-validators-melinda:IndicatorFixes

  const {title, subtitle} = getRecordTitle(valueInterface);

  if (!title) {
    return [];
  }

  return subtitle
    ? [{tag: '245', ind1, ind2, subfields: [{code: 'a', value: `${title} :`}, {code: 'b', value: `${subtitle}.`}]}]
    : [{tag: '245', ind1, ind2, subfields: [{code: 'a', value: `${title}.`}]}];
}

/**
 * Generates field 246 ($a) based on dc.title.alternative values.
 * @param {Object} ValueInterface containing getFieldValues function
 * @returns Empty array or array containing field 245 ($a)
 */
export function generate246({getFieldValues}) {
  const values = getFieldValues('dc.title.alternative');
  return values.map(value => ({
    tag: '246', ind1: '1', ind2: '3',
    subfields: [{code: 'a', value: value}]
  }));
}

/**
 * Generates field 250 ($a) based on dc.description.edition values.
 * @param {Object} ValueInterface containing getFieldValues function
 * @returns Empty array or array containing field 250 ($a)
 */
export function generate250({getFieldValues}) {
  const values = getFieldValues('dc.description.edition');
  return values.map(value => ({
    tag: '250', ind1: '', ind2: '',
    subfields: [{code: 'a', value}]
  }));
}

/**
 * Generates field 264 if any of subfields can be created ($a: optional, $b: optional, $c: optional)
 * Values used for generation are based on dc.publisher.place, dc.publisher and dc.date.issued.
 * @param {Object} ValueInterface containing getFieldValues function
 * @returns Empty array or array containing field 264 ($a, $b, $c)
 */

export function generate264({getFields, getFieldValues}, titleLanguage) {
  const subfields = generateSubfields(titleLanguage);

  if (subfields.length > 0) {
    return [
      {
        tag: '264', ind1: '', ind2: '1', subfields
      }
    ];
  }

  return [];


  function generateSubfields(titleLanguage) {
    const subfieldC = generateSubfieldC();
    const subfieldB = generateSubfieldB(subfieldC.length > 0, titleLanguage);
    const subfieldA = generateSubfieldA(subfieldB.length > 0, subfieldC.length > 0);

    return subfieldA.concat(subfieldB, subfieldC);

    function generateSubfieldA(hasSubfieldB, hasSubfieldC) {
      const fieldSeparator = hasSubfieldB || hasSubfieldC ? ':' : '';

      const dcPublisherPlaceValues = getFieldValues('dc.publisher.place');
      const dcPublisherCityOfPublicationValues = getFieldValues('dc.publisher.x-cityofpublication');

      const values = dcPublisherPlaceValues.length > 0 ? dcPublisherPlaceValues : dcPublisherCityOfPublicationValues;
      return values.length > 0 ? [{code: 'a', value: `${values[0]}${fieldSeparator}`}] : [];
    }

    function generateSubfieldB(hasSubfieldC, titleLanguage) {
      const fieldSeparator = hasSubfieldC ? ',' : '';

      const fields = getFields('dc.publisher');

      if (fields.length === 0) {
        return [];
      }

      const languageVersionValue = titleLanguage ? fields.find(f => f.$.language === titleLanguage) : false;
      const fieldValue = languageVersionValue ? languageVersionValue.$.value : fields[0].$.value;
      const capitalizedFieldValue = capitalizeValue(fieldValue);

      if (!capitalizedFieldValue) {
        return [];
      }

      return [{code: 'b', value: `${capitalizedFieldValue}${fieldSeparator}`}];
    }


    /**
     * Generates f264 $c from first encountered dc.date.issued that is in format of one of following:
     * - YYYY
     * - YYYY-MM
     * - YYYY-MM-DD
     */
    function generateSubfieldC() {
      const dcValues = getFieldValues('dc.date.issued');
      const validValues = dcValues.map(getYear).filter(v => v !== null);

      return validValues.length > 0 ? [{code: 'c', value: `${validValues[0]}.`}] : [];


      function getYear(v) {
        const valueIsValid = (/^\d{4}(-\d\d){0,2}$/u).test(v);
        if (!valueIsValid) {
          return null;
        }

        return v.slice(0, 4);
      }
    }
  }
}
