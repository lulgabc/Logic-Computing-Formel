# 计算，逻辑与形式化 · Logic, Computing & Formalization

一份写给工程师、数学爱好者与研究者的中文 **学习与实践地图**：从数学逻辑、类型论、范畴论，到计算理论与复杂度、形式化验证、优化理论，以及 SAT / SMT / Proof Assistant。

> 目录名 `Logic-Computing-Formel` 中的 **Formel** 取自德语“形式 / 公式”，对应站点的“形式化”主题。

**Live site:** https://lulgabc.github.io/Logic-Computing-Formel/  
**Repo:** https://github.com/lulgabc/Logic-Computing-Formel

## 里面有什么

- **七个主题** — 每个主题都包含：
  - 介绍：核心问题、基本概念、子领域、为什么值得学
  - 学习路径：4 个阶段、时间估计、每阶段产物
  - 课程：6–8 门公开课 / 在线教材，标注难度、形式与用途
  - 参考书：8–11 本，标注“先读 / 主教材 / 进阶 / 工具书”
  - 论文阅读：每个主题 4–5 篇，按阅读顺序给出“为什么读”、中文导读与入口
  - 论文复现：每个主题 2 个可执行项目，含步骤、交付物、常见坑与本地进度
  - 最新发展：2025–2026 的动态，逐条标注 **已核实 / 报道 / 待复核**
  - 工具：开源、商业、研究工具，标注语言、许可、主流/特色
  - 实践 Lab：3–5 个可运行项目，含步骤、交付物、延伸方向
  - 常见误区：每个主题 3 条，区分“听起来像”与“实际成立”
  - 自检清单：6 条“能解释 / 能证明 / 能实现”的掌握标准
- **三条 12 个月路线** — 逻辑与证明、计算与优化、形式化工程。每条含 4 个阶段、每月产出、每周节奏与常见错误。
- **交互实验室** — 原生 TypeScript + SVG：
  - 命题逻辑真值表分类器
  - DPLL SAT 求解器（带决策/传播/冲突轨迹）
  - 二维线性规划几何（可行域、目标等值线、无界/不可行）
- **工具全景** — 按七个主题归类，每个主题再分开源/学术与商业/厂商；可按类型、关键词筛选，并附“四个典型场景”选择指南。
- **快速开始** — 22 个常用工具的安装命令与 `--version` 验证，覆盖 Lean、Rocq、Agda、Z3、cvc5、TLA+、Dafny、Verus、Kani、CVXPY、HiGHS、SCIP 等。
- **全站搜索** — 搜索 400+ 条条目：课程、书、论文、工具、术语、前沿动态、Lab、复现、会议与页面，支持类型与主题筛选。
- **课程与书单** — 按主题、难度筛选；课程 / 书单双 tab。
- **术语表** — 56 个跨主题核心术语，可按主题、关键词筛选，并链接回对应主题。
- **会议与社区** — 15 个稳定的会议、竞赛与问答入口：ASL、LICS、ICFP、ACT、STOC、FOCS、CCC、SAT/SMT-COMP、ETAPS、Lean Zulip、MOS、INFORMS 等。
- **起步代码** — `public/labs/` 下的 Python / SMT-LIB / Lean / TLA+ 文件。
- **深色/浅色主题**、响应式布局、本地进度保存、静态生成、可打印。

## 七个主题

| # | 主题 | 关键词 |
| --- | --- | --- |
| 01 | 数学逻辑 | 一阶逻辑、证明论、模型论、集合论、不完备性 |
| 02 | 类型论 | Curry–Howard、依赖类型、HoTT、立方类型、效应 |
| 03 | 范畴论 | 函子、Yoneda、伴随、monad、topos、应用范畴论 |
| 04 | 计算理论与复杂度 | 图灵机、可判定性、P/NP、电路、细粒度、证明复杂度 |
| 05 | 形式化方法与验证 | 模型检测、Hoare 逻辑、抽象解释、分离逻辑、Rust 验证 |
| 06 | 优化理论 | 线性/整数、凸/锥、非线性、一阶方法、最优控制 |
| 07 | SAT / SMT / Proof Assistant | CDCL、DRAT/LRAT、DPLL(T)、Lean/Rocq/Isabelle |

## 技术

