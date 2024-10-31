import langs from 'langs';

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
 * Parses source and handle from dc.identifier.uri values or from header information
 * @param {string} value URI value
 * @returns false if source or handle cannot be parsed, otherwise object containing source and handle attributes
 */
export function getHandle(value) {
  if (value.startsWith('oai:')) {
    return parseOai(value);
  }

  if (value.startsWith('http')) {
    return parseHttp(value);
  }

  return false;


  function parseHttp(value) {
    const baseUrlRegex = /https?:\/\/(?<source>[^?#/]+)/u;
    const handleRegex = /(?<handle>\/[0-9a-zA-Z]+\/[^/]+$)/u;

    const {source} = value.match(baseUrlRegex) ? value.match(baseUrlRegex).groups : {source: null};
    const {handle} = value.match(handleRegex) ? value.match(handleRegex).groups : {handle: null};

    if (source !== null && handle !== null) {
      return {source, handle};
    }

    return false;
  }

  function parseOai(value) {
    const parts = value.split(':');
    if (parts.length !== 3) {
      return false;
    }

    return {
      source: parts[1],
      handle: parts[2]
    };
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
    // eslint-disable-next-line no-unused-vars
    const {source, handle} = getHandle(identifierValue);
    return {source, uniqueIdentifier: handle};
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

export function isOpenAccess({getFieldValues}) {
  const dcAccessLevelFields = getFieldValues('dc.rights.accesslevel');
  return dcAccessLevelFields.length === 0 || dcAccessLevelFields.includes('openAccess');
}
