const root = document.documentElement;

/* ---------- theme ---------- */
const themeButton = document.querySelector<HTMLButtonElement>(".theme-toggle");
const themeIcon = document.querySelector<HTMLElement>(".theme-icon");

function paintThemeIcon() {
  if (!themeIcon) return;
  themeIcon.textContent = root.dataset.theme === "dark" ? "☾" : "☀";
}

paintThemeIcon();

themeButton?.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try {
    localStorage.setItem("lcf-theme", next);
  } catch {
    /* storage may be disabled */
  }
  paintThemeIcon();
});

/* ---------- mobile nav ---------- */
const navToggle = document.querySelector<HTMLButtonElement>(".nav-toggle");
const mobileNav = document.querySelector<HTMLElement>("#mobile-nav");

navToggle?.addEventListener("click", () => {
  const open = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!open));
  navToggle.setAttribute("aria-label", open ? "打开菜单" : "关闭菜单");
  mobileNav?.classList.toggle("is-open", !open);
});

mobileNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "打开菜单");
    mobileNav.classList.remove("is-open");
  });
});

/* ---------- topic dropdown ---------- */
const dropTrigger = document.querySelector<HTMLButtonElement>(".nav-drop-trigger");
const dropMenu = document.querySelector<HTMLElement>(".nav-drop-menu");

dropTrigger?.addEventListener("click", (event) => {
  event.stopPropagation();
  const open = dropMenu?.classList.toggle("is-open") ?? false;
  dropTrigger.setAttribute("aria-expanded", String(open));
});

document.addEventListener("click", (event) => {
  if (!dropMenu?.classList.contains("is-open")) return;
  const target = event.target as Node;
  if (dropMenu.contains(target) || dropTrigger?.contains(target)) return;
  dropMenu.classList.remove("is-open");
  dropTrigger?.setAttribute("aria-expanded", "false");
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  dropMenu?.classList.remove("is-open");
  dropTrigger?.setAttribute("aria-expanded", "false");
  if (mobileNav?.classList.contains("is-open")) {
    mobileNav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "打开菜单");
  }
});

/* ---------- reveal on scroll ---------- */
const revealItems = document.querySelectorAll<HTMLElement>(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
  );
  revealItems.forEach((item) => revealObserver.observe(item));
}

/* ---------- topic section spy ---------- */
const topicNav = document.querySelector<HTMLElement>(".topic-nav-inner");
const topicSections = Array.from(document.querySelectorAll<HTMLElement>(".topic-section[id]"));

if (topicNav && topicSections.length && "IntersectionObserver" in window) {
  const links = new Map<string, HTMLAnchorElement>();
  topicNav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
    links.set(link.getAttribute("href")?.slice(1) ?? "", link);
  });

  let activeId = "";
  const setActive = (id: string) => {
    if (!id || id === activeId) return;
    activeId = id;
    links.forEach((link, key) => link.classList.toggle("is-active", key === id));
  };

  const spy = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]?.target.id) setActive(visible[0].target.id);
    },
    { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.1, 0.3, 0.6] },
  );

  topicSections.forEach((section) => spy.observe(section));
}

export {};
