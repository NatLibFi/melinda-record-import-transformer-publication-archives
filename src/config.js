/* istanbul ignore file */
import {parseBoolean} from '@natlibfi/melinda-commons';
import {readEnvironmentVariable} from '@natlibfi/melinda-backend-commons';

export const profileIds = readEnvironmentVariable('PROFILE_IDS', {defaultValue: ['foobar'], format: v => JSON.parse(v)});
export const amqpUrl = readEnvironmentVariable('AMQP_URL', {defaultValue: 'amqp://127.0.0.1:5672/'});
export const mongoUrl = readEnvironmentVariable('MONGO_URI', {defaultValue: 'mongodb://127.0.0.1/db'});
export const abortOnInvalidRecords = readEnvironmentVariable('ABORT_ON_INVALID_RECORDS', {defaultValue: false, format: v => parseBoolean(v)});

export const isLegalDeposit = readEnvironmentVariable('IS_LEGAL_DEPOSIT', {defaultValue: false, format: v => parseBoolean(v)});

// Filter config
export const applyFilters = readEnvironmentVariable('FILTERS', {defaultValue: [], format: v => JSON.parse(v)});
export const filterConfig = {
  filterByIssuedYear: {
    filterYearNotBefore: readEnvironmentVariable('FILTER_YEAR_NOT_BEFORE', {defaultValue: 0, format: v => Number(v)})
  }
};

export const recordImportApiOptions = {
  recordImportApiUrl: readEnvironmentVariable('RECORD_IMPORT_API_URL', {defaultValue: 'cli'}),
  userAgent: readEnvironmentVariable('API_CLIENT_USER_AGENT', {defaultValue: '_RECORD-IMPORT-TRANSFORMER'}),
  allowSelfSignedApiCert: readEnvironmentVariable('ALLOW_API_SELF_SIGNED', {defaultValue: false, format: parseBoolean})
};

export const keycloakOptions = {
  issuerBaseURL: readEnvironmentVariable('KEYCLOAK_ISSUER_BASE_URL', {defaultValue: 'KEYCLOAK_ISSUER_BASE_URL env is not set!'}),
  serviceClientID: readEnvironmentVariable('KEYCLOAK_SERVICE_CLIENT_ID', {defaultValue: 'KEYCLOAK_SERVICE_CLIENT_ID env is not set!'}),
  serviceClientSecret: readEnvironmentVariable('KEYCLOAK_SERVICE_CLIENT_SECRET', {defaultValue: 'KEYCLOAK_SERVICE_CLIENT_SECRET env is not set!'})
};

// NB: Source config is static and not to be read from env vars
export const sourceConfig = {
  // eslint-disable-next-line no-process-env
  'foobar.example.com': process.env.NODE_ENV === 'test' ? {'fSID': 'REPO_FOOBAR', 'f884': 'MELINDA_RECORD_IMPORT_REPO:FOOBAR'} : null,
  'julkaisut.valtioneuvosto.fi': {
    'fSID': 'REPO_VALTO',
    'f884': 'MELINDA_RECORD_IMPORT_REPO:VALTO'
  }
};
