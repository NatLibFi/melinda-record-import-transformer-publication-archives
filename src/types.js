/**
* @typedef {Object} ValueInterface
* @description Interface for basic getters to read the DC Record values.
* @property {Function} getFieldValue - Function for getting values from DC record fields that passes the given filter
* @property {Function} getFields - Function for getting field objects from DC record fields that passes the given filter
*/

/**
* @typedef {Object} Subfield
* @description MARC21 record datafield subfield.
* @property {string} code - Code of the subfield
* @property {string} value - Value of the subfield
*/

/**
* @typedef {Object} DataField
* @description MARC21 record data field that contains subfields.
* @property {string} tag - Tag of the field
* @property {string|undefined} ind1 - Indicator 1 value
* @property {string|undefined} ind2 - Indicator 2 value
* @property {Subfield[]} subfields - List of subfields
*/

exports.unused = {};
