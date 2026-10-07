(() => {
  // Videos are a local thumbnail until clicked: nothing is requested from
  // YouTube before the visitor chooses to play one.
  document.querySelectorAll("[data-youtube]").forEach((button) => {
    button.addEventListener("click", () => {
      const frame = document.createElement("iframe");
      frame.src = "https://www.youtube-nocookie.com/embed/" + button.dataset.youtube + "?autoplay=1&rel=0";
      frame.className = "video-frame";
      frame.title = button.dataset.title;
      frame.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
      frame.referrerPolicy = "strict-origin-when-cross-origin";
      button.replaceWith(frame);
      frame.focus();
    });
  });
})();
