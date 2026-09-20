# Spectodo Language v0.1 (Draft)

> Status: experimental draft. This document defines the machine-readable Markdown subset currently being evaluated for Spectodo. It is not a stable public specification yet.

## 1. Design goals

The format MUST remain useful when opened as ordinary Markdown in GitHub or ChatGPT.

It MUST NOT require a dedicated renderer, CLI, database, board, or web application.

The canonical file is an inventory of enduring project constraints plus application specification items and their progress. It is not a design notebook, implementation journal, discussion log, or issue tracker.

Core constraints:

- human direct source editing is not a required workflow; ChatGPT/agents are the primary updaters
- the primary smartphone operation surface is ChatGPT Android
- the primary smartphone human-inspection surface is rendered Markdown in GitHub Android
- raw/source editing, GitHub's edit UI, mobile-web rendering, and custom renderers are not v0.1 smartphone acceptance surfaces
- one specification item = one Markdown task-list item = one source line
- a leading standard Markdown checkbox provides immediate overall TODO readability
- ASCII-only structural syntax; natural-language text may use Unicode
- stable IDs for categories, versions, and items
- category-oriented reading order
- target version and numeric priority are item attributes
- design / implementation / deployment / validation are independent progress axes
- completed items remain in the inventory
- detailed information is referenced, not embedded

## 2. Document shape

A document consists of:

1. one `# Versions` section
2. zero or one `# Constraints` section
3. one or more category sections
4. zero or more blank lines between sections

Example:

```md
# Versions
- V0: Prototype
- V1: MVP

# Constraints
- FORMAT-001 専用CLIを前提にしない
- FORMAT-002 完了済み仕様項目をinventoryから削除しない

## AUTH: 認証
- [ ] AUTH-001 [V0] [P1] メールアドレスとパスワードでログインできる | D:x I:x P:x V:~ | !実機でのログイン検証が未完了
- [x] AUTH-002 [V0] [P1] ログアウトできる | D:x I:x P:x V:x

## DATA: データ
- [ ] DATA-001 [V1] [P2] 設定を端末に保存できる | D:x I:~ P:- V:. | !保存形式の移行処理が未実装 | @docs/storage.md
```

No dedicated rendering step is required. Standard Markdown rendering is the primary human view.

For v0.1 smartphone validation, the surfaces are intentionally narrow:

- operation: ChatGPT Android, with ChatGPT/agent reading and updating the canonical inventory
- human inspection: GitHub Android rendered Markdown view
- out of scope for acceptance: direct source editing, GitHub edit UI, mobile browser rendering, and custom renderers

The format MAY remain directly editable as plain text, but direct human editing is not a usability requirement.

## 3. Versions

Version declarations appear only under the exact H1 heading:

```md
# Versions
```

Each version declaration is exactly one list item:

```text
- <VERSION_ID>: <LABEL>
```

Example:

```md
- V0: Prototype
- V1: MVP
- V2: Release
```

### 3.1 Version ID

Draft grammar:

```text
VERSION_ID := "V" DIGIT+
```

Version IDs MUST be unique within the document.

A specification item MUST reference exactly one declared version.

The numeric part expresses ordered target versions. Lower version numbers precede higher version numbers.

A version identifies the intended product/scope target for an item. It is NOT the item's current lifecycle progress; D/I/P/V represent that separately.

The label is display text and MAY contain Unicode.

### 3.2 Active target version

v0.1 does not add a persistent active-version marker.

For work selection:

1. If the current user/agent work context explicitly names a target version, that version is active for that work.
2. Otherwise, the default active target version is the lowest declared version that contains at least one incomplete specification item.
3. A specification item is incomplete when its derived overall checkbox is `[ ]`.
4. Constraints do not participate in active-version selection.
5. If every specification item is complete, there is no default active target version.

This default keeps the inventory self-contained without adding another mutable status field. Explicitly selecting a later version is allowed and does not rewrite item versions by itself.

## 4. Constraints

The optional exact H1 heading is:

```md
# Constraints
```

A constraint is one enduring project-wide invariant:

```text
- <CONSTRAINT_ID> <STATEMENT>
```

Constraints are not work items. They MUST NOT have a Markdown checkbox, target version, priority, or D/I/P/V progress axes.

