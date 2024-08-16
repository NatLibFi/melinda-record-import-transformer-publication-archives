/* eslint-disable new-cap */
import validateFactory from '@natlibfi/marc-record-validate';
import {
  EmptyFields,
  IsbnIssn,
  Urn,
  AccessRights,
  EndingPunctuation,
  Punctuation,
  RemoveDuplicateDataFields,
  IndicatorFixes,
  FieldExclusion
} from '@natlibfi/marc-record-validators-melinda';

export default async (isLegalDeposit) => {
  const validators = [
    await EmptyFields(),
    await IsbnIssn({hyphenateISBN: true}),
    await IndicatorFixes(),
    isLegalDeposit ? await Urn(isLegalDeposit) : undefined,
    isLegalDeposit ? await AccessRights() : undefined,
    await FieldExclusion([
      {
        tag: /^520$/u
      }
    ]),
    await EndingPunctuation(),
    await Punctuation(),
    await RemoveDuplicateDataFields()
  ].filter(v => v !== undefined)

  const validate = validateFactory(validators);

  return async (record, fix, validateFixes) => {
    const opts = fix ? {fix, validateFixes} : /* istanbul ignore next: No need to test this */ {fix};
    const result = await validate(record, opts);
    return {
      record: result.record.toObject(),
      failed: result.valid === false,
      messages: result.report
    };
  };
};
