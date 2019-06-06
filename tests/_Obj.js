import { assert } from 'chai';
import * as _Obj from '../src/fe/implicit/_Obj';

const {
  isTrue,
  isFalse,
  deepEqual: deep,
  notDeepEqual: notDeep,
  equal,
} = assert;

describe('_Obj', () => {
  describe('keys', () => {
    it('Get keys of the object', () => {
      const obj = {
        a: 1,
        b: 2,
      };
      const keys = _Obj.keys(obj);
      const isCorrect = keys[0] == 'a' && keys[1] == 'b';
      isTrue(isCorrect);
    });
  });

  describe('create', () => {
    it('Check if it creates new object', () => {
      const obj = {
        a: 1,
        b: 2,
      };
      const newObj = _Obj.create(obj);
      // console.log(newObj, 'new')
      isTrue(_Obj.isEmpty(newObj));
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
  });

  describe('setProp', () => {
    it('Check if it sets the property on the object', () => {
      const obj = { a: 1 };
      _Obj.setProp(obj, 'b', 2);
      isTrue(obj.b == 2);
    });
  });

  describe('loop', () => {
    it('Check if it loops properly on the object', () => {
      const obj = { a: 1, b: 1, c: 4 };
      const arr = [];
      _Obj.loop(obj, k => {
        arr.push(k);
      });
      const isLoopWorking = arr[0] == 1 && arr[1] == 1 && arr[2] == 4;
      isTrue(isLoopWorking);
    });
  });

  describe('setTruthyProp', () => {
    it('Check if it sets the truthy property on the object', () => {
      const obj = { a: 1 };
      _Obj.setProp(obj, 'b', 2);
      isTrue(obj.b == 2);
    });

    it('Check if it does not set untruthy property on the object', () => {
      const obj = { a: 1 };
      _Obj.setProp(obj, 'b', false);
      isFalse(obj.b);
    });
  });

  describe('deleteProp', () => {
    it('Check if it deleted a property on the object', () => {
      const obj = { a: 1, b: 1 };
      _Obj.deleteProp(obj, 'b');
      isTrue(obj.b === undefined);
    });
  });

  describe('map', () => {
    it('Check if it correctly maps the object and returns an object', () => {
      const obj = { a: 1, b: 1 };
      const mappedObj = _Obj.map(obj, k => k * 3);
      isTrue(mappedObj.a == 3 && mappedObj.b == 3);
    });
  });

  describe('stringify', () => {
    it('Check if it correctly stringifies an object', () => {
      const obj = _Obj.parse(_Obj.stringify({ a: 1 }));
      isTrue(obj.a == 1);
    });
  });

  describe('parse', () => {
    it('Check if it correctly parses an stringified object', () => {
      const obj = _Obj.parse(_Obj.stringify({ a: 1 }));
      isTrue(obj.a == 1);
    });
  });

  describe('clone', () => {
    it('Check if it correctly clones a stringified object', () => {
      const obj = { a: 1 };
      const obj2 = _Obj.clone(obj);
      isTrue(obj !== obj2 && obj.a == obj2.a);
    });
  });

  describe('extend', () => {
    it('Check if it correctly extends an object', () => {
      const obj = { a: 1 };
      const obj2 = _Obj.extend(obj, { b: 1 });
      isTrue(obj2.a == 1 && obj2.b == 1);
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
      isTrue(ownProp === 1);
    });

    it('Check if it correctly checks it does not have own prop', () => {
      const obj = { a: 1 };
      const hasOwnProp = _Obj.hasOwnProp(obj, 'b');
      isFalse(hasOwnProp);
    });
  });

  describe('hasProp', () => {
    it('Check if it correctly checks it has prop', () => {
      const obj = { a: 1 };
      const hasOwnProp = _Obj.hasOwnProp(obj, 'a');
      isTrue(hasOwnProp);
    });

    it('Check if it correctly checks it does not have prop', () => {
      const obj = { a: 1 };
      const hasOwnProp = _Obj.hasOwnProp(obj, 'b');
      isFalse(hasOwnProp);
    });
  });

  describe('setPropOf', () => {
    it('Check if it correctly sets the prop', () => {
      const obj = { a: 1 };
      const obj2 = { b: 1 };
      _Obj.setPropOf(obj, obj2, 'c');
      isTrue(obj2.c.a === 1);
    });
  });

  describe('flattens', () => {
    it('Check if it correctly flattens an object', () => {
      const obj = { a: { b: 1 } };
      const obj2 = _Obj.flatten(obj);
      isTrue(obj2['a.b'] == 1);
    });
  });

  describe('entries', () => {
    it('Check if it correctly gets entries of the object', () => {
      const obj = { a: 1, b: 2 };
      const entries = _Obj.entries(obj);
      isTrue(
        entries[0][0] == 'a' &&
          entries[0][1] == 1 &&
          entries[1][0] == 'b' &&
          entries[1][1] == 2
      );
    });
  });
});
