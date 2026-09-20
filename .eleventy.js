const Image = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
  eleventyConfig.addShortcode("currentYear", () => `${new Date().getFullYear()}`);
  // Nunjucks has no built-in `dump`/`tojson` filter (that's a Jinja2-ism) --
  // used for embedding array/object data (e.g. site.knowsAbout, site.sameAs)
  // directly into inline JSON-LD in seo-head.njk.
  eleventyConfig.addFilter("json", (value) => JSON.stringify(value));

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

  // url drives the canonical tag, hreflang alternates, Open Graph/Twitter
  // image URLs, JSON-LD, sitemap.xml, and llms.txt on every page -- it was
  // left at the reserved-for-documentation ".example" placeholder (RFC 2606,
  // guaranteed to never resolve) from the very first commit, so all of those
  // were silently broken in production (verified: llms.txt and sitemap.xml
  // were emitting links to a domain that can't exist). Update this the day a
  // custom domain replaces GitHub Pages -- until then this is the one real
  // domain the deployed site is actually reachable at.
  // jobTitle/alumniOf/bio/knowsAbout/sameAs feed the sitewide JSON-LD Person
  // block (seo-head.njk) -- kept here as one source of truth rather than
  // hardcoded in the template, since these are facts about Ruben, not
  // per-page content. Only verified, already-published facts: EPF affiliation
  // and category list are stated on the site itself (experience.md,
  // projects/index.md); LinkedIn/GitHub are the two profile links already
  // used elsewhere on the site. Add a Zenodo/ORCID profile URL here too once
  // one exists -- the homepage bio already mentions Zenodo-published research
  // but nothing on the site actually links to it yet.
  eleventyConfig.addGlobalData("site", {
    url: "https://rubengariazzo-creator.github.io",
    name: "Ruben Gariazzo",
    jobTitle: "Engineering Student",
    alumniOf: "EPF - École d'ingénieurs",
    bio: "an engineering student at EPF (France) working on aerospace and mechanical design, with independent physics and cryptanalysis research",
    knowsAbout: [
      "Aerospace Engineering",
      "Mechanical Engineering",
      "CAD Design",
      "Cryptanalysis",
      "Physics Research",
      "Python Programming",
    ],
    sameAs: ["https://www.linkedin.com/in/ruben-gariazzo", "https://github.com/rubengariazzo-creator"],
  });

  function escapeAttr(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  eleventyConfig.addNunjucksAsyncShortcode("docPreview", async function (href, lang, label) {
    const title = label || href;
    return `<iframe src="${escapeAttr(href)}" class="doc-preview-pdf" title="${escapeAttr(title)}" loading="lazy"></iframe>`;
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

  // Prev/next + "N/total" position within a language's project list. A plain
  // JS filter instead of computing this in the Nunjucks template: Nunjucks'
  // `{% set %}` doesn't support a dotted assignment target (e.g. `nav.index = x`),
  // a plain `{% set %}` inside a `{% for %}` doesn't escape the loop's scope
  // either, and this project's `selectattr` doesn't resolve a dotted attribute
  // path ("data.lang") -- so the language filtering happens here too, in plain
  // JS, rather than fighting three separate Nunjucks limitations in the template.
  eleventyConfig.addFilter("projectNav", (allProjects, lang, currentUrl) => {
    const projects = allProjects.filter((p) => p.data.lang === lang);
    const index = projects.findIndex((p) => p.url === currentUrl);
    if (index === -1) return { index: 0, total: 0, prev: null, next: null };
    return {
      index: index + 1,
      total: projects.length,
      prev: index > 0 ? projects[index - 1] : null,
      next: index < projects.length - 1 ? projects[index + 1] : null,
    };
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
