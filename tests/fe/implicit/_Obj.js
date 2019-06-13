import { assert } from 'chai';
import * as _Obj from '../../../src/fe/implicit/_Obj';

const {
  isTrue,
  isFalse,
  deepEqual,
  notDeepEqual: notDeep,
  equal,
  throws,
} = assert;

describe('_Obj', () => {
  describe('keys', () => {
    it('Get keys of the object', () => {
      const obj = {
        a: 1,
        b: 2,
      };
      const keys = _Obj.keys(obj);
      const expected = ['a', 'b'];
      deepEqual(keys, expected);
    });

    it('Get keys of a blank object', () => {
      const obj = {};
      const keys = _Obj.keys(obj);
      const expected = [];
      deepEqual(keys, expected);
    });
  });

  describe('create', () => {
    it('Check if it creates new object with no props as argument', () => {
      const obj = {
        a: 1,
        b: 2,
      };
      const newObj = _Obj.create(obj);
      isTrue(_Obj.isEmpty(newObj));
    });

    it('Check if it creates new object with props as argument', () => {
      const food = { fruit: 'apple' };
      const more_food = Object.create(food, {
        vegetable: { value: 'celery' },
      });
      isTrue(more_food.fruit === 'apple');
    });
  });

  describe('isEmpty', () => {
    it('Check if the object is empty', () => {
      const obj = {};
      const isEmpty = _Obj.isEmpty(obj);
      isTrue(isEmpty);
    });

    it('Check if the object is not empty', () => {
      const obj = { test: 1 };
      const isEmpty = _Obj.isEmpty(obj);
      isFalse(isEmpty);
    });
  });

  describe('hasProp', () => {
    it('Check if it has given property on the object', () => {
      const obj = { a: 1 };
      const hasProp = _Obj.hasProp(obj, 'a');
      isTrue(hasProp);
    });
    it('Check if it says false if no property found', () => {
      const obj = { a: 1 };
      const hasProp = _Obj.hasProp(obj, 'b');
      isFalse(hasProp);
    });
  });

  describe('hasOwnProp', () => {
    it('Check if it correctly checks it has own prop', () => {
      const obj = { a: 1 };
      const hasOwnProp = _Obj.hasOwnProp(obj, 'a');
      isTrue(hasOwnProp);
    });

    it('Check if it correctly checks it does not have own prop', () => {
      const obj = { a: 1 };
      const hasOwnProp = _Obj.hasOwnProp(obj, 'b');
      isFalse(hasOwnProp);
    });
  });

  describe('getOwnProp', () => {
    it('Check if it gets its own prop', () => {
      const obj = { a: 1 };
      const ownProp = _Obj.getOwnProp(obj, 'a');
      const expected = 1;
      isTrue(ownProp === expected);
    });

    it('Check if it correctly checks it does not have own prop', () => {
      const obj = { a: 1 };
      const hasOwnProp = _Obj.hasOwnProp(obj, 'b');
      isFalse(hasOwnProp);
    });
  });

  describe('setPropOf', () => {
    it('Check if it correctly sets the prop', () => {
      const obj = { a: 1 };
      const obj2 = { b: 1 };
      const expected = { b: 1, c: { a: 1 } };
      _Obj.setPropOf(obj, obj2, 'c');
      deepEqual(obj2, expected);
    });
  });

  describe('setProp', () => {
    it('Check if it sets the property on the object', () => {
      const obj = { a: 1 };
      _Obj.setProp(obj, 'b', 2);
      const expected = { a: 1, b: 2 };
      deepEqual(obj, expected);
    });
  });

  describe('setTruthyProp', () => {
    it('Check if it sets the truthy property on the object', () => {
      const obj = { a: 1 };
      _Obj.setTruthyProp(obj, 'b', 2);
      const expected = { a: 1, b: 2 };
      deepEqual(expected, obj);
    });

    it('Check if it does not set untruthy property on the object', () => {
      const obj = { a: 1 };
      _Obj.setTruthyProp(obj, 'b', 0);
      const expected = { a: 1 };
      deepEqual(expected, obj);
    });
  });

  describe('deleteProp', () => {
    it('Check if it deleted a property on the object', () => {
      const obj = { a: 1, b: 1 };
      _Obj.deleteProp(obj, 'b');
      equal(typeof obj.b, 'undefined');
    });

    it('Check if it does not delete any other property on the object', () => {
      const obj = { a: 1, b: 1 };
      _Obj.deleteProp(obj, 'b');
      equal(obj.a, 1);
    });
  });

  describe('loop', () => {
    it('Check if it loops on the object', () => {
      const obj = { a: 1, b: 1, c: 4 };
      const arr = [];
      _Obj.loop(obj, k => {
        arr.push(k);
      });
      const expected = [1, 1, 4];
      deepEqual(expected, arr);
    });
  });

  describe('map', () => {
    it('Check if it correctly maps the object and returns an object', () => {
      const obj = { a: 1, b: 1 };
      const mappedObj = _Obj.map(obj, k => k * 3);
      deepEqual(mappedObj, { a: 3, b: 3 });
    });
  });

  describe('reduce', () => {
    const reducer = (accumulator, currentValue) => {
      return accumulator + currentValue;
    };
    it('Check if it correctly reduces the object and returns a value', () => {
      const obj = { a: 1, b: 1 };
      const reduced = _Obj.reduce(obj, reducer, 3);
      isTrue(reduced === 5);
    });

    it('Check if it correctly reduces the blank object and returns a value', () => {
      const obj = {};
      const reduced = _Obj.reduce(obj, reducer, 3);
      isTrue(reduced === 3);
    });
  });

  describe('stringify', () => {
    it('Check if it correctly stringifies an object', () => {
      const obj = _Obj.parse(_Obj.stringify({ a: 1 }));
      const expected = { a: 1 };
      deepEqual(obj, expected);
    });

    it('Check if it throws an exception on circular object', () => {
      throws(
        () => {
          const test = { a: 1 };
          test.b = test;
          const stringified = _Obj.stringify(test);
        },
        TypeError,
        'Converting circular structure to JSON'
      );
    });
  });

  describe('parse', () => {
    it('Check if it correctly parses a stringified object', () => {
      const obj = _Obj.parse(_Obj.stringify({ a: 1 }));
      const expected = { a: 1 };
      deepEqual(obj, expected);
    });

    it('Check if it throws error for invalid JSON', () => {
      const obj = _Obj.parse('{something');
      equal(typeof obj, 'undefined');
    });
  });

  describe('clone', () => {
    it('Check if it correctly clones an object', () => {
      const obj = { a: 1 };
      const obj2 = _Obj.clone(obj);
      deepEqual(obj, obj2);
    });

    it('Check if it correctly clones an object and has no reference to previous object', () => {
      const obj = { a: 1 };
      const obj2 = _Obj.clone(obj);
      isTrue(obj !== obj2);
    });

    it('Check if it throws error if passed invalid json', () => {
      const obj = undefined;
      const obj2 = _Obj.clone(obj);
      equal(typeof obj2, 'undefined');
    });

    it('throws TypeError if the object to clone is circular', () => {
      throws(() => {
        const x = {
          foo: 'bar',
        };

        const circular = {
          x: x,
        };

        x.circular = circular;

        const cloned = _Obj.clone(circular);
      }, TypeError);
    });
  });

  describe('extend', () => {
    it('Check if it correctly extends an object', () => {
      const obj = { a: 1 };
      const expected = { a: 1, b: 1 };
      const obj2 = _Obj.extend(obj, { b: 1 });
      deepEqual(obj2, expected);
    });
  });

  describe('unflattens', () => {
    it('Check if it correctly unflattens an object', () => {
      const obj = { 'a.b': 1 };
      const obj2 = _Obj.unflatten(obj);
      const expected = { a: { b: 1 } };
      deepEqual(obj2, expected);
    });
  });

  describe('flattens', () => {
    it('Check if it correctly flattens an object', () => {
      const obj = { a: { b: 1 } };
      const obj2 = _Obj.flatten(obj);
      const expected = { 'a.b': 1 };
      deepEqual(obj2, expected);
    });
  });

  describe('entries', () => {
    it('Check if it correctly gets entries of the object', () => {
      const obj = { a: 1, b: 2 };
      const entries = _Obj.entries(obj);
      deepEqual(entries, [['a', 1], ['b', 2]]);
    });

    it('Check if it correctly gets entries of a blank object', () => {
      const obj = null;
      const entries = _Obj.entries(obj);
      deepEqual(entries, []);
    });
  });
});
