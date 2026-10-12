---
name: spectodo-kickoff
description: Reproducibly inventory an entire repository, organize source documentation, install or reconcile stable Spectodo v0.2, generate workspace routes, audit migrations, and verify idempotence for documentation-only, coded, and pre-existing Spectodo projects. Invoke for initial kickoff, re-kickoff, modernization, structural inventory audits, or repository-wide refresh.
---

# Common kickoff: use the centrally approved Spectodo v0.2 target

## Mandatory bootstrap in a consumer repository (no local Skill required)

The authoritative source is **https://github.com/myokoym/spectodo**, NOT the repository where this kickoff is being applied. Source-relative paths such as .agents/skills/spectodo-kickoff/SKILL.md do not refer to files already present in the consumer repository. A first-time adopter is expected to have no local Spectodo Skill, specification or SPECTODO.md. Never stop simply because they are absent locally.

1. Read https://github.com/myokoym/spectodo/blob/main/docs/adoption.md and resolve the source repository's main HEAD commit SHA using available GitHub access (connected tool, API, raw URLs, or git clone).
2. Read README.md, spec/language-v0.2.md, .agents/skills/spectodo-kickoff/SKILL.md, .agents/skills/spectodo/SKILL.md, docs/adoption.md and, when relevant, docs/migration-v0.1-to-v0.2.md **from that same source commit SHA**. Verify that source README/spec identify v0.2 as stable; do not trust stale cached search results.
3. After reading the consumer repository's own AGENTS.md/instructions and inspecting existing files, install/reconcile the authoritative language spec and both Skills into the corresponding local paths. Preserve user changes, check for conflicts and record the source repo+SHA in the consumer instructions/report. Subsequent normal work may use the verified local copies.
4. If a GitHub access route fails, try other available routes and record actual URLs/errors. Do non-destructive consumer-repository discovery even when external access is blocked; do not fabricate or downgrade Spectodo, and stop Spectodo-specific writes only if the source cannot be verified.
5. The common kickoff request itself explicitly authorizes audited migration of legacy v0.1. Unrelated routine maintenance does not; follow the existing explicit-authorization rules below.

The full consumer-facing bootstrap and kickoff prompt lives in https://github.com/myokoym/spectodo/blob/main/docs/adoption.md. Do not give consumer agents only the bare relative Skill path.

Read the stable v0.2 specification in spec/language-v0.2.md, the operational spectodo Skill, the adoption guide, and existing repository instructions. All new installations and deliberate upgrades MUST use this version. Do not ask the consuming repository to select the language version, and never use V0/V1 product targets as language versions. Existing v0.1 is preserved until migration explicitly authorized.

## Phase A — exhaustive discovery BEFORE adopting

1. Enumerate tracked repository files, roots, branches/decisions/history where accessible, all SPECTODO.md candidates, and effective AGENTS.md/instructions. Identify exclusions for build outputs, caches, vendor artifacts, examples and fixtures; log coverage limits.
2. Inventory current README, proposals, design briefs, research notes, decisions, specs, code, config, CI, tests, deployment records and dependencies. Read actual contents rather than filenames alone. Record path, purpose, authority (current / proposed / superseded / historical / unknown), scope, evidence, contradictions, and disposition. Do not discard original documents.
3. Find all source requirements and enduring invariants. Distinguish verifiable outcomes from to-dos, subjective recommendations, design rationale, past deliberation, and wish lists. Preserve unresolved decisions in a separate issues/decision document, not false completed items.
4. Produce or update docs/spectodo-source-inventory.md with a path-to-scope/authority/requirement-ID crosswalk and unresolved coverage gaps. Use stable sections and entries keyed by file path so reruns update instead of append. This index is supporting evidence, never a second canonical Spectodo inventory.

## Phase B — determine scopes and preserve history

5. Enumerate independently managed workspaces/products grounded in repository evidence. One project => root Scope (e.g. PROJECT: .). Multiple products with separate targets and lifecycle => explicit distinct scope roots. Do not infer separate scopes just because directories differ. If ambiguous, keep a single root scope and document the disputed boundary.
6. For any existing inventory, reconcile current canonical path, version, IDs, statements, statuses, references and routes BEFORE generating content. v0.1-to-v0.2 requires a row for every original constraint/item/version/route/reference in a disposition ledger and explicit migration authorization. Never silently change the syntax of a v0.1 maintenance request.
7. Draft the route table in AGENTS.md (or equivalent actual agent instructions), one row for each supported active workspace root. Require shared policy explicitly per applicable route; detect overlapping/omitted routes and nested ancestor confusion. Do not silently route by requested file path.
8. Analyze and improve the actual documentation architecture for Codex continuity, not just create an index. When supported by evidence, integrate/split/move/rename/rewrite documentation and update links atomically. Keep a source-to-destination crosswalk and preserve decisions, research evidence, alternatives and rejected rationales. Do not generate or move files without a concrete benefit, and do not delete historical evidence merely to simplify the tree.

## Phase C — generate inventory

9. Create or reconcile one SPECTODO.md per canonical scope root under v0.2. Include exactly one # Scope declaration, Versions, optional Constraints, and category items. Preserve immutable IDs for the same statement. Avoid duplicate records across categories or scopes. Track active and completed behavior. For no-code outcomes, use I:-/P:- only when not applicable; future code work stays I:.. Never mark x from conjecture.
10. Reference the strongest existing evidence with root-relative @refs; do not embed logs, rationale, plans, source excerpts or issue commentary within a one-line record. An unverified behavior cannot be V:x merely because documents assert a plan.
11. On reruns or updates, compare by canonical file + ID + meaning and reconcile; add missing items, modify stale states using evidence, and leave unrelated progress intact. Migration is the only reason to rehome an item. Document each nontrivial change and map old/new locations.

## Optional reusable file operations

The optional exports in scripts/kickoff-v0.2.mjs provide tested canonical placement, route updates, source-path census, v0.1 ledger and ID-stable reconciliation. They are not a mandatory CLI, and cannot replace semantic review. Supply evidence-reviewed inventory content and correct routes first. The helper refuses blind overwrite and silent migration, and preserves human source-index notes outside its marked block. Without it, perform the same operations under this Skill.

## Phase D — gates and reporting

12. Audit scope and route uniqueness, grammar, IDs, checkbox/axes, versions, gaps, references, duplication, contradictory requirements, missing sources, evidence strength, and shared-policy reachability. Use optional automated checks when available; semantic audit is still mandatory.
13. Run the entire operation logically a second time (dry-run or actual), ensuring no additional IDs, duplicate requirements, unnecessary document moves, or content churn. Compare file contents/hash where tooling permits.
14. Report covered paths, exclusions, current/promoted/superseded sources, canonical scope routes, added/changed/reused IDs, validation results, remaining uncertainties and every release blocker. Include the exact upstream commit SHA, bootstrap method, installed Skill/spec paths, and source-to-destination document mapping. Do not declare stable adoption complete if a required gate has not been observed.
