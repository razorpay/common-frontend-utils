import { assert } from 'chai';
import * as _ from '../../../src/fe/implicit/_.js';
import * as _El from '../../../src/fe/implicit/_El.js';

const {
  isTrue,
  isFalse,
  deepEqual: deep,
  notDeepEqual: notDeep,
  equal,
} = assert;

describe('_', () => {
  describe('isType', () => {
    it('Check if it returns true on passing a string and "string"', () => {
      const str = 'test';
      const expected = 'string';
      isTrue(_.isType(str, expected));
    });

    it('Check if it returns false on passing an object and "string"', () => {
      const obj = {};
      const expected = 'string';
      isFalse(_.isType(obj, expected));
    });
  });

  describe('isElement', () => {
    it('Check if it is return true if element is an element or not', () => {
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
    it('Check if it works on null and returns false ', () => {
      const obj = null;
      isFalse(_.isNonNullObject(obj));
    });

    it('Check if it works on object and returns true ', () => {
      const obj = {};
      isTrue(_.isNonNullObject(obj));
    });
  });

  describe('isEmptyObject', () => {
    it('Check if it works on empty object and returns true ', () => {
      const obj = {};
      isTrue(_.isEmptyObject(obj));
    });

    it('Check if it works on non object and returns false ', () => {
      const obj = { test: 'test' };
      isFalse(_.isEmptyObject(obj));
    });
  });

  describe('isExact', () => {
    it('Check if it works on string and String Constructor and returns true', () => {
      const obj = 'test';
      isTrue(_.isExact(obj, String));
    });

    it('Check if it works on string and Object Constructor and returns false', () => {
      const obj = 'test';
      isFalse(_.isExact(obj, Object));
    });
  });

  describe('is', () => {
    it('Check if it works on string and String Class and returns true', () => {
      const obj = new String('test');
      isTrue(_.is(obj, String));
    });

    it('Check if it works on string and Object Class and returns false', () => {
      const obj = 'test';
      isFalse(_.is(obj, Object));
    });
  });

  describe('timeout', () => {
    it('Check if it works on function and delay of 100ms', done => {
      _.timeout(() => {
        done();
      }, 100);
    });

    it('Check if it works on function and null delay', done => {
      _.timeout(() => {
        done();
      }, null);
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
    it('Check if it works on function and the given delay of 100ms and clears interval', done => {
      const to = _.interval(() => {
        to();
        done();
      }, 100);
    });
    it('Check if it works on function and the given null delay and clears interval', done => {
      const to = _.interval(() => {
        to();
        done();
      }, null);
    });
  });

  describe('rawError', () => {
    it('Check if it returns a raw error object with description and field inside an error key', () => {
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
    it('Check if it returns true for a base64 image string', () => {
      const image = 'data:image/gif;base64,R0lGODlhAQABAAAAACw=';
      isTrue(_.isBase64Image(image));
    });

    it('Check if it returns false for a non base64 image string', () => {
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

    it('Check if it works correctly for an object and a prefix', () => {
      const obj = { a: 1 };
      const prefix = 'www.google.com';
      const query = _.makeQueryObject(obj, prefix);
      const expected = { 'www.google.com[a]': 1 };
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

    it('Check if it returns query string for a simple object', () => {
      const obj = { a: 1, b: 2 };
      const expected = 'a=1&b=2';
      const url = _.obj2query(obj);
      equal(url, expected);
    });
  });

  describe('query2obj', () => {
    it('Check if it returns empty object for empty string', () => {
      const obj = '';
      isTrue(_.isEmptyObject(_.query2obj(obj)));
    });

    it('Check if it returns query object for a simple string', () => {
      const expected = { a: '1', b: '2' };
      const url = 'a=1&b=2';
      const obj = _.query2obj(url);
      console.log(url, 'ururur');
      deep(obj, expected);
    });
  });

  describe('appendParamsToUrl', () => {
    it('Check if it returns same url if blank object is passed', () => {
      const url = 'www.google.com';
      const obj = {};
      const expected = 'www.google.com';
      equal(_.appendParamsToUrl(url, obj), expected);
    });

    it('Check if it appends param to url', () => {
      const url = 'www.google.com';
      const obj = { c: 3, d: 4 };
      const expected = 'www.google.com?c=3&d=4';
      equal(_.appendParamsToUrl(url, obj), expected);
    });
  });

  //   describe('getKeyFromEvent', () => {
  //     it('Check if it gets key pressed from the Event.', (done) => {
  //         const button=_El.create(button)
  //         var event = document.createEvent('KeyboardEvent',{bubbles : true, cancelable : true, key : "Q", char : "Q", shiftKey : true});
  //         button.dispatchEvent(event);

  //         button.addEventListener('keypress',e=>{
  //             const data=_.getKeyFromEvent(e);
  //             console.log(data,'ftftft')
  //             done
  //         })
  //     });

  //     it('Check if it works on string and Object Class and returns false', () => {
  //       const obj = 'test';
  //       isFalse(_.is(obj, Object));
  //     });
  //   });

  //   describe('hex2rgb', () => {
  //     it('Check if it converts hex string to its RGB color object', () => {
  //         const hex = '#1A3B4D';
  //         const obj={c:3};
  //         const expected={
  //             red:'1A',
  //             green:'3B',
  //             blue:'4D',
  //             alpha:1
  //         }
  //         const colorObj=_.hex2rgb(hex);
  //         console.log(colorObj,'colorObj')
  //         deep(colorObj,expected)
  //         });
  //   });

  describe('getQueryParams', () => {
    it('Check if it returns empty object for non string argument', () => {
      const url = null;
      const params = _.getQueryParams(url);
      const expected = {};
      deep(params, expected);
    });

    it('Check if it returns empty object for empty string', () => {
      const url = '';
      const params = _.getQueryParams(url);
      const expected = {};
      deep(params, expected);
    });

    it('Check if it returns params object for URL string', () => {
      const url = '?a=1&b=2';
      const params = _.getQueryParams(url);
      console.log(params, 'params');
      const expected = { a: '1', b: '2' };
      deep(params, expected);
    });
  });
});
