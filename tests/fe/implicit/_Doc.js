import * as _Doc from '../../../src/fe/implicit/_Doc';
import * as _El from '../../../src/fe/implicit/_El';
import { assert } from 'chai';

const {
  isTrue,
  isFalse,
  deepEqual: deep,
  notDeepEqual: notDeep,
  equal,
} = assert;

describe('_Doc', function() {
  describe('isEvent', () => {
    it('detects Event properly', () => {
      const event = new Event('MyEvent');
      const is = _Doc.isEvent(event);
      isTrue(is);
    });

    it('detects CustomEvent properly', () => {
      const event = new CustomEvent('MyCustomEvent');
      const is = _Doc.isEvent(event);
      isTrue(is);
    });

    it('detects that Array is not an Event', () => {
      const array = new Array();
      const is = _Doc.isEvent(array);
      isFalse(is);
    });
  });

  describe('resolveElement', () => {
    const div = _El.create('div');
    div.setAttribute('class', 'red');
    document.body.appendChild(div);

    it('Resolve an element from string', function() {
      const el = _Doc.resolveElement('div');
      isTrue(el === div);
    });

    it('Resolve an element from element', function() {
      const el = _Doc.resolveElement(div);
      isTrue(el === div);
    });
  });

  describe('obj2formhtml', () => {
    it('Check if it converts an object to HTML form if key is not passed', function() {
      const obj = {
        test: 'Test1',
      };
      const html = _Doc.obj2formhtml(obj);
      const expected = '<input type="hidden" value="Test1" name="test">';
      equal(html, expected);
    });

    it('Check if it converts an object to HTML form if key is passed', function() {
      const obj = {
        test: 'Test1',
      };
      const html = _Doc.obj2formhtml(obj, 'test');
      const expected = '<input type="hidden" value="Test1" name="test[test]">';
      equal(html, expected);
    });

    it('Check if it returns empty string on empty object', function() {
      const obj = {};
      const html = _Doc.obj2formhtml(obj);
      const expected = '';
      equal(html, expected);
    });

    it('Check if it gives value attribute as empty on passing null', function() {
      const obj = null;
      const html = _Doc.obj2formhtml(obj);
      const expected = 'value=""';
      isTrue(html.includes(expected));
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
  });

  describe('preventEvent', () => {
    it('Check if it prevents default event from firing', function(done) {
      const anchor = _El.create('a');
      anchor.setAttribute('href', '#link');
      anchor.addEventListener('click', e => {
        _Doc.preventEvent(e);

        isTrue(e.defaultPrevented);
        done();
      });
      anchor.click();
    });
  });
});
