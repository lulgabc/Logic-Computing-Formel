#!/usr/bin/env python3
"""A tiny simplex solver for:

    maximize    c^T x
    subject to  A x <= b,  x >= 0,  b >= 0

It uses the standard tableau simplex with Bland's rule to avoid cycling.
This is a teaching implementation: no two-phase method, no bounds, no sparsity.

Usage:
    python simplex.py
"""

from __future__ import annotations

import numpy as np


def simplex(c: np.ndarray, A: np.ndarray, b: np.ndarray) -> tuple[float, np.ndarray, list[str]]:
    m, n = A.shape
    if np.any(b < 0):
        raise ValueError("this toy simplex requires b >= 0 (no two-phase method)")

    # Tableau columns: x (n) + slack (m) + rhs (1)
    tableau = np.zeros((m + 1, n + m + 1), dtype=float)
    tableau[:m, :n] = A
    tableau[:m, n : n + m] = np.eye(m)
    tableau[:m, -1] = b
    tableau[-1, :n] = -c  # reduced costs for maximization

    basis = list(range(n, n + m))
    steps: list[str] = []

    for iteration in range(200):
        # Bland's rule: smallest index with negative reduced cost
        entering = None
        for j in range(n + m):
            if tableau[-1, j] < -1e-10:
                entering = j
                break
        if entering is None:
            break

        ratios: list[tuple[float, int]] = []
        for i in range(m):
            if tableau[i, entering] > 1e-10:
                ratios.append((tableau[i, -1] / tableau[i, entering], i))
        if not ratios:
            raise ValueError("unbounded linear program")
        _, leaving = min(ratios)
        pivot = tableau[leaving, entering]
        tableau[leaving, :] /= pivot
        for i in range(m + 1):
            if i == leaving:
                continue
            factor = tableau[i, entering]
            if abs(factor) > 1e-12:
                tableau[i, :] -= factor * tableau[leaving, :]
        basis[leaving] = entering
        steps.append(f"iter {iteration + 1}: enter x{entering + 1}, leave row {leaving + 1}")

    solution = np.zeros(n + m, dtype=float)
    for row, var in enumerate(basis):
        solution[var] = tableau[row, -1]
    value = tableau[-1, -1]
    return float(value), solution[:n], steps


def main() -> None:
    # maximize 3x + 2y
    # s.t. x + y <= 4, x <= 2, y <= 3, x,y >= 0
    c = np.array([3.0, 2.0])
    A = np.array([[1.0, 1.0], [1.0, 0.0], [0.0, 1.0]])
    b = np.array([4.0, 2.0, 3.0])

    value, x, steps = simplex(c, A, b)
    print("steps:")
    print("\n".join(steps) if steps else "(initial basis already optimal)")
    print(f"\noptimal value = {value:.6g}")
    print("x =", x)


if __name__ == "__main__":
    main()
