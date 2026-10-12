---
name: spectodo-kickoff
description: Reproducibly inventory an entire repository, organize source documentation, install or reconcile stable Spectodo v0.2, generate workspace routes, audit migrations, and verify idempotence for documentation-only, coded, and pre-existing Spectodo projects. Invoke for initial kickoff, re-kickoff, modernization, structural inventory audits, or repository-wide refresh.
---

# Common kickoff: use the centrally approved Spectodo v0.2 target

## Invocation modes: do not confuse initial install with a migration

**Default user-facing invocation in docs/adoption.md = NEW INSTALL ONLY.** “New” describes Spectodo's absence, NOT the absence of files, project code, Git history or decisions. Detect actual state before deciding what can be written. No per-repository language-version choice; a new install uses v0.2 stable.

| Detected consumer state | Action for NEW INSTALL request |
|---|---|
| Empty or minimal new repository, no normative requirements | Bootstrap verified v0.2 spec/Skills and minimally truthful agent/README entry if useful. Do NOT invent project purpose, Version, Category, Requirement, constraints, code or progress. Do NOT write an invalid fabricated/empty SPECTODO.md; mark inventory setup incomplete until user-backed normative requirements exist. Continue safe groundwork; report precise missing information. |
| Planning/research/proposals/README but no canonical Spectodo | Read all available sources and distinguish adopted decisions from proposals. Restructure documents if supported, create v0.2 inventory ONLY for evidenced normative requirements and enduring constraints; expose gaps rather than inventing. |
| Implemented code/tests but no canonical Spectodo | Cross-check source, tests and docs to establish real requirements and D/I/P/V. Source files alone are not proof of validation or deployment. |
| Some distributed Spectodo spec/Skill files but no canonical inventory | Audit installed files, upstream pin, local modifications and collisions. Reconcile the same version/pin; never overwrite local edits or create duplicate canonical files. Treat as partial first-time installation, not an excuse for a second inventory. |
| Existing canonical v0.2 inventory | This is NOT a new installation. Do not reset, migrate, clone or overwrite the inventory based on the new-install request; report state and link the separate existing-v0.2 re-kickoff command in docs/adoption.md. |
| Existing canonical v0.1 inventory | This is NOT a new installation. Do not silently migrate under the new-install command. Report the explicit migration command and preserve existing records. |
| Monorepo or multi-project with no Spectodo | Choose independent scopes only when evidence supports independently managed workspaces. Directory count alone is not a scope split. |
| Dirty worktree/conflicting instructions/external source blocked | Preserve edits and active instructions. Isolate unsafe writes, perform non-destructive discovery, record blockers and continue independent safe operations. Never guess upstream contents. |

**Existing-v0.2 re-kickoff** is a separately explicit request to audit/restructure while preserving IDs, evidence, routing and pinned source SHA. **Legacy v0.1→v0.2 migration** is a different explicit request requiring a complete migration ledger. Distinguish these modes before writing. Do not reinterpret the mere presence of historical v0.1 text, sample files or a copied specification as an active canonical inventory; check the exact canonical candidate and effective workspace routing.

An utterly empty repository cannot support a fabricated “comprehensive inventory”: the v0.2 validator requires at least a declared Version and a nonempty Category containing a Requirement. Never create bogus placeholders such as a fictional PLAN-001 just to pass a test. Report the unfulfilled inventory gate, rather than claiming kickoff fully complete. Do not require the user to read long skills or choose an implementation approach; the missing project purpose or approved requirement is genuinely substantive.


## Mandatory bootstrap in a consumer repository (no local Skill required)

The authoritative source is **https://github.com/myokoym/spectodo**, NOT the repository where this kickoff is being applied. Source-relative paths such as .agents/skills/spectodo-kickoff/SKILL.md do not refer to files already present in the consumer repository. A first-time adopter is expected to have no local Spectodo Skill, specification or SPECTODO.md. Never stop simply because they are absent locally.

