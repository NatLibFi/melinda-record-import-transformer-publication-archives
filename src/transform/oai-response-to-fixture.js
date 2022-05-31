import {xmlToObject} from './xmlParser';

run();

async function run() {
  const {'OAI-PMH': {GetRecord}} = await xmlToObject(process.stdin);
  console.log(JSON.stringify(GetRecord[0].record, undefined, 2)); // eslint-disable-line no-console
}
