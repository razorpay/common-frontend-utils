import { assert } from 'chai';
import fetch from '../../../src/fe/implicit/fetch';

const {
  isTrue,
  isFalse,
  deepEqual: deep,
  notDeepEqual: notDeep,
  equal,
} = assert;

describe('fetch', () => {
  describe('post', () => {
    it('Check if sends post request and gets a response for correct URL', done => {
      const f = fetch.post({
        body: {
          name: 'morpheus',
          job: 'leader',
        },
        url: 'https://reqres.in/api/users',
        callback: a => {
          const hasValidFields = a.id && a.createdAt;
          if (hasValidFields) {
            done();
          } else {
            done(new Error());
          }
        },
      });
    });

    it('Check if sends post request and gets error for incorrect URL', done => {
      const f = fetch.post({
        body: {
          name: 'morpheus',
          job: 'leader',
        },
        url: 'https://reqreswrong.in/api',
        callback: a => {
          const hasValidFields =
            a.error.description == 'Network error' && a.xhr.status == 0;
          if (hasValidFields) {
            done();
          } else {
            done(new Error());
          }
        },
      });
    });
  });

  describe('jsonp', () => {
    it('Check if sends jsonp request and gets a response for correct URL', done => {
      fetch.jsonp({
        url: 'https://jsonp.afeld.me/?url=https://jsonview.com/example.json',
        callback: d => {
          console.log(d, 'lili');
        },
      });
    });
  });
});
