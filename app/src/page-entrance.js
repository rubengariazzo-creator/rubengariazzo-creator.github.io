// Sitewide entrance choreography: the nav, then the H1 (character-staggered on
// the homepage hero, a simple reveal everywhere else), then the page's own
// direct content blocks -- one authored GSAP timeline with real relative
// offsets, instead of the old setup where only the homepage had any real
// choreography (via anime.js) and every other page got a flat, per-element CSS
// fade-up with no coordination between elements.
//
// Progressive enhancement: gsap.from() only hides an element once it actually
// runs, so a blocked/failed script load leaves every element in its normal
// visible state -- never a page stuck hidden. Skipped entirely under
// prefers-reduced-motion.
//
// The .project-meta-tag (category + "N/9") is deliberately NOT re-animated
// here -- it already has its own CSS `telemetry-snap-in` entrance (using
// --ease-snap). Animating it again here would reintroduce the exact
// double-animation bug this same page-entrance rework fixed on the homepage.
//
// .doc-details is excluded from the block filter below for the identical
// reason: reveal-on-scroll.js already owns its entrance (a scroll-triggered
// CSS class toggle), and on pages where a <details class="doc-details"> sits
// as a direct child of .page (diplomas/diplomes -- experience's doc-details
// are nested inside .experience-item, so they never reach this filter),
// gsap.from() was capturing the element's opacity *while reveal-on-scroll.js's
// pre-reveal .reveal class had already forced it to 0*, making the tween's
// from and to value both 0 and leaving that opacity: 0 permanently inline --
// silently overriding reveal-on-scroll's own CSS transition forever after,
// even once it correctly added .is-visible. Two systems animating the same
// property on the same element again, just surfacing on a page other than
// the homepage this time.
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const BLOCK_TAGS = ["P", "UL", "OL", "H2", "DETAILS"];

// Every sprite (the invader, and one hand-drawn icon per project below) is a
// grid of SVG rects grouped by fill color (integer coordinates -> crisp pixel
// edges, no image asset needed -- same self-hosted-everything approach
// already used for the starfield tile). "." is empty; any other character is
// looked up in `colors`, so a sprite can mix a couple of flat colors (e.g. the
// rocket's purple hull with black window/fin accents) without needing a
// separate rendering path per sprite.
function spriteSvg(pattern, colors) {
  const cols = pattern[0].length;
  const rows = pattern.length;
  const byColor = new Map();
  pattern.forEach((row, y) => {
    [...row].forEach((cell, x) => {
      if (cell === ".") return;
      const color = colors[cell] || "currentColor";
      if (!byColor.has(color)) byColor.set(color, []);
      byColor.get(color).push(`<rect x="${x}" y="${y}" width="1" height="1"/>`);
    });
  });
  const groups = Array.from(byColor, ([color, rects]) => `<g fill="${color}">${rects.join("")}</g>`).join("");
  return `<svg viewBox="0 0 ${cols} ${rows}" xmlns="http://www.w3.org/2000/svg">${groups}</svg>`;
}

// Classic arcade "crab" invader silhouette -- the default sprite, and the
// fallback if a page's own project has no icon below. A pair of dark "eye"
// pixels breaks up what was a single flat-color silhouette, same shading
// idea as the multi-tone project icons below.
const INVADER_PATTERN = [
  "..X.....X..",
  "...X...X...",
  "..XXOXOXX..",
  ".XX.XXX.XX.",
  "XXXXXXXXXXX",
  "X.XXXXXXX.X",
  "X.X.....X.X",
  "...XX.XX...",
];
const INVADER_COLORS = { X: "currentColor", O: "#0a0c0f" };

