---
layout: layouts/project.njk
order: 1
translationKey: boite-a-bijoux
category: "Mechanical"
thumbnail: "assets/img/boite-a-bijoux/render-cad.jpg"
title: "Jewelry box"
description: "CAD design of a jewelry box across two iterations: without and then with a latch mechanism, through to 3D printing."
logos:
  - src: "assets/img/logos/epf.png"
    alt: "EPF engineering school logo"
    url: "https://www.epf.fr/en"
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
    mode: drawers
    toggle: ["Open", "Close"]
    config:
      zUp: true
      drawers: "Part1"
      drawersSplitZ: 20
      drawersPivot: [-50.3232, 55.6333]
      drawersAngle: 70
      latch: ["loquet", "loquet_cylindre"]
      latchLift: 80
cta:
  label: "See all projects"
  href: /en/projects/
---
I designed a compact, customizable jewelry box (size, number of drawers) in CATIA, over two successive iterations.

{% include "partials/stl-viewers.njk" %}

Here is how it opens. The latch lifts, then the two drawers pivot around the central cylinder, each in the opposite direction, while the top and bottom plates stay fixed. In CATIA, that gives three kinematic joints. There is a pivot between the drawers and the central cylinder, planar supports between the stacked parts and a slide for the latch. The button on the viewer above shows the movement in 3D.

## V1, without a latch

The first iteration was a cylindrical body with its lid. My early sketches were used to fix the box's general shape and closing mechanism, along with the body's position on its support and the integration of the cylinder that handles the locking. I then modeled the body and lid and exported them to STL for an initial 3D print.

The trickiest parts were the dimensioning (depth, width, height of the various parts), the number of compartments to fit in, and moving the CAD files to the slicing software, where I prepared and adjusted everything in OrcaSlicer.

## V2, with a latch

The second iteration was a group project of four. A drop test on a smaller-scale box showed us that a latch was needed to keep the box closed during transport or after a fall. We hadn't anticipated it, and it only emerged through use. We then tested several central-cylinder sizes, 3D-printed in PLA, to find the best fit for the mechanism.

The latch (printed in blue on the prototypes) has to resist shock and torsion at three points, the bottom of the cylinder, the protruding handle and between the drawers. The first version broke after several drops. We reprinted it with modified parameters to reinforce it, printed horizontally, with a 25% hexagonal infill over 3 wall layers, in PETG rather than PLA. The drop test below shows that it now takes the shock.
