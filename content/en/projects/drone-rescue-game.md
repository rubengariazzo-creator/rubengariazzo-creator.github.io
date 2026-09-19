---
layout: layouts/project.njk
translationKey: jeu-de-drones
category: "Programming"
thumbnail: "assets/img/jeu-de-drones/schema-boucle-jeu-thumb.png"
title: "Drone rescue game"
description: "A Python game: autonomous drones must rescue survivors on a grid and deliver them to a hospital while avoiding hazards."
logos:
  - src: "assets/img/logos/epf.png"
    alt: "EPF engineering school logo"
hero:
  type: image
  src: "assets/img/jeu-de-drones/schema-boucle-jeu-en.png"
  alt: "Game loop diagram (from the French report): drone phase, grid update, storm phase, and collision handling"
downloads:
  - label: "Project report (PDF)"
    href: /assets/downloads/jeu-de-drones/rapport.pdf
  - label: "Source code (Python)"
    href: /assets/downloads/jeu-de-drones/drone-rescue.py
cta:
  label: "See all projects"
  href: /en/projects/
---
Built with a partner, Ilyane Haida: a rescue game on a 12x12 grid, where drones must locate survivors and deliver them to a hospital while avoiding storms and buildings, under battery-life constraints.

<div class="drone-game" data-lang="en">
  <p class="drone-game-intro">Play directly in your browser: this widget actually runs the Python script below (unmodified, fetched live) using <strong>Pyodide</strong> (CPython compiled to WebAssembly) — nothing to install. Drone moves are entered through your browser's dialog boxes (<code>prompt</code>): click "Play the game", then answer the prompts that appear one after another, turn by turn.</p>
  <button type="button" class="drone-game-play">Play the game</button>
  <p class="drone-game-status"></p>
  <pre class="drone-game-terminal" hidden></pre>
  <div class="drone-game-controls" hidden>
    <button type="button" class="drone-game-replay" hidden>Play again</button>
  </div>
</div>
<script src="/assets/js/drone-game.js" defer></script>

## Architecture

The program is structured in five parts: configuration loading (JSON), random entity placement, display functions, the movement/rules engine, and scoring, documented in detail in the project report.
