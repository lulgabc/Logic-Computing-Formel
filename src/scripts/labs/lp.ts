type Sense = "max" | "min";
type Operator = "<=" | ">=" | "=";

interface Constraint {
  a: number;
  b: number;
  op: Operator;
  c: number;
}

interface Point {
  x: number;
  y: number;
}

const EPS = 1e-9;
const W = 720;
const H = 520;
let view = { xMin: -4, xMax: 6, yMin: -3, yMax: 5 };

const senseEl = document.querySelector<HTMLSelectElement>("#lp-sense");
const c1El = document.querySelector<HTMLInputElement>("#lp-c1");
const c2El = document.querySelector<HTMLInputElement>("#lp-c2");
const constraintsEl = document.querySelector<HTMLElement>("#lp-constraints");
const addButton = document.querySelector<HTMLButtonElement>("#lp-add");
const runButton = document.querySelector<HTMLButtonElement>("#lp-run");
const svg = document.querySelector<SVGSVGElement>("#lp-svg");
const resultRoot = document.querySelector<HTMLElement>("#lp-result");
const statusEl = document.querySelector<HTMLElement>("#lp-status");

let constraints: Constraint[] = [];

const presets: Record<string, { sense: Sense; c1: number; c2: number; constraints: Constraint[] }> = {
  bounded: {
    sense: "max",
    c1: 3,
    c2: 2,
    constraints: [
      { a: 1, b: 1, op: "<=", c: 4 },
      { a: 1, b: 0, op: "<=", c: 2 },
      { a: 0, b: 1, op: "<=", c: 3 },
      { a: 1, b: 0, op: ">=", c: 0 },
      { a: 0, b: 1, op: ">=", c: 0 },
    ],
  },
  min: {
    sense: "min",
    c1: 1,
    c2: 1,
    constraints: [
      { a: 1, b: 1, op: ">=", c: 3 },
      { a: 1, b: 0, op: "<=", c: 2 },
      { a: 0, b: 1, op: "<=", c: 2 },
      { a: 1, b: 0, op: ">=", c: 0 },
      { a: 0, b: 1, op: ">=", c: 0 },
    ],
  },
  infeasible: {
    sense: "max",
    c1: 1,
    c2: 1,
    constraints: [
      { a: 1, b: 1, op: "<=", c: 1 },
      { a: 1, b: 1, op: ">=", c: 3 },
      { a: 1, b: 0, op: ">=", c: 0 },
      { a: 0, b: 1, op: ">=", c: 0 },
    ],
  },
  unbounded: {
    sense: "max",
    c1: 1,
    c2: 1,
    constraints: [
      { a: 1, b: 0, op: ">=", c: 0 },
      { a: 0, b: 1, op: ">=", c: 0 },
    ],
  },
  degenerate: {
    sense: "max",
    c1: 1,
    c2: 1,
    constraints: [
      { a: 1, b: 1, op: "<=", c: 4 },
      { a: 1, b: 0, op: ">=", c: 0 },
      { a: 0, b: 1, op: ">=", c: 0 },
    ],
  },
};

function sx(x: number): number {
  return ((x - view.xMin) / (view.xMax - view.xMin)) * W;
}

function sy(y: number): number {
  return H - ((y - view.yMin) / (view.yMax - view.yMin)) * H;
}

function computeView() {
  const xs: number[] = [0];
  const ys: number[] = [0];

  for (const constraint of constraints) {
    if (Math.abs(constraint.a) > EPS) xs.push(constraint.c / constraint.a);
    if (Math.abs(constraint.b) > EPS) ys.push(constraint.c / constraint.b);
  }

  let xMin = Math.min(...xs);
  let xMax = Math.max(...xs);
  let yMin = Math.min(...ys);
  let yMax = Math.max(...ys);

  if (xMax - xMin < 4) {
    const mid = (xMin + xMax) / 2;
    xMin = mid - 2;
    xMax = mid + 2;
  }
  if (yMax - yMin < 4) {
    const mid = (yMin + yMax) / 2;
    yMin = mid - 2;
    yMax = mid + 2;
  }

  const padX = Math.max(0.8, (xMax - xMin) * 0.16);
  const padY = Math.max(0.8, (yMax - yMin) * 0.16);

  view = {
    xMin: xMin - padX,
    xMax: xMax + padX,
    yMin: yMin - padY,
    yMax: yMax + padY,
  };
}

