-- Lean 4 starter: a tiny propositional formula language.
-- No Mathlib required. Build with `lean lean_basics.lean` or put it in a Lake project.

namespace LCF

inductive Formula where
  | atom : String → Formula
  | falsum : Formula
  | imp : Formula → Formula → Formula
  deriving Repr, DecidableEq

namespace Formula

def not (p : Formula) : Formula :=
  .imp p .falsum

def and (p q : Formula) : Formula :=
  .not (.imp p (.not q))

def or (p q : Formula) : Formula :=
  .imp (.not p) q

def iff (p q : Formula) : Formula :=
  .and (.imp p q) (.imp q p)

end Formula

def eval (v : String → Bool) : Formula → Bool
  | .atom s => v s
  | .falsum => false
  | .imp p q => Bool.not (eval v p) || eval v q

-- These two are definitional equalities: `rfl` is enough.
theorem eval_imp (v : String → Bool) (p q : Formula) :
    eval v (.imp p q) = (Bool.not (eval v p) || eval v q) := rfl

theorem eval_not (v : String → Bool) (p : Formula) :
    eval v (.not p) = Bool.not (eval v p) := by
  simp [Formula.not, eval]

-- A tiny sanity check: P → P is true under every assignment.
example (v : String → Bool) : eval v (.imp (.atom "P") (.atom "P")) = true := by
  simp [eval]

-- Try proving this one yourself:
-- theorem eval_and (v : String → Bool) (p q : Formula) :
--     eval v (.and p q) = (eval v p && eval v q) := by
--   simp [Formula.and, Formula.not, eval]

#eval eval (fun s => s == "P") (.imp (.atom "P") (.atom "Q"))

end LCF
