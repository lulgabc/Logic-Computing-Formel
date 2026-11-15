#!/usr/bin/env python3
"""A small DPLL SAT solver with a readable trace.

Input: one clause per line, literals separated by spaces, '-' for negation.
DIMACS CNF is also accepted.

Usage:
    python dpll.py examples/sat.cnf
    python dpll.py <<'EOF'
    P Q
    -P Q
    P -Q
    EOF
"""

from __future__ import annotations

import sys
from dataclasses import dataclass, field


@dataclass
class Stats:
    decisions: int = 0
    propagations: int = 0
    conflicts: int = 0
    nodes: int = 0


@dataclass
class Result:
    model: dict[int, bool] | None
    clauses: list[list[int]]
    names: dict[int, str]
    stats: Stats = field(default_factory=Stats)
    trace: list[str] = field(default_factory=list)


def parse(text: str) -> tuple[list[list[int]], dict[int, str]]:
    names: dict[int, str] = {}
    name_to_id: dict[str, int] = {}
    clauses: list[list[int]] = []

    def ident(name: str) -> int:
        if name not in name_to_id:
            name_to_id[name] = len(name_to_id) + 1
            names[name_to_id[name]] = name
        return name_to_id[name]

    if any(line.strip().startswith("p cnf") for line in text.splitlines()):
        buffer: list[int] = []
        for line in text.splitlines():
            line = line.strip()
            if not line or line.startswith("c") or line.startswith("p"):
                continue
            for token in line.split():
                if not token.lstrip("-").isdigit():
                    continue
                value = int(token)
                if value == 0:
                    clauses.append(buffer)
                    buffer = []
                else:
                    var = abs(value)
                    names.setdefault(var, f"x{var}")
                    buffer.append(value)
        if buffer:
            clauses.append(buffer)
        return clauses, names

    for line in text.splitlines():
        line = line.replace("(", " ").replace(")", " ").replace("∨", " ").replace("∧", "\n")
        for part in line.split("\n"):
            clause: list[int] = []
            for token in part.replace(",", " ").split():
                if token in ("0", "true", "false"):
                    continue
                negated = False
                while token and token[0] in "-~!¬":
                    negated = not negated
                    token = token[1:]
                if not token:
                    continue
                var = ident(token)
                clause.append(-var if negated else var)
            if clause:
                clauses.append(clause)
    return clauses, names


def solve(clauses: list[list[int]], names: dict[int, str]) -> Result:
    stats = Stats()
    trace: list[str] = []
    result = Result(None, clauses, names, stats, trace)

    def lit_value(lit: int, assignment: dict[int, bool]) -> bool | None:
        value = assignment.get(abs(lit))
        if value is None:
            return None
        return value if lit > 0 else not value

    def log(depth: int, message: str) -> None:
        if len(trace) < 500:
            trace.append("  " * min(depth, 8) + message)

    def search(assignment: dict[int, bool], depth: int) -> dict[int, bool] | None:
        stats.nodes += 1
        current = dict(assignment)

        while True:
            unit: int | None = None
            all_satisfied = True
            for clause in clauses:
                unassigned: list[int] = []
                satisfied = False
                for lit in clause:
                    value = lit_value(lit, current)
                    if value is True:
                        satisfied = True
                        break
                    if value is None:
                        unassigned.append(lit)
                if satisfied:
                    continue
                if not unassigned:
                    stats.conflicts += 1
                    log(depth, f"conflict: ({' ∨ '.join(map(str, clause))}) is false")
                    return None
                all_satisfied = False
                if len(unassigned) == 1:
                    unit = unassigned[0]
                    break
            if all_satisfied:
                return current
            if unit is None:
                break
            current[abs(unit)] = unit > 0
            stats.propagations += 1
            log(depth, f"unit: {names.get(abs(unit), abs(unit))} = {int(unit > 0)}")

        best: list[int] | None = None
        for clause in clauses:
            unassigned = [lit for lit in clause if lit_value(lit, current) is None]
            satisfied = any(lit_value(lit, current) is True for lit in clause)
            if satisfied or not unassigned:
                continue
            if best is None or len(unassigned) < len(best):
                best = unassigned

        if best is None:
            return current

        var = abs(best[0])
        for value in (True, False):
            stats.decisions += 1
            log(depth, f"decide: {names.get(var, var)} = {int(value)}")
            child = dict(current)
            child[var] = value
            model = search(child, depth + 1)
            if model is not None:
                return model
            log(depth, f"backtrack: {names.get(var, var)}")
        return None

    result.model = search({}, 0)
    return result


def main() -> None:
    if len(sys.argv) > 1:
        text = open(sys.argv[1], encoding="utf-8").read()
    else:
        text = sys.stdin.read()

    clauses, names = parse(text)
    if not clauses:
        raise SystemExit("no clauses found")

    result = solve(clauses, names)
    print("clauses:", len(clauses), "variables:", len(names))
    print("stats:", result.stats)
    print("result:", "SAT" if result.model else "UNSAT")
    if result.model:
        print("model:", {names.get(var, var): int(value) for var, value in sorted(result.model.items())})
    print("\ntrace:")
    print("\n".join(result.trace) if result.trace else "(no search steps)")


if __name__ == "__main__":
    main()
