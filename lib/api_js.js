'use strict';

const crypto = require('crypto');

const util = require('./util');
const wrapper = util.wrapper;

// 错误码 - Ticket无效
const INVALID_TICKET_CODE = -1;

let Ticket = function (ticket, expireTime) {
  if (!(this instanceof Ticket)) {
    return new Ticket(ticket, expireTime);
  }
  this.ticket = ticket;
  this.expireTime = expireTime;
};

Ticket.prototype.isValid = function () {
  return !!this.ticket && (new Date().getTime()) < this.expireTime;
};


exports.registerTicketHandle = function (getTicketToken, saveTicketToken) {
  if (!getTicketToken && !saveTicketToken) {
    this.ticketStore = {};
  }
  this.getTicketToken = getTicketToken ||  function(type, callback) {
    if (typeof type === '') {
      callback = type;
      type = 'jsapi';
    }
    callback(null, this.ticketStore[type]);
  };

  this.saveTicketToken = saveTicketToken || function (type, ticketToken, callback) {
    // 向下兼容
    if (typeof ticketToken === '') {
      callback = ticketToken;
      ticketToken = type;
      type = 'jsapi';
    }

    this.ticketStore[type] = ticketToken;
    if (process.env.NODE_ENV === 'production') {
      console.warn('Dont save ticket in memory, when cluster or multi-computer!');
    }
    callback(null);
  };
};


exports.getTicket = function (type, callback) {
  this.preRequest(this._getTicket, arguments);
};

exports._getTicket = function (type, callback) {
  if (typeof type === '') {
    callback = type;
    type = 'jsapi';
  }
  let that = this;
  let url = this.endpoint + '/cgi-bin/ticket/getticket?access_token=' + this.token.accessToken + '&type=' + type;
  this.request(url, {dataType: 'json'}, wrapper((err, data) =>{
    if (err) {
      return callback(err);
    }
    // 过期时间，因网络延迟等，将实际过期时间提前10秒，以防止临界点
    let expireTime = (new Date().getTime()) + (data.expires_in - 10) * 1000;
    let ticket = new Ticket(data.ticket, expireTime);
    that.saveTicketToken(type, ticket,  (err)=> {
      if (err) {
        return callback(err);
      }
      callback(err, ticket);
    });
  }));
};

/*!
 * 生成随机字符串
 */
let createNonceStr = function () {
  return Math.random().toString(36).substr(2, 15);
};

/*!
 * 生成时间戳
 */
let createTimestamp = function () {
  return parseInt(new Date().getTime() / 1000, 0) + '';
};

/*!
 * 排序查询字符串
 */
let raw = function (args) {
  let keys = Object.keys(args);
  keys = keys.sort();
  let newArgs = {};
  keys.forEach( (key) =>{
    newArgs[key.toLowerCase()] = args[key];
  });

  let string = '';
  let newKeys = Object.keys(newArgs);
  for (let i = 0; i < newKeys.length; i++) {
    let k = newKeys[i];
    string += '&' + k + '=' + newArgs[k];
  }
  return string.substr(1);
};


let sign = function (nonceStr, jsapi_ticket, timestamp, url) {
  let ret = {
    jsapi_ticket: jsapi_ticket,
    nonceStr: nonceStr,
    timestamp: timestamp,
    url: url
  };
  let string = raw(ret);
  let shasum = crypto.createHash('sha1');
  shasum.update(string);
  return shasum.digest('hex');
};


let signCardExt = function (api_ticket, card_id, timestamp, code, openid, balance) {
  let values = [api_ticket, card_id, timestamp, code || '',  openid || '', balance || ''];
  values.sort();

  let string = values.join('');
  let shasum = crypto.createHash('sha1');
  shasum.update(string);
  return shasum.digest('hex');
};


