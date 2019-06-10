var jsdom = require('jsdom');
var expect = require('chai').expect;
import * as _Doc from '../src/fe/implicit/_Doc';
import * as _El from '../src/fe/implicit/_El';
import { assert } from 'chai';
const {
  isTrue,
  isFalse,
  deepEqual: deep,
  notDeepEqual: notDeep,
  equal,
} = assert;

describe('_Doc', function() {
  // describe('resolveUrl', () => {
  //     it('Check if it resolves the url', function() {
  //         const url=_Doc.resolveUrl('test');
  //         equal(url,'test')
  //     });
  // })

  // describe('redirectUrl', () => {
  //     it('Check if it redirects to the target url', function() {
  //         const url=_Doc.redirect('google.com');
  //         equal(url,'google.com')
  //     });
  // })

  describe('obj2formhtml', () => {
    it('Check if it converts object to form HTML', function() {
      const obj = {
        testattr: 'Test1',
      };
      const html = _Doc.obj2formhtml(obj);
      equal(html, '<input type="hidden" value="Test1" name="testattr">');
    });

    it('Check if it returns empty string on empty object', function() {
      const obj = {};
      const html = _Doc.obj2formhtml(obj);
      equal(html, '');
    });

    it('Check if it gives value attribute as empty on passing null', function() {
      const obj = null;
      const html = _Doc.obj2formhtml(obj);
      isTrue(html.includes('value=""'));
    });
  });

  describe('form2obj', () => {
    const input = _El.create('input');
    const form = _El.create('form');
    it('Check if it converts form to object', function() {
      input.setAttribute('name', 'test');
      input.setAttribute('value', 'test-value');
      form.appendChild(input);
      const obj = _Doc.form2obj(form);
      deep(obj, { test: 'test-value' });
    });

    it('Check if it throws exception on giving null object', function() {
      let isError = false;
      try {
        const obj = _Doc.form2obj(null);
      } catch (er) {
        isError = true;
      }
      isTrue(isError);
    });
  });

  describe('preventEvent', () => {
    it('Check if it prevents event from firing', function(done) {
      const anchor = _El.create('a');
      anchor.setAttribute('href', '#link');
      anchor.addEventListener('click', e => {
        _Doc.preventEvent(e);
        done();
      });
      anchor.click();
    });
  });

  describe('resolveElement', () => {
    const div = _El.create('div');
    div.setAttribute('class', 'red');
    document.body.appendChild(div);

    it('Resolve an element from string', function() {
      const el = _Doc.resolveElement('div');
    });

    it('Resolve an element from element', function() {
      const el = _Doc.resolveElement(div);
      isTrue(el === div);
    });
  });
});
