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
stlModels:
  - src: "/assets/models/boite-a-bijoux/boite-assemblee.3mf"
    label: "Assemblage CAO complet, V2 (glisser pour orbiter)"
cta:
  label: "Voir les projets"
  href: /projets/
---
Conception d'une boîte à bijoux modélisée sous CATIA, développée en deux itérations successives, avec pour objectif un rangement compact et personnalisable (taille, nombre de tiroirs).

Trois liaisons cinématiques structurent l'ensemble : une liaison pivot entre le couvercle et le corps de la boîte pour l'ouverture et la fermeture, des appuis plans, et une liaison glissière pour les tiroirs.

## V1, sans loquet

Première itération : un corps cylindrique et son couvercle. Les premiers croquis ont servi à déterminer la forme générale de la boîte et le fonctionnement du système de fermeture, ainsi que la position du corps par rapport à son support et l'intégration du cylindre assurant le verrouillage. Ce corps et son couvercle ont ensuite été modélisés puis exportés en STL pour une première impression 3D.

Les principales difficultés de cette phase ont porté sur le dimensionnement (profondeur, largeur, hauteur des différentes parties) et le nombre de compartiments à intégrer, ainsi que sur le transfert des fichiers CAO vers le logiciel d'impression, préparé et ajusté sous OrcaSlicer.

## V2, avec loquet

Deuxième itération, réalisée en groupe (4 personnes). Un test de chute sur une boîte de taille réduite a révélé la nécessité d'un loquet pour garder la boîte fermée pendant le transport ou en cas de chute — un besoin non anticipé lors de la conception initiale, apparu seulement à l'usage. Plusieurs tailles de cylindre central ont ensuite été testées par impression 3D en PLA pour déterminer la solution la plus adaptée au mécanisme.

Le loquet (imprimé en bleu sur les prototypes) est conçu pour résister au choc et à la torsion à ses trois points de sollicitation : en bas du cylindre, au niveau de la poignée qui dépasse, et entre les tiroirs. Une première version s'est cassée après plusieurs chutes ; elle a été réimprimée avec des paramètres modifiés pour renforcer sa tenue mécanique : impression à l'horizontale, remplissage hexagonal à 25 % sur 3 couches de parois, en PETG plutôt qu'en PLA. Un test de chute, visible ci-dessous, valide cette tenue au choc sur la version renforcée.
