import * as _ from './_';
import * as _Str from './_Str';
import * as _Obj from './_Obj';

export const ElementConstructor = global.Element;

/**
 * Creates an element using a tag name.
 * @param {string} tagName
 *
 * @returns {Element}
 */
export const create = tagName => document.createElement(tagName || 'div');

/**
 * Gets the parent element of the given element.
 * @param {Element} element
 *
 * @returns {Element}
 */
export const parent = element => element.parentNode;

const element1 = _.validateArgs(_.isElement);
const element2 = _.validateArgs(_.isElement, _.isElement);
const elementString = _.validateArgs(_.isElement, _.isString);
const attrValidator = _.validateArgs(_.isElement, _.isString, () => true);
const elementObject = _.validateArgs(_.isElement, _.isNonNullObject);

/**
 * Replace the target node by the given node.
 * @param {Element} newNode
 * @param {Element} targetNode
 *
 * @returns {Element} newNode
 */
export const replace =
  ((newNode, targetNode) => {
    parent(targetNode).replaceChild(newNode, targetNode);
    return newNode;
  })
  |> element2
  |> _.curry2;

/**
 * Appends a child node to the parent node.
 * @param {Element} childNode
 * @param {Element} parentNode
 *
 * @returns {Element} parentNode
 */
export const appendTo =
  ((childNode, parentNode) => {
    // returns child
    return parentNode.appendChild(childNode);
  })
  |> element2
  |> _.curry2;

/**
 * Appends a node to the given node.
 * @param {Element} parentNode
 * @param {Element} childNode
 *
 * @returns {Element} parentNode
 */
export const append =
  ((parentNode, childNode) => {
    childNode |> appendTo(parentNode);
    return parentNode;
  })
  |> element2
  |> _.curry2;

/**
 * Prepends a node to another node.
 * @param {Element} childNode
 * @param {Element} parentNode
 *
 * @returns {Element} childNode
 */
export const prependTo =
  ((childNode, parentNode) => {
    let firstChild = parentNode.firstElementChild;
    if (firstChild) {
      parentNode.insertBefore(childNode, firstChild);
    } else {
      childNode |> appendTo(parentNode);
    }
    return childNode;
  })
  |> element2
  |> _.curry2;

/**
 * Prepends a node to another node.
 * @param {Element} parentNode
 * @param {Element} childNode
 *
 * @returns {Element} parentNode
 */
export const prepend =
  ((parentNode, childNode) => {
    childNode |> prependTo(parentNode);
    return parentNode;
  })
  |> element2
  |> _.curry2;

/**
 * Removes the node from DOM.
 * @param {Element} childNode
 *
 * @returns {Element} childNode
 */
export const detach =
  (childNode => {
    var parentNode = parent(childNode);
    if (parentNode) {
      parentNode.removeChild(childNode);
    }
    return childNode;
  }) |> element1;

export const selectionStart = _.prop('selectionStart') |> element1;
export const selectionEnd = _.prop('selectionEnd') |> element1;

/**
 * Moves caret for an element between the given positions
 * @param {Element} el
 * @param {number} position
 *
 * @returns {Element}
 */
export const moveCaret =
  ((el, position) => {
    el.selectionStart = el.selectionEnd = position;
    return el;
  })
  |> _.validateArgs(_.isElement, _.isNumber)
  |> _.curry2;

/**
 * Call submit method on the given element.
 * @param {Element} el
 *
 * @returns {Element}
 */
export const submit =
  (el => {
    el.submit();
    return el;
  }) |> element1;

/**
 * Checks if the given element has the given class.
 * @param {Element} el
 * @param {string} className
 *
 * @returns {boolean}
 */
export const hasClass =
  ((el, className) => {
    return _Str.contains(_Str.pad(el.className), _Str.pad(className));
  })
  |> elementString
  |> _.curry2;

/**
 * Adds a class to the given element.
 * @param {Element} el
 * @param {string} className
 *
 * @returns {Element}
 */
export const addClass =
  ((el, className) => {
    if (!el.className) {
      el.className = className;
    } else if (!hasClass(el, className)) {
      el.className += ' ' + className;
    }
    return el;
  })
  |> elementString
  |> _.curry2;

/**
 * Removes a class from the given element.
 * @param {Element} el
 * @param {string} className
 *
 * @returns {Element}
 */
export const removeClass =
  ((el, className) => {
    className = (' ' + el.className + ' ')
      .replace(' ' + className + ' ', ' ')
      .replace(/^ | $/g, '');

    if (el.className !== className) {
      el.className = className;
    }
    return el;
  })
  |> elementString
  |> _.curry2;

/**
 * Removes the class if it is attached.
 * Adds a class if it is not attached.
 * @param {Element} el
 * @param {string} className
 *
 * @returns {Element}
 */
export const toggleClass =
  ((el, className) => {
    if (hasClass(el, className)) {
      removeClass(el, className);
    } else {
      addClass(el, className);
    }

    return el;
  })
  |> elementString
  |> _.curry2;

