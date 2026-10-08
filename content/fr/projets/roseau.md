---
layout: layouts/project.njk
order: 11
translationKey: roseau
category: "Mécanique"
thumbnail: "assets/img/roseau/rafale-dessous.jpg"
title: "ROSEAU : un parapluie qui plie mais ne rompt pas"
description: "ROSEAU, projet personnel de conception : une pince élastique calibrée lâche la baleine d'un parapluie vers 60 km/h au lieu de la laisser casser, puis se reclipse."
hero:
  type: image
  src: "assets/img/roseau/rafale-dessous.jpg"
  alt: "Rendu 3D du parapluie ROSEAU pendant une rafale : une part de la toile se soulève, la baleine est libérée de sa tige"
galleryTiles: true
gallery:
  - src: "assets/img/roseau/plan-ensemble.jpg"
    alt: "Plan d'ensemble coté du démonstrateur : vue de face et coupe de l'axe supérieur"
  - src: "assets/img/roseau/principe.jpg"
    alt: "Principe de fonctionnement en trois temps : la pince tient par vent ordinaire, s'ouvre en rafale, se reclipse à la main"
  - src: "assets/img/roseau/demonstrateur.jpg"
    alt: "Le démonstrateur à l'échelle 1 : potence, baleine, chape verte et tige-fusible orange"
  - src: "assets/img/roseau/effort-rafale.jpg"
    alt: "Courbe de l'effort de rafale dans la tige de rappel en fonction de la vitesse du vent, avec les seuils des trois réglages de la pince"
stats:
  - value: "10 M"
    label: "Parapluies jetés par an en France"
  - value: "60 km/h"
    label: "Déclenchement de la pince"
  - value: "32 N"
    label: "Seuil du fusible"
  - value: "22 N"
    label: "Effort dans la tige à 50 km/h"
  - value: "0,70 €"
    label: "Surcoût estimé (8 baleines)"
  - value: "67 g"
    label: "Filament de la maquette"
stlModels:
  - src: "/assets/models/roseau/roseau-demonstrateur.3mf"
    label: "Démonstrateur en éclaté et assemblé (glisser pour orbiter)"
    mode: explode
    toggle: ["Éclater", "Assembler"]
    download:
      href: /assets/downloads/roseau/roseau-fichiers-stl.zip
      label: "Télécharger les STL"
    config:
      start: 1
      zUp: true
      offsets:
        R12_potence: [0, 0, 0]
        R14_rondelle: [0, -20, 0]
        R10_baleine: [0, -44, 0]
        R04D_tige_fusible_B_nominal: [0, -44, 0]
        R03M_chape: [-7.25, -44, -27.05]
        R09_axe: [-7.25, -72, -27.05]
        R15_capuchon: [0, -80, 0]
      colors:
        R12_potence: "#8d96a3"
        R10_baleine: "#d8d4c8"
        R14_rondelle: "#d8d4c8"
        R15_capuchon: "#d8d4c8"
        R03M_chape: "#2a9d8f"
        R04D_tige_fusible_B_nominal: "#f08a3c"
        R09_axe: "#c4cad3"
downloads:
  - label: "Rapport de projet (PDF)"
    href: /assets/downloads/roseau/rapport-projet.pdf
  - label: "Dossier de plans cotés (PDF)"
    href: /assets/downloads/roseau/dossier-plans.pdf
  - label: "Notice de fabrication et de montage (PDF)"
    href: /assets/downloads/roseau/notice-fabrication-montage.pdf
cta:
  label: "Voir les projets"
  href: /projets/
---
ROSEAU est mon projet personnel de conception. Je voulais repenser la liaison entre la baleine et la tige d'un parapluie, pour qu'une rafale de trop ne coûte plus un parapluie mais seulement un « clic ». Je l'ai mené seul à l'automne 2026, du besoin jusqu'à une maquette modélisée, dimensionnée et prête à imprimer.

{% include "partials/stl-viewers.njk" %}

Le visualiseur ci-dessus montre le montage en vue éclatée, avec un bouton pour le voir assemblé et un autre pour télécharger les 9 fichiers STL. La notice de fabrication et le dossier de plans se trouvent plus bas, dans les documents.

## Le problème

