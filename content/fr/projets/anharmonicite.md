---
layout: layouts/project.njk
translationKey: anharmonicite
category: "Recherche"
thumbnail: "assets/img/anharmonicite/tracker-pointage.png"
title: "Anharmonicité d'un cône basculant"
description: "Étude physique indépendante : inertie, anisotropie et dissipation d'un plateau conique qui bascule sur une table, validée par vidéo et analyse spectrale."
hero:
  type: image
  src: "assets/img/anharmonicite/tracker-pointage.png"
  alt: "Pointage vidéo du basculement du plateau sous Tracker : position, vitesse et accélération angulaire extraites image par image"
gallery:
  - src: "assets/img/anharmonicite/figures-matlab.png"
    alt: "Graphiques MATLAB : évolution de la fréquence, pente d'anharmonicité et dissipation de l'amplitude au cours du temps"
downloads:
  - label: "Feuille de calculs complète (PDF)"
    href: /assets/downloads/anharmonicite/feuille-de-calculs.pdf
cta:
  label: "Voir les projets"
  href: /projets/
---
Étude physique indépendante du basculement libre d'un plateau conique en verre (tronc de cône retourné à base circulaire, masse M = 1,087 kg, rayon de base R = 0,16 m) posé sur une table.

## Modèle théorique

Le moment d'inertie du tronc de cône est calculé en coordonnées polaires à partir de sa masse surfacique. L'axe de rotation réel n'est pas le centre du plateau mais le point de contact au sol, décalé du centre de masse d'une distance d confirmée expérimentalement à environ 2,94 cm par le pointage vidéo : le théorème de Huygens-Steiner donne alors l'inertie réelle au pivot, I ≈ 0,01485 kg·m².

Le tronc de cône ayant une section elliptique, son rayon de courbure diffère selon le petit axe et le grand axe de l'ellipse : la raideur de rappel, et donc la fréquence d'oscillation, dépend de l'axe de basculement (anisotropie). Le théorème du moment cinétique appliqué au pivot montre que seul le couple dû à ce décalage d du centre de masse met le système en mouvement.

## Validation expérimentale

Le mouvement réel du plateau a été pointé image par image sous Tracker (logiciel libre d'analyse vidéo) pour extraire position, vitesse et accélération angulaire. En parallèle, le bruit de contact a été enregistré et analysé sous MATLAB par transformée de Fourier à court terme (STFT), pour suivre l'évolution de la fréquence dans le temps malgré l'amortissement et l'anharmonicité.

## Résultats

- Fréquence moyenne 26,68 Hz, constante de temps τ = 62,55 s, facteur de qualité Q ≈ 5243.
- Pente d'anharmonicité (fréquence en fonction de l'amplitude) positive, +0,2708 Hz/u.a. : signature d'un puits de potentiel durcissant, cohérente avec la géométrie conique où la force de rappel croît plus vite que linéairement avec l'écart à l'équilibre.
- La dissipation d'énergie estimée directement à partir du pointage vidéo brut donnait un résultat aberrant (4 J/s), faussé par le bruit de mesure du pointage manuel. En passant par la loi de décroissance exponentielle de l'énergie déduite de τ, la puissance dissipée est estimée à 0,0363 W, plus précise que l'ajustement global MATLAB initial (0,067 W).
