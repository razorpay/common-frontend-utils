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
  });
  // remaining
  // describe('jsonp', () => {
  //   it('Check if it sends jsonp request and gets a response for correct URL', function(done) {
  //     global.Razorpay={};
  //     fetch.jsonp({
  //       url: 'https://api.razorpay.com/v1/preferences?key_id=rzp_test_1DP5mmOlF5G5ag',
  //       callback: response => {
  //           const hasValidFields=response.http_status_code&&response.features.google_pay&&response.mode==='test';
  //           if(hasValidFields){
  //               done();
  //           }
  //           else{
  //               done(new Error());
  //           }
  //       },
  //     });
  //   });

  //   it('Check if it sends jsonp request and gets a response for incorrect URL', function(done) {
  //       global.Razorpay={};
  //       fetch.jsonp({
  //         url: 'https://api.razorpay.com/v1/preferences-wrong?key_id=rzp_test_1DP5mmOlF5G5ag',
  //         callback: response => {
  //             const hasValidFields=response.error.description==="Network error";
  //             if(hasValidFields)
  //             {
  //                 done();
  //             }
  //             else{
  //                 done(new Error());
  //             }
  //         },
  //       });
  //     });
  // });
});
