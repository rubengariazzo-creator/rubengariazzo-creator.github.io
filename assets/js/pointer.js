// Shared window-level pointer-position tracker: one rAF-throttled pointermove
// listener dispatching a "pointer:move" custom event, instead of gradient-bg.js
// and cursor.js each running their own independent listener for the same raw
// position. Skipped entirely under prefers-reduced-motion or on coarse
// (touch-only) pointers, since neither consumer needs it there.
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
