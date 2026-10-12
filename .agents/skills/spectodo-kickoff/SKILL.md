---
name: spectodo-kickoff
description: Reproducibly inventory an entire repository, organize source documentation, install or reconcile stable Spectodo v0.2, generate workspace routes, audit migrations, and verify idempotence for documentation-only, coded, and pre-existing Spectodo projects. Invoke for initial kickoff, re-kickoff, modernization, structural inventory audits, or repository-wide refresh.
---

# Common kickoff: use the centrally approved Spectodo v0.2 target

## Mandatory bootstrap in a consumer repository (no local Skill required)

The authoritative source is **https://github.com/myokoym/spectodo**, NOT the repository where this kickoff is being applied. Source-relative paths such as .agents/skills/spectodo-kickoff/SKILL.md do not refer to files already present in the consumer repository. A first-time adopter is expected to have no local Spectodo Skill, specification or SPECTODO.md. Never stop simply because they are absent locally.

1. First read consumer AGENTS.md/instructions and check tracked/uncommitted changes. This is a clean-repository bootstrap, not permission to overwrite unrelated files.
2. Read https://github.com/myokoym/spectodo/blob/main/docs/adoption.md. For a FIRST install, resolve the upstream main HEAD commit SHA. If a verified v0.2 stable upstream SHA is already recorded in consumer instructions, REUSE that SHA on routine reruns; consult main again only when a coordinated upstream refresh is explicitly requested. A recorded legacy v0.1 upstream SHA does not qualify as a v0.2 pin during an explicitly requested migration. This distinguishes reproducible adoption from an upstream update.
3. Read README.md, spec/language-v0.2.md, .agents/skills/spectodo-kickoff/SKILL.md, .agents/skills/spectodo/SKILL.md, docs/adoption.md, docs/optional-execution-plans.md, and examples/execution-plan.md **from that single upstream commit SHA**. For legacy v0.1 migration, also read spec/language-v0.1.md and docs/migration-v0.1-to-v0.2.md from the same SHA. Verify upstream README/spec identify v0.2 as stable; do not use stale cached search results.
4. Install/reconcile the verified v0.2 language spec, both Skills, docs/optional-execution-plans.md, and its examples/execution-plan.md companion into matching consumer paths, preserving local changes and recording upstream repo+SHA in consumer instructions/report. Optional scripts require their own dependencies; do not imply they were installed if only Skills/spec were copied.
5. If a GitHub access route fails, try other available routes and record actual URLs/errors. Do non-destructive consumer-repository discovery even when external access is blocked; do not fabricate or downgrade Spectodo, and stop Spectodo-specific writes only if the source cannot be verified.
6. The common kickoff request itself explicitly authorizes audited migration of legacy v0.1. Unrelated routine maintenance does not; follow the existing explicit-authorization rules below.

The full consumer-facing bootstrap and kickoff prompt lives in https://github.com/myokoym/spectodo/blob/main/docs/adoption.md. Do not give consumer agents only the bare relative Skill path.

Read the stable v0.2 specification in spec/language-v0.2.md, the operational spectodo Skill, the adoption guide, and existing repository instructions. All new installations and deliberate upgrades MUST use this version. Do not ask the consuming repository to select the language version, and never use V0/V1 product targets as language versions. Existing v0.1 is preserved until migration explicitly authorized.

## Phase A — exhaustive discovery BEFORE adopting

1. Enumerate tracked repository files, roots, branches/decisions/history where accessible, all SPECTODO.md candidates, and effective AGENTS.md/instructions. Identify exclusions for build outputs, caches, vendor artifacts, examples and fixtures; log coverage limits.
2. Inventory current README, proposals, design briefs, research notes, decisions, specs, code, config, CI, tests, deployment records and dependencies. Read actual contents rather than filenames alone. Record path, purpose, authority (current / proposed / superseded / historical / unknown), scope, evidence, contradictions, and disposition. Do not discard original documents.
3. Find all source requirements and enduring invariants. Distinguish verifiable outcomes from to-dos, subjective recommendations, design rationale, past deliberation, and wish lists. Preserve unresolved decisions in a separate issues/decision document, not false completed items.
4. Produce or update docs/spectodo-source-inventory.md with source path, scope, authority, requirement/constraint ID, or a stated exclusion reason and unresolved gaps. An input path list alone is NOT sufficient: verify each current normative requirement has one accounted-for outcome (inventory ID, constraint, or explicit reason it is not a Spectodo record). Use stable keys and update in place on reruns; do not create a second canonical inventory.

## Phase B — determine scopes and preserve history

5. Enumerate independently managed workspaces/products grounded in repository evidence. One project => root Scope (e.g. PROJECT: .). Multiple products with separate targets and lifecycle => explicit distinct scope roots. Do not infer separate scopes just because directories differ. If ambiguous, keep a single root scope and document the disputed boundary.
6. For any existing inventory, reconcile current canonical path, version, IDs, statements, statuses, references and routes BEFORE generating content. v0.1-to-v0.2 requires a row for every original constraint/item/version/route/reference in a disposition ledger and explicit migration authorization. Never silently change the syntax of a v0.1 maintenance request.
7. Draft the route table in AGENTS.md (or equivalent actual agent instructions), one row for each supported active workspace root. Require shared policy explicitly per applicable route; detect overlapping/omitted routes and nested ancestor confusion. Do not silently route by requested file path.
8. Analyze and improve the actual documentation architecture for Codex continuity, not just create an index. When supported by evidence, integrate/split/move/rename/rewrite documentation and update links atomically. Record a source-to-destination crosswalk and validate that every material decision, research source, unresolved issue, alternative and rejection rationale survived. Do not generate or move files without a concrete benefit, and do not delete historical evidence merely to simplify the tree.

## Phase C — generate inventory

