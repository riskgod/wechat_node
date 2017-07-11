'use strict';

const util = require('./util');
const wrapper = util.wrapper;
const postJSON = util.postJSON;
const make = util.make;


exports.clearQuota=function(appid, callback) {
  let data = {
    appid: appid
  };

  let url = this.endpoint + '/cgi-bin/clear_quota?access_token=' + this.token.accessToken;
  this.request(url, postJSON(data), wrapper(callback));
};
