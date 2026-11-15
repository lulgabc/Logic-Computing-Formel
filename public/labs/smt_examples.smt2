; SMT-LIB starter examples
; Try: cvc5 smt_examples.smt2   or   z3 smt_examples.smt2

; ------------------------------------------------------------
; 1. Equality and uninterpreted functions (QF_UF)
; ------------------------------------------------------------
(set-logic QF_UF)
(declare-sort U 0)
(declare-const a U)
(declare-const b U)
(declare-const c U)
(assert (= a b))
(assert (= b c))
(assert (not (= a c)))
(check-sat)
; expected: unsat
(reset)

; ------------------------------------------------------------
; 2. Linear integer arithmetic (QF_LIA)
; ------------------------------------------------------------
(set-logic QF_LIA)
(declare-const x Int)
(declare-const y Int)
(assert (= (+ x y) 10))
(assert (= (- x y) 2))
(check-sat)
(get-model)
; expected: sat, x = 6, y = 4
(reset)

; ------------------------------------------------------------
; 3. Bit-vectors (QF_BV): x + 1 = 0 (mod 256)
; ------------------------------------------------------------
(set-logic QF_BV)
(declare-const x (_ BitVec 8))
(assert (= (bvadd x #x01) #x00))
(check-sat)
(get-model)
; expected: sat, x = #xff
(reset)

; ------------------------------------------------------------
; 4. Arrays (QF_AUFLIA): store then select
; ------------------------------------------------------------
(set-logic QF_AUFLIA)
(declare-const a (Array Int Int))
(declare-const i Int)
(declare-const j Int)
(assert (distinct i j))
(assert (= (select (store a i 42) j) 7))
(assert (= (select a j) 7))
(check-sat)
; expected: sat
(reset)

; ------------------------------------------------------------
; 5. Unsat core demo (QF_LIA)
; ------------------------------------------------------------
(set-logic QF_LIA)
(set-option :produce-unsat-cores true)
(declare-const x Int)
(assert (! (> x 10) :named lower))
(assert (! (< x 5) :named upper))
(check-sat)
(get-unsat-core)
; expected: unsat, core contains lower and upper
