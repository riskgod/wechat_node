'use strict';

const util = require('./util');
const wrapper = util.wrapper;
const postJSON = util.postJSON;


exports.createShelf =  (shelf, callback)=>{
  this.preRequest(this._createShelf, arguments);
};

/*!
 * 增加货架的未封装版本
 */
exports._createShelf =  (shelf, callback)=>{
  let url = this.endpoint + '/merchant/shelf/add?access_token=' + this.token.accessToken;
  this.request(url, postJSON(shelf), wrapper(callback));
};


exports.deleteShelf =  (shelfId, callback)=>{
  this.preRequest(this._deleteShelf, arguments);
};

/*!
 * 删除货架的未封装版本
 */
exports._deleteShelf =  (shelfId, callback)=>{
  let data = {
    'shelf_id': shelfId
  };
  let url = this.endpoint + '/merchant/shelf/del?access_token=' + this.token.accessToken;
  this.request(url, postJSON(data), wrapper(callback));
};


exports.updateShelf =  (shelf, callback)=>{
  this.preRequest(this._updateShelf, arguments);
};

/*!
 * 修改货架的未封装版本
 */
exports._updateShelf =  (shelf, callback)=>{
  let url = this.endpoint + '/merchant/shelf/mod?access_token=' + this.token.accessToken;
  this.request(url, postJSON(shelf), wrapper(callback));
};


exports.getAllShelves =  (callback)=>{
  this.preRequest(this._getAllShelves, arguments);
};

/*!
 * 获取所有货架的未封装版本
 */
exports._getAllShelves =  (callback)=>{
  let url = this.endpoint + '/merchant/shelf/getall?access_token=' + this.token.accessToken;
  this.request(url, {dataType: 'json'}, wrapper(callback));
};


exports.getShelfById =  (shelfId, callback)=>{
  this.preRequest(this._getShelfById, arguments);
};

/*!
 * 根据货架ID获取货架信息的未封装版本
 */
exports._getShelfById =  (shelfId, callback)=>{
  let data = {
    'shelf_id': shelfId
  };
  let url = this.endpoint + '/merchant/shelf/getbyid?access_token=' + this.token.accessToken;
  this.request(url, postJSON(data), wrapper(callback));
};
