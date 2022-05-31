import {getHandle} from './utils';

export function generateSID({getFieldValues}, sourceMap) {
  const values = getFieldValues('dc.identifier.uri');

  const validSidValues = values.reduce((acc, value) => {
    const result = getHandle(value, sourceMap);
    if (result && Object.prototype.hasOwnProperty.call(sourceMap, result.source)) {
      return acc.concat({source: sourceMap[result.source], handle: result.handle});
    }
    return acc;
  }, []);

  return validSidValues.length > 0 ? validSidValues.map(v => (
    {tag: 'SID', ind1: '', ind2: '',
      subfields: [
        {code: 'c', value: v.handle},
        {code: 'b', value: v.source}
      ]}
  )) : [];
}
