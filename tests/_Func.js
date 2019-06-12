import { assert } from 'chai';
import * as _Func from '../src/fe/implicit/_Func';

const {
  isTrue,
  isFalse,
  deepEqual: deep,
  notDeepEqual: notDeep,
  equal,
} = assert;

describe('_Func', () => {
  // remaining
  //   describe('setPrototype', () => {
  //     it('Check if it sets the prototype correctly', (done) => {
  //         const func=()=>{
  //             done();
  //         }
  //           setTimeout(()=>{
  //             func()
  //           },500);

  //       _Func.debounce(func,2000);
  //     });
  //   });

  describe('debounce', () => {
    it('Check if debounce executes on a function correctly', done => {
      const func = () => {
        done();
      };
      setTimeout(() => {
        func();
      }, 500);
      _Func.debounce(func, 2000);
    });
  });

  describe('ensureFunction', () => {
    it('Ensure if the given argument is a function', () => {
      const func = function() {
        return true;
      };
      const isFunc = _Func.ensureFunction(func)(func);
      isTrue(isFunc);
    });

    it('Ensure if the given argument is not function', () => {
      const func = 'test';
      const isFunc = _Func.ensureFunction(() => null)('test');
      isFalse(isFunc);
    });
  });

  describe('bind', () => {
    it('Check if bind executes correctly', function() {
      this.testing = 'test-text';
      const expected = 'test-text';
      const fun = function() {
        return this.testing;
      };
      const binded = _Func.bind(fun, this);
      equal(binded(), expected);
    });
  });

  describe('invoke', () => {
    it('Check if it invokes the function when passed as a function', done => {
      const func = function() {
        done();
      };
      _Func.invoke(func);
    });

    // it('Check if it invokes the function when passed as a string', (done) => {
    //     const func=function(){
    //             done();
    //     }
    //     _Func.invoke('invoke');
    // });
  });
});
