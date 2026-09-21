# Spectodo

Spectodo is an experimental Markdown-native format for keeping specification items and their implementation progress in one persistent inventory that can be read and updated by humans, ChatGPT, and coding agents.

Spectodo Language v0.1 is stable and intentionally usable as ordinary Markdown. A dedicated renderer, CLI, database, or board is not required.

ChatGPT/agents are the primary updaters. Human direct source editing is not a required workflow. For smartphone use, the v0.1 target surfaces are ChatGPT Android for operation and GitHub Android's rendered Markdown view for human inspection.

## Spectodo v0.1

Each requirement is one Markdown task-list item on one source line.

```md
# Versions
- V0: Prototype
- V1: MVP

# Constraints
- FORMAT-001 専用CLIを前提にしない

## AUTH: 認証
- [ ] AUTH-001 [V0] [P1] メールアドレスとパスワードでログインできる | D:x I:x P:x V:~ | !実機でのログイン検証が未完了
```

Current semantics:

- optional `# Constraints` records enduring project-wide invariants without checkbox/version/priority/progress
- requirements remain the progress-tracked records
- `V0`, `V1`, ... = target version
- without an explicit target in the current work context, the default active version is the lowest declared version containing an incomplete requirement
- `D:.` defines a not-yet-started requirement for new-Design selection
- `P1`, `P2`, ... = priority for selecting the next not-yet-started requirement to begin designing within the active version
- `D` = Design
- `I` = Implementation
- `P` = Deployment
- `V` = Validation
- status values: `x` done, `~` partial, `>` in progress, `.` todo, `-` not applicable
- the leading Markdown checkbox is derived from D/I/P/V and is `[x]` only when every axis is `x` or `-`
- `~` requires a concise `!gap`
- optional `@ref` values point to repository-relative paths or URLs
- completed requirements remain in the inventory

Priority does not interrupt active work and is not an automatic confirmation gate. When a new requirement is selected, Design is the normal point to review its necessity, scope, target version, and specification.

## Files

- [Spectodo Language v0.1](spec/language-v0.1.md)
- [Adopting Spectodo v0.1](docs/adoption.md)
- [Example inventory](examples/SPECTODO.md)
- [Spectodo self-inventory](SPECTODO.md)
- [Repository Agent Skill](.agents/skills/spectodo/SKILL.md)
- [Format research](research/2026-09-20-format-direction.md)
- [Naming decision](research/2026-09-20-naming-decision.md)
- [TODO / task-management literature review](research/2026-09-20-todo-task-management-literature-review.md)
- [Initial design history](research/2026-09-20-initial-design-history.md)
- [Agent / scale validation](research/2026-09-21-agent-scale-validation.md)
- [GitHub Android rendered-Markdown validation](research/2026-09-21-github-android-validation.md)

## Status

Spectodo Language v0.1 is stable. The current repository dogfoods the format itself.

The source of truth for syntax and semantics is `spec/language-v0.1.md`. The source of truth for this repository's current work state is `SPECTODO.md`.

Historical research and rejected alternatives are preserved under `research/`; they are not normative unless the current language specification explicitly adopts them.
