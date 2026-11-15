# 起步代码 / Starter labs

这些文件是站内 Lab 的“可改起点”，不是标准答案。

| 文件 | 用途 | 依赖 |
| --- | --- | --- |
| `truth_table.py` | 命题逻辑真值表与重言式/矛盾式分类 | Python 3.11+ |
| `dpll.py` | 教学版 DPLL SAT 求解器 + 搜索轨迹 | Python 3.11+ |
| `simplex.py` | 标准形 LP 的表格单纯形（max, Ax≤b, x≥0） | Python + NumPy |
| `smt_examples.smt2` | EUF / LIA / BV / Array / unsat core 示例 | cvc5 或 Z3 |
| `lean_basics.lean` | Lean 4 命题公式语法与语义 | Lean 4 |
| `tla_example.tla` | 一个最小 TLA+ 规格 | TLA+ Toolbox / TLC |

## 快速运行

```bash
python truth_table.py "(P -> Q) <-> (~P | Q)"
python dpll.py <<'EOF'
P Q
-P Q
P -Q
EOF
python simplex.py

cvc5 smt_examples.smt2
lean lean_basics.lean
```

## 建议的改法

1. 把真值表扩展到 8 个变量，并加入 CNF 转换。
2. 给 DPLL 加入纯文字消去、VSIDS 或 DRAT 日志。
3. 给单纯形加入两阶段法，处理 `b` 含负数的情形。
4. 在 Lean 中补完 `eval_and`，再用 `#print axioms` 审计。
5. 给 TLA+ 计数器加入“回绕”或“故障注入”，观察不变量如何被破坏。

遇到 bug 是正常的：先写一个最小复现，再改代码。
