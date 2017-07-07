'use strict';

const util = require('./util');
const wrapper = util.wrapper;


exports.updateFeedback =  (openid, feedbackId, callback) =>{
  this.preRequest(this._updateFeedback, arguments);
};

exports._updateFeedback =  (openid, feedbackId, callback)=> {
  let feedbackUrl = this.endpoint + '/payfeedback/update';
  // https://api.weixin.qq.com/payfeedback/update?access_token=xxxxx&openid=XXXX&feedbackid=xxxx
  let data = {
    'access_token': this.token.accessToken,
    'openid': openid,
    'feedbackid': feedbackId
  };
  let opts = {
    dataType: 'json',
    type: 'GET',
    data: data,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  this.request(feedbackUrl, opts, wrapper(callback));
};
