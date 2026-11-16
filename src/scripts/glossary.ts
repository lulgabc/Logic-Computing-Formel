const search = document.querySelector<HTMLInputElement>("#glossary-search");
const domain = document.querySelector<HTMLSelectElement>("#glossary-domain");
const count = document.querySelector<HTMLElement>("#glossary-count");
const empty = document.querySelector<HTMLElement>("#glossary-empty");
const detail = document.querySelector<HTMLElement>("#glossary-detail");
const indexItems = Array.from(document.querySelectorAll<HTMLButtonElement>(".glossary-index-item"));
const groups = Array.from(document.querySelectorAll<HTMLElement>(".glossary-group"));
const entries = Array.from(document.querySelectorAll<HTMLElement>(".glossary-entry"));
const entryMap = new Map(entries.map((entry) => [entry.dataset.term ?? "", entry]));
let currentTerm = "";

function setUrl(term: string) {
  const url = new URL(window.location.href);
  url.searchParams.set("term", term);
  history.replaceState(null, "", url);
}

function select(term: string, options: { scroll?: boolean; updateUrl?: boolean } = {}) {
  const entry = entryMap.get(term);
  if (!entry) return;
  currentTerm = term;

  entries.forEach((item) => {
    item.hidden = item !== entry;
  });
  indexItems.forEach((item) => {
    item.classList.toggle("is-active", item.dataset.term === term);
  });

  if (options.updateUrl !== false) setUrl(term);

  if (options.scroll && window.matchMedia("(max-width: 760px)").matches) {
    detail?.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }
}

function applyFilters() {
  const query = (search?.value ?? "").trim().toLowerCase();
  const selectedDomain = domain?.value ?? "";
  let visible = 0;

  indexItems.forEach((item) => {
    const matchesQuery = !query || (item.dataset.search ?? "").includes(query);
    const matchesDomain = !selectedDomain || item.dataset.topic === selectedDomain;
    const show = matchesQuery && matchesDomain;
    item.hidden = !show;
    if (show) visible += 1;
  });

  groups.forEach((group) => {
    group.hidden = group.querySelectorAll(".glossary-index-item:not([hidden])").length === 0;
  });

  if (count) count.textContent = `${visible} 个术语`;
  empty?.classList.toggle("is-visible", visible === 0);
  if (detail) detail.hidden = visible === 0;

  if (visible > 0) {
    const currentVisible = indexItems.some((item) => !item.hidden && item.dataset.term === currentTerm);
    if (!currentVisible) {
      const first = indexItems.find((item) => !item.hidden);
      if (first?.dataset.term) select(first.dataset.term, { updateUrl: true });
    }
  }
}

document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement | null;
  const button = target?.closest<HTMLButtonElement>("button[data-term]");
  if (!button) return;
  const term = button.dataset.term;
  if (!term) return;

  if (button.classList.contains("glossary-select")) {
    if (search?.value) search.value = "";
    if (domain?.value) domain.value = "";
    applyFilters();
  }

  select(term, { scroll: true, updateUrl: true });
});

search?.addEventListener("input", applyFilters);
domain?.addEventListener("change", applyFilters);

const wanted = new URLSearchParams(window.location.search).get("term");
const initial = wanted && entryMap.has(wanted) ? wanted : indexItems[0]?.dataset.term;
if (initial) select(initial, { updateUrl: false });
applyFilters();

export {};
