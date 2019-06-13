import { assert } from 'chai';
import * as _Func from '../../../src/fe/implicit/_Func';

const {
  isTrue,
  isFalse,
  deepEqual: deep,
  notDeepEqual: notDeep,
  equal,
  throws,
  doesNotThrow,
  isUndefined,
} = assert;

describe('_Func', () => {
  describe('noop', () => {
    it('returns the same thing', () => {
      const x = _Func.noop(1);
      equal(x, 1);
    });
  });

  describe('setPrototype', () => {
    const MyClass = function(foo) {
      this.foo = foo;
    };

    const getFoo = function() {
      return this.foo;
    };

    it('prototype.getFoo does not initially exist', () => {
      isUndefined(MyClass.prototype.getFoo);
    });

    it('sets getFoo in prototype', () => {
      _Func.setPrototype(MyClass, {
        getFoo,
      });

      equal(typeof MyClass.prototype.getFoo, 'function');
    });
  });

  describe('propToFunction', () => {
    const context = {
      foo: () => 'bar',
    };
    const getMethod = _Func.propToFunction(_Func.noop);

    it('returns function when the name is given as a string', () => {
      const got = getMethod('foo', context);

      equal(got, context.foo);
    });

    it('returns function if the reference was passed', () => {
      const got = getMethod(context.foo);

      equal(got, context.foo);
    });
  });

  describe('ensureFunction', () => {
    const ensurer = _Func.ensureFunction(_Func.noop);

    it('does not throw error when a function is passed', () => {
      doesNotThrow(() => ensurer(_Func.noop));
    });

    it('throws TypeError when non-function is passed', () => {
      throws(() => ensurer(true), TypeError);
    });

    it('returns the value properly in case a function is passed', () => {
      const foo = 'foo';
      const ensurer = _Func.ensureFunction(() => foo);
      const ensured = ensurer(_Func.noop);

      equal(ensured, foo);
    });
  });

  describe('bind', () => {
    const mockedThis = {
      foo: 'bar',
    };

    function fn(arg) {
      return {
        _this: this,
        arg,
      };
    }

    const bound = _Func.bind(fn, mockedThis);

    it('changes the context of `this`', () => {
      const arg = '1234';
      const response = bound(arg);

      equal(response.arg, arg);
      equal(response._this, mockedThis);
    });
  });

  describe('invoke', () => {
    const functionsList = {
      sayHello: function(name) {
        return `Hello, ${name}`;
      },
    };

    const expected = 'Hello, Razorpay';

    it('invokes properly when the function reference is passed', () => {
      const said = _Func.invoke(functionsList.sayHello, 'Razorpay');

      equal(said, expected);
    });

    it('invokes properly when the function name is passed', () => {
      const said = _Func.invoke.call(functionsList, 'sayHello', 'Razorpay');

      equal(said, expected);
    });

    it('does not invoke in case a function is not provided', () => {
      let invoked = false;

      function fn() {
        invoked = true;

        return invoked;
      }

      const returned = _Func.invoke(1);

      isFalse(invoked);
      isUndefined(returned);
    });
  });

  describe('debounce', () => {
    function push(arr, item) {
      arr.push(item);
    }

    const debouncedPush = _Func.debounce(push, wait);
    const wait = 100;

    it('debounces properly in case of multiple invocations', function(done) {
      this.timeout(wait * 3);

      const expected = [4];
      const array = [];

      for (let i = 0; i < 5; i++) {
        debouncedPush(array, i);
      }

      setTimeout(() => {
        deep(array, expected);
        done();
      }, wait * 1.5);
    });

    it('debounces properly in case of single invocation', function(done) {
      this.timeout(wait * 3);

      const expected = [1];
      const array = [];

      debouncedPush(array, 1);

      setTimeout(() => {
        deep(array, expected);
        done();
      }, wait * 1.5);
    });
  });
});
