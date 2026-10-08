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
I tried to crack, by computational cryptanalysis, the challenge cryptogram that Alexander D'Agapeyeff (1902-1955), a cartographer and Royal Air Force officer, published at the end of the first edition of his handbook *Codes and Ciphers* (Oxford University Press, 1939). Nobody has solved it since, and its 392 digits even vanished from later editions. This is an independent research study.

## The cryptogram

The 392 digits read in pairs, like coordinates in a 5×5 Polybius grid, which gives a message of 196 symbols. What remains is to find which cipher was applied on top, in which language and with which key.

## A first solver that had to be rebuilt

The first difficulty did not come from the cipher but from the solver. Its first version judged a result promising above a score threshold that had been fixed in advance and never checked. After three days of continuous computing, nothing had crossed it. The tempting conclusion would have been that the text was not English, or that D'Agapeyeff had made a mistake.

I preferred to test the threshold itself. A genuine excerpt from *Pride and Prejudice*, scored with the same model, did not reach it either. The threshold was out of reach even for real English text, because the language model had only been trained on 8,000 characters.

## The rebuilt solver

I rebuilt the solver around four ideas.

- **A stronger language model.** A corpus of more than 2.5 million characters (public-domain novels from Project Gutenberg) and quadgrams, which means 456,976 four-letter combinations instead of 17,576 for trigrams.
- **A self-calibrated reference.** Before each search, the program encrypts a known text with its own machinery, then tries to recover it. The score obtained replaces the arbitrary threshold.
- **A systematic search.** Four cipher families (substitution, simple transposition, Fleissner grille, double transposition) plus a Four-square cipher, nine transcription hypotheses and three languages (English, French, transliterated Hebrew), explored with simulated annealing and an adaptive bandit algorithm, with compiled code (Numba) and a two-phase sweep that guarantees coverage of the search space.
- **A null-baseline calibration.** Each result is compared with the same search run on a randomly shuffled version of the cryptogram, to tell a real signal from a statistical artifact.

For the Four-square cipher, I even measured the annealing setup. 40 restarts of 300,000 iterations find the right key in 83% of test runs, against 58% for 20 restarts of 250,000 iterations.

## Result

I detected no signal statistically distinguishable from noise on methods A to D, with 100% coverage guaranteed over two independent passes. The Four-square cipher was covered to 20.9% of its search space, also without a signal. It is a negative result, but I documented it in detail, with the associated code and data, so the research can resume exactly where it stopped.

## Citing this work

The work is published in open access on Zenodo.
