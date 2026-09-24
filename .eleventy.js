const Image = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
  eleventyConfig.addShortcode("currentYear", () => `${new Date().getFullYear()}`);
  // Nunjucks has no built-in `dump`/`tojson` filter (that's a Jinja2-ism) --
  // used for embedding array/object data (e.g. site.knowsAbout, site.sameAs)
  // directly into inline JSON-LD in seo-head.njk.
  eleventyConfig.addFilter("json", (value) => JSON.stringify(value));

  // Nunjucks' built-in selectattr only reads a single-level property name,
  // not a dotted path -- `selectattr("data.lang", "equalto", "fr")` silently
  // filters everything out instead of erroring, since it looks for a
  // literal "data.lang" key. Used to pre-filter collections.projects by
  // language before looping, so the card's own loop.index counts only the
  // rendered items instead of every item in the mixed-language collection.
  eleventyConfig.addFilter("byLang", (projects, lang) => projects.filter((p) => p.data.lang === lang));

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
  // jobTitle/bio/knowsAbout/sameAs feed the sitewide JSON-LD Person node
  // (seo-head.njk) and llms.txt: one source of truth for facts about Ruben.
  // Only verified, already-published facts. The ORCID iD is the one attached
  // to every one of his Zenodo records (checked via the Zenodo API): listing
  // it in sameAs is what lets search engines and AI assistants tie the
  // research DOIs to this person rather than to a homonym.
  eleventyConfig.addGlobalData("site", {
    url: "https://rubengariazzo-creator.github.io",
    name: "Ruben Gariazzo",
    jobTitle: "Engineering Student",
    school: { name: "EPF - École d'ingénieurs", url: "https://www.epf.fr" },
    orcid: "https://orcid.org/0009-0005-9359-215X",
    bio: "an engineering student at EPF (France) working on aerospace and mechanical design, with independent physics and cryptanalysis research published on Zenodo",
    bioFr: "élève ingénieur à l'EPF (France), en conception aérospatiale et mécanique, auteur de recherches indépendantes en physique et en cryptanalyse publiées sur Zenodo",
    knowsAbout: [
      "Aerospace Engineering",
      "Mechanical Engineering",
      "CAD Design",
      "Metrology",
      "Cryptanalysis",
      "Physics Research",
      "Python Programming",
    ],
    sameAs: [
      "https://www.linkedin.com/in/ruben-gariazzo",
      "https://github.com/rubengariazzo-creator",
      "https://orcid.org/0009-0005-9359-215X",
    ],
  });

  // One JSON-LD @graph per page. Every node (site, profile page, breadcrumb,
  // each research DOI) points back at the same Person @id, so search engines
  // and AI assistants merge them into one entity instead of several loose
  // "Ruben Gariazzo"s -- the homonym problem is exactly what this solves.
  eleventyConfig.addFilter("structuredData", (page, site) => {
    const personId = `${site.url}/#person`;
    const websiteId = `${site.url}/#website`;
    const fr = page.lang === "fr";
    const pageUrl = site.url + page.url;
    const graph = [
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        givenName: "Ruben",
        familyName: "Gariazzo",
        url: `${site.url}/`,
        jobTitle: site.jobTitle,
        description: fr ? site.bioFr : site.bio,
        affiliation: { "@type": "CollegeOrUniversity", name: site.school.name, url: site.school.url },
        memberOf: { "@type": "Organization", name: "EPF Astronomie" },
        award: "Grand Prix Poésie RATP 2025 (finalist)",
        knowsAbout: site.knowsAbout,
        sameAs: site.sameAs,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: `${site.url}/`,
        name: site.name,
        inLanguage: ["fr", "en"],
        author: { "@id": personId },
      },
    ];
    if (page.profile) {
      graph.push({
        "@type": "ProfilePage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: page.title,
        inLanguage: page.lang,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      });
    }
    const home = fr ? "/" : "/en/";
    const projects = fr ? "/projets/" : "/en/projects/";
    if (page.url.startsWith(projects) && page.url !== projects) {
      graph.push({
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: fr ? "Accueil" : "Home", item: site.url + home },
          { "@type": "ListItem", position: 2, name: fr ? "Projets" : "Projects", item: site.url + projects },
          { "@type": "ListItem", position: 3, name: page.title, item: pageUrl },
        ],
      });
    }
    for (const pub of page.publications || []) {
      graph.push({
        "@type": pub.type,
        "@id": `https://doi.org/${pub.doi}`,
        name: pub.title,
        author: { "@id": personId },
        datePublished: pub.date,
        inLanguage: pub.lang,
        url: `https://doi.org/${pub.doi}`,
        sameAs: `https://zenodo.org/records/${pub.doi.split("zenodo.")[1]}`,
        identifier: { "@type": "PropertyValue", propertyID: "DOI", value: pub.doi },
        publisher: { "@type": "Organization", name: "Zenodo", url: "https://zenodo.org" },
        subjectOf: { "@id": `${pageUrl}#webpage`, "@type": "WebPage", url: pageUrl },
      });
    }
    // "<" escaped so no string value can ever close the <script> early.
    return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
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

  // Explicit order: (set once per project, same number for both language
  // versions) instead of the previous heuristic -- sorting by "has a
  // logos: array" happened to work while only a few projects had one, but
  // broke the moment more projects legitimately gained a logo (RATP,
  // Zenodo, Harvard): they all jumped to the front as a side effect of
  // something unrelated to the intended display order.
  eleventyConfig.addCollection("projects", (api) =>
    api
      .getFilteredByGlob("content/**/proj*/*.md")
      .filter((p) => !p.inputPath.endsWith("index.md"))
      .sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999) || a.data.title.localeCompare(b.data.title))
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
