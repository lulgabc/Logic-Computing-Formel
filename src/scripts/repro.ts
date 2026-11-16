const cards = Array.from(document.querySelectorAll<HTMLElement>(".repro-card[data-repro-id]"));

for (const card of cards) {
  const id = card.dataset.reproId;
  if (!id) continue;
  const key = `lcf-repro:${id}`;
  const boxes = Array.from(card.querySelectorAll<HTMLInputElement>('input[type="checkbox"][data-step]'));
  const text = card.querySelector<HTMLElement>("[data-repro-text]");
  const fill = card.querySelector<HTMLElement>("[data-repro-fill]");

  let done = new Set<number>();
  try {
    const raw = JSON.parse(localStorage.getItem(key) ?? "[]");
    if (Array.isArray(raw)) done = new Set(raw.filter((item) => typeof item === "number"));
  } catch {
    done = new Set();
  }

  const paint = () => {
    const count = boxes.filter((box) => box.checked).length;
    if (text) text.textContent = `${count} / ${boxes.length}`;
    if (fill) fill.style.width = `${boxes.length ? (count / boxes.length) * 100 : 0}%`;
  };

  boxes.forEach((box) => {
    const index = Number(box.dataset.step);
    box.checked = done.has(index);
    box.addEventListener("change", () => {
      if (box.checked) done.add(index);
      else done.delete(index);
      try {
        localStorage.setItem(key, JSON.stringify([...done].sort((a, b) => a - b)));
      } catch {
        /* storage may be disabled */
      }
      paint();
    });
  });

  paint();
}

export {};
