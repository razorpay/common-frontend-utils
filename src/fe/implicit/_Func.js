import * as _ from './_';

/**
 * Returns whatever is passed to it,
 * without doing anything at all.
 * @param {*} _
 *
 * @returns {*} _
 */
export const noop = _ => _;

const funcProto = _.prototypeOf(Function);

/**
 * Adds prototypes to the given constructor.
 * @param {Function} constructor Constructor
 * @param {Object} proto Prototype object
 *
 * @return {Function} constructor
 */
export const setPrototype = (constructor, proto) => {
  proto.constructor = constructor;
  constructor.prototype = proto;
  return constructor;
};

/**
 * Facilitate this.func, if func is passed as string
 * Example: getMethod('close', window) → window.close
 * @param {*} func
 *
 * @return {function(prop: string, context: Object): *}
 */
export const propToFunction = func =>
  function(prop, context) {
    let args = arguments;
    if (_.isString(prop)) {
      args = _Arr.sliceFrom(args, 0);
      args[0] = context[prop];
    }
    return func.apply(null, args);
  };

export const ensureFunction = func =>
  function(subject) {
    if (_.isFunction(subject)) {
      return func.apply(null, arguments);
    } else {
      throw new TypeError('not a function');
    }
  };

export const bind =
  ((func, context) => {
    return func.bind(context);
  })
  |> ensureFunction
  |> propToFunction
  |> _.curry2;

export const invoke = function(func) {
  try {
    if (_.isString(func)) {
      func = this[func];
    }
    return func.apply(this, arguments |> _Arr.sliceFrom(1));
  } catch (e) {
    _.logError(e);
  }
};

export const debounce = (func, wait) => {
  var timerId, args, context, timerFn, result;

  var later = function() {
    var last = timerFn();

    if (last < wait && last >= 0) {
      timerId = _.timeout(later, wait - last);
    } else {
      timerId = null;
      result = func.apply(context, args);
      if (!timerId) context = args = null;
    }
  };

  return function() {
    context = this;
    args = arguments;
    timerFn = _.timer();
    if (!timerId) timerId = _.timeout(later, wait);
    return result;
  };
};
