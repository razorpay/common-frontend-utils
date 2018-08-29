function logError() {
  console.error.apply(console, arguments);
}

// returns a partially applied function, awaiting for last parameter
export const curry2 = func =>
  function(arg1, arg2) {
    if (arguments.length < 2) {
      return primArg =>
        primArg === null ? null : func.call(null, primArg, arg1);
    }
    return func.call(null, arg1, arg2);
  };

export const curry3 = func =>
  function(arg1, arg2, arg3) {
    if (arguments.length < 3) {
      return primArg =>
        primArg === null ? null : func.call(null, primArg, arg1, arg2);
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

export const isType = ((x, type) => typeof x === type) |> curry2;
export const isBoolean = isType('boolean');
export const isNumber = isType('number');
export const isString = isType('string');
export const isFunction = isType('function');
export const isObject = isType('object');
export const isArray = Array.isArray;
export const isElement = o => isNonNullObject(o) && o.nodeType === 1;
export const isTruthy = o => o;

export const isNonNullObject = o => o !== null && isObject(o);
export const isEmptyObject = x => !lengthOf(Object.keys(x));

// create getProperty function based on keys
export const prop = curry2((obj, key) => obj && obj[key]);

export const lengthOf = prop('length');
export const prototypeOf = prop('prototype');

export const isExact = curry2((x, y) => x && x.constructor === y);
export const is = curry2((x, y) => x instanceof y);

export const pixelUnit = 'px';

export const now = Date.now;
export const random = Math.random;
export const floor = Math.floor;

// function utils
export const timeout = (func, delay) => {
  var timerId = setTimeout(func, delay || 0);
  return () => clearTimeout(timerId);
};

export const interval = (func, delay) => {
  var timerId = setInterval(func, delay || 0);
  return () => clearInterval(timerId);
};

// returns a function which tells elapsed time at that point
// on each subsequent invocation
export const timer = x => {
  var then = now();
  return x => now() - then;
};

export function rawError(description, field) {
  var errorObj = {
    description: String(description),
  };

  if (field) {
    errorObj.field = field;
  }

  return errorObj;
}

export function rzpError(description, field) {
  return { error: rawError(description, field) };
}

export function throwMessage(message) {
  throw new Error(message);
}

export const isBase64Image = src => /data:image\/[^;]+;base64/.test(src);

export function obj2query(obj) {
  // Sanity Check
  if (!isNonNullObject(obj)) {
    return '';
  }

  const objKeys = Object.keys(obj);
  const serializedArray = Array(lengthOf(objKeys));

  objKeys.forEach(
    (objKey, index) =>
      (serializedArray[index] =
        encodeURIComponent(objKey) + '=' + encodeURIComponent(obj[objKey]))
  );

  return serializedArray.join('&');
}

export function query2obj(string) {
  var obj = {};
  string.split(/=|&/).forEach((param, index, array) => {
    if (index % 2) {
      obj[array[index - 1]] = param;
    }
  });
  return obj;
}

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

//Return rgba value for hex color code
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

export const getKeyFromEvent = e =>
  is(e, Event) && (e.which || e.charCode || e.keyCode);

export const getCharFromEvent = e => {
  let which = getKeyFromEvent(e);
  return (
    (which &&
      !e.ctrlKey &&
      String.fromCharCode(which).replace(/[^\x20-\x7E]/, '')) ||
    ''
  );
};
