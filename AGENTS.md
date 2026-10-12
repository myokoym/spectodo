# Spectodo agent workspace routing

Canonical language for new installations and deliberate upgrades: spec/language-v0.2.md (stable).
Legacy v0.1 is supported solely under explicit compatibility/migration rules.

| Supported active workspace root | Canonical inventory | Scope ID | Shared policy |
|---|---|---|---|
| . | SPECTODO.md | SPECTODO | none |

The repository root is the active workspace. Research, examples and docs are supporting content, not independent project scopes. The example inventories in examples/ are not canonical and are excluded from scope discovery.

For FIRST-TIME Spectodo installation in another repository, begin with https://github.com/myokoym/spectodo/blob/main/docs/adoption.md. New means no active canonical Spectodo inventory, NOT an empty Git repository. That guide has separate explicit commands for an existing v0.2 re-kickoff and a legacy v0.1 migration; never auto-migrate under the new-install command. For a consumer with no substantive project-specific source or requirements (an empty repository, or generic title-only README), do not install Spectodo or create speculative TODOs. The kickoff is inapplicable until project evidence exists. The paths .agents/skills/spectodo-kickoff/SKILL.md and .agents/skills/spectodo/SKILL.md are source-repository paths, not files that must already exist in the consumer. Fetch a single verified stable-v0.2 source commit first, then install/reconcile the spec and both Skills in the target. Only on an explicit request for detailed planning, fetch/install the optional execution guide and its worked example together from that SAME pinned commit; the default kickoff must not read or install those optional files. Pin that SHA in consumer instructions and reuse it for routine reruns; upstream refresh is separate and explicit. For ongoing reconciliation and audits, read the verified local .agents/skills/spectodo/SKILL.md. Scope switching is based on the active workspace root, never file names mentioned in a prompt.
