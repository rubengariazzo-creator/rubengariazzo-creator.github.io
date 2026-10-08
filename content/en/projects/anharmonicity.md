---
layout: layouts/project.njk
order: 7
translationKey: anharmonicite
category: "Research"
thumbnail: "assets/img/anharmonicite/tracker-pointage.png"
title: "Anharmonicity of a rocking cone"
description: "Independent physics study: inertia, anisotropy, and dissipation of a conical plate rocking on a table, validated by video and spectral analysis."
logos:
  - src: "assets/img/logos/zenodo.png"
    alt: "Zenodo logo"
    url: "https://doi.org/10.5281/zenodo.18046830"
hero:
  type: image
  src: "assets/img/anharmonicite/tracker-pointage.png"
  alt: "Video tracking of the plate's rocking motion in Tracker: position, velocity, and angular acceleration extracted frame by frame"
gallery:
  - src: "assets/img/anharmonicite/figures-matlab.png"
    alt: "MATLAB plots: frequency evolution, anharmonicity slope, and amplitude dissipation over time"
stats:
  - value: "0.0363 W"
    label: "Corrected dissipation (vs. 0.067 W first estimate)"
  - value: "5,243"
    label: "Measured quality factor Q"
downloads:
  - label: "Full calculation sheet (PDF)"
    href: /assets/downloads/anharmonicite/feuille-de-calculs.pdf
publications:
  - title: "Données Expérimentales : Analyse Cinématique et Énergétique d'un Tronc de Cône sur Support Elliptique"
    doi: "10.5281/zenodo.18045758"
    date: "2025-12-24"
    lang: fr
    type: CreativeWork
  - title: "De l'anharmonicité à la géométrie : étude du puits de potentiel d'un tronc de cône massif en contact ponctuel"
    doi: "10.5281/zenodo.18046830"
    date: "2025-12-24"
    lang: fr
    type: ScholarlyArticle
  - title: "Architecture de calcul intégrée pour l'analyse cinématique et acoustique d'un oscillateur en tronc de cône"
    doi: "10.5281/zenodo.18046240"
    date: "2025-12-24"
    lang: fr
    type: CreativeWork
  - title: "Signature acoustique et de la dissipation d'énergie d'un oscillateur prenant la forme d'un tronc de cône"
    doi: "10.5281/zenodo.18046047"
    date: "2025-12-24"
    lang: fr
    type: CreativeWork
  - title: "Du suivi cinématique sous Tracker à la caractérisation de l'anharmonicité sous MATLAB"
    doi: "10.5281/zenodo.18046629"
    date: "2025-12-24"
    lang: fr
    type: CreativeWork
cta:
  label: "See all projects"
  href: /en/projects/
---
I studied, in physics and independently, the free rocking of a conical glass plate standing on a table, an inverted truncated cone with a circular base, of mass M = 1.087 kg and base radius R = 0.16 m.

## Theoretical model

I compute the moment of inertia of the truncated cone in polar coordinates, from its surface mass density. The real axis of rotation is not the center of the plate but the contact point with the ground, offset from the center of mass by a distance d that video tracking confirms at about 2.94 cm. The Huygens-Steiner theorem then gives the real inertia at the pivot, I ≈ 0.01485 kg·m².

Because the truncated cone has an elliptical cross-section, its radius of curvature differs along the minor and major axes of the ellipse. The restoring stiffness, and therefore the oscillation frequency, depends on the rocking axis (this is the anisotropy). The angular momentum theorem applied at the pivot shows that only the torque due to this offset d of the center of mass sets the system in motion.

## Experimental validation

I tracked the real motion of the plate frame by frame in Tracker (free video-analysis software) to extract position, velocity and angular acceleration. In parallel, I recorded the contact noise and analyzed it in MATLAB with a short-time Fourier transform (STFT), to follow how the frequency evolves over time despite damping and anharmonicity.

## Results

- The mean frequency is 26.68 Hz, the time constant τ = 62.55 s and the quality factor Q ≈ 5243.
- The anharmonicity slope (frequency against amplitude) is positive, +0.2708 Hz/a.u. This is the signature of a hardening potential well, consistent with the conical geometry, where the restoring force grows faster than linearly with the distance from equilibrium.
- Estimated directly from the raw video tracking, the energy dissipation gave an absurd result (4 J/s), skewed by the noise of manual tracking. Going through the exponential decay law of the energy deduced from τ, I get a dissipated power of 0.0363 W, more precise than the initial global MATLAB fit (0.067 W).

## Citing this work

Published in open access on Zenodo as five companion records (with French-language metadata).
