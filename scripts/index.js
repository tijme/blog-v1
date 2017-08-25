hexo.extend.helper.register('getPages', function(showIn) {

    var pages = this.site.pages;

    var filtered = pages.filter(function(page) {
        return page["show_in_" + showIn]
    });

    var sorted = filtered.data.sort(function(a, b) {
        return a.order_index - b.order_index
    });

    return sorted;

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

hexo.extend.tag.register('customimage', function(args) {
    var classes = args[0];
    var file = args[1];
    var alt = args[2];

    return "<p><img class=\"" + classes + "\" src=\"" + file + "\" alt=\"" + alt + "\"></p>"
});

hexo.extend.tag.register('highlightcodefromurl', function(args) {
    var fetch = require('node-fetch');

    var titleHTML = "\
    <div class=\"title-bar hidden-xs\">\
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
            return "<div class=\"window\"><pre><code class=\"hljs\">" + highlighted + "</code></pre></div>";
        });

}, {async: true});
