'use strict';

// 微信门店接口文档请参考：http://mp.weixin.qq.com/wiki/16/8f182af4d8dcea02c56506306bdb2f4c.html
const util = require('./util');
const wrapper = util.wrapper;
const postJSON = util.postJSON;

exports.addPoi= function (poi, callback) {
  let data = {
    business: {
      base_info: poi
    }
  };
  let url = this.endpoint + '/cgi-bin/poi/addpoi?access_token=' + this.token.accessToken;
  this.request(url, postJSON(data), wrapper(callback));
};


exports.getPoi=  function (poiId, callback) {
  let url = this.endpoint + '/cgi-bin/poi/getpoi?access_token=' + this.token.accessToken;
  let data = {
    poi_id: poiId
  };
  this.request(url, postJSON(data), wrapper(callback));
};


exports.getPois= function (begin, limit, callback) {
  let url = this.endpoint + '/cgi-bin/poi/getpoilist?access_token=' + this.token.accessToken;
  let data = {
    begin: begin,
    limit: limit
  };
  this.request(url, postJSON(data), wrapper(callback));
};


exports.delPoi= function (poiId, callback) {
  let url = this.endpoint + '/cgi-bin/poi/delpoi?access_token=' + this.token.accessToken;
  let data = {
    poi_id: poiId
  };
  this.request(url, postJSON(data), wrapper(callback));
};


exports.updatePoi= function (poi, callback) {
  let data = {
    business: {
      base_info: poi
    }
  };
  let url = this.endpoint + '/cgi-bin/poi/updatepoi?access_token=' + this.token.accessToken;
  this.request(url, postJSON(data), wrapper(callback));
};


exports.getWXCategory= function (callback){
  let url = this.endpoint + '/cgi-bin/poi/getwxcategory?access_token=' + this.token.accessToken;
  this.request(url, {dataType: 'json'}, wrapper(callback));
};

