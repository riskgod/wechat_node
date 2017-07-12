'use strict';

const util = require('./util');
const wrapper = util.wrapper;
const postJSON = util.postJSON;

exports.createMenu = function (menu, callback) {
  this.preRequest(this._createMenu, arguments);
};

exports._createMenu = function (accessToken,menu, callback) {
  let url = this.endpoint + '/cgi-bin/menu/create?access_token=' + accessToken;
  this.request(url, postJSON(menu), wrapper(callback));
};

exports.getMenu = function (callback) {
  this.preRequest(this._getMenu, arguments);
};

exports._getMenu = function (accessToken,callback) {
  let url = this.endpoint + '/cgi-bin/menu/get?access_token=' + accessToken;
  this.request(url, {dataType: 'json'}, wrapper(callback));
};

exports.removeMenu = function (callback) {
  this.preRequest(this._removeMenu, arguments);
};

exports._removeMenu = function (accessToken,callback) {
  let url = this.endpoint + '/cgi-bin/menu/delete?access_token=' + accessToken;
  this.request(url, {dataType: 'json'}, wrapper(callback));
};

exports.getMenuConfig = function (callback) {
  this.preRequest(this._getMenuConfig, arguments);
};

exports._getMenuConfig = function (accessToken,callback) {
  let url = this.endpoint + '/cgi-bin/get_current_selfmenu_info?access_token=' + accessToken;
  this.request(url, {dataType: 'json'}, wrapper(callback));
};