// One small, deliberately-not-photorealistic pixel icon per project ("pas
// forcément super fidele, mais un truc qui fait penser a..." -- Ruben's own
// framing): a suggestion of the subject, not a redrawing of it. Keyed by
// translationKey so it works in both languages without duplicating patterns.
// Each gets a second (sometimes third) shading/highlight tone rather than one
// flat fill -- Ruben's own follow-up request ("un peu plus beaux") once he
// saw the flat-color first pass.
const PROJECT_ICONS = {
  icarus: {
    pattern: [
      "..............",
      "......XX......",
      "......XX......",
      ".....XXXX.....",
      ".....XXXX.....",
      "....XXXXXX....",
      "....XXXXXX....",
      "....XXOOXX....",
      "....XOOOOX....",
      "....XOOOOX....",
      "....XXOOXX....",
      "....XXXXXX....",
      "...XXXXXXXX...",
      "..XXXXXXXXXX..",
      ".XXX......XXX.",
      ".....FHHF.....",
      "......FF......",
      "..............",
    ],
    colors: { X: "#8b5cf6", O: "#0a0c0f", F: "#fb923c", H: "#fde68a" },
  },
  "cryptanalyse-agapeyeff": {
    pattern: [
      "................",
      "......SSSS......",
      ".....SSSSSS.....",
      "....SS....SS....",
      "....S......S....",
      "....S......S....",
      "....S......S....",
      "..XXXXXXXXXXXX..",
      "..XXXXXXXXXXXX..",
      "..XXXXXOOXXXXX..",
      "..XXXXOOOOXXXX..",
      "..XXXXXOOXXXXX..",
      "..XXXXXOOXXXXX..",
      "..XXXXXOOXXXXX..",
      "..XXXXXXXXXXXX..",
      "..XXXXXXXXXXXX..",
    ],
    colors: { X: "#c9a24b", S: "#e8c97a", O: "#5a4420" },
  },
  "adn-zenon": {
    pattern: [
      "X.......X",
      "XX.....XX",
      ".XX...XX.",
      "..XXRXX..",
      "...XRX...",
      "....X....",
      "...XRX...",
      "..XXRXX..",
      ".XX...XX.",
      "XX.....XX",
      "X.......X",
    ],
    colors: { X: "#34d399", R: "#a7f3d0" },
  },
  "jeu-de-drones": {
    pattern: [
      "................",
      "................",
      ".RRRR......RRRR.",
      ".RXRR......RRRR.",
      "..XX........XX..",
      "...XX......XX...",
      "....XXXXXXXX....",
      ".....XXHHXX.....",
      ".....XXHHXX.....",
      "....XXXXXXXX....",
      "...XX......XX...",
      "..XX........XX..",
      ".RXRR......RRRR.",
      ".RRRR......RRRR.",
      "................",
      "................",
    ],
    colors: { X: "#f97316", H: "#fdba74", R: "#fde68a" },
  },
  "boite-a-bijoux": {
    pattern: [
      "................",
      "................",
      ".....XXXXXX.....",
      "...XXXXHHXXXX...",
      "..XXXXHHHHXXXX..",
      "..XXXXHHHHXXXX..",
      "..XXXXXHHXXXXX..",
      ".XXXXXXXXXXXXXX.",
      ".XXXXXXXXXXXXXX.",
      ".XXXXXXOOXXXXXX.",
      ".XXXXXXOOXXXXXX.",
      ".XXXXXXOOXXXXXX.",
      ".XXXXXXXXXXXXXX.",
      "................",
    ],
    colors: { X: "#fbbf24", H: "#fef3c7", O: "#92400e" },
  },
  "poesie-ratp": {
    pattern: [
      "......XX.",
      ".....XXB.",
      "....XXBB.",
      "...XXBB..",
      "..XXBB...",
      ".XXBB....",
      "XXBB.....",
      ".X.......",
      "..N......",
    ],
    colors: { X: "#fb7185", B: "#fda4af", N: "#450a0a" },
  },
  "business-plan-revolt": {
    pattern: [
      "..............",
      "........H.....",
      ".......XH.....",
      ".......H......",
      "......XH......",
      ".....XHH......",
      ".....XXXXXX...",
      "....XXXXXX....",
      "...XXXXXX.....",
      "......XXX.....",
      "......XX......",
      ".....XX.......",
      ".....X........",
      ".....X........",
      "....X.........",
      "..............",
    ],
    colors: { X: "#facc15", H: "#fef9c3" },
  },
  "arrosoir-telescopique": {
    pattern: [
      "................",
      "....XXXX........",
      "...XX..XX....HHH",
      "...X....X....HHH",
      "...XXXXXX...XX..",
      "..XXXXXXXX.XDD..",
      ".XXXXXXXXXXXDD..",
      ".XXXXXXXXXX.....",
      ".XXXXXXXXXXD....",
      ".XXXXXXXXXXD....",
      "..XXXXXXXX......",
      "....XXXX........",
      "................",
      "................",
    ],
    colors: { X: "#4ade80", H: "#bbf7d0", D: "#7dd3fc" },
  },
  anharmonicite: {
    pattern: [
      "................",
      "................",
      "................",
      "................",
      ".X..............",
      ".XXX............",
      ".XXXXXX.........",
      ".HXXXXXXX.SS....",
      ".HHXXXXXXSSSS...",
      ".HHHXXXXXXSSXX..",
      ".HHHHHXXXXXXXXX.",
      ".HHHHHHXXXXXXXX.",
      ".HHHHHHHXXXXXXX.",
      "................",
    ],
    colors: { X: "#60a5fa", H: "#bfdbfe", S: "#1e3a8a" },
  },
};

// F1-flavored bonus sprite -- rarer than the invader/project icons, worth
// more points, same spawn/hit machinery as the rest of the game (Ruben asked
// for "plus de features en rapport avec la F1... un peu comme le truc des
// invaders" -- extending the existing mini-game with a themed bonus target
// was the smallest way to do that, rather than a separate feature/system).
const CHECKERED_FLAG_PATTERN = [
  "BWBWBWBW",
  "WBWBWBWB",
  "BWBWBWBW",
  "WBWBWBWB",
  "BWBWBWBW",
  "WBWBWBWB",
  "BWBWBWBW",
  "WBWBWBWB",
];
const CHECKERED_FLAG_COLORS = { B: "#0a0c0f", W: "#f4f4f5" };
const INVADER_BONUS_CHANCE = 0.12;
const INVADER_BONUS_POINTS = 5;

// Invader mini-game: a couple of sprites (the pixel invader, or -- for
// variety -- another project's hand-drawn icon) idle-bob on the page at a
// time, placed clear of every clickable element so they're never in the way
// of actually using the site. Clicking a sprite is a "hit" (+1, sprite
// removed); clicking anywhere else just fires a decorative shot, since the
// game has no real bullet-travel hit detection -- a direct click on a sprite
// already is the hit. Score persists sitewide via localStorage; reaching 20
// unlocks a one-time easter egg flavored by the current page's category.
// Purely additive: never calls preventDefault, so it can't interfere with
// real navigation.
const INVADER_SCORE_KEY = "invaderScore";
const INVADER_UNLOCKED_KEY = "invaderEasterEggShown";
const INVADER_MAX_ALIVE = 2;
const INVADER_SPAWN_MIN_MS = 4000;
const INVADER_SPAWN_MAX_MS = 8000;
const INVADER_LIFETIME_MS = 13000;
const INVADER_SCORE_TO_UNLOCK = 20;

