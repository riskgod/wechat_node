'use strict';

const util = require('./util');
const wrapper = util.wrapper;
const postJSON = util.postJSON;


exports.addExpressTemplate = function (express, callback){
  this.preRequest(this._addExpressTemplate, arguments);
};

/*!
 * 增加邮费模板的未封装版本
 */
exports._addExpressTemplate = function (express, callback){
  let url = this.endpoint + '/merchant/express/add?access_token=' + this.token.accessToken;
  this.request(url, postJSON(express), wrapper(callback));
};


exports.deleteExpressTemplate =  function(templateId, callback){
  this.preRequest(this._deleteExpressTemplate, arguments);
};


exports._deleteExpressTemplate =  function(templateId, callback){
  let data = {
    template_id: templateId
  };
  let url = this.endpoint + '/merchant/express/del?access_token=' + this.token.accessToken;
  this.request(url, postJSON(data), wrapper(callback));
};


exports.updateExpressTemplate =  function(template, callback){
  this.preRequest(this._updateExpressTemplate, arguments);
};

/*!
 * 修改邮费模板的未封装版本
 */
exports._updateExpressTemplate =  function(template, callback){
  let url = this.endpoint + '/merchant/express/del?access_token=' + this.token.accessToken;
  this.request(url, postJSON(template), wrapper(callback));
};


exports.getExpressTemplateById =  function(templateId, callback){
  this.preRequest(this._getExpressTemplateById, arguments);
};

/*!
 * 获取指定ID的邮费模板的未封装版本
 */
exports._getExpressTemplateById =  function(templateId, callback){
  let data = {
    template_id: templateId
  };
  let url = this.endpoint + '/merchant/express/getbyid?access_token=' + this.token.accessToken;
  this.request(url, postJSON(data), wrapper(callback));
};


exports.getAllExpressTemplates = function (callback){
  this.preRequest(this._getAllExpressTemplates, arguments);
};

/*!
 * 获取所有邮费模板的未封装版本
 */
exports._getAllExpressTemplates =  function(callback){
  let url = this.endpoint + '/merchant/express/getall?access_token=' + this.token.accessToken;
  this.request(url, {dataType: 'json'}, wrapper(callback));
};
