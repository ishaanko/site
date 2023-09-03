const luxon = require("luxon"),
  yaml = require("js-yaml");

module.exports = (eleventyConfig) => {
  // Copy the assets directory when generating outputs!
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addWatchTarget("assets");

  // Create a 'date' filter to format dates in HTML.
  eleventyConfig.addFilter("date", (d) => {
    return luxon.DateTime.fromJSDate(d).toFormat("LLL dd, yyyy");
  });

  // Replace the default YAML frontmatter engine to post-process the
  // parsed dates (with assumption they are in UTC) to instead be
  // assumed to be in author's local timezone.
  eleventyConfig.setFrontMatterParsingOptions({
    engines: {
      yaml: {
        parse: function (dataBlob) {
          let data = yaml.load(dataBlob);
          if (data.date) {
            // Create a new Date object that is offseted based on local timezone.
            // Timezone offset in mins * 60 sec * 1000 milliseconds
            data.date = new Date(
              data.date.getTime() + new Date().getTimezoneOffset() * 60 * 1000
            );
          }

          return data;
        },
      },
    },
  });

  return {
    dir: {
      includes: "../templates/includes",
      layouts: "../templates/layouts",

      input: "src",
      output: "public",
    },
    pathPrefix: "site",
    templateFormats: ["md", "njk", "html"],
  };
};
