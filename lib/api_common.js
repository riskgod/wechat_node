'use strict';

// 本文件用于wechat API，基础文件，主要用于Token的处理和mixin机制
var urllib = require('urllib');
var util = require('./util');
var extend = require('util')._extend;
var wrapper = util.wrapper;

var AccessToken = function (accessToken, expireTime) {
  if (!(this instanceof AccessToken)) {
    return new AccessToken(accessToken, expireTime);
  }
  this.accessToken = accessToken;
  this.expireTime = expireTime;
};

AccessToken.prototype.isValid = function () {
  return !!this.accessToken && (new Date().getTime()) < this.expireTime;
};

var API = function (appid, appsecret, getToken, saveToken) {
  this.appid = appid;
  this.appsecret = appsecret;
  this.getToken = getToken || function (callback) {
    callback(null, this.store);
  };
  this.saveToken = saveToken || function (token, callback) {
    this.store = token;
    if (process.env.NODE_ENV === 'production') {
      console.warn('Don\'t save token in memory, when cluster or multi-computer!');
    }
    callback(null);
  };
  this.endpoint = 'https://api.weixin.qq.com';
  this.mpPrefix = 'https://mp.weixin.qq.com/cgi-bin/';
  this.fileServerPrefix = 'http://file.api.weixin.qq.com/cgi-bin/';
  this.defaults = {};
  // set default js ticket handle
  this.registerTicketHandle();
};

API.prototype.setEndpoint = function (domain) {
  this.endpoint = 'https://' + domain;
};

API.prototype.setOpts = function (opts) {
  this.defaults = opts;
};

API.prototype.request = function (url, opts, callback) {
  var options = {};
  extend(options, this.defaults);
  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  }
  for (var key in opts) {
    if (key !== 'headers') {
      options[key] = opts[key];
    } else {
      if (opts.headers) {
        options.headers = options.headers || {};
        extend(options.headers, opts.headers);
      }
    }
  }
  urllib.request(url, options, callback);
};

API.prototype.getAccessToken = function (callback) {
  var that = this;
  var url = this.endpoint + '/cgi-bin/token?grant_type=client_credential&appid=' + this.appid + '&secret=' + this.appsecret;
  this.request(url, {dataType: 'json'}, wrapper(function (err, data) {
    if (err) {
      return callback(err);
    }
    // 过期时间，因网络延迟等，将实际过期时间提前10秒，以防止临界点
    var expireTime = (new Date().getTime()) + (data.expires_in - 10) * 1000;
    var token = AccessToken(data.access_token, expireTime);
    that.saveToken(token, function (err) {
      if (err) {
        return callback(err);
      }
      callback(err, token);
    });
  }));
  return this;
};

API.prototype.preRequest = function (method, args, retryed) {
  var that = this;
  var callback = args[args.length - 1];
  // 调用用户传入的获取token的异步方法，获得token之后使用（并缓存它）。
  that.getToken(function (err, token) {
    if (err) {
      return callback(err);
    }
    var accessToken;
    // 有token并且token有效直接调用
    if (token && (accessToken = AccessToken(token.accessToken, token.expireTime)).isValid()) {
      // 暂时保存token
      that.token = accessToken;
      if (!retryed) {
        var retryHandle = function (err, data, res) {
          // 40001 重试
          if (data && data.errcode && data.errcode === 40001) {
            return that.preRequest(method, args, true);
          }
          callback(err, data, res);
        };
        // 替换callback
        var newargs = Array.prototype.slice.call(args, 0, -1);
        newargs.push(retryHandle);
        method.apply(that, newargs);
      } else {
        method.apply(that, args);
      }
    } else {
      // 使用appid/appsecret获取token
      that.getAccessToken(function (err, token) {
        // 如遇错误，通过回调函数传出
        if (err) {
          return callback(err);
        }
        // 暂时保存token
        that.token = token;
        method.apply(that, args);
      });
    }
  });
};

API.prototype.getLatestToken = function (callback) {
  var that = this;
  // 调用用户传入的获取token的异步方法，获得token之后使用（并缓存它）。
  that.getToken(function (err, token) {
    if (err) {
      return callback(err);
    }
    var accessToken;
    // 有token并且token有效直接调用
    if (token && (accessToken = AccessToken(token.accessToken, token.expireTime)).isValid()) {
      return callback(null, accessToken);
    }
    // 使用appid/appsecret获取token
    that.getAccessToken(callback);
  });
};

API.mixin = function (obj) {
  for (var key in obj) {
    if (API.prototype.hasOwnProperty(key)) {
      throw new Error('Don\'t allow override existed prototype method. method: '+ key);
    }
    API.prototype[key] = obj[key];
  }
};

API.patch = function (functionName, apiUrl, override) {
  if (typeof apiUrl !== 'string') {
    throw new Error('The second argument expect a type of string as the request url of wechat');
  }

  if (typeof functionName !== 'string') {
    throw new Error('The first argument expect a type of string as the name of new function');
  }

  if (API.prototype[functionName] || API.prototype['_' + functionName] ) {
    if (override !== true) {
      throw new Error('wechat-api already has a prototype named ['+ functionName + '], use "true" as third param to override it or change your new function name.');
    } else {
      console.warn('wechat-api already has a prototype named ['+ functionName + '], will override the orignal one.');
    }
  }

  util.make(API.prototype, functionName, function (info, callback) {
    var hasMark = apiUrl.indexOf('?') >= 0;
    var url = apiUrl + (hasMark ? '&access_token=': '?access_token=') + this.token.accessToken;
    this.request(url, util.postJSON(info), wrapper(callback));
  });
};

API.AccessToken = AccessToken;

module.exports = API;
