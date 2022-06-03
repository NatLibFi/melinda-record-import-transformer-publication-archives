export function generateStaticFields() {
  return [
    {
      tag: '007', value: 'cr |||||||||||'
    },
    {
      tag: 'LOW', ind1: '', ind2: '',
      subfields: [{code: 'a', value: 'FIKKA'}]
    },
    {
      tag: '040', ind1: '', ind2: '',
      subfields: [
        {code: 'b', value: 'fin'},
        {code: 'e', value: 'rda'},
        {code: 'd', value: 'FI-NL'}
      ]
    },
    {
      tag: '042', ind1: '', ind2: '',
      subfields: [{code: 'a', value: 'finb'}]
    },
    {
      tag: '336', ind1: '', ind2: '',
      subfields: [
        {code: 'a', value: 'teksti'},
        {code: 'b', value: 'txt'},
        {code: '2', value: 'rdacontent'}
      ]
    },
    {
      tag: '337', ind1: '', ind2: '',
      subfields: [
        {code: 'a', value: 'tietokonekäyttöinen'},
        {code: 'b', value: 'c'},
        {code: '2', value: 'rdamedia'}
      ]
    },
    {
      tag: '338', ind1: '', ind2: '',
      subfields: [
        {code: 'a', value: 'verkkoaineisto'},
        {code: 'b', value: 'cr'},
        {code: '2', value: 'rdacarrier'}
      ]
    },
    {
      tag: '594',
      subfields: [
        {code: 'a', value: 'Koneellisesti tuotettu tietue'},
        {code: '5', value: 'FENNI'}
      ]
    }
  ];
}

