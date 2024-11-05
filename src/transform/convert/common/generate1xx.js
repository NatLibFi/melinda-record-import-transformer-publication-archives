
/**
 * Generates field 100 or 700 ($a, $e) depending on author role
 * Creation is based on values from dc.contributor.author, dc.creator and dc.contributor.editor
 * @param {Object} ValueInterface containing getFieldValues function
 * @returns Empty array or array containing fields 100/700 ($a, $e)
 */
export function generate100and700({getFieldValues}) {
  const writers = generateWriters();
  const editors = generateEditors();

  return writers.concat(editors);

  function generateWriters() {
    const values = getFieldValues(p => [
      'dc.contributor.author',
      'dc.creator'
    ].includes(p));

    return values.map((v, index) => ({
      tag: index === 0 ? '100' : '700', ind1: '1', ind2: '',
      subfields: [
        {code: 'a', value: `${v},`},
        {code: 'e', value: 'kirjoittaja.'}
      ]
    }));
  }

  function generateEditors() {
    const values = getFieldValues('dc.contributor.editor');
    return values.map(v => ({
      tag: '700', ind1: '1', ind2: '',
      subfields: [
        {code: 'a', value: `${v},`},
        {code: 'e', value: 'toimittaja.'}
      ]
    }));
  }
}

export function generate110and710({getFieldValues}) {
  const groupAuthors = getFieldValues('dc.contributor.groupauthor');
  if (groupAuthors.length === 0) {
    return [];
  }

  const f100authors = getFieldValues(p => [
    'dc.contributor.author',
    'dc.creator'
  ].includes(p));


  if (f100authors.length === 0) {
    // Note: first of groupauthors goes to f110 and rest 710
    return groupAuthors.map((ga, idx) => ({
      tag: idx === 0 ? '110' : '710', ind1: '1', ind2: '',
      subfields: [{code: 'a', value: `${ga},`}, {code: 'e', value: 'kirjoittaja.'}]
    }));
  }

  // In case f100 is created, add all groupauthors to f710
  return groupAuthors.map(ga => ({
    tag: '710', ind1: '1', ind2: '',
    subfields: [{code: 'a', value: `${ga},`}, {code: 'e', value: 'kirjoittaja.'}]
  }));
}