// Short, page-appropriate flavor text per project category (front-matter
// `category` values) -- not a full easter egg per project page, which would
// mean bespoke content for all nine projects for one reward moment. Category
// is stored localized (content/en/*.md says "Research", content/fr/*.md says
// "Recherche" for the same category), so both spellings are keys here --
// caught by actually checking a French project page, where it was silently
// falling through to the generic default instead of its category's line.
const INVADER_EASTER_EGGS = {
  Aerospace: { fr: "SÉQUENCE DE LANCEMENT ENGAGÉE", en: "LAUNCH SEQUENCE ENGAGED", zh: "发射程序已启动" },
  "Aérospatial": { fr: "SÉQUENCE DE LANCEMENT ENGAGÉE", en: "LAUNCH SEQUENCE ENGAGED", zh: "发射程序已启动" },
  Mechanical: { fr: "TOLÉRANCES VALIDÉES", en: "TOLERANCES VALIDATED", zh: "公差验证通过" },
  "Mécanique": { fr: "TOLÉRANCES VALIDÉES", en: "TOLERANCES VALIDATED", zh: "公差验证通过" },
  Programming: { fr: "COMPILATION RÉUSSIE", en: "BUILD SUCCEEDED", zh: "编译成功" },
  Programmation: { fr: "COMPILATION RÉUSSIE", en: "BUILD SUCCEEDED", zh: "编译成功" },
  Research: { fr: "HYPOTHÈSE CONFIRMÉE", en: "HYPOTHESIS CONFIRMED", zh: "假设已证实" },
  Recherche: { fr: "HYPOTHÈSE CONFIRMÉE", en: "HYPOTHESIS CONFIRMED", zh: "假设已证实" },
  Business: { fr: "OBJECTIFS ATTEINTS", en: "TARGETS MET", zh: "目标达成" },
  Creative: { fr: "ŒUVRE DÉBLOQUÉE", en: "PIECE UNLOCKED", zh: "作品已解锁" },
  "Créatif": { fr: "ŒUVRE DÉBLOQUÉE", en: "PIECE UNLOCKED", zh: "作品已解锁" },
  航空航天: { fr: "SÉQUENCE DE LANCEMENT ENGAGÉE", en: "LAUNCH SEQUENCE ENGAGED", zh: "发射程序已启动" },
  机械设计: { fr: "TOLÉRANCES VALIDÉES", en: "TOLERANCES VALIDATED", zh: "公差验证通过" },
  编程: { fr: "COMPILATION RÉUSSIE", en: "BUILD SUCCEEDED", zh: "编译成功" },
  科研: { fr: "HYPOTHÈSE CONFIRMÉE", en: "HYPOTHESIS CONFIRMED", zh: "假设已证实" },
  商业: { fr: "OBJECTIFS ATTEINTS", en: "TARGETS MET", zh: "目标达成" },
  创意: { fr: "ŒUVRE DÉBLOQUÉE", en: "PIECE UNLOCKED", zh: "作品已解锁" },
};
const INVADER_DEFAULT_EGG = { fr: "MISSION ACCOMPLIE", en: "MISSION ACCOMPLISHED", zh: "任务完成" };

function invaderScore() {
  try {
    return Number(localStorage.getItem(INVADER_SCORE_KEY) || 0);
  } catch (err) {
    return 0;
  }
}

// A pixel rocket (the same Icarus icon pattern used in the mini-game, scaled
// way up) launches off the bottom of the screen. Replaces an earlier
// text-only version: Ruben reported reaching 20 points without ever noticing
// the egg, and the cause was the overlay's own "click anywhere to dismiss" --
// on a page that trains you to click constantly (that's how you shoot), the
// very next reflexive click after crossing the threshold landed on the
// full-screen overlay and instantly killed it before it could register as a
// reward. Fixed by dropping click-to-dismiss entirely: it's a short (~2s),
// fully automatic sequence now, nothing to accidentally cut off.
function showInvaderEasterEgg() {
  const lang = (document.documentElement.lang.startsWith("zh") ? "zh" : document.documentElement.lang === "fr" ? "fr" : "en");
  const category = document.body.dataset.category;
  const copy = INVADER_EASTER_EGGS[category] || INVADER_DEFAULT_EGG;

  const overlay = document.createElement("div");
  overlay.className = "invader-easter-egg";
  overlay.setAttribute("aria-hidden", "true");
  const rocket = PROJECT_ICONS.icarus;
  overlay.innerHTML = `<p class="invader-easter-egg-title">${copy[lang]}</p><div class="invader-easter-egg-rocket">${spriteSvg(rocket.pattern, rocket.colors)}</div>`;
  document.body.appendChild(overlay);

  // xPercent (GSAP's own centering) instead of a CSS translateX(-50%): same
  // reason as every other GSAP-animated sprite in this file -- GSAP owns this
  // element's transform once it starts writing to it, and a CSS-declared
  // transform would get silently clobbered by GSAP's first write.
  const rocketEl = overlay.querySelector(".invader-easter-egg-rocket");
  const liftoff = window.innerHeight * 1.3;
  gsap.set(overlay, { opacity: 0 });
  gsap.set(rocketEl, { xPercent: -50, y: 0 });

  gsap
    .timeline({ onComplete: () => overlay.remove() })
    .to(overlay, { opacity: 1, duration: 0.25 })
    .to(rocketEl, { y: -12, duration: 0.35, ease: "power1.out" }, 0.35)
    .to(rocketEl, { y: -liftoff, duration: 1.1, ease: "power2.in" }, 0.75)
    .to(overlay, { opacity: 0, duration: 0.4 }, 1.5);
}

// The score now lives inside the game's own toggle button (see
// initInvaderGame) instead of a separate floating badge.
let invaderScoreEl = null;
function updateInvaderScoreBadge(score) {
  if (invaderScoreEl) invaderScoreEl.textContent = score > 0 ? `★ ${score}` : "";
}

