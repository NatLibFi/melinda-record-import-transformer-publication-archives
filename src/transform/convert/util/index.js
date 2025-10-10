import langs from 'langs';
import LanguageDetect from 'languagedetect';

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
 * @returns {string} Lang code as it was if seems valid, otherwise ISO 639-2B lang code or null if not found
 */
export function formatLanguage(code) {
  if (code && code.length === 3) {
    return code;
  }

  const lang = langs.where(1, code);
  return lang ? lang['2B'] : null;
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
 * Getter for filetype information from kk:file tag of the record. Defaults to PDF if no valid filetype cannot be found.
 * @param {Object} record - record to process
 * @returns {string} filetype information in format that may be used in f020 $q. Defaults to PDF if no valid filetype can be found.
 */
export function getRecordFiletype(record) {
  const filetypeMappingTable = {
    'application/pdf': 'PDF',
    'text/html': 'HTML',
    'audio/mp3': 'MP3'
  };

  const validFiletypeDefinitions = Object.keys(filetypeMappingTable);
  const defaultFiletype = 'application/pdf';

  const recordFiletypeFields = record['kk:file'];
  if (!recordFiletypeFields) {
    return filetypeMappingTable[defaultFiletype];
  }

  const recordFiletype = record['kk:file']
    .filter(field => '$' in field && field.$.type) // Filter entries who do not have mandatory field
    .find(field => validFiletypeDefinitions.includes(field.$.type));

  const selectedFiletype = recordFiletype ? recordFiletype.$.type : defaultFiletype;
  return filetypeMappingTable[selectedFiletype];
}

/**
 * Parses source and system identifier from dc.identifier.uri/dc.source.identifier values or from header information
 * @param {string} value URI value
 * @returns false if source or system identifier cannot be parsed, otherwise object containing source and systemId attributes
 */
export function getSystemId(value) {
  if (value.startsWith('oai:')) {
    return parseOai(value);
  }

  if (value.startsWith('http')) {
    return parseHttp(value);
  }

  return false;

  function parseHttp(value) {
    const baseUrlRegex = /https?:\/\/(?<source>[^?#/]+)/u;
    const httpItemRegexId = /handle(?<itemId>\/[0-9a-zA-Z]+\/[^/]+$)/u;
    const httpItemRegexUuid = /items\/(?<itemUuid>[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})/i // source: https://stackoverflow.com/a/13653180

    const {source} = value.match(baseUrlRegex) ? value.match(baseUrlRegex).groups : {source: null};
    const {itemId} = value.match(httpItemRegexId) ? value.match(httpItemRegexId).groups : {itemId: null};
    const {itemUuid} = value.match(httpItemRegexUuid) ? value.match(httpItemRegexUuid).groups : {itemUuid: null};

    const systemId = itemId ? itemId : itemUuid;
    const identifierType = itemId ? 'handle' : 'uuid';

    if (source && systemId) {
      return {source, systemId, identifierType};
    }

    return false;
  }



  function parseOai(value) {
    const oaiItemRegexId = /(?<itemId>[0-9a-zA-Z]+\/[^/]+$)/u;
    const oaiItemRegexUuid = /(?<itemUuid>[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})/i // source: https://stackoverflow.com/a/13653180

    const parts = value.split(':');
    if (parts.length !== 3) {
      return false;
    }

    const source = parts[1];
    const itemValue = parts[2];

    const {itemId} = itemValue.match(oaiItemRegexId) ? itemValue.match(oaiItemRegexId).groups : {itemId: null};
    const {itemUuid} = itemValue.match(oaiItemRegexUuid) ? itemValue.match(oaiItemRegexUuid).groups : {itemUuid: null};

    const systemId = itemId ? `/${itemId}` : itemUuid;
    const identifierType = itemId ? 'handle' : 'uuid';

    if (source && systemId) {
      return {source, systemId, identifierType};
    }

    return false;
  }

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

/**
 * Parses source, unique identifier and date harvested from record header
 * @param {object}} header Record header: ListRecords -> record -> header
 * @returns {object} Object containing identifier and dateHarvested attributes
 */
export function parseHeaderInformation(header) {
  const identifier = getFirstValueInContext(header, 'identifier');
  const dateHarvested = getFirstValueInContext(header, 'datestamp');

  return {
    identifier: parseIdentifier(identifier),
    dateHarvested
  };

  function parseIdentifier(identifierValue) {
    const {source, systemId} = getSystemId(identifierValue);
    return {source, uniqueIdentifier: systemId};
  }
}

/**
 * Get first value of given path in context of given object
 * @param {object} context Object to be used as context
 * @param  {...any} path Path to value to retrieve. Each step follows the first index of array if available.
 * @returns {any|null} Null if value could not be found from path, otherwise the first value retrieved through the path
 */
function getFirstValueInContext(context, ...path) {
  return recurse(path, context);

  function recurse(props, context) {
    const [prop] = props;

    if (prop) {
      if (props.length === 1) {
        return context?.[prop] ? context[prop][0] : null;
      }

      return recurse(props.slice(1), context?.[prop]?.[0] || {});
    }

    return null;
  }
}

/**
 * Get all values when stepping through first indexes of given path in context of given object
 * @param {object} context Object to be used as context
 * @param  {...any} path Path to value to retrieve. Each step follows the first index of array if available.
 * @returns Empty array if there are no values that could not be found from path, otherwise array containing the values retrieved from path's last attribute
 */
export function getAllValuesInContext(context, ...path) {
  return recurse(path, context);

  function recurse(props, context) {
    const [prop] = props;

    if (prop) {
      if (props.length === 1) {
        return context?.[prop] || [];
      }

      return recurse(props.slice(1), context?.[prop]?.[0] || {});
    }

    return [];
  }
}

/**
 * Tests whether publication is open access publication or not.
 * Test is based on dc.rights.accesslevel and dc.rights.accessrights values.
 * Publication is interpreted as open access if it contains one of accepted terms
 * for being open access or alternatively does not contain any information regarding
 * access level or access rights.
 * @param {Object} ValueInterface containing getFields function
 * @returns {boolean} true if publication is open access, othwerwise false
 */
export function isOpenAccess({getFieldValues}) {
  const openAccessValues = [
    'openAccess',
    'OpenAccess',
    'openaccess',
    'avoin',
    'Avoin',
    'Aineisto on vapaasti saatavissa',
    'Available on the Internet',
    'Kaikille avoin'
  ];

  const dcAccessLevelFields = getFieldValues('dc.rights.accesslevel');
  const dcAccessRightsFields = getFieldValues('dc.rights.accessrights');

  const accessFieldsValues = [...dcAccessLevelFields, ...dcAccessRightsFields];
  const accessRightsInfoDoesNotExist = accessFieldsValues.length === 0;
  const accessFieldsContainsOpenAccessValue = openAccessValues.some(openAccessValue => accessFieldsValues.includes(openAccessValue));

  return accessRightsInfoDoesNotExist || accessFieldsContainsOpenAccessValue;
}

// This is lax validation -- if stricter is required it will be implemented at later stage and to common package
export function seemsValidishIssn(issn) {
  if (typeof issn !== 'string' || issn.length < 8) {
    return false;
  }

  const issnRegexLax = /^\d{4}-\d{3}[0-9xX]{1}$/u;
  return issnRegexLax.test(issn);
}

export function parseIssnFromString(issnString) {
  const issnRegex = /\d{4}-\d{3}[0-9xX]{1}/u;
  const containsIssn = issnRegex.test(issnString);

  if (!containsIssn) {
    return null;
  }

  const [result] = issnString.match(issnRegex);
  return result;
}

/**
 * Wrapper for language getters. Prioritizes dc.language.iso > dc.title.$.language > language detection from title text
 * @returns Lang code as it was if seems valid, otherwise ISO 639-2B lang code or null if not found
 */
export function getLanguage({getFields, getFieldValues}) {
  const languageIsoValues = getFieldValues('dc.language.iso');
  if (languageIsoValues.length > 0) {
    return formatLanguage(languageIsoValues[0]);
  }

  const titleLanguage = getTitleLanguage({getFields});
  if (titleLanguage) {
    return titleLanguage;
  }

  return detectLanguage({getFieldValues});
}

/**
 * Getter for title language. May return only fin/eng/swe or null if language attribute cannot be found/value is not one of known valid values.
 */
export function getTitleLanguage({getFields}) {
  const validLangs = ['en', 'sv', 'fi'];

  const fields = getFields('dc.title');
  const language = fields.length > 0 ? fields[0].$.language : null;
  return validLangs.includes(language) ? formatLanguage(language) : null;
}

/**
 * Detect title language using language detection. Returns only fin/eng/swe or null.
 */

export function detectLanguage({getFieldValues}) {
  const validLangs = ['eng', 'swe', 'fin'];

  const lngDetector = new LanguageDetect();
  lngDetector.setLanguageType('iso3');

  const titleFields = getFieldValues('dc.title');
  if (titleFields.length === 0) {
    return null;
  }

  const [title] = titleFields;
  const detectedTitleLanguages = lngDetector.detect(title, 1).flat();

  if (detectedTitleLanguages.length === 0) {
    return null;
  }

  const [lang] = detectedTitleLanguages;

  if (!lang || typeof lang !== 'string') {
    throw new Error('Something unexpected happened during language detection');
  }

  return validLangs.includes(lang) ? formatLanguage(lang) : null;
}

export function capitalizeValue(value) {
  const cannotCapitalize = !value || typeof value !== 'string' || value.length < 2;
  if (cannotCapitalize) {
    // Fail silently
    return value;
  }

  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

/**
 * Fixes URN value from http to https. If value is does not include http-protocol, returns it as it is.
 * @param {string} urn - URN value
 */
export function fixUrnValue(urn) {
  const isHttpUrn = (/^http:\/\/urn.fi/u).test(urn);
  if (!isHttpUrn) {
    return urn;
  }

  return urn.replace(/^http:\/\//u, 'https://');
}

/**
 * Normalizes newlines and carriage returns typed as string to a single whitespace.
 * @param {string|undefined|null} value - Value to normalize
 */
export function normalizeTitleString(value) {
  const cannotFix = !value || typeof value !== 'string';
  if (cannotFix) {
    return value;
  }

  const windowsNewline = /\\r\\n/g;
  const unixNewline = /\\n/g;
  const multiSpace = /\s+/g;

  return value
    .replaceAll(windowsNewline, ' ') // First remove windows newlines, otherwise carriage return would be left intact
    .replaceAll(unixNewline, ' ') // Remove unix newlines
    .replaceAll(multiSpace, ' ') // Normalize multiple whitespaces to one as these may occur after processing newlines
    .trim(); // Remove whitespaces surrounding the string
}