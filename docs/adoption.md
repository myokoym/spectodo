# Adopting Spectodo v0.1

## Canonical inventory

Use exactly one canonical Spectodo inventory at the repository root.

The filename MUST end in:

```text
.spectodo.md
```

The basename is project-chosen. Examples:

```text
project.spectodo.md
app.spectodo.md
game.spectodo.md
```

A root-level `*.spectodo.md` file is the canonical inventory. Files with the same suffix under `examples/`, `fixtures/`, or other subdirectories are non-canonical supporting files.

Do not create a second root-level Spectodo inventory. If the project later proves too large for one file, use the future splitting mechanism only after that mechanism is defined by a later Spectodo version.

## Repository setup

1. Add one root-level `*.spectodo.md` file.
2. Follow [Spectodo Language v0.1](../spec/language-v0.1.md).
3. Add the repository Agent Skill at `.agents/skills/spectodo/SKILL.md` when agent-assisted maintenance is desired.
4. Keep design notes, implementation notes, work logs, and discussion outside the inventory; link them with `@ref` only when useful.
5. Treat ChatGPT/agents as the primary updaters. Human direct source editing is not required.
6. For ordinary human inspection, use standard rendered Markdown.

## Agent discovery

When locating the canonical inventory:

1. Search the repository root for files ending in `.spectodo.md`.
2. If exactly one exists, use it as the canonical inventory.
3. Ignore matching files below subdirectories for canonical discovery.
4. If more than one root match exists, treat that as an ambiguous repository state and do not guess.
5. Do not silently create another inventory when a canonical root file already exists.

## This repository

This repository dogfoods the convention with:

```text
project.spectodo.md
```
