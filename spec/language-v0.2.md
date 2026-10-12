# Spectodo Language v0.2

> Status: stable v0.2 (2026-10-12). This is the complete normative specification for new Spectodo integrations. Stable v0.1 remains a supported, unmodified legacy format; no silent reinterpretation is permitted.

## 1. Design goals

The format MUST remain useful when opened as ordinary Markdown in GitHub or ChatGPT.

It MUST NOT require a dedicated renderer, CLI, database, board, or web application.

The canonical file is an inventory of enduring constraints within its declared scope plus application specification items and their progress. It is not a design notebook, implementation journal, discussion log, or issue tracker.

Core constraints:

- human direct source editing is not a required workflow; ChatGPT/agents are the primary updaters
- the primary smartphone operation surface is ChatGPT Android
- the primary smartphone human-inspection surface is rendered Markdown in GitHub Android
- raw/source editing, GitHub's edit UI, mobile-web rendering, and custom renderers are not v0.2 smartphone acceptance surfaces
- one specification item = one Markdown task-list item = one source line
- a leading standard Markdown checkbox provides immediate overall TODO readability
- ASCII-only structural syntax; natural-language text may use Unicode
- stable IDs for scopes, categories, versions, and items
- category-oriented reading order
- target version and numeric priority are item attributes
- design / implementation / deployment / verification are independent progress axes
- completed items remain in the inventory
- detailed information is referenced, not embedded

## 2. Document shape

A v0.2 inventory MUST begin with exactly one Scope section. Its canonical file is named SPECTODO.md and is located at its declared scope root relative to the Git repository root.

A repository MAY retain a legacy root v0.1 inventory while adopting v0.2 for separately managed scopes. New integrations MUST use stable v0.2, including repositories with one project. Retaining a legacy v0.1 inventory MUST NOT change its syntax or semantics. Repository instructions MUST explicitly identify the legacy project represented by that v0.1 inventory and route only workspaces belonging to that project to it. Adding a nested v0.2 inventory MUST NOT silently suspend or transfer any v0.1 record. A repository MUST NOT keep two canonical inventories for the same scope root.

A v0.2 document consists of:

1. one # Scope section containing exactly one scope declaration
2. zero or more blank lines
3. one # Versions section
4. zero or one # Constraints section
5. one or more category sections
6. zero or more blank lines between sections

No free-form text or additional list items are allowed in the Scope section. For a single-project repository, the canonical inventory MUST be root SPECTODO.md with declaration '- PROJECT: .' (or another stable scope ID); a project MUST NOT fall back to v0.1 because it has only one scope.

Example:

~~~md
# Scope
- STOREFRONT: apps/storefront/

# Versions
- V0: Storefront prototype

# Constraints
- SCOPE-001 This inventory records only storefront requirements

## WEB: Storefront
- [ ] WEB-001 [V0] [P1] A visitor can browse products in the storefront | D:. I:. P:. V:. | @docs/product-policy.md
~~~

No dedicated rendering step is required. Standard Markdown rendering is the primary human view.

For v0.2 smartphone validation, the surfaces are intentionally narrow:

- operation: ChatGPT Android, with ChatGPT/agent reading and updating the selected canonical inventory
- human inspection: GitHub Android rendered Markdown view
- out of scope for acceptance: direct source editing, GitHub edit UI, mobile browser rendering, and custom renderers

The format MAY remain directly editable as plain text, but direct human editing is not a usability requirement.

## 2.1 Scope declaration

The Scope section contains one declaration in this form:

~~~text
- <SCOPE_ID>: <SCOPE_ROOT>
~~~

Grammar:

~~~text
scope_id = upper, { upper | digit | "-" } ;
scope_root = "." | repository_relative_directory ;
repository_relative_directory = path_segment, { "/", path_segment }, "/" ;
~~~

Rules:

- SCOPE_ID MUST be stable and unique among v0.2 inventories in the repository.
- SCOPE_ROOT is relative to the Git repository root. Write the repository root as ".". A nested directory uses forward slashes and a trailing slash, such as apps/storefront/.
- path_segment is a non-empty path component containing no ASCII whitespace, slash, or backslash. It MUST NOT equal "." or "..".
- SCOPE_ROOT MUST NOT be absolute or contain a ".." path segment.
- The canonical inventory MUST be stored at SCOPE_ROOT/SPECTODO.md. For "." this is the repository-root SPECTODO.md.
- Scope roots MAY be nested. Each v0.2 inventory owns only its own constraints, versions, requirements, and progress; parent and child inventories do not inherit or combine those records. Shared constraints MUST have an explicit common source that every applicable workspace is instructed to read; scope-local constraints remain in the applicable inventory.
- Category, version, constraint, and item IDs are unique within one inventory. The same IDs MAY be used in different scopes.
- Repository-local references in item records remain relative to the Git repository root, not the scope root.

