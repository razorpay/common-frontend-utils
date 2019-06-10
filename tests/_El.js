var expect = require('chai').expect;
import * as _El from '../src/fe/implicit/_El';
import { assert } from 'chai';
const {
  isTrue,
  isFalse,
  deepEqual: deep,
  notDeepEqual: notDeep,
  equal,
} = assert;

describe('_EL', function() {
  describe('create', () => {
    it('creates an element', function() {
      const img = document.createElement('img');
      const expected = 'IMG';
      equal(img.nodeName, expected);
    });
  });

  describe('parent', () => {
    it('Gets the parent element', function() {
      const div = _El.create('div');
      const img = _El.create('img');
      const expected = 'DIV';
      div.appendChild(img);
      const parent = _El.parent(img);
      equal(parent.nodeName, expected);
    });
  });
});
