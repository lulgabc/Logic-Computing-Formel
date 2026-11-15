type Lit = number;

interface ParsedCnf {
  clauses: Lit[][];
  numVars: number;
  names: Map<number, string>;
}

interface TraceStep {
  kind: "decide" | "unit" | "conflict" | "backtrack" | "done";
  text: string;
}

interface SolveStats {
  decisions: number;
  propagations: number;
  conflicts: number;
  nodes: number;
}

const input = document.querySelector<HTMLTextAreaElement>("#sat-input");
const runButton = document.querySelector<HTMLButtonElement>("#sat-run");
const clearButton = document.querySelector<HTMLButtonElement>("#sat-clear");
const resultRoot = document.querySelector<HTMLElement>("#sat-result");
const traceRoot = document.querySelector<HTMLElement>("#sat-trace");
const statsRoot = document.querySelector<HTMLElement>("#sat-stats");
const statusEl = document.querySelector<HTMLElement>("#sat-status");

const presets: Record<string, string> = {
  sat: "(P ∨ Q) ∧ (¬P ∨ Q) ∧ (P ∨ ¬Q)",
  unsat: "(P) ∧ (¬P)",
  pigeon: [
    "(P11 ∨ P12)",
    "(P21 ∨ P22)",
    "(P31 ∨ P32)",
    "(¬P11 ∨ ¬P21)",
    "(¬P11 ∨ ¬P31)",
    "(¬P21 ∨ ¬P31)",
    "(¬P12 ∨ ¬P22)",
    "(¬P12 ∨ ¬P32)",
    "(¬P22 ∨ ¬P32)",
  ].join("\n"),
  color: (() => {
    const clauses: string[] = [];
    for (let v = 1; v <= 4; v += 1) {
      clauses.push(`(X${v}1 ∨ X${v}2 ∨ X${v}3)`);
      clauses.push(`(¬X${v}1 ∨ ¬X${v}2)`);
      clauses.push(`(¬X${v}1 ∨ ¬X${v}3)`);
      clauses.push(`(¬X${v}2 ∨ ¬X${v}3)`);
    }
    for (let a = 1; a <= 4; a += 1) {
      for (let b = a + 1; b <= 4; b += 1) {
        for (let c = 1; c <= 3; c += 1) {
          clauses.push(`(¬X${a}${c} ∨ ¬X${b}${c})`);
        }
      }
    }
    return clauses.join("\n");
  })(),
  dimacs: "p cnf 3 2\n1 -2 0\n2 3 0",
};

function normalizeLiteral(raw: string): { name: string; negated: boolean } | null {
  let token = raw.trim();
  if (!token || token === "0" || token === "(" || token === ")" || token === "∧" || token === "∨" || token === ",") {
    return null;
  }
  token = token.replace(/[()]/g, "");
  let negated = false;
  while (/^[¬!~-]/.test(token)) {
    negated = !negated;
    token = token.slice(1);
  }
  if (!token) return null;
  return { name: token, negated };
}

