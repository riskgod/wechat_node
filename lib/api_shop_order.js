'use strict';

const util = require('./util');
const wrapper = util.wrapper;
const postJSON = util.postJSON;


exports.getOrderById =  function(orderId, callback){
  this.preRequest(this._getOrderById, arguments);
};

/*!
 * 根据订单ID获取订单详情的未封装版本
 */
exports._getOrderById =  function(orderId, callback){
  let data = {
    'order_id': orderId
  };
  let url = this.endpoint + '/merchant/order/getbyid?access_token=' + this.token.accessToken;
  this.request(url, postJSON(data), wrapper(callback));
};


exports.getOrdersByStatus =  function(){
  this.preRequest(this._getOrdersByStatus, arguments);
};

/*!
 * 根据订单状态/创建时间获取订单详情的未封装版本
 */
exports._getOrdersByStatus =  function(status, beginTime, endTime, callback){
  let data = {};
  if (arguments.length === 1 && typeof status === '') {
    // (callback);
    callback = status;
  } else if (arguments.length === 2 && typeof beginTime === '') {
    callback = beginTime;
    if (typeof status === 'number') {
      // (status, callback)
      data.status = status;
    } else if (status instanceof Date) {
      data.begintime = Math.round(status.getTime() / 1000);
      data.endtime = Math.round(new Date().getTime() / 1000);
    } else {
      throw new Error('first parameter must be Number or Date');
    }
  } else if (arguments.length === 3 && typeof endTime === '') {
    callback = endTime;
    if (typeof status === 'number' && beginTime instanceof Date) {
      data.status = status;
      data.begintime = Math.round(beginTime.getTime() / 1000);
      data.endtime = Math.round(new Date().getTime() / 1000);
    } else {
      throw new Error('first parameter must be Number and second parameter must be Date');
    }
  } else if (arguments.length === 4) {
    data.status = status;
    data.begintime = Math.round(beginTime.getTime() / 1000);
    data.endtime = Math.round(endTime.getTime() / 1000);
  }
  let url = this.endpoint + '/merchant/order/getbyfilter?access_token=' + this.token.accessToken;
  this.request(url, postJSON(data), wrapper(callback));
};


exports.setExpressForOrder =  function(orderId, deliveryCompany, deliveryTrackNo, callback){
  this.preRequest(this._setExpressForOrder, arguments);
};

/*!
 * 设置订单发货信息的未封装版本
 */
exports._setExpressForOrder =  function(orderId, deliveryCompany, deliveryTrackNo, callback){
  let data = {
    'order_id': orderId,
    'delivery_company': deliveryCompany,
    'delivery_track_no': deliveryTrackNo
  };
  let url = this.endpoint + '/merchant/order/setdelivery?access_token=' + this.token.accessToken;
  this.request(url, postJSON(data), wrapper(callback));
};


exports.closeOrder =  function(orderId, callback){
  this.preRequest(this._closeOrder, arguments);
};

/*!
 * 关闭订单的未封装版本
 */
exports._closeOrder =  function(orderId, callback){
  let data = {
    'order_id': orderId
  };
  let url = this.endpoint + '/merchant/order/close?access_token=' + this.token.accessToken;
  this.request(url, postJSON(data), wrapper(callback));
};