1. First read consumer AGENTS.md/instructions, find canonical SPECTODO.md candidates and their effective workspace routing, and check tracked/uncommitted changes. Classify NEW INSTALL vs explicit v0.2 re-kickoff vs explicit v0.1 migration BEFORE any write. If the user requested NEW INSTALL but an active canonical inventory already exists, report which mode applies and do not install, migrate, or rewrite files. Preserve all unrelated changes.
2. Read https://github.com/myokoym/spectodo/blob/main/docs/adoption.md. For a FIRST install, resolve the upstream main HEAD commit SHA. If a verified v0.2 stable upstream SHA is already recorded in consumer instructions, REUSE that SHA on routine reruns; consult main again only when a coordinated upstream refresh is explicitly requested. A recorded legacy v0.1 upstream SHA does not qualify as a v0.2 pin during an explicitly requested migration. This distinguishes reproducible adoption from an upstream update.
3. For DEFAULT kickoff read README.md, spec/language-v0.2.md, .agents/skills/spectodo-kickoff/SKILL.md, .agents/skills/spectodo/SKILL.md and docs/adoption.md **from that single upstream commit SHA**. Read docs/optional-execution-plans.md and examples/execution-plan.md ONLY if detailed execution planning is explicitly requested; fetch these from the SAME pinned SHA. For legacy v0.1 migration, read spec/language-v0.1.md and docs/migration-v0.1-to-v0.2.md from that SHA. Verify upstream README/spec identify v0.2 as stable; do not use stale cached search results.
4. Only in a write-authorized mode (new/partial install or explicit re-kickoff/migration), install/reconcile the verified v0.2 language spec and both Skills into matching consumer paths, preserving local changes and recording upstream repo+SHA in consumer instructions/report. Install docs/optional-execution-plans.md and examples/execution-plan.md together ONLY when explicitly opted in. They may also be installed later on demand from the same pinned upstream SHA without a language-version choice. Optional scripts require their own dependencies; do not imply they were installed if only Skills/spec were copied.
5. If a GitHub access route fails, try other available routes and record actual URLs/errors. Do non-destructive consumer-repository discovery even when external access is blocked; do not fabricate or downgrade Spectodo, and stop Spectodo-specific writes only if the source cannot be verified.
6. Only the separate EXPLICIT v0.1 migration invocation authorizes migration. The standard NEW INSTALL invocation does NOT. Existing v0.2 re-kickoff is a different explicit invocation; preserve its canonical source/IDs.

The full consumer-facing bootstrap and kickoff prompt lives in https://github.com/myokoym/spectodo/blob/main/docs/adoption.md. Do not give consumer agents only the bare relative Skill path.

Read the stable v0.2 specification in spec/language-v0.2.md, the operational spectodo Skill, the adoption guide, and existing repository instructions. All new installations and deliberate upgrades MUST use this version. Do not ask the consuming repository to select the language version, and never use V0/V1 product targets as language versions. Existing v0.1 is preserved until migration explicitly authorized.

## Phase A — exhaustive discovery BEFORE adopting

1. Enumerate tracked repository files, roots, branches/decisions/history where accessible, all SPECTODO.md candidates, and effective AGENTS.md/instructions. Identify exclusions for build outputs, caches, vendor artifacts, examples and fixtures; log coverage limits.
2. Inventory current README, proposals, design briefs, research notes, decisions, specs, code, config, CI, tests, deployment records and dependencies. Read actual contents rather than filenames alone. Record path, purpose, authority (current / proposed / superseded / historical / unknown), scope, evidence, contradictions, and disposition. Do not discard original documents.
3. Find all source requirements and enduring invariants. Distinguish verifiable outcomes from to-dos, subjective recommendations, design rationale, past deliberation, and wish lists. Preserve unresolved decisions in a separate issues/decision document, not false completed items.
4. When meaningful sources exist, produce/update docs/spectodo-source-inventory.md with source path, scope, authority, requirement/constraint ID, or explicit exclusion reason and unresolved gaps. A bare input path list is NOT sufficient: each normative requirement needs an inventoried outcome or justified exclusion. If the repo is empty, avoid a misleading empty evidence table and report absent sources directly. Use stable keys; never create a second canonical inventory.

## Phase B — determine scopes and preserve history

5. Enumerate independently managed workspaces/products grounded in repository evidence. One project => root Scope (e.g. PROJECT: .). Multiple products with separate targets and lifecycle => explicit distinct scope roots. Do not infer separate scopes just because directories differ. If ambiguous, keep a single root scope and document the disputed boundary.
6. For any existing inventory, determine whether it is v0.1, v0.2, historical/example, or unrouteable. Under NEW INSTALL, do not edit active v0.1/v0.2 inventory; report the separate re-kickoff/migration invocation. Under explicitly requested re-kickoff, reconcile current v0.2 canonical path, IDs, statements, states, references and routes BEFORE writing. v0.1→v0.2 requires an explicit migration request and a disposition ledger for EVERY original constraint/item/version/route/reference. Never silently change legacy syntax.
7. Draft/update the route table in AGENTS.md (or equivalent instructions) ONLY for valid canonical inventories with evidenced requirements. One row per supported active workspace; require shared policy explicitly per applicable route, detect overlapping/omitted routes and nested ancestor confusion. If empty/no-evidence, do not add a route pointing to nonexistent SPECTODO.md; mark routing/inventory setup as pending. Do not silently route by requested file path.
8. Analyze and improve the actual documentation architecture for Codex continuity, not just create an index. When supported by evidence, integrate/split/move/rename/rewrite documentation and update links atomically. Record a source-to-destination crosswalk and validate that every material decision, research source, unresolved issue, alternative and rejection rationale survived. Do not generate or move files without a concrete benefit, and do not delete historical evidence merely to simplify the tree.

## Phase C — generate inventory

