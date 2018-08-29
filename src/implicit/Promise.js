const rejectFn = e => console.warn('Promise error:', e);
const isPromise = p => _.is(p, Promise);

function Promise(fn) {
  if (!isPromise(this)) throw 'new Promise';

  _Func.ensureFunction(fn);
  /** @type {!number} */
  this._state = 0;
  /** @type {!boolean} */
  this._handled = false;
  /** @type {Promise|undefined} */
  this._value = undefined;
  /** @type {!Array<!Function>} */
  this._deferreds = [];

  doResolve(fn, this);
}

function handle(self, deferred) {
  while (self._state === 3) {
    self = self._value;
  }
  if (self._state === 0) {
    self._deferreds.push(deferred);
    return;
  }
  self._handled = true;
  setTimeout(function() {
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
      return;
    }
    var ret;
    try {
      ret = cb(self._value);
    } catch (e) {
      reject(deferred.promise, e);
      return;
    }
    resolve(deferred.promise, ret);
  });
}

function resolve(self, newValue) {
  try {
    // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === self) throw new TypeError('promise resolved by itself');
    if (_.isNonNullObject(newValue) || _.isFunction(newValue)) {
      var then = newValue.then;
      if (isPromise(newValue)) {
        self._state = 3;
        self._value = newValue;
        finale(self);
        return;
      } else if (_.isFunction(then)) {
        doResolve(_Func.bind(then, newValue), self);
        return;
      }
    }
    self._state = 1;
    self._value = newValue;
    finale(self);
  } catch (e) {
    reject(self, e);
  }
}

function reject(self, newValue) {
  self._state = 2;
  self._value = newValue;
  finale(self);
}

function finale(self) {
  if (self._state === 2 && self._deferreds.length === 0) {
    setTimeout(function() {
      if (!self._handled) {
        rejectFn(self._value);
      }
    });
  }

  self._deferreds |> _Arr.loop(v => handle(self, v));
  self._deferreds = null;
}

/**
 * @constructor
 */
function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = _.isFunction(onFulfilled) ? onFulfilled : null;
  this.onRejected = _.isFunction(onRejected) ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, self) {
  var done = false;
  try {
    fn(
      function(value) {
        if (done) return;
        done = true;
        resolve(self, value);
      },
      function(reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      }
    );
  } catch (ex) {
    if (done) return;
    done = true;
    reject(self, ex);
  }
}

Promise.prototype
  |> _Obj.extend({
    catch: function(onRejected) {
      return this.then(null, onRejected);
    },

    then: function(onFulfilled, onRejected) {
      var prom = new Promise(_Func.noop);
      handle(this, new Handler(onFulfilled, onRejected, prom));
      return prom;
    },

    finally: function(callback) {
      return this.then(
        value => Promise.resolve(callback().then(() => value)),
        reason => Promise.resolve(callback().then(() => Promise.reject(reason)))
      );
    }
  });

Promise.all = function(args) {
  return new Promise(function(resolve, reject) {
    if (!args || typeof args.length === 'undefined')
      throw new TypeError('Promise.all accepts an array');

    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    args
      |> _Arr.loop(function res(val, i) {
        try {
          if (_.isNonNullObject(val) || _.isFunction(val)) {
            if (_.isFunction(val.then)) {
              return val.then(val => res(val, i), reject);
            }
          }
          args[i] = val;
          if (--remaining === 0) {
            resolve(args);
          }
        } catch (ex) {
          reject(ex);
        }
      });
  });
};

Promise.resolve = val => (isPromise(val) ? val : new Promise(res => res(val)));

Promise.reject = value => new Promise((resolve, reject) => reject(value));

Promise.race = values =>
  new Promise(
    (resolve, reject) => values |> _Arr.loop(v => v.then(resolve, reject))
  );

const globalPromise = global.Promise;
const PromiseRuntime =
  (globalPromise &&
    _.isFunction(_.prototypeOf(globalPromise).then) &&
    globalPromise) ||
  Promise;

export default PromiseRuntime;
