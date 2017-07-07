'use strict';

var util = require('./util');
var wrapper = util.wrapper;
var postJSON = util.postJSON;

exports.createMenu = function (menu, callback) {
  this.preRequest(this._createMenu, arguments);
};

exports._createMenu = function (menu, callback) {
  var url = this.endpoint + '/cgi-bin/menu/create?access_token=' + this.token.accessToken;
  this.request(url, postJSON(menu), wrapper(callback));
};

exports.getMenu = function (callback) {
  this.preRequest(this._getMenu, arguments);
};

exports._getMenu = function (callback) {
  var url = this.endpoint + '/cgi-bin/menu/get?access_token=' + this.token.accessToken;
  this.request(url, {dataType: 'json'}, wrapper(callback));
};

exports.removeMenu = function (callback) {
  this.preRequest(this._removeMenu, arguments);
};

exports._removeMenu = function (callback) {
  var url = this.endpoint + '/cgi-bin/menu/delete?access_token=' + this.token.accessToken;
  this.request(url, {dataType: 'json'}, wrapper(callback));
};

exports.getMenuConfig = function (callback) {
  this.preRequest(this._getMenuConfig, arguments);
};

exports._getMenuConfig = function (callback) {
  var url = this.endpoint + '/cgi-bin/get_current_selfmenu_info?access_token=' + this.token.accessToken;
  this.request(url, {dataType: 'json'}, wrapper(callback));
};
