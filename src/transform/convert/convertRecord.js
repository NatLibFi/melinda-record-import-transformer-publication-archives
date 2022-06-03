import {MarcRecord} from '@natlibfi/marc-record';
import moment from 'moment';

import {generateStaticFields} from './generateStaticFields';
import {generate008, generate020, generate024, generate041} from './generate0xxFields';
import {generate100and700} from './generate1xxFields';
import {generate245, generate246, generate250, generate264} from './generate2xxFields';
import {generate300, generate341} from './generate3xxFields';
import {generate490} from './generate4xxFields';
import {generate500and502, generate506, generate540, generate542} from './generate5xxFields';
import {generate648, generate650, generate651, generate653} from './generate6xxFields';
import {generate776} from './generate7xxFields';
import {generate856, generate884} from './generate8xxFields';
import {generateSID} from './generateSidFields';

export default (fieldValueInterface, options) => {
  const {sourceMap, harvestSource} = options;
  const momentSource = options.moment || moment;

  const marcRecord = new MarcRecord();
  marcRecord.leader = '00000nam a22000003i 4500'; // eslint-disable-line functional/immutable-data

  generateOutputFields().forEach(f => marcRecord.insertField(f));

  return marcRecord;

  function generateOutputFields() {
    return [
      generateStaticFields(),
      generate008(fieldValueInterface, momentSource),
      generate020(fieldValueInterface),
      generate024(fieldValueInterface),
      generate041(fieldValueInterface),
      generate100and700(fieldValueInterface),
      generate245(fieldValueInterface),
      generate246(fieldValueInterface),
      generate250(fieldValueInterface),
      generate264(fieldValueInterface),
      generate300(fieldValueInterface),
      generate341(),
      generate490(fieldValueInterface),
      generate500and502(fieldValueInterface),
      generate542(fieldValueInterface),
      generate506(fieldValueInterface),
      generate540(fieldValueInterface),
      generate648(fieldValueInterface),
      generate650(fieldValueInterface),
      generate651(fieldValueInterface),
      generate653(fieldValueInterface),
      generate776(fieldValueInterface),
      generate856(fieldValueInterface),
      generate884(harvestSource, momentSource),
      generateSID(fieldValueInterface, sourceMap)
    ]
    // Remove undefined values
      .filter(v => v)
      .flat();
  }

};
