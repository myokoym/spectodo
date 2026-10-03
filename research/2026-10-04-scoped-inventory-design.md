# Scoped inventories for a shared repository: v0.2 proposal

Date: 2026-10-04

## Summary

This proposal adds explicit scope roots and multiple canonical inventories as an opt-in v0.2 format. Spectodo v0.1 remains stable and unchanged; repositories that do not need separate scopes have no migration requirement.

A repository may either retain a root v0.1 inventory for its existing legacy project while adding independent v0.2 scopes, or deliberately migrate that project to v0.2. Both paths require explicit workspace routing. A nested inventory never silently changes the meaning or progress of another inventory.

## Confirmed constraints

- v0.1 is stable and requires its canonical inventory at the repository root.
- Existing v0.1 repositories must remain valid without edits or migration.
- The format is ordinary Markdown and does not require a parser, renderer, service, or board.
- A shared repository may contain independently managed products that refer to common design documents and policies.
- Scope selection must follow the opened workspace and declared routing, not request wording or a mentioned path.

## Options compared

| Option | Benefit | Cost or failure mode | Assessment |
|---|---|---|---|
| Keep one inventory for independent products | No format or routing change | Requirement IDs, target versions, constraints, and progress become ambiguous or mixed | Reject when products progress independently |
| Keep root v0.1 for the legacy project and add nested v0.2 scopes | No change to stable v0.1 users; supports incremental adoption | Requires explicit project boundaries and a per-constraint migration audit for policies shared with new scopes | Supported compatibility path |
| Migrate all affected inventories to v0.2 scopes | Each inventory matches one independently managed workspace/project | One-time migration must preserve every item, state, and constraint; old root file cannot remain ambiguously canonical | Supported explicit migration path |
| Implicitly inherit all parent constraints into every child | Centralizes shared rules | Forces unrelated or engine-specific parent rules into children and makes overrides ambiguous | Reject |
| Copy every shared constraint into each inventory | Rules are visible beside each project | Copies drift; format does not identify the authoritative copy or sync owner | Reject as default |
| Keep shared policy in one common repository source read by every applicable workspace | One authoritative copy and explicit applicability | Workspace instructions must route and load the shared source; needs an audit | Recommended for genuinely shared constraints |
| Split each product into a repository | Strong Git-root isolation | Duplicates or synchronizes shared project references and adds repository maintenance | Reconsider only when product lifecycle/ownership also separates |

## Decision

v0.2 adds scope identity and repository-wide inventory validation without changing v0.1. Mixed v0.1/v0.2 repositories are allowed only with explicit routing that identifies the legacy project represented by v0.1.

Constraints remain local to their inventory. They do not inherit automatically between parent and child scopes. During a v0.1-to-v0.2 split, each old constraint must be classified as shared policy, scope-local, or explicitly retired/revised. Shared constraints have one authoritative repository-level source that all applicable workspace instructions require agents to read. Scope-local constraints stay with their scope. The migration audit also assigns every old specification item and preserves state only for a one-to-one continuation.

## Why routing belongs to repository instructions

The file format can identify the product represented by an inventory, but it cannot know which working directory or Codex project a user opened. The consuming repository must map each supported active workspace root to exactly one canonical inventory and identify common policy sources. Selecting by prompt wording or whichever file happens to be mentioned can update the wrong product's progress.

For Codex, AGENTS.md can express this mapping without making Codex-specific instructions part of the Spectodo grammar. Other agent systems can use equivalent repository instructions.

## Validation boundary

No parser or CLI is introduced. The bundled Agent Skill owns the repository-wide audit: enumerate SPECTODO.md candidates, distinguish canonical files from explicitly identified examples/fixtures, verify each route and canonical path, then check duplicate v0.2 scope IDs and roots. If that audit cannot resolve a candidate or route, it reports an error instead of guessing.

## Reversibility and migration cost

v0.1 behavior remains unchanged for all existing consumers. A v0.2 repository can return to one root v0.1 inventory only through an explicit reverse migration that reconciles every scope-local item, version, constraint, and progress state. Merely deleting nested files is not a valid rollback because it can lose specification history or divergent progress.