'use strict';

const util = require('./util');
const wrapper = util.wrapper;
const postJSON = util.postJSON;


exports.createGoods =  (goods, callback)=>{
  this.preRequest(this._createGoods, arguments);
};

/*!
 * 增加商品的未封装版本
 */
exports._createGoods =  (goods, callback)=>{
  let url = this.endpoint + '/merchant/create?access_token=' + this.token.accessToken;
  this.request(url, postJSON(goods), wrapper(callback));
};


exports.deleteGoods =  (productId, callback)=>{
  this.preRequest(this._deleteGoods, arguments);
};

/*!
 * 删除商品的未封装版本
 */
exports._deleteGoods =  (productId, callback)=>{
  let data = {
    'product_id': productId
  };
  let url = this.endpoint + '/merchant/del?access_token=' + this.token.accessToken;
  this.request(url, postJSON(data), wrapper(callback));
};


exports.updateGoods =  (goods, callback)=>{
  this.preRequest(this._updateGoods, arguments);
};

/*!
 * 修改商品的未封装版本
 */
exports._updateGoods =  (goods, callback)=>{
  let url = this.endpoint + '/merchant/update?access_token=' + this.token.accessToken;
  this.request(url, postJSON(goods), wrapper(callback));
};


exports.getGoods =  (productId, callback)=>{
  this.preRequest(this._getGoods, arguments);
};

/*!
 * 根据状态获取商品列表
 */
exports._getGoods =  (productId, callback)=>{
  let url = this.endpoint + '/merchant/get?product_id=' + productId + '&access_token=' + this.token.accessToken;
  this.request(url, {dataType: 'json'}, wrapper(callback));
};


exports.getGoodsByStatus =  (status, callback)=>{
  this.preRequest(this._getGoodsByStatus, arguments);
};

/*!
 * 获取指定状态的所有商品的未封装版本
 */
exports._getGoodsByStatus =  (status, callback)=>{
  let data = {status: status};
  let url = this.endpoint + '/merchant/getbystatus?access_token=' + this.token.accessToken;
  this.request(url, postJSON(data), wrapper(callback));
};


exports.updateGoodsStatus =  (productId, status, callback)=>{
  this.preRequest(this._updateGoodsStatus, arguments);
};

/*!
 * 商品上下架的未封装版本
 */
exports._updateGoodsStatus =  (productId, status, callback)=>{
  let data = {
    product_id: productId,
    status: status
  };
  let url = this.endpoint + '/merchant/modproductstatus?access_token=' + this.token.accessToken;
  this.request(url, postJSON(data), wrapper(callback));
};


exports.getSubCats =  (catId, callback)=>{
  this.preRequest(this._getSubCats, arguments);
};

/*!
 * 获取指定分类的所有子分类的未封装版本
 */
exports._getSubCats =  (catId, callback)=>{
  let data = {
    cate_id: catId
  };
  let url = this.endpoint + '/merchant/category/getsub?access_token=' + this.token.accessToken;
  this.request(url, postJSON(data), wrapper(callback));
};


exports.getSKUs =  (catId, callback)=>{
  this.preRequest(this._getSKUs, arguments);
};

/*!
 * 获取指定子分类的所有SKU的未封装版本
 */
exports._getSKUs =  (catId, callback)=>{
  let data = {
    cate_id: catId
  };
  let url = this.endpoint + '/merchant/category/getsku?access_token=' + this.token.accessToken;
  this.request(url, postJSON(data), wrapper(callback));
};


exports.getProperties =  (catId, callback)=>{
  this.preRequest(this._getProperties, arguments);
};


exports._getProperties =  (catId, callback)=>{
  let data = {
    cate_id: catId
  };
  let url = this.endpoint + '/merchant/category/getproperty?access_token=' + this.token.accessToken;
  this.request(url, postJSON(data), wrapper(callback));
};

