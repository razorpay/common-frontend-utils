import { assert } from 'chai';
import * as _Str from '../../../src/fe/implicit/_Str';

const {
  isTrue,
  isFalse,
  deepEqual: deep,
  notDeepEqual: notDeep,
  equal,
} = assert;

describe('_Str', () => {
  describe('pad', () => {
    it('Check padding on both sides', () => {
      const arr = _Str.pad('test').split('');
      const hasPadding = arr[0] === ' ' && arr[arr.length - 1] === ' ';
      isTrue(hasPadding);
    });
  });

  describe('contains', () => {
    it('Check if a string contains a substring', () => {
      const str = 'hello world';
      const substr = 'world';
      const contains = _Str.contains(str, substr);
      isTrue(contains);
    });

    it('Check if a string does not contain a substring', () => {
      const str = 'hello world';
      const substr = 'world1';
      const contains = _Str.contains(str, substr);
      isFalse(contains);
    });
  });

  describe('slice', () => {
    it('Check if a string is sliced for correct indexes', () => {
      const str = 'hello testing';
      const from = 2;
      const to = 5;
      const sliced = _Str.slice(str, from, to);
      const expected = 'llo';
      equal(sliced, expected);
    });

    it('Check if a string is sliced from negative index to index more than the string length', () => {
      const str = 'hello testing';
      const from = -2;
      const to = 30;
      const sliced = _Str.slice(str, from, to);
      const expected = 'ng';
      equal(sliced, expected);
    });
  });

  describe('sliceFrom', () => {
    it('Check if a string is sliced from a given index', () => {
      const str = 'hello testing';
      const from = 2;
      const sliced = _Str.sliceFrom(str, from);
      const expected = 'llo testing';
      equal(sliced, expected);
    });
    it('Check if a string is sliced from a given negative index', () => {
      const str = 'hello testing';
      const from = -5;
      const sliced = _Str.sliceFrom(str, from);
      const expected = 'sting';
      equal(sliced, expected);
    });
  });

  describe('startsWith', () => {
    it('Check if a string starts with a given substring', () => {
      const str = 'hello testing';
      const isStarting = _Str.startsWith(str, 'hello');
      isTrue(isStarting);
    });

    it('Check if a string does not start with a given substring', () => {
      const str = 'hello testing';
      const isStarting = _Str.startsWith(str, 'test');
      isFalse(isStarting);
    });
  });

  describe('endsWith', () => {
    it('Checks if a string ends with a given substring', () => {
      const str = 'Razorpay';
      const ends = _Str.endsWith(str, 'pay');

      isTrue(ends);
    });

    it('Checks if a string does not end with a given string', () => {
      const str = 'Razorpay';
      const ends = _Str.endsWith(str, 'payments');

      isFalse(ends);
    });
  });

  describe('toTitleCase', () => {
    it('Converts a completely lowercase word to title case', () => {
      const word = 'razorpay';
      const expected = 'Razorpay';

      equal(expected, _Str.toTitleCase(word));
    });

    it('Converts a completely uppercase word to title case', () => {
      const word = 'RAZORPAY';
      const expected = 'Razorpay';

      equal(expected, _Str.toTitleCase(word));
    });

    it('Keeps a title case word as-is', () => {
      const word = 'Razorpay';
      const expected = 'Razorpay';

      equal(expected, _Str.toTitleCase(word));
    });

    it('Converts a completely lowercase sentence to title case', () => {
      const word = 'i am a test';
      const expected = 'I Am A Test';

      equal(expected, _Str.toTitleCase(word));
    });

    it('Converts a completely uppercase sentence to title case', () => {
      const word = 'I AM A TEST';
      const expected = 'I Am A Test';

      equal(expected, _Str.toTitleCase(word));
    });

    it('Keeps a title case sentence as-is', () => {
      const word = 'I Am A Test';
      const expected = 'I Am A Test';

      equal(expected, _Str.toTitleCase(word));
    });

    it('does not do anything to an empty string', () => {
      const emptyString = '';

      equal(emptyString, _Str.toTitleCase(emptyString));
    });

    it('handles strings with multiple consecutive spaces', () => {
      const stringWithMulitpleSpaces =
        'this  is    a string WITH multiple Spaces';
      const expected = 'This  Is    A String With Multiple Spaces';

      equal(expected, _Str.toTitleCase(stringWithMulitpleSpaces));
    });
  });
});