function parseCnf(text: string): ParsedCnf {
  const names = new Map<number, string>();
  const nameToId = new Map<string, number>();
  const clauses: Lit[][] = [];

  const idFor = (name: string): number => {
    const existing = nameToId.get(name);
    if (existing) return existing;
    const id = nameToId.size + 1;
    nameToId.set(name, id);
    names.set(id, name);
    return id;
  };

  const isDimacs = /(^|\n)\s*p\s+cnf\b/i.test(text);

  if (isDimacs) {
    const lines = text.split(/\r?\n/);
    let buffer: Lit[] = [];
    let headerVars = 0;
    let sawHeader = false;

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("c")) continue;
      const header = trimmed.match(/^p\s+cnf\s+(\d+)\s+(\d+)/i);
      if (header) {
        headerVars = Number(header[1]);
        sawHeader = true;
        continue;
      }
      if (!sawHeader) continue;
      for (const token of trimmed.split(/\s+/)) {
        if (!/^-?\d+$/.test(token)) continue;
        const value = Number(token);
        if (value === 0) {
          clauses.push(buffer);
          buffer = [];
        } else {
          const id = Math.abs(value);
          if (!names.has(id)) names.set(id, `x${id}`);
          buffer.push(value);
        }
      }
    }
    if (buffer.length) clauses.push(buffer);
    const numVars = Math.max(headerVars, names.size);
    for (let i = 1; i <= numVars; i += 1) if (!names.has(i)) names.set(i, `x${i}`);
    return { clauses, numVars, names };
  }

  const segments = text
    .replace(/\r/g, "")
    .replace(/[∨,]/g, " ")
    .replace(/∧/g, "\n")
    .split(/\n+/)
    .map((line) => line.replace(/[()]/g, " ").trim())
    .filter(Boolean);

  for (const segment of segments) {
    const clause: Lit[] = [];
    for (const raw of segment.split(/\s+/)) {
      const literal = normalizeLiteral(raw);
      if (!literal) continue;
      const id = idFor(literal.name);
      clause.push(literal.negated ? -id : id);
    }
    if (clause.length) clauses.push(clause);
  }

  return { clauses, numVars: names.size, names };
}

function solve(clauses: Lit[][], names: Map<number, string>) {
  const stats: SolveStats = { decisions: 0, propagations: 0, conflicts: 0, nodes: 0 };
  const trace: TraceStep[] = [];
  const maxTrace = 400;

  const log = (kind: TraceStep["kind"], depth: number, text: string) => {
    if (trace.length >= maxTrace) return;
    trace.push({ kind, text: `${"  ".repeat(Math.min(depth, 8))}${text}` });
  };

  const literalValue = (lit: Lit, assignment: Map<number, boolean>): boolean | undefined => {
    const value = assignment.get(Math.abs(lit));
    if (value === undefined) return undefined;
    return lit > 0 ? value : !value;
  };

  const search = (assignment: Map<number, boolean>, depth: number): Map<number, boolean> | null => {
    stats.nodes += 1;
    const current = new Map(assignment);

    for (;;) {
      let unit: Lit | null = null;
      let allSatisfied = true;

      for (const clause of clauses) {
        let satisfied = false;
        const unassigned: Lit[] = [];
        for (const lit of clause) {
          const value = literalValue(lit, current);
          if (value === true) {
            satisfied = true;
            break;
          }
          if (value === undefined) unassigned.push(lit);
        }
        if (satisfied) continue;

        if (unassigned.length === 0) {
          stats.conflicts += 1;
          log("conflict", depth, `冲突：子句 (${clause.join(" ∨ ")}) 为假`);
          return null;
        }
        allSatisfied = false;
        if (unassigned.length === 1) {
          unit = unassigned[0];
          break;
        }
      }

      if (allSatisfied) return current;
      if (unit === null) break;

      const variable = Math.abs(unit);
      const value = unit > 0;
      current.set(variable, value);
      stats.propagations += 1;
      log("unit", depth, `单元传播：${namesFor(unit)} = ${value ? "1" : "0"}`);
    }

    let bestClause: Lit[] | null = null;
    let bestUnassigned: Lit[] = [];
    for (const clause of clauses) {
      let satisfied = false;
      const unassigned: Lit[] = [];
      for (const lit of clause) {
        const value = literalValue(lit, current);
        if (value === true) {
          satisfied = true;
          break;
        }
        if (value === undefined) unassigned.push(lit);
      }
      if (satisfied || unassigned.length === 0) continue;
      if (!bestClause || unassigned.length < bestUnassigned.length) {
        bestClause = clause;
        bestUnassigned = unassigned;
      }
    }

    if (!bestClause) return current;

    const variable = Math.abs(bestUnassigned[0]);
    for (const value of [true, false]) {
      stats.decisions += 1;
      log("decide", depth, `决策：${namesFor(value ? variable : -variable)} = ${value ? "1" : "0"}`);
      const next = new Map(current);
      next.set(variable, value);
      const result = search(next, depth + 1);
      if (result) return result;
      log("backtrack", depth, `回溯：${namesFor(variable)} 换分支`);
    }
    return null;
  };

  const namesFor = (lit: Lit): string => {
    const name = names.get(Math.abs(lit)) ?? `x${Math.abs(lit)}`;
    return lit > 0 ? name : `¬${name}`;
  };

  const model = search(new Map(), 0);
  return { model, stats, trace };
}

