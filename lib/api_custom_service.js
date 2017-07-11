'use strict';

const path = require('path');
const fs = require('fs');
const formstream = require('formstream');

const util = require('./util');
const wrapper = util.wrapper;
const postJSON = util.postJSON;


exports.getRecords = function (opts, callback) {
  // https://api.weixin.qq.com/customservice/msgrecord/getmsglist?access_token=ACCESS_TOKEN
  opts.msgid = opts.msgid || 1;
  let url = this.endpoint + '/customservice/msgrecord/getmsglist?access_token=' + this.token.accessToken;
  this.request(url, postJSON(opts), wrapper(callback));
};


exports.getCustomServiceList = function (callback) {
  // https://api.weixin.qq.com/cgi-bin/customservice/getkflist?access_token= ACCESS_TOKEN
  let url = this.endpoint + '/cgi-bin/customservice/getkflist?access_token=' + this.token.accessToken;
  this.request(url, {dataType: 'json'}, wrapper(callback));
};


exports.getOnlineCustomServiceList = function (callback) {
  // https://api.weixin.qq.com/cgi-bin/customservice/getonlinekflist?access_token= ACCESS_TOKEN
  let url = this.endpoint + '/cgi-bin/customservice/getonlinekflist?access_token=' + this.token.accessToken;
  this.request(url, {dataType: 'json'}, wrapper(callback));
};

let md5 = function (input) {
  let crypto = require('crypto');
  let hash = crypto.createHash('md5');
  return hash.update(input).digest('hex');
};


exports.addKfAccount = function (account, nick, password, callback) {
  // https://api.weixin.qq.com/customservice/kfaccount/add?access_token=ACCESS_TOKEN
  let url = this.endpoint + '/customservice/kfaccount/add?access_token=' + this.token.accessToken;
  let data = {
    'kf_account': account,
    'nickname': nick,
    'password': md5(password)
  };

  this.request(url, postJSON(data), wrapper(callback));
};

exports.updateKfAccount = function (account, nick, password, callback) {
  // https://api.weixin.qq.com/customservice/kfaccount/add?access_token=ACCESS_TOKEN
  let url = this.endpoint + '/customservice/kfaccount/update?access_token=' + this.token.accessToken;
  let data = {
    'kf_account': account,
    'nickname': nick,
    'password': md5(password)
  };

  this.request(url, postJSON(data), wrapper(callback));
};


exports.deleteKfAccount = function (account, callback) {
  // https://api.weixin.qq.com/customservice/kfaccount/del?access_token=ACCESS_TOKEN
  let url = this.endpoint + '/customservice/kfaccount/del?access_token=' + this.token.accessToken + '&kf_account=' + account;
  this.request(url, {dataType: 'json'}, wrapper(callback));
};


exports.setKfAccountAvatar = function (account, filepath, callback) {
  // http://api.weixin.qq.com/customservice/kfaccount/uploadheadimg?access_token=ACCESS_TOKEN&kf_account=KFACCOUNT
  let that = this;
  fs.stat(filepath,  (err, stat)=> {
    if (err) {
      return callback(err);
    }
    let form = formstream();
    form.file('media', filepath, path.basename(filepath), stat.size);
    let url = that.endpoint + '/customservice/kfaccount/uploadheadimg?access_token=' + that.token.accessToken + '&kf_account=' + account;
    let opts = {
      dataType: 'json',
      type: 'POST',
      timeout: 60000, // 60秒超时
      headers: form.headers(),
      stream: form
    };
    that.request(url, opts, wrapper(callback));
  });
};


exports.createKfSession = function (account, openid, callback) {
  //https://api.weixin.qq.com/customservice/kfsession/create?access_token=ACCESS_TOKEN
  let url = this.endpoint + '/customservice/kfsession/create?access_token=' + this.token.accessToken;
  this.request(url, postJSON({
    kf_account: account,
    openid: openid
  }), wrapper(callback));
};


exports.closeKfSession = function (account, openid, callback) {
  //https://api.weixin.qq.com/customservice/kfsession/close?access_token=ACCESS_TOKEN
  let url = this.endpoint + '/customservice/kfsession/close?access_token=' + this.token.accessToken;
  this.request(url, postJSON({
    kf_account: account,
    openid: openid
  }), wrapper(callback));
};


exports.getKfSession = function (openid, callback) {
  //https://api.weixin.qq.com/customservice/kfsession/getsession?access_token=ACCESS_TOKEN&openid=OPENID
  let url = this.endpoint + '/customservice/kfsession/getsession?access_token=' + this.token.accessToken + '&openid=' + openid;
  this.request(url, {dataType: 'json'}, wrapper(callback));
};


exports.getKfSessionList = function (account, callback) {
  //https://api.weixin.qq.com/customservice/kfsession/getsessionlist?access_token=ACCESS_TOKEN&kf_account=KFACCOUNT
  let url = this.endpoint + '/customservice/kfsession/getsessionlist?access_token=' + this.token.accessToken + '&kf_account=' + account;
  this.request(url, {dataType: 'json'}, wrapper(callback));
};


exports.getKfSessionWaitCase = function (callback) {
  //https://api.weixin.qq.com/customservice/kfsession/getwaitcase?access_token=ACCESS_TOKEN
  let url = this.endpoint + '/customservice/kfsession/getwaitcase?access_token=' + this.token.accessToken;
  this.request(url, {dataType: 'json'}, wrapper(callback));
};
