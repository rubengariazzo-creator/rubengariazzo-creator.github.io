// In-page PDF reader for touch screens. Phone browsers show an embedded PDF as a
// single, unscrollable, unzoomable first page, so on phones and tablets the
// "Documents" blocks use this reader instead of the <iframe> (desktop keeps the
// browser's own viewer). Pages are drawn to canvases with pdf.js (loaded only
// the first time a document is opened). One finger scrolls in both directions,
// two fingers pinch to zoom, double tap toggles zoom, and the buttons do the
// same for anyone who prefers them.
const TOUCH = "(max-width: 48rem), (pointer: coarse)";
const UI = {
  fr: { zoomIn: "Zoom avant", zoomOut: "Zoom arrière", fit: "Pleine largeur", page: "Page", of: "sur", loading: "Chargement du document", error: "Impossible d'afficher ce document ici. Utilisez les liens ci-dessous." },
  zh: { zoomIn: "放大", zoomOut: "缩小", fit: "适合宽度", page: "第", of: "页，共", end: "页", loading: "正在加载文档", error: "无法在此显示该文档，请使用下方链接。" },
  en: { zoomIn: "Zoom in", zoomOut: "Zoom out", fit: "Fit width", page: "Page", of: "of", loading: "Loading document", error: "This document cannot be shown here. Use the links below." },
};
const lang = (document.documentElement.lang.startsWith("zh") ? "zh" : document.documentElement.lang === "fr" ? "fr" : "en");
const t = UI[lang];
const MAX_ZOOM = 5;
const MAX_CANVAS_PIXELS = 12e6;

let pdfjsPromise = null;
function loadPdfjs() {
  if (!pdfjsPromise) {
    pdfjsPromise = import("pdfjs-dist/legacy/build/pdf.min.mjs").then((lib) => {
      // Bundled by Vite as a plain .js worker file, so any static host serves it
      // with a JavaScript content type (a raw .mjs file is not guaranteed to be).
      lib.GlobalWorkerOptions.workerPort = new Worker(
        new URL("pdfjs-dist/legacy/build/pdf.worker.min.mjs", import.meta.url),
        { type: "module" },
      );
      return lib;
    });
  }
  return pdfjsPromise;
}

function el(tag, cls, attrs = {}) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
  return e;
}