9. Only where evidenced normative requirements exist, create a valid v0.2 SPECTODO.md per canonical scope root (Scope, Versions, optional Constraints and at least one nonempty Category). Never fabricate IDs/statements or write invalid empty inventories in empty/no-evidence repositories. When no current requirements are supported, keep evidence gaps explicit, install the common foundation if safe, and mark inventory completion blocked. For explicit v0.2 RE-KICKOFF, reconcile existing inventory instead of resetting it. Preserve immutable IDs; avoid duplicate scope/category records. For no-code outcomes use I:-/P:- only when not applicable; future code work stays I:.. Never mark x from conjecture.
10. Reference the strongest existing evidence with root-relative @refs; do not embed logs, rationale, plans, source excerpts or issue commentary within a one-line record. An unverified behavior cannot be V:x merely because documents assert a plan.
11. On reruns or updates, compare by canonical file + ID + meaning and reconcile; add missing items, modify stale states using evidence, and leave unrelated progress intact. Migration is the only reason to rehome an item. Document each nontrivial change and map old/new locations.

## Optional detailed execution plans

The default kickoff does NOT fetch/read/copy docs/optional-execution-plans.md or examples/execution-plan.md. On explicit opt-in, fetch and install BOTH from the SAME pinned upstream SHA so the guide's example link resolves. An old pin lacking these files requires an explicitly requested coordinated refresh; do not mix source commits. Merely finding preexisting optional guide files does not authorize plan generation.

The standard canonical Japanese kickoff prompt in docs/adoption.md now requests ONLY the repository analysis, actual documentation reorganization, detailed Spectodo inventory, agent guidance and audits. **The default kickoff MUST NOT generate docs/spectodo-execution/README.md or any detailed execution plan.** A local guide or example being installed is not a request to run that optional workflow.

Only if the user explicitly adds the optional kickoff sentence from docs/adoption.md, or separately requests detailed planning, generate execution plans AFTER the standard kickoff's repository and inventory reconciliation:
1. Read the pinned docs/optional-execution-plans.md and examples/execution-plan.md. Enumerate all adopted incomplete Requirements across all canonical scopes and approved Versions rather than selecting only one item (unless the user explicitly narrows the scope).
2. Group related requirements into stable executable work units with source-backed dependencies. Reconcile docs/spectodo-execution/README.md as the complete ID-to-work-unit/finished/blocked/excluded coverage index. Do not create a second inventory or blindly generate one file per Requirement.
3. For each work unit, record confirmed/new paths, prerequisites, bounded concrete actions, expected results, verification, stop/rollback and a resumable checkpoint. Block only affected units for missing decisions; continue independent planning.
4. This opt-in is **planning only**; do not start implementation/deployment or advance D/I/P/V without separate evidence. Audit coverage, links, dependencies, consistency and rerun stability.

A later explicit execution request may follow the dependency-ordered ready units continuously, verifying results and reconciling Spectodo after each unit, without per-ID confirmation. Stop affected work for real safety, permissions, missing decisions or failing checks; continue independent safe work. Ordinary kickoff is not authorization to execute a prepared plan.

A consumer pinned to an older version of the Skill/guide must explicitly refresh the bundle, not mix commits.

## Optional reusable file operations

The optional exports in scripts/kickoff-v0.2.mjs provide tested canonical placement, route updates, source-path census, v0.1 ledger and ID-stable reconciliation. They are not a mandatory CLI, and cannot replace semantic review. Supply evidence-reviewed inventory content and correct routes first. The helper refuses blind overwrite and silent migration, and preserves human source-index notes outside its marked block. Without it, perform the same operations under this Skill.

## Phase D — gates and reporting

12. First audit SOURCE coverage and document preservation: for each current normative requirement verify inventory ID, constraint, or justified exclusion, and for each reorganized source verify target location, decision and rationale preservation, plus updated references. Report unaccounted claims explicitly.
13. Independently audit Spectodo grammar, scope/route uniqueness, IDs, checkbox/axes, versions, gaps, references, duplication, contradictory statements, evidence strength and shared-policy reachability. Use optional automated checks if available; semantic checks remain mandatory.
14. Rerun the relevant write-authorized flow with the SAME recorded upstream commit SHA and source state (dry-run or actual). For no-evidence/new-repo bootstraps, verify bootstrap idempotence without inventing an inventory. Confirm no new IDs, duplicate requirements, unnecessary document moves, or byte churn; compare hashes where permitted. Fix findings and repeat affected audits. Never claim a dry-run, external Codex pilot, or a machine-executed check that did not actually happen.
15. Report invocation mode and detected repository state first, then covered paths, exclusions, current/proposed/superseded sources, canonical scope routes (if established), added/changed/reused IDs, source-to-ID coverage, source-to-destination map, audit evidence, repeated-run changes and all remaining blockers. If an empty repository prevents valid inventory creation or an active inventory requires the separate re-kickoff/migration mode, report that specific gate as incomplete rather than claiming full success. Report execution-plan index and requirement coverage only when the user explicitly opted in to detailed planning. On default kickoff state that no execution plan was generated. Include upstream commit SHA, bootstrap method and installed paths. Do not declare stable adoption complete when a required gate was not observed.
