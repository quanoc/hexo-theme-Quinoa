/* global hexo */

'use strict';

const postNote = require('./note')(hexo);

hexo.extend.tag.register('note', postNote, true);
hexo.extend.tag.register('subnote', postNote, true);

// scripts/tabs/tabs.js todo完善tabs标签处理
const tabs = require('./tabs')(hexo);
hexo.extend.tag.register('tabs', tabs, true);

