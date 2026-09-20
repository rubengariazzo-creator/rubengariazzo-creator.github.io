// Fetches the CS50x progress log from a separate public repo
// (github.com/rubengariazzo-creator/cs50x-journey) at build time, so the
// project page's progress bar and reflections update on their own on the
// next build -- no solution code involved, just completion status and
// personal reflections (see that repo's own README for why: CS50's
// academic honesty policy prohibits publishing assessment solutions while
// enrolled).
const PROGRESS_URL = "https://raw.githubusercontent.com/rubengariazzo-creator/cs50x-journey/main/progress.json";

module.exports = async function () {
  try {
    const res = await fetch(PROGRESS_URL);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const data = await res.json();
    const items = Array.isArray(data.items) ? data.items : [];
    const completed = items.filter((item) => item.completed).length;
    return {
      items,
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
