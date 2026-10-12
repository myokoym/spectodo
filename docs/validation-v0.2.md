# Spectodo v0.2 promotion validation

Date: 2026-10-12
Promotion criteria: (1) no unresolved normative contradiction; (2) root self-inventory conforms; (3) single scope, nested scope, no-code, legacy migration and negative fixtures pass; (4) migration ledger covers all pre-existing records; (5) README, Agent Skills, adoption guide and examples point to the same release-candidate policy; after promotion, current stable policy.

## Review evidence

- v0.1: original 40 items, 8 constraints, 3 target-version declarations. All 48 records and all version declarations have explicit dispositions in docs/spectodo-migration-ledger.md.
- v0.2: Scope heading added at root; old IDs and meaning remain; 4 new BOOT requirements track rollout gates. No second canonical root inventory.
- Formal validation: scripts/validate-v0.2.mjs performs structural shape, canonical path, IDs, checkbox, scope root, axis order, gaps, escapes, and optional reference-path checks, plus route uniqueness/coverage. It is a development-only tool and is not mandatory for ordinary Spectodo operation.
- Fixture coverage: tests/v0.2.test.mjs includes planning-only, future implementation, single and nested routes, invalid duplicated/missing route, invalid checkbox and gap, allowed escapes, unchanged v0.1 line preservation, scope examples, and repeat read/audit.

## Observed checks

The first GitHub Actions run (https://github.com/myokoym/spectodo/actions/runs/38238911641) completed successfully: Node.js tests 12 passed in the first run, 0 failed, and the job conclusion was success. The initial V8 in-session structural checker produced no errors for the migrated root inventory, root/nested two-scope routing, or positive no-code fixtures. It correctly detected intentionally malformed checkbox and gap cases. The corresponding dependency-free Node test suite is committed for CI. A second CI run after the final revisions is required to confirm the final head.

## Remaining acceptance gaps

A semantic, end-to-end exercise of the kickoff Skill on three REAL target repositories (planning-only, coded, existing-v0.1), including install, second-run diff, incremental update and audit, has not yet been performed. Structural synthetic examples do NOT establish that the Skill read every source or avoided factual omissions in an actual repository. Until those exercises are done, universal adoption readiness and idempotence across real projects remain unverified. Do not misreport scenario unit tests as live agent E2E.

## Release decision

**NOT PROMOTED.** The v0.2 language and common kickoff remain a release candidate: unit/structural checks do not prove real-source fidelity, complete coverage, repeatable onboarding, and live idempotence. Promotion requires the real-repository end-to-end gates below. Existing v0.1 stable remains unchanged; BOOT items with outstanding evidence remain incomplete.


## Required live acceptance matrix (all pending)

| Target fixture or repository | Initial kickoff | Second execution (no-change diff) | Evidence-driven update | Full scope/duplicate/reference audit | Result |
|---|---|---|---|---|---|
| Real planning-only repository | not run | not run | not run | not run | BLOCKED |
| Real repository containing code/tests/config | not run | not run | not run | not run | BLOCKED |
| Real existing v0.1 repository | not run as external consumer | not run | not run | not run | BLOCKED |

The Spectodo repository itself supplies an actual v0.1-to-v0.2 migration ledger, but this is not independent proof that the common kickoff Skill succeeds on a different v0.1 consumer. For each acceptance case, capture before/after tree, source census, scope route map, count/ID diff, validation result, all files touched, and a second-run clean diff. To count as passed, the next update must change only evidenced records and preserve unrelated state. Any missing evidence or wrong route is a failed acceptance case, not a harmless uncertainty.

The automated tests are development-only structural tests, not an autonomous agent execution harness. Passing them does not discharge the live acceptance matrix.
