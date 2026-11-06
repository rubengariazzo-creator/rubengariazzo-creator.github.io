---
layout: layouts/project.njk
order: 12
translationKey: lumiere
category: "Mechanical"
thumbnail: "assets/img/lumiere/a1.jpg"
title: "LUMIÈRE: a light that balances the screen and the room"
description: "LUMIÈRE, a P2I project at EPF: a flat bar on the back of the screen, white light onto the desk and a wall halo that follows the image, in two versions."
logos:
  - src: "assets/img/logos/epf.png"
    alt: "EPF engineering school logo"
    url: "https://www.epf.fr/en"
hero:
  type: video
  src: /assets/video/lumiere/lumiere-animation.mp4
  poster: /assets/img/lumiere/hero-poster.jpg
  alt: "LUMIÈRE presentation animation (55 s, no sound): exploded assembly, mounting on the back of the screen, light adjustment, halo following the image, versions A1 and A2 and section views"
galleryTiles: true
gallery:
  - src: "assets/img/lumiere/a1.jpg"
    alt: "Version A1 on the back of the screen: the light bar at the top, the battery module at the bottom of the panel, linked by a cable"
  - src: "assets/img/lumiere/a2.jpg"
    alt: "Version A2 plugged in over USB-C, a single bar at the top of the screen, with no battery module"
  - src: "assets/img/lumiere/eclate.jpg"
    alt: "Exploded view of version A1: body, cover, front and rear diffusers, LED strips and battery module"
  - src: "assets/img/lumiere/plan-ensemble.jpg"
    alt: "Assembly drawing ENS-1: rear view of the screen with both modules, sections of the bar and the battery module, mounting detail and parts list"
  - src: "assets/img/lumiere/pieuvre.png"
    alt: "Interactor (octopus) diagram: LUMIÈRE in the centre, linked to eight elements of its surroundings (standards, user, energy, environment, screen, room lighting, other people) by its main and constraint functions"
  - src: "assets/img/lumiere/ishikawa.png"
    alt: "Ishikawa diagram: twelve causes of eye strain at a screen, sorted into six families"
  - src: "assets/img/lumiere/pugh.png"
    alt: "Weighted totals of the Pugh matrix: our concept scores 19 points, ahead of the BenQ ScreenBar Halo (16) and the Xiaomi Mi Light Bar (14)"
stats:
  - value: "570 g · 180 g"
    label: "Mass of versions A1 and A2"
  - value: "€70.50 · €23.81"
    label: "Component cost, A1 and A2"
  - value: "4 h 15 min"
    label: "A1 battery life at full brightness"
  - value: "< €40"
    label: "Target cost, below the Xiaomi Mi Light Bar"
  - value: "19 points"
    label: "Top of the Pugh matrix"
  - value: "23"
    label: "Responses to the user survey"
stlModels:
  - src: "/assets/models/lumiere/lumiere-a1.3mf"
    label: "LUMIÈRE bar and its battery module, exploded and assembled (drag to orbit)"
    mode: explode
    toggle: ["Explode", "Assemble"]
    download:
      href: /assets/downloads/lumiere/lumiere-fichiers-stl.zip
      label: "Download the STL files"
    config:
      start: 1
      zUp: true
      offsets:
        M1_corps: [0, 0, 0]
        M1_diffuseur_av: [0, 0, -24]
        M1_diffuseur_ar: [0, -16, 0]
        M1_couvercle: [0, -32, 0]
        M2_corps: [0, 0, 0]
        M2_couvercle: [0, -28, 0]
      colors:
        M1_corps: "#e6e6e6"
        M1_couvercle: "#d8d4c8"
        M1_diffuseur_av: "#f4f1ea"
        M1_diffuseur_ar: "#f4f1ea"
        M2_corps: "#c9ccd2"
        M2_couvercle: "#d8d4c8"
downloads:
  - label: "Project report (PDF, in French)"
    href: /assets/downloads/lumiere/rapport-projet.pdf
  - label: "Dimensioned drawings (PDF)"
    href: /assets/downloads/lumiere/dossier-plans.pdf
cta:
  label: "See all projects"
  href: /en/projects/
---
LUMIÈRE is our P2I project at EPF, carried out by six of us in the module "Structuring the innovation process", supervised by Jérôme Dutel. It is a flat light bar that mounts on the back of a screen. It sends adjustable white light onto the desk and a coloured halo onto the wall, and it adapts to the light in the room as well as to the colours on screen. I was the project leader.

The animation at the top of the page lasts 55 s and follows the outline of our presentation. The bar assembles part by part, settles on the back of the screen and lights up. Then you see the intensity and colour temperature adjust to the room and the halo follow the image. After that come the two versions seen from behind and the sections, with the directed light, the sensor, the evening mode and the battery life.

{% include "partials/stl-viewers.njk" %}

The viewer shows version A1 in an exploded view, with a button to assemble it and another to download the STL files for both versions.

## The team

As project leader, I coordinated the team and shared out the tasks. I built the Gantt chart and tracked planned against actual time, kept the workload and expenses sheet, did the calculations (mass, cost, battery life, power draw), modelled both versions, drew the plans, wrote a good part of the report, and made the renders and the presentation animation in Blender.

Auxence Lassagne led the decision with the Pugh matrix and worked on the slides and the report. Ludivin Marreau--Reymond worked on the state of the art, the survey, the specification and the slides. Jocelin Cerfontaine ran the brainstorming and the meetings. Ines Wallon made the mind map, the TRIZ analysis, the octopus diagram and the Ishikawa. Flore Descroix took care of the need (state of the art, survey, specification and Ishikawa).

