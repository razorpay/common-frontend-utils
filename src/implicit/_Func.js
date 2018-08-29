export const noop = _ => _;

const funcProto = _.prototypeOf(Function);

export const setPrototype = (constructor, proto) => {
  proto.constructor = constructor;
  constructor.prototype = proto;
  return constructor;
};

// facilitate this.func, if func is passed as string
// getMethod('close', window) → window.close
const propToFunction = func =>
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
