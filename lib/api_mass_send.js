'use strict';

const util = require('./util');
const wrapper = util.wrapper;
const postJSON = util.postJSON;


exports.uploadNews = function (news, callback) {
  this.preRequest(this._uploadNews, arguments);
};


exports._uploadNews = function (news, callback) {
  // https://api.weixin.qq.com/cgi-bin/media/uploadnews?access_token=ACCESS_TOKEN
  let url = this.endpoint + '/cgi-bin/media/uploadnews?access_token=' + this.token.accessToken;
  this.request(url, postJSON(news), wrapper(callback));
};

exports.uploadMPVideo = function (opts, callback) {
  this.preRequest(this._uploadMPVideo, arguments);
};


exports._uploadMPVideo = function (opts, callback) {
  // https://file.api.weixin.qq.com/cgi-bin/media/uploadvideo?access_token=ACCESS_TOKEN
  let url = this.fileServerPrefix + 'media/uploadvideo?access_token=' + this.token.accessToken;
  this.request(url, postJSON(opts), wrapper(callback));
};


exports.massSend = function (opts, receivers, callback) {
  this.preRequest(this._massSend, arguments);
};


exports._massSend = function (opts, receivers, callback) {
  let url;
  if (Array.isArray(receivers)) {
    opts.touser = receivers;
    url = this.endpoint + '/cgi-bin/message/mass/send?access_token=' + this.token.accessToken;
  } else {
    if (typeof receivers === 'boolean') {
      opts.filter = {
        'is_to_all': receivers
      };
    } else {
      opts.filter = {
        'group_id': receivers
      };
    }
    url = this.endpoint + '/cgi-bin/message/mass/sendall?access_token=' + this.token.accessToken;
  }
  // https://api.weixin.qq.com/cgi-bin/message/mass/sendall?access_token=ACCESS_TOKEN
  this.request(url, postJSON(opts), wrapper(callback));
};


exports.massSendNews = function (mediaId, receivers, callback) {
  let opts = {
    'mpnews': {
      'media_id': mediaId
    },
    'msgtype': 'mpnews'
  };
  this.massSend(opts, receivers, callback);
};


exports.massSendText = function (content, receivers, callback) {
  let opts = {
    'text': {
      'content': content
    },
    'msgtype': 'text'
  };
  this.massSend(opts, receivers, callback);
};


exports.massSendVoice = function (mediaId, receivers, callback) {
  let opts = {
    'voice': {
      'media_id': mediaId
    },
    'msgtype': 'voice'
  };
  this.massSend(opts, receivers, callback);
};


exports.massSendImage = function (mediaId, receivers, callback) {
  let opts = {
    'image': {
      'media_id': mediaId
    },
    'msgtype': 'image'
  };
  this.massSend(opts, receivers, callback);
};


exports.massSendVideo = function (mediaId, receivers, callback) {
  let opts = {
    'mpvideo': {
      'media_id': mediaId
    },
    'msgtype': 'mpvideo'
  };
  this.massSend(opts, receivers, callback);
};


exports.massSendMPVideo = function (data, receivers, callback) {
  let that = this;
  // 自动帮转视频的media_id
  this.uploadMPVideo(data,  (err, result) =>{
    if (err) {
      return callback(err);
    }
    that.massSendVideo(result.media_id, receivers, callback);
  });
};


exports.deleteMass = function (messageId, callback) {
  this.preRequest(this._deleteMass, arguments);
};

exports._deleteMass = function (messageId, callback) {
  let opts = {
    msg_id: messageId
  };
  let url = this.endpoint + '/cgi-bin/message/mass/delete?access_token=' + this.token.accessToken;
  this.request(url, postJSON(opts), wrapper(callback));
};

exports.previewNews = function (openid, mediaId, callback) {
  this.preRequest(this._previewNews, arguments);
};

exports._previewNews = function (openid, mediaId, callback) {
  let opts = {
    'touser': openid,
    'mpnews': {
      'media_id': mediaId
    },
    'msgtype': 'mpnews'
  };
  let url = this.endpoint + '/cgi-bin/message/mass/preview?access_token=' + this.token.accessToken;
  this.request(url, postJSON(opts), wrapper(callback));
};


exports.previewText = function (openid, content, callback) {
  this.preRequest(this._previewText, arguments);
};

exports._previewText = function (openid, content, callback) {
  let opts = {
    'touser': openid,
    'text': {
      'content': content
    },
    'msgtype':'text'
  };
  let url = this.endpoint + '/cgi-bin/message/mass/preview?access_token=' + this.token.accessToken;
  this.request(url, postJSON(opts), wrapper(callback));
};


exports.previewVoice = function (openid, mediaId, callback) {
  this.preRequest(this._previewVoice, arguments);
};

exports._previewVoice = function (openid, mediaId, callback) {
  let opts = {
    'touser': openid,
    'voice': {
      'media_id': mediaId
    },
    'msgtype': 'voice'
  };
  let url = this.endpoint + '/cgi-bin/message/mass/preview?access_token=' + this.token.accessToken;
  this.request(url, postJSON(opts), wrapper(callback));
};


exports.previewImage = function (openid, mediaId, callback) {
  this.preRequest(this._previewImage, arguments);
};

exports._previewImage = function (openid, mediaId, callback) {
  let opts = {
    'touser': openid,
    'image': {
      'media_id': mediaId
    },
    'msgtype': 'image'
  };
  let url = this.endpoint + '/cgi-bin/message/mass/preview?access_token=' + this.token.accessToken;
  this.request(url, postJSON(opts), wrapper(callback));
};


exports.previewVideo = function (openid, mediaId, callback) {
  this.preRequest(this._previewVideo, arguments);
};

exports._previewVideo = function (openid, mediaId, callback) {
  let opts = {
    'touser': openid,
    'mpvideo': {
      'media_id': mediaId
    },
    'msgtype': 'mpvideo'
  };
  let url = this.endpoint + '/cgi-bin/message/mass/preview?access_token=' + this.token.accessToken;
  this.request(url, postJSON(opts), wrapper(callback));
};


exports.getMassMessageStatus = function (messageId, callback) {
  this.preRequest(this._getMassMessageStatus, arguments);
};

exports._getMassMessageStatus = function (messageId, callback) {
  let opts = {
    'msg_id': messageId
  };
  let url = this.endpoint + '/cgi-bin/message/mass/get?access_token=' + this.token.accessToken;
  this.request(url, postJSON(opts), wrapper(callback));
};
