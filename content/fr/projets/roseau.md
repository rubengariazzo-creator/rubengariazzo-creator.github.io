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
  - src: "assets/img/roseau/rafale-dessous.jpg"
    alt: "Rendu 3D du parapluie ROSEAU vu de dessous pendant une rafale : une part de la toile se soulève et la baleine se libère sans rien casser"
  - src: "assets/img/roseau/ouvert-dessous.jpg"
    alt: "Rendu 3D du parapluie ROSEAU ouvert, vu de dessous, avec une liaison fusible verte sur chaque baleine"
  - src: "assets/img/roseau/demonstrateur.jpg"
    alt: "Le démonstrateur à l'échelle 1 : potence, baleine, chape verte et tige-fusible orange"
  - src: "assets/img/roseau/liaison-eclatee.jpg"
    alt: "Éclaté de la liaison fusible : chape collée sur la baleine, axe Ø3 et pince élastique au bout de la tige"
  - src: "assets/img/roseau/liaison-detail.jpg"
    alt: "Détail de la liaison : la pince élastique clipsée sur l'axe de la chape"
  - src: "assets/img/roseau/demonstrateur-libere.jpg"
    alt: "Démonstrateur après déclenchement : la tige a quitté l'axe et la baleine pivote librement, sans casse"
  - src: "assets/img/roseau/principe.jpg"
    alt: "Principe de fonctionnement en trois temps : la pince tient par vent ordinaire, s'ouvre en rafale, se reclipse à la main"
  - src: "assets/img/roseau/effort-rafale.jpg"
    alt: "Courbe de l'effort de rafale dans la tige de rappel en fonction de la vitesse du vent, avec les seuils des trois réglages de la pince"
  - src: "assets/img/roseau/pieuvre.jpg"
    alt: "Diagramme pieuvre du parapluie : fonctions principales et fonctions contraintes reliées aux éléments du milieu extérieur"
  - src: "assets/img/roseau/cahier-des-charges.jpg"
    alt: "Cahier des charges fonctionnel chiffré : fonctions, critères, niveaux et flexibilité"
  - src: "assets/img/roseau/ishikawa.jpg"
    alt: "Diagramme d'Ishikawa des causes de casse d'un parapluie, classées selon les 6M"
  - src: "assets/img/roseau/pareto.jpg"
    alt: "Diagramme de Pareto des treize causes de casse, classées par criticité"
  - src: "assets/img/roseau/carte-mentale.jpg"
    alt: "Carte mentale des 50 idées en sept familles et méthode de l'inversion"
  - src: "assets/img/roseau/triz.jpg"
    alt: "Analyse TRIZ : contradiction technique, contradiction physique et principes d'invention retenus"
  - src: "assets/img/roseau/croquis.jpg"
    alt: "Croquis à main levée des sept concepts étudiés"
  - src: "assets/img/roseau/pugh.jpg"
    alt: "Matrice de Pugh pondérée comparant les sept concepts au parapluie pliant standard"
  - src: "assets/img/roseau/fast.jpg"
    alt: "Diagramme FAST : fonctions de service, fonctions techniques et solutions"
  - src: "assets/img/roseau/plan-ensemble.jpg"
    alt: "Plan d'ensemble coté du démonstrateur : vue de face et coupe de l'axe supérieur"
  - src: "assets/img/roseau/plan-pince.jpg"
    alt: "Plan coté de la tige-fusible et de sa pince élastique, avec le détail de la lèvre"
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
ROSEAU est un projet personnel de conception : repenser la liaison entre la baleine et la tige d'un parapluie pour qu'une rafale de trop ne coûte plus un parapluie, seulement un « clic ». Je l'ai mené seul à l'automne 2026, de l'identification du besoin jusqu'à une maquette modélisée, dimensionnée et prête à imprimer.

## Le problème

Dix millions de parapluies sont jetés chaque année en France et environ un milliard dans le monde. Faits de plastique, d'acier et de nylon sertis ensemble, ils ne sont presque jamais recyclés. Les réparateurs convergent sur la panne typique : la rupture d'une articulation entre la baleine et la tige, ou de son rivet, là où se concentre l'effort d'une rafale. Les parapluies « tempête » existants résistent en étant plus rigides, plus lourds et plus chers, sans être réparables.

