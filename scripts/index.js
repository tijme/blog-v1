hexo.extend.helper.register('getVersion', function() {

    var fs = require('fs');
    return fs.readFileSync('.semver', 'utf8').trim();

});

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

hexo.extend.helper.register('getUrl', function(path, remove) {

    if (!remove) {
        remove = 'index.html';
    }

    return this.url_for(path).replace(remove, '');

});

hexo.extend.helper.register('getTrimmedPartial', function(file) {

    return this.partial(file)
        .replace(/(\r\n|\n|\r|\t)/gm,"")
        .replace(/\s{2,}/g, ' ');

});

hexo.extend.helper.register('getPrerenderMetaTags', function() {

    meta = '';

    self = this;

    this.site.pages.forEach(function(page) {
        let link = self.url_for(page.path).replace('/index.html', '');
        meta += '<link rel="prerender" href="' + link + '">';
    });

    this.site.posts.forEach(function(page) {
        let link = self.url_for(page.path).replace('/index.html', '');
        meta += '<link rel="prerender" href="' + link + '">';
    });

    return meta;

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
    var title = args.length == 3 ? args[2] : "";
    var classes = args.length == 4 ? args[3] : "";

    if (!hexo.extend.tag.customlightbox[album]) {
        hexo.extend.tag.customlightbox[album] = [];
    }

    var newLength = hexo.extend.tag.customlightbox[album].push({
        "file": file,
        "title": title
    });

    return '\
        <div class="lightbox-image">\
            <a class="lightbox-action-open" href="#' + file + '">\
                <img src="' + file + '" class="lightbox-thumbnail ' + classes + '" />\
            </a>\
            <img src="' + file + '" id="' + file + '" class="lightbox-original" />\
            <a class="lightbox-action-close" href="#void"></a>\
            <a class="lightbox-action-prev-wrapper" href="#prev-image" data-album="' + album + '" data-index="' + (newLength - 1) + '"><div class="lightbox-action-prev"><span class="lightbox-action-prev-button"></span></div></a>\
            <a class="lightbox-action-next-wrapper" href="#next-image" data-album="' + album + '" data-index="' + (newLength - 1) + '"><div class="lightbox-action-next"><span class="lightbox-action-next-button"></span></div></a>\
        </div>\
    ';
});

hexo.extend.filter.register('after_post_render', function(data) {
    var prevLinks = data.content.match(/<a class="lightbox-action-prev-wrapper" href="#prev-image" data-album="([a-zA-Z0-9\-]+)" data-index="([0-9]+)"><div class="lightbox-action-prev"><span class="lightbox-action-prev-button"><\/span><\/div><\/a>/g);
    var nextLinks = data.content.match(/<a class="lightbox-action-next-wrapper" href="#next-image" data-album="([a-zA-Z0-9\-]+)" data-index="([0-9]+)"><div class="lightbox-action-next"><span class="lightbox-action-next-button"><\/span><\/div><\/a>/g);

    if (!prevLinks || !nextLinks) {
        return;
    }

    var albums = {}

    for (linkIndex in prevLinks) {
        var albumRegexp = /data-album="([a-zA-Z0-9\-]+)"/g;
        var albumMatches = albumRegexp.exec(prevLinks[linkIndex]);
        var album = albumMatches[1];

        albums[album] = {
            prevId: "",
            nextId: ""
        }
    }

    var albumLinkIndex = 0;
    var lastAlbum = "";

    for (linkIndex in prevLinks) {
        var albumRegexp = /data-album="([a-zA-Z0-9\-]+)"/g;
        var albumMatches = albumRegexp.exec(prevLinks[linkIndex]);
        var album = albumMatches[1];

        if (album != lastAlbum) {
            albumLinkIndex = 0;
        }

        if (hexo.extend.tag.customlightbox[album].length > parseInt(albumLinkIndex) + 1) {
            albums[album].nextId = hexo.extend.tag.customlightbox[album][parseInt(albumLinkIndex) + 1]["file"];
        } else {
            albums[album].nextId = "";
        }

        if (albums[album].prevId) {
            newElement = prevLinks[linkIndex].replace('href="#prev-image"', 'href="#' + albums[album].prevId + '"');
            data.content = data.content.replace(prevLinks[linkIndex], newElement);
        } else {
            data.content = data.content.replace(prevLinks[linkIndex], "");
        }

        if (albums[album].nextId) {
            newElement = nextLinks[linkIndex].replace('href="#next-image"', 'href="#' + albums[album].nextId + '"');
            data.content = data.content.replace(nextLinks[linkIndex], newElement);
        } else {
            data.content = data.content.replace(nextLinks[linkIndex], "");
        }

        if (hexo.extend.tag.customlightbox[album][albumLinkIndex]) {
            albums[album].prevId = hexo.extend.tag.customlightbox[album][albumLinkIndex]["file"];
        } else {
            albums[album].prevId = ""
        }

        lastAlbum = album;
        albumLinkIndex ++;

        if (!albums[album].nextId) {
            hexo.extend.tag.customlightbox[album] = []
        }
    }

}, 9);

hexo.extend.tag.register('customlink', function(args) {
    var href = args[0];

    if (href[0] == "#")
        return "<a href=\"" + href + "\">link</a>";

    return "<a href=\"" + href + "\" target=\"_blank\" rel=\"noopener nofollow\">link</a>";
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

hexo.extend.tag.register('highlightcode', function(args, content) {
    var highlight = require('highlight.js');
    highlight.configure({classPrefix: ''});
    var highlighted = highlight.highlight(args[0], content).value;
    return "<div class=\"window\"><pre><code class=\"hljs\">" + highlighted + "</code></pre></div>";
}, {ends: true});
