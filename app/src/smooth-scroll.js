import Lenis from "lenis";

// Smooth wheel scrolling for the pages whose hero video is scrubbed by scroll
// (data-scroll-video). Lenis keeps native scrolling and just eases it, so the
// scroll events scroll-video.js listens to still fire. Skipped for touch
// devices (already smooth) and reduced-motion visitors.
const smoothOk =
  document.querySelector("[data-scroll-video]") &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (smoothOk) {
  const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  // The "scroll down" arrow scrolls through Lenis too, not the browser's own
  // smooth scroll (which would fight it).
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target);
    });
  });
}
