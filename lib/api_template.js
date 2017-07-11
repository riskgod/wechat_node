'use strict';

const util = require('./util');
const wrapper = util.wrapper;
const postJSON = util.postJSON;


exports.setIndustry = function(industryIds, callback){
  this.preRequest(this._setIndustry, arguments);
};

exports._setIndustry =  function(industryIds, callback){
  let apiUrl = this.endpoint + '/cgi-bin/template/api_set_industry?access_token=' + this.token.accessToken;
  this.request(apiUrl, postJSON(industryIds), wrapper(callback));
};


exports.getIndustry = function(callback){
  this.preRequest(this._getIndustry, arguments);
};

exports._getIndustry =  function(callback){
  let apiUrl = this.endpoint + '/cgi-bin/template/get_industry?access_token=' + this.token.accessToken;
  this.request(apiUrl, {dataType: 'json'}, wrapper(callback));
};


exports.addTemplate =function (templateIdShort, callback){
  this.preRequest(this._addTemplate, arguments);
};

exports._addTemplate =  function(templateIdShort, callback){
  let apiUrl = this.endpoint + '/cgi-bin/template/api_add_template?access_token=' + this.token.accessToken;
  let templateId = {
    template_id_short: templateIdShort
  };
  this.request(apiUrl, postJSON(templateId), wrapper(callback));
};


exports.getAllPrivateTemplate = function(callback){
  this.preRequest(this._getAllPrivateTemplate, arguments);
};

exports._getAllPrivateTemplate =  function(callback){
  let apiUrl = this.endpoint + '/cgi-bin/template/get_all_private_template?access_token=' + this.token.accessToken;
  this.request(apiUrl, {dataType: 'json'}, wrapper(callback));
};


exports.delPrivateTemplate = function(templateId, callback){
  this.preRequest(this._delPrivateTemplate, arguments);
};

exports._delPrivateTemplate =  function(templateId, callback){
  let apiUrl = this.endpoint + '/cgi-bin/template/del_private_template?access_token=' + this.token.accessToken;
  let data = {
    template_id: templateId
  };
  this.request(apiUrl, postJSON(data), wrapper(callback));
};


exports.sendTemplate =  function(openid, templateId, url, data, callback, callback2){
  this.preRequest(this._sendTemplate, arguments);
};

exports._sendTemplate = function (openid, templateId, url, data, callback, callback2){
  /*
      duplicated interface ` (openid, templateId, url, topColor, data, callback)`
   */
  let apiUrl = this.endpoint + '/cgi-bin/message/template/send?access_token=' + this.token.accessToken;

  if (typeof data === 'string') {
    data = callback;
    callback = callback2;
  }

  let template = {
    touser: openid,
    template_id: templateId,
    url: url,
    data: data
  };
  this.request(apiUrl, postJSON(template), wrapper(callback));
};