Dix millions de parapluies sont jetés chaque année en France et environ un milliard dans le monde. Faits de plastique, d'acier et de nylon sertis ensemble, ils ne sont presque jamais recyclés. Les réparateurs sont d'accord sur la panne typique. C'est la rupture de l'articulation entre la baleine et la tige, ou de son rivet, juste là où la rafale concentre son effort. Les parapluies « tempête » existants résistent en étant plus rigides, plus lourds et plus chers, et sans être réparables.

## Le besoin

Plutôt que la « bête à cornes », j'ai décrit le besoin par les éléments du milieu extérieur, avec un diagramme pieuvre. J'en ai tiré deux fonctions principales, protéger l'utilisateur de la pluie et le protéger encore malgré les rafales, sans abîmer le produit. Le cahier des charges chiffré fixe le niveau à atteindre. Il ne doit y avoir aucune déformation jusqu'à 50 km/h, aucune pièce cassée ni projetée à 100 km/h, une remise en service en moins de 10 s, sous 50 N et sans outil, et un surcoût inférieur à 1 €.

## De la cause à la solution

J'ai recensé treize causes de casse avec un diagramme d'Ishikawa, puis je les ai classées par criticité dans un diagramme de Pareto. La liaison rigide sans élément fusible et les articulations rivetées pèsent à elles seules 47 % de la criticité, et quatre causes en font 64 %. Cinquante idées de brainstorming, la méthode de l'inversion (« comment être sûr que le parapluie casse au premier coup de vent ? ») et l'analyse TRIZ m'ont mené à une piste. Il faut une liaison qui cède sous un seuil connu puis se reclipse, comme le fusible électrique ou la fixation de ski à déclenchement calibré. J'ai comparé sept concepts dessinés à main levée avec une matrice de Pugh pondérée. La liaison fusible arrive première, et une seconde matrice retient la pince élastique imprimée parmi cinq technologies de fusible.

## Le principe

Sur chaque baleine, une chape collée porte un axe acier de 3 mm. La tige de rappel se termine par une pince élastique en U qui se clipse sur cet axe. Par vent ordinaire, la pince transmet l'effort d'ouverture et le parapluie se comporte comme un modèle classique. Quand une rafale soulève la toile, l'effort dans la tige augmente. Au-delà du seuil, les bras de la pince s'écartent et la baleine pivote librement. Rien ne casse et rien ne part. Parapluie fermé, on repousse la pince sur l'axe d'un geste.

## Le dimensionnement

Mon dimensionnement repose sur un modèle analytique (mécanique des fluides simplifiée et résistance des matériaux), pas sur une simulation par éléments finis. À 50 km/h, la poussée du vent sur la part de toile portée par une baleine est de 8,2 N, soit 22 N dans la tige de rappel. L'effort croît comme le carré de la vitesse et atteint 89 N à 100 km/h. Chaque bras de la pince est une poutre en PETG qui doit s'écarter de 0,55 mm pour libérer l'axe, ce qui donne un seuil d'extraction de 32 N, soit un déclenchement vers 60 km/h. Deux autres réglages l'encadrent (24 N pour 52 km/h, et 42 N pour 69 km/h). La déformation des bras reste de 2,5 %, sous la limite de 3 % d'un clip réutilisable, et le réarmement demande 32 N, sous les 50 N exigés. Sans le fusible, la contrainte dans une baleine en fibre de verre atteindrait 870 MPa à 100 km/h, au-dessus de sa résistance.

## La maquette

Le démonstrateur reproduit à l'échelle 1 la liaison fusible d'une baleine avec une potence, une baleine raccourcie, une chape, un axe et la tige-fusible. Il tient en 9 pièces imprimables en PETG et en PLA, pour environ 67 g de filament. Je les ai modélisées de façon paramétrique, si bien que les calculs, les plans cotés et les fichiers d'impression partagent les mêmes cotes.

## Limites et suites

La validation est analytique. Toutes les exigences chiffrées sont satisfaites par le calcul, mais je ne présente aucun essai physique ici. Le seuil dépend du frottement de la pince sur l'axe, et c'est pour cela que j'ai prévu trois réglages d'ouverture des lèvres. La suite logique serait un prototype avec de vraies baleines en fibre de verre, une version 2 à bille et ressort réglable et un kit de réparation (baleines, embouts et fusibles clipsables). Les sources sont listées dans le rapport.
