'use strict';

const util = require('./util');
const wrapper = util.wrapper;
const postJSON = util.postJSON;

let methods = [
  // 用户分析数据接口
  'getUserSummary', // 获取用户增减数据
  'getUserCumulate', // 获取累计用户数据
  // 图文分析数据接口
  'getArticleSummary', // 获取图文群发每日数据
  'getArticleTotal', // 获取图文群发总数据
  'getUserRead', // 获取图文统计数据
  'getUserReadHour', // 获取图文统计分时数据
  'getUserShare', // 获取图文分享转发数据
  'getUserShareHour', // 获取图文分享转发分时数据
  // 消息分析数据接口
  'getUpstreamMsg', //获取消息发送概况数据
  'getUpstreamMsgHour', // 获取消息分送分时数据
  'getUpstreamMsgWeek', // 获取消息发送周数据
  'getUpstreamMsgMonth', // 获取消息发送月数据
  'getUpstreamMsgDist', // 获取消息发送分布数据
  'getUpstreamMsgDistWeek', // 获取消息发送分布周数据
  'getUpstreamMsgDistMonth', // 获取消息发送分布月数据
  // 接口分析数据接口
  'getInterfaceSummary', // 获取接口分析数据
  'getInterfaceSummaryHour' // 获取接口分析分时数据
];


methods.forEach( (method) =>{
  exports[method] =  (begin, end, callback)=> {
    this.preRequest(this['_' + method], arguments);
  };
});


methods.forEach( (method)=> {
  exports['_' + method] =  (begin, end, callback) =>{
    let data = {
      begin_date: begin,
      end_date: end
    };
    let url = this.endpoint + '/datacube/' + method.toLowerCase() + '?access_token=' + this.token.accessToken;
    this.request(url, postJSON(data), wrapper(callback));
  };
});