function fmt(value: number): string {
  if (Math.abs(value) < 1e-8) return "0";
  if (Math.abs(value - Math.round(value)) < 1e-9) return String(Math.round(value));
  return value.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
}

function svgEl<K extends keyof SVGElementTagNameMap>(name: K, attrs: Record<string, string | number> = {}): SVGElementTagNameMap[K] {
  const el = document.createElementNS("http://www.w3.org/2000/svg", name);
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, String(value));
  return el;
}

function addText(x: number, y: number, text: string, options: { anchor?: string; size?: number; fill?: string } = {}) {
  const el = svgEl("text", {
    x,
    y,
    "text-anchor": options.anchor ?? "middle",
    "font-size": options.size ?? 10,
    "font-family": "ui-monospace, SFMono-Regular, Menlo, monospace",
    fill: options.fill ?? "var(--muted)",
  });
  el.textContent = text;
  svg?.append(el);
}

function drawGrid() {
  if (!svg) return;
  svg.replaceChildren();
  svg.append(svgEl("rect", { x: 0, y: 0, width: W, height: H, fill: "var(--surface)" }));

  const span = Math.max(view.xMax - view.xMin, view.yMax - view.yMin);
  const step = span <= 12 ? 1 : span <= 30 ? 2 : span <= 80 ? 5 : Math.ceil(span / 20);
  const labelStep = span <= 12 ? 2 : step;

  for (let x = Math.ceil(view.xMin / step) * step; x <= view.xMax; x += step) {
    if (Math.abs(x) < EPS) continue;
    svg.append(svgEl("line", {
      x1: sx(x), y1: 0, x2: sx(x), y2: H,
      stroke: "var(--line)", "stroke-width": 0.5, opacity: 0.55,
    }));
  }
  for (let y = Math.ceil(view.yMin / step) * step; y <= view.yMax; y += step) {
    if (Math.abs(y) < EPS) continue;
    svg.append(svgEl("line", {
      x1: 0, y1: sy(y), x2: W, y2: sy(y),
      stroke: "var(--line)", "stroke-width": 0.5, opacity: 0.55,
    }));
  }

  svg.append(svgEl("line", { x1: 0, y1: sy(0), x2: W, y2: sy(0), stroke: "var(--line-strong)", "stroke-width": 1.2 }));
  svg.append(svgEl("line", { x1: sx(0), y1: 0, x2: sx(0), y2: H, stroke: "var(--line-strong)", "stroke-width": 1.2 }));

  for (let x = Math.ceil(view.xMin / labelStep) * labelStep; x <= view.xMax; x += labelStep) {
    if (Math.abs(x) < EPS) continue;
    addText(sx(x), sy(0) + 14, fmt(x), { size: 9 });
  }
  for (let y = Math.ceil(view.yMin / labelStep) * labelStep; y <= view.yMax; y += labelStep) {
    if (Math.abs(y) < EPS) continue;
    addText(sx(0) - 12, sy(y) + 3, fmt(y), { size: 9, anchor: "end" });
  }
  addText(sx(view.xMax) - 8, sy(0) - 8, "x", { anchor: "end", size: 11 });
  addText(sx(0) + 8, sy(view.yMax) + 4, "y", { size: 11 });
}

function drawConstraint(constraint: Constraint) {
  if (!svg || (Math.abs(constraint.a) < EPS && Math.abs(constraint.b) < EPS)) return;

  const points: Point[] = [];
  if (Math.abs(constraint.b) > EPS) {
    points.push({ x: view.xMin, y: (constraint.c - constraint.a * view.xMin) / constraint.b });
    points.push({ x: view.xMax, y: (constraint.c - constraint.a * view.xMax) / constraint.b });
  } else {
    const x = constraint.c / constraint.a;
    points.push({ x, y: view.yMin });
    points.push({ x, y: view.yMax });
  }

  const line = svgEl("line", {
    x1: sx(points[0].x),
    y1: sy(points[0].y),
    x2: sx(points[1].x),
    y2: sy(points[1].y),
    stroke: "var(--muted)",
    "stroke-width": 1.1,
    opacity: 0.55,
  });
  if (constraint.op !== "=") line.setAttribute("stroke-dasharray", "4 4");
  svg.append(line);
}

