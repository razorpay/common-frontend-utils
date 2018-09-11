export const ElementConstructor = global.Element;

export const create = tagName => document.createElement(tagName || 'div');
export const parent = element => element.parentNode;

const element1 = _.validateArgs(_.isElement);
const element2 = _.validateArgs(_.isElement, _.isElement);
const elementString = _.validateArgs(_.isElement, _.isString);
const attrValidator = _.validateArgs(_.isElement, _.isString, () => true);
const elementObject = _.validateArgs(_.isElement, _.isNonNullObject);

export const replace =
  ((newNode, targetNode) => {
    parent(targetNode).replaceChild(newNode, targetNode);
    return newNode;
  })
  |> element2
  |> _.curry2;

export const appendTo =
  ((childNode, parentNode) => {
    // returns child
    return parentNode.appendChild(childNode);
  })
  |> element2
  |> _.curry2;

export const append =
  ((parentNode, childNode) => {
    childNode |> appendTo(parentNode);
    return parentNode;
  })
  |> element2
  |> _.curry2;

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

export const prepend =
  ((parentNode, childNode) => {
    childNode |> prependTo(parentNode);
    return parentNode;
  })
  |> element2
  |> _.curry2;

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
export const moveCaret =
  ((el, position) => {
    el.selectionStart = el.selectionEnd = position;
    return el;
  })
  |> _.validateArgs(_.isElement, _.isNumber)
  |> _.curry2;

export const submit =
  (el => {
    el.submit();
    return el;
  }) |> element1;

export const hasClass =
  ((el, className) => {
    return _Str.contains(_Str.pad(el.className), _Str.pad(className));
  })
  |> elementString
  |> _.curry2;

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

export const getAttribute =
  ((el, attr) => el.getAttribute(attr)) |> elementString |> _.curry2;

export const setAttribute =
  ((el, attr, value) => {
    el.setAttribute(attr, value);
    return el;
  })
  |> attrValidator
  |> _.curry3;

export const setStyle =
  ((el, cssProp, value) => {
    el.style[cssProp] = value;
    return el;
  })
  |> attrValidator
  |> _.curry3;

export const setAttributes =
  ((el, attributes) => {
    attributes |> _Obj.loop((val, key) => el |> setAttribute(key, val));
    return el;
  })
  |> elementObject
  |> _.curry2;

export const setStyles =
  ((el, styles) => {
    styles |> _Obj.loop((val, key) => el |> setStyle(key, val));
    return el;
  })
  |> elementObject
  |> _.curry2;

export const setContents =
  ((el, html) => {
    el.innerHTML = html;
    return el;
  })
  |> elementString
  |> _.curry2;

export const setDisplay =
  ((el, value) => el |> setStyle('display', value))
  |> elementString
  |> _.curry2;

export const displayNone = setDisplay('none');
export const displayBlock = setDisplay('block');
export const displayInlineBlock = setDisplay('inline-block');
export const offsetWidth = _.prop('offsetWidth');
export const offsetHeight = _.prop('offsetHeight');
export const bbox = (el => el.getBoundingClientRect()) |> element1;
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
