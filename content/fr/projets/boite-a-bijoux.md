---
layout: layouts/project.njk
translationKey: boite-a-bijoux
category: "Mécanique"
thumbnail: "assets/img/boite-a-bijoux/render-cad.jpg"
title: "Boîte à bijoux"
description: "Conception CAO d'une boîte à bijoux en deux itérations : sans puis avec système de loquet, jusqu'à l'impression 3D."
logos:
  - src: "assets/img/logos/epf.png"
    alt: "Logo EPF, école d'ingénieurs"
hero:
  type: image
  src: "assets/img/boite-a-bijoux/render-cad.jpg"
  alt: "Rendu CAO de la boîte à bijoux"
gallery:
  - src: "assets/img/boite-a-bijoux/croquis-concept.jpg"
    alt: "Croquis d'exploration de forme pour la boîte à bijoux"
  - src: "assets/img/boite-a-bijoux/croquis-dimensions.jpg"
    alt: "Croquis coté du système de loquet"
  - src: "assets/img/boite-a-bijoux/cad-loquet.jpg"
    alt: "Modélisation CAO du mécanisme de loquet"
  - src: "assets/img/boite-a-bijoux/impressions-test.jpg"
    alt: "Prototypes imprimés en 3D du cylindre central à différentes tailles"
  - type: video
    src: /assets/video/boite-a-bijoux/test-choc-loquet.mp4
    poster: /assets/img/boite-a-bijoux/test-choc-loquet-poster.jpg
    alt: "Test de choc du loquet V2 (imprimé en bleu, visible sur le dessus) : chute du prototype qui reste intact"
cta:
  label: "Voir les projets"
  href: /projets/
---
Conception d'une boîte à bijoux modélisée sous CATIA, développée en deux itérations successives.

## V1, sans loquet

Première itération : un corps cylindrique et son couvercle, modélisés puis exportés en STL pour une première impression 3D.

## V2, avec loquet

Deuxième itération, réalisée en groupe (4 personnes) : ajout d'un système de loquet, avec plusieurs cycles de croquis de dimensionnement, de modélisation CAO de l'assemblage complet, et de prototypage (plusieurs tailles de cylindre central testées par impression 3D en PLA). Le loquet (imprimé en bleu sur les prototypes) est conçu pour résister au choc et à la torsion à ses trois points de sollicitation : en bas du cylindre, au niveau de la poignée qui dépasse, et entre les tiroirs. Un test de chute, visible ci-dessous, valide cette tenue au choc.
