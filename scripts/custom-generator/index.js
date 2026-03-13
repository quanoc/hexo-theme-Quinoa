/* global hexo */
/* Custom index generator with pin-top support */

'use strict';

var assign = require('./lib/objec-assign');

// 确保 index_generator 配置存在
if (!hexo.config.index_generator) {
  hexo.config.index_generator = {};
}

// 合并默认配置
hexo.config.index_generator = assign({
  per_page: hexo.config.per_page || 10,
  order_by: '-date',
  path: ''
}, hexo.config.index_generator);

// 注册 generator
hexo.extend.generator.register('index', require('./lib/generator'));
