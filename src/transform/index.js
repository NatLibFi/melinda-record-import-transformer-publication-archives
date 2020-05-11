/**
*
* @licstart  The following is the entire license notice for the JavaScript code in this file.
*
* Publication archives record transformer for the Melinda record batch import system
*
* Copyright (C) 2019-2020 University Of Helsinki (The National Library Of Finland)
*
* This file is part of melinda-record-import-transformer-publication-archives
*
* melinda-record-import-transformer-publication-archives program is free software: you can redistribute it and/or modify
* it under the terms of the GNU Affero General Public License as
* published by the Free Software Foundation, either version 3 of the
* License, or (at your option) any later version.
*
* melinda-record-import-transformer-publication-archives is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU Affero General Public License for more details.
*
* You should have received a copy of the GNU Affero General Public License
* along with this program.  If not, see <http://www.gnu.org/licenses/>.
*
* @licend  The above is the entire license notice
* for the JavaScript code in this file.
*
*/

import createValidator from '../validate';
import {Utils} from '@natlibfi/melinda-commons';
import {EventEmitter} from 'events';
import {Parser} from 'xml2js';
import createConverter from './convert';

class TransformEmitter extends EventEmitter {}
const {createLogger} = Utils;

export default function ({harvestSource, urnResolverUrl}) {
  return (stream, {validate = true, fix = true}) => {
    const Emitter = new TransformEmitter();
    const logger = createLogger();

    logger.log('debug', 'Starting to send recordEvents');

    readStream(stream);
    return Emitter;

    async function readStream(stream) {
      const validateRecord = await createValidator();
      const convertRecord = createConverter({harvestSource, urnResolverUrl});

      try {
        const records = await parse();
        const promises = Promise.all(records.map(transform));
        Emitter.emit('end', promises.length);
      } catch (err) {
        Emitter.emit('error', err);
      }

      async function parse() {
        const str = await readToString();
        const obj = await toObject();

        return obj['OAI-PMH'].ListRecords[0].record;

        function readToString() {
          return new Promise((resolve, reject) => {
            const list = [];

            stream
              .on('error', reject)
              .on('data', chunk => list.push(chunk)) // eslint-disable-line functional/immutable-data
              .on('end', () => resolve(list.join('')));
          });
        }

        function toObject() {
          return new Promise((resolve, reject) => {
            new Parser().parseString(str, (err, obj) => {
              if (err) {
                return reject(err);
              }

              resolve(obj);
            });
          });
        }
      }

      async function transform(data) {
        try {
          const record = convertRecord(data);

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
}
