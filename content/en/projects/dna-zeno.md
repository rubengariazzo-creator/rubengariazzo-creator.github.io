---
layout: layouts/project.njk
order: 8
translationKey: adn-zenon
category: "Research"
thumbnail: "assets/img/adn-zenon/en-theorem.png"
title: "DNA Zeno, independent research"
description: "Independent physics study: could the quantum Zeno effect protect DNA-based data storage from mutation?"
logos:
  - src: "assets/img/logos/zenodo.png"
    alt: "Zenodo logo"
    url: "https://doi.org/10.5281/zenodo.22308602"
hero:
  type: image
  src: "assets/img/adn-zenon/en-theorem.png"
  alt: "Theorem 1: formal statement of hypotheses H1 through H4 and the conclusion of the DNA-Zeno no-go theorem"
gallery:
  - src: "assets/img/adn-zenon/en-tunneling-mechanism.png"
    alt: "Schematic representation of proton transfer by tunneling between an adenine and a thymine"
  - src: "assets/img/adn-zenon/en-zeno-algorithm.png"
    alt: "Principle of the quantum Zeno effect: free evolution versus repeated projective measurements, with the algorithm's mathematical formalization"
stats:
  - value: "×3,000"
    label: "Probe energy needed vs. DNA bond-breaking threshold"
  - value: "10⁶"
    label: "Gap between tunneling error and synthesis error"
downloads:
  - label: "Full study, French version (PDF)"
    href: /assets/downloads/adn-zenon/etude-fr.pdf
  - label: "Full study, English version (PDF)"
    href: /assets/downloads/adn-zenon/study-en.pdf
publications:
  - title: "The Quantum Zeno Effect as an Error-Correction Algorithm for DNA Data Storage"
    doi: "10.5281/zenodo.22308602"
    date: "2026-09-04"
    lang: en
    type: ScholarlyArticle
  - title: "L'Effet Zénon Quantique comme algorithme de correction d'erreurs dans le stockage de données sur ADN"
    doi: "10.5281/zenodo.22308582"
    date: "2026-09-04"
    lang: fr
    type: ScholarlyArticle
cta:
  label: "See all projects"
  href: /en/projects/
---
In this independent study, I asked whether the quantum Zeno effect could freeze the tunneling of protons in DNA base pairs, a mechanism behind tautomeric mutations, in order to protect data stored on DNA.

## The physical mechanism

The proton of a hydrogen bond (for example between an adenine and a thymine) has a non-zero probability of crossing the energy barrier that separates its canonical position from its tautomeric one, through plain quantum tunneling. This switch, a source of mutations during replication, is what the study tries to control.

## The algorithm studied

Zeno control would consist in applying, at regular intervals much shorter than the characteristic tunneling time, a projective measurement operator that forces the system to stay in its initial canonical state, rather than letting it evolve freely toward a superposition. I formalized this algorithm mathematically, and it had never been spelled out in the existing literature.

## Theorem and conclusion

I compared the structural consequences of this active control (a measurement photon energy far above the binding energy) and its thermodynamic consequences (Landauer dissipation). From that I draw a no-go theorem. Zeno control of a storage DNA is physically and energetically impossible with any foreseeable technology. I propose instead a roadmap of realistic alternatives (cryogenics, advanced classical error-correcting codes, XNA substrate engineering, machine-learning prediction).

The full report is available in French and English below.

## Citing this work

Published in open access on Zenodo, in matching French and English versions.
