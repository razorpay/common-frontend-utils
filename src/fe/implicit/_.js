export function logError() {
  console.error.apply(console, arguments);
}

/**
 * Returns a partially applied function, awaiting for last parameter
 * @param {function} func
 *
 * @returns {*}
 */
export const curry2 = func =>
  function(arg1, arg2) {
    if (arguments.length < 2) {
      return primArg => func.call(null, primArg, arg1);
    }
    return func.call(null, arg1, arg2);
  };

export const curry3 = func =>
  function(arg1, arg2, arg3) {
    if (arguments.length < 3) {
      return primArg => func.call(null, primArg, arg1, arg2);
    }
    return func.call(null, arg1, arg2, arg3);
  };

export function validateArgs(...validators) {
  return func =>
    function() {
      let args = arguments;
      if (
        validators.every(
          (v, i) => v(args[i]) || logError(`wrong ${i}th argtype`, args[i])
        )
      ) {
        return func.apply(null, args);
      }
      return args[0];
    };
}

/**
 * Matches the type of the first argument with the second argument using typeof operator and returns true or false
 * @param {*} x
 * @param {string} type
 *
 * @returns {boolean}
 */
export const isType = ((x, type) => typeof x === type) |> curry2;
export const isBoolean = isType('boolean');
export const isNumber = isType('number');
export const isString = isType('string');
export const isFunction = isType('function');
export const isObject = isType('object');
export const isArray = Array.isArray;

/**
 * Checks if the given argument is an element or not
 * @param {Object | Element} o
 *
 * @returns {boolean}
 */
export const isElement = o => isNonNullObject(o) && o.nodeType === 1;

/**
 * Checks if the given argument is truthy or not
 * @param {*} o
 *
 * @returns {boolean}
 */
export const isTruthy = o => Boolean(o);

/**
 * Checks if the given argument is not a null object
 * @param {Object} o
 *
 * @returns {boolean}
 */
export const isNonNullObject = o => o !== null && isObject(o);

/**
 * Checks if the given object is empty or not
 * @param {Object} x
 *
 * @returns {boolean}
 */
export const isEmptyObject = x => !lengthOf(Object.keys(x));

// create getProperty function based on keys
export const prop = curry2((obj, key) => obj && obj[key]);

export const lengthOf = prop('length');
export const prototypeOf = prop('prototype');

/**
 * Checks if the constructor of first parameter is same as second parameter constructor
 * @param {function} x
 * @param {number} y
 *
 * @returns {boolean}
 */
export const isExact = curry2((x, y) => x && x.constructor === y);

/**
 * Checks if the first parameter is an instance of second parameter class
 * @param {function} x
 * @param {number} y
 *
 * @returns {boolean}
 */
export const is = curry2((x, y) => x instanceof y);

export const pixelUnit = 'px';

export const now = Date.now;
export const random = Math.random;
export const floor = Math.floor;

/**
 * Calls a function after a given time and returns a function to clear the timeout
 * @param {function} func
 * @param {number} delay
 *
 * @returns {function}
 */
export const timeout = (func, delay) => {
  var timerId = setTimeout(func, delay || 0);
  return () => clearTimeout(timerId);
};

/**
 * Calls a function at a set interval of time and returns a function to clear the interval.
 * @param {function} func
 * @param {number} delay
 *
 * @returns {function}
 */
export const interval = (func, delay) => {
  var timerId = setInterval(func, delay || 0);
  return () => clearInterval(timerId);
};

export const timer = x => {
  var then = now();
  return x => now() - then;
};

/**
 * Gives raw error object consisting of description and field.
 * @param {string} description
 * @param {string} field
 *
 * @returns {Object}
 */
export function rawError(description, field) {
  var errorObj = {
    description: String(description),
  };
  if (field) {
    errorObj.field = field;
  }
  return errorObj;
}

/**
 * Gives error object consisting of description and field.
 * @param {string} description
 * @param {string} field
 *
 * @returns {Object}
 */
export function rzpError(description, field) {
  return { error: rawError(description, field) };
}

/**
 * Throws error with message as given in the argument
 * @param {string} message
 *
 * @returns {Object}
 */
export function throwMessage(message) {
  throw new Error(message);
}

/**
 * Checks if the given argument is Base64 Image string or not
 * @param {string} src
 *
 * @returns {boolean}
 */
export const isBase64Image = src => /data:image\/[^;]+;base64/.test(src);

/**
 * Gives a flattened object that can be used to generate query strings.
 * @param {Object} obj The source object
 * @param {string} prefix An optional prefix
 * @example
 * { foo: ['a', 'b'] } into { 'foo[0]': 'a', 'foo[1]': 'b' }
 *
 * @return {Object}
 */
export function makeQueryObject(obj, prefix) {
  const query = {};

  if (!isNonNullObject(obj)) {
    return query;
  }

  const noPrefix = typeof prefix === 'undefined' || prefix === null;

  Object.keys(obj).forEach(key => {
    const value = obj[key];
    const _prefix = noPrefix ? key : `${prefix}[${key}]`;

    if (typeof value === 'object') {
      const _query = makeQueryObject(value, _prefix);

      Object.keys(_query).forEach(subkey => {
        query[subkey] = _query[subkey];
      });
    } else {
      query[_prefix] = value;
    }
  });

  return query;
}

/**
 * Returns url with query params added to the url from the object
 * @param {Object} obj
 *
 * @returns {string}
 */
export function obj2query(obj) {
  const query = makeQueryObject(obj);

  return Object.keys(query)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
    .join('&');
}

/**
 * Returns an object converted from URL's query params
 * @param {string} url
 * @param {Object} params
 *
 * @returns {string}
 */
export function query2obj(string) {
  var obj = {};
  string.split(/=|&/).forEach((param, index, array) => {
    if (index % 2) {
      obj[array[index - 1]] = decodeURIComponent(param);
    }
  });
  return obj;
}

/**
 * Appends params to the URL from an object
 * @param {string} url
 * @param {Object} params
 *
 * @returns {string}
 */
export function appendParamsToUrl(url, params) {
  if (isNonNullObject(params)) {
    params = obj2query(params);
  }
  if (params) {
    url += url.indexOf('?') > 0 ? '&' : '?';
    url += params;
  }
  return url;
}

/**
 * Returns rgba value for hex color code
 * @param {string} hex
 *
 * @returns {Object}
 */

function hex2rgb(hex) {
  var colors = hex
    .slice(1)
    .match(/.{2}/g)
    .map(match => (parseInt(match[1], 16) / 255).toFixed(1));

  return {
    red: colors[0],
    green: colors[1],
    blue: colors[2],
    alpha: 1,
  };
}

/**
 * Returns keycode of the key pressed when the event was fired
 * @param {Event} e
 * @return {number}
 */
export const getKeyFromEvent = e =>
  is(e, global.Event) && (e.which || e.charCode || e.keyCode);

export const getCharFromEvent = e => {
  let which = getKeyFromEvent(e);
  return (
    (which &&
      !e.ctrlKey &&
      String.fromCharCode(which).replace(/[^\x20-\x7E]/, '')) ||
    ''
  );
};

/**
 * Gives a list of query params
 * @param {string} search
 * @return {Object} URL query params converted into an object.
 */
export const getQueryParams = function(search = location.search) {
  if (isString(search)) {
    return search.slice(1) |> query2obj;
  }

  return {};
};