Use a constraint only for a rule that is intended to remain continuously true while the inventory is in use. A capability that can be designed, implemented, deployed, or validated is a specification item instead.

General design rationale or non-enforceable principles belong in referenced documentation, not in the constraint section.

Constraint IDs:

- MUST use the same stable symbolic-ID shape as item IDs: `UPPER_ID "-" DIGIT DIGIT DIGIT`
- MUST be unique within the document
- MUST NOT collide with a specification item ID
- do not need to correspond to a category

Constraint statements:

- MUST be non-empty and occupy one source line
- MUST describe the invariant directly
- MUST NOT contain progress state, work logs, or rationale
- are version-independent in v0.1

Example:

```md
# Constraints
- FORMAT-001 専用CLIを前提にしない
- FORMAT-002 完了済み仕様項目をinventoryから削除しない
```

## 5. Priority

Every specification item has one numeric priority marker.

Draft grammar:

```text
PRIORITY := "P" POSITIVE_INTEGER
```

Examples:

```text
P1
P2
P3
```

Lower numbers have higher priority: P1 precedes P2, P2 precedes P3.

Priority has one primary operational meaning in v0.1:

> When choosing the next not-yet-started specification item to begin designing within the active target version, prefer the lowest priority number across categories.

For this rule, an item is `not-yet-started` iff its Design axis is exactly `D:.`. Design is the entry point for new requirement work in v0.1. Items with `D:x`, `D:~`, `D:>`, or `D:-` are therefore not candidates for the new-Design priority rule.

If more than one eligible item has the same priority, v0.1 does not assign semantic meaning to their source order. The user/agent MAY choose among equal-priority candidates based on current context; a future version may define an additional tie-break only if concrete use shows that it is needed.

If the active target version still has incomplete specification items but none has `D:.`, the new-Design priority rule has no candidate. That MUST NOT by itself advance work to a later version. Previously started incomplete work remains part of the active version and may be resumed based on the current work context. Priority does not retroactively preempt or reorder started work.

Priority MUST NOT be interpreted as a progress state.

Priority MUST NOT by itself interrupt an item that is already being designed or progressed.

Crossing from P1 to P2 MUST NOT create an automatic confirmation gate. Starting the next item at Design is itself the normal review point for its necessity, scope, target version, and specification.

If design work shows that an item's target version or necessity is wrong, the inventory MAY be revised based on that design decision. Priority alone does not decide postponement or removal.

v0.1 intentionally does not assign fixed labels such as high / medium / low to numeric priorities.

## 6. Categories

A category is an H2 heading:

```text
## <CATEGORY_ID>: <LABEL>
```

Example:

```md
## AUTH: 認証
```

### 6.1 Category ID

Draft grammar:

```text
CATEGORY_ID := UPPER (UPPER | DIGIT | "-")*
```

Category IDs MUST be unique.

Category labels are display text and MAY contain Unicode.

The category ID is stable identity. Renaming the label MUST NOT require changing item IDs.

## 7. Specification items

Each specification item MUST occupy exactly one source line.

Canonical shape:

```text
- [<OVERALL>] <ITEM_ID> [<VERSION_ID>] [<PRIORITY>] <STATEMENT> | D:<STATUS> I:<STATUS> P:<STATUS> V:<STATUS> [ | !<GAP> ] [ | <REFS> ]
```

The leading checkbox is mandatory and uses standard Markdown task-list syntax.

`[x]` means the specification item is complete overall. `[ ]` means it is not complete overall.

The checkbox is a derived human-facing summary, not an independent status field:

- `[x]` MUST be used iff every progress axis is either `x` (done) or `-` (not applicable).
- `[ ]` MUST be used if any progress axis is `~`, `>`, or `.`.
- a parser/validator MUST reject a checkbox that disagrees with the progress axes.

This deliberate redundancy exists to make the inventory function as a TODO list for humans while preserving the multi-axis state as the detailed source of truth.

Example:

```md
- [ ] AUTH-001 [V1] [P1] メールアドレスとパスワードでログインできる | D:x I:x P:x V:~ | !パスワード再設定の実機検証が未完了 | @docs/auth.md
```

