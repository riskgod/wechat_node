'use strict';

const sha1 = require('sha1');
/**
 * check the request from wechat-server or not
 * @param token
 * @param req
 * @param res
 */
exports.checkRequest = function (token,req,res) {
    let query = req.query;
    let list = [token, query.timestamp, query.nonce].sort().join('');
    let sha = sha1(list);
    if (sha == query.signature) {
        res.send(query.echostr);
    } else {
        res.send("wrong");
    }
};
