# Adopting Spectodo v0.1

## Canonical inventory

Use one canonical Spectodo inventory at the repository root:

```text
SPECTODO.md
```

`SPECTODO.md` is the project-level specification/progress inventory and is intentionally prominent alongside other repository-level documents such as `README.md`.

Do not create a second canonical inventory under another filename.

Spectodo v0.1 does not standardize a generic filename suffix for secondary files. Supporting examples or fixtures should be named according to their role and directory context rather than by inventing a separate canonical-looking suffix.

## Repository setup

1. Add `SPECTODO.md` at the repository root.
2. Follow [Spectodo Language v0.1](../spec/language-v0.1.md).
3. Add the repository Agent Skill at `.agents/skills/spectodo/SKILL.md` when agent-assisted maintenance is desired.
4. Keep design notes, implementation notes, work logs, and discussion outside the inventory; link them with `@ref` only when useful.
5. Treat ChatGPT/agents as the primary updaters. Human direct source editing is not required.
6. For ordinary human inspection, use standard rendered Markdown.

## Agent discovery

When locating the canonical inventory:

1. Look for root-level `SPECTODO.md`.
2. If it exists, use it as the canonical inventory.
3. Do not treat supporting files under directories such as `examples/` or `fixtures/` as the canonical project inventory.
4. Do not silently create another inventory when `SPECTODO.md` already exists.
5. If `SPECTODO.md` is absent, report that state rather than guessing another file is canonical.

## This repository

This repository dogfoods the convention with root-level `SPECTODO.md`.