## Le besoin

Plutôt que la « bête à cornes », j'ai utilisé l'analyse fonctionnelle par les éléments du milieu extérieur et le diagramme pieuvre. Deux fonctions principales : protéger l'utilisateur de la pluie, et rester protégé malgré les rafales, sans détérioration du produit. Le cahier des charges chiffré fixe le niveau à atteindre : aucune déformation jusqu'à 50 km/h, aucune pièce cassée ni projetée à 100 km/h, remise en service en moins de 10 s, sous 50 N et sans outil, surcoût inférieur à 1 €.

## De la cause à la solution

Un diagramme d'Ishikawa a recensé treize causes de casse, classées par criticité dans un diagramme de Pareto : la liaison rigide sans élément fusible et les articulations rivetées pèsent à elles seules 47 % de la criticité, et quatre causes en font 64 %. Cinquante idées de brainstorming, la méthode de l'inversion (« comment être sûr que le parapluie casse au premier coup de vent ? ») et l'analyse TRIZ ont fait émerger la piste : une liaison qui cède sous un seuil connu puis se reclipse, comme le fusible électrique ou la fixation de ski à déclenchement calibré. Sept concepts dessinés à main levée ont été comparés par une matrice de Pugh pondérée : la liaison fusible arrive première, et une seconde matrice retient la pince élastique imprimée parmi cinq technologies de fusible.

## Le principe

Sur chaque baleine, une chape collée porte un axe acier de 3 mm. La tige de rappel se termine par une pince élastique en U qui se clipse sur cet axe. Par vent ordinaire, la pince transmet l'effort d'ouverture et le parapluie se comporte comme un modèle classique. Lorsqu'une rafale soulève la toile, l'effort dans la tige augmente ; au-delà du seuil, les bras de la pince s'écartent et la baleine pivote librement : rien ne casse et rien ne part. Parapluie fermé, l'utilisateur repousse la pince sur l'axe d'un geste.

## Le dimensionnement

Le dimensionnement est un modèle analytique (mécanique des fluides simplifiée et résistance des matériaux), pas une simulation par éléments finis. À 50 km/h, la poussée du vent sur la part de toile portée par une baleine est de 8,2 N, soit 22 N dans la tige de rappel ; l'effort croît comme le carré de la vitesse et atteint 89 N à 100 km/h. Chaque bras de la pince est une poutre en PETG qui doit s'écarter de 0,55 mm pour libérer l'axe : le seuil d'extraction est de 32 N, soit un déclenchement vers 60 km/h. Deux autres réglages l'encadrent (24 N, soit 52 km/h, et 42 N, soit 69 km/h). La déformation des bras reste de 2,5 %, sous la limite de 3 % d'un clip réutilisable, et le réarmement demande 32 N, sous les 50 N exigés. Sans le fusible, la contrainte dans une baleine en fibre de verre atteindrait 870 MPa à 100 km/h, au-dessus de sa résistance.

## La maquette

Le démonstrateur reproduit à l'échelle 1 la liaison fusible d'une baleine : potence, baleine raccourcie, chape, axe et tige-fusible. Il tient en 9 pièces imprimables en PETG et en PLA, pour environ 67 g de filament, modélisées de façon paramétrique : les calculs, les plans cotés et les fichiers d'impression partagent les mêmes cotes. Les [9 fichiers STL sont à télécharger en archive](/assets/downloads/roseau/roseau-fichiers-stl.zip), avec la notice de fabrication et de montage et le dossier de plans ci-dessous.

## Limites et suites

La validation est analytique : toutes les exigences chiffrées sont satisfaites par le calcul, mais aucun essai physique n'est présenté ici. Le seuil dépend du frottement de la pince sur l'axe, ce qui justifie les trois réglages d'ouverture des lèvres. Les suites possibles sont un prototype avec de vraies baleines en fibre de verre, une version 2 à bille et ressort réglable et un kit de réparation (baleines, embouts et fusibles clipsables). Les sources sont listées dans le rapport.