function clipHalfPlane(poly: Point[], a: number, b: number, c: number): Point[] {
  if (Math.abs(a) < EPS && Math.abs(b) < EPS) {
    if (c >= -EPS) return poly;
    return [];
  }

  const inside = (p: Point) => a * p.x + b * p.y <= c + EPS;
  const output: Point[] = [];

  for (let i = 0; i < poly.length; i += 1) {
    const start = poly[i];
    const end = poly[(i + 1) % poly.length];
    const startInside = inside(start);
    const endInside = inside(end);

    if (startInside && endInside) {
      output.push(end);
    } else if (startInside && !endInside) {
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const denom = a * dx + b * dy;
      if (Math.abs(denom) > EPS) {
        const t = (c - a * start.x - b * start.y) / denom;
        output.push({ x: start.x + t * dx, y: start.y + t * dy });
      }
    } else if (!startInside && endInside) {
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const denom = a * dx + b * dy;
      if (Math.abs(denom) > EPS) {
        const t = (c - a * start.x - b * start.y) / denom;
        output.push({ x: start.x + t * dx, y: start.y + t * dy });
      }
      output.push(end);
    }
  }

  const cleaned: Point[] = [];
  for (const point of output) {
    const prev = cleaned[cleaned.length - 1];
    if (!prev || Math.hypot(prev.x - point.x, prev.y - point.y) > 1e-7) cleaned.push(point);
  }
  if (cleaned.length > 1) {
    const first = cleaned[0];
    const last = cleaned[cleaned.length - 1];
    if (Math.hypot(first.x - last.x, first.y - last.y) < 1e-7) cleaned.pop();
  }
  return cleaned;
}

function feasibleRegion(): Point[] {
  let poly: Point[] = [
    { x: view.xMin, y: view.yMin },
    { x: view.xMax, y: view.yMin },
    { x: view.xMax, y: view.yMax },
    { x: view.xMin, y: view.yMax },
  ];

  for (const constraint of constraints) {
    if (constraint.op === "<=" || constraint.op === "=") {
      poly = clipHalfPlane(poly, constraint.a, constraint.b, constraint.c);
    }
    if (constraint.op === ">=" || constraint.op === "=") {
      poly = clipHalfPlane(poly, -constraint.a, -constraint.b, -constraint.c);
    }
    if (poly.length === 0) break;
  }

  return poly;
}

function isUnbounded(sense: Sense, c1: number, c2: number): { unbounded: boolean; direction?: Point } {
  if (Math.abs(c1) < EPS && Math.abs(c2) < EPS) return { unbounded: false };

  const directions: Point[] = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
  ];

  for (const constraint of constraints) {
    const length = Math.hypot(constraint.a, constraint.b);
    if (length < EPS) continue;
    const tangent = { x: constraint.b / length, y: -constraint.a / length };
    directions.push(tangent, { x: -tangent.x, y: -tangent.y });
  }

  for (const d of directions) {
    let feasible = true;
    for (const constraint of constraints) {
      const value = constraint.a * d.x + constraint.b * d.y;
      if (constraint.op === "<=" && value > EPS) feasible = false;
      if (constraint.op === ">=" && value < -EPS) feasible = false;
      if (constraint.op === "=" && Math.abs(value) > EPS) feasible = false;
      if (!feasible) break;
    }
    if (!feasible) continue;

    const improvement = c1 * d.x + c2 * d.y;
    if (sense === "max" && improvement > EPS) return { unbounded: true, direction: d };
    if (sense === "min" && improvement < -EPS) return { unbounded: true, direction: d };
  }

  return { unbounded: false };
}

