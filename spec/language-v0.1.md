# Spectodo Language v0.1 (Draft)

> Status: experimental draft. This document defines the machine-readable Markdown subset currently being evaluated for Spectodo. It is not a stable public specification yet.

## 1. Design goals

The format MUST remain useful when opened as ordinary Markdown in GitHub or ChatGPT.

It MUST NOT require a dedicated renderer, CLI, database, board, or web application.

The canonical file is an inventory of application specification items and their progress. It is not a design notebook, implementation journal, discussion log, or issue tracker.

Core constraints:

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
2. one or more category sections
3. zero or more blank lines between sections

Example:

```md
# Versions
- V0: Prototype
- V1: MVP

## AUTH: 認証
- [ ] AUTH-001 [V0] [P1] メールアドレスとパスワードでログインできる | D:x I:x P:x V:~ | !実機でのログイン検証が未完了
- [x] AUTH-002 [V0] [P1] ログアウトできる | D:x I:x P:x V:x

## DATA: データ
- [ ] DATA-001 [V1] [P2] 設定を端末に保存できる | D:x I:~ P:- V:. | !保存形式の移行処理が未実装 | @docs/storage.md
```

No dedicated rendering step is required. Standard Markdown rendering is the primary human view.

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

## 4. Priority

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

Priority MUST NOT be interpreted as a progress state.

Priority MUST NOT by itself interrupt an item that is already being designed or progressed.

Crossing from P1 to P2 MUST NOT create an automatic confirmation gate. Starting the next item at Design is itself the normal review point for its necessity, scope, target version, and specification.

If design work shows that an item's target version or necessity is wrong, the inventory MAY be revised based on that design decision. Priority alone does not decide postponement or removal.

v0.1 intentionally does not assign fixed labels such as high / medium / low to numeric priorities.

## 5. Categories

A category is an H2 heading:

```text
## <CATEGORY_ID>: <LABEL>
```

Example:

```md
## AUTH: 認証
```

### 5.1 Category ID

Draft grammar:

```text
CATEGORY_ID := UPPER (UPPER | DIGIT | "-")*
```

Category IDs MUST be unique.

Category labels are display text and MAY contain Unicode.

The category ID is stable identity. Renaming the label MUST NOT require changing item IDs.

## 6. Specification items

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

### 6.1 Item ID

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

### 6.2 Statement

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

## 7. Overall checkbox

The overall checkbox exists for immediate visual scanning in ordinary Markdown renderers.

Examples:

```md
- [x] AUTH-002 [V0] [P1] ログアウトできる | D:x I:x P:x V:x
- [ ] AUTH-001 [V0] [P1] メールアドレスとパスワードでログインできる | D:x I:x P:x V:~ | !実機でのログイン検証が未完了
```

The overall checkbox MUST NOT be edited independently of the progress axes.

## 8. Progress axes

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

## 9. Status alphabet

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

### 9.1 Semantics

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

## 10. Gap segment

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

## 11. Reference segment

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

## 12. Segment order

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

## 13. Formal draft grammar

The grammar below is normative for the v0.1 experiment except where Markdown parsing itself is concerned.

```ebnf
document       = versions, blank*, category, { blank*, category }, blank* ;

versions       = "# Versions", newline,
                 version, { newline, version } ;

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
item_id        = category_id, "-", digit, digit, digit ;

label          = text_no_newline ;
statement      = escaped_text_no_pipe_delimiter ;
gap            = escaped_text_no_pipe_delimiter ;
reference      = non_whitespace_text ;

blank          = newline ;
newline        = "\n" ;
upper          = "A" | "B" | ... | "Z" ;
digit          = "0" | "1" | ... | "9" ;
nonzero_digit  = "1" | "2" | ... | "9" ;
```

## 14. Validation errors

A validator or Agent Skill MUST treat at least the following as errors:

- overall checkbox does not match the derived completion state from D/I/P/V
- duplicate version ID
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

## 15. What is intentionally excluded

v0.1 does not encode:

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

## 16. Renderer policy

Spectodo v0.1 has no custom renderer.

The Markdown source is the canonical human-readable representation.

A future renderer MAY provide filtered or summarized views, but:

- it MUST parse the canonical language
- it MUST NOT become the source of truth
- the canonical file MUST remain usable without it

## 17. Open questions

The following remain experimental rather than fixed:

- whether `>` (in progress) is worth keeping as a first-class status
- whether item numbering should always be three digits
- whether version declarations need optional goal/exit metadata
- whether priority should have a bounded range or remain an open positive integer
- whether very large inventories need a standardized category-splitting mechanism
- whether a future version should support optional project-defined axes
