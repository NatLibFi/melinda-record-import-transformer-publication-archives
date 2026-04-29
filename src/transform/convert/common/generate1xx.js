import {getContributors, translateAuthorRole} from "../../record-utils.js";

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
