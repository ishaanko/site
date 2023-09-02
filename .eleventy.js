module.exports = eleventyConfig => {
  // copy the assets directory when generating outputs!
  eleventyConfig.addPassthroughCopy('assets');
  eleventyConfig.addWatchTarget('assets');

  return {
    dir: {
      includes: '../templates/includes',
      layouts: '../templates/layouts',

      input: 'src',
      output: 'public'
    },
    pathPrefix: 'site',
    templateFormats: [ 'md', 'njk', 'html' ],
  };
};
