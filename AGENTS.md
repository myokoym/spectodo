# Spectodo agent workspace routing

Canonical language for new work: spec/language-v0.2.md (stable).
Legacy v0.1 is supported solely under explicit compatibility/migration rules.

| Supported active workspace root | Canonical inventory | Scope ID | Shared policy |
|---|---|---|---|
| . | SPECTODO.md | SPECTODO | none |

The repository root is the active workspace. Research, examples and docs are supporting content, not independent project scopes. The example inventories in examples/ are not canonical and are excluded from scope discovery.

To install or refresh Spectodo in another repository, follow .agents/skills/spectodo-kickoff/SKILL.md. For ongoing reconciliation and audits, read .agents/skills/spectodo/SKILL.md. Scope switching is based on the active workspace root, never file names mentioned in a prompt.
