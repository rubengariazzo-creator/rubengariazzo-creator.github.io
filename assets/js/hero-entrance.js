// Staggered entrance choreography for the homepage hero (H1 characters, then the
// CTA and bio copy). Progressive enhancement: elements are normal, fully visible
// DOM content by default; this script only hides them immediately before animating
// them in, so a failure anywhere (animejs not loading, an exception) never leaves
// content stuck invisible.
const ANIME_CDN = "https://cdn.jsdelivr.net/npm/animejs@4.5.0/dist/bundles/anime.esm.min.js";

async function init() {
  const stage = document.querySelector(".hero-liquid-stage");
  if (!stage) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const heading = stage.querySelector("h1");
  const article = stage.closest(".page");
  const ctaTop = article?.querySelector(":scope > p:first-of-type [data-glass-cta]");
  const bioParagraphs = article
    ? Array.from(article.querySelectorAll(":scope > p")).filter((p) => !p.querySelector("[data-glass-cta]")).slice(0, 2)
    : [];
  if (!heading) return;

  let anime;
  try {
    anime = await import(ANIME_CDN);
  } catch (err) {
    return;
  }

  try {
    const { animate, stagger, splitText } = anime;
    const { chars } = splitText(heading, { chars: true });

    animate(chars, {
      opacity: [0, 1],
      y: [28, 0],
      filter: ["blur(8px)", "blur(0px)"],
      duration: 700,
      delay: stagger(16),
      ease: "outExpo",
    });

    if (ctaTop) {
      animate(ctaTop, {
        opacity: [0, 1],
        y: [16, 0],
        duration: 600,
        delay: 380,
        ease: "outExpo",
      });
    }

    bioParagraphs.forEach((p, i) => {
      animate(p, {
        opacity: [0, 1],
        y: [16, 0],
        duration: 600,
        delay: 460 + i * 90,
        ease: "outExpo",
      });
    });
  } catch (err) {
    // Leave everything at its normal, fully visible state.
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
