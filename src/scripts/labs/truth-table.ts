type Expr =
  | { kind: "var"; name: string }
  | { kind: "const"; value: boolean }
  | { kind: "not"; body: Expr }
  | { kind: "bin"; op: "and" | "or" | "imp" | "iff"; left: Expr; right: Expr };

type TokenType = "var" | "const" | "not" | "and" | "or" | "imp" | "iff" | "lparen" | "rparen" | "true" | "false";

interface Token {
  type: TokenType;
  text: string;
  pos: number;
}

const formulaInput = document.querySelector<HTMLInputElement>("#tt-formula");
const runButton = document.querySelector<HTMLButtonElement>("#tt-run");
const resultRoot = document.querySelector<HTMLElement>("#tt-result");
const statusEl = document.querySelector<HTMLElement>("#tt-status");

function tokenize(source: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < source.length) {
    const ch = source[i];
    if (/\s/.test(ch)) {
      i += 1;
      continue;
    }

    const three = source.slice(i, i + 3);
    const two = source.slice(i, i + 2);

    if (three === "<->") {
      tokens.push({ type: "iff", text: three, pos: i });
      i += 3;
      continue;
    }
    if (two === "->") {
      tokens.push({ type: "imp", text: two, pos: i });
      i += 2;
      continue;
    }
    if (two === "&&") {
      tokens.push({ type: "and", text: two, pos: i });
      i += 2;
      continue;
    }
    if (two === "||") {
      tokens.push({ type: "or", text: two, pos: i });
      i += 2;
      continue;
    }

    const single: Record<string, TokenType> = {
      "¬": "not",
      "~": "not",
      "!": "not",
      "∧": "and",
      "&": "and",
      "∨": "or",
      "|": "or",
      "→": "imp",
      "↔": "iff",
      "(": "lparen",
      ")": "rparen",
    };

    if (single[ch]) {
      tokens.push({ type: single[ch], text: ch, pos: i });
      i += 1;
      continue;
    }

    if (/[A-Za-z]/.test(ch)) {
      let j = i + 1;
      while (j < source.length && /[A-Za-z0-9_]/.test(source[j])) j += 1;
      const word = source.slice(i, j);
      const lower = word.toLowerCase();
      if (lower === "true") tokens.push({ type: "true", text: word, pos: i });
      else if (lower === "false") tokens.push({ type: "false", text: word, pos: i });
      else if (word === "T") tokens.push({ type: "true", text: word, pos: i });
      else if (word === "F") tokens.push({ type: "false", text: word, pos: i });
      else tokens.push({ type: "var", text: word, pos: i });
      i = j;
      continue;
    }

    throw new Error(`无法识别的字符 “${ch}”（位置 ${i + 1}）`);
  }

  return tokens;
}

function parse(source: string): Expr {
  const tokens = tokenize(source);
  let index = 0;

  const peek = () => tokens[index];
  const match = (type: TokenType) => {
    if (tokens[index]?.type === type) {
      index += 1;
      return true;
    }
    return false;
  };
  const expect = (type: TokenType, label: string) => {
    if (!match(type)) throw new Error(`缺少 ${label}`);
  };

  const parseIff = (): Expr => {
    let left = parseImp();
    while (match("iff")) left = { kind: "bin", op: "iff", left, right: parseImp() };
    return left;
  };

  const parseImp = (): Expr => {
    const left = parseOr();
    if (match("imp")) return { kind: "bin", op: "imp", left, right: parseImp() };
    return left;
  };

  const parseOr = (): Expr => {
    let left = parseAnd();
    while (match("or")) left = { kind: "bin", op: "or", left, right: parseAnd() };
    return left;
  };

  const parseAnd = (): Expr => {
    let left = parseNot();
    while (match("and")) left = { kind: "bin", op: "and", left, right: parseNot() };
    return left;
  };

  const parseNot = (): Expr => {
    if (match("not")) return { kind: "not", body: parseNot() };
    return parseAtom();
  };

  const parseAtom = (): Expr => {
    if (match("lparen")) {
      const inner = parseIff();
      expect("rparen", "）");
      return inner;
    }
    const token = peek();
    if (!token) throw new Error("公式不完整");
    if (token.type === "var") {
      index += 1;
      return { kind: "var", name: token.text };
    }
    if (token.type === "true" || token.type === "false") {
      index += 1;
      return { kind: "const", value: token.type === "true" };
    }
    throw new Error(`意外的符号 “${token.text}”（位置 ${token.pos + 1}）`);
  };

  const expr = parseIff();
  if (index < tokens.length) throw new Error(`多余的符号 “${tokens[index].text}”`);
  return expr;
}

