'use strict';

const util = require('./util');
const wrapper = util.wrapper;
const postJSON = util.postJSON;


exports.createGoods =  function(goods, callback){
  this.preRequest(this._createGoods, arguments);
};

/*!
 * 增加商品的未封装版本
 */
exports._createGoods =  function(goods, callback){
  let url = this.endpoint + '/merchant/create?access_token=' + this.token.accessToken;
  this.request(url, postJSON(goods), wrapper(callback));
};


exports.deleteGoods =  function(productId, callback){
  this.preRequest(this._deleteGoods, arguments);
};

/*!
 * 删除商品的未封装版本
 */
exports._deleteGoods =  function(productId, callback){
  let data = {
    'product_id': productId
  };
  let url = this.endpoint + '/merchant/del?access_token=' + this.token.accessToken;
  this.request(url, postJSON(data), wrapper(callback));
};


exports.updateGoods =  function(goods, callback){
  this.preRequest(this._updateGoods, arguments);
};

/*!
 * 修改商品的未封装版本
 */
exports._updateGoods =  function(goods, callback){
  let url = this.endpoint + '/merchant/update?access_token=' + this.token.accessToken;
  this.request(url, postJSON(goods), wrapper(callback));
};


exports.getGoods =  function(productId, callback){
  this.preRequest(this._getGoods, arguments);
};

/*!
 * 根据状态获取商品列表
 */
exports._getGoods =  function(productId, callback){
  let url = this.endpoint + '/merchant/get?product_id=' + productId + '&access_token=' + this.token.accessToken;
  this.request(url, {dataType: 'json'}, wrapper(callback));
};


exports.getGoodsByStatus =  function(status, callback){
  this.preRequest(this._getGoodsByStatus, arguments);
};

/*!
 * 获取指定状态的所有商品的未封装版本
 */
exports._getGoodsByStatus =  function(status, callback){
  let data = {status: status};
  let url = this.endpoint + '/merchant/getbystatus?access_token=' + this.token.accessToken;
  this.request(url, postJSON(data), wrapper(callback));
};


exports.updateGoodsStatus =  function(productId, status, callback){
  this.preRequest(this._updateGoodsStatus, arguments);
};

/*!
 * 商品上下架的未封装版本
 */
exports._updateGoodsStatus =  function(productId, status, callback){
  let data = {
    product_id: productId,
    status: status
  };
  let url = this.endpoint + '/merchant/modproductstatus?access_token=' + this.token.accessToken;
  this.request(url, postJSON(data), wrapper(callback));
};


exports.getSubCats =  function(catId, callback){
  this.preRequest(this._getSubCats, arguments);
};

/*!
 * 获取指定分类的所有子分类的未封装版本
 */
exports._getSubCats =  function(catId, callback){
  let data = {
    cate_id: catId
  };
  let url = this.endpoint + '/merchant/category/getsub?access_token=' + this.token.accessToken;
  this.request(url, postJSON(data), wrapper(callback));
};


exports.getSKUs =  function(catId, callback){
  this.preRequest(this._getSKUs, arguments);
};

/*!
 * 获取指定子分类的所有SKU的未封装版本
 */
exports._getSKUs =  function(catId, callback){
  let data = {
    cate_id: catId
  };
  let url = this.endpoint + '/merchant/category/getsku?access_token=' + this.token.accessToken;
  this.request(url, postJSON(data), wrapper(callback));
};


exports.getProperties =  function(catId, callback){
  this.preRequest(this._getProperties, arguments);
};


exports._getProperties =  function(catId, callback){
  let data = {
    cate_id: catId
  };
  let url = this.endpoint + '/merchant/category/getproperty?access_token=' + this.token.accessToken;
  this.request(url, postJSON(data), wrapper(callback));
};

