(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const cards = document.querySelectorAll(".project-cards li");
  if (!cards.length) return;

  const maxTilt = 9;
  const stiffness = 0.18;
  const damping = 0.62;
  const epsilon = 0.02;

  cards.forEach((card) => {
    card.style.transformStyle = "preserve-3d";

    let rx = 0, ry = 0, ty = 0;
    let vrx = 0, vry = 0, vty = 0;
    let targetRx = 0, targetRy = 0, targetTy = 0;
    let hovering = false;
    let running = false;
    let rect = card.getBoundingClientRect();

    const render = () => {
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(${ty}px)`;
      card.style.setProperty("--shadow-x", `${(-ry * 2.2).toFixed(2)}px`);
      card.style.setProperty("--shadow-y", `${(10 - rx * 2.2).toFixed(2)}px`);
    };

    const tick = () => {
      const ax = -stiffness * (rx - targetRx) - damping * vrx;
      const ay = -stiffness * (ry - targetRy) - damping * vry;
      const az = -stiffness * (ty - targetTy) - damping * vty;
      vrx += ax; vry += ay; vty += az;
      rx += vrx; ry += vry; ty += vty;
      render();

      const atRest =
        Math.abs(vrx) < epsilon && Math.abs(vry) < epsilon && Math.abs(vty) < epsilon &&
        Math.abs(rx - targetRx) < epsilon && Math.abs(ry - targetRy) < epsilon && Math.abs(ty - targetTy) < epsilon;

      if (atRest && !hovering) {
        rx = ry = ty = 0;
        vrx = vry = vty = 0;
        card.style.transform = "";
        card.style.willChange = "";
        running = false;
        return;
      }
      requestAnimationFrame(tick);
    };

    const ensureRunning = () => {
      if (!running) {
        running = true;
        card.style.willChange = "transform";
        requestAnimationFrame(tick);
      }
    };

    card.addEventListener("pointerenter", (e) => {
      hovering = true;
      rect = card.getBoundingClientRect();
      ensureRunning();
    });

    card.addEventListener("pointermove", (e) => {
      if (!rect.width || !rect.height) return;
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      targetRx = (0.5 - py) * maxTilt * 2;
      targetRy = (px - 0.5) * maxTilt * 2;
      targetTy = -6;

      card.style.setProperty("--glow-x", `${px * 100}%`);
      card.style.setProperty("--glow-y", `${py * 100}%`);
      ensureRunning();
    });

    card.addEventListener("pointerleave", () => {
      hovering = false;
      targetRx = 0; targetRy = 0; targetTy = 0;
      ensureRunning();
    });
  });
})();
