---
layout: layouts/project.njk
translationKey: cryptanalyse-agapeyeff
category: "Recherche"
thumbnail: "assets/img/cryptanalyse-agapeyeff/cryptogramme-original.png"
title: "Cryptanalyse du cryptogramme d'Agapeyeff"
description: "Tentative de cryptanalyse computationnelle du cryptogramme non résolu publié par Alexander D'Agapeyeff en 1939."
hero:
  type: image
  src: "assets/img/cryptanalyse-agapeyeff/cryptogramme-original.png"
  alt: "Le cryptogramme de D'Agapeyeff tel qu'imprimé en 1939, 392 chiffres groupés par cinq"
gallery:
  - src: "assets/img/cryptanalyse-agapeyeff/grille-polybius.png"
    alt: "Illustration du décodage d'une paire de chiffres en coordonnée de grille Polybius 5×5"
downloads:
  - label: "Rapport, version française (PDF)"
    href: /assets/downloads/cryptanalyse-agapeyeff/rapport-fr.pdf
  - label: "Report, English version (PDF)"
    href: /assets/downloads/cryptanalyse-agapeyeff/report-en.pdf
cta:
  label: "Voir les projets"
  href: /projets/
---
Étude de recherche indépendante tentant de percer, par cryptanalyse computationnelle, le cryptogramme-défi publié par Alexander D'Agapeyeff (1902-1955), cartographe et officier de la Royal Air Force, à la fin de la première édition de son manuel *Codes and Ciphers* (Oxford University Press, 1939) : 392 chiffres imprimés, jamais résolus depuis, et retirés des éditions suivantes.

## Méthode

Quatre familles de chiffrement (substitution, transposition simple, grille de Fleissner, double transposition) ainsi qu'un chiffrement Four-square ont été testés systématiquement contre trois hypothèses linguistiques (anglais, français, hébreu translittéré), avec une calibration par ligne de base nulle pour distinguer tout signal réel d'un artefact statistique.

## Résultat

Aucun signal statistiquement distinguable du bruit n'a été détecté sur les méthodes A à D, avec une couverture garantie à 100 % sur deux passages indépendants. Le chiffrement Four-square a été couvert à 20,9 % de son espace de recherche, sans signal non plus. Un résultat négatif, documenté en détail avec le code et les données associés.
