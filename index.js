'use strict';
// 基础设置
API.mixin(require('./lib/api_common'));
// 自定义菜单
API.mixin(require('./lib/api_quota'));
// 个性化菜单
API.mixin(require('./lib/api_menu'));

module.exports = API;
