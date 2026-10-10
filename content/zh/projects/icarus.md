---
layout: layouts/project.njk
youtube: true
order: 2
translationKey: icarus
category: "航空航天"
thumbnail: "assets/img/icarus/IMG_6473.jpg"
title: "伊卡洛斯（Icarus）：在 C'Space 2026 上飞行的迷你火箭"
description: "伊卡洛斯（Icarus），EPF Astronomie 的迷你火箭，在 C'Space 2026 上飞行：CAD 设计并 3D 打印的头锥、StabTraj 仿真、Arduino 电子系统、Blender 动画。"
logos:
  - src: "assets/img/logos/epf.png"
    alt: "EPF 工程师学院标志"
    url: "https://www.epf.fr/en"
  - src: "assets/img/logos/epf-astronomie.jpg"
    alt: "EPF Astronomie 标志，EPF 的航天社团"
    url: "https://www.linkedin.com/company/epf-astronomie"
hero:
  scrollDriven: true
  src: /assets/video/icarus/icarus-3d-hero.mp4
  srcMobile: /assets/video/icarus/icarus-3d-hero-mobile.mp4
  poster: /assets/img/icarus/hero-poster.jpg
  alt: "伊卡洛斯火箭的 3D 动画，随着你向下滚动而前进，然后发射"
gallery:
  - src: "assets/img/icarus/IMG_6473.jpg"
    alt: "发射前组装完毕的伊卡洛斯火箭"
  - src: "assets/img/icarus/IMG_6474.jpg"
    alt: "伊卡洛斯火箭的近景，团队成员的面部已做模糊处理"
  - src: "assets/img/icarus/IMG_6475.jpg"
    alt: "发射架上的伊卡洛斯火箭"
  - src: "assets/img/icarus/attestation-de-vol.jpg"
    alt: "伊卡洛斯火箭的官方飞行证明"
    link: /assets/img/icarus/attestation-de-vol.jpg
    linkLabel: "查看飞行证明"
stats:
  - value: "230 米"
    label: "预测远地点高度"
  - value: "6.20–6.52"
    label: "稳定裕度（口径）"
  - value: "74 米/秒"
    label: "最大速度"
  - value: "1.14 米"
    label: "长度"
  - value: "1.66 公斤"
    label: "起飞质量"
  - value: "31 秒"
    label: "预测飞行时间"
stlModels:
  - src: "/assets/models/icarus/icarus-coiffe.stl"
    label: "伊卡洛斯头锥，CAD 模型（拖动可旋转）"
    download:
      href: /assets/models/icarus/icarus-coiffe.stl
      label: "下载 STL"
    config:
      zUp: true
downloads:
  - label: "头锥技术图纸（PDF）"
    href: /assets/downloads/icarus/plan-coiffe.pdf
  - label: "稳定性与弹道结果（PDF，英语）"
    href: /assets/downloads/icarus/stabilite-trajectoire-en.pdf
  - label: "降落伞释放机构（PDF，英语）"
    href: /assets/downloads/icarus/parachute-mechanism-en.pdf
cta:
  label: "查看全部项目"
  href: /zh/projects/
---
伊卡洛斯（Icarus）是一枚实验性迷你火箭，由我们设计、制造并在 C'Space 2026 上飞行。C'Space 是由 CNES（法国国家空间研究中心）和 Planète Sciences 在热尔（Ger）军营举办的学生发射活动，由第 1 空降猎兵团（1er RHP）承办。它的飞行是正常的。

我们一共五个人，都是 EPF 航天社团 EPF Astronomie 的成员。项目由 Camille Gaudeaux 负责，成员有 Margaux Vahlas、Chimène Tabaste、Ambroise Denduang Wolber 和我。

## 火箭

伊卡洛斯长 1.14 米，起飞质量 1.66 公斤（不含发动机为 1.50 公斤）。动力来自一台 Pandora 发动机（Pro24-6G），由四片尾翼稳定，顶部是尖拱形头锥。它从一根 2.5 米长、倾角 80° 的导轨上起飞，并借助一顶 0.26 平方米的十字形降落伞返回地面。

## 我的贡献

- **头锥。**我在 CATIA 中建模，这是一个长 210 毫米的拱形头锥，按 83 毫米的箭体直径设计，然后用 PETG 3D 打印（打印耗时 6 小时 44 分钟）。它的技术图纸可以在下方下载。
- **结构件。**我 3D 打印了尾翼安装笼（PLA，6 小时 37 分钟）和发动机固定环（PETG，1 小时 36 分钟）。
- **飞行动力学。**我作为团队的一员，参与了用 StabTraj（Planète Sciences 的参考工具）进行的稳定性和弹道仿真，以确认伊卡洛斯会沿直线正常飞行，而不是翻滚。
- **3D 动画。**我用 Blender 制作，并以多种格式交付（电视屏幕、展示终端、社交媒体）。它一直保密，直到开学时才揭晓。