### 2.2 Selecting a scope

Repository or agent instructions MUST map each supported active workspace root to exactly one inventory scope before reading or changing progress.

- A v0.1 inventory without a Scope section remains at the repository root and follows v0.1 semantics. In a mixed-version repository, instructions MUST declare which project/workspace roots that legacy inventory represents; its project-wide constraints remain applicable to that declared project.
- A v0.2 inventory covers only the exact scope root declared in its Scope section. Instructions MUST explicitly map each supported active workspace root to one canonical inventory; folder proximity alone does not define inheritance.
- Request wording, a referenced file path, or a branch name MUST NOT silently switch the active scope.
- If instructions map the active workspace root to no scope or to more than one scope, stop and clarify before changing progress.
- In Codex, repository AGENTS.md SHOULD carry the generated route table; equivalent agent instructions MAY carry it elsewhere. AGENTS.md is routing guidance and is not part of the SPECTODO grammar. A request that mentions another scope MUST NOT override the active workspace mapping. The common kickoff MUST generate routing from discovered canonical scope roots, not ask each consumer to select a Spectodo version. For each supported workspace root, exact routing is authoritative: the repository root routes to a root inventory if one exists; an explicitly supported nested workspace root routes to its own inventory. Overlapping scopes do not imply inheritance. If the repository root has no canonical inventory, opening it requires selecting a declared supported workspace rather than guessing. Routing changes MUST be reconciled atomically with canonical inventory creation, movement, or deletion.

### 2.3 Migrating an existing v0.1 project

All NEW installations use stable v0.2 even for a single project. Existing v0.1 inventories remain supported unchanged; a maintenance-only operation MUST NOT silently migrate them. A centrally requested upgrade to the current stable format follows the migration audit below. Agents and adopting repositories MUST NOT select or invent a different Spectodo language version based on the project phase, code presence, or number of scopes.

When a repository divides a project tracked by a root v0.1 inventory into independent scopes, it MUST complete an explicit migration audit. It MUST NOT leave the old inventory's records ambiguously attached to the repository root.

For every v0.1 constraint, record one disposition before changing the canonical inventory:

- **Shared:** move the invariant to one repository-level policy source that every applicable workspace is explicitly instructed to read. Keep one authoritative copy.
- **Scope-local:** retain or move the invariant to each scope where it remains true. If it genuinely applies to multiple scopes, identify one authoritative source and a concrete synchronization owner; do not create unsynchronized copies.
- **Retired or revised:** record the reason and the decision evidence. A constraint MUST NOT disappear merely because its original inventory is being split.

For every v0.1 specification item, assign it to exactly one successor scope. If distinct products need similar behavior, create independent scope-local items and progress rather than copying completion state. Preserve an item's ID and progress only for a one-to-one continuation of the same specification. Map or redefine versions explicitly because versions and progress are scope-local in v0.2.

Update workspace routing and canonical paths before retiring the old inventory. The migration is complete only when every prior constraint and item has an accounted-for disposition, all new canonical paths and routes agree, and a repository-wide audit finds no duplicate or unrouteable inventory. Git history preserves the old file; an extra historical SPECTODO.md copy MUST NOT be left at a path that could be mistaken for canonical.


### 2.4 Stable adoption and lifecycle neutrality

The Spectodo project makes the language-version decision centrally: new installations and deliberate migrations MUST use the published stable v0.2 specification, never choose v0.1/v0.2 per target repository. A pre-existing v0.1 inventory is still valid and MUST remain readable and writable according to v0.1 until an explicit, audited migration. A project can be planning-only, developing code, or running in production without changing the Spectodo language or scope model.

The four axes describe the requirement's asserted outcome, not a forced waterfall. For planning-only work, a verifiable design/research output can be represented as D:x I:- P:- V:x when review evidence exists. For an eventual application capability not yet implemented use I:. and any relevant P:./V:. rather than I:-. The same inventory persists when code is later added; reconcile the axes with evidence rather than replacing the inventory or reallocating IDs.

