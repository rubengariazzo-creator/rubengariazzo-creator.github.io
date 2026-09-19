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
  <p class="drone-game-intro">Jouez directement dans le navigateur : ce module exécute réellement le script Python ci-dessous (inchangé, téléchargé en direct), grâce à <strong>Pyodide</strong> (CPython compilé en WebAssembly), sans rien installer. Les déplacements se saisissent dans le champ qui apparaît sous la grille, qui reste visible pendant que vous répondez.</p>
  <div class="drone-game-rules">
    <p>Règles du jeu :</p>
    <ul>
      <li>Grille 12×12 : colonnes <code>A</code> à <code>L</code>, lignes <code>0</code> à <code>11</code>.</li>
      <li>Symboles : <code>B</code> bâtiment, <code>H</code> hôpital, <code>S</code> survivant, <code>T</code> tempête, <code>D</code> drone.</li>
      <li>Chaque tour, déplacez jusqu'à 3 drones d'une case (diagonales incluses) pour récupérer les survivants et les ramener à l'hôpital.</li>
      <li>Chaque déplacement coûte 1 point de batterie (+2 pour récupérer un survivant) ; la batterie se recharge sur l'hôpital.</li>
      <li>Une tempête désactive pendant 2 tours tout drone actif qu'elle touche en se déplaçant.</li>
      <li>+1 point par survivant déposé à l'hôpital. Fin de partie : tous les survivants sauvés, tous les drones hors service, ou 40 tours écoulés.</li>
      <li>Pour jouer : entrez l'identifiant du drone à déplacer (ou <code>f</code> pour finir le tour), puis sa destination au format <code>colonne ligne</code> (ex. <code>C 5</code>).</li>
    </ul>
  </div>
  <button type="button" class="drone-game-play">Lancer le jeu</button>
  <p class="drone-game-status"></p>
  <pre class="drone-game-terminal" hidden></pre>
  <form class="drone-game-input-form" hidden>
    <label class="drone-game-input-label"></label>
    <input type="text" class="drone-game-input-field" autocomplete="off">
    <button type="submit">Envoyer</button>
  </form>
  <p class="drone-game-fallback-notice" hidden></p>
  <div class="drone-game-controls" hidden>
    <button type="button" class="drone-game-replay" hidden>Rejouer</button>
  </div>
</div>
<script src="/assets/js/drone-game.js" defer></script>

## Architecture

Le programme est structuré en cinq parties : chargement de la configuration (JSON), placement aléatoire des entités, fonctions d'affichage, moteur de déplacement et de règles, et système de score, documentées en détail dans le rapport de projet.
