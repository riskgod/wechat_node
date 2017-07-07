'use strict';

const util = require('./util');
const wrapper = util.wrapper;
const postJSON = util.postJSON;


exports.createTmpQRCode =  (sceneId, expire, callback) =>{
  this.preRequest(this._createTmpQRCode, arguments);
};

/*!
 * 创建临时二维码的未封装版本
 */
exports._createTmpQRCode =  (sceneId, expire, callback)=> {
  let url = this.endpoint + '/cgi-bin/qrcode/create?access_token=' + this.token.accessToken;
  let data = {
    'expire_seconds': expire,
    'action_name': 'QR_SCENE',
    'action_info': {'scene': {'scene_id': sceneId}}
  };
  this.request(url, postJSON(data), wrapper(callback));
};


exports.createLimitQRCode =  (sceneId, callback) =>{
  this.preRequest(this._createLimitQRCode, arguments);
};


exports._createLimitQRCode =  (sceneId, callback) =>{
  let url = this.endpoint + '/cgi-bin/qrcode/create?access_token=' + this.token.accessToken;
  let data = {
    'action_name': 'QR_LIMIT_SCENE',
    'action_info': {'scene': {'scene_id': sceneId}}
  };
  // 字符串
  if (typeof sceneId === 'string') {
    data.action_name = 'QR_LIMIT_STR_SCENE';
    data.action_info.scene = {'scene_str': sceneId};
  }
  this.request(url, postJSON(data), wrapper(callback));
};


exports.showQRCodeURL =  (ticket) =>{
  return this.mpPrefix + 'showqrcode?ticket=' + ticket;
};