A first installation MUST inventory existing requirements, enduring constraints, decisions and evidence before synthesizing new ones. The kickoff MUST classify sources as normative/current, historical, superseded, and uncertain; historical claims MUST NOT be silently promoted to current requirements. Design notes stay in supporting documents. Missing evidence MUST NOT be filled in with invented completion states.

### 2.5 Deterministic routing and repeat runs

The stable kickoff workflow MUST inspect the entire repository and all existing canonical candidates before writing. Default to one root scope for a previously unmanaged single project. Create additional scopes only where separately managed project/workspace boundaries are evidenced; do not split on directory structure alone. If boundaries are not demonstrably independent, use the root scope, list the uncertainty, and avoid speculative inventory duplication.

Maintain one explicit workspace-root-to-canonical-inventory table in the applicable repository instructions (AGENTS.md for Codex). The table MUST cover supported workspace roots exactly once and identify shared policy documents read by each applicable workspace. Nested scope roots are NOT inherited automatically. Example and fixture SPECTODO files MUST live outside canonical scope roots and be explicitly excluded by instructions.

On every rerun, load the existing mapping and inventory first; reconcile by stable IDs and statement identity; update in place; do not reassign IDs, duplicate records, or reset completion merely because new source documents were found. Scope changes and v0.1 migrations MUST produce a per-record disposition ledger before rewriting canonical paths. If a conflicting route, scope or item cannot be resolved from evidence, report the blocker; do not guess or overwrite.

Audits MUST cover repository-wide scope/path uniqueness, route completeness, structural correctness, ID stability, required reference existence, policy ownership, duplicate requirements, source coverage, and whether D/I/P/V assertions are traceable to evidence. The bundled optional automated checker provides structural checks; agents remain responsible for semantic coverage and evidence interpretation.

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

Grammar:

```text
VERSION_ID := "V" DIGIT+
```

Version IDs MUST be unique within the document.

A specification item MUST reference exactly one declared version. These V0/V1 identifiers refer to target milestones WITHIN a scope; they are not Spectodo Language versions. A project MUST NOT choose the Spectodo Language version via its target-version labels.

The numeric part expresses ordered target versions. Lower version numbers precede higher version numbers.

A version identifies the intended product/scope target for an item. It is NOT the item's current lifecycle progress; D/I/P/V represent that separately.

The label is display text and MAY contain Unicode.

### 3.2 Active target version

v0.2 does not define a persistent active-version marker.

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

A constraint is one enduring invariant within the declared scope of this inventory:

```text
- <CONSTRAINT_ID> <STATEMENT>
```

Constraints are not work items. They MUST NOT have a Markdown checkbox, target version, priority, or D/I/P/V progress axes.

Use a constraint only for a rule that is intended to remain continuously true while the inventory is in use. A capability that can be designed, implemented, deployed, or verified is a specification item instead.

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
- are version-independent in v0.2

Example:

```md
# Constraints
- FORMAT-001 専用CLIを前提にしない
- FORMAT-002 完了済み仕様項目をinventoryから削除しない
```

## 5. Priority

Every specification item has one numeric priority marker.

Grammar:

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

Priority has one primary operational meaning in v0.2:

> When choosing the next not-yet-started specification item to begin designing within the active target version, prefer the lowest priority number across categories.

For this rule, an item is `not-yet-started` iff its Design axis is exactly `D:.`. Design is the entry point for new requirement work in v0.2. Items with `D:x`, `D:~`, `D:>`, or `D:-` are therefore not candidates for the new-Design priority rule.

If more than one eligible item has the same priority, v0.2 does not assign semantic meaning to their source order. The user/agent MAY choose among equal-priority candidates based on current context; a future version may define an additional tie-break only if concrete use shows that it is needed.

If the active target version still has incomplete specification items but none has `D:.`, the new-Design priority rule has no candidate. That MUST NOT by itself advance work to a later version. Previously started incomplete work remains part of the active version and may be resumed based on the current work context. Priority does not retroactively preempt or reorder started work.

Priority MUST NOT be interpreted as a progress state.

Priority MUST NOT by itself interrupt an item that is already being designed or progressed.

Crossing from P1 to P2 MUST NOT create an automatic confirmation gate. Starting the next item at Design is itself the normal review point for its necessity, scope, target version, and specification.

If design work shows that an item's target version or necessity is wrong, the inventory MAY be revised based on that design decision. Priority alone does not decide postponement or removal.

