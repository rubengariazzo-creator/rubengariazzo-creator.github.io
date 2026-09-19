(() => {
  const header = document.querySelector(".site-header");
  if (!header) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let lastY = window.scrollY;
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;
    if (y < 80 || y < lastY) {
      header.classList.remove("is-hidden");
    } else if (y > lastY) {
      header.classList.add("is-hidden");
    }
    lastY = y;
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    },
    { passive: true }
  );

  // A keyboard user tabbing into a hidden header would otherwise focus an
  // invisible link; force it back into view whenever it receives focus.
  header.addEventListener("focusin", () => header.classList.remove("is-hidden"));
})();
