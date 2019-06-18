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
    it('Check if it sends post request and gets a response for correct URL', done => {
      const body = {
        name: 'morpheus',
        job: 'leader',
      };
      const f = fetch.post({
        data: body,
        url: 'https://reqres.in/api/users',
        callback: a => {
          const hasValidFields =
            a.id && a.createdAt && a.name === 'morpheus' && a.job === 'leader';
          if (hasValidFields) {
            done();
          } else {
            done(new Error());
          }
        },
      });
    });

    it('Check if it sends post request and gets error for incorrect URL', done => {
      const f = fetch.post({
        body: {
          name: 'morpheus',
          job: 'leader',
        },
        url: 'https://reqres-wrong.in/api',
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

  // remaining
  //   describe('jsonp', () => {
  //       global.Razorpay={};
  //     it('Check if it sends jsonp request and gets a response for correct URL', done => {
  //       fetch.jsonp({
  //         url: 'https://jsonview.com/example.json',
  //         callback:response => console.log(response,'p1111'),
  //       });
  //     });
  //   });
});
