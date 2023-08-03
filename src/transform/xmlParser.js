import {Parser} from 'xml2js';

export async function xmlToObject(stream) {
  const str = await readToString();
  return toObject();

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
