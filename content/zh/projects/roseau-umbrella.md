---
layout: layouts/project.njk
order: 11
translationKey: roseau
category: "机械设计"
thumbnail: "assets/img/roseau/rafale-dessous.jpg"
title: "ROSEAU：一把会弯而不折的雨伞"
description: "ROSEAU，一个个人设计项目：一个经过标定的弹性卡扣，让伞骨在约 60 公里/小时的风速下脱开而不是折断，之后可以用手重新扣上。"
hero:
  type: image
  src: "assets/img/roseau/rafale-dessous.jpg"
  alt: "ROSEAU 雨伞在阵风中的 3D 渲染图：伞面的一部分被掀起，伞骨从拉杆上脱开"
galleryTiles: true
gallery:
  - src: "assets/img/roseau/plan-ensemble.jpg"
    alt: "演示件的带尺寸装配图：正视图和上销的剖面图"
  - src: "assets/img/roseau/principe.jpg"
    alt: "分三步展示的工作原理：卡扣在普通风中保持连接，在阵风中张开，再用手扣回去"
  - src: "assets/img/roseau/demonstrateur.jpg"
    alt: "全尺寸演示件：支架、伞骨、绿色叉头和橙色熔断杆"
  - src: "assets/img/roseau/effort-rafale.jpg"
    alt: "回拉杆中的阵风力随风速的变化，以及三种卡扣设定的阈值"
stats:
  - value: "1000 万"
    label: "法国每年被丢弃的雨伞数量"
  - value: "60 公里/小时"
    label: "卡扣脱开的风速"
  - value: "32 牛"
    label: "熔断阈值"
  - value: "22 牛"
    label: "50 公里/小时风速下的杆力"
  - value: "0.70 欧元"
    label: "预估的额外成本（8 根伞骨）"
  - value: "67 克"
    label: "原型所用的耗材"
stlModels:
  - src: "/assets/models/roseau/roseau-demonstrateur.3mf"
    label: "演示件，爆炸视图与装配状态（拖动可旋转）"
    mode: explode
    toggle: ["爆炸", "装配"]
    download:
      href: /assets/downloads/roseau/roseau-fichiers-stl.zip
      label: "下载 STL 文件"
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
  - label: "项目报告（PDF，法语）"
    href: /assets/downloads/roseau/rapport-projet.pdf
  - label: "带尺寸图纸（PDF）"
    href: /assets/downloads/roseau/dossier-plans.pdf
  - label: "制造与装配指南（PDF，法语）"
    href: /assets/downloads/roseau/notice-fabrication-montage.pdf
cta:
  label: "查看全部项目"
  href: /zh/projects/
---
ROSEAU 是我的个人设计项目。我想重新设计雨伞的伞骨和撑骨之间的连接，让多出来的一阵风不再让你失去一把伞，而只是“咔哒”一声。我在 2026 年秋天独自完成了它，从需求一直做到一个已经建模、计算好尺寸、可以直接打印的原型。

{% include "partials/stl-viewers.njk" %}

上面的查看器以爆炸视图展示装配体，有一个按钮可以切换到装配状态，另一个按钮可以下载 9 个 STL 文件。制造与装配指南和整套图纸在下面的文档里。

## 问题

法国每年有一千万把雨伞被丢弃，全世界大约有十亿把。它们由塑料、钢和尼龙压接而成，几乎从不被回收。修理师们对典型的故障看法一致：伞骨和撑骨之间的连接处，或者它的铆钉，恰好在阵风集中受力的地方断裂。现有的“防风”雨伞靠更硬、更重、更贵来撑住，而且无法修理。

## 需求

我没有用“牛眼图”，而是通过外部环境的各种要素来描述需求，画成了章鱼图。由此我得出两项主要功能：保护使用者不被雨淋，以及在阵风下依然保护使用者且不损坏产品。量化的需求说明书设定了目标：风速达 50 公里/小时时不发生变形，100 公里/小时时没有零件断裂或飞出，恢复使用的时间不到 10 秒、用力小于 50 牛且不用工具，额外成本低于 1 欧元。

## 从原因到方案

我用石川图（鱼骨图）列出了十三个断裂原因，再用帕累托图按严重程度排序。没有熔断元件的刚性连接和铆接节点，这两项就占了 47% 的严重度，四个原因合计占 64%。五十个头脑风暴想法、反向思考法（“怎样才能保证雨伞在第一阵风里就坏掉？”）和 TRIZ 分析，把我引向了一个思路：采用一种在已知阈值下让开、然后又能扣回去的连接，就像电气保险丝，或者带校准释放力的滑雪固定器。我用加权的普氏矩阵比较了七个手绘概念。熔断式连接排在第一，然后又用第二个矩阵，在五种熔断技术中选出了打印的弹性卡扣。

## 原理

每根伞骨上，一个粘接的叉头带着一根 3 毫米的钢销。回拉杆的末端是一个 U 形弹性卡扣，扣在这根销上。在普通风中，卡扣传递张开的力，雨伞表现得和普通雨伞一样。当阵风把伞面掀起时，杆中的力上升。超过阈值后，卡扣的两臂张开，伞骨自由摆动。什么都不会断，什么也不会飞出去。雨伞收拢后，你一个动作就能把卡扣重新按回销上。

## 尺寸计算

我的尺寸计算基于一个解析模型（简化的流体力学和材料力学），而不是有限元仿真。在 50 公里/小时时，一根伞骨所承担的那部分伞面受到的风推力是 8.2 牛，对应回拉杆中的 22 牛。这个力随速度的平方增长，到 100 公里/小时时达到 89 牛。每根卡扣臂是一根 PETG 梁，必须张开 0.55 毫米才能放开销，由此得到 32 牛的拔出阈值，对应约 60 公里/小时时脱开。另外两种设定把它夹在中间（24 牛对应 52 公里/小时，42 牛对应 69 公里/小时）。臂的应变保持在 2.5%，低于可重复使用卡扣的 3% 极限，重新扣上需要 32 牛，低于要求的 50 牛。如果没有这个熔断结构，玻璃纤维伞骨中的应力在 100 公里/小时时会达到 870 MPa，超过它的强度。

## 原型

演示件按全尺寸复刻了一根伞骨的熔断连接，包括一个支架、一段缩短的伞骨、一个叉头、一根销和熔断杆。它由 9 个可打印的零件组成，使用 PETG 和 PLA，耗材约 67 克。我用参数化方式建模，所以计算、带尺寸图纸和打印文件用的是同一组尺寸。

## 局限与下一步

验证是解析式的。每一项量化要求都通过计算得到满足，但我在这里没有给出任何实物测试。阈值取决于卡扣与销之间的摩擦，所以我设计了三种卡唇开口设定。合乎逻辑的下一步是：用真正的玻璃纤维伞骨做一个原型，做第 2 版（带可调的球和弹簧），以及一套修理包（伞骨、伞尖和卡扣式熔断件）。参考资料列在报告中。
