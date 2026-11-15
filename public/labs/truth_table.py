#!/usr/bin/env python3
"""A tiny propositional truth-table classifier.

Usage:
    python truth_table.py "(P -> Q) <-> (~P | Q)"
    python truth_table.py "P & ~P"

Supported connectives: ~ ! ¬, & ∧, | ∨, -> →, <-> ↔.
This is a teaching implementation, not a production parser.
"""

from __future__ import annotations

import itertools
import sys
from dataclasses import dataclass


@dataclass(frozen=True)
class Expr:
    kind: str
    value: str | bool | None = None
    left: "Expr | None" = None
    right: "Expr | None" = None


def tokenize(text: str) -> list[str]:
    tokens: list[str] = []
    i = 0
    while i < len(text):
        ch = text[i]
        if ch.isspace():
            i += 1
            continue
        for op in ("<->", "->", "&&", "||"):
            if text.startswith(op, i):
                tokens.append(op)
                i += len(op)
                break
        else:
            if ch.isalpha():
                j = i + 1
                while j < len(text) and (text[j].isalnum() or text[j] == "_"):
                    j += 1
                tokens.append(text[i:j])
                i = j
            elif ch in "~!¬&∧|∨→↔()":
                tokens.append(ch)
                i += 1
            else:
                raise ValueError(f"unexpected character {ch!r} at {i + 1}")
            continue
        continue
    return tokens


class Parser:
    def __init__(self, tokens: list[str]):
        self.tokens = tokens
        self.pos = 0

    def peek(self) -> str | None:
        return self.tokens[self.pos] if self.pos < len(self.tokens) else None

    def take(self, expected: str | None = None) -> str:
        token = self.peek()
        if token is None:
            raise ValueError("unexpected end of formula")
        if expected is not None and token != expected:
            raise ValueError(f"expected {expected!r}, got {token!r}")
        self.pos += 1
        return token

    def parse(self) -> Expr:
        expr = self.iff()
        if self.peek() is not None:
            raise ValueError(f"unexpected token {self.peek()!r}")
        return expr

    def iff(self) -> Expr:
        left = self.imp()
        while self.peek() in ("<->", "↔"):
            self.take()
            left = Expr("bin", "iff", left, self.imp())
        return left

    def imp(self) -> Expr:
        left = self.disj()
        if self.peek() in ("->", "→"):
            self.take()
            return Expr("bin", "imp", left, self.imp())
        return left

    def disj(self) -> Expr:
        left = self.conj()
        while self.peek() in ("|", "||", "∨"):
            self.take()
            left = Expr("bin", "or", left, self.conj())
        return left

    def conj(self) -> Expr:
        left = self.neg()
        while self.peek() in ("&", "&&", "∧"):
            self.take()
            left = Expr("bin", "and", left, self.neg())
        return left

    def neg(self) -> Expr:
        if self.peek() in ("~", "!", "¬"):
            self.take()
            return Expr("not", left=self.neg())
        return self.atom()

    def atom(self) -> Expr:
        token = self.peek()
        if token == "(":
            self.take()
            expr = self.iff()
            self.take(")")
            return expr
        if token is None:
            raise ValueError("unexpected end of formula")
        self.take()
        if token.lower() == "true" or token == "T":
            return Expr("const", True)
        if token.lower() == "false" or token == "F":
            return Expr("const", False)
        if token[0].isalpha():
            return Expr("var", token)
        raise ValueError(f"unexpected token {token!r}")


def variables(expr: Expr, out: set[str] | None = None) -> set[str]:
    out = set() if out is None else out
    if expr.kind == "var":
        out.add(str(expr.value))
    elif expr.kind == "not":
        variables(expr.left, out)  # type: ignore[arg-type]
    elif expr.kind == "bin":
        variables(expr.left, out)  # type: ignore[arg-type]
        variables(expr.right, out)  # type: ignore[arg-type]
    return out


def evaluate(expr: Expr, env: dict[str, bool]) -> bool:
    if expr.kind == "var":
        return env[str(expr.value)]
    if expr.kind == "const":
        return bool(expr.value)
    if expr.kind == "not":
        return not evaluate(expr.left, env)  # type: ignore[arg-type]
    left = evaluate(expr.left, env)  # type: ignore[arg-type]
    right = evaluate(expr.right, env)  # type: ignore[arg-type]
    if expr.value == "and":
        return left and right
    if expr.value == "or":
        return left or right
    if expr.value == "imp":
        return (not left) or right
    return left == right


def main() -> None:
    formula = " ".join(sys.argv[1:]) or "(P -> Q) <-> (~P | Q)"
    expr = Parser(tokenize(formula)).parse()
    names = sorted(variables(expr))
    if len(names) > 8:
        raise SystemExit("too many variables for this toy tool (max 8)")

    print("formula:", formula)
    width = max(len(name) for name in names + ["result"]) + 2
    print(" ".join(name.rjust(width) for name in names + ["result"]))
    print("-" * ((width + 1) * (len(names) + 1) - 1))

    true_rows = 0
    for values in itertools.product([False, True], repeat=len(names)):
        env = dict(zip(names, values))
        result = evaluate(expr, env)
        true_rows += result
        print(" ".join(("1" if value else "0").rjust(width) for value in values + (result,)))

    total = 2 ** len(names)
    kind = "tautology" if true_rows == total else "contradiction" if true_rows == 0 else "contingent"
    print(f"\n{kind}: {true_rows}/{total} assignments satisfy the formula")


if __name__ == "__main__":
    main()
