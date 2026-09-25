---
layout: layouts/project.njk
order: 6
translationKey: cryptanalyse-agapeyeff
category: "Research"
thumbnail: "assets/img/cryptanalyse-agapeyeff/cryptogram-original-en.png"
title: "Agapeyeff cipher cryptanalysis"
description: "Cryptanalysis of the D'Agapeyeff cryptogram (1939), unsolved for 87 years: a rebuilt solver, a 2.5-million-character corpus and a documented negative result."
logos:
  - src: "assets/img/logos/zenodo.png"
    alt: "Zenodo logo"
    url: "https://doi.org/10.5281/zenodo.22057249"
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
publications:
  - title: "The D'Agapeyeff Cryptogram (1939): Anatomy, Reconstruction of a Solver, and Statistical Assessment"
    doi: "10.5281/zenodo.22057249"
    date: "2026-08-22"
    lang: en
    type: ScholarlyArticle
  - title: "Data and code of computational cryptanalysis of the D'Agapeyeff cryptogram (1939)"
    doi: "10.5281/zenodo.21970478"
    date: "2026-08-17"
    lang: en
    type: CreativeWork
cta:
  label: "See all projects"
  href: /en/projects/
---
Independent research study attempting to break, through computational cryptanalysis, the challenge cryptogram published by Alexander D'Agapeyeff (1902-1955), cartographer and Royal Air Force officer, at the end of the first edition of his handbook *Codes and Ciphers* (Oxford University Press, 1939): 392 printed digits, never solved since, and removed from later editions.

## The cryptogram

The 392 digits read in pairs, as coordinates in a 5×5 Polybius grid: the message therefore has 196 symbols. What remains to find is which cipher was applied on top, in which language, and with which key.

## A first solver that had to be rebuilt

The first difficulty came not from the cipher but from the solver. Its first version flagged a result as promising above a score threshold set in advance and never checked. After three days of continuous computing, nothing had crossed it. The tempting conclusion would have been that the plaintext was not English, or that D'Agapeyeff had made a mistake.

I tested the threshold itself instead: an authentic excerpt of *Pride and Prejudice*, scored with the same model, did not reach it either. The threshold was out of reach even for real English, because the language model had been trained on only 8,000 characters.

## The rebuilt solver

- **A sturdier language model**: a corpus of more than 2.5 million characters (public-domain novels, Project Gutenberg) and quadgrams, that is 456,976 four-letter combinations instead of 17,576 for trigrams.
- **A self-calibrated reference**: before each search, the program encrypts a known text with its own mechanism, then tries to recover it. The score it reaches replaces the arbitrary threshold.
- **A systematic search**: four cipher families (substitution, simple transposition, Fleissner grille, double transposition) and a Four-square cipher, nine transcription hypotheses and three languages (English, French, transliterated Hebrew), explored with simulated annealing and an adaptive bandit algorithm, with compiled code (Numba) and a two-phase sweep that guarantees coverage of the search space.
- **Null-baseline calibration**: every result is compared with the same search run on a randomly shuffled version of the cryptogram, to tell a real signal from a statistical artifact.

For the Four-square, the simulated annealing settings were measured too: 40 restarts of 300,000 iterations recover the right key in 83% of test runs, against 58% for 20 restarts of 250,000 iterations.

## Result

No signal statistically distinguishable from noise was detected across methods A through D, with guaranteed 100% coverage over two independent passes. The Four-square cipher was covered to 20.9% of its search space, also with no signal. A negative result, thoroughly documented with the associated code and data, so the search can resume exactly where it stopped.

## Citing this work

Published in open access on Zenodo:
