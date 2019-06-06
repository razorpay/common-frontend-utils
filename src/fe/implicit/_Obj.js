import * as _ from './_';
import * as _Arr from './_Arr';
/**
 * Get keys of an object in an array.
 * @param {Object} o
 *
 * @returns {Array} Array of keys
 */
export const keys = o => Object.keys(o || {});

/**
 * Create a new object using an object and the given props.
 * @param {Object} obj
 * @param {Object} props
 *
 * @returns {Object} New object
 */
export const create = (obj, props) => Object.create(obj, props);

/**
 * Check if the object has any key value pairs or is empty
 * @param {Object} o
 *
 * @returns {boolean} Returns true or false if the object was empty or not
 */
export const isEmpty = o => !keys(o).length;

/**
 * Check if the object has a property
 * @param {Object} o
 * @param {string} prop
 *
 * @returns {boolean} Returns true or false if the object has the given property
 */
export const hasProp = _.curry2((o, prop) => prop in o);

/**
 * Check if the object has its own property
 * @param {Object} o
 * @param {string} prop
 *
 * @returns {boolean} Returns true or false if the object has the given as own property
 */
export const hasOwnProp = _.curry2((o, prop) => o && o.hasOwnProperty(prop));

/**
 * Check if the object has own property and return the value of that property
 * @param {Object} o
 * @param {string} prop
 *
 * @returns {*} Returns the value of the own property in the object
 */
export const getOwnProp = _.curry2((o, prop) => hasOwnProp(o, prop) && o[prop]);

/**
 * Set the property of the given object with the given value
 * @param {*} subject
 * @param {Object} o
 * @param {string} k
 *
 * @returns {*} Returns the updated object
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
 * @returns {Object} Returns updated object
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
 * @returns {Object} Returns updated object
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
 * @returns {Object} Returns updated object
 */
export const deleteProp = _.curry2((o, key) => {
  delete o[key];
  return o;
});

// remaining
export const loop = _.curry2((o, iteratee) => {
  _Arr.loop(keys(o), key => iteratee(o[key], key, o));
  return o;
});

/**
 * Map the properties of the object to the given condition recieved from the return value of the callback function
 * @param {Object} o
 * @param {string} key
 *
 * @returns {Object} Returns updated object
 */
export const map = _.curry2((o, iteratee) =>
  _Arr.reduce(
    keys(o),
    (obj, key) => setProp(obj, key, iteratee(o[key], key, o)),
    {}
  )
);
// {a: 2, b: 3} → map(x => 2*x) → {a: 4, b: 6}

/**
 * Loops on the object and works as a reducer function on its keys and values
 * @param {Object} o
 * @param {function} reducer
 * @param {*} initialValue
 *
 * @returns {*} Returns updated object
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
 * @param {Object} o
 *
 * @returns {string} Returns stringified object
 */
export const stringify = JSON.stringify;

/**
 * Parse a string into JSON
 * @param {string} string
 *
 * @returns {string} Returns parse object
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
 *
 * @returns {Object} Returns a cloned object
 */
export const clone = o => parse(stringify(o));

/**
 * Extend an object with the properties from the given object
 * @param {string} string
 *
 * @returns {string} Returns extended object
 */
export const extend = _.curry2((o, source) => {
  loop(source, (v, k) => (o[k] = v));
  return o;
});

/**
 * Unflattens the object by turning delimiters into nested object structure
 * @param {Object} o
 *
 * @returns {Object} Returns unflattened object
 */
export const unflatten = o => {
  const delimiter = '.';
  let result = {};

  loop(o, (val, key) => {
    // Remove square brackets and replace them with delimiter.
    key.replace(/\[([^[\]]+)\]/g, `${delimiter}$1`);

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
 *
 * @returns {Object} Returns flattened object
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
 * @returns {Array} Returns array with key,value pair's array of arrays
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
