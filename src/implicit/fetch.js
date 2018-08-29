const sessionIdHeader = 'X-Razorpay-SessionId';
const Xhr = XMLHttpRequest;
const networkError = _.rzpError('Network error');
let jsonp_cb = 0;
let sessionId;

function setSessionId(id) {
  sessionId = id;
}

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

  till: function(continueUntilFn) {
    return this.setReq(
      'timeout',
      setTimeout(() => {
        this.call(response => {
          if (continueUntilFn(response)) {
            this.till(continueUntilFn);
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
      Razorpay[this.req] = _Func.noop;
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
        callback(json);
      }
    };
    xhr.onerror = function() {
      var resp = networkError;
      resp.xhr = {
        status: 0,
      };
      callback(resp);
    };

    headers
      |> _Obj.setTruthyProp(sessionIdHeader, sessionId)
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
  if (_.isNonNullObject(data)) {
    data = _.obj2query(data);
  }
  options.data = data;

  return options;
}

function post(opts) {
  opts.method = 'post';
  if (!opts.headers) {
    opts.headers = {};
  }
  opts.headers['Content-type'] = 'application/x-www-form-urlencoded';
  return fetch(opts);
}

function jsonp(options) {
  if (!options.data) {
    options.data = {};
  }
  let callbackName = 'jsonp' + jsonp_cb++;
  options.data.callback = 'Razorpay.' + callbackName;

  let request = new fetch(options);
  options = request.options;

  request.call = function(cb = options.callback) {
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

    let req = (Razorpay[callbackName] = function(data) {
      _Obj.deleteProp(data, 'http_status_code');
      cb(data);
      _Obj.deleteProp(Razorpay, callbackName);
    });
    this.setReq('jsonp', req);

    _El.create('script')
      |> _Obj.extend({
        src: _.appendParamsToUrl(options.url, options.data),
        async: true,
        onerror: e => options.callback(networkError),
        onload,
        onreadystatechange: onload,
      })
      |> _El.appendTo(_Doc.documentElement);
  };

  return request;
}

fetch.post = post;
fetch.setSessionId = setSessionId;
fetch.jsonp = jsonp;
