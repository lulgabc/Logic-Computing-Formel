interface SearchEntry {
  type: string;
  title: string;
  subtitle: string;
  body: string;
  url: string;
  topic?: string;
  topics?: string[];
  external?: boolean;
  keywords: string;
}

const dataEl = document.querySelector<HTMLScriptElement>("#search-index");
const entries: SearchEntry[] = JSON.parse(dataEl?.textContent ?? "[]");
const input = document.querySelector<HTMLInputElement>("#search-input");
const domain = document.querySelector<HTMLSelectElement>("#search-domain");
const results = document.querySelector<HTMLElement>("#search-results");
const empty = document.querySelector<HTMLElement>("#search-empty");
const hint = document.querySelector<HTMLElement>("#search-hint");
const count = document.querySelector<HTMLElement>("#search-count");
const typeButtons = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-search-type]"));

const typeOrder = ["主题", "前沿", "课程", "书", "论文", "工具", "术语", "Lab", "复现", "社区", "页面"];
let activeType = "all";

function score(entry: SearchEntry, query: string): number {
  if (!query) return 1;
  const title = entry.title.toLowerCase();
  const subtitle = entry.subtitle.toLowerCase();
  const keywords = entry.keywords.toLowerCase();
  let value = 0;
  if (title === query) value += 8;
  else if (title.startsWith(query)) value += 6;
  else if (title.includes(query)) value += 4;
  if (subtitle.includes(query)) value += 2;
  if (keywords.includes(query)) value += 1;
  return value;
}

function makeResult(entry: SearchEntry): HTMLAnchorElement {
  const link = document.createElement("a");
  link.className = "search-result";
  link.href = entry.url;
  if (entry.external) {
    link.target = "_blank";
    link.rel = "noopener";
  }

  const type = document.createElement("span");
  type.className = "search-result-type";
  type.textContent = entry.type;

  const body = document.createElement("span");
  body.className = "search-result-body";

  const title = document.createElement("span");
  title.className = "search-result-title";
  title.textContent = entry.title;

  const meta = document.createElement("span");
  meta.className = "search-result-meta";
  meta.textContent = entry.subtitle;

  const snippet = document.createElement("span");
  snippet.className = "search-result-snippet";
  snippet.textContent = entry.body.length > 180 ? `${entry.body.slice(0, 180)}…` : entry.body;

  body.append(title, meta, snippet);

  const arrow = document.createElement("span");
  arrow.className = "search-result-arrow";
  arrow.textContent = entry.external ? "↗" : "→";

  link.append(type, body, arrow);
  return link;
}

function render() {
  if (!input || !results || !empty || !hint || !count) return;

  const query = input.value.trim().toLowerCase();
  const selectedDomain = domain?.value ?? "";
  const hasQuery = query.length > 0;
  const hasFilter = activeType !== "all" || selectedDomain !== "";

  if (!hasQuery && !hasFilter) {
    results.hidden = true;
    results.replaceChildren();
    empty.hidden = true;
    empty.classList.remove("is-visible");
    hint.hidden = false;
    count.textContent = "输入关键词开始";
    return;
  }

  hint.hidden = true;
  const matched = entries
    .filter((entry) => {
      const matchesType = activeType === "all" || entry.type === activeType;
      const matchesDomain = !selectedDomain || entry.topic === selectedDomain || (entry.topics ?? []).includes(selectedDomain);
      const matchesQuery = !query || entry.keywords.toLowerCase().includes(query);
      return matchesType && matchesDomain && matchesQuery;
    })
    .map((entry) => ({ entry, score: score(entry, query) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const typeDelta = typeOrder.indexOf(a.entry.type) - typeOrder.indexOf(b.entry.type);
      if (typeDelta !== 0) return typeDelta;
      return a.entry.title.localeCompare(b.entry.title, "zh-CN");
    });

  results.replaceChildren();
  const shown = matched.slice(0, 80);
  shown.forEach(({ entry }) => results.append(makeResult(entry)));

  results.hidden = matched.length === 0;
  empty.hidden = matched.length !== 0;
  empty.classList.toggle("is-visible", matched.length === 0);
  count.textContent = matched.length > 80 ? `${matched.length} 条结果 · 显示前 80 条` : `${matched.length} 条结果`;
}

typeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeType = button.dataset.searchType ?? "all";
    typeButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    render();
  });
});

input?.addEventListener("input", () => {
  render();
  const url = new URL(window.location.href);
  if (input.value.trim()) url.searchParams.set("q", input.value.trim());
  else url.searchParams.delete("q");
  history.replaceState(null, "", url);
});

domain?.addEventListener("change", render);

document.addEventListener("keydown", (event) => {
  const target = event.target as HTMLElement | null;
  const isTyping = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable;
  if (event.key === "/" && !isTyping) {
    event.preventDefault();
    input?.focus();
  }
  if (event.key === "Escape" && input && document.activeElement === input) {
    if (!input.value) return;
    input.value = "";
    render();
    const url = new URL(window.location.href);
    url.searchParams.delete("q");
    history.replaceState(null, "", url);
  }
});

const initialQuery = new URLSearchParams(window.location.search).get("q");
if (initialQuery && input) {
  input.value = initialQuery;
  input.focus();
}
render();

export {};
