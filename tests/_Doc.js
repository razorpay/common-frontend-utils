// var jsdom = require('jsdom')
// var expect = require('chai').expect
// import * as _Doc from '../src/fe/implicit/_Doc';
// import * as _El from '../src/fe/implicit/_El';
// import { assert } from 'chai';
// const {
//     isTrue,
//     isFalse,
//     deepEqual: deep,
//     notDeepEqual: notDeep,
//     equal,
//   } = assert;

// describe('_Doc', function() {
//     console.log(document,'doc');
//     // describe('resolveUrl', () => {
//     //     it('Check if it resolves Url', function() {
//     //         const url='http://www.google.com';
//     //         const resolvedUrl=_Doc.resolveUrl(url)
//     //         isTrue(resolvedUrl==url);
//     //     });
//     // })

//     describe('obj2formhtml', () => {
//         it('Check if it converts object to form HTML', function() {
//             const obj={
//                 firstName:'Test1',
//                 lastName:'Test2'
//             }
//             const html=_Doc.obj2formhtml();
//             html.includes('"<input type="hidden" value="Test1" name="firstName">"')
//         });
//     })

//     describe('form2obj', () => {
//         it('Check if it converts form to object', function() {
//             const input=_El.create('input');
//             input.setAttribute('firstname','Test1');
//             const obj=_Doc.form2obj(input);
//             console.log(obj,'obj',input)
//             isTrue(obj.firstname=='Test1');
//         });
//     })
// })
