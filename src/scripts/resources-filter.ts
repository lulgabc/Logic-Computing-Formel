const search = document.querySelector<HTMLInputElement>("#resource-search");
const domain = document.querySelector<HTMLSelectElement>("#resource-domain");
const level = document.querySelector<HTMLSelectElement>("#resource-level");
const count = document.querySelector<HTMLElement>("#resource-count");
const empty = document.querySelector<HTMLElement>("#resource-empty");
const tabs = Array.from(document.querySelectorAll<HTMLButtonElement>(".tab[data-tab]"));
const panels = Array.from(document.querySelectorAll<HTMLElement>(".tab-panel"));

let activeType = "course";

function activeCards(): HTMLElement[] {
  const panel = activeType === "course" ? document.querySelector<HTMLElement>("#panel-courses") : document.querySelector<HTMLElement>("#panel-books");
  return Array.from(panel?.querySelectorAll<HTMLElement>(".browse-card") ?? []);
}

function apply() {
  const query = (search?.value ?? "").trim().toLowerCase();
  const selectedDomain = domain?.value ?? "";
  const selectedLevel = level?.value ?? "";
  let visible = 0;

  activeCards().forEach((card) => {
    const matchesQuery = !query || (card.dataset.search ?? "").includes(query);
    const matchesDomain = !selectedDomain || card.dataset.domain === selectedDomain;
    const matchesLevel = !selectedLevel || (card.dataset.level ?? "").includes(selectedLevel);
    const show = matchesQuery && matchesDomain && matchesLevel;
    card.hidden = !show;
    if (show) visible += 1;
  });

  if (count) count.textContent = `${visible} 条资源`;
  empty?.classList.toggle("is-visible", visible === 0);
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const next = tab.dataset.tab ?? "course";
    if (next === activeType) return;
    activeType = next;
    tabs.forEach((item) => {
      const selected = item === tab;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-selected", String(selected));
    });
    panels.forEach((panel) => {
      const isCourse = panel.id === "panel-courses";
      panel.hidden = next === "course" ? !isCourse : isCourse;
    });
    apply();
  });
});

search?.addEventListener("input", apply);
domain?.addEventListener("change", apply);
level?.addEventListener("change", apply);
apply();

export {};