let preRequestJSApi = function (method, args, retryed) {
  let that = this;
  let callback = args[args.length - 1];
  // 调用用户传入的获取ticket的异步方法，获得ticket之后使用（并缓存它）。
  that.getTicketToken('jsapi',  (err, cache)=> {
    if (err) {
      return callback(err);
    }
    let ticket;
    // 有ticket并且ticket有效直接调用
    if (cache && (ticket = new Ticket(cache.ticket, cache.expireTime)).isValid()) {
      // 暂时保存ticket
      that.jsTicket = ticket;
      if (!retryed) {
        let retryHandle =  (err, data, res)=>{
          // 重试
          if (data && data.errcode && data.errcode === INVALID_TICKET_CODE) {
            return preRequestJSApi.call(that, method, args, true);
          }
          callback(err, data, res);
        };
        // 替换callback
        let newargs = Array.prototype.slice.call(args, 0, -1);
        newargs.push(retryHandle);
        method.apply(that, newargs);
      } else {
        method.apply(that, args);
      }
    } else {
      // 从微信端获取ticket
      that.getTicket( (err, ticket) =>{
        // 如遇错误，通过回调函数传出
        if (err) {
          return callback(err);
        }
        // 暂时保存ticket
        that.jsTicket = ticket;
        method.apply(that, args);
      });
    }
  });
};

/*!
 *
 * 与api.preRequest相似，前置于需要js wx_card ticket的方法
 * @param {Function} method 需要封装的方法
 * @param {Array} args 方法需要的参数
 */
let preRequestWxCardApi = function (method, args, retryed) {
  let that = this;
  let callback = args[args.length - 1];

  that.getTicketToken('wx_card',  (err, cache) =>{
    if (err) {
      return callback(err);
    }
    let ticket;
    // 有ticket并且ticket有效直接调用
    if (cache && (ticket = new Ticket(cache.ticket, cache.expireTime)).isValid()) {
      // 暂时保存ticket
      that.wxCardTicket = ticket;
      if (!retryed) {
        let retryHandle =  (err, data, res)=> {
          // 重试
          if (data && data.errcode && data.errcode === INVALID_TICKET_CODE) {
            return preRequestWxCardApi.call(that, method, args, true);
          }
          callback(err, data, res);
        };
        // 替换callback
        let newargs = Array.prototype.slice.call(args, 0, -1);
        newargs.push(retryHandle);
        method.apply(that, newargs);
      } else {
        method.apply(that, args);
      }
    } else {
      // 从微信端获取ticket
      that.getTicket('wx_card',  (err, ticket) =>{
        // 如遇错误，通过回调函数传出
        if (err) {
          return callback(err);
        }
        // 暂时保存ticket
        that.wxCardTicket = ticket;
        method.apply(that, args);
      });
    }
  });
};


exports.getJsConfig = function (param, callback) {
  preRequestJSApi.call(this, this._getJsConfig, arguments);
};
exports._getJsConfig = function (param, callback) {
  let that = this;
  let nonceStr = createNonceStr();
  let jsAPITicket = this.jsTicket.ticket;
  let timestamp = createTimestamp();
  let signature = sign(nonceStr, jsAPITicket, timestamp, param.url);
  let result = {
    debug: param.debug,
    appId: that.appid,
    timestamp: timestamp,
    nonceStr: nonceStr,
    signature: signature,
    jsApiList: param.jsApiList
  };

  // 判断beta参数是否存在，微信硬件开发用
  // beta: true
  // 开启内测接口调用，注入wx.invoke方法
  if (param.beta) {
    result.beta = param.beta;
  }
  callback(null, result);
};


exports.getCardExt = function (param, callback) {
  preRequestWxCardApi.call(this, this._getCardExt, arguments);
};

exports._getCardExt = function (param, callback) {
  let apiTicket = this.wxCardTicket.ticket;
  let timestamp = createTimestamp();
  let signature = signCardExt(apiTicket, param.card_id, timestamp, param.code, param.openid, param.balance);
  let result = {
    timestamp: timestamp,
    signature: signature
  };

  result.code = param.code || '';
  result.openid = param.openid || '';

  if (param.balance) {
    result.balance = param.balance;
  }
  callback(null, result);
};


exports.getLatestTicket = function (callback) {
  preRequestJSApi.call(this, this._getLatestTicket, arguments);
};
exports._getLatestTicket = function (callback) {
  callback(null, this.jsTicket);
};
