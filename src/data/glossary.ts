export interface GlossaryTerm {
  term: string;
  en: string;
  topic: string;
  def: string;
}

export const glossary: GlossaryTerm[] = [
  // 01 数学逻辑
  {
    term: "可靠性",
    en: "Soundness",
    topic: "mathematical-logic",
    def: "若 ⊢ φ 则 ⊨ φ：证明系统不会证明语义上为假的公式。",
  },
  {
    term: "完备性",
    en: "Completeness",
    topic: "mathematical-logic",
    def: "若 ⊨ φ 则 ⊢ φ：所有语义上有效的公式都有形式证明。注意这与“理论完备”不是同一概念。",
  },
  {
    term: "紧致性",
    en: "Compactness",
    topic: "mathematical-logic",
    def: "一阶理论每个有限子集可满足，则整个理论可满足；是构造非标准模型的核心工具。",
  },
  {
    term: "不完备定理",
    en: "Incompleteness Theorem",
    topic: "mathematical-logic",
    def: "足够强、可递归公理化且一致的算术理论中，存在既不可证也不可反驳的句子。",
  },
  {
    term: "可判定性",
    en: "Decidability",
    topic: "mathematical-logic",
    def: "是否存在算法对任意输入在有限步内回答是/否；一阶有效性不可判定，但许多片段可判定。",
  },
  {
    term: "模型",
    en: "Model",
    topic: "mathematical-logic",
    def: "一个结构加上对函数、关系与常量的解释，使公式在其中获得真值。",
  },
  {
    term: "归约",
    en: "Reduction",
    topic: "mathematical-logic",
    def: "把问题 A 的实例转换成问题 B 的实例，以传递可计算性或复杂度下界。",
  },
  {
    term: "语法与语义",
    en: "Syntax vs. Semantics",
    topic: "mathematical-logic",
    def: "语法研究符号如何组成公式；语义研究公式在结构中是否为真。可靠性/完备性连接二者。",
  },

  // 02 类型论
  {
    term: "Curry–Howard 对应",
    en: "Curry–Howard Correspondence",
    topic: "type-theory",
    def: "命题对应类型、证明对应项、归约对应证明变换；是证明助手与类型系统的核心直觉。",
  },
  {
    term: "依赖类型",
    en: "Dependent Type",
    topic: "type-theory",
    def: "类型可以依赖值，例如 Vec n A 的长度 n 是类型的一部分。",
  },
  {
    term: "Π 类型",
    en: "Pi Type",
    topic: "type-theory",
    def: "依赖函数类型，对应“对所有 x : A，B(x)”；全称量词的程序版本。",
  },
  {
    term: "Σ 类型",
    en: "Sigma Type",
    topic: "type-theory",
    def: "依赖对类型，对应“存在 x : A，B(x)”；存在量词的程序版本。",
  },
  {
    term: "定义相等",
    en: "Definitional Equality",
    topic: "type-theory",
    def: "由归约规则直接决定的相等，类型检查器可计算；与需要证明的命题相等不同。",
  },
  {
    term: "命题相等",
    en: "Propositional Equality",
    topic: "type-theory",
    def: "类型 a = b 的元素，表示需要构造证明的相等；在 HoTT 中对应路径。",
  },
  {
    term: "Univalence",
    en: "Univalence",
    topic: "type-theory",
    def: "类型等价可以视为类型相等；把数学中“同构即相同”的工作方式公理化。",
  },
  {
    term: "立方类型论",
    en: "Cubical Type Theory",
    topic: "type-theory",
    def: "用立方体模型给 univalence 与高阶归纳类型计算意义；Cubical Agda 的理论基础。",
  },

  // 03 范畴论
  {
    term: "范畴",
    en: "Category",
    topic: "category-theory",
    def: "对象、态射、组合与单位，满足结合律与单位律；数学结构的“接口”抽象。",
  },
  {
    term: "函子",
    en: "Functor",
    topic: "category-theory",
    def: "范畴之间的映射，保持对象、态射、组合与单位；Haskell 的 Functor 是其类型论版本。",
  },
  {
    term: "自然变换",
    en: "Natural Transformation",
    topic: "category-theory",
    def: "两个函子之间的态射族，满足自然性方块交换；比较两个结构保持映射的“映射”。",
  },
  {
    term: "Yoneda 引理",
    en: "Yoneda Lemma",
    topic: "category-theory",
    def: "Hom(-, A) ≅ Hom(-, B) 蕴含 A ≅ B；对象由它与其他对象的关系决定。",
  },
  {
    term: "极限 / 余极限",
    en: "Limit / Colimit",
    topic: "category-theory",
    def: "用泛性质统一积、拉回、商、余积等构造；是“组合信息”的通用语法。",
  },
  {
    term: "伴随",
    en: "Adjunction",
    topic: "category-theory",
    def: "F ⊣ G 表示 Hom(FA, B) ≅ Hom(A, GB)；统一自由构造与遗忘构造。",
  },
  {
    term: "Monad",
    en: "Monad",
    topic: "category-theory",
    def: "自函子范畴上的 monoid；描述计算、效应与代数结构的统一模式，Haskell 的 IO 只是其中一个实例。",
  },
  {
    term: "Topos",
    en: "Topos",
    topic: "category-theory",
    def: "行为像 Set 的范畴，带子对象分类器；连接逻辑、几何与类型论。",
  },

  // 04 计算理论与复杂度
  {
    term: "图灵机",
    en: "Turing Machine",
    topic: "computability-complexity",
    def: "有限状态控制 + 无限纸带；是算法直觉的数学化，也是复杂度类的标准模型。",
  },
  {
    term: "可计算性",
    en: "Computability",
    topic: "computability-complexity",
    def: "是否存在算法在有限步内给出答案；与 λ 演算、递归函数等模型等价。",
  },
  {
    term: "停机问题",
    en: "Halting Problem",
    topic: "computability-complexity",
    def: "不存在算法判定任意程序在任意输入上是否停机；对角线方法的典范。",
  },
  {
    term: "P / NP",
    en: "P vs. NP",
    topic: "computability-complexity",
    def: "P 是多项式时间可解，NP 是多项式时间可验证；二者是否相等是核心开放问题。",
  },
  {
    term: "NP-完全",
    en: "NP-Complete",
    topic: "computability-complexity",
    def: "属于 NP 且所有 NP 问题都可多项式归约到它；3-SAT 是起点。",
  },
  {
    term: "电路复杂度",
    en: "Circuit Complexity",
    topic: "computability-complexity",
    def: "用门电路大小/深度衡量计算；连接算法下界、并行复杂度与 P vs NP。",
  },
  {
    term: "细粒度复杂度",
    en: "Fine-Grained Complexity",
    topic: "computability-complexity",
    def: "在 SETH/ETH 等假设下给出精确指数下界，而不只是多项式/指数二分。",
  },
  {
    term: "证明复杂度",
    en: "Proof Complexity",
    topic: "computability-complexity",
    def: "研究证明长度与证明系统的下界；连接 SAT、自动定理证明与复杂度理论。",
  },

  // 05 形式化方法与验证
  {
    term: "规格",
    en: "Specification",
    topic: "formal-methods",
    def: "用数学语言描述系统“应该做什么”；是验证的起点，也是最难、最容易出错的部分。",
  },
  {
    term: "不变量",
    en: "Invariant",
    topic: "formal-methods",
    def: "在系统所有可达状态中都成立的断言；归纳证明与循环不变量的核心。",
  },
  {
    term: "模型检测",
    en: "Model Checking",
    topic: "formal-methods",
    def: "穷举有限状态空间，检查时序逻辑性质；能给出反例轨迹。",
  },
  {
    term: "抽象解释",
    en: "Abstract Interpretation",
    topic: "formal-methods",
    def: "在抽象域上计算程序行为的上近似；牺牲精度换取可扩展性，是 Astrée/Polyspace 的基础。",
  },
  {
    term: "精化",
    en: "Refinement",
    topic: "formal-methods",
    def: "用更具体的模型实现抽象规格，并证明行为包含关系；Event-B 的核心方法。",
  },
  {
    term: "Hoare 三元组",
    en: "Hoare Triple",
    topic: "formal-methods",
    def: "{P} C {Q}：若前置条件 P 成立且 C 停机，则后置条件 Q 成立。",
  },
  {
    term: "分离逻辑",
    en: "Separation Logic",
    topic: "formal-methods",
    def: "用 ∗ 与 ↦ 描述堆分离，处理别名与并发；RustBelt 等验证的基础。",
  },
  {
    term: "证明义务",
    en: "Proof Obligation",
    topic: "formal-methods",
    def: "验证器生成的逻辑公式；交给 SMT/ATP 或交互证明，是“程序正确”与“逻辑公式”的接口。",
  },

  // 06 优化理论
  {
    term: "线性规划",
    en: "Linear Programming",
    topic: "optimization",
    def: "线性目标 + 线性约束；可行域是多面体，最优解在顶点或面上。",
  },
  {
    term: "对偶",
    en: "Duality",
    topic: "optimization",
    def: "每个 LP/凸问题都有对偶问题；弱对偶给下界，强对偶在约束品性下成立。",
  },
  {
    term: "KKT 条件",
    en: "KKT Conditions",
    topic: "optimization",
    def: "等式/不等式约束下的最优性必要条件；凸问题且满足约束品性时也是充分条件。",
  },
  {
    term: "凸性",
    en: "Convexity",
    topic: "optimization",
    def: "可行集凸、目标凸；任何局部最优都是全局最优，这是可证明最优性的关键。",
  },
  {
    term: "锥规划",
    en: "Conic Programming",
    topic: "optimization",
    def: "LP/QP/SOCP/SDP 的统一形式；内点法与一阶方法的主战场。",
  },
  {
    term: "次梯度",
    en: "Subgradient",
    topic: "optimization",
    def: "非光滑凸函数在一点处的一类广义斜率；次梯度法是最简单的非光滑优化算法。",
  },
  {
    term: "分支定界",
    en: "Branch and Bound",
    topic: "optimization",
    def: "用松弛下界与分支剪枝求解整数/非凸问题；全局最优的骨架。",
  },
  {
    term: "对偶证书",
    en: "Duality Certificate",
    topic: "optimization",
    def: "对偶可行解、Farkas 证书或分支定界日志；用于证明“最优”或“不可行”。",
  },

  // 07 SAT / SMT / Proof Assistant
  {
    term: "CNF",
    en: "Conjunctive Normal Form",
    topic: "sat-smt-proof",
    def: "合取范式：子句的合取，每个子句是文字的析取；SAT 的标准输入。",
  },
  {
    term: "DPLL",
    en: "Davis–Putnam–Logemann–Loveland",
    topic: "sat-smt-proof",
    def: "单元传播 + 分支 + 回溯的完备搜索；现代 CDCL 的祖先。",
  },
  {
    term: "CDCL",
    en: "Conflict-Driven Clause Learning",
    topic: "sat-smt-proof",
    def: "冲突驱动子句学习：学习冲突子句、非时序回溯、重启与活动度；现代 SAT 求解器核心。",
  },
  {
    term: "DRAT / LRAT",
    en: "DRAT / LRAT",
    topic: "sat-smt-proof",
    def: "SAT 不可满足证明的日志格式；LRAT 带 hints，便于高效独立检查。",
  },
  {
    term: "DPLL(T)",
    en: "DPLL Modulo Theories",
    topic: "sat-smt-proof",
    def: "SAT 搜索 + 理论求解器；每个理论负责一致性检查与传播，是 SMT 的核心架构。",
  },
  {
    term: "SMT-LIB",
    en: "SMT-LIB",
    topic: "sat-smt-proof",
    def: "SMT 的标准输入语言与基准库；可复现比较与工具互操作的基础。",
  },
  {
    term: "证明证书",
    en: "Proof Certificate",
    topic: "sat-smt-proof",
    def: "独立于求解器的可检查证据；UNSAT 证明、模型、插值、Alethe 等。",
  },
  {
    term: "内核",
    en: "Kernel",
    topic: "sat-smt-proof",
    def: "证明助手的可信核心；所有证明最终由它按规则检查，内核 bug 会破坏整个可信链。",
  },

  // 01 数学逻辑 · 扩充
  {
    term: "有效性",
    en: "Validity",
    topic: "mathematical-logic",
    def: "公式在所有结构/赋值下都为真；与“在某个模型中为真”不同。",
  },
  {
    term: "可满足性",
    en: "Satisfiability",
    topic: "mathematical-logic",
    def: "存在至少一个模型/赋值使公式为真；SAT 问题就是命题公式的可满足性判定。",
  },
  {
    term: "自然演绎",
    en: "Natural Deduction",
    topic: "mathematical-logic",
    def: "以引入/消去规则刻画逻辑连接词的证明系统；Curry–Howard 对应的标准载体。",
  },
  {
    term: "切割消除",
    en: "Cut Elimination",
    topic: "mathematical-logic",
    def: "相继式演算中消除切割规则的过程；得到无引理的直接证明，是证明论的核心定理。",
  },
  {
    term: "量词消去",
    en: "Quantifier Elimination",
    topic: "mathematical-logic",
    def: "把含量词的公式等价变换为无量词公式；实数闭域、Presburger 算术等理论具有此性质。",
  },
  {
    term: "力迫",
    en: "Forcing",
    topic: "mathematical-logic",
    def: "Cohen 发明的构造集合论模型的方法；通过泛型滤子添加新集合，证明独立性结果。",
  },
  {
    term: "序数",
    en: "Ordinal",
    topic: "mathematical-logic",
    def: "良序集的序型；用于超限归纳与递归，是集合论中“长度”的推广。",
  },
  {
    term: "基数",
    en: "Cardinal",
    topic: "mathematical-logic",
    def: "衡量集合大小的序数；可数、不可数、连续统基数等概念的基础。",
  },

  // 02 类型论 · 扩充
  {
    term: "简单类型 λ 演算",
    en: "Simply Typed Lambda Calculus",
    topic: "type-theory",
    def: "只含函数类型的 λ 演算；STLC 的 progress/preservation 是类型系统元定理的入门。",
  },
  {
    term: "归纳类型",
    en: "Inductive Type",
    topic: "type-theory",
    def: "由构造子生成的类型，如 Nat、List、Vec；递归器/归纳器是其消去规则。",
  },
  {
    term: "宇宙",
    en: "Universe",
    topic: "type-theory",
    def: "类型本身的类型；通过宇宙层级避免 Girard 悖论，让类型论保持一致。",
  },
  {
    term: "规范化",
    en: "Normalization",
    topic: "type-theory",
    def: "每个项都能归约到规范形式；强规范化保证类型检查与证明检查终止。",
  },
  {
    term: "Canonicity",
    en: "Canonicity",
    topic: "type-theory",
    def: "闭的规范项必须归约到构造子形式；是类型论“计算意义”的核心性质。",
  },
  {
    term: "线性类型",
    en: "Linear Type",
    topic: "type-theory",
    def: "每个值恰好使用一次的类型；用于资源管理、并发协议与量子计算。",
  },
  {
    term: "代数效应",
    en: "Algebraic Effects",
    topic: "type-theory",
    def: "把副作用抽象为可组合的操作与处理器；Koka、Unison 等语言的核心。",
  },
  {
    term: "高阶归纳类型",
    en: "Higher Inductive Type",
    topic: "type-theory",
    def: "除构造子外还带路径构造子的归纳类型；HoTT 中用来构造商、截断与基本群。",
  },

  // 03 范畴论 · 扩充
  {
    term: "态射",
    en: "Morphism",
    topic: "category-theory",
    def: "范畴中对象之间的箭头；组合与单位律是范畴公理的核心。",
  },
  {
    term: "同构",
    en: "Isomorphism",
    topic: "category-theory",
    def: "存在双向态射且复合为单位；范畴论中“相同”的最基本形式。",
  },
  {
    term: "泛性质",
    en: "Universal Property",
    topic: "category-theory",
    def: "用“对任意对象存在唯一态射”刻画构造；积、极限、自由对象都由泛性质定义。",
  },
  {
    term: "笛闭范畴",
    en: "Cartesian Closed Category",
    topic: "category-theory",
    def: "有有限积与指数对象的范畴；简单类型 λ 演算的范畴语义。",
  },
  {
    term: "丰富范畴",
    en: "Enriched Category",
    topic: "category-theory",
    def: "Hom 集替换为某个 monoidal 范畴中的对象；度量空间、2-范畴等都可这样看。",
  },
  {
    term: "高阶范畴",
    en: "Higher Category",
    topic: "category-theory",
    def: "除对象与态射外还有 2-态射、3-态射……的范畴；用于同伦论与定向类型论。",
  },
  {
    term: "字符串图",
    en: "String Diagram",
    topic: "category-theory",
    def: "monoidal 范畴中态射的图形表示；线表示对象，盒子表示态射，组合对应连线。",
  },
  {
    term: "Kan 扩展",
    en: "Kan Extension",
    topic: "category-theory",
    def: "沿函子“最佳地”扩展另一个函子；左/右 Kan 扩展统一了极限、伴随与数据库迁移。",
  },

  // 04 计算理论与复杂度 · 扩充
  {
    term: "多项式归约",
    en: "Polynomial-Time Reduction",
    topic: "computability-complexity",
    def: "用多项式时间算法把问题 A 的实例转换成 B 的实例；NP-完全性定义的核心。",
  },
  {
    term: "PSPACE",
    en: "PSPACE",
    topic: "computability-complexity",
    def: "多项式空间可解的问题类；包含 NP，典型完全问题是 QBF。",
  },
  {
    term: "BPP",
    en: "Bounded-Error Probabilistic Polynomial Time",
    topic: "computability-complexity",
    def: "允许有界错误概率的多项式时间随机算法类；随机性是否必要仍是开放问题。",
  },
  {
    term: "FPT",
    en: "Fixed-Parameter Tractable",
    topic: "computability-complexity",
    def: "运行时间为 f(k)·poly(n) 的参数化算法类；把指数爆炸限制在参数 k 上。",
  },
  {
    term: "近似算法",
    en: "Approximation Algorithm",
    topic: "computability-complexity",
    def: "在多项式时间内给出接近最优解的算法；近似比与不可近似性由 PCP 等工具研究。",
  },
  {
    term: "下界",
    en: "Lower Bound",
    topic: "computability-complexity",
    def: "证明某类问题至少需要多少资源；比上界更难，常依赖归约、对角线或通信复杂度。",
  },
  {
    term: "PCP 定理",
    en: "PCP Theorem",
    topic: "computability-complexity",
    def: "NP = PCP(log n, 1)；用常数次随机查询即可概率检查证明，推出大量不可近似性。",
  },
  {
    term: "图灵完备",
    en: "Turing Complete",
    topic: "computability-complexity",
    def: "一个计算模型能模拟任意图灵机；大多数通用编程语言、λ 演算与细胞自动机都图灵完备。",
  },

  // 05 形式化方法与验证 · 扩充
  {
    term: "安全性",
    en: "Safety",
    topic: "formal-methods",
    def: "“坏事永远不会发生”的性质；可用有限前缀反例反驳，如互斥、越界。",
  },
  {
    term: "活性",
    en: "Liveness",
    topic: "formal-methods",
    def: "“好事最终会发生”的性质；如终止、最终响应、无饥饿，通常需要公平性假设。",
  },
  {
    term: "时序逻辑",
    en: "Temporal Logic",
    topic: "formal-methods",
    def: "用 G/F/X/U 等算子描述时间性质；LTL、CTL 是模型检测的标准规格语言。",
  },
  {
    term: "状态空间爆炸",
    en: "State Explosion",
    topic: "formal-methods",
    def: "并发系统状态数随组件指数增长；模型检测的主要可扩展性障碍。",
  },
  {
    term: "最弱前置条件",
    en: "Weakest Precondition",
    topic: "formal-methods",
    def: "使程序终止并满足后置条件的最弱前置断言；WP 演算是演绎验证的核心。",
  },
  {
    term: "循环不变量",
    en: "Loop Invariant",
    topic: "formal-methods",
    def: "循环每次迭代前后都成立的断言；用于归纳证明循环正确性。",
  },
  {
    term: "符号执行",
    en: "Symbolic Execution",
    topic: "formal-methods",
    def: "用符号值而非具体输入执行程序，沿路径收集约束并交给 SMT；可生成测试或找错误。",
  },
  {
    term: "运行时验证",
    en: "Runtime Verification",
    topic: "formal-methods",
    def: "在程序运行时监控轨迹是否满足规格；比静态验证更轻量，但只覆盖实际执行路径。",
  },

  // 06 优化理论 · 扩充
  {
    term: "单纯形法",
    en: "Simplex Method",
    topic: "optimization",
    def: "沿多面体顶点移动的 LP 算法；实践中极快，最坏情况可指数时间。",
  },
  {
    term: "内点法",
    en: "Interior-Point Method",
    topic: "optimization",
    def: "在可行域内部沿中心路径迭代的算法；LP/锥规划有多项式时间保证。",
  },
  {
    term: "强对偶",
    en: "Strong Duality",
    topic: "optimization",
    def: "原问题与对偶问题最优值相等；凸问题在约束品性（如 Slater）下成立。",
  },
  {
    term: "拉格朗日函数",
    en: "Lagrangian",
    topic: "optimization",
    def: "把约束以乘子并入目标的函数；KKT 条件与对偶问题都由它导出。",
  },
  {
    term: "凸锥",
    en: "Convex Cone",
    topic: "optimization",
    def: "对非负线性组合封闭的集合；二阶锥、半正定锥是锥规划的基本构件。",
  },
  {
    term: "梯度下降",
    en: "Gradient Descent",
    topic: "optimization",
    def: "沿负梯度方向迭代的一阶方法；步长与条件数决定收敛速度。",
  },
  {
    term: "ADMM",
    en: "Alternating Direction Method of Multipliers",
    topic: "optimization",
    def: "把问题拆成可分别求解的子问题并交替更新；适合大规模、分布式与嵌入优化。",
  },
  {
    term: "全局最优",
    en: "Global Optimum",
    topic: "optimization",
    def: "在所有可行点中目标值最好的解；非凸/整数问题需要分支定界或全局证书才能确认。",
  },

  // 07 SAT / SMT / Proof Assistant · 扩充
  {
    term: "文字",
    en: "Literal",
    topic: "sat-smt-proof",
    def: "一个变量或其否定，如 x 或 ¬x；CNF 子句由文字组成。",
  },
  {
    term: "子句",
    en: "Clause",
    topic: "sat-smt-proof",
    def: "文字的析取；CNF 是子句的合取，SAT 求解器通常以子句数据库工作。",
  },
  {
    term: "单元传播",
    en: "Unit Propagation",
    topic: "sat-smt-proof",
    def: "当子句只剩一个未赋值文字时强制其赋值；CDCL 与 DPLL 的基本推理步骤。",
  },
  {
    term: "冲突分析",
    en: "Conflict Analysis",
    topic: "sat-smt-proof",
    def: "从冲突图推导学习子句并决定回溯层；CDCL 的核心。",
  },
  {
    term: "监视文字",
    en: "Watched Literals",
    topic: "sat-smt-proof",
    def: "每个子句只监视两个文字，减少传播时的检查量；现代 SAT 求解器的关键数据结构。",
  },
  {
    term: "理论求解器",
    en: "Theory Solver",
    topic: "sat-smt-proof",
    def: "负责某个背景理论（算术、位向量、数组等）的一致性检查与传播；与 SAT 搜索通过 DPLL(T) 组合。",
  },
  {
    term: "量词实例化",
    en: "Quantifier Instantiation",
    topic: "sat-smt-proof",
    def: "为全称量词选择项实例，把量化公式化为无量词公式；SMT 处理量词的主要手段之一。",
  },
  {
    term: "不可满足核心",
    en: "Unsat Core",
    topic: "sat-smt-proof",
    def: "一组导致不可满足的子集；用于调试规格、定位冲突与解释失败。",
  },

  // 08 SystemVerilog 与硬件验证
  {
    term: "RTL",
    en: "Register-Transfer Level",
    topic: "systemverilog",
    def: "用寄存器、组合逻辑与时钟描述硬件的抽象层级；SystemVerilog 的 always_ff/always_comb 是常用写法。",
  },
  {
    term: "非阻塞赋值",
    en: "Nonblocking Assignment",
    topic: "systemverilog",
    def: "时序逻辑中用 <= 赋值，使所有寄存器在同一个时钟沿后同时更新，避免仿真竞争。",
  },
  {
    term: "SVA",
    en: "SystemVerilog Assertions",
    topic: "systemverilog",
    def: "用 property/sequence 描述时序性质的断言语言；可在仿真中检查，也可交给形式化工具证明。",
  },
  {
    term: "UVM",
    en: "Universal Verification Methodology",
    topic: "systemverilog",
    def: "基于 SystemVerilog class 的分层验证方法学；用 driver、monitor、sequencer、scoreboard 组织 testbench。",
  },
  {
    term: "DUT",
    en: "Design Under Test",
    topic: "systemverilog",
    def: "被验证的设计模块；testbench 通过接口驱动 DUT、采样输出并与参考模型比较。",
  },
  {
    term: "约束随机",
    en: "Constrained Random",
    topic: "systemverilog",
    def: "用 randomize() 与 constraint 生成合法且有分布的激励，比手写定向测试更容易覆盖状态空间。",
  },
  {
    term: "功能覆盖率",
    en: "Functional Coverage",
    topic: "systemverilog",
    def: "用 covergroup/coverpoint 统计设计输入、状态与交叉组合是否被测试到，回答“测到了没有”。",
  },
  {
    term: "形式化属性验证",
    en: "Formal Property Verification",
    topic: "systemverilog",
    def: "把 RTL 与 SVA 转成状态迁移系统/逻辑公式，证明所有合法行为都满足性质；失败时给出反例。",
  },
];
