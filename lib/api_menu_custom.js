'use strict';

const util = require('./util');
const wrapper = util.wrapper;
const postJSON = util.postJSON;


exports.createCustomMenu =  (menu, callback) =>{
  this.preRequest(this._createCustomMenu, arguments);
};


exports._createCustomMenu =  (menu, callback) =>{
  let url = this.endpoint + '/cgi-bin/menu/addconditional?access_token=' + this.token.accessToken;
  this.request(url, postJSON(menu), wrapper(callback));
};



exports.removeCustomMenu =  (menu_id,callback) =>{
  this.preRequest(this._removeCustomMenu, arguments);
};


exports._removeCustomMenu =  (menu_id,callback)=> {
  let url = this.endpoint + '/cgi-bin/menu/delconditional?access_token=' + this.token.accessToken;
  this.request(url, postJSON({
    'menuid' : menu_id
  }), wrapper(callback));
};




exports.testCustomMenu =  (user_id, callback)=> {
  this.preRequest(this._testCustomMenu, arguments);
};


exports._testCustomMenu =  (user_id,callback)=> {
  let url = this.endpoint + '/cgi-bin/menu/trymatch?access_token=' + this.token.accessToken;
  this.request(url, postJSON({
    'user_id' : user_id
  }), wrapper(callback));
};
