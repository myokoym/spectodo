# Spectodo repository source inventory

Date: 2026-10-12
Status: repository-wide path census. This index is supporting evidence, not a canonical Spectodo inventory.

Scope: root SPECTODO.md (SPECTODO). No independent product/workspace scopes were found in this repository. Historical research and sample inventories are not canonical. The current repository uses documentation and a development-only test harness; there is no application/runtime source tree. Scope routing is defined in AGENTS.md.

## File-by-file authority and traceability

| Path | Authority / role | Direct inventory references |
|---|---|---|
| .agents/skills/spectodo-kickoff/SKILL.md | current guidance/policy | BOOT-002, BOOT-003 |
| .agents/skills/spectodo/SKILL.md | current guidance/policy | LANG-015, AGENT-001, AGENT-002, AGENT-003, AGENT-004, AGENT-005, AGENT-006, AGENT-007, AGENT-008, AGENT-009, AGENT-010, AGENT-011 |
| .github/workflows/spec-validation.yml | verification machinery | supporting / no direct link |
| AGENTS.md | current guidance/policy | BOOT-003 |
| README.md | current guidance/policy | AGENT-001, DOCS-001, DOCS-004 |
| SPECTODO.md | canonical scoped inventory | CORE-005, AGENT-002, AGENT-003, AGENT-008, AGENT-009, VALID-002, VALID-005 |
| docs/adoption.md | current guidance/policy | AGENT-010, DOCS-004, REL-002, BOOT-001 |
| docs/migration-v0.1-to-v0.2.md | current guidance/policy | BOOT-004 |
| docs/v0.2-stable-decision.md | current guidance/policy | supporting / no direct link |
| examples/SPECTODO.md | legacy compatibility | LANG-013, LANG-014, LANG-015, AGENT-007, AGENT-009, VALID-001 |
| examples/planning-v0.2.md | example/fixture (not canonical) | supporting / no direct link |
| examples/root-v0.2.md | example/fixture (not canonical) | supporting / no direct link |
| examples/scoped-SPECTODO.md | example/fixture (not canonical) | LANG-017, AGENT-011 |
| research/2026-09-20-format-direction.md | historical evidence (non-normative) | DOCS-002 |
| research/2026-09-20-initial-design-history.md | historical evidence (non-normative) | supporting / no direct link |
| research/2026-09-20-naming-decision.md | historical evidence (non-normative) | supporting / no direct link |
| research/2026-09-20-todo-task-management-literature-review.md | historical evidence (non-normative) | supporting / no direct link |
| research/2026-09-21-agent-scale-validation.md | historical evidence (non-normative) | AGENT-004, AGENT-005, AGENT-006, AGENT-007, VALID-003 |
| research/2026-09-21-github-android-validation.md | historical evidence (non-normative) | VALID-004 |
| research/2026-10-04-scoped-inventory-design.md | historical evidence (non-normative) | LANG-017 |
| scripts/kickoff-v0.2.mjs | optional validated file-operation core (not mandatory CLI) | supporting / no direct link |
| scripts/validate-v0.2.mjs | verification machinery | supporting / no direct link |
| spec/language-v0.1.md | legacy compatibility | LANG-011, LANG-013, LANG-014, LANG-015, LANG-016, AGENT-010, VALID-005, DOCS-003, REL-001, REL-002 |
| spec/language-v0.2.md | current guidance/policy | LANG-017, AGENT-011, BOOT-001 |
| tests/kickoff-e2e.test.mjs | repeatable local end-to-end lifecycle scenarios | supporting / no direct link |
| tests/v0.2.test.mjs | verification machinery | supporting / no direct link |

| docs/spectodo-source-inventory.md | source crosswalk (supporting only) | supporting / no direct link |
| docs/spectodo-migration-ledger.md | migration evidence (supporting only) | supporting / no direct link |
| docs/validation-v0.2.md | promotion evidence and blockers (supporting only) | supporting / no direct link |

## Coverage and decisions

- Current proposed normative files: spec/language-v0.2.md, AGENTS.md, docs/adoption.md, and the two current Skills. README points to them; the canonical inventory tracks resulting capabilities.
- Legacy frozen rule set: spec/language-v0.1.md. Historical v0.1 example: examples/SPECTODO.md. Neither is reinterpreted as v0.2.
- The research records remain in-place for provenance. The 2026-10-04 scoped-inventory proposal is superseded where it says v0.2 is opt-in or recommends v0.1 for single-project repositories. The stable decision file documents that change.
- No exact design/code/deployment files of an adopting external repository were available in this source repository. The generic kickoff Skill cannot prove full external adoption merely from its own instructions.
- Example references such as @docs/product.md and @docs/architecture-comparison.md are illustrative paths in fictional sample repositories; they do not exist here and the examples are excluded from root-scope reference checks.

## Known gaps

- Functional tests prove formal invariants and synthetic route scenarios; actual cross-repository coverage, semantic duplicate detection, source completeness and usability still require run results against representative target repositories.
- A README or research file may refer to prior proposal language as historical evidence; preserve its context instead of rewriting it into false chronology.
