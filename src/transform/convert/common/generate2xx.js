/**
 * Generates field 245 ($a) based on first dc.title value
 * @param {Object} ValueInterface containing getFields and getFieldValues functions
 * @returns Empty array or array containing field 245 ($a)
 */
export function generate245({getFields, getFieldValues}) {
  const isAddedEntry = generateIsAddedEntry();
  const [title] = getFieldValues('dc.title');

  return title ? [
    {
      tag: '245',
      ind1: isAddedEntry ? '1' : '0',
      ind2: '0',
      subfields: [{code: 'a', value: `${title}.`}]
    }
  ] : [];

  function generateIsAddedEntry() {
    const fields = getFields(p => [
      'dc.contributor.author',
      'dc.creator'
    ].includes(p));

    return fields.length > 0;
  }
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
    subfields: [{code: 'a', value}]
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

export function generate264({getFieldValues}) {
  const subfields = generateSubfields();

  if (subfields.length > 0) {
    return [
      {
        tag: '264', ind1: '', ind2: '1', subfields
      }
    ];
  }

  return [];


  function generateSubfields() {
    const subfieldC = generateSubfieldC();
    const subfieldB = generateSubfieldB(subfieldC.length > 0);
    const subfieldA = generateSubfieldA(subfieldB.length > 0, subfieldC.lenth > 0);

    return subfieldA.concat(subfieldB, subfieldC);

    function generateSubfieldA(hasSubfieldB, hasSubfieldC) {
      const fieldSeparator = hasSubfieldB || hasSubfieldC ? ':' : '';

      const dcPublisherPlaceValues = getFieldValues('dc.publisher.place');
      const dcPublisherCityOfPublicationValues = getFieldValues('dc.publisher.x-cityofpublication');

      const values = dcPublisherPlaceValues.length > 0 ? dcPublisherPlaceValues : dcPublisherCityOfPublicationValues;
      return values.length > 0 ? [{code: 'a', value: `${values[0]}${fieldSeparator}`}] : [];
    }

    function generateSubfieldB(hasSubfieldC) {
      const fieldSeparator = hasSubfieldC ? ',' : '';
      const values = getFieldValues('dc.publisher');
      return values.length > 0 ? [{code: 'b', value: `${values[0]}${fieldSeparator}`}] : [];
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
