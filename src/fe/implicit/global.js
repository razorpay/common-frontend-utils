export const global = window;
export const document = global.document;

/**
 * Converts the passed argument into its boolean value
 * @param {*} arg
 *
 * @returns {boolean}
 */
export const Boolean = global.Boolean;

/**
 * Creates an array of the length passed in the argument
 * @param {number} length
 *
 * @returns {array}
 */
export const Array = global.Array;

/**
 * Converts the passed argument into an instance of its own type
 * @param {*} arg
 *
 * @returns {object}
 */
export const Object = global.Object;

/**
 * Converts the passed argument into string
 * @param {*} arg
 *
 * @returns {string}
 */
export const String = global.String;

/**
 * Converts the passed argument into number
 * @param {*} arg
 *
 * @returns {number}
 */
export const Number = global.Number;

/**
 * Creates a date string according to passed arguments
 * @param {number} year
 * @param {number} month
 * @param {number} day
 * @param {number} hour
 * @param {number} minute
 * @param {number} second
 * @param {number} millisecond
 *
 * @returns {string}
 */
export const Date = global.Date;

export const Math = global.Math;

/**
 * Executes a function passed as argument after the given time
 * @param {function} fn
 * @param {number} time
 *
 * @returns {number}
 */
export const setTimeout = global.setTimeout;

/**
 * Executes a function passed as argument repeatedly after a given interval
 * @param {function} fn
 * @param {number} time
 *
 * @returns {number}
 */
export const setInterval = global.setInterval;

/**
 * Clears the timeout that was created using setTimeout
 * @param {number} id
 *
 * @returns {void}
 */
export const clearTimeout = global.clearTimeout;

/**
 * Clears the interval that was created using setInterval
 * @param {number} id
 *
 * @returns {void}
 */
export const clearInterval = global.clearInterval;

/**
 * Parses the passed argument into integer
 * @param {*} arg
 *
 * @returns {number}
 */
export const parseInt = global.parseInt;

/**
 * Encodes the passed argument into a URI component
 * @param {*} arg
 *
 * @returns {string}
 */
export const encodeURIComponent = global.encodeURIComponent;

/**
 * Decodes the passed argument from a URI component
 * @param {string} arg
 *
 * @returns {string}
 */
export const decodeURIComponent = global.decodeURIComponent;

/**
 * Encodes a string in base-64
 * @param {string} arg
 *
 * @returns {string}
 */
export const btoa = global.btoa;

/**
 * Decodes an encoded string
 * @param {string} arg
 *
 * @returns {string}
 */
export const unescape = global.unescape;

/**
 * Creates a TypeError object
 * @param {string} arg
 *
 * @returns {TypeError}
 */
export const TypeError = global.TypeError;

export const navigator = global.navigator;
export const location = global.location;

// /**
//  * Creates an XMLHttpRequest object to exchange data with a web server
//  *
//  * @returns {XMLHttpRequest}
//  */
export const XMLHttpRequest = global.XMLHttpRequest;
export const NodeList = global.NodeList;
export const FormData = global.FormData;
export const ArrayBuffer = global.ArrayBuffer;
