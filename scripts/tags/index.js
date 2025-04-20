/* global hexo */

'use strict';

const postNote = require('./note')(hexo);

hexo.extend.tag.register('note', postNote, true);
hexo.extend.tag.register('subnote', postNote, true);