function render(parsed: ParsedCnf, result: ReturnType<typeof solve>) {
  if (!resultRoot || !traceRoot || !statsRoot || !statusEl) return;

  statsRoot.replaceChildren();
  const stats: [string, number][] = [
    ["变量", parsed.numVars],
    ["子句", parsed.clauses.length],
    ["决策", result.stats.decisions],
    ["传播", result.stats.propagations],
    ["冲突", result.stats.conflicts],
  ];
  for (const [label, value] of stats) {
    const span = document.createElement("span");
    span.textContent = `${label} ${value}`;
    statsRoot.append(span);
  }

  resultRoot.replaceChildren();
  const box = document.createElement("div");
  box.className = `result-box ${result.model ? "ok" : "bad"}`;
  const strong = document.createElement("b");
  if (result.model) {
    strong.textContent = "SAT";
    const pairs: string[] = [];
    for (let id = 1; id <= parsed.numVars; id += 1) {
      const name = parsed.names.get(id) ?? `x${id}`;
      pairs.push(`${name}=${result.model.get(id) ? "1" : "0"}`);
    }
    box.append(strong, document.createTextNode(` · 模型：${pairs.join("  ")}`));
  } else {
    strong.textContent = "UNSAT";
    box.append(strong, document.createTextNode(" · 所有分支都冲突；该 CNF 不可满足。"));
  }
  resultRoot.append(box);

  traceRoot.replaceChildren();
  result.trace.forEach((step) => {
    const line = document.createElement("div");
    line.className = step.kind;
    line.textContent = step.text;
    traceRoot.append(line);
  });
  if (result.trace.length === 0) {
    traceRoot.textContent = "（没有搜索步骤）";
  }

  statusEl.textContent = result.model ? "SAT" : "UNSAT";
}

function run() {
  if (!input) return;
  try {
    const parsed = parseCnf(input.value);
    if (parsed.clauses.length === 0) throw new Error("没有子句；请每行输入一个子句，或使用 DIMACS 格式。");
    const solved = solve(parsed.clauses, parsed.names);
    render(parsed, solved);
  } catch (error) {
    if (resultRoot) {
      resultRoot.replaceChildren();
      const box = document.createElement("div");
      box.className = "result-box bad";
      const strong = document.createElement("b");
      strong.textContent = "解析失败";
      box.append(strong, document.createTextNode(` · ${error instanceof Error ? error.message : String(error)}`));
      resultRoot.append(box);
    }
    if (traceRoot) traceRoot.textContent = "";
    if (statsRoot) statsRoot.replaceChildren();
    if (statusEl) statusEl.textContent = "ERROR";
  }
}

runButton?.addEventListener("click", run);
input?.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
    event.preventDefault();
    run();
  }
});
clearButton?.addEventListener("click", () => {
  if (!input) return;
  input.value = "";
  input.focus();
  if (resultRoot) resultRoot.replaceChildren();
  if (traceRoot) traceRoot.textContent = "";
  if (statsRoot) statsRoot.replaceChildren();
  if (statusEl) statusEl.textContent = "等待运行";
});

document.querySelectorAll<HTMLButtonElement>("[data-sat-preset]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!input) return;
    input.value = presets[button.dataset.satPreset ?? "sat"] ?? "";
    run();
  });
});

if (input) run();

export {};
