const search = document.querySelector<HTMLInputElement>("#tool-search");
const domain = document.querySelector<HTMLSelectElement>("#tool-domain");
const kind = document.querySelector<HTMLSelectElement>("#tool-kind");
const count = document.querySelector<HTMLElement>("#tool-count");
const empty = document.querySelector<HTMLElement>("#tool-empty");
const cards = Array.from(document.querySelectorAll<HTMLElement>("#tool-grid .browse-card"));

function apply() {
  const query = (search?.value ?? "").trim().toLowerCase();
  const selectedDomain = domain?.value ?? "";
  const selectedKind = kind?.value ?? "";
  let visible = 0;

  cards.forEach((card) => {
    const domains = (card.dataset.domain ?? "").split(" ");
    const matchesQuery = !query || (card.dataset.search ?? "").includes(query);
    const matchesDomain = !selectedDomain || domains.includes(selectedDomain);
    const matchesKind = !selectedKind || card.dataset.kind === selectedKind;
    const show = matchesQuery && matchesDomain && matchesKind;
    card.hidden = !show;
    if (show) visible += 1;
  });

  if (count) count.textContent = `${visible} 个工具`;
  empty?.classList.toggle("is-visible", visible === 0);
}

search?.addEventListener("input", apply);
domain?.addEventListener("change", apply);
kind?.addEventListener("change", apply);
apply();

export {};
