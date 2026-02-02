import {generateCommonFixtureTest} from '../../../test-utils/generate-fixture-test.js';
import {getSeriesIssn, getSeriesTitleInfo, getSeriesNumberInfo} from './dc-record-utils.js';

const testFixtureRootPath = [import.meta.dirname, '..', '..', '..', '..', 'test-fixtures', 'transform', 'convert', 'util', 'dc-record-utils'];

generateCommonFixtureTest(testFixtureRootPath.concat('get-series-title-info'), getSeriesTitleInfo);
generateCommonFixtureTest(testFixtureRootPath.concat('get-series-number-info'), getSeriesNumberInfo);
generateCommonFixtureTest(testFixtureRootPath.concat('get-series-issn'), getSeriesIssn);
