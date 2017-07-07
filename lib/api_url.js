'use strict';

const util = require('./util');
const wrapper = util.wrapper;
const postJSON = util.postJSON;


exports.shorturl =  (longUrl, callback)=>{
  this.preRequest(this._shorturl, arguments);
};

/*!
 * 短网址服务
 */
exports._shorturl =  (longUrl, callback)=>{
  // https://api.weixin.qq.com/cgi-bin/shorturl?access_token=ACCESS_TOKEN
  let url = this.endpoint + '/cgi-bin/shorturl?access_token=' + this.token.accessToken;
  let data = {
    'action': 'long2short',
    'long_url': longUrl
  };
  this.request(url, postJSON(data), wrapper(callback));
};
