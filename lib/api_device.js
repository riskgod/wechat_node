'use strict';

const util = require('./util');
const wrapper = util.wrapper;
const postJSON = util.postJSON;


exports.transferMessage=  (deviceType, deviceId, openid, content, callback)=> {
  // https://api.weixin.qq.com/device/transmsg?access_token=ACCESS_TOKEN
  let url = this.endpoint + '/device/transmsg?access_token=' + this.token.accessToken;
  let info = {
    'device_type': deviceType,
    'device_id': deviceId,
    'open_id': openid,
    'content': new Buffer(content).toString('base64')
  };
  this.request(url, postJSON(info), wrapper(callback));
};

exports.transferStatus=(deviceType, deviceId, openid, status, callback) =>{
  // https://api.weixin.qq.com/device/transmsg?access_token=ACCESS_TOKEN
  let url = this.endpoint + '/device/transmsg?access_token=' + this.token.accessToken;
  let info = {
    'device_type': deviceType,
    'device_id': deviceId,
    'open_id': openid,
    'msg_type': '2',
    'device_status': status
  };
  this.request(url, postJSON(info), wrapper(callback));
};

exports.createDeviceQRCode = (deviceIds, callback)=> {
  // https://api.weixin.qq.com/device/create_qrcode?access_token=ACCESS_TOKEN
  let url = this.endpoint + '/device/create_qrcode?access_token=' + this.token.accessToken;
  let info = {
    'device_num': deviceIds.length,
    'device_id_list': deviceIds
  };
  this.request(url, postJSON(info), wrapper(callback));
};

exports.authorizeDevices =  (devices, optype, productid, callback)=> {
  // https://api.weixin.qq.com/device/authorize_device?access_token=ACCESS_TOKEN
  let url = this.endpoint + '/device/authorize_device?access_token=' + this.token.accessToken;
  let data = {
    'device_num': devices.length,
    'device_list': devices,
    'op_type': optype
  };
  if (typeof productid !== '') {
    data.product_id = productid;
  } else {
    callback = productid;
  }
  this.request(url, postJSON(data), wrapper(callback));
};

//第三方公众账号通过设备id从公众平台批量获取设备二维码。
exports.getDeviceQRCode = (product_id, callback) =>{
  // https://api.weixin.qq.com/device/create_qrcode?access_token=ACCESS_TOKEN
  let url = this.endpoint + '/device/getqrcode?access_token=' + this.token.accessToken + '&product_id=' + product_id;
  this.request(url, {dataType: 'json'}, wrapper(callback));
};

exports.bindDevice = (deviceId, openid, ticket, callback)=> {
  // https://api.weixin.qq.com/device/bind?access_token=ACCESS_TOKEN
  let url = this.endpoint + '/device/bind?access_token=' + this.token.accessToken;
  let data = {
    ticket: ticket,
    device_id: deviceId,
    openid: openid
  };
  this.request(url, postJSON(data), wrapper(callback));
};

exports.unbindDevice =  (deviceId, openid, ticket, callback)=> {
  // https://api.weixin.qq.com/device/unbind?access_token=ACCESS_TOKEN
  let url = this.endpoint + '/device/unbind?access_token=' + this.token.accessToken;
  let data = {
    ticket: ticket,
    device_id: deviceId,
    openid: openid
  };
  this.request(url, postJSON(data), wrapper(callback));
};


exports.compelBindDevice=  (deviceId, openid, callback)=> {
  // https://api.weixin.qq.com/device/compel_bind?access_token=ACCESS_TOKEN
  let url = this.endpoint + '/device/compel_bind?access_token=' + this.token.accessToken;
  let data = {
    device_id: deviceId,
    openid: openid
  };
  this.request(url, postJSON(data), wrapper(callback));
};

exports.compelUnbindDevice  = (deviceId, openid, callback) =>{
  // https://api.weixin.qq.com/device/compel_unbind?access_token=ACCESS_TOKEN
  let url = this.endpoint + '/device/compel_unbind?access_token=' + this.token.accessToken;
  let data = {
    device_id: deviceId,
    openid: openid
  };
  this.request(url, postJSON(data), wrapper(callback));
};

exports.getDeviceStatus =  (deviceId, callback)=> {
  // https://api.weixin.qq.com/device/get_stat?access_token=ACCESS_TOKEN&device_id=DEVICE_ID
  let url = this.endpoint + '/device/get_stat?access_token=' + this.token.accessToken + '&device_id=' + deviceId;
  this.request(url, {dataType: 'json'}, wrapper(callback));
};

exports.verifyDeviceQRCode =   (ticket, callback) =>{
  // https://api.weixin.qq.com/device/verify_qrcode?access_token=ACCESS_TOKEN
  let url = this.endpoint + '/device/verify_qrcode?access_token=' + this.token.accessToken;
  let data = {
    ticket: ticket
  };
  this.request(url, postJSON(data), wrapper(callback));
};

exports.getOpenID =  (deviceId, deviceType, callback) =>{
  // https://api.weixin.qq.com/device/get_openid?access_token=ACCESS_TOKEN&device_type=DEVICE_TYPE&device_id=DEVICE_ID
  let url = this.endpoint + '/device/get_openid?access_token=' + this.token.accessToken + '&device_id=' + deviceId + '&device_type=' + deviceType;
  this.request(url, {dataType: 'json'}, wrapper(callback));
};

exports.getBindDevice = (openid, callback) =>{
  // https://api.weixin.qq.com/device/get_bind_device?access_token=ACCESS_TOKEN&openid=OPENID
  let url = this.endpoint + '/device/get_bind_device?access_token=' + this.token.accessToken + '&openid=' + openid;
  this.request(url, {dataType: 'json'}, wrapper(callback));
};
