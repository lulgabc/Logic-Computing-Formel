import type { ClaimStatus } from "./types";

export interface TrackPhase {
  name: string;
  months: string;
  focus: string;
  deliverable: string;
}

export interface Track {
  id: string;
  title: string;
  en: string;
  tagline: string;
  audience: string;
  outcome: string;
  topics: string[];
  phases: TrackPhase[];
}

export const tracks: Track[] = [
  {
    id: "logic-proof",
    title: "逻辑与证明",
    en: "Logic & Proof",
    tagline: "从纸面证明到机器检查的证明。",
    audience: "想做形式化数学、类型论、proof assistant 或逻辑研究的人。",
    outcome: "能独立读逻辑/类型论论文，在 Lean 或 Rocq 中完成一个小型形式化，并理解其可信边界。",
    topics: ["mathematical-logic", "type-theory", "sat-smt-proof", "category-theory"],
    phases: [
      {
        name: "语法、语义与证明",
        months: "第 1–3 月",
        focus: "命题/一阶逻辑、自然演绎、可靠性/完备性；同时开始 Lean 4。",
        deliverable: "真值表工具 + 20 个手写证明 + Lean 中的命题逻辑可靠性特例。",
      },
      {
        name: "类型论与 Curry–Howard",
        months: "第 4–6 月",
        focus: "STLC、依赖类型、相等类型；在 Agda/Lean 中实现向量与 map。",
        deliverable: "STLC 解释器 + 依赖向量库 + 一页 Curry–Howard 解释。",
      },
      {
        name: "自动化与证书",
        months: "第 7–9 月",
        focus: "SAT/CDCL、SMT-LIB、DRAT/LRAT；用 Z3/cvc5 做程序分析小例。",
        deliverable: "DPLL + DRAT 证书 + SMT benchmark 报告。",
      },
      {
        name: "范畴与研究方向",
        months: "第 10–12 月",
        focus: "Yoneda、伴随、monad；选一个方向读论文并复现。",
        deliverable: "一个可展示的形式化项目 + 10 页技术报告。",
      },
    ],
  },
  {
    id: "computation-optimization",
    title: "计算与优化",
    en: "Computation & Optimization",
    tagline: "从可计算性边界到可证明的最优解。",
    audience: "做算法、运筹、机器学习、系统性能或理论计算机科学的人。",
    outcome: "能判断问题的计算难度，建立 LP/MIP/凸优化模型，读懂 solver 日志与证书，并评估 AI 声称的算法突破。",
    topics: ["mathematical-logic", "computability-complexity", "optimization", "sat-smt-proof"],
    phases: [
      {
        name: "计算边界",
        months: "第 1–3 月",
        focus: "图灵机、可判定性、P/NP、归约；实现 TM 模拟器与 3 个归约。",
        deliverable: "TM 模拟器 + 3 个 NP-完全归约 + 实验报告。",
      },
      {
        name: "复杂度进阶",
        months: "第 4–6 月",
        focus: "电路、随机、参数化、细粒度；读 Williams 2025 与 SETH 论文。",
        deliverable: "一篇 8 页综述 + 一个 SAT 相变实验。",
      },
      {
        name: "线性与凸优化",
        months: "第 7–9 月",
        focus: "LP 对偶、KKT、锥规划、一阶方法；用 HiGHS/CVXPY/SCIP。",
        deliverable: "5 个建模案例 + projected gradient/ADMM 实现 + 对偶解释。",
      },
      {
        name: "整数、非凸与前沿",
        months: "第 10–12 月",
        focus: "分支定界、MINLP、可微分优化、AI for optimization。",
        deliverable: "一个工程优化项目 + 全局最优证书 + 论文复现。",
      },
    ],
  },
  {
    id: "formal-engineering",
    title: "形式化工程",
    en: "Formal Engineering",
    tagline: "把规格、证明与 CI 带进真实系统。",
    audience: "做安全关键软件、云安全、芯片、编译器、协议或 Rust/C/SystemVerilog 系统的人。",
    outcome: "能为一个真实组件写规格，用模型检测/演绎验证/抽象解释或 SVA/形式化证明关键性质，并解释验证的边界与成本。",
    topics: ["mathematical-logic", "formal-methods", "sat-smt-proof", "type-theory", "systemverilog"],
    phases: [
      {
        name: "规格与模型检测",
        months: "第 1–3 月",
        focus: "LTL/CTL、TLA+/SPIN、公平性与反例；写一个分布式协议。",
        deliverable: "TLA+ 规格 + 3 条性质 + 故障注入反例。",
      },
      {
        name: "演绎验证",
        months: "第 4–6 月",
        focus: "Hoare 逻辑、WP、循环不变量；Dafny 与 Verus。",
        deliverable: "验证队列/二分查找 + 10 个引理 + 规格评审。",
      },
      {
        name: "系统、并发与 RTL",
        months: "第 7–9 月",
        focus: "分离逻辑、Rust 所有权、Kani/CBMC、SVA 与 Yosys/SymbiYosys 形式化。",
        deliverable: "验证一个 Rust/C 组件或 RTL 断言；用两种工具交叉检查。",
      },
      {
        name: "工业案例与证明工程",
        months: "第 10–12 月",
        focus: "seL4/CompCert/Cedar/开源 RTL 选一个；CI、证明维护、成本分析。",
        deliverable: "10 页案例报告 + 可复现的验证流水线。",
      },
    ],
  },
];

