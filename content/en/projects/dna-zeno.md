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
    url: "https://zenodo.org"
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
cta:
  label: "See all projects"
  href: /en/projects/
---
Independent research study exploring whether the quantum Zeno effect could freeze proton tunneling in DNA base pairs (a mechanism behind mutation-inducing tautomers) to protect DNA-based data storage.

## The physical mechanism

The proton in a hydrogen bond (for instance between an adenine and a thymine) has a nonzero probability of crossing the energy barrier separating its canonical position from its tautomeric one, through plain quantum tunneling. This is the switch, a source of mutations during replication, that the study seeks to control.

## The algorithm studied

Zeno-effect control would apply, at regular intervals much shorter than the tunneling effect's characteristic time, a projective measurement operator forcing the system to stay in its initial canonical state rather than letting it evolve freely into a superposition. The study formalizes this algorithm mathematically, something the existing literature never spells out.

## Theorem and conclusion

By comparing the structural consequences (measurement-photon energy far exceeding bond energy) and thermodynamic consequences (Landauer dissipation) of this active control, the study establishes a no-go theorem: Zeno control of storage DNA is physically and energetically impossible with any conceivable technology. A roadmap of more realistic alternatives (cryogenics, advanced classical error-correcting codes, XNA substrate engineering, machine-learning prediction) is proposed instead.

Full report available below in both French and English.

## Citing this work

Published in open access on Zenodo, in matching French and English versions:

- R. Gariazzo, *The Quantum Zeno Effect as an Error-Correction Algorithm for DNA Data Storage*, Zenodo, 2026. [doi.org/10.5281/zenodo.22308602](https://doi.org/10.5281/zenodo.22308602)
- R. Gariazzo, *L'Effet Zénon Quantique comme algorithme de correction d'erreurs dans le stockage de données sur ADN*, Zenodo, 2026. [doi.org/10.5281/zenodo.22308582](https://doi.org/10.5281/zenodo.22308582)
