'use strict';

// 商品分组管理接口
const util = require('./util');
const wrapper = util.wrapper;
const postJSON = util.postJSON;


exports.createGoodsGroup =  function(groupName, productList, callback){
  this.preRequest(this._createGoodsGroup, arguments);
};

exports._createGoodsGroup =  function(groupName, productList, callback){
  let data = {
    'group_detail': {
      'group_name': groupName,
      'product_list': productList && productList.length ? productList: []
    }
  };
  let url = this.endpoint + '/merchant/group/add?access_token=' + this.token.accessToken;
  this.request(url, postJSON(data), wrapper(callback));
};



exports.deleteGoodsGroup = function (groupId, callback){
  this.preRequest(this._deleteGoodsGroup, arguments);
};

exports._deleteGoodsGroup =  function(groupId, callback){
  let data = {
    'group_id': groupId
  };
  let url = this.endpoint + '/merchant/group/del?access_token=' + this.token.accessToken;
  this.request(url, postJSON(data), wrapper(callback));
};


exports.updateGoodsGroup =  function(groupId, groupName, callback){
  this.preRequest(this._updateGoodsGroup, arguments);
};

exports._updateGoodsGroup =  function(groupId, groupName, callback){
  let data = {
    'group_id': groupId,
    'group_name': groupName
  };
  let url = this.endpoint + '/merchant/group/propertymod?access_token=' + this.token.accessToken;
  this.request(url, postJSON(data), wrapper(callback));
};


exports.updateGoodsForGroup =  function(groupId, addProductList, delProductList, callback){
  this.preRequest(this._updateGoodsForGroup, arguments);
};

exports._updateGoodsForGroup =  function(groupId, addProductList, delProductList, callback){
  let data = {
    'group_id': groupId,
    'product': []
  };

  if (addProductList && addProductList.length) {
    addProductList.forEach( (val)=>{
      data.product.push({
        'product_id': val,
        'mod_action': 1
      });
    });
  }

  if (delProductList && delProductList.length) {
    delProductList.forEach( (val)=>{
      data.product.push({
        'product_id': val,
        'mod_action': 0
      });
    });
  }

  let url = this.endpoint + '/merchant/group/productmod?access_token=' + this.token.accessToken;
  this.request(url, postJSON(data), wrapper(callback));
};


exports.getAllGroups =  function(callback){
  this.preRequest(this._getAllGroups, arguments);
};

exports._getAllGroups =  function(callback){
  let url = this.endpoint + '/merchant/group/getall?access_token=' + this.token.accessToken;
  this.request(url, {dataType: 'json'}, wrapper(callback));
};


exports.getGroupById =  function(groupId, callback){
  this.preRequest(this._getGroupById, arguments);
};

exports._getGroupById =  function(groupId, callback){
  let data = {
    'group_id': groupId
  };
  let url = this.endpoint + '/merchant/group/getbyid?access_token=' + this.token.accessToken;
  this.request(url, postJSON(data), wrapper(callback));
};
