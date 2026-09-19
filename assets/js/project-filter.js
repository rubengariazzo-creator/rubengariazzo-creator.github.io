(() => {
  const pillGroup = document.querySelector(".filter-pills");
  const cards = document.querySelectorAll(".project-cards li");
  const emptyMsg = document.querySelector(".filter-empty");
  if (!pillGroup || !cards.length) return;

  pillGroup.addEventListener("click", (e) => {
    const pill = e.target.closest(".filter-pill");
    if (!pill) return;

    pillGroup.querySelectorAll(".filter-pill").forEach((p) => p.classList.remove("is-active"));
    pill.classList.add("is-active");

    const filter = pill.dataset.filter;
    let visibleCount = 0;

    cards.forEach((card) => {
      const match = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !match);
      if (match) visibleCount++;
    });

    if (emptyMsg) emptyMsg.hidden = visibleCount !== 0;
  });
})();
