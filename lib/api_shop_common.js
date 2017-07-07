'use strict';

const path = require('path');
const fs = require('fs');
const util = require('./util');
const wrapper = util.wrapper;


exports.uploadPicture =  (filepath, callback)=>{
  this.preRequest(this._uploadPicture, arguments);
};

/*!
 * 更新商品库存的未封装版本
 */
exports._uploadPicture =  (filepath, callback)=>{
  let basename = path.basename(filepath);
  let url = this.endpoint + '/merchant/common/upload_img?access_token=' +
    this.token.accessToken + '&filename=' + basename;
  let reader = fs.createReadStream(filepath);
  let opts = {
    dataType: 'json',
    type: 'POST',
    stream: reader
  };
  this.request(url, opts, wrapper(callback));
};
