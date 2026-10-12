# Spectodo v0.2 stable acceptance and residual risks

Date: 2026-10-13
Status: stable; accepted after reproducible tests and repository self-migration.

## Evidence

- Real Spectodo self-migration: legacy 40 requirements, 8 constraints, 3 target versions and original references accounted for in docs/spectodo-migration-ledger.md.
- Repository source census categorizes current, historical and legacy sources. A CI test enforces that all tracked paths appear in the index.
- tests/v0.2.test.mjs validates grammar, paths, status derivation, references, duplicate routes and legacy conversion.
- scripts/kickoff-v0.2.mjs is an actual reusable implementation for safe canonical placement, route update, source census, migration ledger and item reconciliation. It is OPTIONAL, not a mandatory CLI.
- tests/kickoff-e2e.test.mjs invokes that actual module on isolated documentation-only, coded/multiple-scope, and v0.1 repositories. Each executes adopt/migrate, unchanged rerun, evidence-driven change and structural audit.
- The coded scenario runs a real Node test, injects a regression, observes test failure, then reopens only the affected specification ID.
- The planning-only scenario adds a new document, verifies the source index updates without resetting statuses, then verifies a no-change rerun.
- tests/kickoff-core.test.mjs rejects missing references, duplicated routes, unauthorized migration, stale item edits, blind overwrite and routing marker collisions before canonical file changes. Human-curated source authority notes survive index refresh.
- GitHub Actions runs these tests on the PR. Stable promotion requires a successful CI result on the final commit; see PR #4 checks for the authoritative count.

## Formalization decision

All requested format/lifecycle categories have executable verification: no code, code, multiple scopes, existing v0.1, initial adoption, idempotent rerun, update and audit. The central format decision is stable v0.2 for new adopters; existing v0.1 remains valid until explicitly migrated. Individual projects never select a Spectodo Language version based on their phase or code.

## Residual limitations and responsibilities

- The helper and unit tests DO NOT prove a future agent will semantically classify every external source correctly. The Agent Skill must perform evidence/authority/duplicate/coverage review within each adopting repository.
- External private repositories were inspected read-only, not modified. No real cross-repository Agent Skill pilot is claimed; additional external pilots are useful post-release regression coverage, not a prerequisite invented after the original request.
- Ambiguous source authority, scope ownership, routing, references or item identity must stop destructive changes and be reported.
- Human on-device inspection of v0.2 rendered Markdown was not independently rerun; prior v0.1 inspection guidance is retained.
- This acceptance covers the stable shared format and supporting operations, not perfect automatic requirement extraction on every unknown codebase.
