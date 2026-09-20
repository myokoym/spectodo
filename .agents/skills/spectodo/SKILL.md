---
name: spectodo
description: Read, add, update, reconcile, prioritize, or audit a Spectodo specification/progress inventory in this repository. Use when working with Spectodo items, versions, priorities, categories, implementation/deployment/validation progress, or when checking repository state against the Spectodo inventory.
---

Use the repository's Spectodo language specification as the authority.

Before modifying a Spectodo inventory, read:

- `spec/language-v0.1.md`

The format is intentionally usable without a CLI. Do not require or introduce a dedicated renderer, database, board, or CLI to perform ordinary Spectodo work.

## Locate

1. Look for an existing Spectodo inventory in the repository.
2. Prefer an explicitly identified canonical file.
3. Do not silently create a second inventory if one already exists.
4. If no inventory exists and the task is only analysis/audit, report that instead of inventing one.

## Read

When summarizing an inventory:

1. Preserve category and version identities.
2. Interpret the version as the item's target product/scope version, not as lifecycle progress.
3. Interpret numeric priority as ordering for selecting the next not-yet-started item to begin designing within the active target version; lower numbers come first.
4. Interpret progress axes independently:
   - D = design
   - I = implementation
   - P = deployment
   - V = validation
5. Use the status meanings from the language specification.
6. Read the leading Markdown checkbox as the derived overall TODO indicator.
7. Verify that `[x]` appears only when every D/I/P/V axis is `x` or `-`; otherwise it must be `[ ]`.
8. Do not collapse implementation and validation into one detailed state.
9. Treat completed items as part of the current application specification, not disposable history.

## Select next work

When the user asks to proceed without naming a specific item:

1. Continue an already active item when continuing it is the natural next step; do not preempt it solely because another item has a higher priority.
2. When choosing a new item to start, stay within the active target version unless the user explicitly changes scope.
3. Among not-yet-started items in that version, prefer the lowest priority number across categories.
4. Priority boundaries are not confirmation gates. Do not stop merely because selection moves from P1 to P2.
5. Begin a new item's work at Design. Normal design discussion is the review point for the item's necessity, scope, target version, and specification.
6. If design reveals that the target version or necessity should change, surface that decision and update it only with sufficient evidence or explicit user agreement.

## Add

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

## Update

When updating an item:

1. Keep its stable ID unless the item identity itself was created incorrectly.
2. Change only fields supported by evidence or explicit user instruction.
3. Do not mark implementation `x` because a UI element, mock, fixture, placeholder, or demo output exists.
4. Do not mark validation `x` merely because implementation exists.
5. If a status becomes `~`, add or update the required gap.
6. If no axis remains `~`, remove a stale gap unless it is still useful for a `>` axis.
7. Recompute the leading checkbox after every progress change.
8. Do not add nested notes beneath an item.
9. Do not change an item's version or priority merely to make the remaining list look cleaner.

## Reconcile

When comparing repository reality with the inventory:

1. Inspect relevant code, tests, deployment configuration/results, and referenced evidence as needed.
2. Report mismatches before changing ambiguous states.
3. Update states only when the evidence is sufficient.
4. Never infer deployment from implementation alone.
5. Never infer validation from deployment alone.
6. Keep intentional `-` (not applicable) distinct from deferred `.` (todo).

## Close the loop

When repository work changes reality covered by the Spectodo inventory:

1. Before finishing the work, identify every affected Spectodo item.
2. Reconcile D/I/P/V against the resulting repository state in the same work unit.
3. Recompute each affected overall checkbox.
4. If the work itself exposed a missing requirement or an invalid inventory assumption, add or revise the corresponding item instead of leaving the discovery only in chat.
5. Do not claim the Spectodo-managed work is finished while known affected inventory items are stale.

## Audit

Check at least:

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
