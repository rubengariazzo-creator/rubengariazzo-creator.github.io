---
layout: layouts/project.njk
order: 6
translationKey: cryptanalyse-agapeyeff
category: "Research"
thumbnail: "assets/img/cryptanalyse-agapeyeff/cryptogram-original-en.png"
title: "Agapeyeff cipher cryptanalysis"
description: "A computational cryptanalysis attempt on the unsolved cryptogram published by Alexander D'Agapeyeff in 1939."
logos:
  - src: "assets/img/logos/zenodo.png"
    alt: "Zenodo logo"
    url: "https://zenodo.org"
hero:
  type: image
  src: "assets/img/cryptanalyse-agapeyeff/cryptogram-original-en.png"
  alt: "The D'Agapeyeff cryptogram as printed in 1939, 392 digits grouped in fives"
gallery:
  - src: "assets/img/cryptanalyse-agapeyeff/polybius-grid-en.png"
    alt: "Illustration of decoding a digit pair into a 5×5 Polybius grid coordinate"
stats:
  - value: "87 years"
    label: "Unsolved since 1939"
  - value: "3,753,383"
    label: "Logged attempts"
downloads:
  - label: "Report, French version (PDF)"
    href: /assets/downloads/cryptanalyse-agapeyeff/rapport-fr.pdf
  - label: "Report, English version (PDF)"
    href: /assets/downloads/cryptanalyse-agapeyeff/report-en.pdf
cta:
  label: "See all projects"
  href: /en/projects/
---
Independent research study attempting to break, through computational cryptanalysis, the challenge cryptogram published by Alexander D'Agapeyeff (1902-1955), a cartographer and Royal Air Force officer, at the end of the first edition of his manual *Codes and Ciphers* (Oxford University Press, 1939): 392 printed digits, unsolved ever since, and dropped from later editions.

## Method

Four cipher families (substitution, simple transposition, Fleissner grille, double transposition) plus a Four-square cipher were systematically tested against three language hypotheses (English, French, transliterated Hebrew), with null-baseline calibration to distinguish any real signal from a statistical artifact.

## Result

No signal statistically distinguishable from noise was detected across methods A through D, with guaranteed 100% coverage over two independent passes. The Four-square cipher was covered to 20.9% of its search space, also with no signal. A negative result, thoroughly documented with the associated code and data.

## Citing this work

Published in open access on Zenodo:

- R. Gariazzo, *The D'Agapeyeff Cryptogram (1939): Anatomy, Reconstruction of a Solver, and Statistical Assessment*, Zenodo, 2026. [doi.org/10.5281/zenodo.22057249](https://doi.org/10.5281/zenodo.22057249)
- R. Gariazzo, *Data and code of computational cryptanalysis of the D'Agapeyeff cryptogram (1939)*, Zenodo, 2026. [doi.org/10.5281/zenodo.21970478](https://doi.org/10.5281/zenodo.21970478)
