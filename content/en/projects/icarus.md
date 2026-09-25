---
layout: layouts/project.njk
order: 2
translationKey: icarus
category: "Aerospace"
thumbnail: "assets/img/icarus/IMG_6473.jpg"
title: "Icarus: mini-rocket flown at C'Space 2026"
description: "Icarus, an EPF Astronomie mini-rocket flown at C'Space 2026 (CNES, Planète Sciences): 3D-printed CAD nose cone, StabTraj simulations and a Blender animation."
logos:
  - src: "assets/img/logos/epf.png"
    alt: "EPF engineering school logo"
    url: "https://www.epf.fr/en"
  - src: "assets/img/logos/epf-astronomie.jpg"
    alt: "EPF Astronomie logo, EPF's aerospace club"
    url: "https://www.linkedin.com/company/epf-astronomie"
hero:
  scrollDriven: true
  src: /assets/video/icarus/icarus-3d-hero.mp4
  srcMobile: /assets/video/icarus/icarus-3d-hero-mobile.mp4
  poster: /assets/img/icarus/hero-poster.jpg
  alt: "3D animation of the Icarus rocket that advances as you scroll, then launches"
gallery:
  - src: "assets/img/icarus/IMG_6473.jpg"
    alt: "The assembled Icarus rocket before launch"
  - src: "assets/img/icarus/IMG_6474.jpg"
    alt: "Close-up view of the Icarus rocket"
  - src: "assets/img/icarus/IMG_6475.jpg"
    alt: "The Icarus rocket on its launch pad"
  - src: "assets/img/icarus/attestation-de-vol.jpg"
    alt: "Official flight certificate for the Icarus rocket"
    link: /assets/img/icarus/attestation-de-vol.jpg
    linkLabel: "See the flight certificate"
stats:
  - value: "230 m"
    label: "Predicted apogee"
  - value: "6.20–6.52"
    label: "Stability margin (calibers)"
  - value: "74 m/s"
    label: "Maximum velocity"
  - value: "1.14 m"
    label: "Length"
  - value: "1.66 kg"
    label: "Liftoff mass"
  - value: "31 s"
    label: "Predicted flight time"
downloads:
  - label: "Nose cone technical drawing (PDF)"
    href: /assets/downloads/icarus/plan-coiffe.pdf
  - label: "Stability and trajectory results (PDF)"
    href: /assets/downloads/icarus/stabilite-trajectoire-en.pdf
cta:
  label: "See all projects"
  href: /en/projects/
---
Icarus is an experimental mini-rocket designed, built, and flown to a nominal flight at C'Space 2026, the student launch campaign organized by CNES and Planète Sciences at the Ger military camp, hosted by the 1er RHP.

The project was carried out by a five-person team within EPF Astronomie, EPF's aerospace club: Camille Gaudeaux (project lead), Margaux Vahlas, Chimène Tabaste, Ambroise Denduang Wolber, and myself.

## The rocket

Icarus is 1.14 m long and weighs 1.66 kg at liftoff (1.50 kg without its motor). It is powered by a Pandora motor (Pro24-6G), stabilized by four fins and topped with a pointed ogive nose cone. It lifts off from a 2.5 m rail tilted at 80° and comes back down under a 0.26 m² cross parachute.

## My contribution

- **The nose cone**: modelled in CATIA, a 210 mm ogive sized for the 83 mm airframe diameter, then 3D-printed in PETG (6 h 44 min of printing). Its technical drawing can be downloaded below.
- **Structural parts**: 3D printing of the fin mounting cage (PLA, 6 h 37 min) and the motor retaining rings (PETG, 1 h 36 min).
- **Flight dynamics**: stability and trajectory simulations with StabTraj, Planète Sciences' reference tool, confirming that Icarus would hold a straight, nominal flight path rather than tumbling.
- **The 3D animation**: made in Blender and delivered in several formats (TV screens, kiosks, social media), kept under wraps until its back-to-school reveal.

## Stability and trajectory

The simulations meet Planète Sciences' stability criteria: a slenderness ratio of 14.3 (expected between 10 and 20), a lift coefficient (Cnα) of 21 (between 15 and 30) and a static margin of 6.2 to 6.5 calibers depending on whether the motor is full or spent. That margin slightly exceeds the recommended maximum of 6: the verdict is "overstable", meaning a very stable rocket in flight, with a tendency to turn into the wind.

On the trajectory side: rail exit at 23 m/s, maximum velocity of 74 m/s, maximum acceleration of 135 m/s² (almost 14 g) and apogee at 230 m after 6.7 s. The parachute opens at 8 s and brings the rocket down at 9.9 m/s, for a full flight of 31 s. Without a parachute, the impact would happen at 56 m/s with close to 2,500 J of energy: that is what the recovery system is for.

The full results are available below.

## The flight

Icarus lifted off in summer 2026 at C'Space, at the Ger military camp, for a nominal flight confirmed by the official flight certificate (see the gallery).

## Press & mentions

Announced on LinkedIn: ["Nominal flight achieved!" (Icarus at C'Space 2026)](https://www.linkedin.com/feed/update/urn:li:activity:7506806576557613056/), with the project's 3D animation and reactions from the EPF Astronomie team.
