hexo.extend.helper.register('getPages', function(showIn) {

    return this.site.pages
        .filter(function(page) {
            return page["show_in_" + showIn]
        })
        .sort(function(a, b) {
            return a.order_index - b.order_index
        });

});

hexo.extend.helper.register('getPath', function() {

    return this.path.replace('index.html', '');

});

hexo.extend.helper.register('getUrl', function(path) {

    return this.url_for(path).replace('index.html', '');

});

hexo.extend.helper.register('getTrimmedPartial', function(file) {

    return this.partial(file)
        .replace(/(\r\n|\n|\r|\t)/gm,"")
        .replace(/\s{2,}/g, ' ');

});

hexo.extend.tag.register('highlightcodefromurl', function(args) {
    var fetch = require('node-fetch');

    var titleHTML = "\
    <div class=\"title-bar\">\
        <div class=\"name\">" + args[1] + "</div>\
        <div class=\"button\"></div>\
        <div class=\"button\"></div>\
        <div class=\"button\"></div>\
    </div>\
    <div class=\"clearfix\"></div>\
    ";

    return fetch(args[2])
        .then(function(res) {
            return res.text();
        }).then(function(body) {
            var highlight = require('highlight.js');
            highlight.configure({classPrefix: ''});
            var highlighted = highlight.highlight(args[0], body).value;
            return "<div class=\"window\">" + titleHTML + "<pre><code class=\"hljs\">" + highlighted + "</code></pre></div>";
        });

}, {async: true});
