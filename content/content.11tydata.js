// Every page's date = its source file's last git commit, so sitemap.xml can
// publish a truthful <lastmod> (the deploy workflow checks out full history).
module.exports = {
  date: "git Last Modified",
};
