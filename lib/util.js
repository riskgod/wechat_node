'use strict';
const xml2js = require('xml2js');
const parser = new xml2js.Parser();

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

/**
 * get data from wechat-server req,if the type of is xml,convert to json
 * @param req
 * @param callback
 */
exports.receiveData = function (req,callback) {
    var post_data="";
    req.on("data",function(data){post_data += data;});
    req.on("end",function(){
        if(req.headers['content-type'] == 'text/xml'){
            var xmlStr=post_data.toString('utf-8',0,post_data.length);
            parser.parseString(xmlStr, function (err, result) {
                callback(err,result);
            });
        }
        else {
            callback(null,post_data);
        }
    });
};

exports.make = function (host, name, fn) {
  host[name] = function () {
    this.preRequest(this['_' + name], arguments);
  };
  host['_' + name] = fn;
};
