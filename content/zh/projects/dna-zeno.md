---
layout: layouts/project.njk
order: 8
translationKey: adn-zenon
category: "科研"
thumbnail: "assets/img/adn-zenon/en-theorem.png"
title: "DNA 芝诺：独立研究"
description: "一项独立的物理学研究：量子芝诺效应能否保护基于 DNA 的数据存储不发生突变？"
logos:
  - src: "assets/img/logos/zenodo.png"
    alt: "Zenodo 标志"
    url: "https://doi.org/10.5281/zenodo.22308602"
hero:
  type: image
  src: "assets/img/adn-zenon/en-theorem.png"
  alt: "定理 1：假设 H1 至 H4 的形式化陈述，以及 DNA-芝诺不可行定理的结论（英文）"
gallery:
  - src: "assets/img/adn-zenon/en-tunneling-mechanism.png"
    alt: "腺嘌呤与胸腺嘧啶之间通过隧穿发生质子转移的示意图（英文）"
  - src: "assets/img/adn-zenon/en-zeno-algorithm.png"
    alt: "量子芝诺效应原理：自由演化与反复的投影测量，以及该算法的数学形式化（英文）"
stats:
  - value: "×3,000"
    label: "所需探测能量与 DNA 键断裂阈值之比"
  - value: "10⁶"
    label: "隧穿误差与合成误差之间的差距"
downloads:
  - label: "完整研究，法语版（PDF）"
    href: /assets/downloads/adn-zenon/etude-fr.pdf
  - label: "完整研究，英语版（PDF）"
    href: /assets/downloads/adn-zenon/study-en.pdf
publications:
  - title: "The Quantum Zeno Effect as an Error-Correction Algorithm for DNA Data Storage"
    doi: "10.5281/zenodo.22308602"
    date: "2026-09-04"
    lang: en
    type: ScholarlyArticle
  - title: "L'Effet Zénon Quantique comme algorithme de correction d'erreurs dans le stockage de données sur ADN"
    doi: "10.5281/zenodo.22308582"
    date: "2026-09-04"
    lang: fr
    type: ScholarlyArticle
cta:
  label: "查看全部项目"
  href: /zh/projects/
---
在这项独立研究中，我提出一个问题：量子芝诺效应能否冻结 DNA 碱基对中质子的隧穿（这是互变异构突变背后的机制之一），从而保护存储在 DNA 上的数据。

## 物理机制

氢键中的质子（例如腺嘌呤与胸腺嘧啶之间的氢键）有一定的概率，通过单纯的量子隧穿穿过那道把它的正常位置和互变异构位置隔开的能量势垒。这种切换是复制过程中突变的来源，也正是这项研究试图控制的对象。

## 所研究的算法

芝诺控制的做法是：以远短于特征隧穿时间的固定间隔，施加一个投影测量算符，迫使系统停留在初始的正常状态，而不是任其自由演化成叠加态。我用数学方式把这个算法形式化了，而现有文献里还从未明确写出过它。

## 定理与结论

我比较了这种主动控制的结构性后果（测量光子的能量远高于结合能）和热力学后果（朗道尔耗散）。由此我得出一个不可行定理：在任何可预见的技术下，对存储用 DNA 进行芝诺控制，在物理上和能量上都不可能。作为替代，我提出了一份现实可行的方案路线图（低温技术、先进的经典纠错码、XNA 基底工程、机器学习预测）。

完整报告提供法语和英语两个版本，见下方。

## 引用这项工作

以开放获取的方式发表在 Zenodo 上，法语和英语版本一一对应。
