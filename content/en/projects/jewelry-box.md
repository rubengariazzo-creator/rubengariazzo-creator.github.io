---
layout: layouts/project.njk
translationKey: boite-a-bijoux
category: "Mechanical"
thumbnail: "assets/img/boite-a-bijoux/render-cad.jpg"
title: "Jewelry box"
description: "CAD design of a jewelry box across two iterations: without and then with a latch mechanism, through to 3D printing."
logos:
  - src: "assets/img/logos/epf.png"
    alt: "EPF engineering school logo"
hero:
  type: image
  src: "assets/img/boite-a-bijoux/render-cad.jpg"
  alt: "CAD render of the jewelry box"
gallery:
  - src: "assets/img/boite-a-bijoux/croquis-concept.jpg"
    alt: "Early shape-exploration sketches for the jewelry box"
  - src: "assets/img/boite-a-bijoux/croquis-dimensions.jpg"
    alt: "Dimensioned sketch of the latch mechanism"
  - src: "assets/img/boite-a-bijoux/cad-loquet.jpg"
    alt: "CAD model of the latch mechanism"
  - src: "assets/img/boite-a-bijoux/impressions-test.jpg"
    alt: "3D-printed prototypes of the central cylinder at different sizes"
  - type: video
    src: /assets/video/boite-a-bijoux/test-choc-loquet.mp4
    poster: /assets/img/boite-a-bijoux/test-choc-loquet-poster.jpg
    alt: "Shock test of the V2 latch (printed in blue, visible on top): the prototype is dropped and survives intact"
stlModels:
  - src: "/assets/models/boite-a-bijoux/boite-assemblee.3mf"
    label: "Full CAD assembly, V2 (drag to orbit)"
cta:
  label: "See all projects"
  href: /en/projects/
---
Design of a jewelry box modeled in CATIA, developed across two successive iterations, aiming for compact, customizable storage (size, number of drawers).

Three kinematic joints structure the assembly: a pivot joint between the lid and the body for opening and closing, planar supports, and a sliding joint for the drawers.

## V1, without a latch

First iteration: a cylindrical body and its lid. Early sketches were used to work out the box's general shape and closing mechanism, along with the body's position relative to its support and the integration of the cylinder handling the locking. This body and lid were then modeled and exported to STL for an initial 3D print.

The main difficulties at this stage were dimensioning (depth, width, height of the various parts) and the number of compartments to fit in, as well as transferring the CAD files to the slicing software, prepared and adjusted in OrcaSlicer.

## V2, with a latch

Second iteration, built as a 4-person group project. A drop test on a smaller-scale box revealed the need for a latch to keep the box closed during transport or in a fall — a need that wasn't anticipated during the initial design and only emerged through use. Several central-cylinder sizes were then tested via PLA 3D printing to find the best fit for the mechanism.

The latch (printed in blue on the prototypes) is designed to resist shock and torsion at its three load points: the bottom of the cylinder, the protruding handle, and between the drawers. An early version broke after several drops; it was reprinted with modified parameters to reinforce it mechanically: printed horizontally, with a 25% hexagonal infill over 3 wall layers, in PETG rather than PLA. A drop test, shown below, validates the shock resistance of this reinforced version.
