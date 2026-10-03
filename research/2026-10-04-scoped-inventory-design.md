# Scoped inventories for a shared repository: v0.2 proposal

Date: 2026-10-04

## Summary

This proposal adds a small scope declaration to Spectodo while preserving the existing v0.1 root inventory unchanged. Each scope has one canonical SPECTODO.md at its declared repository-relative root. Scope identity and progress do not inherit between parent and nested inventories.

The format specifies scope identity and boundaries. A repository's AGENTS.md or equivalent instructions map an actual workspace root to one inventory. Request wording or a referenced file path is not sufficient to switch scopes.

## Confirmed constraints

- v0.1 is stable and explicitly locates its canonical inventory at the repository root.
- Existing projects must remain valid v0.1 projects without migration.
- The format is ordinary Markdown and does not require a parser, renderer, service, or board.
- A shared repository can contain products whose requirements and release states must remain independent while still referring to common design documents.

## Options compared

| Option | Benefit | Cost or failure mode | Assessment |
|---|---|---|---|
| Keep one root inventory | No new language or routing rule | Independent products share requirement IDs, version targets, and completion state | Not suitable for separate product scopes |
| Use a nested v0.1 inventory | Root-local files are easy to find | Violates the v0.1 root-location rule and creates an undocumented second canonical file | Reject |
| Split each product into a repository | Git roots enforce strong separation | Duplicates or synchronizes common references and adds repository maintenance not needed for the current case | Valid alternative when product lifecycle/release ownership also separates |
| Add explicit v0.2 scope roots | Preserves one repository and v0.1 behavior while separating independent products | Requires project instructions to map each active workspace to exactly one scope | Recommended |

## Decision boundary

v0.2 is a complete, standalone versioned specification. Repeating unchanged v0.1 rules is intentional: the repository requires each version's syntax and semantics to be readable from that version's single specification file.

v0.2 changes only document placement and scope identity:

- A v0.2 inventory starts with a single # Scope declaration.
- Its canonical path is derived from its repository-relative scope root.
- Scope IDs are unique across v0.2 inventories in one repository.
- Version, category, constraint, item IDs and progress remain local to each inventory.
- Nested scopes are allowed, but no state or constraints are inherited.
- The format requires an explicit repository-level routing rule; the format itself does not assume one agent product.

All v0.1 item syntax, priorities, constraints, progress axes, verification meanings, and reference rules remain unchanged.

## Why routing belongs to repository instructions

The file format can identify which product an inventory belongs to, but it cannot know which working directory or Codex project a user opened. The consuming repository must declare that mapping. Selecting by prompt words or whichever file happens to be mentioned can update the wrong product's progress. In Codex, AGENTS.md can map a workspace root to a Scope ID without making Codex-specific instructions part of the Markdown grammar.

## Chosen boundaries

- Scope paths exclude whitespace, matching v0.1 reference paths and keeping the declaration a single unquoted line. A future need to represent a path with spaces would require an explicit encoding rule.
- Workspace routing uses the active workspace root exactly. There is no per-request scope override; changing scopes requires opening the declared scope root.
- Parent and child directories may each own an inventory, but no requirement, constraint, version, or progress is inherited across that boundary.
- These choices keep scope selection inspectable and prevent a task mention from silently updating another product's progress.
