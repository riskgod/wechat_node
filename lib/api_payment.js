'use strict';

const util = require('./util');
const wrapper = util.wrapper;
const postJSON = util.postJSON;


exports.deliverNotify = function(data, callback)  {
  this.preRequest(this._deliverNotify, arguments);
};

/*!
 * 发货通知的未封装版本
 */
exports._deliverNotify = function(data, callback)  {
  let url = this.endpoint + '/pay/delivernotify?access_token=' + this.token.accessToken;
  this.request(url, postJSON(data), wrapper(callback));
};


exports.orderQuery = function(query, callback)  {
  this.preRequest(this._orderQuery, arguments);
};

/*!
 * 发货通知的未封装版本
 */
exports._orderQuery = function(query, callback)  {
  let url = this.endpoint + '/pay/orderquery?access_token=' + this.token.accessToken;
  this.request(url, postJSON(query), wrapper(callback));
};
