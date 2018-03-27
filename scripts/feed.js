/* global hexo */
'use strict';

var assign = require('object-assign');
var pathFn = require('path');

var config = hexo.config.feed = assign({
  type: 'rss2',
  limit: false,
  hub: '',
  content: true,
  content_limit: 140,
  content_limit_delim: ''
}, hexo.config.feed);

// Set default feed path
if (!config.path) {
  config.path = config.type + '.xml';
}

// Add extension name if don't have
if (!pathFn.extname(config.path)) {
  config.path += '.xml';
}

hexo.extend.generator.register('rss', require('./feed/generator'));
