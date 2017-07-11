'use strict';

const path = require('path');
const fs = require('fs');

const formstream = require('formstream');

const util = require('./util');
const wrapper = util.wrapper;
const postJSON = util.postJSON;
const make = util.make;


exports.uploadMaterial= function (filepath, type, callback) {
  let that = this;
  fs.stat(filepath,  (err, stat)=> {
    if (err) {
      return callback(err);
    }
    let form = formstream();
    form.file('media', filepath, path.basename(filepath), stat.size);
    let url = that.endpoint + '/cgi-bin/material/add_material?access_token=' + that.token.accessToken + '&type=' + type;
    let opts = {
      dataType: 'json',
      type: 'POST',
      timeout: 60000, // 60秒超时
      headers: form.headers(),
      stream: form
    };
    that.request(url, opts, wrapper(callback));
  });
};

['image', 'voice', 'thumb'].forEach( (type) =>{
  let method = 'upload' + type[0].toUpperCase() + type.substring(1) + 'Material';
  exports[method] = function (filepath, callback) {
    this.uploadMaterial(filepath, type, callback);
  };
});


exports.uploadVideoMaterial= function (filepath, description, callback) {
  let that = this;
  fs.stat(filepath,  (err, stat)=> {
    if (err) {
      return callback(err);
    }
    let form = formstream();
    form.file('media', filepath, path.basename(filepath), stat.size);
    form.field('description', JSON.stringify(description));
    let url = that.endpoint + '/cgi-bin/material/add_material?access_token=' + that.token.accessToken + '&type=video';
    let opts = {
      dataType: 'json',
      type: 'POST',
      timeout: 60000, // 60秒超时
      headers: form.headers(),
      stream: form
    };
    that.request(url, opts, wrapper(callback));
  });
};


exports.uploadNewsMaterial = function (news, callback) {
  this.preRequest(this._uploadNewsMaterial, arguments);
};

/*!
 * 新增永久图文素材的未封装版本
 */
exports._uploadNewsMaterial = function (news, callback) {
  let url = this.endpoint + '/cgi-bin/material/add_news?access_token=' + this.token.accessToken;
  this.request(url, postJSON(news), wrapper(callback));
};



exports.updateNewsMaterial = function (news, callback) {
  this.preRequest(this._updateNewsMaterial, arguments);
};

/*!
 * 更新永久图文素材的未封装版本
 */
exports._updateNewsMaterial = function (news, callback) {
  let url = this.endpoint + '/cgi-bin/material/update_news?access_token=' + this.token.accessToken;
  this.request(url, postJSON(news), wrapper(callback));
};


exports.getMaterial = function (mediaId, callback) {
  this.preRequest(this._getMaterial, arguments);
};

/*!
 * 下载永久素材的未封装版本
 */
exports._getMaterial = function (mediaId, callback) {
  let url = this.endpoint + '/cgi-bin/material/get_material?access_token=' + this.token.accessToken;
  let opts = {
    type: 'POST',
    data: {'media_id': mediaId},
    headers: {
      'Content-Type': 'application/json'
    }
  };
  opts.timeout = 60000; // 60秒超时
  this.request(url, opts, wrapper( (err, data, res) =>{
    // handle some err
    if (err) {
      return callback(err);
    }
    let contentType = res.headers['content-type'];
    if (contentType === 'application/json') {
      let ret;
      try {
        ret = JSON.parse(data);
        if (ret.errcode) {
          err = new Error(ret.errmsg);
          err.name = 'WeChatAPIError';
        }
      } catch (ex) {
        return callback(ex, data, res);
      }
      return callback(err, ret, res);
    }
    // 输出Buffer对象
    callback(null, data, res);
  }));
};


exports.removeMaterial = function (mediaId, callback) {
  this.preRequest(this._removeMaterial, arguments);
};

/*!
 * 删除永久素材的未封装版本
 */
exports._removeMaterial = function (mediaId, callback) {
  let url = this.endpoint + '/cgi-bin/material/del_material?access_token=' + this.token.accessToken;
  this.request(url, postJSON({'media_id': mediaId}), wrapper(callback));
};



exports.getMaterialCount = function (callback) {
  this.preRequest(this._getMaterialCount, arguments);
};



/*!
 * 删除永久素材的未封装版本
 */
exports._getMaterialCount = function (callback) {
  let url = this.endpoint + '/cgi-bin/material/get_materialcount?access_token=' + this.token.accessToken;
  this.request(url, {dataType: 'json'}, wrapper(callback));
};


exports.getMaterials = function (type, offset, count, callback) {
  this.preRequest(this._getMaterials, arguments);
};




exports._getMaterials = function (type, offset, count, callback) {
  let url = this.endpoint + '/cgi-bin/material/batchget_material?access_token=' + this.token.accessToken;
  let data = {
    type: type,
    offset: offset,
    count: count
  };
  this.request(url, postJSON(data), wrapper(callback));
};