## The problem

We spend hours in front of a very bright screen, often in a dark or poorly lit room. That contrast, reflections on the panel and some saturated colours are among the causes of eye strain our state of the art identified. The idea comes from operating theatres, where green scrubs, complementary to red, hide the afterimage. We voted for this topic at the first meeting.

Existing products fall into two families. The BenQ ScreenBar Halo and the Xiaomi Mi Light Bar light the desk but not the wall behind the screen. The Philips Hue Play and the Govee DreamView colour the wall in time with the image, but they cost €180 to €220 and are not designed against eye strain. Two patents gave us our key ideas, light adjusted by an ambient sensor and a lighting colour chosen from the image on screen.

## The need

Our questionnaire got 23 responses, almost all from students aged 17 to 20. Each question matches a cause in the Ishikawa, which sorts twelve of them into six families. Crossing the frequency from the survey with a severity estimated by the team, the Pareto chart shows that six causes make up 83% of the criticality. LUMIÈRE addresses three of them, glare, unsuitable lighting and the contrast between the screen and the room. The two most critical, dry eyes and a lack of breaks, stay outside its scope, and we said so in writing.

The specification asks for 300 to 500 lux around the screen, a colour temperature of 3000 to 6500 K, tool-free mounting in under a minute, less than 300 g, USB power, at least 3 h of battery life and a colour rendering index of at least 90. A separate function, FC9, rules out any promise of medical protection. LUMIÈRE aims at visual comfort and nothing more, all the more so since a Cochrane review finds that blue-light-filtering glasses are probably no more effective than ordinary ones. At the second meeting, we judged this specification unrealistic on battery life and battery size.

## From ideas to concept

The first brainstorming produced only 10 ideas. The inversion method got us unstuck. By asking ourselves how to damage users' eyesight, we found 24 answers, then turned each one around into an idea. A strong contrast with a black room became a halo set by a sensor, and a system so heavy it tips the screen over became a battery module placed at the bottom. We reached 37 ideas in ten families, 28 of which fed the Pugh matrix.

Auxence compared six solutions against a classic desk lamp. Our concept comes first with 19 points, ahead of the BenQ (16) and the Xiaomi (14), and its only negative point is price. Its scores were targets, since it did not exist yet. The calculations then had to check them.

## The design

LUMIÈRE comes down to two flat, closed modules. The top bar M1, 36 cm long, carries two LED strips behind their diffusers. A bicolour 24 V COB strip (2700 to 6500 K, CRI above 90) lights the desk, and an SK6812 strip makes the halo. It also houses a XIAO ESP32-C3 board, an OPT3001 light sensor, a button, a 5 V to 24 V converter and two dimming transistors. On version A1, module M2 houses a 5000 mAh 2S LiPo battery and its charger at the bottom of the panel, to keep the centre of gravity low. Version A2 does without M2 and plugs in over USB-C. Each module holds by four neodymium magnets on steel plates glued to the back of the screen, with EPDM so it does not scratch it. The housings are printed in PLA, with 1.6 mm walls and screwed covers.

The design went through four versions. The first horseshoe housing around the screen did not show how it held. The housings were open, and the battery in the top bar raised the centre of gravity. My reviews also caught a single strip for two diffusers and a missing item number on the assembly drawing, now complete with 22 items. The lamp chosen on the paper Pugh matrix was in fact an E27 bulb on 230 V mains, probably a "12 W" read as 12 V. The COB strip replaced it.

## Figures and compliance

A1 weighs 570 g for €70.50 of components, 270 g of which is the battery alone. A2 weighs 180 g for €23.81. These are component costs, not a selling price. The battery delivers about 30 Wh of usable energy and the bar draws 7 W at full brightness, which gives 4 h 15 min of battery life at full power and a little over 8 h at half brightness, against the 3 h required. A2 draws 1.41 A at 5 V.

A2 meets the target mass and price. A1 meets the battery life, but neither the mass nor the price, and that is why the plugged-in version exists. Colour temperature and light quality hold on paper. The illuminance and the heat of the COB strip were calculated, not measured, compliance with safety standards is not checked, and the companion app that sends the screen colours is not written.

## What we take away

The shared spreadsheet tracked planned against actual time. We had planned 78.75 h and logged 66.75 h, with a 7.5 h overrun on the finished tasks. The design finished early, because the board and the design were settled early on. The brainstorming and the Pareto ran late, and both the report and the slides were finished just in time for the hand-in. The Pugh matrix was also done before the brainstorming ended, with no written justification for the scores.

For most of us, running the stages of a project on our own was new. Next time I would allow a 30 to 50% margin on durations, sign off the specification only after a first estimate of mass, price and battery life, and check every part reference before choosing it. Flore suggests searching patents as early as the state of the art, and she is right, since they are what gave us the sensor and the halo.

## Limits and next steps

LUMIÈRE is a study project. At the hand-in, the design was complete (3D model, drawings, calculations, animation), but no prototype had been printed. That is the logical next step, to measure the real illuminance, the strip's heat and how well the magnets hold. We would also need to read the COB strip's datasheet (colour rendering, flicker, photobiological risk group) and write the app. We presented the project in a six-minute talk where each of us spoke, and I narrated the rest of the animation, from the halo to the sections. The report and the set of drawings are in the documents below.
