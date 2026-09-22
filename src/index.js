import {handleInterrupt, createLogger} from '@natlibfi/melinda-backend-commons';

import {startApp} from './app.js';

import * as config from './config.js';
import packageJson from '../package.json' with {type: 'json'};

run();

async function run() {
  const logger = createLogger();
  registerInterruptionHandlers();

  logger.info(`Starting publication archives transformer v${packageJson.version}`);
  await startApp(config);

  function registerInterruptionHandlers() {
    process
      .on('SIGTERM', handleSignal)
      .on('SIGINT', handleInterrupt)
      .on('uncaughtException', ({stack}) => {
        handleTermination({code: 1, message: stack});
      })
      .on('unhandledRejection', ({stack}) => {
        handleTermination({code: 1, message: stack});
      });

    function handleSignal(signal) {
      handleTermination({code: 1, message: `Received ${signal}`});
    }
  }

  function handleTermination({code = 0, message = false}) {
    logMessage(message);

    process.exit(code);

    function logMessage(message) {
      if (message) {
        return logger.error(message);
      }
    }
  }
}
