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

export default () => {
  // NB: All items are considered legal deposit items
  const isLegalDeposit = true;

  const validators = [
    EmptyFields(),
    IsbnIssn({hyphenateISBN: true}),
    IndicatorFixes(),
    isLegalDeposit ? Urn(isLegalDeposit) : undefined,
    isLegalDeposit ? AccessRights() : undefined,
    FieldExclusion([
      {
        tag: /^520$/u
      }
    ]),
    EndingPunctuation(),
    Punctuation(),
    RemoveDuplicateDataFields()
  ].filter(v => v !== undefined);

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
