---
layout: layouts/page.njk
translationKey: projects-list
projectFilter: true
heroBackground: true
heroColors: ["#0b0d10", "#0f2a24", "#134a3a"]
title: "Projects"
description: "List of Ruben Gariazzo's engineering, programming, and research projects."
---
<div class="filter-pills" role="group" aria-label="Filter projects by category">
  <button type="button" class="filter-pill is-active" data-filter="all" aria-pressed="true">All</button>
  <button type="button" class="filter-pill" data-filter="Aerospace" aria-pressed="false">Aerospace</button>
  <button type="button" class="filter-pill" data-filter="Mechanical" aria-pressed="false">Mechanical</button>
  <button type="button" class="filter-pill" data-filter="Programming" aria-pressed="false">Programming</button>
  <button type="button" class="filter-pill" data-filter="Research" aria-pressed="false">Research</button>
  <button type="button" class="filter-pill" data-filter="Business" aria-pressed="false">Business</button>
  <button type="button" class="filter-pill" data-filter="Creative" aria-pressed="false">Creative</button>
</div>

<ul class="project-cards">
{%- for project in collections.projects %}
{%- if project.data.lang == "en" %}
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
{%- endif %}
{%- endfor %}
</ul>
<p class="filter-empty" hidden aria-live="polite">No projects in this category yet.</p>
