const search = document.querySelector<HTMLInputElement>("#tool-search");
const kind = document.querySelector<HTMLSelectElement>("#tool-kind");
const count = document.querySelector<HTMLElement>("#tool-count");
const empty = document.querySelector<HTMLElement>("#tool-empty");
const cards = Array.from(document.querySelectorAll<HTMLElement>(".tool-topic .tool-card"));
const sections = Array.from(document.querySelectorAll<HTMLElement>(".tool-topic"));
const subgroups = Array.from(document.querySelectorAll<HTMLElement>(".tool-subgroup"));

function apply() {
  const query = (search?.value ?? "").trim().toLowerCase();
  const selectedKind = kind?.value ?? "";
  const filtering = Boolean(query || selectedKind);
  let visible = 0;

  cards.forEach((card) => {
    const matchesQuery = !query || (card.dataset.search ?? "").includes(query);
    const matchesKind = !selectedKind || card.dataset.kind === selectedKind;
    const show = matchesQuery && matchesKind;
    card.hidden = !show;
    if (show) visible += 1;
  });

  subgroups.forEach((group) => {
    const shown = group.querySelectorAll(".tool-card:not([hidden])").length;
    const total = Number(group.dataset.total ?? shown);
    const label = group.querySelector<HTMLElement>(".tool-subgroup-count");
    if (label) label.textContent = filtering ? `${shown} / ${total} 个` : `${total} 个`;
    group.hidden = shown === 0;
  });

  sections.forEach((section) => {
    const shown = section.querySelectorAll(".tool-card:not([hidden])").length;
    const total = Number(section.dataset.total ?? shown);
    const label = section.querySelector<HTMLElement>(".tool-topic-count");
    if (label) label.textContent = filtering ? `${shown} / ${total} 个工具` : `${total} 个工具`;
    section.hidden = shown === 0;
  });

  if (count) count.textContent = `${visible} 个主题条目`;
  empty?.classList.toggle("is-visible", visible === 0);
}

search?.addEventListener("input", apply);
kind?.addEventListener("change", apply);
apply();

export {};
