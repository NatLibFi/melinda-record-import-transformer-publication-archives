import {capitalizeValue} from '../util';

/**
 * Generates field 245 ($a) based on first dc.title value
 * @param {Object} ValueInterface containing getFields and getFieldValues functions
 * @returns Empty array or array containing field 245 ($a)
 */
export function generate245({getFields}) {
  const isAddedEntry = generateIsAddedEntry();
  const ind1 = isAddedEntry ? '1' : '0';
  const ind2 = ' '; // NB: generated in validation phase by marc-record-validators-melinda:IndicatorFixes

  const fields = getFields('dc.title');
  if (fields.length === 0) {
    return [];
  }

  const titleText = fields.length > 0 ? fields[0].$.value : null;

  const {title, alternativeSubtitle} = getTitle(titleText);

  return alternativeSubtitle
    ? [{tag: '245', ind1, ind2, subfields: [{code: 'a', value: `${title} :`}, {code: 'b', value: `${alternativeSubtitle}.`}]}]
    : [{tag: '245', ind1, ind2, subfields: [{code: 'a', value: `${title}.`}]}];


  function generateIsAddedEntry() {
    const fields = getFields(p => [
      'dc.contributor.author',
      'dc.creator'
    ].includes(p));

    return fields.length > 0;
  }

  // Splits title to title+subtitle if title contains any of patterns that require this type of processing.
  // Note: this getter is same as one defined within ONIX-transformer
  function getTitle(titleText) {
    const regexObj = findRegex(titleText);
    const result = regexObj ? regexObj.regex.exec(titleText) : undefined;

    if (!result) {
      return {title: titleText.trimEnd(), alternativeSubtitle: undefined};
    }

    const titleResult = regexObj.keepResult === true ? {
      title: (titleText.slice(0, result.index + regexObj.keepCharactersFromStart) + result).trimEnd(),
      alternativeSubtitle: titleText.slice(result.index + result[0].length - regexObj.keepCharactersFromEnd).trimEnd().trimStart()
    }
      : {
        title: titleText.slice(0, result.index + regexObj.keepCharactersFromStart).trimEnd(),
        alternativeSubtitle: titleText.slice(result.index + result[0].length - regexObj.keepCharactersFromEnd).trimEnd().trimStart()
      };

    return titleResult;

    function findRegex(titleText) {
      // Note: order defines priority
      const pluralOfRegex = [
        // split title to mainTitle and subtitle at first '.', do not keep '.'
        {keepCharactersFromStart: 0, keepCharactersFromEnd: 0, regex: /\.\s+/u},
        // split title to mainTitle and subtitle at first ':', do not keep ':'
        {keepCharactersFromStart: 0, keepCharactersFromEnd: 0, regex: /:\s+/u},
        // split title to mainTitle and subtitle at first ' - ', do not keep the separator
        {keepCharactersFromStart: 1, keepCharactersFromEnd: 1, regex: /[^0-9]\s+[\u2013\u2014-]\s+[^0-9]/u},
        // split title to mainTitle and subtitle at '! ' or '? ', keep question and exclamation marks, they are part of the title
        {keepCharactersFromStart: 0, keepCharactersFromEnd: 0, keepResult: true, regex: /!+|\?+/u}
      ];

      return pluralOfRegex.find(({regex}) => regex.test(titleText));
    }
  }
}

/**
 * Generates field 246 ($a) based on dc.title.alternative values.
 * @param {Object} ValueInterface containing getFieldValues function
 * @returns Empty array or array containing field 245 ($a)
 */
export function generate246({getFieldValues}) {
  const values = getFieldValues('dc.title.alternative');
  return values.length > 0 ? [
    {
      tag: '246', ind1: '1', ind2: '3',
      subfields: [{code: 'a', value: values[0]}]
    }
  ] : [];
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
    const subfieldA = generateSubfieldA(subfieldB.length > 0, subfieldC.lenth > 0);

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
        const validFormats = [
          /^\d{4}-\d{2}-\d{2}$/u,
          /^\d{4}-\d{2}$/u,
          /^\d{4}$/u
        ];

        const valueIsValid = validFormats.some(re => re.test(v));
        if (!valueIsValid) {
          return null;
        }

        return v.slice(0, 4);
      }
    }
  }
}
