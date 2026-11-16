document.querySelectorAll<HTMLButtonElement>(".quick-copy").forEach((button) => {
  button.addEventListener("click", async () => {
    const card = button.closest(".quick-code");
    const code = card?.querySelector("pre code")?.textContent ?? "";
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      const original = button.textContent;
      button.textContent = "已复制";
      button.classList.add("is-copied");
      window.setTimeout(() => {
        button.textContent = original;
        button.classList.remove("is-copied");
      }, 1500);
    } catch {
      button.textContent = "复制失败";
    }
  });
});

export {};
