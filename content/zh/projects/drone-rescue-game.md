---
layout: layouts/project.njk
order: 3
translationKey: jeu-de-drones
category: "编程"
thumbnail: "assets/img/jeu-de-drones/schema-boucle-jeu-thumb.png"
title: "无人机救援游戏"
description: "一个 Python 游戏：自主无人机要在网格上救出幸存者，并在避开危险的同时把他们送到医院。"
logos:
  - src: "assets/img/logos/epf.png"
    alt: "EPF 工程师学院标志"
    url: "https://www.epf.fr/en"
hero:
  type: image
  src: "assets/img/jeu-de-drones/schema-boucle-jeu-en.png"
  alt: "游戏循环示意图（出自法语报告）：无人机阶段、网格更新、风暴阶段和碰撞处理"
downloads:
  - label: "项目报告（PDF，法语）"
    href: /assets/downloads/jeu-de-drones/rapport.pdf
  - label: "源代码（Python）"
    href: /assets/downloads/jeu-de-drones/drone-rescue.py
cta:
  label: "查看全部项目"
  href: /zh/projects/
---
我和搭档 Ilyane Haida 一起，在 12x12 的网格上编写了一个救援游戏。无人机要找到幸存者并把他们送到医院，同时避开风暴和建筑，而电量一直在消耗。

<div class="drone-game" data-lang="en">
  <p class="drone-game-intro">你可以直接在浏览器里玩。这个小组件实际运行的是下方的 Python 脚本（未经修改，实时获取），借助 <strong>Pyodide</strong>（编译为 WebAssembly 的 CPython），无需安装任何东西。移动指令输入在网格下方出现的输入框中，回答期间它始终可见。游戏界面为英文。</p>
  <div class="drone-game-rules">
    <p>规则简述。</p>
    <ul>
      <li>网格为 12×12，列为 <code>A</code> 到 <code>L</code>，行为 <code>0</code> 到 <code>11</code>。</li>
      <li>网格上，<code>B</code> 是建筑，<code>H</code> 是医院，<code>S</code> 是幸存者，<code>T</code> 是风暴，<code>D</code> 是无人机。</li>
      <li>每回合最多移动 3 架无人机，每次一格（含对角线），去接幸存者并把他们送到医院。</li>
      <li>每次移动消耗 1 点电量（接幸存者另加 2 点）；电量在医院充电。</li>
      <li>风暴在移动时碰到任何处于活动状态的无人机，都会使其失能 2 个回合。</li>
      <li>每送达一名幸存者到医院得 1 分。所有幸存者获救、所有无人机失能，或进行满 40 回合时，游戏结束。</li>
      <li>玩的时候，先输入要移动的无人机编号（输入 <code>f</code> 结束回合），再输入目的地，格式为“列 行”，例如 <code>C 5</code>。</li>
    </ul>
  </div>
  <button type="button" class="drone-game-play">Play the game</button>
  <p class="drone-game-status" aria-live="polite"></p>
  <pre class="drone-game-terminal" hidden></pre>
  <form class="drone-game-input-form" hidden>
    <label class="drone-game-input-label" for="drone-game-input"></label>
    <input type="text" id="drone-game-input" class="drone-game-input-field" autocomplete="off">
    <button type="submit">Send</button>
  </form>
  <p class="drone-game-fallback-notice" hidden></p>
  <div class="drone-game-controls" hidden>
    <button type="button" class="drone-game-replay" hidden>Play again</button>
  </div>
</div>
<script src="/assets/js/drone-game.js" defer></script>

## 程序结构

程序分为五个部分：配置加载（JSON）、随机放置实体、显示函数、移动与规则引擎，以及计分。项目报告对每一部分都有详细说明。
