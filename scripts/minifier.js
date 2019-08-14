'use strict';
/* global hexo */

const isEnabled = process.env.NODE_ENV !== 'development'
  && (hexo.config.hasOwnProperty('all_minifier') === false || hexo.config.all_minifier === true);

if (isEnabled) {

  // HTML minifier
  hexo.config.html_minifier = Object.assign({
    enable: true,
    exclude: [],
    ignoreCustomComments: [/^\s*more/],
    removeComments: true,
    removeCommentsFromCDATA: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeEmptyAttributes: true,
    minifyJS: true,
    minifyCSS: true,
    silent: false
  }, hexo.config.html_minifier);

  // Css minifier
  hexo.config.css_minifier = Object.assign({
    enable: true,
    exclude: ['*.min.css'],
    silent: false
  }, hexo.config.css_minifier);

  // Js minifier
  hexo.config.js_minifier = Object.assign({
    enable: true,
    mangle: true,
    output: {},
    compress: {},
    exclude: ['*.min.js'],
    silent: false
  }, hexo.config.js_minifier);

  // Image minifier
  hexo.config.image_minifier = Object.assign({
    enable: false,
    interlaced: false,
    multipass: false,
    optimizationLevel: 1,
    pngquant: false,
    progressive: true,
    silent: false
  }, hexo.config.image_minifier);

  // Js concator
  hexo.config.js_concator = Object.assign({
    enable: false,
    bundle_path: 'js/bundle.js',
    front: false,
    silent: false
  }, hexo.config.js_concator);

  hexo.extend.filter.register('after_render:html', require('./minifier/lib/optimizeHTML'));

  hexo.extend.filter.register('after_render:css', require('./minifier/lib/optimizeCSS'));

  hexo.extend.filter.register('after_render:js', require('./minifier/lib/optimizeJS'));

  hexo.extend.filter.register('after_generate', require('./minifier/lib/optimizeImage'));

  hexo.extend.filter.register('after_generate', require('./minifier/lib/concatJS'));
}
