---
layout: layouts/project.njk
order: 2
translationKey: icarus
category: "Aérospatial"
thumbnail: "assets/img/icarus/IMG_6473.jpg"
title: "Icarus : mini-fusée lancée au C'Space 2026"
description: "Icarus, mini-fusée d'EPF Astronomie lancée au C'Space 2026 (CNES, Planète Sciences) : coiffe CAO imprimée en 3D, simulations StabTraj et animation Blender."
logos:
  - src: "assets/img/logos/epf.png"
    alt: "Logo EPF, école d'ingénieurs"
    url: "https://www.epf.fr"
  - src: "assets/img/logos/epf-astronomie.jpg"
    alt: "Logo EPF Astronomie, club aérospatial de l'EPF"
    url: "https://www.linkedin.com/company/epf-astronomie"
hero:
  scrollDriven: true
  src: /assets/video/icarus/icarus-3d-hero.mp4
  srcMobile: /assets/video/icarus/icarus-3d-hero-mobile.mp4
  poster: /assets/img/icarus/hero-poster.jpg
  alt: "Animation 3D de la fusée Icarus, qui avance au fil du défilement puis se lance"
gallery:
  - src: "assets/img/icarus/IMG_6473.jpg"
    alt: "La fusée Icarus assemblée avant le lancement"
  - src: "assets/img/icarus/IMG_6474.jpg"
    alt: "Vue rapprochée de la fusée Icarus"
  - src: "assets/img/icarus/IMG_6475.jpg"
    alt: "La fusée Icarus sur son pas de tir"
  - src: "assets/img/icarus/attestation-de-vol.jpg"
    alt: "Attestation de vol officielle de la fusée Icarus"
    link: /assets/img/icarus/attestation-de-vol.jpg
    linkLabel: "Voir l'attestation de vol"
stats:
  - value: "230 m"
    label: "Apogée prédite"
  - value: "6.20–6.52"
    label: "Marge de stabilité (calibres)"
  - value: "74 m/s"
    label: "Vitesse maximale"
  - value: "1,14 m"
    label: "Longueur"
  - value: "1,66 kg"
    label: "Masse au décollage"
  - value: "31 s"
    label: "Durée du vol prévue"
downloads:
  - label: "Plan technique de la coiffe (PDF)"
    href: /assets/downloads/icarus/plan-coiffe.pdf
  - label: "Résultats de stabilité et trajectoire (PDF)"
    href: /assets/downloads/icarus/stabilite-trajectoire-fr.pdf
cta:
  label: "Voir les projets"
  href: /projets/
---
Icarus est une mini-fusée expérimentale conçue, fabriquée et lancée avec un vol nominal lors du C'Space 2026, la campagne de lancement étudiante organisée par le CNES et Planète Sciences au camp militaire de Ger, avec le soutien du 1er RHP.

Le projet a été mené en équipe de cinq au sein d'EPF Astronomie, le club aérospatial de l'EPF : Camille Gaudeaux (cheffe de projet), Margaux Vahlas, Chimène Tabaste, Ambroise Denduang Wolber et moi-même.

## La fusée

Icarus mesure 1,14 m pour 1,66 kg au décollage (1,50 kg sans moteur). Elle est propulsée par un moteur Pandora (Pro24-6G), stabilisée par quatre ailerons et coiffée d'une ogive pointue. Elle décolle d'une rampe de 2,5 m inclinée à 80° et redescend sous un parachute en croix de 0,26 m².

## Ma contribution

- **La coiffe** : modélisée sous CATIA, une ogive de 210 mm dimensionnée pour le diamètre de 83 mm du corps, puis imprimée en 3D en PETG (6 h 44 d'impression). Son plan technique est téléchargeable plus bas.
- **Les pièces de structure** : impression 3D de la cage de fixation des ailerons (PLA, 6 h 37 d'impression) et des bagues de maintien du moteur (PETG, 1 h 36).
- **La dynamique de vol** : simulations de stabilité et de trajectoire avec StabTraj, l'outil de référence de Planète Sciences, pour confirmer qu'Icarus suivrait un vol rectiligne et nominal plutôt que de partir en vrille.
- **L'animation 3D** : réalisée sous Blender et déclinée en plusieurs formats (écrans TV, bornes, réseaux sociaux), tenue secrète jusqu'à sa révélation à la rentrée.

## Stabilité et trajectoire

Les simulations respectent les critères de stabilité de Planète Sciences : une finesse de 14,3 (attendue entre 10 et 20), une portance (Cnα) de 21 (entre 15 et 30) et une marge statique de 6,2 à 6,5 calibres selon que le moteur est plein ou vide. Cette marge dépasse légèrement le maximum conseillé de 6 : le verdict est « surstable », c'est-à-dire une fusée très stable en vol, avec une tendance à s'orienter face au vent.

Côté trajectoire : sortie de rampe à 23 m/s, vitesse maximale de 74 m/s, accélération maximale de 135 m/s² (près de 14 g) et apogée à 230 m au bout de 6,7 s. Le parachute s'ouvre à 8 s et ramène la fusée à 9,9 m/s, pour un vol complet de 31 s. Sans parachute, l'impact se ferait à 56 m/s avec une énergie de près de 2 500 J : c'est tout l'enjeu du système de récupération.

Le détail complet des résultats est disponible ci-dessous.

## Le vol

Icarus a décollé à l'été 2026 lors du C'Space, au camp de Ger, pour un vol nominal confirmé par l'attestation de vol officielle (voir la galerie).

## Presse et mentions

Annoncé sur LinkedIn : [« Nominal flight achieved! » (Icarus au C'Space 2026)](https://www.linkedin.com/feed/update/urn:li:activity:7506806576557613056/), avec l'animation 3D du projet et les réactions de l'équipe EPF Astronomie.
