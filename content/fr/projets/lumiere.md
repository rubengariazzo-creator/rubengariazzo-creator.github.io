---
layout: layouts/project.njk
order: 12
translationKey: lumiere
category: "Mécanique"
thumbnail: "assets/img/lumiere/a1.jpg"
title: "LUMIÈRE : une lumière qui équilibre l'écran et la pièce"
description: "LUMIÈRE, projet P2I à l'EPF : une barre plate au dos de l'écran, lumière blanche vers le bureau et halo vers le mur qui suit l'image, en deux versions."
logos:
  - src: "assets/img/logos/epf.png"
    alt: "Logo EPF, école d'ingénieurs"
    url: "https://www.epf.fr"
hero:
  type: video
  src: /assets/video/lumiere/lumiere-animation.mp4
  poster: /assets/img/lumiere/hero-poster.jpg
  alt: "Animation de présentation de LUMIÈRE (55 s, sans son) : assemblage en éclaté, pose au dos de l'écran, réglage de la lumière, halo qui suit l'image, versions A1 et A2 et vues en coupe"
galleryTiles: true
gallery:
  - src: "assets/img/lumiere/a1.jpg"
    alt: "Version A1 au dos de l'écran : la barre lumineuse en haut, le module batterie en bas de la dalle, reliés par un câble"
  - src: "assets/img/lumiere/a2.jpg"
    alt: "Version A2 branchée en USB-C, une seule barre au sommet de l'écran, sans module batterie"
  - src: "assets/img/lumiere/eclate.jpg"
    alt: "Vue éclatée de la version A1 : corps, couvercle, diffuseurs avant et arrière, rubans LED et module batterie"
  - src: "assets/img/lumiere/plan-ensemble.jpg"
    alt: "Dessin d'ensemble ENS-1 : vue arrière de l'écran avec les deux modules, coupes de la barre et du module batterie, détail de la fixation et nomenclature"
  - src: "assets/img/lumiere/pieuvre.png"
    alt: "Diagramme pieuvre : LUMIÈRE au centre, relié à huit éléments du milieu extérieur (normes, utilisateur, énergie, environnement, écran, éclairage de la pièce, autres personnes) par ses fonctions principales et contraintes"
  - src: "assets/img/lumiere/ishikawa.png"
    alt: "Diagramme d'Ishikawa : douze causes de fatigue visuelle sur écran, classées en six familles"
  - src: "assets/img/lumiere/pugh.png"
    alt: "Totaux pondérés de la matrice de Pugh : notre concept obtient 19 points, devant la BenQ ScreenBar Halo (16) et la Xiaomi Mi Light Bar (14)"
stats:
  - value: "570 g · 180 g"
    label: "Masse des versions A1 et A2"
  - value: "70,50 € · 23,81 €"
    label: "Coût des composants, A1 et A2"
  - value: "4 h 15"
    label: "Autonomie de A1 à pleine luminosité"
  - value: "< 40 €"
    label: "Coût visé, sous la Xiaomi Mi Light Bar"
  - value: "19 points"
    label: "En tête de la matrice de Pugh"
  - value: "23"
    label: "Réponses à l'enquête utilisateur"
stlModels:
  - src: "/assets/models/lumiere/lumiere-a1.3mf"
    label: "Barre LUMIÈRE et son module batterie, en éclaté et assemblé (glisser pour orbiter)"
    mode: explode
    toggle: ["Éclater", "Assembler"]
    download:
      href: /assets/downloads/lumiere/lumiere-fichiers-stl.zip
      label: "Télécharger les STL"
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
  - label: "Rapport de projet (PDF)"
    href: /assets/downloads/lumiere/rapport-projet.pdf
  - label: "Dossier de plans cotés (PDF)"
    href: /assets/downloads/lumiere/dossier-plans.pdf
cta:
  label: "Voir les projets"
  href: /projets/
---
LUMIÈRE est notre projet P2I à l'EPF, mené à six dans le module « Structurer le processus d'innovation », encadré par Jérôme Dutel. C'est une barre lumineuse plate qui se fixe au dos d'un écran. Elle envoie une lumière blanche réglable vers le bureau et un halo de couleur vers le mur, et elle s'adapte à la lumière de la pièce comme aux couleurs affichées. J'étais chef de projet.