v0.2 intentionally does not assign fixed labels such as high / medium / low to numeric priorities.

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

Grammar:

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
- MUST describe current or intended verifiable product, design, research, or operational capability/outcome
- MUST NOT contain design rationale, implementation notes, discussion history, or work logs
- MUST encode a literal `|` as `\|` and a literal `\` as `\\`; all other backslash escapes are invalid

## 8. Overall checkbox

The overall checkbox exists for immediate visual scanning in ordinary Markdown renderers.

Examples:

```md
- [x] AUTH-002 [V0] [P1] ログアウトできる | D:x I:x P:x V:x
- [ ] AUTH-001 [V0] [P1] Android実機でメールアドレスとパスワードを使ってログインできる | D:x I:x P:x V:~ | !Android実機でのログイン検証が未完了
```

The overall checkbox MUST NOT be edited independently of the progress axes.

## 9. Progress axes

v0.2 defines four fixed axes in a fixed order:

```text
D = design
I = implementation
P = deployment
V = verification
```

The exact canonical sequence is:

```text
D:<STATUS> I:<STATUS> P:<STATUS> V:<STATUS>
```

All four axes MUST be present on every specification item.

The fixed order is intentional: it makes records predictable without requiring a separate schema header.

Project-level custom axes are intentionally NOT part of v0.2. Any future support requires a later language version.

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

For verification, implementation existence alone MUST NOT be treated as verification.

Verification completion is scoped to the specification statement. `V:x` means there is sufficient evidence for the behavior/capability asserted by that statement; it does not mean every conceivable quality check has been performed.

Optional polish, tuning, subjective quality evaluation, or broader acceptance work that is not required by the statement MUST NOT by itself keep verification incomplete.

#### `~` partial

A meaningful subset exists, but the axis is not complete.

If any axis is `~`, a gap segment (`!...`) is REQUIRED.

For verification, `~` MUST reflect missing evidence necessary for the statement itself. The mere fact that additional manual, device, usability, balance, polish, or broader acceptance checks are possible is not sufficient reason for `V:~`.

#### `>` in progress

Active work is currently underway on that axis, but the completed subset is not being asserted as the stable meaning of the status.

This value is transient. If the work stops while only part is actually present, the status SHOULD become `~`.

#### `.` todo

No qualifying work/result exists yet for the axis.

#### `-` not applicable

The axis does not apply to this item.

It MUST NOT be used merely because work is deferred. An item whose outcome is a research/design deliverable MAY have I:- and P:- only if no implementation or deployment is required by that statement. A future implementation is a separate item or requires changing the original statement and revalidating its axes. If implementation is intended but has not begun, use I:.; do not mark absent code as implemented or not-applicable solely because the repository is early-stage.

### 10.2 Verification scope

Verification is bounded by the specification statement. When assigning or reconciling `V`, determine what evidence is necessary to establish that exact statement and evaluate only that scope.

Rules:

- a requirement MUST NOT remain incomplete solely because optional polish, tuning, subjective quality evaluation, usability refinement, balance work, or broader acceptance testing remains when the statement does not require that work
- the existence of an additional possible manual/device check is not by itself evidence that `V` is partial
- if a manual/device acceptance condition is part of the requirement, the statement SHOULD make that condition explicit; statements that directly assert subjective or device-specific qualities may naturally require corresponding manual/device evidence
- if out-of-scope quality work is worth tracking, model it as a separate specification item rather than hiding it in the original item's `V:~` gap
- when the separate work belongs to the same target but has lower urgency, keep the same version and assign an appropriate lower priority
- when the separate work is outside the current target's completion criteria, assign it to a later version; its incompleteness MUST NOT keep the earlier requirement or target incomplete

Splitting extra quality work into another item does not weaken verification of the original statement: the original item may use `V:x` only when evidence is sufficient for its own stated behavior/capability.

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
- MUST encode a literal `|` as `\|` and a literal `\` as `\\`; all other backslash escapes are invalid

Only one gap segment is allowed in v0.2. Multiple gaps MUST be compressed into a concise statement or moved to a referenced document.

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

v0.2 uses strict ordering.

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

## 14. Formal grammar

The grammar below is normative for Spectodo Language v0.2 except where Markdown parsing itself is concerned.

~~~ebnf
document       = scope, blank*, versions, blank*,
                 [ constraints, blank* ],
                 category, { blank*, category }, blank* ;

scope          = "# Scope", newline,
                 scope_declaration ;

scope_declaration = "- ", scope_id, ": ", scope_root ;

scope_root     = "." | repository_relative_directory ;
repository_relative_directory = path_segment, { "/", path_segment }, "/" ;

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
scope_id       = upper, { upper | digit | "-" } ;
category_id    = upper, { upper | digit | "-" } ;
constraint_id  = upper_id, "-", digit, digit, digit ;
upper_id       = upper, { upper | digit | "-" } ;
item_id        = category_id, "-", digit, digit, digit ;

label          = text_no_newline ;
constraint_statement = text_no_newline ;
statement      = escaped_text_no_pipe_delimiter ;
gap            = escaped_text_no_pipe_delimiter ;
reference      = non_whitespace_text ;
path_segment   = path_char, { path_char } ;

text_no_newline = { text_code_point } ;
text_code_point = any Unicode scalar value except U+000A LINE FEED and U+000D CARRIAGE RETURN ;
non_whitespace_text = non_whitespace_code_point, { non_whitespace_code_point } ;
non_whitespace_code_point = any Unicode scalar value except ASCII whitespace U+0009 through U+000D and U+0020 ;
escaped_text_no_pipe_delimiter = escaped_text_unit, { escaped_text_unit } ;
escaped_text_unit = text_code_point_except_delimiter | escaped_pipe | escaped_backslash ;
text_code_point_except_delimiter = any Unicode scalar value except U+000A, U+000D, U+005C REVERSE SOLIDUS, and U+007C VERTICAL LINE ;
escaped_pipe = U+005C REVERSE SOLIDUS, U+007C VERTICAL LINE ;
escaped_backslash = U+005C REVERSE SOLIDUS, U+005C REVERSE SOLIDUS ;
path_char      = any Unicode scalar value except U+002F SOLIDUS, U+005C REVERSE SOLIDUS, and ASCII whitespace ;

blank          = newline ;
newline        = U+000A LINE FEED ;
upper          = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z" ;
digit          = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" ;
nonzero_digit  = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" ;
~~~

In statement and gap fields, the source sequence `\|` represents a literal vertical line and `\\` represents a literal reverse solidus. A raw vertical line remains the segment delimiter. A raw reverse solidus MUST begin one of those two escape sequences; every other escape is invalid. The escapes decode exactly one character and are not applied to labels, constraints, or references.

`text_no_newline` and `non_whitespace_text` are defined above rather than being implementation-defined parser classes. “ASCII whitespace” means U+0009 through U+000D and U+0020.

## 15. Validation errors

A validator or Agent Skill MUST treat at least the following as errors:
- missing or duplicate Scope section
- missing or additional scope declaration
- malformed scope ID or scope root
- canonical inventory path does not match its declared scope root
- duplicate scope ID or scope root among canonical v0.2 inventories in the same repository
- canonical inventory discovery is ambiguous, omits a routed inventory, or includes an undocumented support/example file
- a legacy v0.1 inventory is routed to a project not declared by repository instructions
- a v0.1-to-v0.2 migration leaves a constraint or specification item without a disposition
- active workspace resolves to no scope or more than one scope
- overall checkbox does not match the derived completion state from D/I/P/V
- duplicate version ID
- empty constraint statement
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
- empty specification statement or gap segment
- unescaped structural delimiter inside statement/gap
- invalid backslash escape inside statement/gap
- unknown extra field/segment

Warnings MAY include:

- statement appears to be only a vague title
- `>` remains unchanged for an unusually long period
- reference path appears missing
- `x` is asserted without evidence during reconciliation
- a verification gap appears to describe optional polish, tuning, usability refinement, or broader acceptance work not required by the statement

## 16. What is intentionally excluded

v0.2 does not encode:

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

Spectodo v0.2 has no custom renderer.

The Markdown source is the canonical human-readable representation.

A future renderer MAY provide filtered or summarized views, but:

- it MUST parse the canonical language
- it MUST NOT become the source of truth
- the canonical file MUST remain usable without it

## 18. Future-version considerations

The following do not change v0.2 semantics. They may be reconsidered only in a later language version:

- whether `>` (in progress) is worth keeping as a first-class status
- whether item numbering should always be three digits
- whether version declarations need optional goal/exit metadata
- whether priority should have a bounded range or remain an open positive integer
- whether equal-priority new-work selection needs a standardized tie-break
- whether very large inventories need a standardized category-splitting mechanism
- whether a future version should support optional project-defined axes
