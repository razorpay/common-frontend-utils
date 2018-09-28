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

export const unflatten = (o, delimiter = '.') => {
  let result = {};

  loop(o, (val, key) => {
    const keys = key.split(delimiter);

    _Arr.reduce(
      keys,
      (r, e, j) => {
        return (
          r[e] ||
          (r[e] = global.isNaN(Number(keys[j + 1]))
            ? keys.length - 1 === j
              ? o[key]
              : {}
            : [])
        );
      },
      result
    );
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