async function mount(root) {
  const src = root.dataset.pdfSrc;
  const title = root.dataset.title || "";
  root.textContent = "";
  const bar = el("div", "pdf-bar");
  const status = el("span", "pdf-status", { "aria-live": "polite" });
  const btn = (label, text) => {
    const b = el("button", "pdf-btn", { type: "button", "aria-label": label, title: label });
    b.textContent = text;
    return b;
  };
  const out = btn(t.zoomOut, "−");
  const fitBtn = btn(t.fit, "↔");
  const inn = btn(t.zoomIn, "+");
  bar.append(status, out, fitBtn, inn);
  const scroller = el("div", "pdf-scroller", { role: "document", "aria-label": title, tabindex: "0" });
  const stack = el("div", "pdf-stack");
  scroller.append(stack);
  root.append(bar, scroller);
  status.textContent = t.loading + "...";

  let pdf;
  try {
    const lib = await loadPdfjs();
    pdf = await lib.getDocument({
      url: src,
      isEvalSupported: false,
      standardFontDataUrl: "/assets/pdfjs/standard_fonts/",
      wasmUrl: "/assets/pdfjs/wasm/",
      iccUrl: "/assets/pdfjs/iccs/",
    }).promise;
  } catch (err) {
    root.textContent = "";
    const p = el("p", "pdf-error");
    p.textContent = t.error;
    root.append(p);
    return;
  }

  const n = pdf.numPages;
  const pages = [];
  for (let i = 1; i <= n; i++) {
    const page = await pdf.getPage(i);
    const base = page.getViewport({ scale: 1 });
    const holder = el("div", "pdf-page");
    const canvas = el("canvas", "", { role: "img", "aria-label": `${t.page} ${i} ${t.of} ${n}${t.end || ""}` });
    holder.append(canvas);
    stack.append(holder);
    pages.push({ page, base, holder, canvas, renderedWidth: 0, task: null });
  }

  let fitWidth = 1;
  let zoom = 1; // multiple of fitWidth
  const cssWidth = () => fitWidth * zoom;

  async function render(p) {
    const width = cssWidth();
    if (Math.abs(p.renderedWidth - width) < 1) return;
    p.renderedWidth = width;
    const scale = width / p.base.width;
    const height = p.base.height * scale;
    p.holder.style.width = width + "px";
    p.holder.style.height = height + "px";
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    let ratio = dpr;
    if (width * height * ratio * ratio > MAX_CANVAS_PIXELS) ratio = Math.sqrt(MAX_CANVAS_PIXELS / (width * height));
    const viewport = p.page.getViewport({ scale: scale * ratio });
    const off = document.createElement("canvas");
    off.width = Math.floor(viewport.width);
    off.height = Math.floor(viewport.height);
    if (p.task) p.task.cancel();
    p.task = p.page.render({ canvasContext: off.getContext("2d"), viewport });
    try {
      await p.task.promise;
    } catch (err) {
      return; // cancelled by a newer render
    }
    p.canvas.width = off.width;
    p.canvas.height = off.height;
    p.canvas.style.width = width + "px";
    p.canvas.style.height = height + "px";
    p.canvas.getContext("2d").drawImage(off, 0, 0);
  }

  // Draw only the pages near the viewport; the rest stay empty placeholders.
  const visible = new Set();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const p = pages.find((x) => x.holder === e.target);
      if (e.isIntersecting) { visible.add(p); render(p); } else visible.delete(p);
    });
  }, { root: scroller, rootMargin: "100% 0px" });

  function layout() {
    const width = cssWidth();
    pages.forEach((p) => {
      p.holder.style.width = width + "px";
      p.holder.style.height = p.base.height * (width / p.base.width) + "px";
    });
    visible.forEach((p) => render(p));
  }

  function setZoom(next, cx = scroller.clientWidth / 2, cy = scroller.clientHeight / 2) {
    next = Math.min(MAX_ZOOM, Math.max(1, next));
    if (next === zoom) return;
    const ratio = next / zoom;
    const fx = scroller.scrollLeft + cx;
    const fy = scroller.scrollTop + cy;
    zoom = next;
    layout();
    scroller.scrollLeft = fx * ratio - cx;
    scroller.scrollTop = fy * ratio - cy;
  }

  function fit() {
    fitWidth = Math.max(160, scroller.clientWidth);
    zoom = 1;
    layout();
  }

  fit();
  pages.forEach((p) => io.observe(p.holder));
  const updateStatus = () => {
    const mid = scroller.scrollTop + scroller.clientHeight / 2;
    let cur = 1;
    pages.forEach((p, i) => { if (p.holder.offsetTop <= mid) cur = i + 1; });
    status.textContent = `${t.page} ${cur} ${t.of} ${n}${t.end || ""}`;
  };
  updateStatus();
  scroller.addEventListener("scroll", updateStatus, { passive: true });
  new ResizeObserver(() => { if (zoom === 1) fit(); }).observe(scroller);

  out.addEventListener("click", () => setZoom(zoom / 1.4));
  inn.addEventListener("click", () => setZoom(zoom * 1.4));
  fitBtn.addEventListener("click", () => { zoom = 1; layout(); scroller.scrollLeft = 0; });

  // Pinch (two pointers) scales the whole stack with a CSS transform while the
  // fingers move, then commits the new zoom and redraws sharply on release.
  const pointers = new Map();
  let pinch = null;
  let gesture = false; // true from the second finger down until all fingers are up
  scroller.addEventListener("pointerdown", (e) => {
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size >= 2) gesture = true;
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      const rect = scroller.getBoundingClientRect();
      pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), ratio: 1, cx: (a.x + b.x) / 2 - rect.left, cy: (a.y + b.y) / 2 - rect.top };
    }
  });
  scroller.addEventListener("pointermove", (e) => {
    if (!pointers.has(e.pointerId)) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pinch && pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      let ratio = Math.hypot(a.x - b.x, a.y - b.y) / pinch.d;
      ratio = Math.min(MAX_ZOOM / zoom, Math.max(1 / zoom, ratio));
      pinch.ratio = ratio;
      stack.style.transformOrigin = `${scroller.scrollLeft + pinch.cx}px ${scroller.scrollTop + pinch.cy}px`;
      stack.style.transform = `scale(${ratio})`;
    }
  });
  const end = (e) => {
    pointers.delete(e.pointerId);
    if (pinch && pointers.size < 2) {
      const { ratio, cx, cy } = pinch;
      pinch = null;
      stack.style.transform = "";
      stack.style.transformOrigin = "";
      setZoom(zoom * ratio, cx, cy);
    }
  };
  scroller.addEventListener("pointerup", end);
  scroller.addEventListener("pointercancel", end);

  // Double tap: fit <-> 2.5x at the tapped point.
  let lastTap = 0;
  scroller.addEventListener("pointerup", (e) => {
    // The two lifts that end a pinch must not count as a double tap.
    if (gesture) {
      if (pointers.size === 0) gesture = false;
      return;
    }
    if (e.pointerType !== "touch") return;
    const now = Date.now();
    if (now - lastTap < 300) {
      const rect = scroller.getBoundingClientRect();
      setZoom(zoom > 1.2 ? 1 : 2.5, e.clientX - rect.left, e.clientY - rect.top);
      lastTap = 0;
    } else lastTap = now;
  });
}

function init() {
  if (!window.matchMedia(TOUCH).matches) return;
  document.querySelectorAll(".doc-details").forEach((details) => {
    const root = details.querySelector(".doc-pdf-viewer");
    if (!root) return;
    const open = () => {
      if (details.open && !root.dataset.mounted) {
        root.dataset.mounted = "1";
        mount(root);
      }
    };
    details.addEventListener("toggle", open);
    open();
  });
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();