function addInvaderScore(amount = 1) {
  const next = invaderScore() + amount;
  try {
    localStorage.setItem(INVADER_SCORE_KEY, String(next));
  } catch (err) {
    // No persistence (private browsing, storage disabled) -- the badge for
    // this page load still works, it just won't carry to the next page.
  }
  updateInvaderScoreBadge(next);
  if (next >= INVADER_SCORE_TO_UNLOCK && !localStorage.getItem(INVADER_UNLOCKED_KEY)) {
    try {
      localStorage.setItem(INVADER_UNLOCKED_KEY, "1");
    } catch (err) {
      // Best-effort: worst case the egg can show again on a later page.
    }
    showInvaderEasterEgg();
  }
}

function showInvaderPlusOne(x, y, amount = 1) {
  const el = document.createElement("div");
  el.className = "invader-plus-one";
  el.setAttribute("aria-hidden", "true");
  el.textContent = `+${amount}`;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  document.body.appendChild(el);
  gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0 });
  gsap
    .timeline({ onComplete: () => el.remove() })
    .to(el, { opacity: 1, y: "-=6", duration: 0.15 })
    .to(el, { y: "-=30", opacity: 0, duration: 0.6, ease: "power1.out" }, 0.1);
}

// A short "shot" fired from the visitor's own side of the screen (the bottom
// edge, aligned under the click) traveling up to the exact point clicked --
// fired on every click that doesn't land on a sprite, since the game has no
// real bullet-travel hit detection: a direct click on a sprite is the hit,
// this is just the feedback that a shot went out. Originally this spawned
// *at* the click point and flew upward from there, which read as the target
// firing at the visitor rather than the other way around -- the origin needed
// to be the visitor's position, the click point the destination.
function fireInvaderBolt(targetX, targetY) {
  const originY = window.innerHeight + 16;
  const travel = originY - targetY;

  const bolt = document.createElement("div");
  bolt.className = "invader-bolt";
  bolt.setAttribute("aria-hidden", "true");
  bolt.style.left = `${targetX}px`;
  bolt.style.top = `${originY}px`;
  document.body.appendChild(bolt);
  gsap.set(bolt, { xPercent: -50, yPercent: -100, scaleY: 0.4, opacity: 0, transformOrigin: "50% 100%" });
  gsap
    .timeline({ onComplete: () => bolt.remove() })
    .to(bolt, { opacity: 1, scaleY: 1, duration: 0.08 })
    .to(bolt, { y: -travel, opacity: 0, duration: 0.35, ease: "power1.in" }, 0.02);
}

function despawnInvaderSprite(sprite) {
  if (!sprite.isConnected) return;
  gsap.to(sprite, { opacity: 0, scale: 0.6, duration: 0.4, onComplete: () => sprite.remove() });
}

function rectsOverlap(a, b) {
  return !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);
}

// Picks a spawn point clear of every clickable element currently on screen
// (links, buttons, CTAs, and other sprites) -- Ruben's own report was that a
// sprite landing on top of a link made the page "very hard" to use, so a
// candidate that would overlap one is rejected and retried rather than ever
// placed. Gives up after 20 tries and skips this spawn cycle entirely rather
// than forcing a bad placement -- the next scheduled spawn tries again.
// Text and media are blockers too: visitors kept reporting that sprites
// covered what they were reading, so a sprite may only land in empty space
// (margins, gaps between blocks). On a dense page that simply means fewer
// sprites, which is the right trade.
function findInvaderSpawnPoint() {
  const header = document.querySelector(".site-header");
  const top = (header ? header.offsetHeight : 80) + 40;
  const margin = 40;
  const half = 20;
  const buffer = 14;
  const blockers = Array.from(
    document.querySelectorAll(
      "a, button, input, textarea, select, [role='button'], [data-glass-cta], .invader-sprite, .invader-toggle, " +
        "h1, h2, h3, p, li, figure, img, video, canvas, table, .hero-liquid-mount, .highlight-card, .stat-item, .looking-for"
    )
  ).map((el) => el.getBoundingClientRect());

  for (let attempt = 0; attempt < 20; attempt++) {
    const x = margin + Math.random() * (window.innerWidth - margin * 2);
    const y = top + Math.random() * Math.max(window.innerHeight - top - 120, 40);
    const candidate = { left: x - half - buffer, right: x + half + buffer, top: y - half - buffer, bottom: y + half + buffer };
    if (!blockers.some((rect) => rectsOverlap(candidate, rect))) return { x, y };
  }
  return null;
}

