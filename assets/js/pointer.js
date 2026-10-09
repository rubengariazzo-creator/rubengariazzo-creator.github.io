// Shared window-level pointer-position tracker: one rAF-throttled pointermove
// listener dispatching a "pointer:move" custom event for gradient-bg.js.
// Skipped entirely under prefers-reduced-motion or on coarse (touch-only)
// pointers, since the consumer does not need it there.
(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (window.matchMedia("(pointer: coarse)").matches) return;

  let latest = { x: 0, y: 0 };
  let pending = false;

  window.addEventListener(
    "pointermove",
    (event) => {
      latest = { x: event.clientX, y: event.clientY };
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => {
        pending = false;
        window.dispatchEvent(new CustomEvent("pointer:move", { detail: latest }));
      });
    },
    { passive: true }
  );
})();
