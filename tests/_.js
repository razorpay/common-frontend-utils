import { assert } from 'chai';
import * as _ from '../src/fe/implicit/_';
import * as _El from '../src/fe/implicit/_El';

const {
  isTrue,
  isFalse,
  deepEqual: deep,
  notDeepEqual: notDeep,
  equal,
} = assert;

describe('_', () => {
  //   describe('isType', () => {
  //     it('Check if it works correctly', () => {
  //       const obj={};
  //       const type = typeof obj;
  //       const expected='object';
  //       console.log(_.isType(type,expected),'wirks',type)
  //       isTrue(_.isType(type,expected));
  //     });
  // })

  describe('isElement', () => {
    it('Check if it is return true element is an element or not', () => {
      const div = _El.create('div');
      isTrue(_.isElement(div));
    });

    it('Check if it is return false, object is not an element or not', () => {
      const obj = { test: 'test' };
      isFalse(_.isElement(obj));
    });

    it('Check if it is return false, null is not an element or not', () => {
      isFalse(_.isElement(null));
    });
  });

  describe('isTruthy', () => {
    it('Check if it says empty string is falsy', () => {
      const obj = '';
      isFalse(_.isTruthy(obj));
    });

    it('Check if it says empty object is truthy', () => {
      const obj = {};
      isTrue(_.isTruthy(obj));
    });

    it('Check if it says null is falsy', () => {
      const obj = null;
      isFalse(_.isTruthy(obj));
    });
  });

  describe('isNonNullObject', () => {
    it('Check if it works on null and gives false ', () => {
      const obj = null;
      isFalse(_.isNonNullObject(obj));
    });

    it('Check if it works on object and gives true ', () => {
      const obj = {};
      isTrue(_.isNonNullObject(obj));
    });
  });

  describe('isEmptyObject', () => {
    it('Check if it works on empty object and gives true ', () => {
      const obj = {};
      isTrue(_.isEmptyObject(obj));
    });

    it('Check if it works on non object and gives false ', () => {
      const obj = { test: 'test' };
      isFalse(_.isEmptyObject(obj));
    });
  });

  describe('isExact', () => {
    it('Check if it works on string and String Constructor and gives true', () => {
      const obj = 'test';
      isTrue(_.isExact(obj, String));
    });

    it('Check if it works on string and Object Constructor and gives false', () => {
      const obj = 'test';
      isFalse(_.isExact(obj, Object));
    });
  });

  describe('is', () => {
    it('Check if it works on string and String Class and gives true', () => {
      const obj = new String('test');
      isTrue(_.is(obj, String));
    });

    it('Check if it works on string and Object Class and gives false', () => {
      const obj = 'test';
      isFalse(_.is(obj, Object));
    });
  });

  describe('timeout', () => {
    it('Check if it works on function and the given delay', done => {
      _.timeout(() => {
        done();
      }, 100);
    });
  });

  describe('timeout', () => {
    it('Check if it works on function and the given delay and clears timeout after 100ms', done => {
      const to = _.timeout(() => {
        to();
        done();
      }, 100);
    });
  });

  describe('interval', () => {
    it('Check if it works on function and the given delay and clears interval after 100ms', done => {
      const to = _.interval(() => {
        to();
        done();
      }, 100);
    });
  });

  describe('rawError', () => {
    it('Check if it gives a raw error object with description and field inside an error key', () => {
      const error = _.rzpError('Error Desc', 'Error Field');
      const expected = {
        error: {
          description: 'Error Desc',
          field: 'Error Field',
        },
      };
      deep(error, expected);
    });
  });

  describe('throwMessage', () => {
    it('Check if it throws error as the given message', () => {
      const expected = 'Error!';
      let errorMessage;
      try {
        _.throwMessage('Error!');
      } catch (er) {
        console.log('error messageee', er.message);
        errorMessage = er.message;
      }
      equal(errorMessage, expected);
    });
  });

  describe('isBase64Image', () => {
    it('Check if it gives true for a base64 image string', () => {
      const image = 'data:image/gif;base64,R0lGODlhAQABAAAAACw=';
      isTrue(_.isBase64Image(image));
    });

    it('Check if it gives false for a non base64 image string', () => {
      const image = 'testing!';
      isFalse(_.isBase64Image(image));
    });
  });

  describe('makeQueryObject', () => {
    it('Check if it returns empty object for null object', () => {
      const obj = null;
      isTrue(_.isEmptyObject(_.makeQueryObject(obj)));
    });

    it('Check if it returns query object or a nested object', () => {
      const obj = { a: 1, b: { c: 3 } };
      const query = _.makeQueryObject(obj);
      const expected = { a: 1, 'b[c]': 3 };
      deep(query, expected);
    });
  });

  describe('obj2query', () => {
    it('Check if it returns empty string for empty object', () => {
      const obj = {};
      isTrue(_.obj2query(obj) === '');
    });

    it('Check if it returns query string for a nested object', () => {
      const obj = { a: 1, b: { c: 3 } };
      const expected = 'a=1&b%5Bc%5D=3';
      const url = _.obj2query(obj);
      equal(url, expected);
    });
  });
});
