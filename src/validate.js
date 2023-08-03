/* eslint-disable new-cap */
import validateFactory from '@natlibfi/marc-record-validate';
import {
  EmptyFields,
  IsbnIssn,
  Urn,
  AccessRights
} from '@natlibfi/marc-record-validators-melinda';

export default async (isLegalDeposit) => {
  const validate = validateFactory([
    await EmptyFields(),
    await IsbnIssn({hyphenateISBN: true}),
    await Urn(isLegalDeposit),
    ...isLegalDeposit ? [await AccessRights()] : []
  ]);

  return async (record, fix, validateFixes) => {
    const opts = fix ? {fix, validateFixes} : /* istanbul ignore next: No need to test this */ {fix};
    const result = await validate(record, opts);
    return {
      record: result.record,
      failed: result.valid === false,
      messages: result.report
    };
  };
};
