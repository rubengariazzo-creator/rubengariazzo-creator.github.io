---
layout: layouts/page.njk
translationKey: projects-list
projectFilter: true
heroBackground: true
heroColors: ["#0b0d10", "#0f2a24", "#134a3a"]
title: "Projets"
description: "Liste des projets d'ingénierie, de programmation et de recherche de Ruben Gariazzo."
---
<div class="filter-pills" role="group" aria-label="Filtrer les projets par catégorie">
  <button type="button" class="filter-pill is-active" data-filter="all" aria-pressed="true">Tous</button>
  <button type="button" class="filter-pill" data-filter="Aérospatial" aria-pressed="false">Aérospatial</button>
  <button type="button" class="filter-pill" data-filter="Mécanique" aria-pressed="false">Mécanique</button>
  <button type="button" class="filter-pill" data-filter="Programmation" aria-pressed="false">Programmation</button>
  <button type="button" class="filter-pill" data-filter="Recherche" aria-pressed="false">Recherche</button>
  <button type="button" class="filter-pill" data-filter="Business" aria-pressed="false">Business</button>
  <button type="button" class="filter-pill" data-filter="Créatif" aria-pressed="false">Créatif</button>
</div>

<ul class="project-cards">
{%- for project in collections.projects %}
{%- if project.data.lang == "fr" %}
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
<p class="filter-empty" hidden aria-live="polite">Aucun projet dans cette catégorie pour l'instant.</p>
