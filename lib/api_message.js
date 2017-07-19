'use strict';

const util = require('./util');
const wrapper = util.wrapper;
const postJSON = util.postJSON;


exports.sendText = function (openid, text, callback) {
  this.preRequest(this._sendText, arguments);
};


exports._sendText = function (accessToken,openid, text, callback) {
  let url = this.endpoint + '/cgi-bin/message/custom/send?access_token=' + accessToken;
  let data = {
    'touser': openid,
    'msgtype': 'text',
    'text': {
      'content': text
    }
  };
  this.request(url, postJSON(data), wrapper(callback));
};


exports.sendImage = function (openid, mediaId, callback) {
  this.preRequest(this._sendImage, arguments);
};


exports._sendImage = function (accessToken,openid, mediaId, callback) {

  let url = this.endpoint + '/cgi-bin/message/custom/send?access_token=' + accessToken;
  let data = {
    'touser': openid,
    'msgtype':'image',
    'image': {
      'media_id': mediaId
    }
  };
  this.request(url, postJSON(data), wrapper(callback));
};

exports.sendVoice = function (openid, mediaId, callback) {
  this.preRequest(this._sendVoice, arguments);
};


exports._sendVoice = function (accessToken,openid, mediaId, callback) {
  let url = this.endpoint + '/cgi-bin/message/custom/send?access_token=' + accessToken;
  let data = {
    'touser': openid,
    'msgtype': 'voice',
    'voice': {
      'media_id': mediaId
    }
  };
  this.request(url, postJSON(data), wrapper(callback));
};


exports.sendVideo = function (openid, mediaId, thumbMediaId, callback) {
  this.preRequest(this._sendVideo, arguments);
};


exports._sendVideo = function (accessToken,openid, mediaId, thumbMediaId, callback) {
  let url = this.endpoint + '/cgi-bin/message/custom/send?access_token=' + accessToken;
  let data = {
    'touser': openid,
    'msgtype':'video',
    'video': {
      'media_id': mediaId,
      'thumb_media_id': thumbMediaId
    }
  };
  this.request(url, postJSON(data), wrapper(callback));
};


exports.sendMusic = function (openid, music, callback) {
  this.preRequest(this._sendMusic, arguments);
};


exports._sendMusic = function (accessToken,openid, music, callback) {

  let url = this.endpoint + '/cgi-bin/message/custom/send?access_token=' + accessToken;
  let data = {
    'touser': openid,
    'msgtype':'music',
    'music': music
  };
  this.request(url, postJSON(data), wrapper(callback));
};


exports.sendNews = function (openid, articles, callback) {
  this.preRequest(this._sendNews, arguments);
};


exports._sendNews = function (accessToken,openid, articles, callback) {

  let url = this.endpoint + '/cgi-bin/message/custom/send?access_token=' + accessToken;
  let data = {
    'touser': openid,
    'msgtype':'news',
    'news': {
      'articles': articles
    }
  };
  this.request(url, postJSON(data), wrapper(callback));
};





exports.sendMpNews = function (accessToken,openid, mediaId, callback) {
  this.preRequest(this._sendMpNews, arguments);
};


exports._sendMpNews = function (openid, mediaId, callback) {
  let url = this.endpoint + '/cgi-bin/message/custom/send?access_token=' + accessToken;
  let data = {
    'touser': openid,
    'msgtype':'mpnews',
    'mpnews': {
      'media_id': mediaId
    }
  };
  this.request(url, postJSON(data), wrapper(callback));
};


exports.sendCard = function (openid, card, callback) {
  this.preRequest(this._sendCard, arguments);
};


exports._sendCard = function (accessToken,openid, card, callback) {
  let url = this.endpoint + '/cgi-bin/message/custom/send?access_token=' + accessToken;
  let that = this;
  this.getCardExt(card,  (err, result)=> {
    let data = {
      'touser': openid,
      'msgtype':'wxcard',
      'wxcard': {
        'card_id': card.card_id,
        'card_ext': result
      }
    };
    that.request(url, postJSON(data), wrapper(callback));
  });
};