L'animation en tête de page dure 55 s et suit le déroulé de notre soutenance. La barre s'assemble pièce par pièce, se pose au dos de l'écran et s'allume. On voit ensuite l'intensité et la teinte se régler selon la pièce et le halo suivre l'image. Puis viennent les deux versions vues de dos et les coupes, avec la lumière dirigée, le capteur, le mode soirée et l'autonomie.

{% include "partials/stl-viewers.njk" %}

Le visualiseur montre la version A1 en vue éclatée, avec un bouton pour l'assembler et un autre pour télécharger les fichiers STL des deux versions.

## L'équipe

En tant que chef de projet, j'ai coordonné l'équipe et réparti les tâches. J'ai construit le diagramme de Gantt et suivi le prévu et le réalisé, tenu le tableau des charges et des dépenses, fait les calculs (masse, coût, autonomie, consommation), modélisé les deux versions, dessiné les plans, rédigé une bonne part du rapport, et réalisé sous Blender les rendus et l'animation de présentation.

Auxence Lassagne a mené la décision avec la matrice de Pugh et a travaillé sur le diaporama et le rapport. Ludivin Marreau--Reymond a travaillé sur l'état de l'art, l'enquête, le cahier des charges et le diaporama. Jocelin Cerfontaine a animé le brainstorming et les réunions. Ines Wallon a fait la carte mentale, le TRIZ, le diagramme pieuvre et l'Ishikawa. Flore Descroix s'est occupée du besoin (état de l'art, enquête, cahier des charges et Ishikawa).

## Le problème

On passe des heures devant un écran très lumineux, souvent dans une pièce sombre ou mal éclairée. Ce contraste, les reflets sur la dalle et certaines couleurs saturées font partie des causes de fatigue visuelle que notre état de l'art a relevées. L'idée vient des salles d'opération, où les tenues vertes, complémentaires du rouge, masquent l'image rémanente. Nous avons voté pour ce sujet à la première réunion.

Les produits existants se rangent en deux familles. La BenQ ScreenBar Halo et la Xiaomi Mi Light Bar éclairent le bureau mais pas le mur derrière l'écran. Le Philips Hue Play et le Govee DreamView colorent le mur au rythme de l'image, mais ils coûtent de 180 à 220 € et ne sont pas pensés contre la fatigue. Deux brevets nous ont donné nos idées clés, le réglage de la lumière par un capteur d'ambiance et une couleur d'éclairage choisie d'après l'image affichée.

## Le besoin

Notre questionnaire a reçu 23 réponses, presque toutes d'étudiants de 17 à 20 ans. Chaque question correspond à une cause de l'Ishikawa, qui en range douze en six familles. En croisant la fréquence tirée de l'enquête et une gravité estimée par l'équipe, le Pareto montre que six causes font 83 % de la criticité. LUMIÈRE en traite trois, l'éblouissement, l'éclairage mal adapté et le contraste entre l'écran et la pièce. Les deux plus critiques, les yeux secs et le manque de pauses, restent hors de son champ, et nous l'avons écrit.

Le cahier des charges demande 300 à 500 lux autour de l'écran, une teinte de 3000 à 6500 K, une pose sans outil en moins d'une minute, moins de 300 g, une alimentation USB, au moins 3 h d'autonomie et un indice de rendu des couleurs d'au moins 90. Une fonction à part, FC9, interdit toute promesse de protection médicale. LUMIÈRE vise le confort visuel, rien de plus, d'autant qu'une revue Cochrane juge les verres anti lumière bleue probablement pas plus efficaces que des verres ordinaires. À la deuxième réunion, nous avons jugé ce cahier des charges peu réaliste sur l'autonomie et la taille de la batterie.

## Des idées au concept

Le premier brainstorming n'a donné que 10 idées. La méthode de l'inversion nous a débloqués. En nous demandant comment endommager la vue des utilisateurs, nous avons trouvé 24 réponses, puis retourné chacune en idée. Un fort contraste avec une pièce noire est devenu un halo réglé par un capteur, et un système trop lourd qui fait basculer l'écran est devenu un module batterie placé en bas. Nous sommes arrivés à 37 idées en dix familles, dont 28 ont servi à la matrice de Pugh.