function drawRegion(poly: Point[]) {
  if (!svg || poly.length === 0) return;

  const path = poly
    .map((point, index) => `${index === 0 ? "M" : "L"} ${sx(point.x)} ${sy(point.y)}`)
    .join(" ") + " Z";

  svg.append(svgEl("path", {
    d: path,
    fill: "var(--accent-2)",
    "fill-opacity": 0.14,
    stroke: "var(--accent-2)",
    "stroke-width": 1.8,
    "stroke-linejoin": "round",
  }));

  for (const point of poly) {
    svg.append(svgEl("circle", {
      cx: sx(point.x),
      cy: sy(point.y),
      r: 2.4,
      fill: "var(--surface-2)",
      stroke: "var(--accent-2)",
      "stroke-width": 1,
    }));
  }
}

function drawObjective(sense: Sense, c1: number, c2: number, value: number) {
  if (!svg || (Math.abs(c1) < EPS && Math.abs(c2) < EPS)) return;

  const points: Point[] = [];
  if (Math.abs(c2) > EPS) {
    points.push({ x: view.xMin, y: (value - c1 * view.xMin) / c2 });
    points.push({ x: view.xMax, y: (value - c1 * view.xMax) / c2 });
  } else {
    const x = value / c1;
    points.push({ x, y: view.yMin });
    points.push({ x, y: view.yMax });
  }

  const line = svgEl("line", {
    x1: sx(points[0].x),
    y1: sy(points[0].y),
    x2: sx(points[1].x),
    y2: sy(points[1].y),
    stroke: "var(--accent)",
    "stroke-width": 1.8,
    "stroke-dasharray": "6 5",
  });
  svg.append(line);

  addText(sx(points[1].x) - 6, sy(points[1].y) - 8, `${sense} ${fmt(value)}`, {
    anchor: "end",
    size: 10,
    fill: "var(--accent)",
  });
}

function drawOptimum(point: Point, value: number) {
  if (!svg) return;
  svg.append(svgEl("circle", {
    cx: sx(point.x),
    cy: sy(point.y),
    r: 5,
    fill: "var(--accent)",
    stroke: "var(--surface-2)",
    "stroke-width": 2,
  }));
  addText(sx(point.x) + 8, sy(point.y) - 10, `z=${fmt(value)}`, {
    anchor: "start",
    size: 11,
    fill: "var(--accent)",
  });
  addText(sx(point.x) + 8, sy(point.y) + 5, `(${fmt(point.x)}, ${fmt(point.y)})`, {
    anchor: "start",
    size: 9,
    fill: "var(--muted)",
  });
}

function renderResult(message: string, className: "ok" | "warn" | "bad" = "warn") {
  if (!resultRoot) return;
  resultRoot.replaceChildren();
  const box = document.createElement("div");
  box.className = `result-box ${className}`;
  const strong = document.createElement("b");
  strong.textContent = statusEl?.textContent ?? "";
  box.append(strong, document.createTextNode(` · ${message}`));
  resultRoot.append(box);
}

function solve() {
  if (!svg || !statusEl) return;

  const sense = (senseEl?.value === "min" ? "min" : "max") as Sense;
  const c1 = Number(c1El?.value ?? 0);
  const c2 = Number(c2El?.value ?? 0);

  computeView();
  drawGrid();
  constraints.forEach(drawConstraint);

  const poly = feasibleRegion();

  if (poly.length === 0) {
    statusEl.textContent = "INFEASIBLE";
    renderResult("可行域为空：约束互相矛盾。检查是否同时要求 x+y≤1 与 x+y≥3。", "bad");
    return;
  }

  drawRegion(poly);

  const values = poly.map((point) => c1 * point.x + c2 * point.y);
  let bestIndex = 0;
  for (let i = 1; i < values.length; i += 1) {
    if (sense === "max" ? values[i] > values[bestIndex] : values[i] < values[bestIndex]) bestIndex = i;
  }
  const best = poly[bestIndex];
  const bestValue = values[bestIndex];

  const unbounded = isUnbounded(sense, c1, c2);
  if (unbounded.unbounded) {
    statusEl.textContent = "UNBOUNDED";
    const direction = unbounded.direction;
    renderResult(
      `目标函数无界：沿方向 (${fmt(direction?.x ?? 0)}, ${fmt(direction?.y ?? 0)}) 可以不断增加${sense === "max" ? "" : "或减少"}目标值。图中只显示视图范围内的可行域。`,
      "warn",
    );
    drawObjective(sense, c1, c2, bestValue);
    drawOptimum(best, bestValue);
    return;
  }

  statusEl.textContent = "OPTIMAL";
  const vertexText = poly.length > 1 ? `；可行域有 ${poly.length} 个顶点` : "；可行域退化为一点";
  const optimalCount = values.filter((value) => Math.abs(value - bestValue) < 1e-7).length;
  const optimalNote = optimalCount > 1 ? `；${optimalCount} 个顶点取得同一最优值，存在无穷多最优解（最优面是一条边或更高维面）` : "";
  renderResult(
    `${sense} z = ${fmt(bestValue)}，在 (${fmt(best.x)}, ${fmt(best.y)}) 取得${vertexText}${optimalNote}。教学版浮点求解，未生成对偶证书。`,
    "ok",
  );

  drawObjective(sense, c1, c2, bestValue);
  drawOptimum(best, bestValue);
}

