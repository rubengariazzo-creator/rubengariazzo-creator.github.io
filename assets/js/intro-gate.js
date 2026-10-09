// Runs in <head>, before first paint. If this is the first page of the session
// (and the visitor has not asked for reduced motion), mark <html> so the CSS
// can keep the page hidden until the intro overlay (page-entrance.js) is up,
// instead of flashing the content for a moment and then covering it.
(function () {
  try {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (sessionStorage.getItem("introShown")) return;
    document.documentElement.classList.add("intro-pending");
  } catch (err) {
    // Storage blocked: no intro, nothing to hide.
  }
})();
