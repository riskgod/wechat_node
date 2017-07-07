'use strict';

const util = require('./util');
const wrapper = util.wrapper;
const postJSON = util.postJSON;

exports.createTag =  (name, callback)=>{
  this.preRequest(this._createTag, arguments);
};

/*!
 * 创建标签的未封装版本
 */
exports._createTag =  (name, callback)=>{
  // https://api.weixin.qq.com/cgi-bin/tags/create?access_token=ACCESS_TOKEN
  let url = this.endpoint + '/cgi-bin/tags/create?access_token=' + this.token.accessToken;
  let data = {
    'tag': {
      'name': name
    }
  };
  this.request(url, postJSON(data), wrapper(callback));
};


exports.getTags =  (callback)=>{
  this.preRequest(this._getTags, arguments);
};

/*!
 * 获取公众号已创建的标签的未封装版本
 */
exports._getTags =  (callback)=>{
  // https://api.weixin.qq.com/cgi-bin/tags/get?access_token=ACCESS_TOKEN
  let url = this.endpoint + '/cgi-bin/tags/get?access_token=' + this.token.accessToken;
  this.request(url, {dataType: 'json'}, wrapper(callback));
};


exports.editTag =  (id, name, callback)=>{
  this.preRequest(this._editTag, arguments);
};

/*!
 * 编辑标签的未封装版本
 */
exports._editTag =  (id, name, callback)=>{
  // https://api.weixin.qq.com/cgi-bin/tags/update?access_token=ACCESS_TOKEN
  // POST数据格式：json
  // POST数据例子：{"tag":{"id":134, "name":"test"}}
  let url = this.endpoint + '/cgi-bin/tags/update?access_token=' + this.token.accessToken;
  let data = {
    'tag': {
      'id': id,
      'name': name
    }
  };
  this.request(url, postJSON(data), wrapper(callback));
};


exports.deleteTag =  (id, callback)=>{
  this.preRequest(this._deleteTag, arguments);
};

/*!
 * 删除标签的未封装版本
 */
exports._deleteTag =  (id, callback)=>{
  // http请求方式: POST（请使用https协议）
  // https://api.weixin.qq.com/cgi-bin/tags/delete?access_token=ACCESS_TOKEN
  // POST数据格式：json
  // POST数据例子：{"tag":{"id":108}}
  let url = this.endpoint + '/cgi-bin/tags/delete?access_token=' + this.token.accessToken;
  let data = {
    'tag': {'id': id}
  };
  this.request(url, postJSON(data), wrapper(callback));
};


exports.getTagUsers =  (tagId, openid, callback)=>{
  this.preRequest(this._getTagUsers, arguments);
};

/*!
 * 获取标签下粉丝列表的未封装版本
 */
exports._getTagUsers =  (tagId, openid, callback)=>{
  // http请求方式: POST（请使用https协议）
  // https://api.weixin.qq.com/cgi-bin/user/tag/get?access_token=ACCESS_TOKEN
  // POST数据格式：json
  // POST数据例子：{"tagid":108, "next_openid":"oDF3iYx0ro3_7jD4HFRDfrjdCM58"}
  let url = this.endpoint + '/cgi-bin/user/tag/get?access_token=' + this.token.accessToken;
  let data = {
    'tagid': tagId,
    'next_openid': openid
  };
  this.request(url, postJSON(data), wrapper(callback));
};


exports.membersBatchtagging =  (tagId, openList, callback)=>{
  this.preRequest(this._membersBatchtagging, arguments);
};

/*!
 * 批量为用户打标签的未封装版本
 */
exports._membersBatchtagging =  (tagId, openList, callback)=>{
  // https://api.weixin.qq.com/cgi-bin/tags/members/batchtagging?access_token=ACCESS_TOKEN
  let url = this.endpoint + '/cgi-bin/tags/members/batchtagging?access_token=' + this.token.accessToken;
  let data = {
    'openid_list':openList,
    'tagid': tagId
  };
  this.request(url, postJSON(data), wrapper(callback));
};


exports.membersBatchuntagging =  (tagId, openList, callback)=>{
  this.preRequest(this._membersBatchuntagging, arguments);
};


exports._membersBatchuntagging =  (tagId, openList, callback)=>{
  // https://api.weixin.qq.com/cgi-bin/tags/members/batchuntagging?access_token=ACCESS_TOKEN
  let url = this.endpoint + '/cgi-bin/tags/members/batchuntagging?access_token=' + this.token.accessToken;
  let data = {
    'openid_list':openList,
    'tagid': tagId
  };
  this.request(url, postJSON(data), wrapper(callback));
};


exports.getUserTags =  (openid, callback)=>{
  this.preRequest(this._getUserTags, arguments);
};


exports._getUserTags =  (openid, callback)=>{
  // https://api.weixin.qq.com/cgi-bin/tags/getidlist?access_token=ACCESS_TOKEN
  let url = this.endpoint + '/cgi-bin/tags/getidlist?access_token=' + this.token.accessToken;
  let data = {
    'openid':openid
  };
  this.request(url, postJSON(data), wrapper(callback));
};

