import {isValidLink} from './utils';

export function generate856({getFieldValues}) {
  const publicAccessFields = generatePublicAccessFields();
  const otherUrnFields = generateOtherUrnFields();

  return publicAccessFields.concat(otherUrnFields);

  function generatePublicAccessFields() {
    const accessLevel = getFieldValues('dc.rights.accesslevel');

    if (accessLevel.length === 0 || accessLevel[0] === 'openAccess') {
      const subfields = generateSubfields();
      return [{tag: '856', ind1: '4', ind2: '0', subfields}];
    }

    return [];

    function generateSubfields() {
      const linkSubfields = generateLinkSubfields();
      return linkSubfields.concat({code: 'y', value: 'Linkki verkkoaineistoon'});
    }
  }

  function generateOtherUrnFields() {
    const urn = getFieldValues('dc.relation.urn');

    return urn.length > 0 ? [
      {
        tag: '856', ind1: '4', ind2: '2',
        subfields: [{code: 'u', value: urn[0]}]
      }
    ] : [];
  }

  function generateLinkSubfields() {
    const urn = generateUrn();
    const doi = generateU('dc.identifier.doi');
    const uri = generateU('dc.identifier.uri');
    const url = generateU('dc.identifier.url');

    if (urn.length > 0) {
      return doi ? urn.concat(doi) : urn;
    }

    return doi.concat(uri, url);

    function generateUrn() {
      const values = getFieldValues('dc.identifier.urn');
      return values.map(v => ({code: 'u', value: (/http:\/\/urn.fi\//u).test(v) ? v : `http://urn.fi/${v}`}));
    }

    function generateU(path) {
      const values = getFieldValues(path);
      return values.filter(value => isValidLink(value)).map(value => ({code: 'u', value}));
    }
  }
}
