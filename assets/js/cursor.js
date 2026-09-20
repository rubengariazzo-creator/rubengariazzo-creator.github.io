// Sitewide custom cursor: a small crosshair of four corner brackets, spinning
// gently at rest, that stops and snaps to frame whatever's hovered (links,
// buttons, CTAs, project cards). Fine-pointer/hover-capable devices only --
// touch devices keep their native behavior untouched, and the interactive CAD
// viewer's canvas keeps its own grab/grabbing cursor (a more useful affordance
// there than a generic crosshair) rather than being taken over by this.
//
// Position is set via `transform: translate()` only, never `left`/`top` -- an
// earlier version transitioned left/top on every pointer move, which meant the
// dot was constantly chasing a moving target through a 200ms ease (visible lag)
// on top of left/top not being a compositor-friendly property (visible jank).
// Free-following the pointer is instant (no transition); the eased transition
// (.is-hovering) is reserved for the one place easing actually helps: snapping
// to frame a newly-hovered target.
//
// The idle spin lives on an INNER .cursor-dot-spin wrapper, not on .cursor-dot
// itself: a CSS animation and inline JS both targeting `transform` on the same
// element conflict (the animation wins while running), which made the dot
// visibly jump toward the top-left corner and back every 6s instead of
// tracking the mouse. Two elements, two transforms, no conflict.
(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  const cursor = document.createElement("div");
  cursor.className = "cursor-dot";
  cursor.setAttribute("aria-hidden", "true");
  cursor.innerHTML = '<div class="cursor-dot-spin"><span></span><span></span><span></span><span></span></div>';
  document.body.appendChild(cursor);

  // A small dot that always tracks the *real* pointer position, independent
  // of the crosshair brackets above -- once those snap to frame a large
  // target (a whole project card, easily a few hundred px across), the
  // brackets alone no longer show where the actual mouse is inside that
  // frame. A separate element rather than a child of .cursor-dot: nesting it
  // would inherit the parent's snapped transform, so it would jump to the
  // target's center along with the brackets instead of staying on the real
  // cursor position.
  const centerDot = document.createElement("div");
  centerDot.className = "cursor-center-dot";
  centerDot.setAttribute("aria-hidden", "true");
  document.body.appendChild(centerDot);

  document.body.classList.add("has-custom-cursor");

  let hovering = false;
  let hoveredTarget = null;

  function clearHover() {
    hovering = false;
    hoveredTarget = null;
    cursor.classList.remove("is-hovering");
    cursor.style.width = "";
    cursor.style.height = "";
  }

  window.addEventListener("pointer:move", (event) => {
    const { x, y } = event.detail;
    cursor.classList.add("is-active");
    centerDot.classList.add("is-active");
    // Always the true pointer position, hovering or not -- this is the one
    // piece of the cursor that never snaps to a target.
    centerDot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    // Self-healing: an invader sprite removes itself from the DOM the instant
    // it's clicked (see page-entrance.js), and a removed element doesn't
    // reliably fire `pointerout` when the pointer never actually moves off of
    // it first (the click doesn't move the mouse) -- `hovering` was staying
    // true forever, freezing the cursor at the sprite's last position instead
    // of resuming free-following. Checking the target is still connected on
    // every move means the very next mousemove after any such disappearance
    // self-corrects, with no need for the vanishing element to announce it.
    if (hovering && hoveredTarget && !hoveredTarget.isConnected) {
      clearHover();
    }
    if (hovering) return;
    cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
  });

  const TARGET_SELECTOR = "a, button, [data-glass-cta], .project-cards li, .invader-sprite";

  document.addEventListener("pointerover", (event) => {
    const target = event.target.closest(TARGET_SELECTOR);
    if (!target || target.closest(".stl-viewer-mount")) return;
    const rect = target.getBoundingClientRect();
    hovering = true;
    hoveredTarget = target;
    cursor.classList.add("is-hovering");
    cursor.style.width = `${rect.width + 12}px`;
    cursor.style.height = `${rect.height + 12}px`;
    cursor.style.transform = `translate(${rect.left + rect.width / 2}px, ${rect.top + rect.height / 2}px) translate(-50%, -50%)`;
  });

  document.addEventListener("pointerout", (event) => {
    const target = event.target.closest(TARGET_SELECTOR);
    if (!target) return;
    clearHover();
  });
})();
