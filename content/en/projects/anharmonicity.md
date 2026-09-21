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
    url: "https://zenodo.org"
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
cta:
  label: "See all projects"
  href: /en/projects/
---
Independent physics study of the free rocking motion of a conical glass plate (an inverted cone frustum with a circular base, mass M = 1.087 kg, base radius R = 0.16 m) resting on a table.

## Theoretical model

The moment of inertia of the cone frustum is computed in polar coordinates from its surface mass density. The real axis of rotation is not the plate's center but its contact point with the table, offset from the center of mass by a distance d experimentally confirmed at about 2.94 cm via video tracking: the Huygens-Steiner theorem then gives the real inertia at the pivot, I ≈ 0.01485 kg·m².

Since the cone frustum has an elliptical cross-section, its radius of curvature differs along the ellipse's minor and major axes: the restoring stiffness, and therefore the oscillation frequency, depends on the rocking axis (anisotropy). The angular momentum theorem applied at the pivot shows that only the torque from this offset d of the center of mass sets the system in motion.

## Experimental validation

The plate's real motion was tracked frame by frame in Tracker (free video analysis software) to extract position, velocity, and angular acceleration. In parallel, the contact sound was recorded and analyzed in MATLAB via short-time Fourier transform (STFT), to follow the frequency's evolution over time despite damping and anharmonicity.

## Results

- Mean frequency 26.68 Hz, time constant τ = 62.55 s, quality factor Q ≈ 5243.
- Anharmonicity slope (frequency versus amplitude) positive, +0.2708 Hz/a.u.: the signature of a hardening potential well, consistent with the conical geometry where the restoring force grows faster than linearly with displacement from equilibrium.
- Energy dissipation estimated directly from the raw video tracking data gave an aberrant result (4 J/s), skewed by measurement noise from manual tracking. Using the exponential energy decay law derived from τ instead, the dissipated power is estimated at 0.0363 W, more precise than the initial global MATLAB fit (0.067 W).

## Citing this work

Published in open access on Zenodo as five companion records (French-language metadata):

- R. Gariazzo, *Données Expérimentales : Analyse Cinématique et Énergétique d'un Tronc de Cône sur Support Elliptique*, Zenodo, 2025. [doi.org/10.5281/zenodo.18045758](https://doi.org/10.5281/zenodo.18045758)
- R. Gariazzo, *De l'anharmonicité à la géométrie : étude du puits de potentiel d'un tronc de cône massif en contact ponctuel*, Zenodo, 2025. [doi.org/10.5281/zenodo.18046830](https://doi.org/10.5281/zenodo.18046830)
- R. Gariazzo, *Architecture de calcul intégrée pour l'analyse cinématique et acoustique d'un oscillateur en tronc de cône*, Zenodo, 2025. [doi.org/10.5281/zenodo.18046240](https://doi.org/10.5281/zenodo.18046240)
- R. Gariazzo, *Signature acoustique et de la dissipation d'énergie d'un oscillateur prenant la forme d'un tronc de cône*, Zenodo, 2025. [doi.org/10.5281/zenodo.18046047](https://doi.org/10.5281/zenodo.18046047)
- R. Gariazzo, *Du suivi cinématique sous Tracker à la caractérisation de l'anharmonicité sous MATLAB*, Zenodo, 2025. [doi.org/10.5281/zenodo.18046629](https://doi.org/10.5281/zenodo.18046629)
