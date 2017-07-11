'use strict';

// 库存管理接口
const util = require('./util');
const wrapper = util.wrapper;
const postJSON = util.postJSON;


exports.updateStock =  function(number, productId, sku, callback){
  this.preRequest(this._updateStock, arguments);
};

/*!
 * 更新商品库存的未封装版本
 */
exports._updateStock = function (number, productId, sku, callback){
  let url;
  if (number > 0){
    url = this.endpoint + '/merchant/stock/add?access_token=' + this.token.accessToken;
  } else {
    url = this.endpoint + '/merchant/stock/reduce?access_token=' + this.token.accessToken;
  }
  let data = {
    'product_id': productId,
    'sku_info': sku,
    'quantity': Math.abs(number)
  };
  this.request(url, postJSON(data), wrapper(callback));
};
