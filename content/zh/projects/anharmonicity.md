---
layout: layouts/project.njk
order: 7
translationKey: anharmonicite
category: "科研"
thumbnail: "assets/img/anharmonicite/tracker-pointage.png"
title: "摇摆锥体的非谐性"
description: "一项独立的物理学研究：放在桌上摇摆的锥形平板的转动惯量、各向异性和耗散，通过视频和频谱分析加以验证。"
logos:
  - src: "assets/img/logos/zenodo.png"
    alt: "Zenodo 标志"
    url: "https://doi.org/10.5281/zenodo.18046830"
hero:
  type: image
  src: "assets/img/anharmonicite/tracker-pointage.png"
  alt: "在 Tracker 中对平板摇摆运动的视频跟踪：逐帧提取位置、速度和角加速度"
gallery:
  - src: "assets/img/anharmonicite/figures-matlab.png"
    alt: "MATLAB 图表：频率随时间的变化、非谐性斜率，以及振幅耗散"
stats:
  - value: "0.0363 W"
    label: "修正后的耗散功率（初次估计为 0.067 W）"
  - value: "5,243"
    label: "测得的品质因数 Q"
downloads:
  - label: "完整计算表（PDF，法语）"
    href: /assets/downloads/anharmonicite/feuille-de-calculs.pdf
publications:
  - title: "Données Expérimentales : Analyse Cinématique et Énergétique d'un Tronc de Cône sur Support Elliptique"
    doi: "10.5281/zenodo.18045758"
    date: "2025-12-24"
    lang: fr
    type: CreativeWork
  - title: "De l'anharmonicité à la géométrie : étude du puits de potentiel d'un tronc de cône massif en contact ponctuel"
    doi: "10.5281/zenodo.18046830"
    date: "2025-12-24"
    lang: fr
    type: ScholarlyArticle
  - title: "Architecture de calcul intégrée pour l'analyse cinématique et acoustique d'un oscillateur en tronc de cône"
    doi: "10.5281/zenodo.18046240"
    date: "2025-12-24"
    lang: fr
    type: CreativeWork
  - title: "Signature acoustique et de la dissipation d'énergie d'un oscillateur prenant la forme d'un tronc de cône"
    doi: "10.5281/zenodo.18046047"
    date: "2025-12-24"
    lang: fr
    type: CreativeWork
  - title: "Du suivi cinématique sous Tracker à la caractérisation de l'anharmonicité sous MATLAB"
    doi: "10.5281/zenodo.18046629"
    date: "2025-12-24"
    lang: fr
    type: CreativeWork
cta:
  label: "查看全部项目"
  href: /zh/projects/
---
我以独立的方式，从物理学角度研究了一块立在桌上的锥形玻璃板的自由摇摆，它是一个底面为圆的倒置截锥，质量 M = 1.087 公斤，底面半径 R = 0.16 米。

## 理论模型

我在极坐标下，根据面质量密度计算截锥的转动惯量。真实的转动轴不是平板的中心，而是它与地面的接触点，它与质心相距 d，视频跟踪确认 d 约为 2.94 厘米。再由惠更斯-斯坦纳定理（平行轴定理）得出绕支点的真实转动惯量 I ≈ 0.01485 kg·m²。

由于截锥的截面是椭圆，它的曲率半径沿椭圆的短轴和长轴并不相同。恢复刚度，从而振荡频率，取决于摇摆所绕的轴（这就是各向异性）。在支点处应用角动量定理可知，只有质心偏移 d 所产生的力矩才会使系统运动。

## 实验验证

我在 Tracker（免费的视频分析软件）中逐帧跟踪平板的真实运动，提取位置、速度和角加速度。同时，我录下接触时的噪声，并在 MATLAB 中用短时傅里叶变换（STFT）分析它，以便观察在阻尼和非谐性存在的情况下，频率如何随时间变化。

## 结果

- 平均频率为 26.68 Hz，时间常数 τ = 62.55 秒，品质因数 Q ≈ 5243。
- 非谐性斜率（频率对振幅）为正，为 +0.2708 Hz/a.u.。这是势阱变硬的特征，与锥形几何一致，在这种几何下，恢复力随着偏离平衡位置的距离增长得比线性更快。
- 直接用原始视频跟踪数据估计能量耗散，得到了一个荒谬的结果（4 J/s），被手动跟踪的噪声带偏了。改用由 τ 推出的能量指数衰减规律，我得到的耗散功率是 0.0363 W，比最初的 MATLAB 整体拟合（0.067 W）更精确。

## 引用这项工作

以开放获取的方式发表在 Zenodo 上，共五条配套记录（元数据为法语）。
