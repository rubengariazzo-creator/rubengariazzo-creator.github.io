---
layout: layouts/project.njk
order: 3
translationKey: jeu-de-drones
category: "Programming"
thumbnail: "assets/img/jeu-de-drones/schema-boucle-jeu-thumb.png"
title: "Drone rescue game"
description: "A Python game: autonomous drones must rescue survivors on a grid and deliver them to a hospital while avoiding hazards."
logos:
  - src: "assets/img/logos/epf.png"
    alt: "EPF engineering school logo"
    url: "https://www.epf.fr/en"
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
  <p class="drone-game-intro">Play directly in your browser: this widget actually runs the Python script below (unmodified, fetched live) using <strong>Pyodide</strong> (CPython compiled to WebAssembly), nothing to install. Moves are entered in the field that appears below the grid, which stays visible the whole time you're answering.</p>
  <div class="drone-game-rules">
    <p>Game rules:</p>
    <ul>
      <li>12×12 grid: columns <code>A</code> to <code>L</code>, rows <code>0</code> to <code>11</code>.</li>
      <li>Symbols: <code>B</code> building, <code>H</code> hospital, <code>S</code> survivor, <code>T</code> storm, <code>D</code> drone.</li>
      <li>Each turn, move up to 3 drones by one square (diagonals included) to pick up survivors and bring them to the hospital.</li>
      <li>Each move costs 1 battery point (+2 to pick up a survivor); battery recharges at the hospital.</li>
      <li>A storm disables any active drone it touches while moving, for 2 turns.</li>
      <li>+1 point per survivor delivered to the hospital. The game ends when all survivors are saved, all drones are down, or after 40 turns.</li>
      <li>To play: enter the ID of the drone to move (or <code>f</code> to end the turn), then its destination as <code>column row</code> (e.g. <code>C 5</code>).</li>
    </ul>
  </div>
  <button type="button" class="drone-game-play">Play the game</button>
  <p class="drone-game-status"></p>
  <pre class="drone-game-terminal" hidden></pre>
  <form class="drone-game-input-form" hidden>
    <label class="drone-game-input-label"></label>
    <input type="text" class="drone-game-input-field" autocomplete="off">
    <button type="submit">Send</button>
  </form>
  <p class="drone-game-fallback-notice" hidden></p>
  <div class="drone-game-controls" hidden>
    <button type="button" class="drone-game-replay" hidden>Play again</button>
  </div>
</div>
<script src="/assets/js/drone-game.js" defer></script>

## Architecture

The program is structured in five parts: configuration loading (JSON), random entity placement, display functions, the movement/rules engine, and scoring, documented in detail in the project report.
