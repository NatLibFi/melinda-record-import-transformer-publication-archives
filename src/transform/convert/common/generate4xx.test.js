import {generate490} from './generate4xx.js';
import {generateDatafieldFixtureTest} from '../../../test-utils/generate-fixture-test.js';

const testFixtureRootPath = [import.meta.dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate4xx'];

generateDatafieldFixtureTest(testFixtureRootPath.concat('generate490'), generate490);
