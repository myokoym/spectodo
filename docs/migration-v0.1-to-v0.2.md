# v0.1 to v0.2 migration protocol

Legacy v0.1 remains valid and unchanged. For a deliberate upgrade to the current Spectodo foundation, use stable v0.2; do not solicit a target-repository language-version choice.

## Preflight and ledger

Read the original root SPECTODO.md and all applicable instructions. Save a migration ledger in a supporting file such as docs/spectodo-migration-ledger.md (never another canonical SPECTODO.md). Before changing the old file, record one disposition for EACH constraint, requirement, version mapping, shared reference, and workspace route. Suggested columns: old ID/path; statement or source; new scope/ID; keep/share/revise/retire; old D/I/P/V; new D/I/P/V; source/evidence; reason. Review unknowns as blockers, not guesses.

## Single project

Preserve existing IDs and statements; prepend a Scope section declaring the root, preserve Versions/Constraints/categories; validate every record against v0.2 rules including escaped pipe/backslash and references. Add explicit root route in AGENTS.md. Do not silently reset progress or change target versions.

## Multiple scopes

For each old requirement, assign one successor or retire with evidence; split only where genuinely distinct behaviors exist (new IDs and independent progress). For each constraint, choose one scope-local owner, a shared authoritative policy read by every applicable workspace, or documented retirement. Do not implicitly inherit parent policy. Create canonical files at each declared scope root, with a route for each supported workspace. Retire old root inventory only after the ledger and new routes validate; Git retains history.

## Reverse migration

Requires its own ledger for ALL v0.2 scope records and policy sources. Resolve divergent requirements/versions and states before writing v0.1 root file. Validate against the unmodified v0.1 spec. Removing a Scope declaration alone is NOT rollback.

## Acceptance gates

No unaccounted old record, lost rule, duplicated authority, unknown route, wrong canonical path, invented progress, broken reference or unchecked syntax. Repeat the migration in dry-run and verify no additional edits. Keep uncertainty visible; do not claim completion if a gate fails.