- [Astro](https://astro.build/) 静态站点，无前端框架运行时
- GitHub Pages 自动部署（GitHub Actions）
- 全部交互为原生 TypeScript + SVG，无第三方脚本、无 CDN、无追踪
- 深色/浅色主题；支持 `prefers-reduced-motion`
- 所有页面静态生成，适合离线阅读与打印

## 本地开发

需要 Node.js **22.23.4+**（Astro 7 的要求；Node 24 推荐）。

```bash
npm install
npm run dev
```

打开 http://localhost:4321/Logic-Computing-Formel/

```bash
npm run build      # 生成 dist/
npm run preview    # 预览构建结果
npm run check      # TypeScript / Astro 检查
```

## 部署

推送到 `main` 后，`.github/workflows/deploy.yml` 会构建并把 `dist/` 发布到 GitHub Pages。

仓库设置里将 **Pages → Build and deployment → Source** 设为 **GitHub Actions**。

Astro 配置使用：

```js
site: "https://lulgabc.github.io",
base: "/Logic-Computing-Formel",
```

如果 fork 到其他仓库名，请同步修改 `astro.config.mjs`、`src/lib/site.ts`、`public/robots.txt`、`public/og.svg`，并重新导出 `public/og.png`。

## 内容结构

```
src/
  data/
    types.ts              # Topic / Course / Book / Tool / Lab 类型
    site.ts               # 三条路线、首页动态、内容原则、状态定义
    glossary.ts           # 56 个跨主题术语
    community.ts          # 会议、竞赛与社区入口
    quickstart.ts         # 22 个工具的安装命令
    paper-guides.ts       # 30 篇论文的中文导读
    repro.ts              # 14 个论文复现实验
    topics/               # 七个主题的数据文件（含论文阅读清单）
  pages/
    index.astro           # 首页
    roadmap.astro         # 三条路线
    topics/[slug].astro   # 主题详情（静态生成）
    tools.astro           # 工具全景 + 筛选 + 场景选择指南
    quickstart.astro      # 22 个工具的安装与验证命令
    resources.astro       # 课程/书单 + 筛选
    glossary.astro        # 术语表 + 筛选
    community.astro       # 会议、竞赛与社区 + 筛选
    repro.astro           # 14 个论文复现实验 + 本地进度
    search.astro          # 全站搜索（400+ 条索引）
    labs.astro            # 三个交互实验 + Lab 阶梯
    about.astro           # 方法、状态、许可
  scripts/
    main.ts               # 主题切换、移动导航、滚动 reveal、目录 spy
    search.ts             # 全站搜索（JSON 索引 + 类型/主题筛选）
    progress.ts           # 自检清单 localStorage
    tools-filter.ts       # 工具筛选
    resources-filter.ts   # 资源筛选
    labs/                 # 真值表 / DPLL / 二维 LP
public/
  labs/                   # Python / SMT-LIB / Lean / TLA+ 起步代码
  og.svg                  # 社交预览图源文件
```

## 内容原则

1. **按产物组织，不按教材章节。** 每个阶段必须能跑、能测、能解释。
2. **一手来源优先。** 论文、官方发布、竞赛结果、项目仓库优先；教程与博客只用于解释。
3. **区分事实、报道与待复核。** 不把“Lean 内核接受”写成“数学界已接受”，不把“论文可行”写成“工业已部署”。
4. **资源少而准。** 每主题一本主教材 + 一门主课；其余作为进阶与工具书。
5. **工具选择看问题，不看排名。** 版本、许可与社区会变化，请以官方页面为准。
6. **不替代教材、专家与认证。** 本站是学习地图与工具箱，不构成工程、安全或法律建议。

## 状态标记

- **已核实**：有官方发布、论文、竞赛结果或可复核的一手材料。
- **报道**：有可靠来源或官方声明，但独立复核、长期评估尚未完成。
- **待复核**：重大或争议声明；请当作“待验证的假设”，不要当结论引用。

## 许可

代码与中文文字以 [MIT License](./LICENSE) 开源。第三方书籍、论文、商标、课程与工具链接的版权归各自权利人所有。

## 贡献

欢迎提 issue / PR：链接失效、事实错误、版本过时、新的高质量课程或工具。请附一手来源，并说明它属于哪个主题、适合什么阶段。
