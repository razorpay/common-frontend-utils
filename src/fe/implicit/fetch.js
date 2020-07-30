const sessionIdHeader = 'X-Razorpay-SessionId';
const trackIdHeader = 'X-Razorpay-TrackId';
const Xhr = XMLHttpRequest;
import * as _ from './_';
import * as _Func from './_Func';
import * as _El from './_El';
import * as _Doc from './_Doc';
import * as _Obj from './_Obj';
const networkError = _.rzpError('Network error');
let jsonp_cb = 0;
let sessionId, trackId;

/**
 * Sets the session ID.
 * @param {string} id
 *
 * @returns {void}
 */
function setSessionId(id) {
  sessionId = id;
}

/**
 * Sets the track ID.
 * @param {string} id
 *
 * @returns {void}
 */
function setTrackId(id) {
  trackId = id;
}

/**
 * Sends a fetch request with the given options
 * @param {Object} options
 *
 * @returns {Object}
 */
export default function fetch(options) {
  if (!_.is(this, fetch)) {
    return new fetch(options);
  }

  this.options = normalizeOptions(options);
  this.defer();
}

_Func.setPrototype(fetch, {
  setReq: function(type, value) {
    this.abort();
    this.type = type;
    this.req = value;
    return this;
  },

  till: function(continueUntilFn, retryLimit = 0) {
    return this.setReq(
      'timeout',
      setTimeout(() => {
        this.call(response => {
          // If there is an error, retry again until retry limit.
          if (response.error && retryLimit > 0) {
            this.till(continueUntilFn, retryLimit - 1);
          } else if (continueUntilFn(response)) {
            this.till(continueUntilFn, retryLimit);
          } else {
            this.options.callback(response);
          }
        });
      }, 3e3)
    );
  },

  abort: function() {
    // this.req, which may be XMLHttpRequest object, setTimeout ID
    // or jsonp callback counter
    let { req, type } = this;

    // return if already null
    if (!req) {
      return;
    }

    if (type === 'ajax') {
      this.req.abort();
    } else if (type === 'jsonp') {
      global.Razorpay[this.req] = _Func.noop;
    } else {
      clearTimeout(this.req);
    }
    this.req = null;
  },

  defer: function() {
    this.req = setTimeout(() => this.call());
  },

  call: function(callback = this.options.callback) {
    var { url, method, data, headers } = this.options;

    var xhr = new Xhr();
    this.setReq('ajax', xhr);

    xhr.open(method, url, true);

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status) {
        var json = _Obj.parse(xhr.responseText);
        if (!json) {
          json = _.rzpError('Parsing error');
          json.xhr = {
            status: xhr.status,
            text: xhr.responseText,
          };
        }

        if (json.error) {
          global.dispatchEvent(
            _.CustomEvent('rzp_network_error', {
              detail: {
                method,
                url,
                baseUrl: url.split('?')[0],
                status: xhr.status,
                xhrErrored: false,
                response: json,
              },
            })
          );
        }

        callback(json);
      }
    };
    xhr.onerror = function() {
      var resp = networkError;
      resp.xhr = {
        status: 0,
      };

      global.dispatchEvent(
        _.CustomEvent('rzp_network_error', {
          detail: {
            method,
            url,
            baseUrl: url.split('?')[0],
            status: 0,
            xhrErrored: true,
            response: resp,
          },
        })
      );

      callback(resp);
    };

    headers
      |> _Obj.setTruthyProp(sessionIdHeader, sessionId)
      |> _Obj.setTruthyProp(trackIdHeader, trackId)
      |> _Obj.loop((v, k) => xhr.setRequestHeader(k, v));

    xhr.send(data);
  },
});

function normalizeOptions(options) {
  if (_.isString(options)) {
    options = { url: options };
  }

  var { method, headers, callback, data } = options;

  // set normalized defaults
  if (!headers) {
    options.headers = {};
  }
  if (!method) {
    options.method = 'get';
  }
  if (!callback) {
    options.callback = _Func.noop;
  }
  if (_.isNonNullObject(data) && !_.is(data, FormData)) {
    data = _.obj2query(data);
  }
  options.data = data;

  return options;
}

/**
 * Sends post request with the given options.
 * @param {Object} opts
 *
 * @returns {Object}
 */
function post(opts) {
  opts.method = 'post';
  if (!opts.headers) {
    opts.headers = {};
  }
  if (!opts.headers['Content-type']) {
    opts.headers['Content-type'] = 'application/x-www-form-urlencoded';
  }

  return fetch(opts);
}

/**
 * Sends jsonp request with the given options.
 * @param {Object} options
 *
 * @returns {Object}
 */
function jsonp(options) {
  if (!options.data) {
    options.data = {};
  }

  // callbackIndex is the nth fetch.jsonp call
  const callbackIndex = jsonp_cb++;

  // We need to use attempt numbers to generate unique URLs
  let attemptNumber = 0;

  let request = new fetch(options);
  options = request.options;

  request.call = function(cb = options.callback) {
    // This is the same fetch.jsonp instance. Incrememt the attempt number.
    attemptNumber++;

    const callbackName = `jsonp${callbackIndex}_${attemptNumber}`;

    let done = false;

    const onload = function() {
      if (
        !done &&
        (!this.readyState ||
          this.readyState === 'loaded' ||
          this.readyState === 'complete')
      ) {
        done = true;
        this.onload = this.onreadystatechange = null;
        this |> _El.detach;
      }
    };

    let req = (global.Razorpay[callbackName] = function(data) {
      _Obj.deleteProp(data, 'http_status_code');
      cb(data);
      _Obj.deleteProp(global.Razorpay, callbackName);
    });

    this.setReq('jsonp', req);

    // Make the source URL
    let src = _.appendParamsToUrl(options.url, options.data);

    // Add callback name to the source URL
    src = _.appendParamsToUrl(
      src,
      _.obj2query({
        callback: `Razorpay.${callbackName}`,
      })
    );

    _El.create('script')
      |> _Obj.extend({
        src,
        async: true,
        onerror: e => cb(networkError),
        onload,
        onreadystatechange: onload,
      })
      |> _El.appendTo(_Doc.documentElement);
  };

  return request;
}

fetch.post = post;
fetch.setSessionId = setSessionId;
fetch.setTrackId = setTrackId;
fetch.jsonp = jsonp;