function spawnInvaderSprite(projectKeys) {
  if (document.querySelectorAll(".invader-sprite").length >= INVADER_MAX_ALIVE) return;

  const point = findInvaderSpawnPoint();
  if (!point) return;

  const isBonus = Math.random() < INVADER_BONUS_CHANCE;
  const projectKey = !isBonus && projectKeys.length && Math.random() < 0.5
    ? projectKeys[Math.floor(Math.random() * projectKeys.length)]
    : null;
  const icon = isBonus
    ? { pattern: CHECKERED_FLAG_PATTERN, colors: CHECKERED_FLAG_COLORS }
    : (projectKey && PROJECT_ICONS[projectKey]) || { pattern: INVADER_PATTERN, colors: INVADER_COLORS };
  const points = isBonus ? INVADER_BONUS_POINTS : 1;

  const sprite = document.createElement("div");
  sprite.className = isBonus ? "invader-sprite is-bonus" : "invader-sprite";
  // Mouse-only easter egg with no keyboard equivalent (there's no sensible
  // "shoot" action for keyboard/AT users) -- aria-hidden rather than leaving
  // it discoverable-but-inoperable to a screen reader, same as the cursor dot
  // and score badge already do for the rest of this game.
  sprite.setAttribute("aria-hidden", "true");
  sprite.innerHTML = `<div class="invader-sprite-bob">${spriteSvg(icon.pattern, icon.colors)}</div>`;
  // Page coordinates, not viewport ones: a fixed sprite stayed put while the
  // text scrolled underneath it, so "spawn only in empty space" did not hold.
  sprite.style.left = `${point.x + window.scrollX}px`;
  sprite.style.top = `${point.y + window.scrollY}px`;
  document.body.appendChild(sprite);

  // xPercent/yPercent + scale (GSAP's own centering/scaling) instead of a CSS
  // transform: GSAP owns this element's transform from here on, same reason
  // the click-invader before it did -- and the idle bob keyframe lives on the
  // *inner* .invader-sprite-bob div instead of this element for the same
  // reason cursor.js's spin was split onto an inner element: a CSS animation
  // and GSAP both targeting `transform` on the same node conflict.
  gsap.set(sprite, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });
  gsap.to(sprite, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)" });

  const timer = setTimeout(() => despawnInvaderSprite(sprite), INVADER_LIFETIME_MS);

  sprite.addEventListener("click", (event) => {
    event.stopPropagation();
    clearTimeout(timer);
    const rect = sprite.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    gsap.killTweensOf(sprite);
    gsap.to(sprite, { scale: 0, opacity: 0, duration: 0.15, onComplete: () => sprite.remove() });
    showInvaderPlusOne(cx, cy, points);
    addInvaderScore(points);
  });
}

// Opt-in: the recurring feedback was "we don't know what to do with the
// sprites" and "they get in the way of reading". So nothing spawns until the
// visitor presses the corner "Mini-jeu" button, which states the rule; the
// choice is remembered across pages. Reduced-motion visitors never get here.
const INVADER_ON_KEY = "invaderGameOn";
const INVADER_UI = {
  fr: { label: "Mini-jeu", on: "Mini-jeu actif", hint: "Cliquez sur les envahisseurs qui apparaissent pour marquer des points. 20 points débloquent une surprise. Recliquez ici pour arrêter." },
  en: { label: "Mini-game", on: "Mini-game on", hint: "Click the invaders that appear to score points. 20 points unlock a surprise. Click here again to stop." },
  zh: { label: "小游戏", on: "小游戏已开启", hint: "点击出现的入侵者得分。20 分可解锁一个彩蛋。再次点击此处即可关闭。" },
};

// The mini-game button: a ship's porthole. A riveted metal bezel around dark
// glass with a glare on it, and the Icarus rocket sprite inside, dim while the
// game is off and lit (with an amber ring on the glass) while it runs.
function portholeSvg() {
  const rocket = PROJECT_ICONS.icarus;
  const sprite = spriteSvg(rocket.pattern, rocket.colors).replace(
    "<svg ",
    '<svg class="porthole-sprite" x="19.5" y="16" width="17" height="22" ',
  );
  let rivets = "";
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
    rivets += `<circle cx="${(28 + 24.2 * Math.cos(a)).toFixed(2)}" cy="${(28 + 24.2 * Math.sin(a)).toFixed(2)}" r="1.35" fill="#d8d2c4" stroke="#14171c" stroke-width="0.5"/>`;
  }
  return `<svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<defs>
<linearGradient id="ph-metal" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9aa0a8"/><stop offset="0.5" stop-color="#4a4f57"/><stop offset="1" stop-color="#22262b"/></linearGradient>
<linearGradient id="ph-lip" x1="1" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#7d838b"/><stop offset="1" stop-color="#1d2025"/></linearGradient>
<radialGradient id="ph-glass" cx="0.4" cy="0.35" r="0.8"><stop offset="0" stop-color="#1f2833"/><stop offset="1" stop-color="#080a0d"/></radialGradient>
</defs>
<circle cx="28" cy="28" r="27" fill="url(#ph-metal)" stroke="#0a0c0f" stroke-width="1"/>
<circle cx="28" cy="28" r="21.5" fill="url(#ph-lip)"/>
${rivets}
<circle cx="28" cy="28" r="18.5" fill="url(#ph-glass)"/>
<circle class="porthole-lamp" cx="28" cy="28" r="18.5" fill="none" stroke="#e9c186" stroke-width="1.6"/>
${sprite}
<path d="M13.5 22.5A16 16 0 0 1 24 12.5" fill="none" stroke="#fff" stroke-opacity="0.28" stroke-width="2" stroke-linecap="round"/>
<path d="M41 40A16 16 0 0 1 33 44.5" fill="none" stroke="#fff" stroke-opacity="0.1" stroke-width="1.5" stroke-linecap="round"/>
</svg>`;
}

