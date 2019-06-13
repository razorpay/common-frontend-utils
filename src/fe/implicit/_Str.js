import * as _ from './_';
// https://vocajs.com/
const proto = _.prototypeOf(String);
const protoSlice = proto.slice;

/**
 * Adds padding to a string's ends
 * @param {string} str
 *
 * @returns {string}
 */
export const pad = str => ' ' + str + ' ';

/**
 * Checks if a string contains a substring
 * @param  {string} str
 * @param  {string} substr The substring to check if it exists in the main string
 *
 * @returns {boolean} Return True or False returned upon checking substring in the main string
 */
export const contains = _.curry2((str, substr) => str.indexOf(substr) !== -1);

/**
 * Slice a string for the given indexes
 * @param  {string} str
 * @param  {number} from The index from where to start slicing
 * @param  {number} to The index till where to end slicing
 *
 * @returns {string}
 */
export const slice = _.curry3((str, from, to) =>
  protoSlice.call(str, from, to)
);

/**
 * Slice a string from given index to the end
 * @param  {string} str
 * @param  {number} from The index from where to start slicing
 *
 * @returns {string}
 */
export const sliceFrom = _.curry2((str, from) => protoSlice.call(str, from));

/**
 * Check if a string starts with a given string
 * @param  {string} str
 * @param  {string} substr The substring to check if it comes in starting of the given string
 *
 * @returns {boolean}
 */
export const startsWith = _.curry2((str, substr) => str.indexOf(substr) === 0);
