import * as _El from '../../../src/fe/implicit/_El';
import { assert } from 'chai';

const {
  isTrue,
  isFalse,
  deepEqual: deep,
  notDeepEqual: notDeep,
  equal,
} = assert;

describe('_EL', function() {
  describe('create', () => {
    it('creates an element with a valid tagname', function() {
      const img = _El.create('img');
      const expected = 'IMG';
      equal(img.nodeName, expected);
    });

    it('creates a div when passed an invalid tagname', function() {
      const img = _El.create('');
      const expected = 'DIV';
      equal(img.nodeName, expected);
    });
  });

  describe('parent', () => {
    it('Gets the parent element', function() {
      const div = _El.create('div');
      const img = _El.create('img');
      const expected = 'DIV';
      div.appendChild(img);
      const parent = _El.parent(img);
      equal(parent.nodeName, expected);
    });
  });

  describe('replace', () => {
    it('Check if it replaces a target node by a new node', function() {
      const div = _El.create('div');
      const targetNode = _El.create('img');
      const newNode = _El.create('a');
      div.appendChild(targetNode);
      _El.replace(newNode, targetNode);
      const expected = 'A';
      equal(div.childNodes[0].nodeName, expected);
    });
  });

  describe('appendTo', () => {
    const div = _El.create('div');
    const a = _El.create('a');
    it('Check if it appends a child node to parent node', function() {
      _El.appendTo(a, div);
      const expected = 'A';
      equal(div.childNodes[0].nodeName, expected);
    });
  });

  describe('append', () => {
    const div = _El.create('div');
    const a = _El.create('a');
    it('Check if it appends a child node to a parent node', function() {
      _El.append(div, a);
      const expected = 'A';
      equal(div.childNodes[0].nodeName, expected);
    });
  });

  describe('prependTo', () => {
    it('Check if it prepends a node before the child node of a parent with one child', function() {
      const div = _El.create('div');
      const img = _El.create('img');
      const a = _El.create('a');
      div.appendChild(img);
      _El.prependTo(a, div);
      const expected = 'A';
      equal(div.childNodes[0].nodeName, expected);
    });

    it('Check if it prepends a node to parent node with no child', function() {
      const div = _El.create('div');
      const a = _El.create('a');
      _El.prependTo(a, div);
      const expected = 'A';
      equal(div.childNodes[0].nodeName, expected);
    });
  });

  describe('prepend', () => {
    const div = _El.create('div');
    const img = _El.create('img');
    const a = _El.create('a');
    div.appendChild(img);
    it('Check if it prepends a child node to a parent node', function() {
      _El.prepend(div, a);
      const expected = 'A';
      equal(div.childNodes[0].nodeName, expected);
    });
  });

  describe('detach', () => {
    const div = _El.create('div');
    const img = _El.create('img');
    div.appendChild(img);
    it('Check if it detaches a node with a parent', function() {
      _El.detach(img);
      const expected = 0;
      equal(div.childNodes.length, expected);
    });
    it('Check if it returns the child node if no parent found', function() {
      const node = _El.detach(div);
      equal(node, div);
    });
  });

  describe('submit', () => {
    // Mock the submit function
    window.HTMLFormElement.prototype.submit = function() {
      const event = new Event('submit');
      this.dispatchEvent(event);
    };

    const form = _El.create('form');
    it('Check if it executes submit on an element', function(done) {
      form.addEventListener('submit', e => {
        done();
      });
      _El.submit(form);
    });
  });

  describe('hasClass', () => {
    const div = _El.create('div');
    div.setAttribute('class', 'red');
    it('Check if the element has the class mentioned', function() {
      const hasClass = _El.hasClass(div, 'red');
      isTrue(hasClass);
    });
  });

  describe('addClass', () => {
    const div = _El.create('div');
    it('Check if it adds a class to the given element with no class', function() {
      _El.addClass(div, 'blue');
      const hasClass = _El.hasClass(div, 'blue');
      isTrue(hasClass);
    });

    it('Check if it adds a class to the given element and also has remaining classes', function() {
      div.setAttribute('class', 'red');
      _El.addClass(div, 'blue');
      const hasClass = _El.hasClass(div, 'red');
      isTrue(hasClass);
      isTrue(_El.hasClass(div, 'blue'));
    });
  });

  describe('removeClass', () => {
    const div = _El.create('div');
    div.setAttribute('class', 'red blue');
    it('Check if it removes a class from the given element.', function() {
      _El.removeClass(div, 'red');
      const hasClass = _El.hasClass(div, 'red');
      isFalse(hasClass);
    });

    it('Check if it removes a class from the given element and not any other class.', function() {
      _El.removeClass(div, 'red');
      const hasClass = _El.hasClass(div, 'blue');
      isTrue(hasClass);
    });
  });

  describe('getAttribute', () => {
    const div = _El.create('div');
    div.setAttribute('class', 'red blue');
    it('Check if it gets the attribute of the given element.', function() {
      const classes = _El.getAttribute(div, 'class');
      const expected = 'red blue';
      equal(classes, expected);
    });
  });

  describe('setAttribute', () => {
    const div = _El.create('div');
    _El.setAttribute(div, 'name', 'test');
    it('Check if it sets the attribute of the given element.', function() {
      const attr = _El.getAttribute(div, 'name');
      const expected = 'test';
      equal(attr, expected);
    });
  });

  describe('setStyle', () => {
    const div = _El.create('div');
    _El.setStyle(div, 'color', 'red');
    it('Check if it sets the style of the given element.', function() {
      const style = div.style.color;
      const expected = 'red';
      equal(style, expected);
    });
  });

  describe('setAttributes', () => {
    const div = _El.create('div');
    it('Check if it sets the attributes of the given element.', function() {
      _El.setAttributes(div, {
        class: 'red',
        name: 'test',
      });
      isTrue(
        _El.getAttribute(div, 'class') === 'red' &&
          _El.getAttribute(div, 'name') === 'test'
      );
    });

    it('Check if it overrides the set attribute of the given element.', function() {
      _El.setAttribute(div, 'class', 'blue');
      _El.setAttributes(div, {
        class: 'red',
        name: 'test',
      });
      isTrue(
        _El.getAttribute(div, 'class') === 'red' &&
          _El.getAttribute(div, 'name') === 'test'
      );
    });
  });

  describe('setStyles', () => {
    const div = _El.create('div');
    it('Check if it sets the styles of the given element.', function() {
      _El.setStyles(div, {
        color: 'red',
        backgroundColor: 'blue',
      });
      const expected = ['red', 'blue'];
      const value = [div.style.color, div.style.backgroundColor];
      deep(value, expected);
    });

    it('Check if it overrides the styles of the given element.', function() {
      div.style.color = 'green';
      _El.setStyles(div, {
        color: 'red',
        backgroundColor: 'blue',
      });
      const expected = ['red', 'blue'];
      const value = [div.style.color, div.style.backgroundColor];
      deep(value, expected);
    });
  });

  describe('setContents', () => {
    const div = _El.create('div');
    it('Check if it sets the contents of the given element.', function() {
      _El.setContents(div, 'hello testing');
      const html = div.innerHTML;
      const expected = 'hello testing';
      equal(html, expected);
    });
  });

  describe('setDisplay', () => {
    const div = _El.create('div');
    it('Check if it sets the display style of the given element.', function() {
      _El.setDisplay(div, 'block');
      const style = div.style.display;
      const expected = 'block';
      equal(style, expected);
    });
  });

  describe('firstChild', () => {
    const div = _El.create('div');
    const img = _El.create('img');
    div.appendChild(img);
    it('Checks if it gives the first child on the given element.', function() {
      const firstChild = _El.firstChild(div);
      const expected = 'IMG';
      equal(firstChild.nodeName, expected);
    });
  });

  describe('matches', () => {
    const div = _El.create('div');
    div.setAttribute('id', 'testdiv');
    const img = _El.create('img');
    div.appendChild(img);
    it('Checks if the given element and the selector matches.', function() {
      const isMatching = _El.matches(div, '#testdiv');
      isTrue(isMatching);
    });

    it('Checks if the given element and the selector does not match.', function() {
      const isMatching = _El.matches(div, '#testdiv2');
      isFalse(isMatching);
    });
  });

  //remaining
  // describe('moveCaret', () => {
  //   const div = _El.create('div');
  //   const img = _El.create('img');
  //   div.appendChild(img);
  //   it('Checks if it gives the first child on the given element.', function() {
  //     const firstChild = _El.firstChild(div);
  //     const expected = 'IMG';
  //     equal(firstChild.nodeName, expected);
  //   });
  // });

  //remaining
  // describe('on', () => {
  //   const button = _El.create('button');
  //   document.body.appendChild(button);
  //   it('Checks if on fires correctly.', (done)=> {
  //     button.addEventListener('click',e=>{
  //       const cb=()=>{
  //         console.log('Clicked fired');
  //         done();
  //       }
  //       _El.on(e,cb)(button);
  //     });
  //     button.click();
  //   });
  // });

  // remaining
  // describe('bbox', () => {
  //   const div0 = _El.create('div');
  //   const div2 = _El.create('div');
  //   div1.style.position='absolute';
  //   div1.style.left='10px';
  //   div1.style.right='10px';
  //   div1.style.top='10px';
  //   div1.style.bottom='10px';
  //   div1.style.width='100px';
  //   div1.style.height='100px';
  //   div2.style.width='250px';
  //   div2.style.height='150px';
  //   div2.style.border='1px solid red'
  //   document.body.appendChild(div1)
  //   div2.appendChild(div1);
  //   it('Checks if it gets the size of an element and its position relative to the viewport', function() {
  //     const data=_El.bbox(div2);
  //     console.log(data,'getboouou')
  //     const expected={left:10,right:10,bottom:10,top:10,width:0};
  //     deep(data,expected);
  //   });
  // });
});
