'use strict';

const util = require('./util');
const wrapper = util.wrapper;
const make = util.make;


exports.getIp =   (callback) =>{
  // https://api.weixin.qq.com/cgi-bin/getcallbackip?access_token=ACCESS_TOKEN
  let url = this.endpoint + '/cgi-bin/getcallbackip?access_token=' + this.token.accessToken;
  this.request(url, {dataType: 'json'}, wrapper(callback));
};