### 7.1 Item ID

An item ID is scoped by category identity:

```text
ITEM_ID := CATEGORY_ID "-" DIGIT DIGIT DIGIT
```

Examples:

```text
AUTH-001
AUTH-002
DATA-017
```

An item's prefix MUST equal the current category ID.

Item IDs MUST be unique within the document.

An existing ID MUST NOT be reused for a different specification after deletion or scope change.

### 7.2 Statement

`STATEMENT` is the actual concise specification, not a separate title.

Good:

```text
メールアドレスとパスワードでログインできる
```

Avoid:

```text
メールログイン
```

when that name alone does not specify the behavior.

A statement:

- MUST be non-empty
- MUST fit on one source line
- MUST describe current or intended application behavior/capability
- MUST NOT contain design rationale, implementation notes, discussion history, or work logs
- MUST escape a literal `|` as `\|`

## 8. Overall checkbox

The overall checkbox exists for immediate visual scanning in ordinary Markdown renderers.

Examples:

```md
- [x] AUTH-002 [V0] [P1] ログアウトできる | D:x I:x P:x V:x
- [ ] AUTH-001 [V0] [P1] メールアドレスとパスワードでログインできる | D:x I:x P:x V:~ | !実機でのログイン検証が未完了
```

The overall checkbox MUST NOT be edited independently of the progress axes.

## 9. Progress axes

v0.1 defines four fixed axes in a fixed order:

```text
D = design
I = implementation
P = deployment
V = validation
```

The exact canonical sequence is:

```text
D:<STATUS> I:<STATUS> P:<STATUS> V:<STATUS>
```

All four axes MUST be present on every specification item.

The fixed order is intentional: it makes records predictable without requiring a separate schema header.

Project-level custom axes are intentionally NOT part of v0.1. They may be reconsidered only if concrete projects demonstrate a need.

## 10. Status alphabet

Structural status values are ASCII only.

```text
x = done
~ = partial
> = in progress
. = todo
- = not applicable
```

Grammar:

```text
STATUS := "x" | "~" | ">" | "." | "-"
```

### 10.1 Semantics

#### `x` done

The axis is complete for the specification item.

For implementation, UI presence, a mock, fixture, placeholder, or hard-coded demonstration alone MUST NOT be treated as complete system implementation.

For validation, implementation existence alone MUST NOT be treated as validation.

#### `~` partial

A meaningful subset exists, but the axis is not complete.

If any axis is `~`, a gap segment (`!...`) is REQUIRED.

#### `>` in progress

Active work is currently underway on that axis, but the completed subset is not being asserted as the stable meaning of the status.

This value is transient. If the work stops while only part is actually present, the status SHOULD become `~`.

#### `.` todo

No qualifying work/result exists yet for the axis.

#### `-` not applicable

The axis does not apply to this item.

It MUST NOT be used merely because work is deferred.

## 11. Gap segment

Optional shape:

```text
 | !<GAP>
```

Example:

```text
 | !パスワード再設定の実機検証が未完了
```

Rules:

- REQUIRED when at least one progress axis is `~`
- MAY be present for `>` when a concise remaining scope is useful
- MUST remain concise
- MUST describe what is missing, not why a design decision was made
- MUST NOT become a work log
- MUST escape a literal `|` as `\|`

Only one gap segment is allowed in v0.1. Multiple gaps MUST be compressed into a concise statement or moved to a referenced document.

## 12. Reference segment

References are optional and come last.

Shape:

```text
 | @<REF> [@<REF> ...]
```

Examples:

```text
 | @docs/auth.md
 | @docs/auth.md @src/auth/session.ts
 | @https://github.com/example/repo/issues/12
```

Rules:

- references MUST contain no ASCII whitespace
- repository-relative paths are preferred for repository-local sources
- URLs are allowed
- spaces in external URLs/paths MUST be percent-encoded
- references contain locations only; commentary belongs elsewhere

## 13. Segment order

v0.1 uses strict ordering.

```text
item core
| progress
| optional gap
| optional references
```

Valid:

```md
- [ ] AUTH-001 [V1] [P1] メールアドレスとパスワードでログインできる | D:x I:x P:x V:~ | !再設定フローの実機検証 | @docs/auth.md
```

