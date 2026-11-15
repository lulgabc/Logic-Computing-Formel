---- MODULE Counter ----
EXTENDS Naturals

VARIABLES count

Init == count = 0

Next == count' = count + 1

Spec == Init /\ [][Next]_count

Invariant == count >= 0

\* TLC can check that the invariant holds in every reachable state.
THEOREM Spec => []Invariant
====
