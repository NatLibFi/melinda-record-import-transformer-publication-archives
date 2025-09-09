// NB: Source config is static and not to be read from env vars
export const sourceConfig = {
  'foobar.example.com': process.env.NODE_ENV === 'test' ? {'fSID': 'REPO_FOOBAR', 'f884': 'MELINDA_RECORD_IMPORT_REPO:FOOBAR'} : null,
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
};