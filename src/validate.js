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

  return async (record, fix, validateFixes, commonErrorPayload) => {
    const opts = fix ? { fix, validateFixes } : { fix };
    const result = await validate(record, opts);

    if (result.valid === false) {
      const failureMessages = result.report
        .filter((report) => report.state === 'invalid')
        .map(({ messages }) => messages)
        .flat();

      return {
        failed: true,
        title: commonErrorPayload.title,
        standardIdentifiers: commonErrorPayload.identifiers,
        message: failureMessages.join(','),
        messages: failureMessages,
      };
    }

    return {
      failed: false,
      record: result.record.toObject(),
    };
  };
};
