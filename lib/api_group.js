'use strict';

const util = require('./util');
const wrapper = util.wrapper;
const postJSON = util.postJSON;
const make = util.make;



exports.getGroups = function (callback) {
  // https://api.weixin.qq.com/cgi-bin/groups/get?access_token=ACCESS_TOKEN
  let url = this.endpoint + '/cgi-bin/groups/get?access_token=' + this.token.accessToken;
  this.request(url, {dataType: 'json'}, wrapper(callback));
};


exports.getWhichGroup = function (openid, callback) {
  // https://api.weixin.qq.com/cgi-bin/groups/getid?access_token=ACCESS_TOKEN
  let url = this.endpoint + '/cgi-bin/groups/getid?access_token=' + this.token.accessToken;
  let data = {
    'openid': openid
  };
  this.request(url, postJSON(data), wrapper(callback));
};


exports.createGroup = function (name, callback) {
  // https://api.weixin.qq.com/cgi-bin/groups/create?access_token=ACCESS_TOKEN
  // POST数据格式：json
  // POST数据例子：{"group":{"name":"test"}}
  let url = this.endpoint + '/cgi-bin/groups/create?access_token=' + this.token.accessToken;
  let data = {
    'group': {'name': name}
  };
  this.request(url, postJSON(data), wrapper(callback));
};


exports.updateGroup = function (id, name, callback) {
  // http请求方式: POST（请使用https协议）
  // https://api.weixin.qq.com/cgi-bin/groups/update?access_token=ACCESS_TOKEN
  // POST数据格式：json
  // POST数据例子：{"group":{"id":108,"name":"test2_modify2"}}
  let url = this.endpoint + '/cgi-bin/groups/update?access_token=' + this.token.accessToken;
  let data = {
    'group': {'id': id, 'name': name}
  };
  this.request(url, postJSON(data), wrapper(callback));
};


exports.moveUserToGroup = function (openid, groupId, callback) {
  // http请求方式: POST（请使用https协议）
  // https://api.weixin.qq.com/cgi-bin/groups/members/update?access_token=ACCESS_TOKEN
  // POST数据格式：json
  // POST数据例子：{"openid":"oDF3iYx0ro3_7jD4HFRDfrjdCM58","to_groupid":108}
  let url = this.endpoint + '/cgi-bin/groups/members/update?access_token=' + this.token.accessToken;
  let data = {
    'openid': openid,
    'to_groupid': groupId
  };
  this.request(url, postJSON(data), wrapper(callback));
};


exports.removeGroup = function (groupId, callback) {
  let url = this.endpoint + '/cgi-bin/groups/delete?access_token=' + this.token.accessToken;
  let data = {
    'group': { id: groupId}
  };
  this.request(url, postJSON(data), wrapper(callback));
};
