/**
 * Builds JSON-LD structured data for current page according to its type (page or post).
 *
 * @returns {string} - JSON-LD structured data
 */
function jsonLd() {
  const page = this.page;
  const config = this.config;
  const theme = this.theme;
  const authorEmail = config.email;

  const author = {
    '@type': 'Person',
    name: config.author
  };
  // Google does not accept `Person` as item type for the publisher property
  const publisher = Object.assign({}, author, {'@type': 'Organization', 'logo': {"@type" : "ImageObject",'url':this.url_for(config.url + '/favicon.png'), 'width': 64, 'height': 64}});
  let schema = {};


  if (this.is_post()) {
    let images = [];
    schema = {
      '@context': 'http://schema.org',
      '@type': 'BlogPosting',
      author: author,
      articleBody: this.strip_html(page.content).replace(/ +(?= )/g,''),
      dateCreated: page.date.format(),
      dateModified: page.updated.format(),
      datePublished: page.date.format(),
      description: this.strip_html(page.description),
      headline: page.title,
      image: images,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': this.url_for(page.permalink)
      },
      publisher,
      url: this.url_for(page.permalink)
    };

    if (page.tags && page.tags.length > 0) {
      schema.keywords = page.tags.map((tag) => tag.name).join(', ');
    }

    images.push(config.url + this.url_for(page.path) + 'header.jpg')

    if (page.photos && page.photos.length > 0) {
      images = images.concat(page.photos);
    }

    if (page.coverImage) {
      images.unshift(page.coverImage);
    }

    if (page.thumbnailImage || page.coverImage) {
      images.unshift(page.thumbnailImage);
      schema.thumbnailUrl = page.thumbnailImage || page.coverImage;
    }

    schema.image = images;
  }
  else if (this.is_page() || this.is_home()) {
    schema = {
      '@context': 'http://schema.org',
      "@type": "Blog",
      '@id': config.url,
      author: author,
      name: config.title,
      description: config.description,
      url: config.url,
      publisher
    };

    if (config.keywords && config.keywords.length) {
      schema.keywords = config.keywords;
    }
  }

  return '<script type="application/ld+json">' + JSON.stringify(schema) + '</script>';
}

hexo.extend.helper.register('schema', jsonLd);