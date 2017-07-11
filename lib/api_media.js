'use strict';

const path = require('path');
const fs = require('fs');

const formstream = require('formstream');

const util = require('./util');
const wrapper = util.wrapper;


exports.uploadMedia = function (filepath, type, callback) {
  this.preRequest(this._uploadMedia, arguments);
};

/*!
 * 上传多媒体文件的未封装版本
 */
exports._uploadMedia = function (filepath, type, callback) {
  let that = this;
  fs.stat(filepath,  (err, stat) =>{
    if (err) {
      return callback(err);
    }
    let form = formstream();
    form.file('media', filepath, path.basename(filepath), stat.size);
    let url = that.endpoint + '/cgi-bin/media/upload?access_token=' + that.token.accessToken + '&type=' + type;
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


exports.uploadMediaStream = function (req, type, callback) {
  this.preRequest(this._uploadMediaStream, arguments);
};

/*!
 * 流式上传多媒体文件的未封装版本
 */
exports._uploadMediaStream = function (req, type, callback) {
  let that = this;
  let url = that.endpoint + '/cgi-bin/media/upload?access_token=' + that.token.accessToken + '&type=' + type;
  let opts = {
    dataType: 'json',
    type: 'POST',
    timeout: 60000, // 60秒超时
    headers: req.headers,
    stream: req
  };
  delete opts.headers.host;
  that.request(url, opts, callback);
};

['image', 'voice', 'video', 'thumb'].forEach( (type) =>{
  let method = 'upload' + type[0].toUpperCase() + type.substring(1);
  exports[method] = function (filepath, callback) {
    this.uploadMedia(filepath, type, callback);
  };
  exports[method+'Stream'] = function (req, callback) {
    this.uploadMediaStream(req, type, callback);
  };
});


exports.getMedia = function (mediaId, callback) {
  this.preRequest(this._getMedia, arguments);
};

/*!
 * 获取临时素材的未封装版本
 */
exports._getMedia = function (mediaId, callback) {
  let url = this.endpoint + '/cgi-bin/media/get?access_token=' + this.token.accessToken + '&media_id=' + mediaId;
  let opts = {
    timeout: 60000 // 60秒超时
  };
  this.request(url, opts, wrapper( (err, data, res) =>{
    // handle some err
    if (err) {
      return callback(err);
    }
    let contentType = res.headers['content-type'];
    if (contentType === 'application/json' || contentType === 'text/plain') {
      let ret;
      try {
        ret = JSON.parse(data);
        if (ret.errcode) {
          err = new Error(ret.errmsg);
          err.name = 'WeChatAPIError';
        }
      } catch (ex) {
        callback(ex, data, res);
        return;
      }
      return callback(err, ret, res);
    }
    // 输出Buffer对象
    callback(null, data, res);
  }));
};



exports.uploadImage = function (filepath, callback) {
  this.preRequest(this._uploadImage, arguments);
};

/*!
 * 上传图片未封装版本
 */
exports._uploadImage = function (filepath, callback) {
  let that = this;
  fs.stat(filepath,  (err, stat)=> {
    if (err) {
      return callback(err);
    }
    let form = formstream();
    form.file('media', filepath, path.basename(filepath), stat.size);
    let url = that.endpoint + '/cgi-bin/media/uploadimg?access_token=' + that.token.accessToken;
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


exports.uploadImageStream = function (req, callback) {
  this.preRequest(this._uploadImageStream, arguments);
};

/*!
 * 上传来自上游管道的图文消息内的图片未封装版本
 */
exports._uploadImageStream = function (req, callback) {
  let that = this;
  let url = that.endpoint + '/cgi-bin/media/uploadimg?access_token=' + that.token.accessToken;
  let opts = {
    dataType: 'json',
    type: 'POST',
    timeout: 60000, // 60秒超时
    headers: req.headers,
    stream: req
  };
  delete opts.headers.host;
  that.request(url, opts, callback);
};
