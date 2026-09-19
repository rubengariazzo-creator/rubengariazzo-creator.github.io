const Image = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
  eleventyConfig.addShortcode("currentYear", () => `${new Date().getFullYear()}`);

  eleventyConfig.addNunjucksAsyncShortcode("image", async function (src, alt) {
    if (alt === undefined) throw new Error(`Missing alt text for image: ${src}`);
    const metadata = await Image(src, {
      widths: [400, 800, 1200],
      formats: ["webp", "jpeg"],
      outputDir: "dist/assets/img/optimized/",
      urlPath: "/assets/img/optimized/",
    });
    return Image.generateHTML(metadata, { alt, loading: "lazy", decoding: "async", sizes: "(min-width: 40rem) 50vw, 100vw" });
  });
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy({ "content/robots.txt": "robots.txt" });

  eleventyConfig.addGlobalData("site", {
    url: "https://ruben-gariazzo.example",
    name: "Ruben Gariazzo",
  });

  eleventyConfig.addNunjucksAsyncShortcode("docPreview", async function (href, lang, label) {
    const title = label || href;
    return `<iframe src="${href}" class="doc-preview-pdf" title="${title}" loading="lazy"></iframe>`;
  });

  eleventyConfig.addCollection("byTranslationKey", (api) => {
    const map = {};
    for (const p of api.getAll().filter((p) => p.data.translationKey)) {
      const key = p.data.translationKey;
      if (!map[key]) map[key] = {};
      map[key][p.data.lang] = p.url;
    }
    return map;
  });

  eleventyConfig.addCollection("projects", (api) =>
    api
      .getFilteredByGlob("content/**/proj*/*.md")
      .filter((p) => !p.inputPath.endsWith("index.md"))
      .sort((a, b) => {
        const weight = (p) => {
          if (!(p.data.logos && p.data.logos.length)) return 2;
          if (p.data.translationKey === "arrosoir-telescopique") return 1;
          return 0;
        };
        return weight(a) - weight(b) || a.data.title.localeCompare(b.data.title);
      })
  );

  return {
    dir: {
      input: "content",
      includes: "../_includes",
      output: "dist",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
