---
name: spectodo
description: Read, add, update, reconcile, prioritize, or audit a Spectodo specification/progress inventory in this repository. Use when working with Spectodo items, versions, priorities, categories, implementation/deployment/verification progress, or when checking repository state against the Spectodo inventory.
---

Use the repository's Spectodo language specification as the authority.

Before modifying a Spectodo inventory, read any existing repository and applicable ancestor workspace instructions, select the canonical inventory using the rules below, and read the matching language specification. A v0.1-only repository implicitly routes its repository-root workspace to the root `SPECTODO.md`; it does not require explicit routing instructions or an AGENTS.md file. Explicit workspace-to-scope routing is required only for mixed-version repositories or repositories using v0.2. Read any shared policy source those instructions identify before applying scope-local constraints. v0.2 is currently a proposal; use it only when the repository has explicitly opted into that proposal through its scope declaration and routing instructions:

- An inventory without a `# Scope` section follows `spec/language-v0.1.md`.
- An inventory with `# Scope` follows the complete, standalone `spec/language-v0.2.md`.

Do not apply v0.2 rules to an unscoped v0.1 inventory or combine the two specifications.

The format is intentionally usable without a CLI. Do not require or introduce a dedicated renderer, database, board, or CLI to perform ordinary Spectodo work.

ChatGPT/agents are the primary inventory updaters. Do not treat human direct source editing, source-editor ergonomics, or GitHub's edit UI as required Spectodo workflows. For smartphone acceptance, distinguish ChatGPT Android operation from GitHub Android rendered-Markdown inspection.

## Resolve scope and locate the inventory

1. Determine whether the repository uses only v0.1 or includes canonical v0.2 inventories. In a v0.1-only repository, select the root `SPECTODO.md` for the repository-root workspace by the implicit v0.1 route; no explicit routing configuration is required. In a mixed-version or v0.2 repository, read repository and applicable ancestor instructions for the explicit mapping from the actual active workspace root to one inventory scope. Read any shared policy source those instructions require.
2. Do not switch scope because the request mentions another product, branch, or file path.
3. A root `SPECTODO.md` without `# Scope` follows v0.1. In a mixed-version repository, use it only for the legacy project and workspace roots explicitly assigned to it; do not treat it as an umbrella for unrelated v0.2 scopes.
4. A v0.2 inventory is canonical only at the path derived from its `# Scope` declaration and when routing instructions map a supported workspace to that scope. IDs and progress never transfer automatically.
5. In a mixed-version or v0.2 repository, if the active workspace root maps to no unique scope, stop and clarify instead of changing another inventory. For a v0.1-only repository-root workspace, the implicit route in step 1 satisfies inventory selection.
6. When auditing the repository, enumerate every `SPECTODO.md` path. Use the implicit root route for a v0.1-only repository and explicit routing instructions for mixed-version or v0.2 repositories to identify canonical files; exclude examples or fixtures only when their support status is explicit. Check that every routed inventory exists and every canonical inventory has one applicable route.
7. Verify canonical v0.2 paths match declared roots and that scope IDs and roots are unique. Treat an undocumented, duplicate, or unrouteable inventory file as an audit error.
8. If the selected scope has no `SPECTODO.md` and the task is only analysis/audit, report that instead of inventing or guessing another canonical file.

## Read

When summarizing an inventory:

1. Read shared repository policy explicitly routed to the active workspace before reading local constraints. Parent or child inventory constraints do not inherit implicitly.
2. Read an optional `# Constraints` section separately from specification items. Constraints are enduring invariants, not work items, and have no checkbox, version, priority, or D/I/P/V state.
3. Preserve category and version identities.
4. Interpret the version as the item's target product/scope version, not as lifecycle progress.
5. Interpret numeric priority as ordering for selecting the next not-yet-started item to begin designing within the active target version; lower numbers come first.
6. Interpret progress axes independently:
   - D = design
   - I = implementation
   - P = deployment
   - V = verification
7. Use the status meanings from the language specification.
8. Read the leading Markdown checkbox as the derived overall TODO indicator.
9. Verify that `[x]` appears only when every D/I/P/V axis is `x` or `-`; otherwise it must be `[ ]`.
10. Do not collapse implementation and verification into one detailed state.
11. Treat completed items as part of the current application specification, not disposable history.

## Select next work

When the user asks to proceed without naming a specific item:

1. Continue an already active item when continuing it is the natural next step; treat an item as actively in progress when at least one axis is `>`. Do not preempt it solely because another item has a higher priority.
2. For new-work selection, use an explicitly named target version from the current work context when one exists. Otherwise use the lowest declared version that still contains an incomplete specification item as the default active target version.
3. Treat an item as not-yet-started for this selection rule iff its Design axis is exactly `D:.`.
4. Among those candidates in the active version, prefer the lowest priority number across categories.
5. If multiple candidates have the same priority, do not invent source-order semantics; choose based on the current work context unless the project later defines a tie-break.
6. If the active version still has incomplete started items but no `D:.` candidate, do not advance to a later version just because the new-work candidate set is empty. Resume incomplete started work based on current context; priority does not retroactively reorder it.
7. Priority boundaries are not confirmation gates. Do not stop merely because selection moves from P1 to P2.
8. Begin a new item's work at Design. Normal design discussion is the review point for the item's necessity, scope, target version, and specification.
9. If design reveals that the target version or necessity should change, surface that decision and update it only with sufficient evidence or explicit user agreement.