function initInvaderGame() {
  const ui = INVADER_UI[(document.documentElement.lang.startsWith("zh") ? "zh" : document.documentElement.lang === "fr" ? "fr" : "en")];
  // Every other project's icon is fair game; skip the one whose own page
  // you're standing on (base.njk stamps data-project-key from the page's
  // translationKey front-matter).
  const ownKey = document.body.dataset.projectKey;
  const projectKeys = Object.keys(PROJECT_ICONS).filter((key) => key !== ownKey);
  let on = false;
  try {
    on = localStorage.getItem(INVADER_ON_KEY) === "1";
  } catch (err) {
    // Storage blocked: the game just starts off on every page.
  }
  let spawnTimer = null;
  let hintTimer = null;

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "invader-toggle";
  toggle.title = ui.hint;
  toggle.setAttribute("aria-label", ui.label);
  // A porthole with the Icarus rocket in it, no text: lit while the game is on.
  const icon = document.createElement("span");
  icon.className = "invader-toggle-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.innerHTML = portholeSvg();
  invaderScoreEl = document.createElement("span");
  invaderScoreEl.className = "invader-toggle-score";
  invaderScoreEl.setAttribute("aria-hidden", "true");
  toggle.append(icon, invaderScoreEl);
  const hint = document.createElement("p");
  hint.className = "invader-hint";
  hint.setAttribute("aria-hidden", "true");
  hint.textContent = ui.hint;
  document.body.append(toggle, hint);

  function scheduleNextSpawn() {
    // Once the easter egg has fired, the game has nothing left to reward --
    // spawns drop to a tenth of the rate instead of stopping outright.
    let slowdown = 1;
    try {
      if (localStorage.getItem(INVADER_UNLOCKED_KEY)) slowdown = 10;
    } catch (err) {
      // Storage blocked: full spawn rate.
    }
    const delay = (INVADER_SPAWN_MIN_MS + Math.random() * (INVADER_SPAWN_MAX_MS - INVADER_SPAWN_MIN_MS)) * slowdown;
    spawnTimer = setTimeout(() => {
      spawnInvaderSprite(projectKeys);
      scheduleNextSpawn();
    }, delay);
  }

  function render() {
    toggle.setAttribute("aria-pressed", String(on));
    // Stable name; aria-pressed carries the on/off state.
    updateInvaderScoreBadge(on ? invaderScore() : 0);
  }

  function setOn(next, showHint) {
    on = next;
    try {
      localStorage.setItem(INVADER_ON_KEY, on ? "1" : "0");
    } catch (err) {
      // Not remembered across pages; still works on this one.
    }
    clearTimeout(spawnTimer);
    if (on) {
      scheduleNextSpawn();
      if (showHint) {
        hint.classList.add("is-visible");
        clearTimeout(hintTimer);
        hintTimer = setTimeout(() => hint.classList.remove("is-visible"), 6000);
      }
    } else {
      hint.classList.remove("is-visible");
      document.querySelectorAll(".invader-sprite").forEach(despawnInvaderSprite);
      // Turning the game off resets it: score and the unlocked surprise start over next time.
      if (showHint) {
        try {
          localStorage.removeItem(INVADER_SCORE_KEY);
          localStorage.removeItem(INVADER_UNLOCKED_KEY);
        } catch (err) {
          // Storage blocked: nothing was saved anyway.
        }
      }
    }
    render();
  }

  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    setOn(!on, true);
  });
  setOn(on, false);

  document.addEventListener("click", (event) => {
    if (!on || event.target.closest(".stl-viewer-mount, .invader-sprite, .invader-toggle")) return;
    fireInvaderBolt(event.clientX, event.clientY);
  });
}

// Session-gated opening sequence, on whichever page is opened first, plays once per browser
// session (sessionStorage-gated so a second visit or a reload never repeats
// it). Its "progress" is the real mount of GlassHero -- NOT drei's
// useProgress hook as originally planned: GlassHero's scene is entirely
// procedural (a generated latheGeometry + Lightformer primitives, no
// useLoader call anywhere in it), so nothing ever queues on the loading
// manager useProgress reads and it would report 100% instantly, making a
// progress bar built on it fake despite looking real. Watching main.jsx's own
// "is-ready" class (added the moment the WebGL canvas is created and about to
// render its first frame) is the actually-honest equivalent for this
// specific hero. A hard 4.8s safety timeout and a 500ms display floor mean it
// never hangs on a slow/blocked load and never flashes on a warm cache.
const INTRO_SESSION_KEY = "introShown";
const INTRO_MAX_WAIT_MS = 4800;

// One 300x300 SVG, two colours (light line, amber accent), played as a single
// movement. A pendulum hangs from a bracket and swings left to right. Before
// it has even come to rest, its rod starts rolling itself up end first (the rod
// is exactly one circumference long, L = 2*pi*R) into a ring that slides to the
// centre; the bob, still travelling, drops into the middle as the hub, ten
// spokes and five lug nuts are drawn, and the wheel keeps turning with the
// swing's momentum, slowing to a stop. Geometry is integrated from curvature
// every frame, so the roll-up is a real roll-up and not a cross-fade.
const WHEEL_R = 38;
const WHEEL_L = 2 * Math.PI * WHEEL_R;
const WHEEL_PIVOT = [150, 24];
const WHEEL_SPOKES = 10;
const WHEEL_LUGS = 5;
const WHEEL_SWING = (38 * Math.PI) / 180;
const smoothstep01 = (t) => {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
};

function wheelGeometry(phi, curl, shift) {
  // Heading is measured from +x with y pointing down, so straight down is 90deg.
  const theta0 = Math.PI / 2 - phi;
  const N = 120;
  const ds = WHEEL_L / N;
  const edge = 4;
  let x = WHEEL_PIVOT[0];
  let y = WHEEL_PIVOT[1];
  let th = theta0;
  const pts = [[x, y]];
  for (let i = 0; i < N; i++) {
    const s = i * ds;
    const k = smoothstep01((s - (WHEEL_L - curl) + edge) / (2 * edge)) / WHEEL_R;
    th += ds * k;
    x += ds * Math.cos(th);
    y += ds * Math.sin(th);
    pts.push([x, y]);
  }
  const cx = WHEEL_PIVOT[0] - WHEEL_R * Math.sin(theta0);
  const cy = WHEEL_PIVOT[1] + WHEEL_R * Math.cos(theta0);
  const dx = shift * (150 - cx);
  const dy = shift * (150 - cy);
  return { pts: pts.map(([px, py]) => [px + dx, py + dy]), cx: cx + dx, cy: cy + dy };
}

