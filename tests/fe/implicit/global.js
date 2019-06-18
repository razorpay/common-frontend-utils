import { assert } from 'chai';
import * as GLOBAL from '../../../src/fe/implicit/global.js';

const {
  isTrue,
  isFalse,
  deepEqual: deep,
  notDeepEqual: notDeep,
  equal,
} = assert;

describe('1', () => {
  describe('1', () => {
    it('Check if it returns object as truthy', () => {
      const obj = {};
      isTrue(GLOBAL.Boolean(obj));
    });

    it('Check if it returns true as truthy and false as falsy', () => {
      isTrue(GLOBAL.Boolean(true));
      isFalse(GLOBAL.Boolean(false));
    });
  });
});
