# Tiny Stack VM — golfed, in-repo

[![badge](https://make.fun/badge/tiny-stack-vm-01-run-20261122.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122)
[![rank](https://make.fun/badge/tiny-stack-vm-01-run-20261122/Hendricontrex/tiny-stack-vm-01-run-20261122-v3/rank.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122)
[![reward](https://make.fun/badge/tiny-stack-vm-01-run-20261122/Hendricontrex/tiny-stack-vm-01-run-20261122-v3/reward.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122)

A tiny stack VM for [make.fun's tiny-stack-vm-01-run-20261122 bounty](https://make.fun/bounty/tiny-stack-vm-01-run-20261122): 32-bit wrapping ints, 256-value stack, 64-deep call stack, 256 words of memory, all ten traps, the 1,000,000-step and 65,536-byte limits.

`main.ts` is the whole VM in one golfed file: a packed 84-byte opcode table (immediate length, pops, pushes per opcode) drives the fetch/check loop, one switch implements every instruction. The program runs entirely from the repository — no environment secret holds code.

Verified: `grade-local` 1,000,000 (40/40) on practice, L1 regrade byte-identical; fuzzed vs the kit reference VM (1,575 cases, 0 mismatches), incl. INT_MIN/-1 div+mod, shifts >= 32, PUSH8 sign extension, EXIT -1 -> 255, call depth 64/65, LOAD/STORE edges, truncated immediates, unknown opcodes, step/output-limit traps.