function buildWheelIntro() {
  const NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", "0 0 300 300");
  svg.setAttribute("class", "intro-overlay-wheel");
  const make = (tag, attrs, parent = svg) => {
    const el = document.createElementNS(NS, tag);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    parent.appendChild(el);
    return el;
  };
  const [px, py] = WHEEL_PIVOT;
  // Faint guide: the arc the bob is about to sweep.
  const a0 = Math.PI / 2 - -WHEEL_SWING;
  const a1 = Math.PI / 2 - WHEEL_SWING;
  const arc = make("path", {
    d: `M${(px + WHEEL_L * Math.cos(a0)).toFixed(1)} ${(py + WHEEL_L * Math.sin(a0)).toFixed(1)}A${WHEEL_L.toFixed(1)} ${WHEEL_L.toFixed(1)} 0 0 0 ${(px + WHEEL_L * Math.cos(a1)).toFixed(1)} ${(py + WHEEL_L * Math.sin(a1)).toFixed(1)}`,
    class: "intro-wheel-thin intro-wheel-guide",
  });
  // Mounting bracket and pivot.
  const mount = make("g", { class: "intro-wheel-mount" });
  make("rect", { x: px - 18, y: py - 15, width: 36, height: 7, rx: 2.5, class: "intro-wheel-thin" }, mount);
  make("circle", { cx: px - 11, cy: py - 11.5, r: 1.3, class: "intro-wheel-dot" }, mount);
  make("circle", { cx: px + 11, cy: py - 11.5, r: 1.3, class: "intro-wheel-dot" }, mount);
  make("line", { x1: px, y1: py - 8, x2: px, y2: py, class: "intro-wheel-thin" }, mount);
  const pivot = make("circle", { cx: px, cy: py, r: 2.6, class: "intro-wheel-line" }, mount);
  const wheel = make("g", {});
  const inner = make("circle", { cx: 150, cy: 150, r: WHEEL_R * 0.84, class: "intro-wheel-thin", opacity: 0 }, wheel);
  const spokes = [];
  for (let i = 0; i < WHEEL_SPOKES; i++) {
    const a = (i / WHEEL_SPOKES) * Math.PI * 2;
    spokes.push(make("line", {
      x1: 150 + 10 * Math.cos(a), y1: 150 + 10 * Math.sin(a),
      x2: 150 + WHEEL_R * 0.84 * Math.cos(a), y2: 150 + WHEEL_R * 0.84 * Math.sin(a),
      pathLength: 1, class: "intro-wheel-thin", "stroke-dasharray": 1, "stroke-dashoffset": 1,
    }, wheel));
  }
  const lugs = [];
  for (let i = 0; i < WHEEL_LUGS; i++) {
    const a = (i / WHEEL_LUGS) * Math.PI * 2 - Math.PI / 2;
    lugs.push(make("circle", { cx: 150 + 15.5 * Math.cos(a), cy: 150 + 15.5 * Math.sin(a), r: 1.7, class: "intro-wheel-dot", opacity: 0 }, wheel));
  }
  const rod = make("path", { class: "intro-wheel-line", fill: "none" }, wheel);
  const bob = make("circle", { r: 6.5, class: "intro-wheel-accent" });
  const glint = make("circle", { r: 1.9, class: "intro-wheel-glint" });
  return { svg, arc, mount, pivot, wheel, inner, spokes, lugs, rod, bob, glint };
}

function playWheelIntro(parts, onDone) {
  const st = { phi: -WHEEL_SWING, curl: 0, shift: 0, slide: 0 };
  const draw = () => {
    const g = wheelGeometry(st.phi, st.curl, st.shift);
    parts.rod.setAttribute("d", "M" + g.pts.map((p) => p[0].toFixed(1) + " " + p[1].toFixed(1)).join("L"));
    const tip = g.pts[g.pts.length - 1];
    const bx = tip[0] + (g.cx - tip[0]) * st.slide;
    const by = tip[1] + (g.cy - tip[1]) * st.slide;
    const br = 6.5 + 2.2 * st.slide;
    parts.bob.setAttribute("cx", bx.toFixed(1));
    parts.bob.setAttribute("cy", by.toFixed(1));
    parts.bob.setAttribute("r", br.toFixed(1));
    parts.glint.setAttribute("cx", (bx - br * 0.35).toFixed(1));
    parts.glint.setAttribute("cy", (by - br * 0.35).toFixed(1));
    // Everything that belongs to the pendulum fades as the rod rolls up.
    const straight = Math.max(0, 1 - st.curl / (WHEEL_L * 0.18));
    parts.arc.setAttribute("opacity", (0.4 * straight).toFixed(2));
    parts.mount.setAttribute("opacity", Math.max(0, 1 - st.shift * 1.6).toFixed(2));
  };
  draw();
  return gsap
    .timeline({ onUpdate: draw, onComplete: onDone })
    // The swing, left extreme to right extreme.
    .to(st, { phi: WHEEL_SWING, duration: 0.95, ease: "sine.inOut" }, 0)
    // The roll-up begins while the rod is still travelling (same movement).
    .to(st, { curl: WHEEL_L + 6, shift: 1, duration: 1.0, ease: "power2.inOut" }, 0.5)
    // The bob drops into the centre and becomes the hub.
    .to(st, { slide: 1, duration: 0.4, ease: "power3.inOut" }, 1.1)
    .to([parts.inner, ...parts.lugs], { opacity: 1, duration: 0.3 }, 1.2)
    .to(parts.spokes, { attr: { "stroke-dashoffset": 0 }, duration: 0.4, stagger: 0.03, ease: "power1.out" }, 1.2)
    // The wheel carries on turning with the swing's momentum.
    .to(parts.wheel, { rotation: 215, svgOrigin: "150 150", duration: 1.0, ease: "power3.out" }, 1.0);
}