Invalid:

```md
- [ ] AUTH-001 [V1] [P1] メールアドレスとパスワードでログインできる | @docs/auth.md | D:x I:x P:x V:~ | !実機でのログイン検証が未完了
```

Strict order reduces parser ambiguity and agent-generated format drift.

## 14. Formal draft grammar

The grammar below is normative for the v0.1 experiment except where Markdown parsing itself is concerned.

```ebnf
document       = versions, blank*,
                 [ constraints, blank* ],
                 category, { blank*, category }, blank* ;

versions       = "# Versions", newline,
                 version, { newline, version } ;

constraints    = "# Constraints", newline,
                 constraint, { newline, constraint } ;

constraint     = "- ", constraint_id, " ", constraint_statement ;

version        = "- ", version_id, ": ", label ;

category       = "## ", category_id, ": ", label, newline,
                 item, { newline, item } ;

item           = "- [", overall, "] ", item_id,
                 " [", version_id, "]",
                 " [", priority, "] ",
                 statement,
                 " | ",
                 progress,
                 [ " | !", gap ],
                 [ " | ", refs ] ;

progress       = "D:", status, " ",
                 "I:", status, " ",
                 "P:", status, " ",
                 "V:", status ;

refs           = ref, { " ", ref } ;
ref            = "@", reference ;

overall        = "x" | " " ;
status         = "x" | "~" | ">" | "." | "-" ;

version_id     = "V", digit, { digit } ;
priority       = "P", positive_integer ;
positive_integer = nonzero_digit, { digit } ;
category_id    = upper, { upper | digit | "-" } ;
constraint_id  = upper_id, "-", digit, digit, digit ;
upper_id       = upper, { upper | digit | "-" } ;
item_id        = category_id, "-", digit, digit, digit ;

label          = text_no_newline ;
constraint_statement = text_no_newline ;
statement      = escaped_text_no_pipe_delimiter ;
gap            = escaped_text_no_pipe_delimiter ;
reference      = non_whitespace_text ;

blank          = newline ;
newline        = "\n" ;
upper          = "A" | "B" | ... | "Z" ;
digit          = "0" | "1" | ... | "9" ;
nonzero_digit  = "1" | "2" | ... | "9" ;
```

## 15. Validation errors

A validator or Agent Skill MUST treat at least the following as errors:

- overall checkbox does not match the derived completion state from D/I/P/V
- duplicate version ID
- duplicate constraint ID
- constraint ID collides with a specification item ID
- checkbox/version/priority/progress syntax appears on a constraint
- duplicate category ID
- duplicate item ID
- item ID prefix does not match current category ID
- unknown version ID
- missing or malformed priority
- missing progress axis
- progress axes out of order
- unknown status symbol
- `~` exists without a gap segment
- reference segment appears before gap
- nested list under a specification item
- a specification item spans multiple source lines
- unescaped structural delimiter inside statement/gap
- unknown extra field/segment

Warnings MAY include:

- statement appears to be only a vague title
- `>` remains unchanged for an unusually long period
- reference path appears missing
- `x` is asserted without evidence during reconciliation

## 16. What is intentionally excluded

v0.1 does not encode:

- non-enforceable principles or design rationale as structured records
- design notes
- implementation plans
- implementation notes
- meeting/discussion history
- comments
- final summaries
- estimates
- assignees
- issue state
- commit history
- arbitrary labels/tags
- dependencies
- custom progress axes

These may exist elsewhere and be referenced if needed.

## 17. Renderer policy

Spectodo v0.1 has no custom renderer.

The Markdown source is the canonical human-readable representation.

A future renderer MAY provide filtered or summarized views, but:

- it MUST parse the canonical language
- it MUST NOT become the source of truth
- the canonical file MUST remain usable without it

## 18. Open questions

The following remain experimental rather than fixed:

- whether `>` (in progress) is worth keeping as a first-class status
- whether item numbering should always be three digits
- whether version declarations need optional goal/exit metadata
- whether priority should have a bounded range or remain an open positive integer
- whether equal-priority new-work selection needs a standardized tie-break
- whether very large inventories need a standardized category-splitting mechanism
- whether a future version should support optional project-defined axes
