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

## Architecture

The program is structured in five parts: configuration loading (JSON), random entity placement, display functions, the movement/rules engine, and scoring, documented in detail in the project report.
