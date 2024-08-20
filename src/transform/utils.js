import {getHandle} from './convert/util';

/**
 * Parses source, unique identifier and date harvested from record header
 * @param {*} header Record header: ListRecords -> record -> header
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
export function getFirstValueInContext(context, ...path) {
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
