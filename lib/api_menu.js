'use strict';

const util = require('./util');
const wrapper = util.wrapper;
const postJSON = util.postJSON;

exports.createMenu =  (menu, callback)=> {
  this.preRequest(this._createMenu, arguments);
};

exports._createMenu =  (menu, callback)=> {
  let url = this.endpoint + '/cgi-bin/menu/create?access_token=' + this.token.accessToken;
  this.request(url, postJSON(menu), wrapper(callback));
};

exports.getMenu =  (callback) =>{
  this.preRequest(this._getMenu, arguments);
};

exports._getMenu =  (callback)=> {
  let url = this.endpoint + '/cgi-bin/menu/get?access_token=' + this.token.accessToken;
  this.request(url, {dataType: 'json'}, wrapper(callback));
};

exports.removeMenu =  (callback) =>{
  this.preRequest(this._removeMenu, arguments);
};

exports._removeMenu =  (callback)=> {
  let url = this.endpoint + '/cgi-bin/menu/delete?access_token=' + this.token.accessToken;
  this.request(url, {dataType: 'json'}, wrapper(callback));
};

exports.getMenuConfig =  (callback) =>{
  this.preRequest(this._getMenuConfig, arguments);
};

exports._getMenuConfig =  (callback)=> {
  let url = this.endpoint + '/cgi-bin/get_current_selfmenu_info?access_token=' + this.token.accessToken;
  this.request(url, {dataType: 'json'}, wrapper(callback));
};
