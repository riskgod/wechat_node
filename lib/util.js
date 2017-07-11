'use strict';

exports.wrapper =  function(callback) {
  return  (err, data, res)=> {
    callback = callback || function () {};
    if (err) {
      err.name = 'WeChatAPI' + err.name;
      return callback(err, data, res);
    }
    if (data && data.errcode) {
      err = new Error(data.errmsg);
      err.name = 'WeChatAPIError';
      err.code = data.errcode;
      return callback(err, data, res);
    }
    if (data == null) {
      err = new Error("No data received.");
      err.name = 'WeChatAPIError';
      err.code = -1;
      return callback(err, data, res);
    }
    callback(null, data, res);
  };
};

exports.postJSON =  function(data) {
  return {
    dataType: 'json',
    type: 'POST',
    data: data,
    headers: {
      'Content-Type': 'application/json'
    }
  };
};

exports.make = function (host, name, fn) {
  host[name] = function () {
    this.preRequest(this['_' + name], arguments);
  };
  host['_' + name] = fn;
};
