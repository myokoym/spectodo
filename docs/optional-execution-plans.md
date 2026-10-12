# Optional execution plans for low-cost model delegation

Status: optional operational guidance for Spectodo Language v0.2 stable. This does not change the Spectodo grammar, scope routing, priority, version, or D/I/P/V rules. The canonical inventory remains the only source of specification and progress truth.

## Activation and ownership

- Default: OFF. Do not generate step-by-step plans during ordinary kickoff, inventory updates, audits, or implementation without an explicit request to detail/delegate that work. An existing authorized plan may be resumed when the user asks to continue that work.
- An explicit request for low-cost-model delegation, detailed executable steps, or a reproducible handoff activates this workflow for the named scope/items only. It does not authorize implementing unrelated features or silently changing design decisions.
- Use the canonical inventory selected by effective AGENTS.md workspace routing; a referenced path alone never switches scopes. Read effective agent instructions, constraints, current requirements, actual source files, tests, and evidence first.
- The planning pass resolves justified design choices and supplies decisions/evidence before delegation. The delegated model follows the documented plan and may not invent missing requirements, commands, policies, or completion evidence.
- The plan is a **supporting document**, not a second SPECTODO.md, a replacement requirement, a task tracker, or a new progress axis. No special renderer, new CLI, or service is required.

## Deterministic file identity

Use repository-root-relative `docs/spectodo-execution/<SCOPE_ID>/<ITEM_ID>.md` when possible (e.g. `docs/spectodo-execution/PROJECT/APP-001.md`). Scope ID and item ID must match the active canonical inventory. Group multiple IDs only if one shared change is inseparable; give the file a stable work-unit name, enumerate all covered IDs, and avoid duplicate plans for the same work unit. Preserve existing useful project documentation and use a different stable support path only if needed to avoid a collision.

Record the current repository commit, branch and relevant input file references or content fingerprints when available. For a documentation-only/ungitted project, name the inspected files and mark the revision unverified; never invent a SHA. Record the pinned upstream Spectodo SHA if installed. The source-version pin and the language version are different from the project's V0/V1 target milestones.

Add the plan path as an `@ref` to the applicable item only when it improves discoverability; preserve all existing `@ref` values. Plan steps and checkboxes MUST NOT be replicated inside the canonical one-line inventory item. Do not add a new scope or convert any other document into a canonical inventory.

## Required sections of every plan

1. **Identity and goal:** scope ID/root, canonical inventory path, item IDs, target product version, concrete requested outcome, scope exclusions, source authority, and design decisions already approved.
2. **Starting snapshot:** branch/revision, clean/dirty working tree, relevant paths and expected preconditions, dependencies, environment/runtime versions when material, and observed unknowns. Never assume code exists in planning-only repositories.
3. **Ordered executable steps:** each independently verifiable step names exact affected paths, prerequisites, explicit action/change, expected observable result, verification method (commands or review procedure), and what to do on failure. Use commands only after confirming they exist in the target environment; include working directory and platform assumptions.
4. **Acceptance and recovery:** checks mapped to each original statement, precise pass/fail gates, tests that must remain green, no-destructive-change guards, rollback/retry boundaries, and conditions requiring escalation instead of guesswork.
5. **Checkpoint / handoff:** last confirmed step, evidence and outputs, next unstarted step, blockers, known changes since plan creation, and affected D/I/P/V reconciliation to perform. Plan step status is evidence-backed and subordinate to the canonical inventory.

A step such as “implement feature” or “test thoroughly” without file-specific action and check is invalid for delegation. Do not manufacture exact patches for unseen code, expected outputs for unrun tests, or acceptance criteria not grounded in the requirement. When facts are insufficient, make the first step a bounded discovery/check and specify a stop-and-escalate condition, rather than guessing.

## Authoring procedure

1. **Resolve:** identify the active workspace routing, affected IDs and existing in-progress work. Read current authoritative references and repository state; note historical/proposed sources separately.
2. **Choose granularity:** split at decisions, independently testable edits, and risky side effects. Prefer one substantial change per step; avoid microsteps for trivial shell commands. Provide paths, patterns, input/output examples and commands only when evidence supports them.
3. **Preflight:** identify unknown design questions, restricted operations, API/credentials, missing tools, user changes, and destructive effects. Escalate irreversible decisions, credentials, source conflicts, or unsupported actions before authorizing execution.
4. **Write:** use the format in [the worked example](../examples/execution-plan.md), replacing fictional paths with actual verified references. Describe alternative paths only where a deterministic condition decides between them.
5. **Self-review:** independently check path existence or explicit creation, step order/dependencies, missing choices, reproducibility on a fresh context, exact statement-to-test coverage, rollback, and re-entry after interruption. Correct defects and repeat the review until no known actionable defects remain.
6. **Handoff:** supply the plan's concrete path and initial step; allow the delegated agent to read the same effective instructions and source evidence. Do not instruct it to execute without inspecting the current state.

## Execution, stopping and re-planning

- Before each step, confirm prerequisites and that relevant input state still matches the planned assumptions. An unrelated commit does not invalidate the plan automatically, but changed target files, requirements, route, policy, acceptance tests, or conflicting user edits do. Compare relevant diffs, not just commit SHA.
- Execute only the next eligible step. Record the observed outcome and evidence; if a step is partly done or its outcome cannot be verified, leave it open and state the exact reason.
- STOP and escalate with paths, observed values and failed checks if a file is missing unexpectedly, authority is conflicting, instructions require an unapproved decision, an unexpected diff appears, a command or permission is unavailable, tests fail outside the documented recovery path, or a dangerous change is required. Do not replace a blocked path with a speculative shortcut.
- Resume by rereading the plan, canonical inventory, current diffs and last evidence. Validate earlier completed steps against changed inputs as needed; do not blindly rerun destructive steps or reset progress.
- After actual repository changes, reconcile only affected D/I/P/V statuses in the canonical inventory using evidence and recompute checkboxes. A checked plan step is never sufficient evidence for I:x or V:x. Report remaining manual checks, blockers, changed paths, and what was not run.
- Re-plan only the affected steps when source evidence changes; preserve history, IDs, and confirmed work. Repeated plan generation on unchanged inputs should produce no speculative extra tasks or churn.

## Validation and cost-benefit pilot (not yet established)

Documentation/contract tests can establish that the plan format and Skill are integrated. They do **not** show that a low-cost model can execute an actual task, nor prove economic savings. Before claiming this outcome, run real delegated tasks covering (a) planning-only research, (b) code+tests, and (c) interrupted or changed-input resumption, using the same baseline and predeclared acceptance checks for planned and unplanned runs.

Record exact model/version, pricing basis, token and tool usage, planning and execution costs, retries, human interventions, elapsed time, successful checks, regressions, and unresolved blockers. Compare total end-to-end cost including creation/review/maintenance of the plan, not execution tokens alone; report failures and cases where a plan costs more. Select the approach on correctness first and cost second. No economic or autonomous-agent success claim is warranted without measured evidence.

## Handoff request

The user or coordinating model can say: “Create or refresh the optional Spectodo execution plan for <scope>/<item IDs> under docs/spectodo-execution/, verify source assumptions and all steps, then hand it to the delegated agent; do not start unrelated implementation.” The delegated agent can be told: “Read effective AGENTS.md, the canonical inventory and the specified plan; verify current preconditions, execute the next authorized step, stop on any unplanned choice, run the listed checks, record evidence, and reconcile D/I/P/V before closing.”