{% include "partials/stl-viewers.njk" %}

你可以用鼠标旋转上面的头锥模型，按钮可以下载它的 STL 文件。

## 稳定性与弹道

仿真结果符合 Planète Sciences 的稳定性标准。细长比为 14.3（要求在 10 到 20 之间），升力系数（Cnα）为 21（要求在 15 到 30 之间），静稳定裕度为 6.2 到 6.5 口径，取决于发动机是满的还是空的。这个裕度略高于推荐的最大值 6，所以结论是“过度稳定”（overstable），也就是说火箭在飞行中非常稳定，并有迎风偏转的倾向。

在弹道方面，火箭以 23 米/秒离开导轨，最高速度 74 米/秒，最大加速度达 135 米/秒²（接近 14 g），在 6.7 秒时到达 230 米的最高点。降落伞在 8 秒时打开，使火箭以 9.9 米/秒的速度下降，整个飞行持续 31 秒。如果没有降落伞，它会以 56 米/秒、近 2500 焦耳的能量撞击地面，这正是回收系统存在的全部意义。

完整结果可在下方查看。

## 回收电子系统

<div class="diagram-scroll" tabindex="0" role="group" aria-label="电子系统示意图，可横向滚动">
<img class="diagram" src="/assets/img/icarus/electronics-diagram-en.svg" alt="伊卡洛斯电子模块的四步示意图：在导轨上、起飞、上升、舵机展开降落伞并点亮绿色 LED（图中文字为英文）" width="1200" height="370" loading="lazy">
</div>

伊卡洛斯的电子模块只有一个任务，就是在正确的时刻打开降落伞。它由一块 5 V 电池、一块充当定时器的 Arduino Nano 板、一个舵机和三个指示灯（红、蓝、绿）组成。

下面一步步说明它是怎么工作的。

1. **在导轨上。**插头已连接，红灯亮起，表示系统已通电并处于待机状态。
2. **起飞时。**插头被拔出。红灯熄灭，蓝灯开始闪烁，倒计时开始。
3. **上升过程中。**倒计时的延迟是根据 StabTraj 仿真设定的。它在远地点（仿真为 6.7 秒）之后不久结束，这时火箭几乎已经爬升完毕，速度较低。
4. **展开时。**舵机转动，释放一根被压紧的弹簧，猛地把舱盖推开。降落伞被弹出，蓝灯熄灭，绿灯亮起，表示整个流程已完整执行。

机构的三张照片（舱盖关闭、舱盖打开、舵机及其摇臂）汇集在下方可下载的文档中。

## 飞行

2026 年夏天，伊卡洛斯在 C'Space 活动中于热尔军营起飞，飞行正常，官方飞行证明也予以确认（见图集）。

## 视频

这里有 EPF Astronomie 团队的两段视频：导轨上的准备工作，以及完整的飞行。只有在你点击之后，才会从 YouTube 加载。（YouTube 在部分地区可能无法访问。）

<div class="video-pair">
<figure>
<button type="button" class="video-frame" data-youtube="ln1xKORxIPM" data-title="[ICARUS] 导轨作业，C'Space 2026" aria-label="播放视频：[ICARUS] 导轨作业，C'Space 2026"><img src="/assets/img/icarus/video-operations-rampe.jpg" alt="" width="960" height="540" loading="lazy"></button>
<figcaption>[ICARUS] 导轨作业，C'Space 2026</figcaption>
</figure>
<figure>
<button type="button" class="video-frame" data-youtube="rKllDS1oF5s" data-title="[ICARUS] C'Space 2026 完整飞行" aria-label="播放视频：[ICARUS] C'Space 2026 完整飞行"><img src="/assets/img/icarus/video-vol-complet.jpg" alt="" width="960" height="540" loading="lazy"></button>
<figcaption>[ICARUS] C'Space 2026 完整飞行</figcaption>
</figure>
</div>

## 媒体报道与提及

EPF Astronomie 在它发布于 LinkedIn 的[C'Space 2026 回顾](https://www.linkedin.com/posts/epf-astronomie_retour-sur-le-cspace-2026-activity-7511855360081588224-CDHw)中提到了它。

另外，还有[“Nominal flight achieved!”（伊卡洛斯在 C'Space 2026）](https://www.linkedin.com/feed/update/urn:li:activity:7506806576557613056/)，这条帖子配有项目的 3D 动画和 EPF Astronomie 团队的反应，以及 Chimène Tabaste 的帖子[《从设计到正常飞行：伊卡洛斯》](https://fr.linkedin.com/posts/chim%C3%A8ne-tabaste-969aa4331_de-la-conception-au-vol-nominal-icarus-activity-7485954383550205952-eefN)（法语）。
