const search = document.querySelector<HTMLInputElement>("#glossary-search");
const domain = document.querySelector<HTMLSelectElement>("#glossary-domain");
const count = document.querySelector<HTMLElement>("#glossary-count");
const empty = document.querySelector<HTMLElement>("#glossary-empty");
const cards = Array.from(document.querySelectorAll<HTMLElement>("#glossary-grid .browse-card"));

function apply() {
  const query = (search?.value ?? "").trim().toLowerCase();
  const selectedDomain = domain?.value ?? "";
  let visible = 0;

  cards.forEach((card) => {
    const matchesQuery = !query || (card.dataset.search ?? "").includes(query);
    const matchesDomain = !selectedDomain || card.dataset.domain === selectedDomain;
    const show = matchesQuery && matchesDomain;
    card.hidden = !show;
    if (show) visible += 1;
  });

  if (count) count.textContent = `${visible} 个术语`;
  empty?.classList.toggle("is-visible", visible === 0);
}

search?.addEventListener("input", apply);
domain?.addEventListener("change", apply);
apply();

export {};
