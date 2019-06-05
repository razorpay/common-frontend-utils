import { assert } from 'chai';
import * as _Str from '../src/fe/implicit/_Str';

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
      const hasPadding = arr[0] == ' ' && arr[arr.length - 1] == ' ';
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
    it('Check if a string is sliced for given indexes', () => {
      const str = 'hello testing';
      const from = 2;
      const to = 5;
      const sliced = _Str.slice(str, from, to);
      equal(sliced, 'llo');
    });
  });

  describe('sliceFrom', () => {
    it('Check if a string is sliced from a given index', () => {
      const str = 'hello testing';
      const from = 2;
      const sliced = _Str.sliceFrom(str, from);
      equal(sliced, 'llo testing');
    });
  });

  describe('startsWith', () => {
    it('Check if a string starts with a given substring', () => {
      const str = 'hello testing';
      const isStarting = _Str.startsWith(str, 'hello');
      isTrue(isStarting);
    });
  });
});
