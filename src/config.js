/* istanbul ignore file */
import {parseBoolean} from '@natlibfi/melinda-commons';
import {readEnvironmentVariable} from '@natlibfi/melinda-backend-commons';

export const profileIds = readEnvironmentVariable('PROFILE_IDS', {defaultValue: ['foobar'], format: v => JSON.parse(v)});
export const amqpUrl = readEnvironmentVariable('AMQP_URL', {defaultValue: 'amqp://127.0.0.1:5672/'});
export const mongoUrl = readEnvironmentVariable('MONGO_URI', {defaultValue: 'mongodb://127.0.0.1/db'});
export const abortOnInvalidRecords = readEnvironmentVariable('ABORT_ON_INVALID_RECORDS', {defaultValue: false, format: v => parseBoolean(v)});
export const readFrom = readEnvironmentVariable('READ_FROM', {defaultValue: 'blobContent'});
export const nextQueueStatus = readEnvironmentVariable('NEXT_QUEUE_STATUS', {defaultValue: 'TRANSFORMED'});

// Filter configuration: what filters to apply and with what type of configuration
export const applyFilters = readEnvironmentVariable('FILTERS', {defaultValue: [], format: v => JSON.parse(v)});
export const filterConfig = {
  filterByIsbnIdentifier: {
    reverse: readEnvironmentVariable('FILTER_ISBN_REVERSE', {defaultValue: false, format: v => parseBoolean(v)})
  },
  filterByIssuedYear: {
    filterYearNotBefore: readEnvironmentVariable('FILTER_YEAR_NOT_BEFORE', {defaultValue: 0, format: v => Number(v)}), // NB: 0 -> not applied
    filterYearNotAfter: readEnvironmentVariable('FILTER_YEAR_NOT_AFTER', {defaultValue: 0, format: v => Number(v)}) // NB: 0 -> not applied
  }
};
