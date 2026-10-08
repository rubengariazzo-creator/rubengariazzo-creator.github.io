---
layout: layouts/project.njk
order: 3
translationKey: jeu-de-drones
category: "Programmation"
thumbnail: "assets/img/jeu-de-drones/schema-boucle-jeu-thumb.png"
title: "Jeu de sauvetage par drones"
description: "Jeu en Python : des drones autonomes doivent secourir des survivants sur une grille et les acheminer vers un hôpital en évitant les dangers."
logos:
  - src: "assets/img/logos/epf.png"
    alt: "Logo EPF, école d'ingénieurs"
    url: "https://www.epf.fr"
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
Avec Ilyane Haida, en binôme, nous avons programmé un jeu de sauvetage sur une grille de 12x12 cases. Des drones doivent localiser des survivants et les amener à un hôpital en évitant les tempêtes et les bâtiments, avec une batterie qui s'épuise.

<div class="drone-game" data-lang="fr">
  <p class="drone-game-intro">Vous pouvez y jouer directement dans le navigateur. Ce module exécute réellement le script Python ci-dessous (inchangé, téléchargé en direct) grâce à <strong>Pyodide</strong> (CPython compilé en WebAssembly), sans rien installer. Les déplacements se saisissent dans le champ qui apparaît sous la grille, et il reste visible pendant que vous répondez.</p>
  <div class="drone-game-rules">
    <p>Les règles du jeu en bref.</p>
    <ul>
      <li>La grille fait 12×12, avec les colonnes <code>A</code> à <code>L</code> et les lignes <code>0</code> à <code>11</code>.</li>
      <li>Sur la grille, <code>B</code> est un bâtiment, <code>H</code> l'hôpital, <code>S</code> un survivant, <code>T</code> une tempête et <code>D</code> un drone.</li>
      <li>Chaque tour, déplacez jusqu'à 3 drones d'une case (diagonales incluses) pour récupérer les survivants et les ramener à l'hôpital.</li>
      <li>Chaque déplacement coûte 1 point de batterie (+2 pour récupérer un survivant) ; la batterie se recharge sur l'hôpital.</li>
      <li>Une tempête désactive pendant 2 tours tout drone actif qu'elle touche en se déplaçant.</li>
      <li>Chaque survivant déposé à l'hôpital rapporte 1 point. La partie s'arrête quand tous les survivants sont sauvés, quand tous les drones sont hors service ou après 40 tours.</li>
      <li>Pour jouer, entrez l'identifiant du drone à déplacer (ou <code>f</code> pour finir le tour), puis sa destination au format <code>colonne ligne</code>, par exemple <code>C 5</code>.</li>
    </ul>
  </div>
  <button type="button" class="drone-game-play">Lancer le jeu</button>
  <p class="drone-game-status" aria-live="polite"></p>
  <pre class="drone-game-terminal" hidden></pre>
  <form class="drone-game-input-form" hidden>
    <label class="drone-game-input-label" for="drone-game-input"></label>
    <input type="text" id="drone-game-input" class="drone-game-input-field" autocomplete="off">
    <button type="submit">Envoyer</button>
  </form>
  <p class="drone-game-fallback-notice" hidden></p>
  <div class="drone-game-controls" hidden>
    <button type="button" class="drone-game-replay" hidden>Rejouer</button>
  </div>
</div>
<script src="/assets/js/drone-game.js" defer></script>

## Architecture

Le programme tient en cinq parties, le chargement de la configuration (JSON), le placement aléatoire des entités, les fonctions d'affichage, le moteur de déplacement et de règles, et le système de score. Le rapport de projet les détaille toutes.
