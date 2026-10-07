import Lenis from "lenis";

// Smooth wheel scrolling for the scrubbed hero video (data-scroll-video) only.
// Lenis exists while that hero is on screen and is destroyed as soon as the
// visitor scrolls past it, so the rest of the page keeps plain native scrolling
// (and a trackpad's own momentum) with nothing fighting it. Skipped for touch
// devices (already smooth) and reduced-motion visitors.
const stage = document.querySelector("[data-scroll-video]");
const smoothOk =
  stage &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (smoothOk) {
  let lenis = null;
  let frame = 0;

  const raf = (time) => {
    lenis.raf(time);
    frame = requestAnimationFrame(raf);
  };

  const start = () => {
    if (lenis) return;
    lenis = new Lenis({ lerp: 0.09 });
    frame = requestAnimationFrame(raf);
  };

  const stop = () => {
    if (!lenis) return;
    cancelAnimationFrame(frame);
    lenis.destroy();
    lenis = null;
  };

  new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop())).observe(stage);

  // The "scroll down" arrow goes through Lenis while it is active.
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target || !lenis) return;
      e.preventDefault();
      lenis.scrollTo(target);
    });
  });
}
