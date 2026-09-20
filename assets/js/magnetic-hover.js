// Magnetic hover on the primary glass-pill CTAs: the button eases toward the
// pointer within a small range, snapping back on leave. Skipped under reduced
// motion, and on touch/coarse pointers where there is no hover to react to.
function init() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  document.querySelectorAll("[data-glass-cta]").forEach((el) => {
    el.addEventListener("pointermove", (event) => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      // -2px baked in to match (and replace, while this listener is live) the
      // CSS :hover lift -- this inline transform otherwise wins over it outright.
      el.style.transform = `translate3d(${x * 0.25}px, ${y * 0.35 - 2}px, 0)`;
    });
    el.addEventListener("pointerleave", () => {
      el.style.transform = "";
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
