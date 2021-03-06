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
    it('Check if it sends post request and gets a response for incorrect URL', done => {
      const body = {
        name: 'morpheus',
        job: 'leader',
      };
      const f = fetch.post({
        data: body,
        url: 'https://reqres-wrong.in/api/users',
        callback: a => {
          const hasValidFields =
            a.error.description === 'Network error' && a.xhr.status === 0;
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
    it('Check if it sends jsonp request and gets a response', function(done) {
      this.timeout(6000);

      // global.Razorpay is needed for the JSDOM Node env
      global.Razorpay = {};

      // global.window.Razorpay is needed for JSDOM <script> env
      // and it needs to always be a copy of global.Razorpay as the JSONP functions
      // will be added to global.Razorpay but the script will expect them to be in global.window.Razorpay
      global.window.Razorpay = global.Razorpay;

      fetch.jsonp({
        url: 'https://api.razorpay.com/v1/preferences',
        data: {
          key_id: 'rzp_test_1DP5mmOlF5G5ag',
        },
        callback: response => {
          if (response.mode === 'test') {
            done();
          } else {
            done(
              new Error(
                'Got unexpected data in response of fetch.jsonp request'
              )
            );
          }
        },
      });
    });
  });

  describe('till', () => {
    it('Keeps making requests until till returns true', function(done) {
      this.timeout(12000);

      let attempts = 0;

      fetch({
        url:
          'https://api.razorpay.com/v1/payments/pay_FF48gKluIcsuNv/status?key_id=rzp_test_1DP5mmOlF5G5ag',
        callback: response => {
          if (
            response.error.description ===
              'The payment has already been processed' &&
            attempts === 3
          ) {
            done();
          } else {
            done(new Error('fetch.till did not get the data it expected'));
          }
        },
      }).till(response => {
        attempts++;

        return (
          response.error.description ===
            'The payment has already been processed' && attempts !== 3
        );
      });
    });
  });
});
