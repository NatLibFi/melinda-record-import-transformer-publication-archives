import {MarcRecord} from '@natlibfi/marc-record';
import moment from 'moment';

import {generate007, generate008, generateLDR} from './generateControlFields';
import {generate020, generate024, generate040, generate041, generate042} from './generate0xx';
import {generate100and700} from './generate1xx';
import {generate245, generate246, generate250, generate264} from './generate2xx';
import {generate300, generate336, generate337, generate338, generate341} from './generate3xx';
import {generate490} from './generate4xx';
import {generate500, generate502, generate506, generate540, generate542, generate594} from './generate5xx';
import {generate648, generate650, generate651, generate653} from './generate6xx';
import {generate776} from './generate7xx';
import {generate856, generate884} from './generate8xx';
import {generateSID, generateLOW} from './generateSystemFields';

/**
 * Generates MarcRecord using common field generations.
 * @param {Object} fieldValueInterface interface containing getFieldValues and getFields functions
 * @param {Object} options object containing options to be used during conversion
 * @return Newly generated MarcRecord object
 */
export default (fieldValueInterface, options) => {
  const {sourceMap, harvestSource} = options;
  const momentSource = options.moment || moment;

  const marcRecord = new MarcRecord();
  marcRecord.leader = generateLDR(); // eslint-disable-line functional/immutable-data

  generateOutputFields().forEach(f => marcRecord.insertField(f));

  return marcRecord;

  function generateOutputFields() {
    return [
      generate007(),
      generate008(fieldValueInterface, momentSource),
      generate020(fieldValueInterface),
      generate024(fieldValueInterface),
      generate040(),
      generate041(fieldValueInterface),
      generate042(),
      generate100and700(fieldValueInterface),
      generate245(fieldValueInterface),
      generate246(fieldValueInterface),
      generate250(fieldValueInterface),
      generate264(fieldValueInterface),
      generate300(fieldValueInterface),
      generate336(),
      generate337(),
      generate338(),
      generate341(),
      generate490(fieldValueInterface),
      generate500(fieldValueInterface),
      generate502(fieldValueInterface),
      generate542(fieldValueInterface),
      generate506(fieldValueInterface),
      generate540(fieldValueInterface),
      generate594(),
      generate648(fieldValueInterface),
      generate650(fieldValueInterface),
      generate651(fieldValueInterface),
      generate653(fieldValueInterface),
      generate776(fieldValueInterface),
      generate856(fieldValueInterface),
      generate884(harvestSource, momentSource),
      generateSID(fieldValueInterface, sourceMap),
      generateLOW()
    ]
    // Remove undefined values
      .filter(v => v)
      .flat();
  }

};
