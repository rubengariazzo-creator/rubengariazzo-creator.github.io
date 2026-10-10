---
layout: layouts/project.njk
order: 1
translationKey: boite-a-bijoux
category: "机械设计"
thumbnail: "assets/img/boite-a-bijoux/boite-ouverte-stl.jpg"
title: "首饰盒"
description: "首饰盒的 CAD 设计，历经两次迭代：先是没有锁扣，后来加上锁扣机构，一直做到 3D 打印。"
logos:
  - src: "assets/img/logos/epf.png"
    alt: "EPF 工程师学院标志"
    url: "https://www.epf.fr/en"
hero:
  type: image
  src: "assets/img/boite-a-bijoux/boite-ouverte-stl.jpg"
  alt: "打开状态的首饰盒 3D 模型：锁扣升起，两个抽屉向外转开，可以清楚地看到抽屉和顶板"
gallery:
  - src: "assets/img/boite-a-bijoux/croquis-concept.jpg"
    alt: "首饰盒早期的外形探索草图"
  - src: "assets/img/boite-a-bijoux/croquis-dimensions.jpg"
    alt: "锁扣机构的带尺寸草图"
  - src: "assets/img/boite-a-bijoux/cad-loquet.jpg"
    alt: "锁扣机构的 CAD 模型"
  - src: "assets/img/boite-a-bijoux/impressions-test.jpg"
    alt: "不同尺寸的中心圆柱 3D 打印原型"
  - type: video
    src: /assets/video/boite-a-bijoux/test-choc-loquet.mp4
    poster: /assets/img/boite-a-bijoux/test-choc-loquet-poster.jpg
    alt: "V2 锁扣的冲击测试（蓝色打印件，位于顶部）：原型被摔落，完好无损"
stlModels:
  - src: "/assets/models/boite-a-bijoux/boite-assemblee.3mf"
    label: "完整 CAD 装配体，V2（拖动可旋转）"
    mode: drawers
    download:
      href: /assets/downloads/boite-a-bijoux/boite-a-bijoux-v2-stl.zip
      label: "下载 STL 文件"
    toggle: ["打开", "关闭"]
    config:
      zUp: true
      drawers: "Part1"
      drawersSplitZ: 20
      drawersPivot: [-50.3232, 55.6333]
      drawersAngle: 70
      latch: ["loquet", "loquet_cylindre"]
      latchLift: 110
cta:
  label: "查看全部项目"
  href: /zh/projects/
---
我在 CATIA 中分两次迭代，设计了一个紧凑、可定制（尺寸、抽屉数量）的首饰盒。

{% include "partials/stl-viewers.njk" %}

它是这样打开的：锁扣先升起，然后两个抽屉绕着中心圆柱各自朝相反方向转开，而顶板和底板保持不动。在 CATIA 里，这对应三种运动副：抽屉与中心圆柱之间是转动副，叠放的零件之间是平面支撑，锁扣则是滑动副。上方查看器里的按钮可以用 3D 演示这个动作，也可以下载第 2 版的 STL 文件。

## V1，没有锁扣

第一次迭代是一个带盖的圆柱形盒身。我早期的草图用来确定盒子的整体形状和闭合机构，以及盒身在底座上的位置，还有负责锁定的圆柱如何集成。随后我建模了盒身和盒盖，并导出为 STL 进行第一次 3D 打印。

最棘手的部分是尺寸设计（各零件的深度、宽度、高度）、要容纳多少个隔间，以及把 CAD 文件转到切片软件，我在 OrcaSlicer 里完成了准备和调整。

## V2，带锁扣

第二次迭代是一个四人小组的项目。对一个缩小比例的盒子做的跌落测试告诉我们，需要一个锁扣，才能在运输途中或掉落后保持盒子闭合。我们事先没有想到这一点，它是在使用中才浮现出来的。接着我们测试了几种中心圆柱的尺寸，用 PLA 3D 打印，找到最适合这套机构的尺寸。

锁扣（在原型中打印为蓝色）必须在三个位置抵抗冲击和扭转：圆柱底部、突出的把手以及抽屉之间。第一版在几次跌落后断了。我们修改参数重新打印来加强它，改为水平打印，3 层壁厚，25% 六边形填充，材料从 PLA 换成了 PETG。下面的跌落测试显示，它现在能承受冲击。
