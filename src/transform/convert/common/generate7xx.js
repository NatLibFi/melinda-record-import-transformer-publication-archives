import {getContributors, translateAuthorRole} from "../../record-utils.js";

/**
 * Generates f700 from contributor information that does not consider main author or group authors
 * @param {Object} valueInterface containing getFieldValues function
 * @returns Empty array or array containing f700
 */
export function generate700(valueInterface) {
  const {contributors} = getContributors(valueInterface);
  const nonGroupContributors = contributors.filter(c => !c.isGroupAuthor);

  if (nonGroupContributors.length === 0) {
    return [];
  }

  return nonGroupContributors.map((c) => ({
    tag: '700',
    ind1: c.isNameInverted ? '1' : '0',
    subfields: [
      {code: 'a', value: `${c.name},`},
      {code: 'e', value: `${translateAuthorRole(c.role)}.`}
    ]
  }));
}

/**
 * Generates f710 from contributor information that does not consider main author or group authors
 * @param {Object} valueInterface containing getFieldValues function
 * @returns Empty array or array containing f710
 */
export function generate710(valueInterface) {
  const {contributors} = getContributors(valueInterface);
  const groupContributors = contributors.filter(c => c.isGroupAuthor);

  if (groupContributors.length === 0) {
    return [];
  }

  return groupContributors.map((c) => ({
    tag: '710',
    ind1: '1',
    subfields: [
      {code: 'a', value: `${c.name},`},
      {code: 'e', value: `${translateAuthorRole(c.role)}.`}
    ]
  }));
}

/**
 * Generates field 776 ($z, $9) based on dc.relation.isversionof values.
 * @param {Object} ValueInterface containing getFieldValues function
 * @returns Empty array or array containing field 776 ($z, $9)
 */
export function generate776({getFieldValues}) {
  const values = getFieldValues('dc.relation.isversionof');
  return values.map(value => ({
    tag: '776', ind1: '0', ind2: ' ',
    subfields: [{code: 'z', value: formatValue(value)}]
  }));

  // Similar formatting to f020 $ə
  function formatValue(value) {
    return value.replace(/ISBN|\s+|:|\(print\)/gu, '');
  }
}
