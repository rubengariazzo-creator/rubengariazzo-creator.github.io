---
layout: layouts/project.njk
translationKey: jeu-de-drones
category: "Programmation"
thumbnail: "assets/img/jeu-de-drones/schema-boucle-jeu-thumb.png"
title: "Jeu de sauvetage par drones"
description: "Jeu en Python : des drones autonomes doivent secourir des survivants sur une grille et les acheminer vers un hôpital en évitant les dangers."
logos:
  - src: "assets/img/logos/epf.png"
    alt: "Logo EPF, école d'ingénieurs"
hero:
  type: image
  src: "assets/img/jeu-de-drones/schema-boucle-jeu.png"
  alt: "Schéma de la boucle de jeu : phase drones, mise à jour de la grille, phase tempêtes et gestion des collisions"
downloads:
  - label: "Rapport du projet (PDF)"
    href: /assets/downloads/jeu-de-drones/rapport.pdf
  - label: "Code source (Python)"
    href: /assets/downloads/jeu-de-drones/drone-rescue.py
cta:
  label: "Voir les projets"
  href: /projets/
---
Projet réalisé en binôme avec Ilyane Haida : un jeu de sauvetage sur une grille de 12x12 cases, où des drones doivent localiser des survivants et les acheminer vers un hôpital tout en évitant les tempêtes et les bâtiments, sous contrainte d'autonomie de batterie.

<div class="drone-game" data-lang="fr">
  <p class="drone-game-intro">Jouez directement dans le navigateur : ce module exécute réellement le script Python ci-dessous (inchangé, téléchargé en direct), grâce à <strong>Pyodide</strong> (CPython compilé en WebAssembly), sans rien installer. Les déplacements de drones se saisissent via des fenêtres de dialogue du navigateur (<code>prompt</code>) : cliquez sur « Lancer le jeu », puis répondez aux invites qui apparaissent successivement, tour après tour.</p>
  <button type="button" class="drone-game-play">Lancer le jeu</button>
  <p class="drone-game-status"></p>
  <pre class="drone-game-terminal" hidden></pre>
  <div class="drone-game-controls" hidden>
    <button type="button" class="drone-game-replay" hidden>Rejouer</button>
  </div>
</div>
<script src="/assets/js/drone-game.js" defer></script>

## Architecture

Le programme est structuré en cinq parties : chargement de la configuration (JSON), placement aléatoire des entités, fonctions d'affichage, moteur de déplacement et de règles, et système de score, documentées en détail dans le rapport de projet.
