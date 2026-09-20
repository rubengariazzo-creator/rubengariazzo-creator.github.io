import { createRoot } from "react-dom/client";
import { createElement } from "react";

const ISLANDS = {
  "glass-hero": () => import("./islands/GlassHero.jsx"),
  "stl-viewer": () => import("./islands/StlViewer.jsx"),
};

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const narrowViewport = window.matchMedia("(max-width: 48rem)").matches;

document.querySelectorAll("[data-react-island]").forEach(async (el) => {
  const name = el.dataset.reactIsland;
  // The hero is decorative-only under reduced motion / narrow viewports -- skip the
  // import entirely so those visitors never download the R3F/three chunk at all.
  if (name === "glass-hero" && (reducedMotion || narrowViewport)) return;
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
