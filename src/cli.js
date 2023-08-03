import fs from 'fs';
import yargs from 'yargs';
import transformFactory from './transform';
import * as config from './config';
import {transformerCliLogic} from '@natlibfi/melinda-record-import-commons';

cli();

async function cli() {
  const args = yargs(process.argv.slice(2))
    .scriptName('melinda-record-import-transformer-publication-archives')
    .epilog('Copyright (C) 2019-2022 University Of Helsinki (The National Library Of Finland)')
    .usage('$0 <file> [options] and env variable info in README')
    .showHelpOnFail(true)
    .example([
      ['$ node $0/dist/cli.js INPUT_file.xml -rfv true -d transformed/'],
      ['$ node $0/dist/cli.js INPUT_file.xml -rv true -f false -d transformed/'],
      ['$ node $0/dist/cli.js  -r true -d transformed/ INPUT_file.xml']
    ])
    .env('TRANSFORM_PUBLICATION_ARCHIVES')
    .positional('file', {type: 'string', describe: 'File to transform'})
    .options({
      v: {type: 'boolean', default: false, alias: 'validate', describe: 'Validate records'},
      f: {type: 'boolean', default: false, alias: 'fix', describe: 'Validate & fix records'},
      r: {type: 'boolean', default: false, alias: 'recordsOnly', describe: 'Write only record data to output (Invalid records are excluded)'},
      d: {type: 'string', alias: 'outputDirectory', describe: 'Output directory where each record file is written (Applicable only with `recordsOnly`'}
    })
    .check((args) => {
      const [file] = args._;
      if (file === undefined) {
        throw new Error('No file argument given');
      }

      if (!fs.existsSync(file)) {
        throw new Error(`File ${file} does not exist`);
      }

      return true;
    })
    .parseSync();

  const transform = transformFactory(config);
  await transformerCliLogic(args, transform);
}
