(() => {
  const triggers = document.querySelectorAll("[data-lightbox]");
  if (!triggers.length) return;

  const closeLabel = document.documentElement.lang === "en" ? "Close" : "Fermer";
  const overlay = document.createElement("div");
  overlay.className = "lightbox-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "lightbox-close";
  closeBtn.setAttribute("aria-label", closeLabel);
  closeBtn.textContent = "×";

  const img = document.createElement("img");
  img.className = "lightbox-img";
  img.alt = "";

  overlay.appendChild(closeBtn);
  overlay.appendChild(img);
  document.body.appendChild(overlay);

  const header = document.querySelector(".site-header");
  let lastTrigger = null;

  function open(href, alt, trigger) {
    if (!href) return;
    lastTrigger = trigger;
    img.src = href;
    img.alt = alt || "";
    overlay.setAttribute("aria-label", alt || "Image");
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
    // backdrop-filter on the sticky header can otherwise paint above a fixed overlay
    // in some browsers even though it's behind it in stacking order.
    if (header) header.style.visibility = "hidden";
    closeBtn.focus();
  }

  function close() {
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
    img.removeAttribute("src");
    if (header) header.style.visibility = "";
    if (lastTrigger) lastTrigger.focus();
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      open(trigger.getAttribute("href"), trigger.dataset.lightboxAlt, trigger);
    });
  });

  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
  window.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    // Only one focusable element inside the dialog: keep focus trapped on it.
    if (e.key === "Tab") {
      e.preventDefault();
      closeBtn.focus();
    }
  });
})();