/**
 * Adds or removes class based on `keep`
 * @param {Element} el
 * @param {string} className
 * @param {boolean} keep
 *
 * @returns {Element}
 */
export const keepClass =
  ((el, className, keep) => {
    if (keep) {
      addClass(el, className);
    } else {
      removeClass(el, className);
    }

    return el;
  })
  |> elementString
  |> _.curry3;

/**
 * Gets attribute of the given element.
 * @param {Element} el
 * @param {string} attr
 *
 * @returns {string}
 */
export const getAttribute =
  ((el, attr) => el.getAttribute(attr)) |> elementString |> _.curry2;

/**
 * Sets attribute of the given element.
 * @param {Element} el
 * @param {string} attr
 * @param {string} value
 *
 * @returns {Object}
 */
export const setAttribute =
  ((el, attr, value) => {
    el.setAttribute(attr, value);
    return el;
  })
  |> attrValidator
  |> _.curry3;

/**
 * Sets style of the given element.
 * @param {Element} el
 * @param {string} cssProp
 * @param {string} value
 *
 * @returns {Object}
 */
export const setStyle =
  ((el, cssProp, value) => {
    el.style[cssProp] = value;
    return el;
  })
  |> attrValidator
  |> _.curry3;

/**
 * Sets multiple attibutes of the given element.
 * @param {Element} el
 * @param {Object} attributes
 *
 * @returns {Object}
 */
export const setAttributes =
  ((el, attributes) => {
    attributes |> _Obj.loop((val, key) => el |> setAttribute(key, val));
    return el;
  })
  |> elementObject
  |> _.curry2;

/**
 * Sets multiple styles of the given element.
 * @param {Element} el
 * @param {Object} styles
 *
 * @returns {Object}
 */
export const setStyles =
  ((el, styles) => {
    styles |> _Obj.loop((val, key) => el |> setStyle(key, val));
    return el;
  })
  |> elementObject
  |> _.curry2;

/**
 * Sets contents of the given element.
 * @param {Element} el
 * @param {string} html
 *
 * @returns {Object}
 */
export const setContents =
  ((el, html) => {
    el.innerHTML = html;
    return el;
  })
  |> elementString
  |> _.curry2;

/**
 * Sets the display style of the given element.
 * @param {Element} el
 * @param {string} value
 *
 * @returns {Object}
 */
export const setDisplay =
  ((el, value) => el |> setStyle('display', value))
  |> elementString
  |> _.curry2;

export const displayNone = setDisplay('none');
export const displayBlock = setDisplay('block');
export const displayInlineBlock = setDisplay('inline-block');
export const offsetWidth = _.prop('offsetWidth');
export const offsetHeight = _.prop('offsetHeight');

/**
 * Gets the size of an element and its position relative to the viewport
 * @param {Element} el
 *
 * @returns {Object}
 */
export const bbox = (el => el.getBoundingClientRect()) |> element1;

/**
 * Gets the first Child of the given element.
 * @param {Element} el
 *
 * @returns {Object}
 */
export const firstChild = (el => el.firstChild) |> element1;

/* https://developer.mozilla.org/en/docs/Web/API/Element/matches */
var elementProto = _.prototypeOf(ElementConstructor);
var matchesSelector =
  elementProto.matches ||
  elementProto.matchesSelector ||
  elementProto.webkitMatchesSelector ||
  elementProto.mozMatchesSelector ||
  elementProto.msMatchesSelector ||
  elementProto.oMatchesSelector;

/**
 * Checks if the given element and the selector matches.
 * @param {Element} el
 * @param {string} selector
 *
 * @returns {Object}
 */
export const matches =
  ((el, selector) => {
    return matchesSelector.call(el, selector);
  })
  |> elementString
  |> _.curry2;

// always curried
export const on = (event, callback, delegate, useCapture) => {
  if (_.is(event, ElementConstructor)) {
    return console.error('use el |> _El.on(e, cb)');
  }
  return el => {
    var attachedCallback = callback;
    if (_.isString(delegate)) {
      attachedCallback = function(e) {
        var target = e.target;
        while (!matches(target, delegate) && target !== el) {
          target = target |> parent;
        }
        if (target !== el) {
          e.delegateTarget = target;
          callback(e);
        }
      };
    } else {
      useCapture = delegate;
    }

    // cast to boolean
    useCapture = !!useCapture;
    el.addEventListener(event, attachedCallback, useCapture);

    // return off-switch for this listener
    return () => el.removeEventListener(event, attachedCallback, useCapture);
  };
};

/**
 * Returns the closest parent element
 * that matches the given selector
 * @param {Element} node
 * @param {string} selector
 *
 * @returns {Element}
 */
export const closest = _.curry2((node, selector) => {
  let current = node;

  while (_.isElement(current)) {
    if (matches(current, selector)) {
      return current;
    }

    current = parent(current);
  }

  return null;
});