export interface Highlight {
  date: string;
  topicSlug: string;
  topicTitle: string;
  title: string;
  status: ClaimStatus;
  url: string;
}

export const highlights: Highlight[] = [
  {
    date: "2026-08",
    topicSlug: "mathematical-logic",
    topicTitle: "数学逻辑",
    title: "费马大定理的 Lean 证明完成，独立内核复核通过",
    status: "reported",
    url: "/topics/mathematical-logic/#latest",
  },
  {
    date: "2026-10",
    topicSlug: "computability-complexity",
    topicTitle: "计算理论",
    title: "OpenAI 声称否定 ETH，形式化已出，社区复核进行中",
    status: "pending",
    url: "/topics/computability-complexity/#latest",
  },
  {
    date: "2025-02",
    topicSlug: "computability-complexity",
    topicTitle: "复杂度",
    title: "Williams：时间 t 可在 √(t log t) 空间模拟",
    status: "verified",
    url: "/topics/computability-complexity/#latest",
  },
  {
    date: "2026-07",
    topicSlug: "sat-smt-proof",
    topicTitle: "SAT / SMT",
    title: "SAT 2026 强制证明日志；SMT-COMP 2026 cvc5 总排名第一",
    status: "verified",
    url: "/topics/sat-smt-proof/#latest",
  },
  {
    date: "2025-05",
    topicSlug: "optimization",
    topicTitle: "优化",
    title: "AlphaEvolve 找到 4×4 复矩阵乘法 48 次标量乘",
    status: "verified",
    url: "/topics/optimization/#latest",
  },
  {
    date: "2026-04",
    topicSlug: "type-theory",
    topicTitle: "类型论",
    title: "HoTT Book 实数在 Cubical Agda 中形式化",
    status: "reported",
    url: "/topics/type-theory/#latest",
  },
  {
    date: "2026-11",
    topicSlug: "systemverilog",
    topicTitle: "SystemVerilog",
    title: "Verilator 5.054 与 Yosys 0.71 发布，开源 RTL 流程继续成熟",
    status: "verified",
    url: "/topics/systemverilog/#latest",
  },
];

export const statusMeta: Record<ClaimStatus, { label: string; short: string; desc: string }> = {
  verified: {
    label: "已核实",
    short: "V",
    desc: "有官方发布、论文、竞赛结果或可复核的一手材料；仍可能随时间变化。",
  },
  reported: {
    label: "报道",
    short: "R",
    desc: "有可靠来源或官方声明，但独立复核、长期评估或数学社区接受尚未完成。",
  },
  pending: {
    label: "待复核",
    short: "P",
    desc: "重大或争议声明；请把它当作“待验证的假设”，不要当结论引用。",
  },
};

export const principles = [
  {
    title: "一手来源优先",
    body: "论文、官方发布、竞赛结果、项目仓库优先；教程与博客只用于解释，不作为事实依据。",
  },
  {
    title: "区分事实与声明",
    body: "每条前沿动态标注已核实 / 报道 / 待复核；不把“Lean 接受”写成“数学界已接受”。",
  },
  {
    title: "版本会过期",
    body: "工具版本、竞赛排名、课程链接都会变化；本站标注时间，但请以官方页面为准。",
  },
  {
    title: "以做代学",
    body: "每个主题至少 3 个 lab；没有产物的学习不算完成。先跑通最小例子，再扩展。",
  },
  {
    title: "术语保留英文",
    body: "soundness、completeness、univalence 等词不强行翻译；首次出现时给中文解释。",
  },
  {
    title: "不替代教材与专家",
    body: "这是一个学习地图与工具箱，不是教材、论文综述或工程认证依据。",
  },
];

export const weeklyRhythm = [
  { time: "2 h", label: "精读", detail: "一次只读 10–15 页，做定义/定理/例子的三栏笔记。" },
  { time: "2 h", label: "手写证明", detail: "不看答案，先写骨架；卡住时标记，再对照教材。" },
  { time: "2–4 h", label: "Lab", detail: "每个主题至少一个可运行产物；提交前写 5 行复盘。" },
  { time: "1 h", label: "回顾", detail: "每周更新一次“会/不会/待查”清单，删掉已经掌握的卡片。" },
];
