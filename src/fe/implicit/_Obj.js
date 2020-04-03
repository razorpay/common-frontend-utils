import * as _ from './_';
import * as _Arr from './_Arr';

/**
 * Get keys of an object in an array.
 * @param {Object} o
 *
 * @returns {Array}
 */
export const keys = o => Object.keys(o || {});

/**
 * Create a new object using an object and the given props.
 * @param {Object} obj
 * @param {Object} props
 *
 * @returns {Object}
 */
export const create = (obj, props) => Object.create(obj, props);

/**
 * Check if the object has any key value pairs or is empty
 * @param {Object} o
 *
 * @returns {boolean}
 */
export const isEmpty = o => !keys(o).length;

/**
 * Check if the object has a property
 * @param {Object} o
 * @param {string} prop
 *
 * @returns {boolean}
 */
export const hasProp = _.curry2((o, prop) => prop in o);

/**
 * Check if the object has its own property
 * @param {Object} o
 * @param {string} prop
 *
 * @returns {boolean}
 */
export const hasOwnProp = _.curry2((o, prop) => o && o.hasOwnProperty(prop));

/**
 * Check if the object has own property and return the value of that property
 * @param {Object} o
 * @param {string} prop
 *
 * @returns {*}
 */
export const getOwnProp = _.curry2((o, prop) => hasOwnProp(o, prop) && o[prop]);

/**
 * Set the property of the given object with the given value
 * @param {*} subject
 * @param {Object} o
 * @param {string} key
 *
 * @returns {*}
 */
export const setPropOf = _.curry3((subject, o, key) => {
  o[key] = subject;
  return subject;
});

/**
 * Set property of an object with the given key value pair
 * @param {Object} o
 * @param {string} key
 * @param {*} value
 *
 * @returns {Object}
 */
export const setProp = _.curry3((o, key, value) => {
  o[key] = value;
  return o;
});

/**
 * Set property of an object with the given key value pair only if the value is truthy
 * @param {Object} o
 * @param {string} key
 * @param {*} value
 *
 * @returns {Object}
 */
export const setTruthyProp = _.curry3((o, key, value) => {
  if (value) {
    o[key] = value;
  }
  return o;
});

/**
 * Delete a property/key of the given object
 * @param {Object} o
 * @param {string} key
 *
 * @returns {Object}
 */
export const deleteProp = _.curry2((o, key) => {
  delete o[key];
  return o;
});

/**
 * Loops through the object
 * @param {Object} o
 * @param {function (value: *, key: string, o: Object): void} iteratee
 *
 * @returns {Object}
 */
export const loop = _.curry2((o, iteratee) => {
  _Arr.loop(keys(o), key => iteratee(o[key], key, o));
  return o;
});

/**
 * Loops through the object and maps new value according to the iteratee function
 * @param {Object} o
 * @param {function (value: *, key: string, o: Object): void} iteratee
 * @example
 * {a: 2, b: 3} → map(x => 2*x) → {a: 4, b: 6}
 *
 * @returns {Object}
 */
export const map = _.curry2((o, iteratee) =>
  _Arr.reduce(
    keys(o),
    (obj, key) => setProp(obj, key, iteratee(o[key], key, o)),
    {}
  )
);

/**
 * Loops through the object and apply a reducer function on it
 * @param {Object} o
 * @param {function (accumulator:*,value: *, key: string, o: Object): void} reducer
 * @param {*} initialValue
 *
 * @returns {*}
 */
export const reduce = _.curry3((o, reducer, initialValue) =>
  _Arr.reduce(
    keys(o),
    (accumulator, key) => reducer(accumulator, o[key], key, o),
    initialValue
  )
);

/**
 * Stringify an object
 * @throws {TypeError} exception when a circular reference is found.
 * @param {Object} o
 *
 * @returns {string}
 */
export const stringify = JSON.stringify;

/**
 * Parse a string into JSON
 * @param {string} string
 *
 * @returns {Object}
 */
export const parse = string => {
  try {
    return JSON.parse(string);
  } catch (e) {
    console.error(e);
  }
};

/**
 * Clone an object from the previous object
 * @param {Obect} o
 * @throws {TypeError} Will throw an exception if the object to clone is circular.
 *
 * @returns {Object}
 */
export const clone = o => parse(stringify(o));

/**
 * Extend an object with the properties from the given object
 * @param {Object} o
 * @param {Object} source
 *
 * @returns {Object}
 */
export const extend = _.curry2((o, source) => {
  loop(source, (v, k) => (o[k] = v));
  return o;
});

/**
 * Unflattens the object by turning delimiters into nested object structure
 * @param {Object} o
 *
 * @returns {Object}
 */
export const unflatten = o => {
  const delimiter = '.';
  let result = {};

  loop(o, (val, key) => {
    // Remove square brackets and replace them with delimiter.
    key = key.replace(/\[([^[\]]+)\]/g, `${delimiter}$1`);

    const keys = key.split(delimiter);
    let _r = result;

    _Arr.loop(keys, (k, i) => {
      /**
       * For all keys except the last, create objects and set to _r.
       * For the last key, set the value in _r.
       */
      if (i < keys.length - 1) {
        if (!_r[k]) {
          _r[k] = {};
        }

        _r = _r[k];
      } else {
        _r[k] = val;
      }
    });
  });

  return result;
};

/**
 * Flattens the object by turning nested object into object with delimitters in the keys
 * @param {Object} o
 * @param {string} prefix [prefix='']
 *
 * @returns {Object}
 */
export const flatten = (o, prefix = '') => {
  const result = {};
  loop(o, (val, key) => {
    const flattenedKey = prefix ? `${prefix}.${key}` : key;

    if (_.isNonNullObject(val)) {
      extend(result, flatten(val, flattenedKey));
    } else {
      result[flattenedKey] = val;
    }
  });
  return result;
};

/**
 * Returns an array with subarrays consisting of key and value pairs
 * @param {Object} o
 *
 * @returns {Array}
 */
export const entries = o => {
  const list = [];

  if (!_.isNonNullObject(o)) {
    return list;
  }

  loop(o, (val, key) => {
    list.push([key, val]);
  });

  return list;
};

/**
 * Returns an array with the values of the object
 * @param {Object} o
 *
 * @returns {Array}
 */
export const values = o => {
  const list = [];

  if (!_.isNonNullObject(o)) {
    return list;
  }

  loop(o, val => list.push(val));

  return list;
};

/**
 * Returns the value at a path if value exists and is not undefined,
 * otherwise returns the default value
 *
 * @param {Object} object
 * @param {string} path
 * @param {*} defaultValue
 *
 * @returns {*}
 */
export const getSafely = (object, path, defaultValue = undefined) => {
  const points = path.split('.');
  let anchor = object;

  for (let i = 0; i < points.length; i++) {
    try {
      const item = anchor[points[i]];

      // Continue only if non-primitive or string
      if (_.isPrimitive(item) && !_.isString(item)) {
        const isLastInPath = i === points.length - 1;

        // If the item is the last item in the path,
        // this is what the user is looking for.
        // If it's not the last item in the path,
        // we need to proceed. But because we're
        // looking at a primitive data-type, we can't
        // proceed. So, we return the default value.
        if (isLastInPath) {
          // Return default value if item was undefined.
          if (typeof item === 'undefined') {
            return defaultValue;
          }
          return item;
        } else {
          return defaultValue;
        }
      }

      anchor = item;
    } catch (err) {
      return defaultValue;
    }
  }

  return anchor;
};
