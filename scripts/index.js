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
    var title = args[2];

    return "<p><img class=\"" + classes + "\" src=\"" + file + "\" alt=\"" + title + "\" title=\"" + title + "\"></p>"
});

hexo.extend.tag.customlightbox = {};

hexo.extend.tag.register('customlightbox', function(args) {
    var album = args[0];
    var file = args[1];
    var title = args[2];

    if (!hexo.extend.tag.customlightbox[album]) {
        hexo.extend.tag.customlightbox[album] = [];
    }

    var newLength = hexo.extend.tag.customlightbox[album].push({
        "file": file,
        "title": title
    });

    return '\
        <div class="lightbox">\
            <a class="lightbox-thumbnail-wrapper" id="' + file + '" href="#' + file + '">\
                <img class="lightbox-thumbnail" src="' + file + '" />\
            </a>\
            <div class="lightbox-original-wrapper" href="#void">\
                <a class="lightbox-prev" data-album="' + album + '" data-index="' + (newLength - 1) + '" href="#prev-image"></a>\
                <img class="lightbox-original" src="' + file + '" />\
                <a class="lightbox-next" data-album="' + album + '" data-index="' + (newLength - 1) + '" href="#next-image"></a>\
            </div>\
            <a class="lightbox-close" href="#void"></a>\
        </div>\
    ';
});

hexo.extend.filter.register('after_post_render', function(data) {

    var prevLinks = data.content.match(/<a class="lightbox-prev" data-album="([a-zA-Z\-]+)" data-index="([0-9]+)" href="#prev-image"><\/a>/g);
    var nextLinks = data.content.match(/<a class="lightbox-next" data-album="([a-zA-Z\-]+)" data-index="([0-9]+)" href="#next-image"><\/a>/g);
    
    if (!prevLinks || !nextLinks) {
        return;
    }

    var prevId = "";
    var nextId = "";

    for (linkIndex in prevLinks) {
        var albumRegexp = /data-album="([a-zA-Z\-]+)"/g;
        var albumMatches = albumRegexp.exec(prevLinks[linkIndex]);
        var album = albumMatches[1];

        if (hexo.extend.tag.customlightbox[album].length >= parseInt(linkIndex) + 1) {
            nextId = hexo.extend.tag.customlightbox[album][parseInt(linkIndex) + 1]["file"];
        } else {
            nextId = "";
        }

        if (prevId) {
            newElement = prevLinks[linkIndex].replace('href="#prev-image"', 'href="#' + prevId + '"');
            data.content = data.content.replace(prevLinks[linkIndex], newElement);
        } else {
            data.content = data.content.replace(prevLinks[linkIndex], "");
        }

        if (nextId) {
            newElement = nextLinks[linkIndex].replace('href="#next-image"', 'href="#' + nextId + '"');
            data.content = data.content.replace(nextLinks[linkIndex], newElement);
        } else {
            data.content = data.content.replace(nextLinks[linkIndex], "");
        }

        prevId = hexo.extend.tag.customlightbox[album][linkIndex]["file"];
    }

}, 9);

hexo.extend.tag.register('customlink', function(args) {
    var href = args[0];

    return "<a href=\"" + href + "\" target=\"_blank\" rel=\"noopener\">link</a>";
});

hexo.extend.tag.register('customcommand', function(args) {
    var command = args[0];

    return "<code class=\"command\">" + command + "</code>";
});

hexo.extend.tag.register('highlightcodefromurl', function(args) {
    var fetch = require('node-fetch');

    return fetch(args[1])
        .then(function(res) {
            return res.text();
        }).then(function(body) {
            var highlight = require('highlight.js');
            highlight.configure({classPrefix: ''});
            var highlighted = highlight.highlight(args[0], body).value;
            return "<div class=\"window\"><pre><code class=\"hljs\">" + highlighted + "</code></pre></div>";
        });

}, {async: true});
