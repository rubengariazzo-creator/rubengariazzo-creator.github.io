module.exports = {
  lang: "fr",
  eleventyComputed: {
    permalink: (data) => {
      const stem = data.page.filePathStem.replace(/^\/fr/, "").replace(/\/index$/, "");
      if (stem === "/404") return "/404.html";
      return (stem || "") + "/index.html";
    },
  },
};
