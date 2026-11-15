const boxes = Array.from(
  document.querySelectorAll<HTMLInputElement>('.checkpoint input[type="checkbox"][data-checkpoint]'),
);

if (boxes.length) {
  const slug = boxes[0].dataset.topic ?? "topic";
  const key = `lcf-progress:${slug}`;

  const read = (): Set<number> => {
    try {
      const value = JSON.parse(localStorage.getItem(key) ?? "[]");
      return new Set(Array.isArray(value) ? value.filter((item) => typeof item === "number") : []);
    } catch {
      return new Set();
    }
  };

  const checked = read();

  const paint = () => {
    const done = boxes.filter((box) => box.checked).length;
    const total = boxes.length;
    document.querySelectorAll<HTMLElement>("[data-progress-fill]").forEach((el) => {
      el.style.width = `${total ? Math.round((done / total) * 100) : 0}%`;
    });
    document.querySelectorAll<HTMLElement>("[data-progress-text]").forEach((el) => {
      el.textContent = `${done} / ${total}`;
    });
  };

  boxes.forEach((box) => {
    const index = Number(box.dataset.checkpoint);
    box.checked = checked.has(index);
    box.addEventListener("change", () => {
      if (box.checked) checked.add(index);
      else checked.delete(index);
      try {
        localStorage.setItem(key, JSON.stringify([...checked].sort((a, b) => a - b)));
      } catch {
        /* storage may be disabled */
      }
      paint();
    });
  });

  document.querySelectorAll<HTMLButtonElement>("[data-reset-progress]").forEach((button) => {
    button.addEventListener("click", () => {
      checked.clear();
      boxes.forEach((box) => {
        box.checked = false;
      });
      try {
        localStorage.removeItem(key);
      } catch {
        /* storage may be disabled */
      }
      paint();
    });
  });

  paint();
}

export {};
