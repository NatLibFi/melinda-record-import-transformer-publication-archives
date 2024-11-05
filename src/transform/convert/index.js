import {MarcRecord} from '@natlibfi/marc-record';
import moment from 'moment';

import {generate007, generate008, generateLDR} from './common/generateControlFields';
import {generate020, generate024, generate040, generate041, generate042} from './common/generate0xx';
import {generate100and700} from './common/generate1xx';
import {generate245, generate246, generate250, generate264} from './common/generate2xx';
import {generate300, generate336, generate337, generate338, generate341} from './common/generate3xx';
import {generate490} from './common/generate4xx';
import {generate500, generate502, generate506, generate540, generate542, generate594} from './common/generate5xx';
import {generate648, generate650, generate651, generate653} from './common/generate6xx';
import {generate776} from './common/generate7xx';
import {generate856, generate884} from './common/generate8xx';
import {generate946} from './common/generate9xx';
import {generateSID, generateLOW} from './common/generateSystemFields';
import {getLanguage} from './util';

/**
 * Generates MarcRecord using common field generations.
 * @param {object} conversionConfig Config object containing following attributes:
 * - harvestSource Source where record was harvested from
 * - fieldValueInterface interface containing getFieldValues and getFields functions
 * - convertOpts Options to control conversion (e.g., moment mock for automated tests)
 * @return Newly generated MarcRecord object
 */
export default ({harvestSource, fieldValueInterface, convertOpts = {}}) => {
  const momentSource = convertOpts.moment || moment;
  const titleLanguage = getLanguage(fieldValueInterface);

  const marcRecord = new MarcRecord();
  marcRecord.leader = generateLDR(); // eslint-disable-line functional/immutable-data

  const fields = [
    generate007(),
    generate008(fieldValueInterface, titleLanguage, momentSource),
    generate020(fieldValueInterface),
    generate024(fieldValueInterface),
    generate040(),
    generate041(fieldValueInterface),
    generate042(),
    generate100and700(fieldValueInterface),
    generate245(fieldValueInterface),
    generate246(fieldValueInterface),
    generate250(fieldValueInterface),
    generate264(fieldValueInterface, titleLanguage),
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
    generate946(fieldValueInterface),
    generateSID(harvestSource, fieldValueInterface),
    generateLOW()
  ]
  // Remove undefined values
    .filter(v => v)
    .flat();

  // Add generated fields to record
  fields.forEach(f => marcRecord.insertField(f));

  // NB: f884 includes hash generation so it is generated last
  marcRecord.insertFields(generate884(harvestSource, momentSource, marcRecord));
  return marcRecord.toObject();
};
