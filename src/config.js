/* istanbul ignore file */
import {parseBoolean} from '@natlibfi/melinda-commons';
import {readEnvironmentVariable} from '@natlibfi/melinda-backend-commons';

export const profileIds = readEnvironmentVariable('PROFILE_IDS', {defaultValue: ['foobar'], format: v => JSON.parse(v)});
export const amqpUrl = readEnvironmentVariable('AMQP_URL', {defaultValue: 'amqp://127.0.0.1:5672/'});
export const abortOnInvalidRecords = readEnvironmentVariable('ABORT_ON_INVALID_RECORDS', {defaultValue: false, format: parseBoolean});

export const harvestSource = readEnvironmentVariable('HARVEST_SOURCE', {defaultValue: ''});
export const isLegalDeposit = readEnvironmentVariable('IS_LEGAL_DEPOSIT', {defaultValue: false, format: v => parseBoolean(v)});
export const sourceMap = readEnvironmentVariable('SOURCEMAP', {defaultValue: {}, format: JSON.parse});
export const filters = {
  filterByFileType: readEnvironmentVariable('FILTER_FILETYPE_ONLY', {defaultValue: false, format: v => parseBoolean(v)}),
  filterByIsbnIdentifier: readEnvironmentVariable('FILTER_ISBN_ONLY', {defaultValue: false, format: v => parseBoolean(v)}),
  filterByIssuedYear: readEnvironmentVariable('FILTER_ISSUED_AFTER', {defaultValue: 0, format: v => Number(v)}),
  filterByMaterialType: readEnvironmentVariable('FILTER_MATERIALTYPES', {defaultValue: true, format: v => parseBoolean(v)})
};

export const recordImportApiOptions = {
  recordImportApiUrl: readEnvironmentVariable('RECORD_IMPORT_API_URL', {defaultValue: 'cli'}),
  recordImportApiUsername: readEnvironmentVariable('RECORD_IMPORT_API_USERNAME_TRANSFORMER', {defaultValue: 'cli'}),
  recordImportApiPassword: readEnvironmentVariable('RECORD_IMPORT_API_PASSWORD_TRANSFORMER', {defaultValue: 'cli', hideDefault: true}),
  userAgent: readEnvironmentVariable('API_CLIENT_USER_AGENT', {defaultValue: '_RECORD-IMPORT-TRANSFORMER'})
};
