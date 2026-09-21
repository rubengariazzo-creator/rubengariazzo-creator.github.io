---
layout: layouts/project.njk
order: 8
translationKey: adn-zenon
category: "Recherche"
thumbnail: "assets/img/adn-zenon/fr-theoreme.png"
title: "ADN Zénon, recherche indépendante"
description: "Étude indépendante en physique : peut-on utiliser l'effet Zénon quantique pour protéger le stockage de données sur ADN des mutations ?"
logos:
  - src: "assets/img/logos/zenodo.png"
    alt: "Logo Zenodo"
    url: "https://zenodo.org"
hero:
  type: image
  src: "assets/img/adn-zenon/fr-theoreme.png"
  alt: "Théorème 1 : énoncé formel des hypothèses H1 à H4 et de la conclusion du théorème de no-go ADN-Zénon"
gallery:
  - src: "assets/img/adn-zenon/fr-mecanisme-tunnel.png"
    alt: "Représentation schématique du transfert de proton par effet tunnel entre une adénine et une thymine"
  - src: "assets/img/adn-zenon/fr-algorithme-zenon.png"
    alt: "Principe de l'effet Zénon quantique : évolution libre versus mesures projectives répétées, avec la formalisation mathématique de l'algorithme"
stats:
  - value: "×3 000"
    label: "Énergie sonde nécessaire vs seuil de rupture ADN"
  - value: "10⁶"
    label: "Écart entre erreur tunnel et erreur de synthèse"
downloads:
  - label: "Étude complète, version française (PDF)"
    href: /assets/downloads/adn-zenon/etude-fr.pdf
  - label: "Full study, English version (PDF)"
    href: /assets/downloads/adn-zenon/study-en.pdf
cta:
  label: "Voir les projets"
  href: /projets/
---
Étude de recherche indépendante explorant si l'effet Zénon quantique pourrait figer le phénomène d'effet tunnel des protons dans les paires de bases de l'ADN (un mécanisme à l'origine de mutations tautomériques) afin de protéger des données stockées sur ADN.

## Le mécanisme physique

Le proton d'une liaison hydrogène (par exemple entre une adénine et une thymine) possède une probabilité non nulle de franchir la barrière énergétique séparant sa position canonique de sa position tautomérique, par simple effet tunnel quantique. C'est ce basculement, source de mutations lors de la réplication, que l'étude cherche à contrôler.

## L'algorithme étudié

Le contrôle par effet Zénon consisterait à appliquer, à intervalles réguliers très inférieurs au temps caractéristique de l'effet tunnel, un opérateur de mesure projective forçant le système à rester dans son état canonique initial, plutôt que de le laisser évoluer librement vers une superposition. L'étude formalise mathématiquement cet algorithme, jamais explicité dans la littérature existante.

## Théorème et conclusion

En comparant les conséquences structurelles (énergie des photons de mesure très supérieure à l'énergie de liaison) et thermodynamiques (dissipation de Landauer) de ce contrôle actif, l'étude établit un théorème de no-go : le contrôle Zénon d'un ADN de stockage est physiquement et énergétiquement impossible avec toute technologie envisageable. Une feuille de route d'alternatives réalistes (cryogénie, codes correcteurs classiques avancés, ingénierie du substrat XNA, prédiction par apprentissage automatique) est proposée à la place.

Rapport complet disponible en français et en anglais ci-dessous.

## Citer ce travail

Publié en accès ouvert sur Zenodo, en français et en anglais :

- R. Gariazzo, *L'Effet Zénon Quantique comme algorithme de correction d'erreurs dans le stockage de données sur ADN*, Zenodo, 2026. [doi.org/10.5281/zenodo.22308582](https://doi.org/10.5281/zenodo.22308582)
- R. Gariazzo, *The Quantum Zeno Effect as an Error-Correction Algorithm for DNA Data Storage*, Zenodo, 2026. [doi.org/10.5281/zenodo.22308602](https://doi.org/10.5281/zenodo.22308602)
