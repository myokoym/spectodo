# Example: optional execution plan — planning-only handoff

This is a **fictional consumer repository example**, NOT a canonical inventory and NOT evidence of an actual agent run. Replace all paths, IDs, revisions and checks after inspecting a real repository. The sample assumes the listed files exist and no code has been written.

## Identity and goal
- Scope: PROJECT at repository root (`.`)
- Canonical inventory: `SPECTODO.md`
- Covered item: `PLAN-001`, target version `V0`
- Required outcome: Write reviewable, traceable acceptance criteria for an exhibit concept, without claiming implementation or deployment.
- Authority: `docs/requirements.md` is the current requirement source; `README.md` is the entry point; effective `AGENTS.md` rules take precedence.
- Out of scope: building UI, adding scripts, deploying the application, inventing decisions absent from the source.

## Starting snapshot / preflight
- Revision: fill in actual branch/commit and working-tree status before execution; this fictional example has no verified SHA.
- Known paths to inspect: `AGENTS.md`, `SPECTODO.md`, `docs/requirements.md`, `README.md`.
- Planned output: `docs/exhibit-acceptance.md` (new only if no existing canonical acceptance document covers the same work).
- Preconditions: routing selects PROJECT, PLAN-001 exists, evidence remains authoritative, and there are no conflicting user edits.
- If any condition fails: do not create a competing document or assume contents; escalate with the observed mismatch.

## Ordered executable steps

### Step 1: Resolve and capture requirements
- Prerequisites: effective instructions and target inventory are readable.
- Target: `docs/requirements.md` (read-only), `SPECTODO.md` (read-only).
- Action: record verbatim or accurately paraphrased acceptance-relevant requirements, open decisions, their source locations, and existing D/I/P/V values; do not mark any step as complete on guesses.
- Expected result: a source-to-acceptance checklist including every in-scope current requirement and explicit unresolved decisions.
- Check: reread each source requirement and verify it appears once in the checklist, or has a documented exclusion; ensure no old proposal became binding.
- On failure: stop and report the ambiguous paragraph and conflict, without inventing a criterion.

### Step 2: Add one acceptance document
- Prerequisites: Step 1 confirmed; no existing equivalent acceptance document.
- Target: `docs/exhibit-acceptance.md` (create), `README.md` (only if discoverability needs a link).
- Action: for each confirmed criterion, document initial state/input, expected observable result and evidence needed for review; list open questions separately. Keep implementation and deployment out of scope.
- Expected result: a single readable acceptance document linked to its authoritative source.
- Check: manually match every acceptance criterion against the Step 1 checklist; inspect `git diff --check` in the repository root when git is available, and review the diff for accidental changes.
- On failure: correct only confirmed omissions; if the desired outcome depends on an unresolved design choice, stop for a decision.

### Step 3: Verify and reconcile
- Prerequisites: Step 2 checks pass.
- Target: `SPECTODO.md` and `docs/exhibit-acceptance.md`.
- Action: add the new document as an `@ref` only when relevant; reconcile PLAN-001 D/I/P/V against actual observed evidence. Do not set I:x/P:x solely because a planning document exists.
- Expected result: references resolve, the one-line item remains valid, the checkbox matches the axes, and evidence matches any updated status.
- Check: inspect the full modified item and associated documents; run any existing Spectodo validation command *only if already installed and known to be safe*; verify no unrelated inventory IDs changed.
- On failure: leave unsupported statuses unchanged and record the exact missing verification.

## Acceptance, rollback and stopping
- Acceptance: every current in-scope requirement has a traceable, testable criterion; no code or deployment is claimed; no unrelated work was modified.
- Failure gate: contradictory source authority, missing file, unexpected modifications, failed existing validation, or a requested new design decision => STOP and report.
- Recovery: discard only new uncommitted changes made by this plan after inspecting the diff; never overwrite pre-existing user changes. Retry only the affected unchecked step.

## Checkpoint / handoff
- Last verified step: none — example not executed.
- Evidence / checks actually run: none.
- Next step: Step 1, after checking the consumer's real state.
- Blockers: to be determined; no invented source SHA or acceptance result.
- Canonical reconciliation: pending until execution supplies evidence.
