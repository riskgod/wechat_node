'use strict';

const util = require('./util');
const wrapper = util.wrapper;
const postJSON = util.postJSON;


exports.semantic = function (uid, opts, callback) {
  this.preRequest(this._semantic, arguments);
};


exports._semantic =  function(uid, opts, callback) {
  // https://api.weixin.qq.com/semantic/semproxy/search?access_token=YOUR_ACCESS_TOKEN
  let url = this.endpoint + '/semantic/semproxy/search?access_token=' + this.token.accessToken;
  opts.appid = this.appid;
  opts.uid = uid;
  this.request(url, postJSON(opts), wrapper(callback));
};
