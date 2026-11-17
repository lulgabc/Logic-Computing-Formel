# SystemVerilog 起步代码

这些文件是站内“SystemVerilog 与硬件验证”主题的最小实验，已在 macOS 上用以下版本验证：

```text
Verilator 5.054 2026-11-01
Icarus Verilog 13.0
Yosys 0.71+post
sv2v 0.0.13
```

## 1. 计数器

```bash
iverilog -g2012 -o counter.vvp counter.sv tb_counter.sv
vvp counter.vvp
```

预期输出：

```text
PASS: counter increments and holds correctly
```

Verilator 版本：

```bash
verilator --binary --timing --timescale 1ns/1ps \
  -Wno-TIMESCALEMOD -Wno-PROCASSINIT \
  --top-module tb_counter counter.sv tb_counter.sv \
  -Mdir obj_counter -o counter_sim
./counter_sim
```

## 2. 仲裁器与 SVA

```bash
iverilog -g2012 -o arbiter.vvp arbiter.sv tb_arbiter.sv
vvp arbiter.vvp

verilator --lint-only --assert --timing \
  arbiter.sv arbiter_sva.sv --top-module arbiter_sva
```

## 3. 形式化（BMC 与 k-归纳）

```bash
yosys -q formal_arbiter.ys
yosys-smtbmc -s z3 -t 8 arbiter_formal.smt2
```

预期：

```text
Status: PASSED
```

`arbiter.sby` 是 SymbiYosys 配置，用 k-归纳做无界证明：

```bash
brew install sby z3
sby arbiter.sby
```

预期结尾：

```text
engine_0 (smtbmc z3) returned pass for basecase
engine_0 (smtbmc z3) returned pass for induction
successful proof by k-induction.
DONE (PASS, rc=0)
```

## 4. lint + 综合

```bash
verilator --lint-only counter.sv arbiter.sv
yosys -p "read_verilog -sv counter.sv; synth; stat"
```

## 注意

- Verilator/Icarus/Yosys 支持 SystemVerilog 的子集；完整 UVM、复杂 SVA 与工业覆盖率仍需商用 simulator。
- `yosys-smtbmc -t 8` 是有限步 BMC，不是无界证明；`arbiter.sby` 的 `mode prove` 才尝试 k-归纳。
- 这些文件是教学起点，不是签核级验证环境。
