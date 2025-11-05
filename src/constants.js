// NB: Source config is static and not to be read from env vars

const productionSources = {
  'julkaisut.valtioneuvosto.fi': {
    'fSID': {'10024': 'valto', '11111': 'valt2'},
    'f884': 'MELINDA_RECORD_IMPORT_REPO:VALTO'
  },
  'www.julkari.fi': {
    'fSID': {'10024': 'julkr', '11111': 'julk2'},
    'f884': 'MELINDA_RECORD_IMPORT_REPO:JULKARI'
  },
  'lutpub.lut.fi': {
    'fSID': {'10024': 'lutpb', '11111': 'lutp2'},
    'f884': 'MELINDA_RECORD_IMPORT_REPO:LUTPUB'
  },
  'jukuri.luke.fi': {
    'fSID': {'10024': 'jukur', '11111': 'juku2'},
    'f884': 'MELINDA_RECORD_IMPORT_REPO:JUKURI'
  }
};

const testSources = {
  'foobar.example.com': process.env.NODE_ENV === 'test' ? {'fSID': {'10024': 'fooba', '11111': 'foob2'}, 'f884': 'MELINDA_RECORD_IMPORT_REPO:FOOBAR'} : null,
  'foobar.example2.dev': process.env.NODE_ENV === 'test' ? {'fSID': {'10024': 'fooba', '11111': 'foob2'}, 'f884': 'MELINDA_RECORD_IMPORT_REPO:FOOBAR'} : null,
};

export const sourceConfig = {
  ...productionSources,
  ...testSources
};

// This allows use of testSources in test environment but disables them in production
export const validHarvestSources = Object.keys(sourceConfig).filter(url => sourceConfig[url] !== null);
