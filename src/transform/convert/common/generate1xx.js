import {getContributors, getRecordTitle, translateAuthorRole, translateIso6931Lang} from "../../record-utils.js";

/**
 * Generates f100 if main author is available and is not group author
 * @param {Object} valueInterface containing getFieldValues function
 * @returns Empty array or array containing f100
 */
export function generate100(valueInterface) {
  const contributors = getContributors(valueInterface);

  if (!contributors.mainAuthor || contributors.mainAuthor.isGroupAuthor) {
    return [];
  }

  const {mainAuthor} = contributors;

  return [{
    tag: '100',
    ind1: mainAuthor.isNameInverted ? '1' : '0',
    subfields: [
      {code: 'a', value: `${mainAuthor.name},`},
      {code: 'e', value: `${translateAuthorRole(mainAuthor.role)}.`}
    ]
  }];
}

/**
 * Generates f110 if main author is available and is group author
 * @param {Object} valueInterface containing getFieldValues function
 * @returns Empty array or array containing f110
 */
export function generate110(valueInterface) {
  const contributors = getContributors(valueInterface);

  if (!contributors.mainAuthor || !contributors.mainAuthor.isGroupAuthor) {
    return [];
  }

  const {mainAuthor} = contributors;
  const ind1 = mainAuthor.isNameInverted ? '1' : '0';

  return [{
    tag: '110',
    ind1: '1',
    subfields: [
      {code: 'a', value: `${mainAuthor.name},`},
      {code: 'e', value: `${translateAuthorRole(mainAuthor.role)}.`}
    ]
  }];
}

/**
 * Generates f130 if main author is not available
 * @param {Object} valueInterface containing getFields and getFieldValues function
 * @returns Empty array or array containing f130
 */
export function generate130(valueInterface) {
  const contributors = getContributors(valueInterface);
  const {title, subtitle} = getRecordTitle(valueInterface);


  if (contributors.mainAuthor || !title) {
    return [];
  }

  const subfields = [{code: 'a', value: `${title}.`}];

  // If language is available, add it to $l
  const [language] = valueInterface.getFieldValues('dc.language.iso');
  const translatedLanguage = language ? translateIso6931Lang(language) : null;

  if (translatedLanguage) {
    subfields.push({code: 'l', value: translatedLanguage});
  }

  return [
    {
      tag: '130',
      // ind1 generated in validation phase by marc-record-validators-melinda:IndicatorFixes,
      subfields
    }
  ];
}
