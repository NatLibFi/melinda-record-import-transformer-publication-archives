import {createLogger} from '@natlibfi/melinda-backend-commons';
import {transformerBlobLogic, createMongoOperator} from '@natlibfi/melinda-record-import-commons';
import createTransformHandler from './transform';
import amqplib from 'amqplib';

export async function startApp(config) {
  const logger = createLogger();

  const mongoOperator = await createMongoOperator(config.mongoUrl);
  const transformHandler = createTransformHandler(config);

  logger.info('Starting melinda record import dc transformer');
  try {
    await transformerBlobLogic(mongoOperator, transformHandler, amqplib, config);
  } catch (error) {
    logger.error(error);
  } finally {
    mongoOperator.closeClient();
  }
}
