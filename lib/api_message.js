'use strict';

const util = require('./util');
const wrapper = util.wrapper;
const postJSON = util.postJSON;


exports.sendText =  (openid, text, callback)=> {
  this.preRequest(this._sendText, arguments);
};

/*!
 * 客服消息，发送文字消息的未封装版本
 */
exports._sendText =  (openid, text, callback)=> {
  // {
  //  "touser":"OPENID",
  //  "msgtype":"text",
  //  "text": {
  //    "content":"Hello World"
  //  }
  // }
  let url = this.endpoint + '/cgi-bin/message/custom/send?access_token=' + this.token.accessToken;
  let data = {
    'touser': openid,
    'msgtype': 'text',
    'text': {
      'content': text
    }
  };
  this.request(url, postJSON(data), wrapper(callback));
};


exports.sendImage =  (openid, mediaId, callback)=> {
  this.preRequest(this._sendImage, arguments);
};

/*!
 * 客服消息，发送图片消息的未封装版本
 */
exports._sendImage =  (openid, mediaId, callback)=> {
  // {
  //  "touser":"OPENID",
  //  "msgtype":"image",
  //  "image": {
  //    "media_id":"MEDIA_ID"
  //  }
  // }
  let url = this.endpoint + '/cgi-bin/message/custom/send?access_token=' + this.token.accessToken;
  let data = {
    'touser': openid,
    'msgtype':'image',
    'image': {
      'media_id': mediaId
    }
  };
  this.request(url, postJSON(data), wrapper(callback));
};

exports.sendVoice =  (openid, mediaId, callback)=> {
  this.preRequest(this._sendVoice, arguments);
};

/*!
 * 客服消息，发送语音消息的未封装版本
 */
exports._sendVoice =  (openid, mediaId, callback)=> {
  // {
  //  "touser":"OPENID",
  //  "msgtype":"voice",
  //  "voice": {
  //    "media_id":"MEDIA_ID"
  //  }
  // }
  let url = this.endpoint + '/cgi-bin/message/custom/send?access_token=' + this.token.accessToken;
  let data = {
    'touser': openid,
    'msgtype': 'voice',
    'voice': {
      'media_id': mediaId
    }
  };
  this.request(url, postJSON(data), wrapper(callback));
};


exports.sendVideo =  (openid, mediaId, thumbMediaId, callback)=> {
  this.preRequest(this._sendVideo, arguments);
};

/*!
 * 客服消息，发送视频消息的未封装版本
 */
exports._sendVideo =  (openid, mediaId, thumbMediaId, callback) =>{
  // {
  //  "touser":"OPENID",
  //  "msgtype":"video",
  //  "video": {
  //    "media_id":"MEDIA_ID"
  //    "thumb_media_id":"THUMB_MEDIA_ID"
  //  }
  // }
  let url = this.endpoint + '/cgi-bin/message/custom/send?access_token=' + this.token.accessToken;
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


exports.sendMusic =  (openid, music, callback) =>{
  this.preRequest(this._sendMusic, arguments);
};

/*!
 * 客服消息，发送音乐消息的未封装版本
 */
exports._sendMusic =  (openid, music, callback)=> {
  // {
  //  "touser":"OPENID",
  //  "msgtype":"music",
  //  "music": {
  //    "title":"MUSIC_TITLE", // 可选
  //    "description":"MUSIC_DESCRIPTION", // 可选
  //    "musicurl":"MUSIC_URL",
  //    "hqmusicurl":"HQ_MUSIC_URL",
  //    "thumb_media_id":"THUMB_MEDIA_ID"
  //  }
  // }
  let url = this.endpoint + '/cgi-bin/message/custom/send?access_token=' + this.token.accessToken;
  let data = {
    'touser': openid,
    'msgtype':'music',
    'music': music
  };
  this.request(url, postJSON(data), wrapper(callback));
};


exports.sendNews =  (openid, articles, callback)=> {
  this.preRequest(this._sendNews, arguments);
};

/*!
 * 客服消息，发送图文消息（点击跳转到外链）的未封装版本
 */
exports._sendNews =  (openid, articles, callback) =>{
  // {
  //  "touser":"OPENID",
  //  "msgtype":"news",
  //  "news":{
  //    "articles": [
  //      {
  //        "title":"Happy Day",
  //        "description":"Is Really A Happy Day",
  //        "url":"URL",
  //        "picurl":"PIC_URL"
  //      },
  //      {
  //        "title":"Happy Day",
  //        "description":"Is Really A Happy Day",
  //        "url":"URL",
  //        "picurl":"PIC_URL"
  //      }]
  //   }
  // }
  let url = this.endpoint + '/cgi-bin/message/custom/send?access_token=' + this.token.accessToken;
  let data = {
    'touser': openid,
    'msgtype':'news',
    'news': {
      'articles': articles
    }
  };
  this.request(url, postJSON(data), wrapper(callback));
};





exports.sendMpNews =  (openid, mediaId, callback)=> {
  this.preRequest(this._sendMpNews, arguments);
};

/*!
 * 客服消息，发送图文消息（点击跳转到图文消息页面） 的未封装版本
 */
exports._sendMpNews =  (openid, mediaId, callback)=> {
   //{
   // "touser":"OPENID",
   // "msgtype":"mpnews",
   // "mpnews":
   //  {
   //     "media_id":"MEDIA_ID"
   //  }
   //}
  let url = this.endpoint + '/cgi-bin/message/custom/send?access_token=' + this.token.accessToken;
  let data = {
    'touser': openid,
    'msgtype':'mpnews',
    'mpnews': {
      'media_id': mediaId
    }
  };
  this.request(url, postJSON(data), wrapper(callback));
};


exports.sendCard =  (openid, card, callback)=> {
  this.preRequest(this._sendCard, arguments);
};

/*!
 * 客服消息，发送卡卷消息的未封装版本
 */
exports._sendCard =  (openid, card, callback) =>{
  let url = this.endpoint + '/cgi-bin/message/custom/send?access_token=' + this.token.accessToken;
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