function addConstraint(constraint: Constraint) {
  constraints.push(constraint);
  renderRows();
  solve();
}

function renderRows() {
  if (!constraintsEl) return;
  constraintsEl.replaceChildren();

  constraints.forEach((constraint, index) => {
    const row = document.createElement("div");
    row.className = "lp-row";

    const a = document.createElement("input");
    a.type = "number";
    a.step = "0.5";
    a.value = String(constraint.a);
    a.setAttribute("aria-label", `第 ${index + 1} 个约束的 x 系数`);
    a.addEventListener("input", () => {
      constraint.a = Number(a.value) || 0;
      solve();
    });

    const b = document.createElement("input");
    b.type = "number";
    b.step = "0.5";
    b.value = String(constraint.b);
    b.setAttribute("aria-label", `第 ${index + 1} 个约束的 y 系数`);
    b.addEventListener("input", () => {
      constraint.b = Number(b.value) || 0;
      solve();
    });

    const op = document.createElement("select");
    op.setAttribute("aria-label", `第 ${index + 1} 个约束的符号`);
    for (const symbol of ["<=", ">=", "="] as Operator[]) {
      const option = document.createElement("option");
      option.value = symbol;
      option.textContent = symbol === "<=" ? "≤" : symbol === ">=" ? "≥" : "=";
      option.selected = constraint.op === symbol;
      op.append(option);
    }
    op.addEventListener("change", () => {
      constraint.op = op.value as Operator;
      solve();
    });

    const c = document.createElement("input");
    c.type = "number";
    c.step = "0.5";
    c.value = String(constraint.c);
    c.setAttribute("aria-label", `第 ${index + 1} 个约束的常数项`);
    c.addEventListener("input", () => {
      constraint.c = Number(c.value) || 0;
      solve();
    });

    const remove = document.createElement("button");
    remove.className = "remove";
    remove.type = "button";
    remove.setAttribute("aria-label", `删除第 ${index + 1} 个约束`);
    remove.textContent = "×";
    remove.addEventListener("click", () => {
      constraints.splice(index, 1);
      renderRows();
      solve();
    });

    row.append(a, b, op, c, remove);
    constraintsEl.append(row);
  });
}

function loadPreset(name: string) {
  const preset = presets[name] ?? presets.bounded;
  if (senseEl) senseEl.value = preset.sense;
  if (c1El) c1El.value = String(preset.c1);
  if (c2El) c2El.value = String(preset.c2);
  constraints = preset.constraints.map((constraint) => ({ ...constraint }));
  renderRows();
  solve();
}

addButton?.addEventListener("click", () => {
  addConstraint({ a: 1, b: 0, op: "<=", c: 5 });
});

runButton?.addEventListener("click", solve);
senseEl?.addEventListener("change", solve);
c1El?.addEventListener("input", solve);
c2El?.addEventListener("input", solve);

document.querySelectorAll<HTMLButtonElement>("[data-lp-preset]").forEach((button) => {
  button.addEventListener("click", () => loadPreset(button.dataset.lpPreset ?? "bounded"));
});

loadPreset("bounded");

export {};
