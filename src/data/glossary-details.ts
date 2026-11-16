export interface GlossaryDetail {
  detail: string;
  example: string;
  formula?: string;
}

export const glossaryDetails: Record<string, GlossaryDetail> = {
  // 01 数学逻辑
  "可靠性": {
    detail: "可靠性连接“可证”与“为真”：它保证证明系统不会从真前提推出假结论。注意它只排除了“证明出假命题”，并不保证所有真命题都能被证明；后者是完备性。",
    example: "命题逻辑的自然演绎中，若 ⊢ P→P，则任意赋值下 P→P 都为真；不会出现“证明了 P→P 却发现 P=true、Q=false 时它为假”的情况。",
    formula: "若 Γ ⊢ φ，则 Γ ⊨ φ",
  },
  "完备性": {
    detail: "完备性是可靠性的反向保证：所有语义上有效的公式都存在形式证明。这里的“逻辑完备性”指一阶逻辑的有效性，不等于“每个具体理论都完备”；后者指每个句子或其否定可证。",
    example: "一阶逻辑有 Gödel 完备性定理；但 Peano 算术（PA）并不完备，存在既不可证也不可反驳的算术句子。",
    formula: "若 Γ ⊨ φ，则 Γ ⊢ φ",
  },
  "紧致性": {
    detail: "紧致性把“局部可满足”提升为“整体可满足”：如果理论的每个有限子集都有模型，那么整个理论也有模型。它常用来构造非标准模型，或证明某个理论不能被有限公理化。",
    example: "给算术加入常数 c 与公理 c>0、c>1、c>2……每个有限子集都可在标准自然数中满足，因此整个理论有包含“无穷大”元素的非标准模型。",
    formula: "∀ 有限 Γ₀⊆Γ，Γ₀ 可满足 ⇒ Γ 可满足",
  },
  "不完备定理": {
    detail: "Gödel 第一不完备定理说：足够强、可递归公理化且一致的算术理论中，存在既不可证也不可反驳的句子。它不是说“数学不可靠”，而是说形式系统无法穷尽算术真理；第二定理进一步说这样的理论不能证明自身一致性。",
    example: "PA 中可以构造 Gödel 句 G，G 在标准模型中为真，但 PA 既不能证明 G，也不能证明 ¬G（在 PA 一致的前提下）。",
    formula: "G ↔ ¬Prov(⌜G⌝)",
  },
  "可判定性": {
    detail: "可判定性问的是：是否存在一个算法，对问题类的任意实例都在有限步内回答是/否。它针对整个问题类，而不是单个实例；一阶逻辑的有效性不可判定，但命题逻辑、Presburger 算术等片段可判定。",
    example: "Presburger 算术（只含加法）可判定；一般一阶逻辑的有效性不可判定；SAT 可判定但通常是 NP-完全的。",
    formula: "∃ 算法 A，∀ 输入 x，A(x) 停机并输出正确布尔值",
  },
  "模型": {
    detail: "模型是语义侧的对象：一个结构加上对函数、关系与常量的解释，使公式获得真值。语法侧关心“能否证明”，语义侧关心“在哪些结构中为真”；可靠性/完备性正是连接两侧的桥。",
    example: "N=(ℕ,0,S,+,·) 是 PA 的标准模型；紧致性还能构造出包含非标准元素的模型。",
    formula: "M = (|M|, f^M, R^M, c^M)，M ⊨ φ",
  },
  "归约": {
    detail: "归约把问题 A 的实例转换成问题 B 的实例，并保持答案一致，从而把 B 的算法或困难性转移给 A。方向很重要：A ≤ B 表示 A 不比 B 难；NP-完全性证明通常把已知难题归约到新问题。",
    example: "3-SAT → CLIQUE：由每个子句构造一个三角形，冲突文字之间连边；公式可满足当且仅当图有大小为子句数的团。",
    formula: "x∈A ⇔ f(x)∈B",
  },
  "语法与语义": {
    detail: "语法只关心符号如何组成合式公式，语义关心公式在结构/赋值下是否为真。可靠性（可证⇒真）与完备性（真⇒可证）把两者连接起来；把“可证”和“真”混为一谈，是不完备性讨论中最常见的错误。",
    example: "P∧Q 在语法上是一个合式公式；在 P=true、Q=false 的赋值下语义为假，但这并不影响它作为符号串的合法性。",
    formula: "⊢（语法可证） vs ⊨（语义为真）",
  },
  "有效性": {
    detail: "有效（valid）指公式在所有结构、所有赋值下都为真，即逻辑真理。有效性强于“在某个模型中为真”；SAT 问的是是否存在模型，而不是是否在所有模型中为真。",
    example: "P∨¬P 有效；P→Q 不是有效公式，因为 P=true、Q=false 时它为假。",
    formula: "⊨ φ ⇔ 对所有模型 M，M ⊨ φ",
  },
  "可满足性": {
    detail: "可满足指至少存在一个模型/赋值使公式为真；不可满足（UNSAT）表示不存在任何模型。SAT 求解器判定命题公式的可满足性，SMT 把它扩展到带背景理论的公式。",
    example: "P∧¬P 不可满足；P∧Q 在 P=Q=true 时可满足；SAT 求解器对前者应输出 UNSAT。",
    formula: "∃ M，M ⊨ φ",
  },
  "自然演绎": {
    detail: "自然演绎用引入规则和消去规则刻画每个连接词：要证 A→B，就假设 A 并推出 B；要使用 A→B，就用 A 推出 B。证明是一棵带假设的树，假设在相应规则处被解除。",
    example: "证明 P→P：假设 P，直接得到 P，再用 →I 解除假设，得到 P→P。",
    formula: "[P] ⋮ Q / P→Q  (→I)",
  },
  "切割消除": {
    detail: "切割规则允许先证 A、再用 A 证结论，相当于引用引理。切割消除定理说可以消去所有 cut，得到只从子公式出发的直接证明。它保证证明的解析性，但消除后证明可能指数变长。",
    example: "若先证“所有素数都……”再引用它证某个数论结论，cut 消除会把该引理的证明展开到最终证明中。",
    formula: "Γ⊢Δ,A    A,Π⊢Λ / Γ,Π⊢Δ,Λ  → 可消除",
  },
  "量词消去": {
    detail: "量词消去把含量词的公式等价变换为无量词公式，从而把判定问题化为代数/线性条件。并非所有理论都有 QE；实数闭域（RCF）和 Presburger 算术是经典例子。",
    example: "在实数闭域中，∃x (ax²+bx+c=0) 可化为 a≠0∧b²−4ac≥0 或 a=0∧b≠0 等无量词条件。",
    formula: "φ(x) ↔ ψ(x)，ψ 无量词",
  },
  "力迫": {
    detail: "力迫从旧模型 M 出发，选一个偏序（力迫概念）和 M-泛型滤子 G，构造扩张 M[G]。它添加新集合但保持 ZFC 公理，是证明连续统假设等命题独立性的标准工具。",
    example: "Cohen 力迫添加 ℵ₂ 个新实数，使 CH 在扩张模型中为假，从而证明 CH 不能由 ZFC 推出。",
    formula: "G 为 M-泛型，M[G] ⊨ ZFC",
  },
  "序数": {
    detail: "序数是良序集的序型，按 ∈ 良序排列；每个良序集同构于唯一序数。它们支持超限归纳与超限递归，是集合论中“长度”的推广。",
    example: "0,1,2,…,ω,ω+1,…；ω 是自然数集 {0,1,2,…} 的序型。",
    formula: "α 为序数 ⇔ α 传递且 ∈ 在 α 上良序",
  },
  "基数": {
    detail: "基数衡量集合的大小，不关心顺序；两个集合等势当且仅当存在双射。有限基数就是自然数，无限基数用 ℵ 表示；连续统基数是 2^{ℵ₀}。",
    example: "自然数集与整数集等势，基数都是 ℵ₀；实数集的基数是 2^{ℵ₀}，严格大于 ℵ₀。",
    formula: "|A|=|B| ⇔ ∃ 双射 A→B",
  },

  // 02 类型论
  "Curry–Howard 对应": {
    detail: "Curry–Howard 把逻辑与计算对应起来：命题是类型，证明是项，证明归约是程序计算。它解释了为什么依赖类型证明助手既能检查证明，又能把证明提取成程序。",
    example: "命题 P→P 对应类型 A→A，证明是恒等函数 λx.x；对证明做 β-归约，对应程序执行。",
    formula: "命题 ≅ 类型，证明 ≅ 程序",
  },
  "依赖类型": {
    detail: "依赖类型允许类型依赖值，而不仅是依赖其他类型。这样可以把“长度”“维度”“状态”等运行时信息写进类型，让编译器检查更强的不变量。",
    example: "Vec 3 Nat 与 Vec 4 Nat 是不同类型；append : Vec m A → Vec n A → Vec (m+n) A 在类型中保证长度相加。",
    formula: "Vec : Nat → Type → Type",
  },
  "Π 类型": {
    detail: "Π 类型是依赖函数类型：对每个 a:A，返回类型 B(a)。它对应全称量词；构造一个 Π 类型的项，就是给出一个对所有输入都成立的函数。",
    example: "Π n:Nat, Vec n A → Vec n A 表示“对任意长度 n，向量映射回同长度向量”的函数。",
    formula: "Π x:A. B(x)",
  },
  "Σ 类型": {
    detail: "Σ 类型是依赖对类型：元素是 (a,b)，其中 b 的类型依赖 a。它对应存在量词；fst 取出见证 a，snd 取出依赖 a 的证据 b。",
    example: "Σ n:Nat, Vec n A 表示“存在某个长度 n 的向量”；要构造它，必须同时给出 n 和该长度的向量。",
    formula: "Σ x:A. B(x)",
  },
  "定义相等": {
    detail: "定义相等由归约规则直接决定，类型检查器可以计算判断，不需要额外证明。它和命题相等不同：后者是类型 a=b 的元素，通常需要构造证明。",
    example: "(λx.x) 3 与 3 定义相等；在 Nat 上，n+0 与 n 是否定义相等取决于加法的定义，通常需要归纳证明而不是 rfl。",
    formula: "t ≡ u（由 β/δ/ι 归约决定）",
  },
  "命题相等": {
    detail: "命题相等是类型 a=b 的元素：它把“a 与 b 相等”作为需要证明的命题。在 HoTT 中，a=b 被解释为从 a 到 b 的路径，可以沿路径 transport 性质。",
    example: "证明 m+n=n+m 需要对 n 归纳；得到证明 p : m+n=n+m 后，可以用 p 重写类型，而 rfl 通常不能直接关闭它。",
    formula: "p : a = b",
  },
  "Univalence": {
    detail: "Univalence 公理说类型等价可以视为类型相等：若 A≃B，则 A=B。它把数学中“同构即相同”的工作方式内化，使沿等价 transport 性质成为合法操作。",
    example: "Bool≃Bool 的交换等价经 ua 得到路径 Bool=Bool；沿该路径 transport 一个结构，会得到同构的结构。",
    formula: "ua : (A ≃ B) → A = B",
  },
  "立方类型论": {
    detail: "立方类型论用区间变量和立方体模型给路径、transport 与 univalence 计算解释。与把 univalence 当公理不同，Cubical Agda 中的 ua 会参与归约，因此可以计算。",
    example: "在 Cubical Agda 中，transport (ua e) x 会按等价 e 计算，而不是 stuck 在一个不可归约的公理上。",
    formula: "I 为区间，Path A x y，ua 可计算",
  },
  "简单类型 λ 演算": {
    detail: "STLC 只有函数类型与 λ 抽象/应用，类型检查可判定。它的 progress（闭的良类型非值项可继续归约）与 preservation（归约保持类型）是类型系统安全性的原型定理。",
    example: "λx:Bool. x : Bool→Bool；(λx:Bool. x) true 可以归约到 true，且类型保持 Bool。",
    formula: "Γ ⊢ λx:A.t : A→B",
  },
  "归纳类型": {
    detail: "归纳类型由构造子生成，消去规则给出递归/归纳原理。它把“有限生成的结构”编码进类型，例如自然数、列表、树。",
    example: "Nat := zero | succ Nat；List A := nil | cons A (List A)；对 Nat 的消去就是数学归纳法。",
    formula: "Nat-elim : P 0 → (∀n, P n → P (S n)) → ∀n, P n",
  },
  "宇宙": {
    detail: "宇宙是“类型的类型”。如果允许 Type:Type，就会产生 Girard 悖论；因此类型论使用层级：Type₀ : Type₁ : Type₂……，每个类型属于某个更高的宇宙。",
    example: "Nat : Type₀，Type₀ : Type₁；Lean 中写作 Type、Type 1 等。",
    formula: "Type_i : Type_{i+1}",
  },
  "规范化": {
    detail: "规范化说项可以归约到规范形式；强规范化进一步保证所有归约序列都终止。它让类型检查与证明检查可以靠计算完成，是证明助手可信内核的基础性质之一。",
    example: "STLC 中 (λx.x) y 规范化为 y；在强规范化系统中，不会出现无限 β-归约链。",
    formula: "t ↝* v，且 v 为规范形式",
  },
  "Canonicity": {
    detail: "Canonicity 说闭的规范项必须是构造子形式，而不是 stuck 的计算。它保证类型论中的“证明”确实构造了对象，而不是仅仅通过类型检查的空壳。",
    example: "闭的 Nat 规范项必须是 zero 或 succ n；不能是一个等待未知变量的 stuck 项。",
    formula: "⊢ t : Nat ⇒ t ↝* zero 或 succ n",
  },
  "线性类型": {
    detail: "线性类型要求值恰好使用一次，禁止随意复制或丢弃。它适合表达文件句柄、内存、通信协议等资源；线性逻辑的 ⊸ 是线性函数类型。",
    example: "文件句柄类型 File ⊸ Unit 强制每个句柄恰好关闭一次；复制句柄或忘记关闭都无法通过类型检查。",
    formula: "A ⊸ B",
  },
  "代数效应": {
    detail: "代数效应把副作用抽象为操作（如 ask、raise、yield）与处理器（handler）。程序只声明“我要做什么”，由 handler 决定如何解释，从而把状态、异常、并发等统一起来。",
    example: "try { raise E } with raise e => default：raise 是操作，with 是 handler，决定异常如何被处理。",
    formula: "handler : (操作 → 结果) → 计算",
  },
  "高阶归纳类型": {
    detail: "高阶归纳类型除了点构造子，还允许路径构造子，用来直接构造商、截断与基本群。Cubical Agda 原生支持 HIT，因此可以计算这些路径。",
    example: "区间 I 有点构造子 0、1 和路径 0=1；圆 S¹ 有 base 与 loop : base=base。",
    formula: "S¹ := base | loop : base = base",
  },

  // 03 范畴论
  "范畴": {
    detail: "范畴由对象、态射、组合与单位组成，满足结合律和单位律。它刻意忽略对象的内部元素，只保留“谁可以映射到谁、如何组合”的结构。",
    example: "Set：对象是集合，态射是函数；Grp：对象是群，态射是同态；Pos：对象是偏序集，态射是单调映射。",
    formula: "Hom(A,B)×Hom(B,C) → Hom(A,C)",
  },
  "函子": {
    detail: "函子把范畴映射到范畴，同时保持对象、态射、组合与单位。协变函子保持箭头方向，逆变函子反转箭头；Haskell 的 Functor 是类型范畴上的自函子。",
    example: "幂集函子 P:Set→Set 把集合 A 映到 P(A)，把 f:A→B 映到 U↦f(U)。",
    formula: "F(g∘f)=F(g)∘F(f)，F(id)=id",
  },
  "自然变换": {
    detail: "自然变换是两个函子之间的态射族，使每个自然性方块交换。它比较的不是对象，而是“两个结构保持映射之间的一致转换”。",
    example: "List→Maybe 的自然变换：[]↦Nothing，x:xs↦Just x；对任意 f，先 map 再转换与先转换再 map 结果一致。",
    formula: "η_B∘F(f)=G(f)∘η_A",
  },
  "Yoneda 引理": {
    detail: "Yoneda 引理说，从 Hom(-,A) 到任意函子 F 的自然变换由 F(A) 的一个元素唯一决定。推论是：若 Hom(-,A)≅Hom(-,B)，则 A≅B；对象由它与其他对象的关系决定。",
    example: "在 Set 中，元素 x:A 对应自然变换 Hom(-,A)→Id，把 f 送到 f(x)；取 id_A 就得到 x。",
    formula: "Nat(Hom(-,A),F) ≅ F(A)",
  },
  "极限 / 余极限": {
    detail: "极限用泛性质统一积、拉回、终端对象等构造；余极限对偶地统一余积、推出、初始对象。它们把“组合信息”变成交换图与唯一态射。",
    example: "Set 中积 A×B 是极限；不交并 A⊔B 是余极限；拉回对应纤维积。",
    formula: "lim F，colim F",
  },
  "伴随": {
    detail: "伴随 F⊣G 表示 Hom(F A,B)≅Hom(A,G B)，自然地在 A、B 上成立。它统一自由构造与遗忘构造，单位 η:Id→GF、余单位 ε:FG→Id 满足三角恒等式。",
    example: "自由群函子 F:Set→Grp 左伴随遗忘函子 U:Grp→Set：给出集合到群的同态，等价于给出集合到其底层集的对。",
    formula: "Hom(F A,B) ≅ Hom(A,G B)",
  },
  "Monad": {
    detail: "Monad 是自函子 T 加上 unit η:Id→T 与 multiplication μ:T²→T，满足结合律与单位律。它抽象“带上下文/效应的计算”；Haskell 的 IO 只是其中一个实例。",
    example: "Maybe monad：η=Just，μ=flatten；用 >>= 串联可能失败的计算，遇到 Nothing 自动短路。",
    formula: "η:Id⇒T，μ:T²⇒T，μ∘Tμ=μ∘μT",
  },
  "Topos": {
    detail: "Topos 是行为像 Set 的范畴：有有限极限、指数对象与子对象分类器 Ω。它的内部逻辑通常是直觉主义的，因此可作为构造性数学与 sheaf 理论的语义。",
    example: "Set 是 topos；拓扑空间 X 上的 sheaf 范畴 Sh(X) 也是 topos；子对象分类器对应开集。",
    formula: "Ω 子对象分类器，true:1→Ω",
  },
  "态射": {
    detail: "态射是范畴中对象之间的箭头，是范畴论的基本元素。不同范畴的态射可以是函数、关系、证明、进程或迁移；范畴论只要求它们可组合并满足单位/结合律。",
    example: "Set 中态射是函数；Pos 中是单调函数；Proof 范畴中命题是对象，证明是态射。",
    formula: "f:A→B",
  },
  "同构": {
    detail: "同构是存在逆态射的态射：f:A→B 与 g:B→A 满足 g∘f=id_A、f∘g=id_B。它是范畴论中最基本的“相同”概念；比集合双射更一般。",
    example: "Set 中同构是双射；Grp 中是群同构；Haskell 中 Iso 表示可逆转换。",
    formula: "f:A≅B ⇔ ∃g, g∘f=id_A 且 f∘g=id_B",
  },
  "泛性质": {
    detail: "泛性质用“对任意对象，存在唯一态射”来刻画构造，而不是给出具体元素。满足同一泛性质的构造在同构意义下唯一，这是范畴论定义对象的标准方式。",
    example: "积 A×B 满足：对任意 C 与 f:C→A、g:C→B，存在唯一 h:C→A×B 使两个投影分别等于 f、g。",
    formula: "∀C, Hom(C,A×B) ≅ Hom(C,A)×Hom(C,B)",
  },
  "笛闭范畴": {
    detail: "笛闭范畴有有限积与指数对象：Hom(A×B,C)≅Hom(A,C^B)。它是简单类型 λ 演算的范畴语义，指数对象 C^B 对应函数类型 B→C。",
    example: "Set 是 CCC；Haskell 的类型与函数构成的范畴近似 CCC（忽略底与递归带来的问题）。",
    formula: "Hom(A×B,C) ≅ Hom(A,C^B)",
  },
  "丰富范畴": {
    detail: "丰富范畴把 Hom 集替换为某个 monoidal 范畴 V 中的对象，普通范畴是 V=Set 的特例。它允许“态射之间还有结构”，例如 2-范畴或度量空间。",
    example: "2-范畴可视为 Cat-丰富；度量空间可视为 ℝ≥0-丰富，Hom(x,y) 是距离。",
    formula: "Hom(A,B) ∈ V",
  },
  "高阶范畴": {
    detail: "高阶范畴除了对象与 1-态射，还有 2-态射、3-态射……以及越来越复杂的 coherence 条件。它是同伦论、代数拓扑与定向类型论的共同语言。",
    example: "2-范畴有态射之间的 2-态射；∞-范畴有任意阶态射，用于描述同伦型。",
    formula: "C₀, C₁, C₂, … + coherence",
  },
  "字符串图": {
    detail: "字符串图是 monoidal 范畴的图形演算：线表示对象，盒子表示态射，连线表示组合，交换/辫子结构对应线的交叉。它让复杂组合推理变成二维图形重写。",
    example: "f:A→B、g:B→C 画成两个盒子用线连接，整体就是 g∘f:A→C；张量积则把图并排。",
    formula: "A --f--> B --g--> C",
  },
  "Kan 扩展": {
    detail: "Kan 扩展是沿函子 F 对 G 做“最佳可能”的扩展：左 Kan 扩展是带自然变换的普遍构造，右 Kan 扩展对偶。它统一了极限、伴随、数据库迁移等构造。",
    example: "数据库 schema 迁移常用左 Kan 扩展把实例沿 functor 推过去；右 Kan 扩展给出限制/拉回。",
    formula: "Lan_F G，Ran_F G",
  },

  // 04 计算理论与复杂度
  "图灵机": {
    detail: "图灵机由有限状态控制、无限纸带和读写头组成；每一步根据当前状态与符号改写纸带并移动。它是可计算性与复杂度类的标准模型，多带/单带只差多项式开销。",
    example: "识别 {0ⁿ1ⁿ} 的图灵机：反复划掉一个 0 和一个 1，最后检查是否同时耗尽；时间 O(n)，空间 O(n)。",
    formula: "δ: Q×Γ → Q×Γ×{L,R}",
  },
  "可计算性": {
    detail: "可计算性研究“是否存在算法在有限步内给出答案”。图灵机、λ 演算、递归函数、寄存器机等模型给出同一个可计算性概念，这就是 Church–Turing 论题的经验内容。",
    example: "素数判定可计算；停机问题不可计算；两者的区别不是“难不难”，而是“是否存在通用算法”。",
    formula: "f 可计算 ⇔ 存在图灵机计算 f",
  },
  "停机问题": {
    detail: "停机问题问：给定程序 M 与输入 w，M 是否最终停机？不存在对所有输入都正确的判定算法。证明用对角线：假设有判定器 H，构造在 H 说“停机”时故意循环的程序，产生矛盾。",
    example: "若 H(P,x) 判定 P 在 x 上停机，构造 Q：若 H(Q,Q) 返回 true 则循环，否则停机；H(Q,Q) 两种答案都矛盾。",
    formula: "HALT = {⟨M,w⟩ | M 在 w 上停机} 不可判定",
  },
  "P / NP": {
    detail: "P 是多项式时间可解的问题类；NP 是解可在多项式时间验证的问题类（等价于非确定图灵机多项式时间）。P=NP 是否成立未知；若成立，密码学、优化与 AI 的许多困难假设会崩塌。",
    example: "排序在 P；SAT 在 NP，是否在 P 未知；若 P=NP，则 SAT 有多项式时间算法。",
    formula: "P ⊆ NP",
  },
  "NP-完全": {
    detail: "NP-完全问题是 NP 中最难的一类：它属于 NP，且所有 NP 问题都能多项式归约到它。只要有一个 NP-完全问题有多项式算法，就有 P=NP。",
    example: "3-SAT、CLIQUE、VERTEX-COVER、HAMILTON 回路都是 NP-完全的。",
    formula: "∀A∈NP，A ≤p L，且 L∈NP",
  },
  "电路复杂度": {
    detail: "电路复杂度用门电路的大小/深度衡量计算，是非uniform 模型：每个输入长度可以有不同电路。它连接算法下界、并行复杂度与 P vs NP；SAT 是否有多项式大小电路是核心开放问题。",
    example: "n 位加法有多项式大小、O(log n) 深度电路；是否存在 SAT 的多项式大小电路未知。",
    formula: "C_n 计算 f_n，size(C_n)",
  },
  "细粒度复杂度": {
    detail: "细粒度复杂度在 SETH/ETH 等假设下给出精确指数下界，而不只是 P/NP 二分。它解释为什么很多已知多项式算法可能已经接近最优。",
    example: "SETH 推出（在特定模型下）编辑距离需要 n^{2−o(1)} 时间；3SUM 推出许多几何问题的二次下界。",
    formula: "SETH：∀ε>0，k-SAT 需 2^{(1−ε)n} 时间（k 足够大）",
  },
  "证明复杂度": {
    detail: "证明复杂度研究证明系统的证明长度下界：一个定理在分辨率、Frege 等系统中最短证明有多长。它连接 SAT 求解、自动定理证明与复杂度理论；若某个证明系统对所有重言式都有多项式长度证明，就会推出 NP=coNP。",
    example: "分辨率反驳鸽巢公式需要指数长度；这解释了为什么某些 UNSAT 实例对 SAT 求解器很难。",
    formula: "proof size lower bound",
  },
  "多项式归约": {
    detail: "多项式归约用多项式时间算法把 A 的实例转成 B 的实例，并保持答案。它定义 NP-完全性：A ≤p B 表示 B 至少和 A 一样难；方向反了就会得到错误结论。",
    example: "3-SAT → CLIQUE：公式可满足当且仅当构造出的图有大小为子句数的团。",
    formula: "A ≤p B",
  },
  "PSPACE": {
    detail: "PSPACE 是多项式空间可解的问题类；它包含 NP（用多项式空间模拟 NP 的验证），也包含 coNP。QBF（量化布尔公式）是 PSPACE-完全的标准问题。",
    example: "QBF 求解、某些博弈与规划问题在 PSPACE；P=PSPACE 是否成立未知。",
    formula: "NP ⊆ PSPACE",
  },
  "BPP": {
    detail: "BPP 是有界错误概率的多项式时间随机算法类：算法以至少 2/3 概率给出正确答案，错误概率可通过重复降到指数小。随机性是否真的比确定性更强仍是开放问题。",
    example: "Miller–Rabin 素性测试是随机算法；实际中常用其确定性变体或 AKS。",
    formula: "Pr[输出正确] ≥ 2/3",
  },
  "FPT": {
    detail: "FPT 是固定参数可解：运行时间为 f(k)·poly(n)，指数只依赖参数 k 而不是输入规模 n。它把 NP-hard 问题中“可管理的部分”分离出来。",
    example: "顶点覆盖参数 k 有 O(2^k n) 算法；k 很小时可行，k 接近 n 时仍爆炸。",
    formula: "O(f(k)·n^c)",
  },
  "近似算法": {
    detail: "近似算法在多项式时间内给出接近最优的解，并用近似比 ρ 衡量：ALG ≤ ρ·OPT（最小化）。PCP 定理说明很多问题不能任意接近最优，除非 P=NP。",
    example: "顶点覆盖有 2-近似；MAX-3SAT 有 7/8-近似，且 7/8+ε 不可近似（PCP 推论）。",
    formula: "ALG ≤ ρ·OPT",
  },
  "下界": {
    detail: "下界证明问题至少需要某资源，比上界更难。常见工具包括对角线、归约、通信复杂度、电路复杂度与证明复杂度；很多自然问题的强下界仍是开放问题。",
    example: "比较排序需要 Ω(n log n) 次比较；一般电路的 SAT 下界仍未知。",
    formula: "T(n) ≥ g(n)",
  },
  "PCP 定理": {
    detail: "PCP 定理说 NP = PCP(log n, 1)：每个 NP 证明都可以改写成一种概率可检查证明，验证者只读常数个位置就能以高概率判断真假。它推出大量近似困难性结果。",
    example: "MAX-3SAT 的 7/8+ε 不可近似；顶点覆盖是 APX-hard，不能在 1.36−ε 内近似（在 P≠NP 下）。",
    formula: "NP = PCP(O(log n), O(1))",
  },
  "图灵完备": {
    detail: "一个计算模型图灵完备，指它能模拟任意图灵机。大多数通用语言、λ 演算、Rule 110 等图灵完备；有限状态机、正则表达式不是。",
    example: "Python、C、λ 演算、Rule 110 都可图灵完备；DFA 与正则表达式不是。",
    formula: "∀ 图灵机 M，模型可模拟 M",
  },

  // 05 形式化方法与验证
  "规格": {
    detail: "规格用数学语言描述系统“应该做什么”，是验证的起点。规格错误会让证明失去意义；因此写规格往往比写证明更难，需要领域专家与形式化专家共同评审。",
    example: "互斥协议规格：G ¬(crit₁ ∧ crit₂)；排序规格：输出是输入的排列且非降序。",
    formula: "Spec ⊆ Behaviors",
  },
  "不变量": {
    detail: "不变量是在系统所有可达状态中都成立的断言，是归纳证明的核心。初始状态满足 I，且每次转移保持 I，就能推出所有可达状态满足 I。",
    example: "银行账户 balance≥0；循环 0≤i≤n 且 s=sum(a[0..i])。",
    formula: "Init ⇒ I，I∧Next ⇒ I'",
  },
  "模型检测": {
    detail: "模型检测穷举有限状态空间，检查时序逻辑性质；若失败会给出反例轨迹。它的优势是全自动、反例具体，局限是状态爆炸与有限状态假设。",
    example: "SPIN 检查互斥协议的 G ¬(crit₁∧crit₂)；NuSMV 检查 CTL 性质 AG EF reset。",
    formula: "M ⊨ φ",
  },
  "抽象解释": {
    detail: "抽象解释在抽象域上计算程序行为的上近似：用区间、符号、关系等抽象值代替具体值，求不动点。它牺牲精度换可扩展性，是 Astrée/Polyspace 等工业静态分析的理论基础。",
    example: "区间抽象把 x 的可能值近似为 [0,10]；若抽象结果没有越界，则具体执行也不会越界。",
    formula: "α∘γ 单调，最小不动点",
  },
  "精化": {
    detail: "精化用更具体的模型实现抽象规格，并证明具体行为包含在抽象行为中。Event-B 的精化演算要求每个具体事件都精化某个抽象事件，并保持不变量。",
    example: "抽象事件“支付”精化为“扣款+记账+发通知”，需证明具体步骤组合仍满足抽象后置条件。",
    formula: "Conc refines Abs",
  },
  "Hoare 三元组": {
    detail: "Hoare 三元组 {P} C {Q} 表示：若前置条件 P 在初始状态成立且 C 停机，则后置条件 Q 在终止状态成立。它把程序正确性化为逻辑公式，是演绎验证的起点。",
    example: "{x=0} x:=x+1 {x=1}；{x≥0} while x>0 do x:=x−1 {x=0}。",
    formula: "{P} C {Q}",
  },
  "分离逻辑": {
    detail: "分离逻辑用 ∗ 表示堆的分离合取、↦ 表示 points-to，从而在存在别名时做局部推理。frame rule 允许只修改局部堆，是并发与 Rust 验证的重要基础。",
    example: "{x↦a ∗ y↦b} swap(x,y) {x↦b ∗ y↦a}；局部规则可扩展到任意不相交的堆。",
    formula: "{P∗Q} C {R∗Q}（frame rule）",
  },
  "证明义务": {
    detail: "证明义务是验证器从程序与规格生成的逻辑公式；若所有义务有效，程序满足规格。它们通常交给 SMT/ATP 自动证明，失败的义务会变成反例或未证明目标。",
    example: "Dafny 为循环生成“进入时 invariant 成立”和“每次迭代保持 invariant”的义务。",
    formula: "VC₁ ∧ … ∧ VCₙ",
  },
  "安全性": {
    detail: "安全性是“坏事永不发生”的性质，例如互斥、越界、空指针。它可以用有限前缀反例反驳；在时序逻辑中常写成 G¬bad。",
    example: "G ¬(crit₁∧crit₂)；G (i<n → a[i] 可读)。",
    formula: "G ¬bad",
  },
  "活性": {
    detail: "活性是“好事最终发生”的性质，例如终止、最终响应、无饥饿。仅靠有限执行无法反驳，通常需要公平性假设；时序逻辑中常写成 F good。",
    example: "G(req → F ack)；每个等待的进程最终进入临界区（在强公平下）。",
    formula: "F good",
  },
  "时序逻辑": {
    detail: "时序逻辑用 G（总是）、F（最终）、X（下一步）、U（直到）等算子描述随时间变化的行为。LTL 与 CTL 是模型检测最常用的两种时序逻辑，表达力与算法不同。",
    example: "G(req→F ack) 表示每个请求最终被确认；CTL 的 AG EF reset 表示从所有可达状态都能回到 reset。",
    formula: "G φ，F φ，X φ，φ U ψ",
  },
  "状态空间爆炸": {
    detail: "并发系统的状态数随组件数量指数增长，导致模型检测无法穷举。缓解手段包括符号化（BDD/SAT）、抽象、对称性约简、部分序约简与组合推理。",
    example: "n 个布尔变量有 2ⁿ 个状态；20 个进程的互斥协议状态数可能超过内存。",
    formula: "|S| = O(2ⁿ)",
  },
  "最弱前置条件": {
    detail: "最弱前置条件 wp(C,Q) 是使程序 C 终止并满足 Q 的最弱断言。WP 演算从后置条件反向推导前置条件，是 Hoare 逻辑与验证条件生成器的核心。",
    example: "wp(x:=x+1, x>0) = x≥0；wp(if b then C1 else C2, Q) = (b→wp(C1,Q)) ∧ (¬b→wp(C2,Q))。",
    formula: "wp(x:=e, Q) = Q[e/x]",
  },
  "循环不变量": {
    detail: "循环不变量是在进入循环与每次迭代后都成立的断言，用于证明循环正确性。它必须足够强以推出最终结果，又不能强到无法在初始化时建立。",
    example: "求和的循环：i≤n ∧ s=sum(a[0..i])；终止时 i=n，于是 s=sum(a[0..n])。",
    formula: "{I∧b} C {I} ⇒ {I} while b do C {I∧¬b}",
  },
  "符号执行": {
    detail: "符号执行用符号值代替具体输入，沿控制流路径收集路径条件，并交给 SMT 求解。它可以生成测试、发现断言失败，但路径数量可能指数爆炸。",
    example: "if x>0 then y:=x else y:=−x 生成两条路径，条件分别为 x>0 与 x≤0。",
    formula: "路径条件 PC，约束 PC ∧ ¬assert 可满足则找到反例",
  },
  "运行时验证": {
    detail: "运行时验证在程序执行时监控轨迹是否满足规格；它只覆盖实际执行路径，但部署成本低，适合生产环境与分布式系统。常见形式包括断言、监控器与日志分析。",
    example: "在线监控 G(req→F ack)：若请求后长时间没有确认，就报警并记录轨迹。",
    formula: "trace ⊨ φ",
  },

  // 06 优化理论
  "线性规划": {
    detail: "线性规划是线性目标加线性约束的优化问题；可行域是多面体。若最优解存在，必在某个顶点或面上取得，这为单纯形法与对偶理论提供了基础。",
    example: "max 3x+2y s.t. x+y≤4, x≤2, y≤3, x,y≥0，最优在 (2,2)，值 10。",
    formula: "min cᵀx  s.t. Ax≤b",
  },
  "对偶": {
    detail: "每个线性规划都有一个对偶问题：原问题最大化，对偶最小化（或反之），对偶变量可解释为约束的“影子价格”。弱对偶给下界，强对偶在可行且约束品性下保证最优值相等。",
    example: "原问题 max 3x+2y s.t. x+y≤4, x≤2, y≤3 的对偶是 min 4u+2v+3w s.t. u+v≥3, u+w≥2, u,v,w≥0。",
    formula: "max cᵀx, Ax≤b ⇔ min bᵀy, Aᵀy=c, y≥0",
  },
  "KKT 条件": {
    detail: "KKT 条件是最优性的一阶必要条件：梯度被约束梯度与乘子平衡，互补松弛要求非活跃约束的乘子为零。对凸问题且满足约束品性（如 Slater）时，它也是充分条件。",
    example: "min x² s.t. x≥1：在 x=1 处 KKT 给出 2x−λ=0、λ≥0、λ(x−1)=0，解得 λ=2。",
    formula: "∇f + Σλᵢ∇gᵢ + Σμⱼ∇hⱼ = 0，λᵢgᵢ=0，λᵢ≥0",
  },
  "凸性": {
    detail: "凸集对线段封闭，凸函数在图像下方对线段封闭。凸优化的关键性质是：任何局部最优都是全局最优；因此梯度下降、内点法等局部方法有全局保证。",
    example: "f(x)=x² 是凸函数；f(x)=x³ 不是凸函数（在 0 附近改变曲率）。",
    formula: "f(θx+(1−θ)y) ≤ θf(x)+(1−θ)f(y)",
  },
  "锥规划": {
    detail: "锥规划把 LP、QP、SOCP、SDP 统一为“线性目标 + 锥约束”。锥可以是非负象限、二阶锥、半正定锥等；内点法与一阶方法都能在这个框架下工作。",
    example: "SDP：X≽0；SOCP：‖Ax+b‖₂ ≤ cᵀx+d；LP 是非负象限锥的特例。",
    formula: "min cᵀx  s.t. Ax+b ∈ K",
  },
  "次梯度": {
    detail: "次梯度是非光滑凸函数在一点处的广义斜率：它定义了一个支撑超平面。次梯度法用任意次梯度代替梯度，简单但收敛慢；近端方法通常更有效。",
    example: "f(x)=|x| 在 x=0 的次梯度是区间 [−1,1]；在 x>0 时是 1，在 x<0 时是 −1。",
    formula: "f(y) ≥ f(x)+gᵀ(y−x)",
  },
  "分支定界": {
    detail: "分支定界用松弛问题给出下界（最小化），再对整数/非凸变量分支，剪掉不可能更优的子问题。搜索结束时，当前最好解与全局下界相等，才证明全局最优。",
    example: "MIP 中先解 LP 松弛得到下界；若某分支的松弛值已超过当前最好整数解，就剪枝。",
    formula: "global lower bound = min 各子问题松弛值",
  },
  "对偶证书": {
    detail: "对偶证书是证明最优性或不可行性的可检查证据：对偶可行解给出下界，Farkas 证书证明不可行，分支定界日志给出全局最优证明。它让 solver 的输出可审计。",
    example: "LP 中若原问题可行解 x 与对偶可行解 y 满足 cᵀx=bᵀy，则 x 是最优解，y 是对偶证书。",
    formula: "cᵀx = bᵀy",
  },
  "单纯形法": {
    detail: "单纯形法从一个基可行解出发，沿多面体边移动到相邻顶点，直到没有改进方向。它实践极快，但最坏情况可指数时间；Bland 规则可避免循环。",
    example: "Dantzig 单纯形在 x+y≤4、x≤2、y≤3 上从 (0,0) 移到 (2,0)、(2,2)，得到最优 10。",
    formula: "B⁻¹b ≥ 0，reduced cost ≥ 0",
  },
  "内点法": {
    detail: "内点法在可行域内部沿中心路径逼近最优解，而不是沿顶点移动；LP、SOCP、SDP 都有多项式时间内点算法。现代 solver 常用内点法处理高精度锥规划。",
    example: "Karmarkar 1984 的投影内点法；现代原始-对偶内点法用于 SDP 与大规模 LP。",
    formula: "中心路径：μ→0",
  },
  "强对偶": {
    detail: "强对偶指原问题与对偶问题的最优值相等。线性规划在可行时总成立；凸问题在 Slater 等约束品性下成立；非凸问题可能有对偶间隙。",
    example: "LP max 3x+2y 与对偶 min 4u+2v+3w 的最优值都为 10，强对偶成立。",
    formula: "p* = d*",
  },
  "拉格朗日函数": {
    detail: "拉格朗日函数把约束以乘子并入目标：L(x,λ,μ)=f(x)+Σλᵢgᵢ(x)+Σμⱼhⱼ(x)。KKT 条件就是对 L 求驻点并加上互补松弛。",
    example: "min x² s.t. x≥1 的 L(x,λ)=x²+λ(1−x)，对 x 求导得 2x−λ=0。",
    formula: "L(x,λ,μ)=f(x)+Σλᵢgᵢ(x)+Σμⱼhⱼ(x)",
  },
  "凸锥": {
    detail: "凸锥是对非负线性组合封闭的集合：若 x,y∈K、α,β≥0，则 αx+βy∈K。非负象限、二阶锥、半正定锥是锥规划的基本可行域。",
    example: "二阶锥 K={(x,t) | ‖x‖₂≤t}；半正定锥 K={X | X≽0}。",
    formula: "x,y∈K，α,β≥0 ⇒ αx+βy∈K",
  },
  "梯度下降": {
    detail: "梯度下降沿负梯度方向迭代，步长决定收敛；对 L-光滑凸函数，步长 1/L 可保证 O(1/k) 收敛。条件数大时收敛慢，需要加速或预处理。",
    example: "f(x)=x² 的更新 x_{k+1}=x_k−2ηx_k；η<1 时收敛，η=0.5 时一步到 0。",
    formula: "x_{k+1}=x_k−η∇f(x_k)",
  },
  "ADMM": {
    detail: "ADMM 用增广拉格朗日与交替更新求解可分离的凸问题：先更新 x，再更新 z，最后更新对偶变量 u。它适合分布式、大规模与嵌入优化，收敛速度依赖惩罚参数。",
    example: "LASSO：x-update 解带二次项的回归，z-update 做软阈值，u-update 累积对偶残差。",
    formula: "x^{k+1}, z^{k+1}, u^{k+1} 交替更新",
  },
  "全局最优": {
    detail: "全局最优是在所有可行点中目标值最好的解。非凸/整数问题中，局部最优或稳定点不等于全局最优；需要分支定界、对偶界或全局证书才能确认。",
    example: "分支定界中只有当全局下界等于当前最好解时，才能宣布全局最优；否则仍有未探索区域。",
    formula: "f(x*) ≤ f(x)  ∀x∈F",
  },

  // 07 SAT / SMT / Proof Assistant
  "CNF": {
    detail: "CNF（合取范式）是子句的合取，每个子句是文字的析取。SAT 求解器通常先把问题转换为 CNF；Tseitin 变换可多项式地把任意布尔公式转为 CNF。",
    example: "(x∨¬y) ∧ (¬x∨z) 是 CNF；它的两个子句分别要求“x 或 ¬y”和“¬x 或 z”。",
    formula: "∧ᵢ (∨ⱼ lᵢⱼ)",
  },
  "DPLL": {
    detail: "DPLL 是完备的 SAT 搜索算法：反复做单元传播与纯文字消去，然后选一个变量分支，冲突时回溯。它是现代 CDCL 求解器的祖先，但缺少学习与非时序回溯。",
    example: "对 (x∨y)∧(¬x)，单元传播得 x=false，再传播 y=true，得到模型。",
    formula: "unit propagation + branch + backtrack",
  },
  "CDCL": {
    detail: "CDCL 在 DPLL 上加入冲突分析、子句学习与非时序回溯：从冲突图学习一个新子句，跳回合适的决策层，避免重复搜索。它是现代 SAT 求解器的核心架构。",
    example: "GRASP 引入冲突学习与非时序回溯，Chaff 加入 VSIDS 活动度与 watched literals，形成现代 CDCL 的基本形态。",
    formula: "冲突 → 学习子句 C → backjump",
  },
  "DRAT / LRAT": {
    detail: "DRAT 是 SAT 不可满足证明的日志格式，记录子句添加/删除；LRAT 在其上增加 hints，便于高效独立检查。它们让 UNSAT 结果可被第三方检查器验证，而不是只信 solver。",
    example: "CaDiCaL 生成 .drat 文件，DRAT-trim 检查通过后才接受 UNSAT；LRAT 检查更快但文件更大。",
    formula: "add C / delete C",
  },
  "DPLL(T)": {
    detail: "DPLL(T) 把 SAT 搜索与理论求解器组合：SAT 层做布尔分支，理论层检查算术/数组/位向量等约束的一致性，并把冲突解释回传给 SAT 层学习。",
    example: "布尔层令 x=true,y=true；理论层发现 x+y≤1 与 x=1,y=1 冲突，返回解释，SAT 层学习 ¬x∨¬y。",
    formula: "SAT search ⇄ T-solver",
  },
  "SMT-LIB": {
    detail: "SMT-LIB 是 SMT 求解器的标准输入语言与基准库，定义了排序、逻辑、命令与模型格式。它让不同 solver 在同一组基准上可复现比较。",
    example: "(set-logic QF_LIA) (declare-const x Int) (assert (> x 0)) (check-sat) (get-model)。",
    formula: "SMT-LIB 2.6",
  },
  "证明证书": {
    detail: "证明证书是独立于求解器的可检查证据：SAT 的 UNSAT 证明、SMT 的 Alethe/LFSC、优化问题的对偶证书、proof assistant 的项。检查器只依赖证书与规则，不信任生成器。",
    example: "DRAT 文件由 DRAT-trim 检查；Lean 证明由内核检查；LP 对偶解由强对偶等式检查。",
    formula: "checker(statement, certificate)=true",
  },
  "内核": {
    detail: "内核是证明助手的可信核心：它按固定规则检查项是否具有给定类型。所有策略、自动化和 AI 生成的证明最终都要经过内核；内核 bug 会破坏整个可信链。",
    example: "Lean 内核、Rocq 内核；FLT 项目还用独立 Rust 实现 nanoda 复查。",
    formula: "Γ ⊢ t : A",
  },
  "文字": {
    detail: "文字是一个布尔变量或其否定。SAT 的 CNF 以文字为最小单位；一个文字在赋值下为真或假，子句的真值由其中文字决定。",
    example: "x 与 ¬x 是文字；(x∨¬y) 中 x、¬y 都是文字。",
    formula: "l = x 或 ¬x",
  },
  "子句": {
    detail: "子句是若干文字的析取；只要有一个文字为真，子句就为真。CNF 公式是所有子句的合取，SAT 要求同时满足每个子句。",
    example: "(x∨¬y∨z) 是子句；赋值 x=false,y=true,z=false 使它为 false。",
    formula: "C = l₁∨…∨lₖ",
  },
  "单元传播": {
    detail: "单元传播是 SAT 的基本推理：若子句只剩一个未赋值文字，其余文字都为假，则该文字必须为真。它反复进行，直到没有单元子句；冲突则回溯。",
    example: "子句 (x∨y) 且已知 x=false，则单元传播令 y=true。",
    formula: "unit clause (l) ⇒ l=true",
  },
  "冲突分析": {
    detail: "冲突分析从导致冲突的赋值与子句出发，构造 implication graph，找到一个割（如 1-UIP），学习新子句并决定回溯层。它让 CDCL 从冲突中提取有用的全局信息。",
    example: "若 x=true 与 ¬x 冲突，学习子句 ¬x；若冲突涉及多层决策，用 1-UIP 割跳回合适层。",
    formula: "resolve reasons → learned clause → backjump",
  },
  "监视文字": {
    detail: "监视文字是 CDCL 的高效实现技巧：每个子句只监视两个文字，只有当被监视文字被赋假时才检查/移动监视。它避免每次赋值扫描所有子句。",
    example: "子句 (a∨b∨c) 监视 a、b；当 a=false 时，检查 b、c，必要时把监视移到 c。",
    formula: "watch two literals per clause",
  },
  "理论求解器": {
    detail: "理论求解器负责某个背景理论的一致性：例如线性算术、位向量、数组、EUF。它接收 SAT 层的文字赋值，检查理论约束是否可满足，并产生冲突解释或模型。",
    example: "LIA 求解器收到 x=1,y=1 与 x+y≤1，检测到冲突并返回解释 ¬(x=1∧y=1)。",
    formula: "T-solver ⊢ ¬(conjunction)",
  },
  "量词实例化": {
    detail: "量词实例化用具体项替换全称量词的变量，把量化公式化为无量词公式。SMT 常用 E-matching、触发器和模型引导的实例化；不完备，但对许多程序验证问题足够。",
    example: "∀x.P(x) 与项 a 可实例化为 P(a)；触发器 P(x) 在遇到 P(a) 时触发。",
    formula: "∀x.φ(x) ⇒ φ(t)",
  },
  "不可满足核心": {
    detail: "不可满足核心（unsat core）是原约束集合的一个子集，它本身已经不可满足。它用于定位冲突、调试规格与解释失败；最小 unsat core 更难计算但更有用。",
    example: "约束 {x>10, x<5, y=0} 的 unsat core 是 {x>10, x<5}，y=0 与冲突无关。",
    formula: "C⊆F，C 不可满足",
  },
};
