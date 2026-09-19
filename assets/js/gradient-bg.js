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

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let pending = null;
    window.addEventListener(
      "pointermove",
      (e) => {
        if (pending) return;
        pending = requestAnimationFrame(() => {
          const fx = e.clientX / window.innerWidth;
          const fy = e.clientY / window.innerHeight;
          try {
            sessionStorage.setItem("mousePos", `${fx},${fy}`);
          } catch (err) {}

          const rect = container.getBoundingClientRect();
          if (rect.width && rect.height) {
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            container.style.setProperty("--mx", `${x}%`);
            container.style.setProperty("--my", `${y}%`);
          }
          pending = null;
        });
      },
      { passive: true }
    );
  }
})();
