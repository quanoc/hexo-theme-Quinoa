'use strict';

// 加载本地 pagination 模块
var pagination = require('./pagination');

module.exports = function(locals) {
  var config = this.config;
  var themeConfig = this.theme.config || {};
  
  // 获取 index_generator 配置
  var indexConfig = config.index_generator || themeConfig.index_generator || {};
  var path = indexConfig.path || '';
  var perPage = indexConfig.per_page || config.per_page || 10;
  var orderBy = indexConfig.order_by || '-date';
  
  // 获取文章并排序
  var posts = locals.posts.sort(orderBy);
  
  // 置顶排序
  if (posts.data && posts.data.length > 0) {
    posts.data = posts.data.sort(function(a, b) {
      if (a.top && b.top) {
        if (a.top == b.top) return b.date - a.date;
        else return b.top - a.top;
      } else if (a.top && !b.top) {
        return -1;
      } else if (!a.top && b.top) {
        return 1;
      } else {
        return b.date - a.date;
      }
    });
  }
  
  var paginationDir = config.pagination_dir || 'page';
  
  return pagination(path, posts, {
    perPage: perPage,
    layout: ['index', 'archive'],
    format: paginationDir + '/%d/',
    data: {
      __index: true
    }
  });
};
