import createValidator from '../validate';
import {createLogger} from '@natlibfi/melinda-backend-commons';
import {EventEmitter} from 'events';
import createConverter from './convert';
import createFilter from './filter';
import {xmlToObject} from './xmlParser';

class TransformEmitter extends EventEmitter {}

export default options => (stream, {validate = true, fix = true} = {}) => {
  const {isLegalDeposit, filters, isJson} = options;
  const Emitter = new TransformEmitter();
  const logger = createLogger();

  logger.log('debug', 'Starting to send recordEvents');

  readStream(stream);

  return Emitter;

  async function readStream(stream) {
    const filterRecord = createFilter(filters);
    const validateRecord = await createValidator(isLegalDeposit);
    const convertRecord = createConverter({...options});

    try {
      const records = isJson ? stream : await parse();
      const promises = await Promise.all(records.map(transform));
      Emitter.emit('end', promises ? promises.length : '0');
    } catch (err) {
      Emitter.emit('error', err);
    }

    async function parse() {
      const {'OAI-PMH': {ListRecords}} = await xmlToObject(stream);
      return ListRecords[0].record;
    }

    async function transform(data) {
      try {
        const fieldValueInterface = filterRecord(data);
        const record = convertRecord(fieldValueInterface);

        if (validate === true || fix === true) {
          const result = await validateRecord(record, fix);
          Emitter.emit('record', result);
          return;
        }

        return Emitter.emit('record', {failed: false, record});
      } catch (err) {
        Emitter.emit('error', err);
      }
    }
  }
};
