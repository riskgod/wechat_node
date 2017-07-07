'use strict';

var util = require('./util');
var wrapper = util.wrapper;
var postJSON = util.postJSON;
var make = util.make;


make(exports, 'clearQuota', function (appid, callback) {
  var data = {
    appid: appid
  };

  var url = this.endpoint + '/cgi-bin/clear_quota?access_token=' + this.token.accessToken;
  this.request(url, postJSON(data), wrapper(callback));
});
