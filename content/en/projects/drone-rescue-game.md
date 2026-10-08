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
With my partner Ilyane Haida, I programmed a rescue game on a 12x12 grid. Drones have to locate survivors and bring them to a hospital while avoiding storms and buildings, on a battery that keeps draining.

<div class="drone-game" data-lang="en">
  <p class="drone-game-intro">You can play right in your browser. This widget actually runs the Python script below (unmodified, fetched live) using <strong>Pyodide</strong> (CPython compiled to WebAssembly), with nothing to install. Moves are entered in the field that appears below the grid, and it stays visible the whole time you're answering.</p>
  <div class="drone-game-rules">
    <p>The rules in short.</p>
    <ul>
      <li>The grid is 12×12, with columns <code>A</code> to <code>L</code> and rows <code>0</code> to <code>11</code>.</li>
      <li>On the grid, <code>B</code> is a building, <code>H</code> the hospital, <code>S</code> a survivor, <code>T</code> a storm and <code>D</code> a drone.</li>
      <li>Each turn, move up to 3 drones by one square (diagonals included) to pick up survivors and bring them to the hospital.</li>
      <li>Each move costs 1 battery point (+2 to pick up a survivor); battery recharges at the hospital.</li>
      <li>A storm disables any active drone it touches while moving, for 2 turns.</li>
      <li>Each survivor delivered to the hospital earns 1 point. The game ends when all survivors are saved, when all drones are down, or after 40 turns.</li>
      <li>To play, enter the ID of the drone to move (or <code>f</code> to end the turn), then its destination as <code>column row</code>, for example <code>C 5</code>.</li>
    </ul>
  </div>
  <button type="button" class="drone-game-play">Play the game</button>
  <p class="drone-game-status" aria-live="polite"></p>
  <pre class="drone-game-terminal" hidden></pre>
  <form class="drone-game-input-form" hidden>
    <label class="drone-game-input-label" for="drone-game-input"></label>
    <input type="text" id="drone-game-input" class="drone-game-input-field" autocomplete="off">
    <button type="submit">Send</button>
  </form>
  <p class="drone-game-fallback-notice" hidden></p>
  <div class="drone-game-controls" hidden>
    <button type="button" class="drone-game-replay" hidden>Play again</button>
  </div>
</div>
<script src="/assets/js/drone-game.js" defer></script>

## Architecture

The program comes in five parts, configuration loading (JSON), random entity placement, display functions, the movement and rules engine, and scoring. The project report documents each of them in detail.
