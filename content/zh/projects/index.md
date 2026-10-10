---
layout: layouts/page.njk
translationKey: projects-list
projectFilter: true
heroBackground: true
heroColors: ["#0b0d10", "#0f2a24", "#134a3a"]
title: "项目"
description: "Ruben Gariazzo 的工程、编程与研究项目列表。"
---
<div class="filter-pills" role="group" aria-label="按类别筛选项目">
  <button type="button" class="filter-pill is-active" data-filter="all" aria-pressed="true">全部</button>
  <button type="button" class="filter-pill" data-filter="航空航天" aria-pressed="false">航空航天</button>
  <button type="button" class="filter-pill" data-filter="机械设计" aria-pressed="false">机械设计</button>
  <button type="button" class="filter-pill" data-filter="编程" aria-pressed="false">编程</button>
  <button type="button" class="filter-pill" data-filter="科研" aria-pressed="false">科研</button>
  <button type="button" class="filter-pill" data-filter="商业" aria-pressed="false">商业</button>
  <button type="button" class="filter-pill" data-filter="创意" aria-pressed="false">创意</button>
</div>

<ul class="project-cards">
{%- set zhProjects = collections.projects | byLang("zh") %}
{%- for project in zhProjects %}
  <li data-category="{{ project.data.category }}">
    <a href="{{ project.url }}">
      <div class="project-card-media">
        <span class="project-card-thumb">{%- if project.data.thumbnail %}{% image project.data.thumbnail, "" %}{% endif -%}</span>
        {%- if project.data.logos and project.data.logos.length %}
        <div class="project-card-logos">
          {%- for logo in project.data.logos %}
          <img src="/{{ logo.src }}" alt="{{ logo.alt }}" loading="lazy">
          {%- endfor %}
        </div>
        {%- endif %}
        <span class="project-card-tag">{{ "0" if loop.index < 10 }}{{ loop.index }} · {{ project.data.category }}</span>
      </div>
      <span class="project-card-title">{{ project.data.title }}</span>
      <p>{{ project.data.description }}</p>
    </a>
  </li>
{%- endfor %}
</ul>
<p class="filter-empty" hidden aria-live="polite">这个类别下暂时还没有项目。</p>
