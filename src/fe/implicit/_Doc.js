import * as _Func from './_Func';
import * as _ from './_';
import * as _Arr from './_Arr';
import * as _El from './_El';
import * as _Obj from './_Obj';

export const documentElement = document.documentElement;
export const body = document.body;
export const innerWidth = global.innerWidth;
export const innerHeight = global.innerHeight;
export const pageYOffset = global.pageYOffset;
export const scrollBy = global.scrollBy;
export const scrollTo = global.scrollTo;
export const requestAnimationFrame = global.requestAnimationFrame;
export const querySelector = _Func.bind('querySelector', document);
export const querySelectorAll = _Func.bind('querySelectorAll', document);
export const getElementById = _Func.bind('getElementById', document);
export const getComputedStyle = _Func.bind('getComputedStyle', global);
export const EventConstructor = global.Event;
var link;

/**
 * Says whether or not the passed argument is an Event
 * @param {*} x
 *
 * @returns {boolean}
 */
export const isEvent = x => _.is(x, EventConstructor);

/**
 * Resolves given string to an element.
 * @param {string|Element} el
 *
 * @returns {Element}
 */
export const resolveElement = el => (_.isString(el) ? querySelector(el) : el);

/**
 * Resolve relative url to an absolute url.
 * @param {string} relativeUrl
 *
 * @returns {string}
 */
export function resolveUrl(relativeUrl) {
  link = _El.create('a');
  link.href = relativeUrl;
  return link.href;
}

/**
 * Redirect page to the target url.
 * @param {Object} data
 */
export function redirect(data) {
  if (!data.target && global !== global.parent) {
    return global.Razorpay.sendMessage({
      event: 'redirect',
      data,
    });
  }
  submitForm(data.url, data.content, data.method, data.target);
}

/**
 * Submit a form to a url using the given method
 * @param {string} action
 * @param {Object} data
 * @param {string} method
 * @param {string} target
 */
export function submitForm(action, data, method, target) {
  if (method && method.toLowerCase() === 'get') {
    action = _.appendParamsToUrl(action, data);
    if (target) {
      global.open(action, target);
    } else {
      global.location = action;
    }
  } else {
    let attr = { action, method };
    if (target) {
      attr.target = target;
    }

    _El.create('form')
      |> _El.setAttributes(attr)
      |> _El.setContents(data |> obj2formhtml)
      |> _El.appendTo(documentElement)
      |> _El.submit
      |> _El.detach;
  }
}

/**
 * Convert JSON object to HTML input html
 * @param {Object} data
 * @param {string} key
 *
 * @returns {string}
 */
export function obj2formhtml(data, key) {
  if (_.isNonNullObject(data)) {
    var str = '';
    _Obj.loop(data, function(value, name) {
      if (key) {
        name = key + '[' + name + ']';
      }
      str += obj2formhtml(value, name);
    });
    return str;
  }
  var input = _El.create('input');
  input.type = 'hidden';
  input.value = data;
  input.name = key;
  return input.outerHTML;
}

/**
 * Convert HTML form to JSON Object.
 * @param {Element} form
 *
 * @returns {Object}
 */
export function form2obj(form) {
  return _Arr.reduce(
    form.querySelectorAll('[name]'),
    (obj, el) => {
      obj[el.name] = el.value;
      return obj;
    },
    {}
  );
}

/**
 * Prevents default event from firing
 * @param {Event} e
 */
export function preventEvent(e) {
  if (isEvent(e)) {
    e.preventDefault();
    e.stopPropagation();
  }
  return false;
}

/**
 * Smoothly scroll to given point
 * @param {number} y
 */
export function smoothScrollTo(y) {
  smoothScrollBy(y - pageYOffset);
}

var scrollTimeout;
const pi = Math.PI;

/**
 * Smoothly scroll by given point
 * @param {number} y
 */
export function smoothScrollBy(y) {
  if (!global.requestAnimationFrame) {
    return scrollBy(0, y);
  }
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
  scrollTimeout = setTimeout(function() {
    var y0 = pageYOffset;
    var target = Math.min(y0 + y, _El.offsetHeight(body) - innerHeight);
    y = target - y0;
    var scrollCount = 0;
    var oldTimestamp = global.performance.now();

    function step(newTimestamp) {
      scrollCount += (newTimestamp - oldTimestamp) / 300;
      if (scrollCount >= 1) {
        return scrollTo(0, target);
      }
      var sin = Math.sin((pi * scrollCount) / 2);
      scrollTo(0, y0 + Math.round(y * sin));
      oldTimestamp = newTimestamp;
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, 100);
}
