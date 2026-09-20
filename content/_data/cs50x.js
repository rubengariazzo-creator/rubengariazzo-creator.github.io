// Fetches the CS50x progress log from a separate public repo
// (github.com/rubengariazzo-creator/cs50x-journey) at build time, so the
// project page's progress bar and reflections update on their own on the
// next build -- no solution code involved, just completion status and
// personal reflections (see that repo's own README for why: CS50's
// academic honesty policy prohibits publishing assessment solutions while
// enrolled).
const PROGRESS_URL = "https://raw.githubusercontent.com/rubengariazzo-creator/cs50x-journey/main/progress.json";

// progress.json only ever holds English text (it's Ruben's own working
// journal). Manually maintained French translations, keyed by the exact
// English title so the FR page reads natively instead of switching to
// English mid-page. NOTE: when a new week gets marked complete in that repo
// with a real reflection, its French translation needs adding here too --
// there's no other way to keep the FR page in sync with an English-only
// source repo.
const FR_TRANSLATIONS = {
  "Week 0: Scratch": {
    title: "Semaine 0 : Scratch",
    reflection:
      "Concepts fondamentaux de programmation (séquences, boucles, conditions, variables, événements) via la programmation visuelle par blocs, avant toute syntaxe textuelle.",
  },
  "Week 1: C": {
    title: "Semaine 1 : C",
    reflection:
      "Compilation et débogage de programmes en C : variables, types, conditions, boucles, fonctions et arguments en ligne de commande.",
  },
  "Week 2: Arrays": {
    title: "Semaine 2 : Tableaux",
    reflection:
      "Manipulation de tableaux et de chaînes de caractères comme séquences de caractères, avec une introduction à la cryptographie (chiffrements de base) comme application motivante.",
  },
  "Week 3: Algorithms": {
    title: "Semaine 3 : Algorithmes",
    reflection:
      "Complexité algorithmique (notation Big O), algorithmes de recherche (linéaire et binaire), plusieurs algorithmes de tri (à bulles, par sélection, fusion) et récursivité.",
  },
  "Week 4: Memory": {
    title: "Semaine 4 : Mémoire",
    reflection:
      "Fonctionnement réel de la mémoire : pointeurs, adresses mémoire, allocation dynamique avec malloc/free, pile vs tas, et utilisation de Valgrind pour détecter les fuites mémoire.",
  },
  "Week 5: Data Structures": {
    title: "Semaine 5 : Structures de données",
    reflection:
      "Construction de structures de données dynamiques à partir de pointeurs et de structs : listes chaînées, arbres, tries et tables de hachage.",
  },
  "Week 6: Python": {
    title: "Semaine 6 : Python",
    reflection:
      "Passage du C à Python : typage dynamique, exceptions, bibliothèques, et à quel point les mêmes idées algorithmiques changent d'apparence dans un langage de plus haut niveau.",
  },
  "Week 7: SQL": {
    title: "Semaine 7 : SQL",
    reflection:
      "Conception de bases de données relationnelles et SQL : requêtes SELECT/INSERT/UPDATE/DELETE, jointures, index, et pourquoi les requêtes paramétrées évitent les injections SQL.",
  },
  "Week 8: HTML, CSS, JavaScript": { title: "Semaine 8 : HTML, CSS, JavaScript" },
  "Week 9: Flask": { title: "Semaine 9 : Flask" },
};

module.exports = async function () {
  try {
    const res = await fetch(PROGRESS_URL);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const data = await res.json();
    const items = Array.isArray(data.items) ? data.items : [];
    const completed = items.filter((item) => item.completed).length;
    return {
      items: items.map((item) => ({ ...item, fr: FR_TRANSLATIONS[item.title] || null })),
      completed,
      total: items.length,
      percent: items.length ? Math.round((completed / items.length) * 100) : 0,
    };
  } catch (err) {
    // A slow/blocked fetch during a build should never break the whole
    // site -- worst case the progress section is empty until the next build.
    return { items: [], completed: 0, total: 0, percent: 0 };
  }
};
