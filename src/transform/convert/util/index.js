import langs from 'langs';
import {getAllValuesInContext, getFirstValueInContext} from '../../utils';

/**
 * Creates interface that allows interacting with metadata given as input
 * @param inputFields Array of fields read from the record given as input
 * @returns Object containing getFieldValues and getFields functions
 */
export function createValueInterface(inputFields) {
  return {getFieldValues, getFields};

  function getFieldValues(filter) {
    const fields = getFields(filter);
    return fields
      .filter(f => f.$.value)
      .map(f => f.$.value);
  }

  function getFields(arg) {
    const filter = typeof arg === 'function' ? arg : p => p === arg;

    const newFields = inputFields.filter(field => {
      const dcPath = getDCPath(field);
      return filter(dcPath);
    });

    return newFields;
  }

  function getDCPath(field) {
    const dcPath = `${field.$.schema}.${field.$.element}`;

    if (field.$.qualifier) {
      return `${dcPath}.${field.$.qualifier}`;
    }

    return dcPath;
  }
}

/**
 * Formats language based on given language code
 * @param {string} code Language code to format
 * @returns {string} Lang code as it was if seems valid, otherwise ISO 639-2B lang code or 'und' if not found
 */
export function formatLanguage(code) {
  if (code && code.length === 3) {
    return code;
  }

  const lang = langs.where(1, code);
  return lang ? lang['2B'] : 'und';
}

/**
 * Function that returns filtered set of fields from original input.
 * @param record Input record parsed by XML parser
 * @returns Array containing record fields
 */
export function getInputFields(record) {
  return record['kk:field']
    .filter(field => '$' in field);
}

/**
 * Parses source and handle from dc.identifier.uri values
 * @param {string} value URI value found in dc.identifier.uri field
 * @returns false if source or handle cannot be parsed, otherwise object containing source and handle attributes
 */
export function getHandle(value) {
  const baseUrlRegex = /https?:\/\/(?<source>[^?#/]+)/u;
  const handleRegex = /(?<handle>\/[0-9a-zA-Z]+\/[^/]+$)/u;

  const {source} = value.match(baseUrlRegex) ? value.match(baseUrlRegex).groups : {source: null};
  const {handle} = value.match(handleRegex) ? value.match(handleRegex).groups : {handle: null};

  if (source !== null && handle !== null) {
    return {source, handle};
  }

  return false;
}

/**
 * Test validity of HTTP link based on regular expression. FTP links are also accepted.
 * @param {string} value HTTP link in string format
 * @returns {boolean} true if link is valid HTTP link, false if link is not valid
 */
export function isValidLink(value) {
  const httpProtocolRegex = /^(?:https?|ftp):\/\/[-a-zA-Z0-9]+\.[-a-zA-Z0-9]+/u;
  return value.match(httpProtocolRegex) !== null;
}

/**
 * Test if record has dc.type.ontasot fields or not
 * @param {Object} ValueInterface containing getFieldValues function
 * @returns {boolean} true if record contains dc.type.ontasot fields, false if not
 */
export function hasLevels({getFields}) {
  const fields = getFields('dc.type.ontasot');
  return fields.length > 0;
}

/**
 * Used for parsing the finnish term from dc.type.ontasot field
 * @param {string} value Value from dc.type.ontasot field
 * @returns {string} Undefined if cannot find finnish value, otherwise parsed the found value
 */
export function extractFinnishTerm(value) {
  const result = (/(?<a>^fi|\|fi)=(?<b>.[^|]+)/u).exec(value);
  return result && result.length === 3 ? result[2].trim() : undefined;
}

/**
 * Based on dc.type.ontasot value resolve whether record is dissertation
 * @param {Object} ValueInterface containing getFields function
 * @returns {boolean} true if record considers dissertation, false if not
 */
export function isDissertation({getFieldValues}) {
  const validDissertationValues = ['artikkeliväitöskirja', 'esseeväitöskirja', 'monografiaväitöskirja', 'väitöskirja'];
  const values = getFieldValues('dc.type.ontasot');

  if (values.length > 0) {
    return values.some(v => validDissertationValues.some(validValue => parseTerm(v) === validValue));
  }

  return false;


  function parseTerm(value) {
    if (value.match(/fi=/ui)) {
      return extractFinnishTerm(value).toLowerCase();
    }

    return value.trim().toLowerCase();
  }
}
