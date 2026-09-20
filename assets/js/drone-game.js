(() => {
  "use strict";

  // ponytail: pyodide "latest" npm dist-tag currently resolves to an unfamiliar
  // 314.x version scheme (unverifiable against Pyodide's historical 0.x releases at
  // review time); pinned instead to the "stable-0.29" dist-tag (0.29.5), which
  // matches Pyodide's known versioning and API surface. Revisit if 314.x is
  // confirmed legitimate later.
  const PYODIDE_VERSION = "0.29.5";
  const PYODIDE_JS_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/pyodide.js`;
  const SCRIPT_URL = "/assets/downloads/jeu-de-drones/drone-rescue.py";

  // Exact config used to produce the project's real report; must match drone-rescue.py's expectations.
  const CONFIG = {
    taille: 12,
    nb_drones: 6,
    nb_tempetes: 4,
    nb_survivants: 10,
    nb_batiments: 12,
    batterie_initiale: 10,
    recharge_hospital: 3,
    batterie_max: 20,
  };

  // Preferred path: JS Promise Integration (stable in Chrome 137+, mid-2025) lets
  // Python's input() suspend without blocking the browser thread, so a real on-page
  // form can sit next to the grid instead of a native prompt() covering it.
  const JSPI_INPUT_SHIM = `
import builtins
from pyodide.ffi import run_sync
def _js_input(prompt=""):
    from js import window
    result = run_sync(window.__droneGameAsyncInput(prompt))
    return result if result is not None else ""
builtins.input = _js_input
`;

  // Fallback for browsers without JSPI (e.g. Safari): a plain native prompt().
  // It cannot render the grid legibly (proportional font breaks column alignment)
  // and blocks the page while open; known limitations, unavoidable without JSPI.
  const PROMPT_INPUT_SHIM = `
import builtins
def _js_input(prompt=""):
    from js import window
    result = window.prompt(prompt)
    return result if result is not None else ""
builtins.input = _js_input
`;

  const JSPI_PROBE = `
from pyodide.ffi import run_sync
from js import Promise
run_sync(Promise.resolve(1))
`;

  const TEXT = {
    fr: {
      loading: "Chargement de l'environnement Python…",
      fetching: "Récupération du script du jeu…",
      starting: "Démarrage de la partie…",
      error: "Une erreur est survenue : ",
      done: "Partie terminée.",
      submit: "Envoyer",
      fallbackNotice:
        "Votre navigateur ne permet pas la saisie intégrée à la page ; les déplacements se feront via des fenêtres de dialogue (prompt), qui masqueront la grille pendant la saisie.",
    },
    en: {
      loading: "Loading Python environment…",
      fetching: "Fetching the game script…",
      starting: "Starting the game…",
      error: "An error occurred: ",
      done: "Game finished.",
      submit: "Send",
      fallbackNotice:
        "Your browser doesn't support the in-page input; moves will use dialog boxes (prompt) instead, which will hide the grid while you answer.",
    },
  };

  const STYLE_ID = "drone-game-styles";
  const CSS = `
.drone-game{margin:2rem 0;padding:1.25rem;border:1px solid #333;border-radius:8px;background:#0b0b0d;}
.drone-game-intro{color:#ccc;font-size:0.95rem;line-height:1.5;margin:0 0 1rem;}
.drone-game-rules{color:#ccc;font-size:0.88rem;line-height:1.5;margin:0 0 1rem;padding:0.85rem 1rem;background:#141416;border:1px solid #2a2a2e;border-radius:6px;}
.drone-game-rules p{margin:0 0 0.5rem;font-weight:600;color:#eee;}
.drone-game-rules ul{margin:0;padding-left:1.2rem;}
.drone-game-rules li{margin-bottom:0.35rem;}
.drone-game-rules code{background:#232326;padding:0.05rem 0.35rem;border-radius:4px;font-size:0.85em;}
.drone-game-play,.drone-game-replay,.drone-game-input-form button{font:inherit;padding:0.6rem 1.2rem;border-radius:6px;border:1px solid #555;background:#1a1a1e;color:#eee;cursor:pointer;}
.drone-game-play:hover,.drone-game-replay:hover,.drone-game-input-form button:hover{background:#26262b;}
.drone-game-play:disabled{opacity:0.6;cursor:wait;}
.drone-game-status{color:#9aa0a6;font-size:0.9rem;margin:0.75rem 0 0;min-height:1.2em;}
.drone-game-terminal{margin-top:1rem;padding:0.85rem;background:#050506;color:#d6d6d6;font-family:ui-monospace,SFMono-Regular,Consolas,"Liberation Mono",Menlo,monospace;font-size:0.82rem;line-height:1.4;white-space:pre;overflow-x:auto;-webkit-overflow-scrolling:touch;max-height:26rem;overflow-y:auto;border:1px solid #222;border-radius:6px;}
.drone-game-input-form{display:flex;flex-wrap:wrap;align-items:center;gap:0.6rem;margin-top:0.85rem;padding:0.75rem;background:#141416;border:1px solid #2a2a2e;border-radius:6px;}
.drone-game-input-form[hidden]{display:none;}
.drone-game-input-label{flex:1 1 100%;color:#eee;font-size:0.9rem;}
.drone-game-input-field{font:inherit;padding:0.45rem 0.7rem;border-radius:5px;border:1px solid #555;background:#0b0b0d;color:#eee;min-width:10rem;flex:1 1 auto;}
.drone-game-controls{margin-top:1rem;}
.drone-game-fallback-notice{color:#c99a4b;font-size:0.85rem;margin-top:0.6rem;}
@media (max-width:40rem){
.drone-game-terminal{font-size:0.62rem;max-height:20rem;}
}
`;

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  let loaderPromise = null;
  function loadPyodideLoader() {
    if (loaderPromise) return loaderPromise;
    loaderPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = PYODIDE_JS_URL;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load Pyodide from ${PYODIDE_JS_URL}`));
      document.head.appendChild(script);
    });
    return loaderPromise;
  }

  function appendLine(terminal, msg) {
    terminal.textContent += (terminal.textContent ? "\n" : "") + msg;
    terminal.scrollTop = terminal.scrollHeight;
  }

  // Real on-page input, shown right next to the terminal so the grid stays visible
  // the whole time. Returns a promise resolved with the field's value on submit.
  function makeAsyncInput(container) {
    const form = container.querySelector(".drone-game-input-form");
    const label = container.querySelector(".drone-game-input-label");
    const field = container.querySelector(".drone-game-input-field");
    return (promptText) =>
      new Promise((resolve) => {
        label.textContent = promptText;
        field.value = "";
        form.hidden = false;
        field.focus();
        function onSubmit(e) {
          e.preventDefault();
          form.removeEventListener("submit", onSubmit);
          form.hidden = true;
          resolve(field.value);
        }
        form.addEventListener("submit", onSubmit);
      });
  }

  async function jspiSupported(pyodide) {
    try {
      await pyodide.runPythonAsync(JSPI_PROBE);
      return true;
    } catch (err) {
      return false;
    }
  }

  async function runGame(container, lang) {
    const t = TEXT[lang] || TEXT.fr;
    const playBtn = container.querySelector(".drone-game-play");
    const replayBtn = container.querySelector(".drone-game-replay");
    const controls = container.querySelector(".drone-game-controls");
    const terminal = container.querySelector(".drone-game-terminal");
    const status = container.querySelector(".drone-game-status");
    const inputForm = container.querySelector(".drone-game-input-form");
    const fallbackNotice = container.querySelector(".drone-game-fallback-notice");

    playBtn.disabled = true;
    playBtn.hidden = true;
    controls.hidden = true;
    replayBtn.hidden = true;
    terminal.hidden = false;
    terminal.textContent = "";
    inputForm.hidden = true;
    fallbackNotice.hidden = true;
    status.textContent = t.loading;

    try {
      await loadPyodideLoader();
      // Fresh interpreter per (re)play instead of trying to reset in-memory game state.
      const pyodide = await window.loadPyodide();

      pyodide.setStdout({ batched: (msg) => appendLine(terminal, msg) });
      pyodide.setStderr({ batched: (msg) => appendLine(terminal, msg) });
      pyodide.FS.writeFile("config.json", JSON.stringify(CONFIG));

      status.textContent = t.fetching;
      const res = await fetch(SCRIPT_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${SCRIPT_URL}`);
      const source = await res.text();

      status.textContent = t.starting;
      // Runs the real, unmodified drone-rescue.py. input() is patched above to
      // suspend Python execution (via JSPI) until the on-page form is submitted,
      // without blocking the browser or hiding the grid; falls back to a plain
      // prompt() only if the browser lacks JSPI support.
      if (await jspiSupported(pyodide)) {
        window.__droneGameAsyncInput = makeAsyncInput(container);
        pyodide.runPython(JSPI_INPUT_SHIM);
        await pyodide.runPythonAsync(source);
      } else {
        fallbackNotice.hidden = false;
        fallbackNotice.textContent = t.fallbackNotice;
        pyodide.runPython(PROMPT_INPUT_SHIM);
        pyodide.runPython(source);
      }

      status.textContent = t.done;
    } catch (err) {
      appendLine(terminal, t.error + (err && err.message ? err.message : String(err)));
      status.textContent = "";
    } finally {
      inputForm.hidden = true;
      controls.hidden = false;
      replayBtn.hidden = false;
      playBtn.disabled = false;
    }
  }

  function init() {
    const containers = document.querySelectorAll(".drone-game");
    if (!containers.length) return;
    injectStyles();
    containers.forEach((container) => {
      const lang = container.getAttribute("data-lang") === "en" ? "en" : "fr";
      const t = TEXT[lang] || TEXT.fr;
      const playBtn = container.querySelector(".drone-game-play");
      const replayBtn = container.querySelector(".drone-game-replay");
      const submitBtn = container.querySelector(".drone-game-input-form button");
      if (submitBtn) submitBtn.textContent = t.submit;
      if (playBtn) playBtn.addEventListener("click", () => runGame(container, lang));
      if (replayBtn) replayBtn.addEventListener("click", () => runGame(container, lang));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