9. Create or reconcile one SPECTODO.md per canonical scope root under v0.2. Include exactly one # Scope declaration, Versions, optional Constraints, and category items. Preserve immutable IDs for the same statement. Avoid duplicate records across categories or scopes. Track active and completed behavior. For no-code outcomes, use I:-/P:- only when not applicable; future code work stays I:.. Never mark x from conjecture.
10. Reference the strongest existing evidence with root-relative @refs; do not embed logs, rationale, plans, source excerpts or issue commentary within a one-line record. An unverified behavior cannot be V:x merely because documents assert a plan.
11. On reruns or updates, compare by canonical file + ID + meaning and reconcile; add missing items, modify stale states using evidence, and leave unrelated progress intact. Migration is the only reason to rehome an item. Document each nontrivial change and map old/new locations.

## Optional detailed execution plans

The consumer also installs docs/optional-execution-plans.md and examples/execution-plan.md from the SAME pinned upstream commit, so the guide's relative example link resolves. Merely installing the guide does not activate plan generation: routine operations and kickoffs WITHOUT an explicit request must NOT create execution-plan documents automatically.

The canonical Japanese kickoff prompt in docs/adoption.md explicitly authorizes **complete, planning-only coverage** of all incomplete adopted requirements across canonical scopes and declared target Versions, AFTER evidence-driven document restructuring and inventory reconciliation. Do NOT arbitrarily stop after the first item, request another user prompt at every item boundary, or create one Markdown file per Requirement by default.

1. Enumerate all canonical inventories by explicit workspace routes and account for each unfinished adopted Requirement. The scope is the whole consuming repository, not merely the first active workspace. Do not upgrade rejected proposals to requirements; finished Requirements need no new implementation plans.
2. Create/reconcile docs/spectodo-execution/README.md as the single execution-plan navigation and dependency/order index. Its complete scope/Version/Requirement-ID crosswalk must point to a work-unit plan, a completed item, an explicitly excluded item with reason, or a blocked item with the missing decision/evidence. This index is NOT a second inventory or a separate D/I/P/V tracking system.
3. Group related requirements into stable executable work units based on actual dependencies, atomic changes and validation boundaries, not a strict one-requirement-one-file rule. Save plans under docs/spectodo-execution/<scope-id>/<stable-work-unit>.md; list all covered IDs and stable upstream/repository evidence. Split only if necessary for readability and independent resumability. Reconcile existing plans rather than duplicate or reset them.
4. Map cross-scope/version dependencies and a ready-to-run order, including independent branches, predecessor gates, the next safe step, and automated/human verification. Same-priority items or multiple scopes do NOT require user confirmation when no unresolved product decision is necessary; use a stable tie order for independent work without changing Spectodo's priority semantics.
5. For every work unit specify confirmed vs new paths, prerequisites, precise edits/actions, observable expected results, concrete checks, pass/fail/stop/recovery gates, and a resume checkpoint. For no-code plans produce research/design procedures; never fabricate implementation files or test results.
6. Where evidence or approval is genuinely missing, block only affected dependent units, record what is missing and what unblocks them, and continue generating independent units. Do not stop the repository-wide kickoff merely because one unit is blocked. Generation does NOT execute features/deployments, does not change D/I/P/V absent independent evidence, and is not an instruction to automatically switch models.
7. Audit requirement-to-plan coverage in both directions, duplicate work units, dependency cycles, broken references, stale assumptions, tests, rollback/re-entry and repeat-run idempotence. Report total covered, skipped-completed, blocked and missing IDs honestly.

For a later user request to EXECUTE the prepared plans, follow the optional execution guide: work through the dependency-ordered ready units continuously, verifying and reconciling the canonical Spectodo inventory after each unit, without seeking permission after every ID. Stop only on actual risk, permissions, failing required checks, or missing decisions; continue unrelated safe branches. Never imply future asynchronous work. Individual-ID plans remain supported when explicitly requested, not as the mandatory normal workflow.

A consumer pinned to an older version of the Skill/guide must explicitly refresh the bundle, not mix commits.

## Optional reusable file operations

The optional exports in scripts/kickoff-v0.2.mjs provide tested canonical placement, route updates, source-path census, v0.1 ledger and ID-stable reconciliation. They are not a mandatory CLI, and cannot replace semantic review. Supply evidence-reviewed inventory content and correct routes first. The helper refuses blind overwrite and silent migration, and preserves human source-index notes outside its marked block. Without it, perform the same operations under this Skill.

## Phase D — gates and reporting

12. First audit SOURCE coverage and document preservation: for each current normative requirement verify inventory ID, constraint, or justified exclusion, and for each reorganized source verify target location, decision and rationale preservation, plus updated references. Report unaccounted claims explicitly.
13. Independently audit Spectodo grammar, scope/route uniqueness, IDs, checkbox/axes, versions, gaps, references, duplication, contradictory statements, evidence strength and shared-policy reachability. Use optional automated checks if available; semantic checks remain mandatory.
14. Rerun with the SAME recorded upstream commit SHA and source state (dry-run or actual). Confirm no new IDs, duplicate requirements, unnecessary document moves, or byte churn; compare hashes where permitted. Fix findings and repeat affected audits. Never claim a dry-run, external Codex pilot, or a machine-executed check that did not actually happen.
15. Report covered paths, exclusions, current/proposed/superseded sources, canonical scope routes, added/changed/reused IDs, source-to-ID coverage, source-to-destination map, audit evidence, repeated-run changes and all remaining blockers. Include the execution-plan index, full source-ID-to-work-unit coverage, ordered work-unit paths, skipped-completed IDs and blocked IDs with reasons. Include upstream commit SHA, bootstrap method and installed paths. Do not declare stable adoption complete when a required gate was not observed.
