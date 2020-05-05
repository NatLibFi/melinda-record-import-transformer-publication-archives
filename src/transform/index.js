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

import {chain} from 'stream-chain';
import {parser} from 'stream-json';
import {streamArray} from 'stream-json/streamers/StreamArray';
import createValidator from '../validate';
import {Utils} from '@natlibfi/melinda-commons';
import {EventEmitter} from 'events';
import createConverter from './convert';

class TransformEmitter extends EventEmitter {}
const {createLogger} = Utils;

export default function (stream, {harvestSource, urnResolverUrl, validate = true, fix = true}) {
  const Emitter = new TransformEmitter();
  const logger = createLogger();

  logger.log('debug', 'Starting to send recordEvents');

  readStream(stream);
  return Emitter;

  async function readStream(stream) {
    try {
      const validator = await createValidator();
      const convertRecord = createConverter({harvestSource, urnResolverUrl});
      const promises = [];
      const pipeline = chain([
        stream,
        parser(),
        streamArray()
      ]).on('error', err => Emitter.emit('error', err));

      pipeline.on('data', data => {
        promises.push(transform(data.value)); // eslint-disable-line functional/immutable-data

        function transform(data) {
          try {
            const record = convertRecord(data);

            if (validate === true || fix === true) {
              const result = validator(record, validate, fix);
              Emitter.emit('record', result);
              return;
            }

            return Emitter.emit('record', {failed: false, record});
          } catch (err) {
            Emitter.emit('error', err);
          }
        }
      });

      pipeline.on('end', async () => {
        try {
          logger.log('debug', `Handled ${promises.length} recordEvents`);
          await Promise.all(promises);
          Emitter.emit('end', promises.length);
        } catch (err) {
          Emitter.emit('error', err);
        }

        Emitter.emit('end', promises.length);
      });
    } catch (err) {
      Emitter.emit('error', err);
    }
  }
}