function showOpeningSequence(container) {
  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.className = "intro-overlay";
    // Purely a visual transition -- never gates focus or reads content a
    // screen-reader visitor needs, so it's hidden rather than announced (and
    // the page underneath is fully present in the accessibility tree the
    // entire time, never itself hidden behind this).
    overlay.setAttribute("aria-hidden", "true");
    const parts = buildWheelIntro();
    overlay.appendChild(parts.svg);
    document.body.appendChild(overlay);
    document.documentElement.classList.remove("intro-pending");

    let heroReady = false;
    let animDone = false;
    let settled = false;

    const maybeFinish = () => {
      if (settled || !heroReady || !animDone) return;
      settled = true;
      clearTimeout(safety);
      window.removeEventListener("keydown", skip);
      gsap
        .timeline({ onComplete: () => { overlay.remove(); resolve(); } })
        .to(overlay, { clipPath: "inset(0 0 100% 0)", duration: 0.55, ease: "expo.inOut" });
    };

    const timeline = playWheelIntro(parts, () => {
      animDone = true;
      maybeFinish();
    });

    // A click or key press skips straight to the end instead of making the
    // visitor sit through a decoration.
    const skip = () => {
      timeline.progress(1);
      heroReady = true;
      animDone = true;
      maybeFinish();
    };
    overlay.addEventListener("pointerdown", skip, { once: true });
    window.addEventListener("keydown", skip, { once: true });

    const heroMount = container.querySelector(".hero-liquid-mount");
    const narrowViewport = window.matchMedia("(max-width: 48rem)").matches;
    if (!heroMount || narrowViewport || heroMount.classList.contains("is-ready")) {
      // Nothing to honestly wait for: no hero on this load (narrow viewport --
      // main.jsx skips mounting it entirely), or it's already ready.
      heroReady = true;
    } else {
      new MutationObserver((_, observer) => {
        if (heroMount.classList.contains("is-ready")) {
          observer.disconnect();
          heroReady = true;
          maybeFinish();
        }
      }).observe(heroMount, { attributes: true, attributeFilter: ["class"] });
    }

    // Hard stop: a slow or blocked hero never leaves the visitor stuck behind
    // the overlay.
    const safety = setTimeout(() => {
      heroReady = true;
      timeline.progress(1);
      animDone = true;
      maybeFinish();
    }, INTRO_MAX_WAIT_MS);

    maybeFinish();
  });
}

function runEntranceTimeline(container, header, isHomeHero) {
  const heading = container.querySelector(":scope > h1, .hero-liquid-stage h1");
  const blocks = Array.from(container.children)
    .filter((el) => BLOCK_TAGS.includes(el.tagName) && !el.matches(".doc-details, .project-meta-tag"))
    .slice(0, 6);

  try {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    if (header) {
      tl.from(header, { opacity: 0, y: -10, duration: 0.5 }, 0);
    }

    if (heading && isHomeHero) {
      const split = new SplitText(heading, { type: "chars" });
      tl.from(split.chars, { opacity: 0, y: 28, filter: "blur(8px)", duration: 0.7, stagger: 0.016 }, 0.1);
    } else if (heading) {
      tl.from(heading, { opacity: 0, y: 20, duration: 0.6 }, 0.1);
    }

    if (blocks.length) {
      tl.from(blocks, { opacity: 0, y: 16, duration: 0.6, stagger: 0.09 }, isHomeHero ? 0.45 : 0.3);
    }
  } catch (err) {
    // Leave everything at its normal, fully visible state.
  }
}

function init() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const header = document.querySelector(".site-header");
  const container = document.querySelector(".page, .project");
  if (!container) {
    document.documentElement.classList.remove("intro-pending");
    return;
  }

  const isHomeHero = !!container.querySelector(".hero-liquid-stage");

  let introAlreadyShown = true;
  try {
    introAlreadyShown = !!sessionStorage.getItem(INTRO_SESSION_KEY);
  } catch (err) {
    // Can't read/persist the flag (private browsing, storage disabled) --
    // default to "already shown" so the failure mode is no intro, never a
    // repeating one on every navigation.
  }

  if (!introAlreadyShown) {
    try {
      sessionStorage.setItem(INTRO_SESSION_KEY, "1");
    } catch (err) {
      // Best-effort; see above.
    }
    try {
      showOpeningSequence(container)
        .catch(() => {
          document.querySelector(".intro-overlay")?.remove();
          document.documentElement.classList.remove("intro-pending");
        })
        .then(() => runEntranceTimeline(container, header, isHomeHero));
    } catch (err) {
      document.documentElement.classList.remove("intro-pending");
      runEntranceTimeline(container, header, isHomeHero);
    }
  } else {
    document.documentElement.classList.remove("intro-pending");
    runEntranceTimeline(container, header, isHomeHero);
  }

  // Hero-stat callouts (the large numbers added in the stats front-matter):
  // revealed on scroll into view rather than on page load, since they usually
  // sit well below the fold. A real ScrollTrigger use, not one added just
  // because the dependency is already there -- .project-card-tag/.project-meta-tag
  // already had their own load-time/hover treatments, and reveal-on-scroll.js's
  // IntersectionObserver doesn't touch .stat-item, so there's no overlap.
  try {
    const statItems = document.querySelectorAll(".stat-item");
    if (statItems.length) {
      gsap.from(statItems, {
        opacity: 0,
        y: 24,
        scale: 0.92,
        duration: 0.6,
        ease: "expo.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".stat-grid",
          start: "top 85%",
        },
      });
    }
  } catch (err) {
    // Leave stat callouts at their normal, fully visible state.
  }

  try {
    initInvaderGame();
  } catch (err) {
    // No mini-game -- purely decorative, safe to just not have it.
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
