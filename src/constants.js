// NB: Source config is static and not to be read from env vars

const productionSources = {
  'julkaisut.valtioneuvosto.fi': {
    'fSID': 'valto',
    'f884': 'MELINDA_RECORD_IMPORT_REPO:VALTO'
  },
  'www.julkari.fi': {
    'fSID': 'julkari',
    'f884': 'MELINDA_RECORD_IMPORT_REPO:JULKARI'
  },
  'lutpub.lut.fi': {
    'fSID': 'lutpub',
    'f884': 'MELINDA_RECORD_IMPORT_REPO:LUTPUB'
  },
  'jukuri.luke.fi': {
    'fSID': 'jukuri',
    'f884': 'MELINDA_RECORD_IMPORT_REPO:JUKURI'
  }
}

const testSources = {
  'foobar.example.com': process.env.NODE_ENV === 'test' ? {'fSID': 'REPO_FOOBAR', 'f884': 'MELINDA_RECORD_IMPORT_REPO:FOOBAR'} : null,
  'foobar.example2.dev': process.env.NODE_ENV === 'test' ? {'fSID': 'REPO_FOOBAR2', 'f884': 'MELINDA_RECORD_IMPORT_REPO:FOOBAR'} : null,
};

export const sourceConfig = {
  ...productionSources,
  ...testSources
};

// This allows use of testSources in test environment but disables them in production
export const validHarvestSources = Object.keys(sourceConfig).filter(url => sourceConfig[url] !== null);
