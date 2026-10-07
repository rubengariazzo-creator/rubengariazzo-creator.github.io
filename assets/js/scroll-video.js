(function () {
  var stage = document.querySelector("[data-scroll-video]");
  if (!stage) return;
  var video = stage.querySelector("video");
  if (!video) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    video.setAttribute("controls", "");
    video.removeAttribute("muted");
    return;
  }

  video.muted = true;
  video.setAttribute("playsinline", "");

  var launched = false;
  // Only the last 10 seconds of the video are scrubbed (a shorter window means less video
  // time per pixel scrolled, so the scrub feels slower/smoother). The scrub covers all but
  // the final 2 seconds; the last 25% of scroll distance plays that short tail in real time,
  // continuing exactly where the scrub left off (no rewind/jump).
  var scrubEnd = 0.75;
  var scrubWindow = 10;
  var tailBuffer = 2;
  var scrubStart = null;
  var scrubRangeEnd = null;
  // The scroll position sets a target time; the video eases toward it each
  // frame (and only seeks once the previous seek is done), instead of seeking
  // on every scroll event, which stuttered on desktop.
  var targetTime = 0;
  var shownTime = 0;
  var easing = false;

  function ease() {
    if (launched) {
      easing = false;
      return;
    }
    var diff = targetTime - shownTime;
    if (Math.abs(diff) < 0.005) {
      shownTime = targetTime;
      if (!video.seeking) video.currentTime = shownTime;
      easing = false;
      return;
    }
    if (!video.seeking) {
      shownTime += diff * 0.2;
      video.currentTime = shownTime;
    }
    requestAnimationFrame(ease);
  }

  function easeTo(time) {
    targetTime = time;
    if (!easing) {
      easing = true;
      requestAnimationFrame(ease);
    }
  }

  function update() {
    var rect = stage.getBoundingClientRect();
    var scrollable = rect.height - window.innerHeight;
    if (scrollable <= 0 || !video.duration) return;
    if (scrubStart === null) {
      scrubStart = Math.max(video.duration - scrubWindow, 0);
      scrubRangeEnd = Math.max(video.duration - tailBuffer, scrubStart);
    }
    var progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);

    if (progress < scrubEnd) {
      if (launched) {
        video.pause();
        shownTime = video.currentTime;
      }
      launched = false;
      easeTo(scrubStart + (progress / scrubEnd) * (scrubRangeEnd - scrubStart));
    } else if (!launched) {
      launched = true;
      targetTime = shownTime = scrubRangeEnd;
      video.play().catch(function () {});
    }
  }

  var pendingUpdate = false;
  function requestUpdate() {
    if (pendingUpdate) return;
    pendingUpdate = true;
    requestAnimationFrame(function () {
      update();
      pendingUpdate = false;
    });
  }

  video.addEventListener("loadedmetadata", update);
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  update();

  var hint = stage.querySelector(".scroll-hint");
  if (hint) {
    hint.addEventListener("click", function (e) {
      var href = hint.getAttribute("href") || "";
      if (href.charAt(0) !== "#") return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
})();
