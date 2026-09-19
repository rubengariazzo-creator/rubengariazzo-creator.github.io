---
layout: layouts/project.njk
translationKey: anharmonicite
category: "Research"
thumbnail: "assets/img/anharmonicite/tracker-pointage.png"
title: "Anharmonicity of a rocking cone"
description: "Independent physics study: inertia, anisotropy, and dissipation of a conical plate rocking on a table, validated by video and spectral analysis."
hero:
  type: image
  src: "assets/img/anharmonicite/tracker-pointage.png"
  alt: "Video tracking of the plate's rocking motion in Tracker: position, velocity, and angular acceleration extracted frame by frame"
gallery:
  - src: "assets/img/anharmonicite/figures-matlab.png"
    alt: "MATLAB plots: frequency evolution, anharmonicity slope, and amplitude dissipation over time"
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
