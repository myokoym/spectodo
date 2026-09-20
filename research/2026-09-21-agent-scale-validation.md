# Spectodo Agent / Scale Validation

> Date: 2026-09-21
>
> Scope: validate selected v0.1 Agent Skill and scale behaviors without persisting intentionally malformed inventories or a 100+ item fixture in the canonical repository state.

## 1. Agent audit cases

A copy of the official sample was modified in memory for each case and audited against the v0.1 structural rules.

| Case | Expected result | Observed |
|---|---|---|
| duplicate item ID | reject duplicate ID | `duplicate-item:AUTH-002` |
| unknown version | reject undeclared version | `unknown-version:AUTH-003:V9` |
| missing progress axis | reject malformed record | malformed record detected |
| partial without gap | reject `~` without `!gap` | `missing-gap:AUTH-004` |
| checkbox mismatch | reject checkbox/progress disagreement | `checkbox-mismatch:AUTH-004` |

The official sample itself remained structurally valid.

## 2. Implementation vs validation separation

The official sample contains incomplete records where implementation progress and validation progress differ. This confirms that Agent handling does not need to collapse implementation existence into validation completion.

Examples include records with implementation partial/in-progress while validation remains todo, alongside completed records where validation is explicitly complete.

## 3. Inventory log exclusion

The official sample was checked for nested notes and inline design / implementation / work-log patterns. None were present. The Agent Skill also explicitly prohibits adding such logs to specification records.

## 4. 100+ item source-line scaling

A temporary 120-requirement inventory was generated in memory using canonical one-line records.

Observed:

- requirements: 120
- requirement source lines: 120
- fixed structural overhead lines: 7
- one requirement per source line: preserved

This validates linear source-line growth for the representation itself. It does not validate smartphone rendered readability; that remains a separate requirement.

## 5. Result

Evidence from these checks supports completion of:

- AGENT-004
- AGENT-005
- AGENT-006
- AGENT-007
- VALID-003

For AGENT-007, the official sample is used as the Agent Skill selection fixture: within the default active version V0, the not-yet-started candidates are DATA-003 (P1) and AUTH-004 (P2), so the lower numeric priority selects DATA-003 across categories. A separate "real project" prerequisite is not part of the requirement itself.

VALID-004 remains incomplete because GitHub Android rendered-Markdown usability has not been observed directly.
