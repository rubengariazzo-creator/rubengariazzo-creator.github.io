import { createRoot } from "react-dom/client";
import { createElement } from "react";

const ISLANDS = {
  "glass-hero": () => import("./islands/GlassHero.jsx"),
  "stl-viewer": () => import("./islands/StlViewer.jsx"),
};

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.querySelectorAll("[data-react-island]").forEach(async (el) => {
  const name = el.dataset.reactIsland;
  // The hero is decorative-only under reduced motion -- skip the import
  // entirely so those visitors never download the R3F/three chunk at all.
  // Mobile used to be skipped here too (bundle-size caution); Ruben asked
  // for the logo to be visible on phone as well, so only reduced-motion
  // opts out now -- the CSS side (style.css .hero-liquid-mount) is what
  // actually resizes/repositions it for narrow viewports.
  if (name === "glass-hero" && reducedMotion) return;
  const load = ISLANDS[name];
  if (!load) return;
  try {
    const { default: Island } = await load();
    const onReady = () => el.classList.add("is-ready");
    createRoot(el).render(createElement(Island, { ...el.dataset, onReady }));
  } catch (err) {
    // Progressive enhancement: a failed mount leaves the (empty) div in place,
    // never a broken page.
  }
});
