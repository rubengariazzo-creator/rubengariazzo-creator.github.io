---
layout: layouts/project.njk
order: 1
translationKey: boite-a-bijoux
category: "Mécanique"
thumbnail: "assets/img/boite-a-bijoux/boite-ouverte-stl.jpg"
title: "Boîte à bijoux"
description: "Conception CAO d'une boîte à bijoux en deux itérations : sans puis avec système de loquet, jusqu'à l'impression 3D."
logos:
  - src: "assets/img/logos/epf.png"
    alt: "Logo EPF, école d'ingénieurs"
    url: "https://www.epf.fr"
hero:
  type: image
  src: "assets/img/boite-a-bijoux/boite-ouverte-stl.jpg"
  alt: "Modèle 3D de la boîte à bijoux ouverte : le loquet est relevé et les deux tiroirs ont pivoté, tiroirs et plaque du haut bien visibles"
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
    mode: drawers
    download:
      href: /assets/downloads/boite-a-bijoux/boite-a-bijoux-v2-stl.zip
      label: "Télécharger les STL"
    toggle: ["Ouvrir", "Fermer"]
    config:
      zUp: true
      drawers: "Part1"
      drawersSplitZ: 20
      drawersPivot: [-50.3232, 55.6333]
      drawersAngle: 70
      latch: ["loquet", "loquet_cylindre"]
      latchLift: 110
cta:
  label: "Voir les projets"
  href: /projets/
---
J'ai conçu sous CATIA une boîte à bijoux compacte et personnalisable (taille, nombre de tiroirs), en deux itérations successives.

{% include "partials/stl-viewers.njk" %}

Voici comment elle s'ouvre. Le loquet se soulève, puis les deux tiroirs pivotent autour du cylindre central, chacun dans un sens opposé, pendant que les plaques du haut et du bas restent fixes. Sous CATIA, cela donne trois liaisons cinématiques. Il y a un pivot entre les tiroirs et le cylindre central, des appuis plans entre les pièces empilées et une glissière pour le loquet. Les boutons du visualiseur ci-dessus montrent le mouvement en 3D et permettent de télécharger les fichiers STL de la version 2.

## V1, sans loquet

La première itération était un corps cylindrique avec son couvercle. Mes premiers croquis ont servi à fixer la forme générale de la boîte et le fonctionnement de la fermeture, ainsi que la position du corps sur son support et l'intégration du cylindre qui assure le verrouillage. J'ai ensuite modélisé le corps et son couvercle, puis je les ai exportés en STL pour une première impression 3D.

Le plus délicat a été le dimensionnement (profondeur, largeur, hauteur des différentes parties), le nombre de compartiments à prévoir, et le passage des fichiers CAO au logiciel d'impression, où je préparais et ajustais tout sous OrcaSlicer.

## V2, avec loquet

La deuxième itération s'est faite en groupe de quatre. Un test de chute sur une boîte de taille réduite nous a montré qu'il fallait un loquet pour que la boîte reste fermée pendant le transport ou après une chute. Nous ne l'avions pas anticipé, il n'est apparu qu'à l'usage. Nous avons ensuite testé plusieurs tailles de cylindre central imprimées en 3D en PLA pour trouver la plus adaptée au mécanisme.

Le loquet (imprimé en bleu sur les prototypes) doit résister au choc et à la torsion en trois points, en bas du cylindre, au niveau de la poignée qui dépasse et entre les tiroirs. La première version s'est cassée après plusieurs chutes. Nous l'avons réimprimée en changeant les paramètres pour la renforcer, à l'horizontale, avec un remplissage hexagonal à 25 % sur 3 couches de parois, et en PETG plutôt qu'en PLA. Le test de chute ci-dessous montre qu'elle encaisse maintenant le choc.
