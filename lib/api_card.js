'use strict';

const path = require('path');
const fs = require('fs');

const formstream = require('formstream');
const util = require('./util');
const wrapper = util.wrapper;
const postJSON = util.postJSON;



exports.uploadLogo =  (filepath, callback)=> {
  let that = this;
  fs.stat(filepath, function (err, stat) {
    if (err) {
      return callback(err);
    }
    let form = formstream();
    form.file('buffer', filepath, path.basename(filepath), stat.size);
    let url = that.fileServerPrefix + 'media/uploadimg?access_token=' + that.token.accessToken;
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


exports.addLocations =  (locations, callback)=> {
  let data = {
    location_list: locations
  };
  let url = this.endpoint + '/card/location/batchadd?access_token=' + this.token.accessToken;
  this.request(url, postJSON(data), wrapper(callback));
};

exports.getLocations= (offset, count, callback) =>{
  let data = {
    offset: offset,
    count: count
  };
  let url = this.endpoint + '/card/location/batchget?access_token=' + this.token.accessToken;
  this.request(url, postJSON(data), wrapper(callback));
};

exports.getColors =  (callback)=> {
  let url = this.endpoint + '/card/getcolors?access_token=' + this.token.accessToken;
  this.request(url, {dataType: 'json'}, wrapper(callback));
};

exports.createCard =  (card, callback)=> {
  let url = this.endpoint + '/card/create?access_token=' + this.token.accessToken;
  let data = {card: card};
  this.request(url, postJSON(data), wrapper(callback));
};

exports.getRedirectUrl = function (url, encryptCode, cardId) {
  // TODO
};

exports.createQRCode=  (card, callback) =>{
  let url = this.endpoint + '/card/qrcode/create?access_token=' + this.token.accessToken;
  let data = {
    action_name: 'QR_CARD',
    action_info: {
      card: card
    }
  };
  this.request(url, postJSON(data), wrapper(callback));
};


exports.createCardQRCode =  (info, expire_seconds, callback)=> {
  if(typeof expire_seconds === 'function') {
    callback = expire_seconds;
    expire_seconds = null;
  }
  let url = this.endpoint + '/card/qrcode/create?access_token=' + this.token.accessToken;
  let data = {
    action_name: 'QR_'+Object.keys(info)[0].toUpperCase(),
    expire_seconds: expire_seconds,
    action_info: info
  };
  this.request(url, postJSON(data), wrapper(callback));
};

exports.consumeCode =  (code, cardId, callback)=> {
  let url = this.endpoint + '/card/code/consume?access_token=' + this.token.accessToken;
  let data = {
    code: code,
    card_id: cardId
  };
  this.request(url, postJSON(data), wrapper(callback));
};

exports.decryptCode =  (encryptCode, callback) =>{
  let url = this.endpoint + '/card/code/decrypt?access_token=' + this.token.accessToken;
  let data = {
    encrypt_code: encryptCode
  };
  this.request(url, postJSON(data), wrapper(callback));
};

exports.deleteCard =   (cardId, callback) =>{
  let url = this.endpoint + '/card/delete?access_token=' + this.token.accessToken;
  let data = {
    card_id: cardId
  };
  this.request(url, postJSON(data), wrapper(callback));
};

exports.getCode =  (code, cardId, callback) =>{
  let url = this.endpoint + '/card/code/get?access_token=' + this.token.accessToken;
  let data = {
    code: code
  };
  if (typeof cardId !== 'function') {
    data.card_id = cardId;
  } else {
    callback = cardId;
  }
  this.request(url, postJSON(data), wrapper(callback));
};

exports.getCards =  (offset, count, status_list, callback)=> {
  let url = this.endpoint + '/card/batchget?access_token=' + this.token.accessToken;
  let data = {
    offset: offset,
    count: count
  };
  if (typeof status_list !== 'function') {
    data.status_list = status_list;
  } else {
    callback = status_list;
  }
  this.request(url, postJSON(data), wrapper(callback));
};

exports.getCard =  (cardId, callback) =>{
  let url = this.endpoint + '/card/get?access_token=' + this.token.accessToken;
  let data = {
    card_id: cardId
  };
  this.request(url, postJSON(data), wrapper(callback));
};

exports.updateCode =  (code, cardId, newcode, callback) =>{
  let url = this.endpoint + '/card/code/update?access_token=' + this.token.accessToken;
  let data = {
    code: code,
    card_id: cardId,
    newcode: newcode
  };
  this.request(url, postJSON(data), wrapper(callback));
};

exports.unavailableCode =  (code, cardId, callback)=> {
  let url = this.endpoint + '/card/code/unavailable?access_token=' + this.token.accessToken;
  let data = {
    code: code
  };
  if (typeof cardId !== 'function') {
    data.card_id = cardId;
  } else {
    callback = cardId;
  }
  this.request(url, postJSON(data), wrapper(callback));
};

exports.updateCard =  (cardId, cardType, cardInfo, callback) =>{
  let url = this.endpoint + '/card/update?access_token=' + this.token.accessToken;
  let data = {
    card_id: cardId
  };
  data[cardType.toLowerCase()] = cardInfo;
  this.request(url, postJSON(data), wrapper(callback));
};

exports.updateCardStock =  (cardId, num, callback) =>{
  let url = this.endpoint + '/card/modifystock?access_token=' + this.token.accessToken;
  let data = {
    card_id: cardId
  };
  if (num > 0) {
    data.increase_stock_value = Math.abs(num);
  } else {
    data.reduce_stock_value = Math.abs(num);
  }
  this.request(url, postJSON(data), wrapper(callback));
};

exports.activateMembercard =  (info, callback) =>{
  let url = this.endpoint + '/card/membercard/activate?access_token=' + this.token.accessToken;
  this.request(url, postJSON(info), wrapper(callback));
};

exports.activateMembercardUserForm =  (info, callback)=> {
  let url = this.endpoint + '/card/membercard/activateuserform/set?access_token=' + this.token.accessToken;
  this.request(url, postJSON(info), wrapper(callback));
};

exports.getMembercard =   (info, callback) =>{
  let url = this.endpoint + '/card/membercard/userinfo/get?access_token=' + this.token.accessToken;
  this.request(url, postJSON(info), wrapper(callback));
};

exports.updateMembercard =  (info, callback)=> {
  let url = this.endpoint + '/card/membercard/updateuser?access_token=' + this.token.accessToken;
  this.request(url, postJSON(info), wrapper(callback));
};

exports.updateMovieTicket =  (info, callback) =>{
  let url = this.endpoint + '/card/movieticket/updateuser?access_token=' + this.token.accessToken;
  this.request(url, postJSON(info), wrapper(callback));
};

exports.checkInBoardingPass =  (info, callback)=> {
  let url = this.endpoint + '/card/boardingpass/checkin?access_token=' + this.token.accessToken;
  this.request(url, postJSON(info), wrapper(callback));
};

exports.updateLuckyMonkeyBalance =  (code, cardId, balance, callback) => {
  let url = this.endpoint + '/card/luckymonkey/updateuserbalance?access_token=' + this.token.accessToken;
  let data = {
    'code': code,
    'card_id': cardId,
    'balance': balance
  };
  this.request(url, postJSON(data), wrapper(callback));
};

exports.updateMeetingTicket =  (info, callback) =>{
  let url = this.endpoint + '/card/meetingticket/updateuser?access_token=' + this.token.accessToken;
  this.request(url, postJSON(info), wrapper(callback));
};

exports.setTestWhitelist =  (info, callback)=> {
  let url = this.endpoint + '/card/testwhitelist/set?access_token=' + this.token.accessToken;
  this.request(url, postJSON(info), wrapper(callback));
};


exports.importCustomizedCodes =  (cardId, code, callback)=> {
  let url = this.endpoint + '/card/code/deposit?access_token=' + this.token.accessToken;
  let data = {
    'card_id': cardId,
    'code': code
  };
  this.request(url, postJSON(data), wrapper(callback));
};


(exports.checkCustomizedCodes =  (cardId, code, callback)=> {
  let url = this.endpoint + '/card/code/checkcode?access_token=' + this.token.accessToken;
  let data = {
    'card_id': cardId,
    'code': code
  };
  this.request(url, postJSON(data), wrapper(callback));
});


exports.getDepositCodesCount =   (cardId, callback)=> {
  let url = this.endpoint + '/card/code/getdepositcount?access_token=' + this.token.accessToken;
  let data = {
    'card_id': cardId
  };
  this.request(url, postJSON(data), wrapper(callback));
};

exports.getTotalCardDataInfo =  (beginDate, endDate, source, callback) =>{
  let url = this.endpoint + '/datacube/getcardbizuininfo?access_token=' + this.token.accessToken;
  let data = {
    'begin_date': beginDate,
    'end_date': endDate,
    'cond_source': source
  };
  this.request(url, postJSON(data), wrapper(callback));
};


exports.getCardDataInfo =  (cardId, beginDate, endDate, source, callback) =>{
  let url = this.endpoint + '/datacube/getcardcardinfo?access_token=' + this.token.accessToken;
  let data = {
    'begin_date': beginDate,
    'end_date': endDate,
    'cond_source': source,
    'card_id': cardId
  };
  this.request(url, postJSON(data), wrapper(callback));
};


exports.addConsumer =   (username, locationId, callback)=> {
  let url = this.endpoint + '/card/consumer/add?access_token=' + this.token.accessToken;
  let data = {
    'username': username,
    'is_super_consumer': true
  };
  if (locationId) {
    data.location_id = locationId;
    data.is_super_consumer = false;
  }
  this.request(url, postJSON(data), wrapper(callback));
};


exports.getApplyProtocol =   (callback)=> {
  let url = this.endpoint + '/card/getapplyprotocol?access_token=' + this.token.accessToken;
  this.request(url, {dataType: 'json'}, wrapper(callback));
};


exports.submitSubmerchant =   (options, callback) =>{
  let url = this.endpoint + '/card/submerchant/submit?access_token=' + this.token.accessToken;
  let data = {
    'info': options
  };
  this.request(url, postJSON(data), wrapper(callback));
};


exports.updateSubmerchant =   (options, callback) =>{
  let url = this.endpoint + '/card/submerchant/update?access_token=' + this.token.accessToken;
  let data = {
    'info': options
  };
  this.request(url, postJSON(data), wrapper(callback));
};


exports.getSubmerchant =  (merchantId, callback) =>{
  let url = this.endpoint + '/card/submerchant/get?access_token=' + this.token.accessToken;
  let data = {
    'merchant_id': merchantId
  };
  this.request(url, postJSON(data), wrapper(callback));
};



exports.batchgetSubmerchant = (data, callback) =>{
  let url = this.endpoint + '/card/submerchant/batchget?access_token=' + this.token.accessToken;
  this.request(url, postJSON(data), wrapper(callback));
};



exports.getMemberCardUserInfo =   (info, callback) =>{
  let url = this.endpoint + '/card/membercard/userinfo/get?access_token=' + this.token.accessToken;
  let data = info;
  this.request(url, postJSON(data), wrapper(callback));
};


exports.updateMemberCardUserInfo =  (data, callback) =>{
  let url = this.endpoint + '/card/membercard/updateuser?access_token=' + this.token.accessToken;
  this.request(url, postJSON(data), wrapper(callback));
};
