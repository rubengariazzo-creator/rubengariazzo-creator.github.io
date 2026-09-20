(() => {
  const container = document.querySelector("[data-gradient]");
  if (!container) return;

  const palette = (container.dataset.gradient || "").split(",").filter(Boolean);
  if (palette[0]) container.style.setProperty("--grad-a", palette[0]);
  if (palette[1]) container.style.setProperty("--grad-b", palette[1]);
  if (palette[2]) container.style.setProperty("--grad-c", palette[2]);

  try {
    const stored = sessionStorage.getItem("mousePos");
    if (stored) {
      const [fx, fy] = stored.split(",").map(Number);
      if (!Number.isNaN(fx) && !Number.isNaN(fy)) {
        container.style.setProperty("--mx", `${fx * 100}%`);
        container.style.setProperty("--my", `${fy * 100}%`);
      }
    }
  } catch (err) {}

  // Position comes from the shared pointer.js tracker (assets/js/pointer.js)
  // instead of this file running its own pointermove+rAF listener -- pointer.js
  // already skips dispatching under reduced-motion/coarse pointers, so no event
  // ever arrives here in those cases and this needs no separate check.
  window.addEventListener("pointer:move", (event) => {
    const { x, y } = event.detail;
    const fx = x / window.innerWidth;
    const fy = y / window.innerHeight;
    try {
      sessionStorage.setItem("mousePos", `${fx},${fy}`);
    } catch (err) {}

    const rect = container.getBoundingClientRect();
    if (rect.width && rect.height) {
      const px = ((x - rect.left) / rect.width) * 100;
      const py = ((y - rect.top) / rect.height) * 100;
      container.style.setProperty("--mx", `${px}%`);
      container.style.setProperty("--my", `${py}%`);
    }
  });
})();
