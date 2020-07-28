import * as _ from './_';
import * as _Arr from './_Arr';

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
 * @returns {Function} constructor
 */
export const setPrototype = (constructor, proto) => {
  proto.constructor = constructor;
  constructor.prototype = proto;
  return constructor;
};

/**
 * Facilitate this.func, if func is passed as string.
 * Returns `func(prop, context)` if `prop` is a function.
 * Returns `func(context[prop], context)` if `props` is a string.
 * @param {Function} func
 *
 * @returns {function (prop: (string|Function), context: Object): *} x
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

/**
 * Invokes `func` only if `subject` is a function.
 * @param {Function} func
 *
 * @returns {function (subject: Function): *}
 */
export const ensureFunction = func =>
  function(subject) {
    if (_.isFunction(subject)) {
      return func.apply(null, arguments);
    } else {
      throw new TypeError('not a function');
    }
  };

/**
 * Binds the context of `this` to a function,
 * and returns a new function with the bound context.
 * @param {Function} func
 * @param {*} context
 *
 * @returns {Function}
 */
export const bind =
  ((func, context) => {
    return func.bind(context);
  })
  |> ensureFunction
  |> propToFunction
  |> _.curry2;

/**
 * Invokes a function with the given arguments.
 * If `func` is a string, this[func] will be considered
 * as the desired function.
 * @param {Function|string} func
 *
 * @return {*}
 */
export const invoke = function(func) {
  try {
    if (_.isString(func)) {
      func = this[func];
    }
    return func.apply(this, arguments |> _Arr.sliceFrom(1));
  } catch (e) {
    _.logError(e);
    global.dispatchEvent(
      _.CustomEvent('rzp_error', {
        detail: e,
      })
    );
  }
};

/**
 * Creates and returns a debounced version of the function.
 * @param {Function} func
 * @param {number} wait
 *
 * @returns {Function}
 */
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

/**
 * Returns a negated version of a function, i.e. if the original function
 * returned true, the negated function returns false.
 *
 * @param fn {function(*): any}
 * @return {function(*): boolean}
 */
export const negate = fn => {
  return function negated() {
    return !fn.apply(this, arguments);
  };
};
