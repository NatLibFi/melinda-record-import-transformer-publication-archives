// NB: Source config is static and not to be read from env vars

const productionSources = {
  'julkaisut.valtioneuvosto.fi': {
    'fSID': {handle: 'valto', uuid: 'valt2'},
    'f884': 'MELINDA_RECORD_IMPORT_REPO:VALTO'
  },
  'www.julkari.fi': {
    'fSID': {handle: 'julkr', uuid: 'julk2'},
    'f884': 'MELINDA_RECORD_IMPORT_REPO:JULKARI'
  },
  'lutpub.lut.fi': {
    'fSID': {handle: 'lutpb', uuid: 'lutp2'},
    'f884': 'MELINDA_RECORD_IMPORT_REPO:LUTPUB'
  },
  'jukuri.luke.fi': {
    'fSID': {handle: 'jukur', uuid: 'juku2'},
    'f884': 'MELINDA_RECORD_IMPORT_REPO:JUKURI'
  }
}

const testSources = {
  'foobar.example.com': process.env.NODE_ENV === 'test' ? {'fSID': {handle: 'REPO_FOOBAR', uuid: 'REPO_FOOBAR2'}, 'f884': 'MELINDA_RECORD_IMPORT_REPO:FOOBAR'} : null,
  'foobar.example2.dev': process.env.NODE_ENV === 'test' ? {'fSID': {handle: 'REPO_FOOBAR', uuid: 'REPO_FOOBAR2'}, 'f884': 'MELINDA_RECORD_IMPORT_REPO:FOOBAR'} : null,
};

export const sourceConfig = {
  ...productionSources,
  ...testSources
};

// This allows use of testSources in test environment but disables them in production
export const validHarvestSources = Object.keys(sourceConfig).filter(url => sourceConfig[url] !== null);