Auxence a comparé six solutions à une lampe de bureau classique. Notre concept arrive en tête avec 19 points, devant la BenQ (16) et la Xiaomi (14), et son seul point négatif est le prix. Ses notes étaient des objectifs, puisqu'il n'existait pas encore. Les calculs devaient ensuite les vérifier.

## La conception

LUMIÈRE tient en deux modules plats et fermés. La barre haute M1, longue de 36 cm, porte deux rubans LED derrière leurs diffuseurs. Un ruban COB 24 V bicolore (2700 à 6500 K, IRC supérieur à 90) éclaire le bureau, et un ruban SK6812 fait le halo. Elle loge aussi une carte XIAO ESP32-C3, un capteur de lumière OPT3001, un bouton, un convertisseur 5 V vers 24 V et deux transistors de gradation. Le module M2 de la version A1 loge une batterie LiPo 2S de 5000 mAh et son chargeur en bas de la dalle, pour garder le centre de gravité bas. La version A2 se passe de M2 et se branche en USB-C. Chaque module tient par quatre aimants néodyme sur des plaques d'acier collées au dos de l'écran, avec de l'EPDM pour ne pas le rayer. Les boîtiers sont en PLA imprimé, avec des parois de 1,6 mm et des couvercles vissés.

Le design a connu quatre versions. Le premier boîtier en fer à cheval autour de l'écran ne montrait pas comment il tenait. Les boîtiers étaient ouverts, et la batterie dans la barre haute remontait le centre de gravité. Mes revues ont aussi relevé un seul ruban pour deux diffuseurs et un repère manquant sur le dessin d'ensemble, aujourd'hui complet à 22 repères. La lampe retenue sur la Pugh papier était en fait une ampoule E27 sur secteur 230 V. Le ruban COB l'a remplacée.

## Chiffres et conformité

A1 pèse 570 g pour 70,50 € de composants, dont 270 g pour la seule batterie. A2 pèse 180 g pour 23,81 €. Ce sont des coûts de composants, pas un prix de vente. La batterie fournit environ 30 Wh utiles et la barre consomme 7 W à pleine luminosité, ce qui donne 4 h 15 d'autonomie à fond et un peu plus de 8 h à mi-luminosité, pour 3 h demandées. A2 tire 1,41 A sous 5 V.

A2 respecte la masse et le prix visés. A1 respecte l'autonomie, mais ni la masse ni le prix, et c'est pour cela que la version branchée existe. La teinte et la qualité de lumière sont tenues sur le papier. L'éclairement et la chaleur du ruban COB ont été calculés, pas mesurés, la conformité aux normes de sécurité n'est pas vérifiée et l'appli compagnon qui envoie les couleurs de l'écran n'est pas écrite.

## Ce que nous en retenons

Le classeur partagé suivait le prévu et le réalisé. Nous avions prévu 78,75 h et nous en avons compté 66,75, avec 7,5 h de dépassement sur les tâches terminées. La conception a fini en avance, parce que la carte et le design avaient été décidés tôt. Le brainstorming et le Pareto ont pris du retard, et le rapport comme le diaporama ont été terminés juste à temps pour la remise. La Pugh a aussi été faite avant la fin du brainstorming, sans justification écrite des notes.

Pour la plupart d'entre nous, enchaîner seuls les étapes d'un projet était nouveau. La prochaine fois, je prévoirais 30 à 50 % de marge sur les durées, je validerais le cahier des charges seulement après un premier calcul de masse, de prix et d'autonomie, et je vérifierais chaque référence avant de la retenir. Flore propose de chercher les brevets dès l'état de l'art, et elle a raison, puisque ce sont eux qui nous ont donné le capteur et le halo.

## Limites et suites

LUMIÈRE est un projet d'étude. Au rendu, la conception était complète (modèle 3D, plans, calculs, animation), mais aucun prototype n'était imprimé. C'est la prochaine étape logique, pour mesurer l'éclairement réel, la chaleur du ruban et la tenue des aimants. Il faudrait aussi lire la fiche du ruban COB (rendu des couleurs, scintillement, groupe de risque photobiologique) et écrire l'appli. Nous avons présenté le projet en soutenance, un oral de six minutes où chacun a pris la parole, et j'ai commenté la suite de l'animation, du halo jusqu'aux coupes. Le rapport et le dossier de plans sont dans les documents ci-dessous.