## Add

Before adding a specification item, determine whether the statement is actually an enduring invariant within the selected inventory's scope. If it is, add it under `# Constraints` instead of inventing progress state for it.

When adding an item:

1. Choose the correct existing category, or add a category only when a new stable functional area is actually needed.
2. Allocate a new stable item ID under that category.
3. Reference exactly one declared version.
4. Assign one numeric priority according to the project's intended order for beginning new design work.
5. Write the item statement as a concise behavior/capability specification, not merely a task title.
6. Write all four progress axes in canonical order.
7. Derive the leading checkbox: use `[x]` only if every axis is `x` or `-`; otherwise use `[ ]`.
8. Add a gap only when required/useful.
9. Add references only as paths/URLs. Do not inline design or implementation notes.
10. Keep the entire specification item on one source line.

## Update constraints

When changing a constraint:

1. Keep its stable ID unless the original identity was incorrect.
2. Do not add checkbox, version, priority, D/I/P/V, gap, or work-state metadata.
3. Keep it as a direct one-line invariant.
4. If the rule has become temporary work rather than an enduring invariant, remodel it as a specification item instead of attaching progress to the constraint.

## Update

When updating an item:

1. Keep its stable ID unless the item identity itself was created incorrectly.
2. Change only fields supported by evidence or explicit user instruction.
3. Do not mark implementation `x` because a UI element, mock, fixture, placeholder, or demo output exists.
4. Do not mark validation `x` merely because implementation exists.
5. Before assigning or retaining `V:~`, apply the statement-bounded verification rules below; more validation being possible is not enough.
6. If a status becomes `~`, add or update the required gap.
7. If no axis remains `~`, remove a stale gap unless it is still useful for a `>` axis.
8. Recompute the leading checkbox after every progress change.
9. Do not add nested notes beneath an item.
10. Do not change an item's version or priority merely to make the remaining list look cleaner.

## Bound verification scope

When assigning, updating, or reconciling the Verification axis:

1. Ask conceptually: “What evidence is necessary to prove this exact statement?”
2. Set `V` from evidence for that scope only. Do not keep `V:~` merely because additional manual, device, usability, balance, polish, tuning, or broader acceptance checks are possible.
3. If a manual/device acceptance condition is part of the requirement, make it explicit in the statement when practical. A statement that directly asserts a subjective or device-specific quality may itself require corresponding manual/device evidence.
4. If additional quality work is not required by the statement but is worth tracking, keep the original item based on evidence for its own statement and create a separate specification item for the extra work.
5. For separate quality work in the same target with lower urgency, use the same version and an appropriate lower priority.
6. If the quality work is outside the current target's completion criteria, use a later version. Priority alone is not sufficient to keep later-target polish from blocking the current target.
7. Do not weaken genuine validation requirements: when manual/device evaluation is part of the statement, `V:x` still requires corresponding evidence.

## Reconcile

When comparing repository reality with the inventory:

1. Inspect relevant code, tests, deployment configuration/results, and referenced evidence as needed.
2. Report mismatches before changing ambiguous states.
3. Update states only when the evidence is sufficient for the item's exact statement.
4. Apply the statement-bounded verification rules before treating an extra manual/device or quality check as a verification gap.
5. Never infer deployment from implementation alone.
6. Never infer verification from deployment alone.
7. Keep intentional `-` (not applicable) distinct from deferred `.` (todo).

## Close the loop

When repository work changes reality covered by the Spectodo inventory:

1. Before finishing the work, identify every affected Spectodo item.
2. Reconcile D/I/P/V against the resulting repository state in the same work unit.
3. Recompute each affected overall checkbox.
4. If the work itself exposed a missing requirement or an invalid inventory assumption, add or revise the corresponding item instead of leaving the discovery only in chat.
5. Do not claim the Spectodo-managed work is finished while known affected inventory items are stale.

## Audit

Check at least:

- repository-wide canonical inventory discovery, route coverage (implicit root route for v0.1-only; explicit routes for mixed-version/v0.2), canonical paths, and unique v0.2 scope IDs/roots
- every legacy v0.1 constraint/item has a disposition during an explicit migration
- shared policy sources are identified and instructed for every applicable workspace, with no unowned duplicate copies
- duplicate constraint IDs or a constraint ID colliding with an item ID
- checkbox/version/priority/progress syntax incorrectly attached to a constraint
- a constraint that is actually a progress-trackable capability or temporary task
- checkbox/progress mismatch
- duplicate version/category/item IDs
- item prefix/category mismatch
- unknown version IDs
- missing or malformed priorities
- missing or reordered D/I/P/V axes
- invalid status symbols
- `~` without `!gap`
- multiline or nested item records
- malformed ordering of optional segments
- broken or suspicious references when they can be checked
- vague statements that read as labels rather than specifications

Do not convert the file into YAML, JSON, a Markdown table, nested task lists, or per-item files unless the user explicitly changes the format design.
