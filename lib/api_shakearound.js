'use strict';

const fs = require('fs');
const path = require('path');
const formstream = require('formstream');
const crypto = require('crypto');
const util = require('./util');
const wrapper = util.wrapper;
const postJSON = util.postJSON;
const make = util.make;


exports.registerShakeAccount=function(options, callback) {
  let url = this.endpoint + '/shakearound/account/register?access_token=' + this.token.accessToken;
  this.request(url, postJSON(options), wrapper(callback));
};


exports.checkShakeAccountStatus = function(callback) {
  let url = this.endpoint + '/shakearound/account/auditstatus?access_token=' + this.token.accessToken;
  this.request(url, {dataType: 'json'}, wrapper(callback));
};


exports.applyBeacons = function(options, callback) {
  let url = this.endpoint + '/shakearound/device/applyid?access_token=' + this.token.accessToken;
  this.request(url, postJSON(options), wrapper(callback));
};


exports.applyBeaconsStatus=  function(apply_id, callback) {
  let data = {
    apply_id: apply_id
  };
  let url = this.endpoint + '/shakearound/device/applystatus?access_token=' + this.token.accessToken;
  this.request(url, postJSON(data), wrapper(callback));
};


exports.updateBeacon = function(options, callback) {
  let url = this.endpoint + '/shakearound/device/update?access_token=' + this.token.accessToken;
  this.request(url, postJSON(options), wrapper(callback));
};


exports.bindBeaconLocation= function(options, callback) {
  let url = this.endpoint + '/shakearound/device/bindlocation?access_token=' + this.token.accessToken;
  this.request(url, postJSON(options), wrapper(callback));
};


exports.getBeacons= function(options, callback) {
  let url = this.endpoint + '/shakearound/device/search?access_token=' + this.token.accessToken;
  this.request(url, postJSON(options), wrapper(callback));
};



exports.createPage= function(page, callback) {
  let url = this.endpoint + '/shakearound/page/add?access_token=' + this.token.accessToken;
  this.request(url, postJSON(page), wrapper(callback));
};


exports.updatePage = function(page, callback) {
  let url = this.endpoint + '/shakearound/page/update?access_token=' + this.token.accessToken;
  this.request(url, postJSON(page), wrapper(callback));
};

exports.deletePage=function(page_id, callback){
  let data = {page_id: page_id};
  let url = this.endpoint + '/shakearound/page/delete?access_token=' + this.token.accessToken;
  this.request(url, postJSON(data), wrapper(callback));
};


exports.getPages=function(options, callback){
  let url = this.endpoint + '/shakearound/page/search?access_token=' + this.token.accessToken;
  this.request(url, postJSON(options), wrapper(callback));
};



exports.uploadPageIcon=function(filepath, callback){
  let that = this;
  fs.stat(filepath,  (err, stat) =>{
    if (err) {
      return callback(err);
    }
    let form = formstream();
    form.file('media', filepath, path.basename(filepath), stat.size);
    let url = this.endpoint + '/shakearound/material/add?access_token=' + that.token.accessToken;
    let opts = {
      dataType: 'json',
      type: 'POST',
      timeout: 60000, // 60秒超时
      headers: form.headers(),
      stream: form
    };
    that.request(url, opts, callback);
  });
};


exports.bindBeaconWithPages = function(options, callback) {
  let url = this.endpoint + '/shakearound/device/bindpage?access_token=' + this.token.accessToken;
  this.request(url, postJSON(options), wrapper(callback));
};


exports.searchBeaconPageRelation = function(options, callback) {
  let url = this.endpoint + '/shakearound/relation/search?access_token=' + this.token.accessToken;
  this.request(url, postJSON(options), wrapper(callback));
};


exports.getShakeInfo = function(ticket, callback) {
  let data = {
    ticket: ticket
  };

  let url = this.endpoint + '/shakearound/user/getshakeinfo?access_token=' + this.token.accessToken;
  this.request(url, postJSON(data), wrapper(callback));
};


exports.getDeviceStatistics = function (options, callback) {
  let url = this.endpoint + '/shakearound/statistics/device?access_token=' + this.token.accessToken;
  this.request(url, postJSON(options), wrapper(callback));
};


exports.getDeviceStatisticsList = function(options, callback) {
  let url = this.endpoint + '/shakearound/statistics/devicelist?access_token=' + this.token.accessToken;
  this.request(url, postJSON(options), wrapper(callback));
};


exports.getPageStatistics = function(options, callback) {
  let url = this.endpoint + '/shakearound/statistics/page?access_token=' + this.token.accessToken;
  this.request(url, postJSON(options), wrapper(callback));
};


exports.getPageStatisticsList=function(options, callback) {
  let url = this.endpoint + '/shakearound/statistics/pagelist?access_token=' + this.token.accessToken;
  this.request(url, postJSON(options), wrapper(callback));
};


exports.listBeaconGroup=function(options, callback) {
  let url = this.endpoint + '/shakearound/device/group/getlist?access_token=' + this.token.accessToken;
  this.request(url, postJSON(options), wrapper(callback));
};


exports.queryGroupBeacons = function(options, callback) {
  let url = this.endpoint + '/shakearound/device/group/getdetail?access_token=' + this.token.accessToken;
  this.request(url, postJSON(options), wrapper(callback));
};


exports.addBeaconGroup = function(group, callback) {
  let url = this.endpoint + '/shakearound/device/group/add?access_token=' + this.token.accessToken;
  this.request(url, postJSON(group), wrapper(callback));
};

exports.updateBeaconGroup = function(group, callback) {
  let url = this.endpoint + '/shakearound/device/group/update?access_token=' + this.token.accessToken;
  this.request(url, postJSON(group), wrapper(callback));
};

exports.addGroupBeacons = function(options, callback) {
  let url = this.endpoint + '/shakearound/device/group/adddevice?access_token=' + this.token.accessToken;
  this.request(url, postJSON(options), wrapper(callback));
};


exports.deleteGroupBeacons = function(options, callback) {
  let url = this.endpoint + '/shakearound/device/group/deletedevice?access_token=' + this.token.accessToken;
  this.request(url, postJSON(options), wrapper(callback));
};


exports.addLotteryInfo = function(options, body, callback) {
  let url = this.endpoint + '/shakearound/lottery/addlotteryinfo?&use_template=' + options.use_template + '&logo_url=' + options.logo_url + '&access_token=' + this.token.accessToken;
  this.request(url, postJSON(body), wrapper(callback));
};


exports.setPrizeBucket = function(options, callback) {
  let url = this.endpoint + '/shakearound/lottery/setprizebucket?access_token=' + this.token.accessToken;
  this.request(url, postJSON(options), wrapper(callback));
};


exports.setLotterySwitch = function(lotteryId, onoff, callback){
  let url = this.endpoint + '/shakearound/lottery/setlotteryswitch?lottery_id=' + lotteryId + '&onoff=' + onoff + '&access_token=' + this.token.accessToken;
  this.request(url, wrapper(callback));
};


exports.getShakehbConfig =  function(openid, lotteryId, key){
  let params = {
    openid: openid,
    lottery_id: lotteryId,
    noncestr: Math.random().toString(36).substr(2, 15)
  };

  let query = Object.keys(params).sort().map((key)=>{
    return key + '=' + params[key];
  }).join('&');

  query += '&key=' + key;
  params.sign = crypto.createHash('md5').update(query).digest('hex').toUpperCase();

  return params;
};
