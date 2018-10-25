export const keys = o => Object.keys(o || {});
export const create = (obj, props) => Object.create(obj, props);
export const isEmpty = o => !keys(o).length;
export const hasProp = _.curry2((o, prop) => prop in o);
export const hasOwnProp = _.curry2((o, prop) => o && o.hasOwnProperty(prop));
export const getOwnProp = _.curry2((o, prop) => hasOwnProp(o, prop) && o[prop]);

export const setPropOf = _.curry3((subject, o, key) => {
  o[key] = subject;
  return subject;
});

export const setProp = _.curry3((o, key, value) => {
  o[key] = value;
  return o;
});

export const setTruthyProp = _.curry3((o, key, value) => {
  if (value) {
    o[key] = value;
  }
  return o;
});

export const deleteProp = _.curry2((o, key) => {
  delete o[key];
  return o;
});

export const loop = _.curry2((o, iteratee) => {
  _Arr.loop(keys(o), key => iteratee(o[key], key, o));
  return o;
});

// {a: 2, b: 3} → map(x => 2*x) → {a: 4, b: 6}
export const map = _.curry2((o, iteratee) =>
  _Arr.reduce(
    keys(o),
    (obj, key) => setProp(obj, key, iteratee(o[key], key, o)),
    {}
  )
);

export const reduce = _.curry3((o, reducer, initialValue) =>
  _Arr.reduce(
    keys(o),
    (accumulator, key) => reducer(accumulator, o[key], key, o),
    initialValue
  )
);

export const stringify = JSON.stringify;

export const parse = string => {
  try {
    return JSON.parse(string);
  } catch (e) {
    console.error(e);
  }
};

export const clone = o => parse(stringify(o));

export const extend = _.curry2((o, source) => {
  loop(source, (v, k) => (o[k] = v));
  return o;
});

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
 * Returns the value of a nested property safely,
 * removing the need to sprinkle try-catch blocks in your code.
 * 
 * @param {Object} o
 * @param {String} key
 * 
 * @return {Any}
 */
export const getValueSafely = _.curry2((o, key) => {
  // Remove square brackets and inverted commas and replace them with dots.
  key = key.replace(/\[[\'\"]?([^[\]\'\"]+)[\'\"]?\]/g, '.$1');
  
  return flatten(o)[key];
});
