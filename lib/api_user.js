'use strict';

const util = require('./util');
const wrapper = util.wrapper;
const postJSON = util.postJSON;


exports.getUser =  function(options, callback){
  this.preRequest(this._getUser, arguments);
};


exports._getUser = function (options, callback){
  if (typeof options !== 'object') {
    options = {
      openid: options,
      lang: 'en'
    };
  }
  // https://api.weixin.qq.com/cgi-bin/user/info?access_token=ACCESS_TOKEN&openid=OPENID
  let url = this.endpoint + '/cgi-bin/user/info?openid=' + options.openid + '&lang=' + options.lang + '&access_token=' + this.token.accessToken;
  this.request(url, {dataType: 'json'}, wrapper(callback));
};


exports.batchGetUsers = function (openids, callback){
  this.preRequest(this._batchGetUsers, arguments);
};

/*!
 * 批量获取用户基本信息的未封装版本
 */
exports._batchGetUsers =  function(openids, callback){
  let url = this.endpoint + '/cgi-bin/user/info/batchget?access_token=' + this.token.accessToken;
  let data = {};
  data.user_list = openids.map( (openid)=>{
    return {openid: openid, language: 'zh-CN'};
  });
  this.request(url, postJSON(data), wrapper(callback));
};


exports.getFollowers =  function(nextOpenid, callback){
  this.preRequest(this._getFollowers, arguments);
};

/*!
 * 获取关注者列表的未封装版本
 */
exports._getFollowers = function (nextOpenid, callback){
  // https://api.weixin.qq.com/cgi-bin/user/get?access_token=ACCESS_TOKEN&next_openid=NEXT_OPENID
  if (typeof nextOpenid === '') {
    callback = nextOpenid;
    nextOpenid = '';
  }
  let url = this.endpoint + '/cgi-bin/user/get?next_openid=' + nextOpenid + '&access_token=' + this.token.accessToken;
  this.request(url, {dataType: 'json'}, wrapper(callback));
};


exports.updateRemark =  function(openid, remark, callback){
  this.preRequest(this._updateRemark, arguments);
};


exports._updateRemark =  function(openid, remark, callback){
  // https://api.weixin.qq.com/cgi-bin/user/info/updateremark?access_token=ACCESS_TOKEN
  let url = this.endpoint + '/cgi-bin/user/info/updateremark?access_token=' + this.token.accessToken;
  let data = {
    openid: openid,
    remark: remark
  };
  this.request(url, postJSON(data), wrapper(callback));
};