function evaluate(expr: Expr, env: Map<string, boolean>): boolean {
  switch (expr.kind) {
    case "var":
      return env.get(expr.name) ?? false;
    case "const":
      return expr.value;
    case "not":
      return !evaluate(expr.body, env);
    case "bin": {
      const left = evaluate(expr.left, env);
      const right = evaluate(expr.right, env);
      switch (expr.op) {
        case "and":
          return left && right;
        case "or":
          return left || right;
        case "imp":
          return !left || right;
        case "iff":
          return left === right;
      }
    }
  }
}

function variables(expr: Expr, into = new Set<string>()): Set<string> {
  switch (expr.kind) {
    case "var":
      into.add(expr.name);
      break;
    case "not":
      variables(expr.body, into);
      break;
    case "bin":
      variables(expr.left, into);
      variables(expr.right, into);
      break;
    default:
      break;
  }
  return into;
}

function render(source: string) {
  if (!resultRoot || !statusEl) return;

  try {
    const expr = parse(source);
    const vars = [...variables(expr)].sort((a, b) => a.localeCompare(b, "en"));
    if (vars.length > 6) throw new Error("变量超过 6 个；请先简化公式。");

    const rows = 1 << vars.length;
    const table = document.createElement("table");
    table.className = "truth-table";

    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");
    [...vars, source].forEach((label) => {
      const th = document.createElement("th");
      th.textContent = label;
      headRow.append(th);
    });
    thead.append(headRow);
    table.append(thead);

    const tbody = document.createElement("tbody");
    let trueCount = 0;

    for (let row = 0; row < rows; row += 1) {
      const env = new Map<string, boolean>();
      vars.forEach((name, i) => env.set(name, Boolean((row >> (vars.length - 1 - i)) & 1)));
      const value = evaluate(expr, env);
      if (value) trueCount += 1;

      const tr = document.createElement("tr");
      vars.forEach((name) => {
        const td = document.createElement("td");
        td.textContent = env.get(name) ? "1" : "0";
        td.className = env.get(name) ? "true" : "false";
        tr.append(td);
      });
      const td = document.createElement("td");
      td.textContent = value ? "1" : "0";
      td.className = value ? "true" : "false";
      tr.append(td);
      tbody.append(tr);
    }
    table.append(tbody);

    const classification = trueCount === rows ? "重言式 / Tautology" : trueCount === 0 ? "矛盾式 / Contradiction" : "可满足式 / Contingent";
    const className = trueCount === rows ? "ok" : trueCount === 0 ? "bad" : "warn";

    resultRoot.replaceChildren();
    const summary = document.createElement("div");
    summary.className = `result-box ${className}`;
    const strong = document.createElement("b");
    strong.textContent = classification;
    summary.append(strong, document.createTextNode(` · ${vars.length} 个变量，${rows} 行；真值 ${trueCount} 行，假值 ${rows - trueCount} 行。`));
    resultRoot.append(summary);

    const wrap = document.createElement("div");
    wrap.className = "truth-table-wrap";
    wrap.style.marginTop = "0.6rem";
    wrap.append(table);
    resultRoot.append(wrap);

    statusEl.textContent = trueCount === rows ? "TAUTOLOGY" : trueCount === 0 ? "CONTRADICTION" : "SATISFIABLE";
  } catch (error) {
    resultRoot.replaceChildren();
    const box = document.createElement("div");
    box.className = "result-box bad";
    const strong = document.createElement("b");
    strong.textContent = "解析失败";
    box.append(strong, document.createTextNode(` · ${error instanceof Error ? error.message : String(error)}`));
    resultRoot.append(box);
    statusEl.textContent = "ERROR";
  }
}

runButton?.addEventListener("click", () => {
  if (formulaInput) render(formulaInput.value);
});

formulaInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    render(formulaInput.value);
  }
});

document.querySelectorAll<HTMLButtonElement>("[data-tt-preset]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!formulaInput) return;
    formulaInput.value = button.dataset.ttPreset ?? "";
    render(formulaInput.value);
  });
});

if (formulaInput) render(formulaInput.value);

export {};
