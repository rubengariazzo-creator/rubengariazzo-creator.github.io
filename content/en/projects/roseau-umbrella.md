---
layout: layouts/project.njk
order: 11
translationKey: roseau
category: "Mechanical"
thumbnail: "assets/img/roseau/rafale-dessous.jpg"
title: "ROSEAU: an umbrella that bends but does not break"
description: "ROSEAU, a personal design project: a calibrated elastic clip lets an umbrella rib go at about 60 km/h instead of breaking, then snaps back on by hand."
hero:
  type: image
  src: "assets/img/roseau/rafale-dessous.jpg"
  alt: "3D render of the ROSEAU umbrella during a gust: part of the canopy lifts and the rib is released from its rod"
galleryTiles: true
gallery:
  - src: "assets/img/roseau/plan-ensemble.jpg"
    alt: "Dimensioned assembly drawing of the demonstrator: front view and section of the upper pin"
  - src: "assets/img/roseau/principe.jpg"
    alt: "Working principle in three steps: the clip holds in ordinary wind, opens in a gust, snaps back by hand"
  - src: "assets/img/roseau/demonstrateur.jpg"
    alt: "The full-scale demonstrator: bracket, rib, green clevis and orange fuse rod"
  - src: "assets/img/roseau/effort-rafale.jpg"
    alt: "Gust force in the return rod against wind speed, with the thresholds of the three clip settings"
stats:
  - value: "10 M"
    label: "Umbrellas thrown away per year in France"
  - value: "60 km/h"
    label: "Clip release speed"
  - value: "32 N"
    label: "Fuse threshold"
  - value: "22 N"
    label: "Rod force at 50 km/h"
  - value: "€0.70"
    label: "Estimated extra cost (8 ribs)"
  - value: "67 g"
    label: "Filament for the mock-up"
stlModels:
  - src: "/assets/models/roseau/roseau-demonstrateur.3mf"
    label: "Demonstrator, exploded and assembled (drag to orbit)"
    mode: explode
    toggle: ["Explode", "Assemble"]
    download:
      href: /assets/downloads/roseau/roseau-fichiers-stl.zip
      label: "Download the STL files"
    config:
      start: 1
      zUp: true
      offsets:
        R12_potence: [0, 0, 0]
        R14_rondelle: [0, -20, 0]
        R10_baleine: [0, -44, 0]
        R04D_tige_fusible_B_nominal: [0, -44, 0]
        R03M_chape: [-7.25, -44, -27.05]
        R09_axe: [-7.25, -72, -27.05]
        R15_capuchon: [0, -80, 0]
      colors:
        R12_potence: "#8d96a3"
        R10_baleine: "#d8d4c8"
        R14_rondelle: "#d8d4c8"
        R15_capuchon: "#d8d4c8"
        R03M_chape: "#2a9d8f"
        R04D_tige_fusible_B_nominal: "#f08a3c"
        R09_axe: "#c4cad3"
downloads:
  - label: "Project report (PDF, in French)"
    href: /assets/downloads/roseau/rapport-projet.pdf
  - label: "Dimensioned drawings (PDF)"
    href: /assets/downloads/roseau/dossier-plans.pdf
  - label: "Manufacturing and assembly guide (PDF, in French)"
    href: /assets/downloads/roseau/notice-fabrication-montage.pdf
cta:
  label: "See all projects"
  href: /en/projects/
---
ROSEAU is a personal design project: rethinking the link between an umbrella's rib and its stretcher so that one gust too many no longer costs an umbrella, only a "click". I carried it out alone in autumn 2026, from identifying the need to a mock-up that is modelled, sized and ready to print.

## The problem

Ten million umbrellas are thrown away every year in France and about a billion worldwide. Made of plastic, steel and nylon crimped together, they are almost never recycled. Repairers agree on the typical failure: the joint between the rib and the stretcher, or its rivet, breaks exactly where a gust concentrates the load. Existing "storm" umbrellas hold up by being stiffer, heavier and more expensive, and they cannot be repaired.

## The need

Instead of the "bull's-eye" diagram, I used a functional analysis based on the elements of the outside environment, drawn as an octopus diagram. Two main functions: protect the user from rain, and stay protected despite gusts, with no damage to the product. The quantified specification sets the target: no deformation up to 50 km/h, no part broken or thrown off at 100 km/h, back in service in under 10 s, under 50 N and without tools, extra cost under €1.

## From cause to solution

An Ishikawa diagram listed thirteen causes of breakage, ranked by criticality in a Pareto chart: the rigid link with no fuse element and the riveted joints alone account for 47% of the criticality, and four causes make up 64%. Fifty brainstormed ideas, the inversion method ("how to make sure the umbrella breaks at the first gust?") and TRIZ analysis brought out the lead: a link that gives way below a known threshold and then snaps back, like an electrical fuse or a ski binding with a calibrated release. Seven concepts sketched by hand were compared with a weighted Pugh matrix: the fuse link comes first, and a second matrix picks the printed elastic clip among five fuse technologies.

## The principle

On each rib, a glued clevis carries a 3 mm steel pin. The return rod ends in a U-shaped elastic clip that snaps onto this pin. In ordinary wind, the clip transmits the opening force and the umbrella behaves like a standard one. When a gust lifts the canopy, the force in the rod rises; beyond the threshold, the clip arms spread apart and the rib swings freely: nothing breaks and nothing flies off. With the umbrella closed, the user pushes the clip back onto the pin in one gesture.

## The sizing

The sizing is an analytical model (simplified fluid mechanics and strength of materials), not a finite-element simulation. At 50 km/h, the wind thrust on the share of canopy carried by one rib is 8.2 N, which means 22 N in the return rod; the force grows with the square of the speed and reaches 89 N at 100 km/h. Each clip arm is a PETG beam that must spread by 0.55 mm to release the pin: the extraction threshold is 32 N, a release at about 60 km/h. Two other settings bracket it (24 N, 52 km/h, and 42 N, 69 km/h). The arm strain stays at 2.5%, below the 3% limit for a reusable clip, and rearming takes 32 N, under the required 50 N. Without the fuse, the stress in a fibreglass rib would reach 870 MPa at 100 km/h, above its strength.

## The mock-up

The demonstrator reproduces one rib's fuse link at full scale: bracket, shortened rib, clevis, pin and fuse rod. It comes down to 9 printable parts in PETG and PLA, using about 67 g of filament, modelled parametrically: the calculations, the dimensioned drawings and the print files share the same dimensions. The viewer below shows the assembly in an exploded view, with a button to see it assembled and another to download the 9 STL files. The manufacturing and assembly guide and the set of drawings are in the documents.

## Limits and next steps

The validation is analytical: every quantified requirement is met by calculation, but no physical test is presented here. The threshold depends on the clip's friction on the pin, which is why there are three lip-opening settings. Possible next steps are a prototype with real fibreglass ribs, a version 2 with an adjustable ball and spring, and a repair kit (ribs, tips and clip-on fuses). The sources are listed in the report.
