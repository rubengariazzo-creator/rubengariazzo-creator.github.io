---
layout: layouts/project.njk
order: 6
translationKey: cryptanalyse-agapeyeff
category: "Recherche"
thumbnail: "assets/img/cryptanalyse-agapeyeff/cryptogramme-original.png"
title: "Cryptanalyse du cryptogramme d'Agapeyeff"
description: "Cryptanalyse du cryptogramme de D'Agapeyeff (1939), non résolu depuis 87 ans : solveur reconstruit, corpus de 2,5 millions de caractères, résultat négatif documenté."
logos:
  - src: "assets/img/logos/zenodo.png"
    alt: "Logo Zenodo"
    url: "https://doi.org/10.5281/zenodo.22012346"
hero:
  type: image
  src: "assets/img/cryptanalyse-agapeyeff/cryptogramme-original.png"
  alt: "Le cryptogramme de D'Agapeyeff tel qu'imprimé en 1939, 392 chiffres groupés par cinq"
gallery:
  - src: "assets/img/cryptanalyse-agapeyeff/grille-polybius.png"
    alt: "Illustration du décodage d'une paire de chiffres en coordonnée de grille Polybius 5×5"
stats:
  - value: "87 ans"
    label: "Non résolu depuis 1939"
  - value: "3 753 383"
    label: "Tentatives journalisées"
downloads:
  - label: "Rapport, version française (PDF)"
    href: /assets/downloads/cryptanalyse-agapeyeff/rapport-fr.pdf
  - label: "Report, English version (PDF)"
    href: /assets/downloads/cryptanalyse-agapeyeff/report-en.pdf
publications:
  - title: "Le Cryptogramme de D'Agapeyeff (1939) : Anatomie, Reconstruction d'un Solveur et Bilan Statistique"
    doi: "10.5281/zenodo.22012346"
    date: "2026-08-19"
    lang: fr
    type: ScholarlyArticle
  - title: "Données et code de cryptanalyse computationnelle du cryptogramme de D'Agapeyeff (1939)"
    doi: "10.5281/zenodo.21970729"
    date: "2026-08-17"
    lang: fr
    type: CreativeWork
cta:
  label: "Voir les projets"
  href: /projets/
---
Étude de recherche indépendante tentant de percer, par cryptanalyse computationnelle, le cryptogramme-défi publié par Alexander D'Agapeyeff (1902-1955), cartographe et officier de la Royal Air Force, à la fin de la première édition de son manuel *Codes and Ciphers* (Oxford University Press, 1939) : 392 chiffres imprimés, jamais résolus depuis, et retirés des éditions suivantes.

## Le cryptogramme

Les 392 chiffres se lisent par paires, comme des coordonnées dans une grille de Polybius 5×5 : le message compte donc 196 symboles. Reste à trouver quel chiffrement a été appliqué par-dessus, dans quelle langue, et avec quelle clé.

## Un premier solveur à reconstruire

La première difficulté ne venait pas du chiffre, mais du solveur. Sa première version jugeait un résultat prometteur au-delà d'un seuil de score fixé à l'avance et jamais vérifié. Après trois jours de calcul continu, rien ne l'avait franchi. La conclusion tentante aurait été que le texte n'était pas de l'anglais, ou que D'Agapeyeff s'était trompé.

J'ai préféré tester le seuil lui-même : un extrait authentique de *Pride and Prejudice*, noté avec le même modèle, ne l'atteignait pas non plus. Le seuil était inaccessible, même pour un vrai texte anglais, parce que le modèle de langage n'avait été entraîné que sur 8 000 caractères.

## Le solveur reconstruit

- **Un modèle de langage plus solide** : un corpus de plus de 2,5 millions de caractères (romans du domaine public, Projet Gutenberg) et des quadrigrammes, soit 456 976 combinaisons de quatre lettres au lieu de 17 576 pour des trigrammes.
- **Une référence auto-calibrée** : avant chaque recherche, le programme chiffre lui-même un texte connu avec sa propre mécanique, puis tente de le retrouver. Le score obtenu remplace le seuil arbitraire.
- **Une recherche systématique** : quatre familles de chiffrement (substitution, transposition simple, grille de Fleissner, double transposition) et un chiffrement Four-square, neuf hypothèses de transcription et trois langues (anglais, français, hébreu translittéré), explorées par recuit simulé et un algorithme de bandit adaptatif, avec un code compilé (Numba) et un balayage en deux phases qui garantit la couverture de l'espace de recherche.
- **Une calibration par ligne de base nulle** : chaque résultat est comparé à la même recherche menée sur une version mélangée au hasard du cryptogramme, pour distinguer un vrai signal d'un artefact statistique.

Pour le Four-square, le réglage du recuit simulé a lui-même été mesuré : 40 relances de 300 000 itérations retrouvent la bonne clé dans 83 % des essais de test, contre 58 % pour 20 relances de 250 000 itérations.

## Résultat

Aucun signal statistiquement distinguable du bruit n'a été détecté sur les méthodes A à D, avec une couverture garantie à 100 % sur deux passages indépendants. Le chiffrement Four-square a été couvert à 20,9 % de son espace de recherche, sans signal non plus. Un résultat négatif, documenté en détail avec le code et les données associés, pour que la recherche puisse reprendre exactement là où elle s'est arrêtée.

## Citer ce travail

Publié en accès ouvert sur Zenodo :
