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