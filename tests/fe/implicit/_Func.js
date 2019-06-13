import { assert } from 'chai';
import * as _Func from '../src/fe/implicit/_Func';

const {
  isTrue,
  isFalse,
  deepEqual: deep,
  notDeepEqual: notDeep,
  equal,
  throws,
  doesNotThrow,
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
      equal(typeof MyClass.prototype.getFoo, 'undefined');
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
      foo: 'bar',
    };
  });

  describe('ensureFunction', () => {
    const ensurer = _Func.ensureFunction(_Func.noop);
    it('does not throw error when a function is passed', () => {
      doesNotThrow(() => ensurer(_Func.noop));
    });

    it('throws TypeError when non-function is passed', () => {
      throws(() => ensurer(true), TypeError);
    });
  });
});
