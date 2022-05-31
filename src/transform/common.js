import langs from 'langs';

export function createValueInterface(inputFields) {
  return {getFieldValues, getFields};

  function getFieldValues(filter) {
    const fields = getFields(filter);
    return fields
      .filter(f => f.$.value)
      .map(f => f.$.value);
  }

  function getFields(arg) {
    const filter = typeof arg === 'function' ? arg : p => p === arg;

    const newFields = inputFields.filter(field => {
      const dcPath = getDCPath(field);
      return filter(dcPath);
    });

    return newFields;
  }

  function getDCPath(field) {
    const dcPath = `${field.$.schema}.${field.$.element}`;

    if (field.$.qualifier) {
      return `${dcPath}.${field.$.qualifier}`;
    }

    return dcPath;
  }
}

export function formatLanguage(code) {
  if (code && code.length === 3) {
    return code;
  }

  const lang = langs.where(1, code);
  return lang ? lang['2B'] : 'und';
}

export function getInputFields(record) {
  return record.metadata[0]['kk:metadata'][0]['kk:field']
    .filter(field => '$' in field);
}

export function getFileTypesInformation(record) {
  const inputFields = record.metadata[0]['kk:metadata'][0]['kk:file']
    ? record.metadata[0]['kk:metadata'][0]['kk:file'].filter(field => '$' in field) : [];

  return inputFields.length === 0 ? [] : inputFields.map(f => f.$.type);
}
