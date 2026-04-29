import {generateDatafieldFixtureTest} from '../../../test-utils/generate-fixture-test.js';

import * as fieldGenerator from './generate1xx.js';

const testFixtureRootPath = [import.meta.dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'common', 'generate1xx'];

generateDatafieldFixtureTest(testFixtureRootPath.concat('generate100'), fieldGenerator.generate100);
generateDatafieldFixtureTest(testFixtureRootPath.concat('generate110'), fieldGenerator.generate110);
