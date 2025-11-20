// NB: Source config is static and not to be read from env vars

const productionSources = {
  'julkaisut.valtioneuvosto.fi': {
    'filters': [
      {'type': 'isbn', 'active': true, 'reverse': false},
      {'type': 'issuedYear', 'active': true, 'notBeforeYear': '2016', 'notAfterYear': false},
      {'type': 'fileType', 'active': true},
      {'type': 'materialType', 'active': true}
    ],
    'fSID': {'10024': 'valto', '11111': 'valt2'},
    'f884': 'MELINDA_RECORD_IMPORT_REPO:VALTO'
  },
  'www.julkari.fi': {
    'filters': [
      {'type': 'isbn', 'active': true, 'reverse': false},
      {'type': 'issuedYear', 'active': true, 'notBeforeYear': '2016', 'notAfterYear': false},
      {'type': 'fileType', 'active': true},
      {'type': 'materialType', 'active': true}
    ],
    'fSID': {'10024': 'julkr', '11111': 'julk2'},
    'f884': 'MELINDA_RECORD_IMPORT_REPO:JULKARI'
  },
  'lutpub.lut.fi': {
    'filters': [
      {'type': 'isbn', 'active': true, 'reverse': false},
      {'type': 'issuedYear', 'active': true, 'notBeforeYear': false, 'notAfterYear': false},
      {'type': 'fileType', 'active': true},
      {'type': 'materialType', 'active': true}
    ],
    'fSID': {'10024': 'lutpb', '11111': 'lutp2'},
    'f884': 'MELINDA_RECORD_IMPORT_REPO:LUTPUB'
  },
  'jukuri.luke.fi': {
    'filters': [
      {'type': 'isbn', 'active': true, 'reverse': false},
      {'type': 'issuedYear', 'active': true, 'notBeforeYear': false, 'notAfterYear': false},
      {'type': 'fileType', 'active': true},
      {'type': 'materialType', 'active': true}
    ],
    'fSID': {'10024': 'jukur', '11111': 'juku2'},
    'f884': 'MELINDA_RECORD_IMPORT_REPO:JUKURI'
  }
};

const testSources = {
  'foobar.isbn.com': process.env.NODE_ENV === 'test' ? {
    'filters': [
      {'type': 'isbn', 'active': true, 'reverse': false}
    ],
    'fSID': {'10024': 'fooba', '11111': 'foob2'},
    'f884': 'MELINDA_RECORD_IMPORT_REPO:FOOBAR'
  } : null,
  'foobar.isbn2.com': process.env.NODE_ENV === 'test' ? {
    'filters': [
      {'type': 'isbn', 'active': true, 'reverse': true}
    ],
    'fSID': {'10024': 'fooba', '11111': 'foob2'},
    'f884': 'MELINDA_RECORD_IMPORT_REPO:FOOBAR'
  } : null,
  'foobar.fileType.com': process.env.NODE_ENV === 'test' ? {
    'filters': [
      {'type': 'fileType', 'active': true}
    ],
    'fSID': {'10024': 'fooba', '11111': 'foob2'},
    'f884': 'MELINDA_RECORD_IMPORT_REPO:FOOBAR'
  } : null,
  'foobar.issuedYear.com': process.env.NODE_ENV === 'test' ? {
    'filters': [
      {'type': 'issuedYear', 'active': true, 'notBeforeYear': '2024', 'notAfterYear': false}
    ],
    'fSID': {'10024': 'fooba', '11111': 'foob2'},
    'f884': 'MELINDA_RECORD_IMPORT_REPO:FOOBAR'
  } : null,
  'foobar.issuedYear2.com': process.env.NODE_ENV === 'test' ? {
    'filters': [
      {'type': 'issuedYear', 'active': true, 'notBeforeYear': false, 'notAfterYear': '2020'}
    ],
    'fSID': {'10024': 'fooba', '11111': 'foob2'},
    'f884': 'MELINDA_RECORD_IMPORT_REPO:FOOBAR'
  } : null,
  'foobar.issuedYear3.com': process.env.NODE_ENV === 'test' ? {
    'filters': [
      {'type': 'issuedYear', 'active': true, 'notBeforeYear': '2010', 'notAfterYear': '2020'}
    ],
    'fSID': {'10024': 'fooba', '11111': 'foob2'},
    'f884': 'MELINDA_RECORD_IMPORT_REPO:FOOBAR'
  } : null,
  'foobar.materialType.com': process.env.NODE_ENV === 'test' ? {
    'filters': [
      {'type': 'materialType', 'active': true}
    ],
    'fSID': {'10024': 'fooba', '11111': 'foob2'},
    'f884': 'MELINDA_RECORD_IMPORT_REPO:FOOBAR'
  } : null,
  'foobar.example.com': process.env.NODE_ENV === 'test' ? {
    'filters': [
      {'type': 'isbn', 'active': true, 'reverse': false},
      {'type': 'issuedYear', 'active': true, 'notBeforeYear': '2024', 'notAfterYear': false},
      {'type': 'fileType', 'active': true},
      {'type': 'materialType', 'active': true}
    ],
    'fSID': {'10024': 'fooba', '11111': 'foob2'},
    'f884': 'MELINDA_RECORD_IMPORT_REPO:FOOBAR'
  } : null,
  'foobar.example2.dev': process.env.NODE_ENV === 'test' ? {
    'filters': [
      {'type': 'isbn', 'active': false, 'reverse': false},
      {'type': 'issuedYear', 'active': true, 'notBeforeYear': false, 'notAfterYear': false},
      {'type': 'fileType', 'active': false},
      {'type': 'materialType', 'active': false}
    ],
    'fSID': {'10024': 'fooba', '11111': 'foob2'},
    'f884': 'MELINDA_RECORD_IMPORT_REPO:FOOBAR'
  } : null
};

export const sourceConfig = {
  ...productionSources,
  ...testSources
};

// This allows use of testSources in test environment but disables them in production
export const validHarvestSources = Object.keys(sourceConfig).filter(url => sourceConfig[url] !== null);
