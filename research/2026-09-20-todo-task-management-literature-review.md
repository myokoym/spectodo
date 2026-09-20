# TODO / Task Management / Requirements Research Review

> Date: 2026-09-20
>
> Purpose: Re-evaluate Spectodo from existing task-management formats, HCI research on personal task management, checklist/cognitive-aid research, and software requirements/traceability research before further stabilizing the format.
>
> This document is research input, not a finalized Spectodo specification.

## 1. Why the previous research was insufficient

The earlier investigation concentrated too heavily on adjacent developer tools such as Backlog.md, Spec Kit, OpenSpec, Beads, GitHub Issues, and requirements tooling.

That missed several bodies of work directly relevant to Spectodo:

- personal task management (PTM) / to-do list HCI research
- plain-text task formats with long operational history
- checklist and cognitive-aid design
- visual/glanceable task awareness
- Definition of Done and completion semantics
- requirement quality and verification
- requirements traceability across the lifecycle

Spectodo sits between a TODO list and a requirements/status inventory. Both sides must therefore be researched.

## 2. High-value findings from task-management research

### 2.1 Bellotti et al. 2004 — What a To-Do

Source:
- https://doi.org/10.1145/985692.985785
- https://www.ischool.berkeley.edu/research/publications/2004/what-do-studies-task-management-towards-design-personal-task-list-manager

Key findings relevant to Spectodo:

- The central problem was not poor prioritization; it was the ongoing effort required to ensure important tasks were completed despite interruptions and unexpected work.
- Users used comprehensive "task vistas" to see many tasks together and organize them into meaningful categories.
- State-tracking resources were useful when many similar ongoing threads had to be distinguished.
- Users disliked explicitly entering large amounts of metadata such as participants, planned start/end times, and dependencies.
- The design recommendation emphasized an interactionally lightweight tool and intuitive visualization.

Implications:

- Spectodo MUST be glanceable.
- Metadata burden is a first-class design cost.
- Categories have a usability role, not just a schema role.
- A machine-readable format that is hard to visually scan fails part of the task-management problem.

### 2.2 Haraty, McGrenere & Tang 2016 — individual differences

Source:
- https://doi.org/10.1016/j.ijhcs.2015.11.006

Study:
- focus group/contextual interviews: 19 participants
- broader survey: 178 respondents

Key result:
People differ substantially in personal task-management behavior. The study describes tendencies toward adopting dedicated tools, making do with general-purpose tools, and DIY/customizing systems.

Implications:

- Spectodo should remain usable as ordinary text/Markdown.
- Mandatory tool-specific UI or CLI workflows are risky.
- Extensibility is useful, but base use must remain effortless.

### 2.3 Hu et al. 2024 — task-management tool values

Source:
- https://doi.org/10.1145/3663384.3663402
- https://hdl.handle.net/10919/120557

Study:
- knowledge-worker survey, N=248

Six dimensions identified:
- communicability
- structure
- portability
- adaptability
- physicality
- visualizability

Implications:

- "Parser-friendly" is not enough.
- Markdown/Git helps portability.
- strict syntax helps structure.
- checkbox/category layout affects visualizability.
- Agent Skills affect adaptability.
- readability in GitHub/ChatGPT affects communicability.

### 2.4 Meyer et al. 2025 — Stick to Three / AIRbar

Source:
- https://doi.org/10.1145/3715336.3735792

Study:
- 4-week field study
- 35 knowledge workers

AIRbar used:
- at most three top daily tasks
- an always-visible glanceable task widget
- end-of-day reflection

Reported effects included improved task completion, focus, motivation, and task-management satisfaction.

Implications:

- A TODO format needs a visually obvious notion of unfinished work.
- The leading Markdown checkbox is not decorative; it supports rapid visual discrimination.
- A complete canonical inventory and an active-focus view are different needs.
- Spectodo should not add permanent metadata merely to solve short-term prioritization.

### 2.5 Ahmetoglu, Brumby & Cox 2024 — task apps vs research

Source:
- https://doi.org/10.1145/3663384.3663404

The study reviewed research-informed planning-fallacy mitigation strategies and compared them with prevalent task-management applications. It found a gap between research recommendations and what current apps implement well.

Implications:

- "Existing apps do it" is not sufficient evidence.
- Scheduling/estimation features should not be added to Spectodo without a demonstrated need.
- Spectodo's current problem is specification/progress visibility, not general time management.

## 3. Checklist / cognitive-aid research

Sources:
- https://doi.org/10.1177/1064804618819181
- https://pubmed.ncbi.nlm.nih.gov/38697804/
- https://www.nationalacademies.org/read/13149/chapter/6
- https://pmc.ncbi.nlm.nih.gov/articles/2811937/

Important findings:

- Checklists are cognitive aids for memory, attention, standardization, and verification, not just storage.
- READ-DO and DO-CONFIRM are distinct checklist modes.
- Spectodo is mainly closer to DO-CONFIRM for completed specification items: describe the required capability, then confirm that completion criteria are satisfied.
- Long checklists should be divided into meaningful sections and tested for usability.
- Checklist design should be pilot-tested and revised rather than assumed correct.

Implications:

- [x] must have a precise confirmation meaning.
- incomplete vs complete must be recognizable without decoding secondary metadata.
- realistic 100+ item testing is required before stabilizing syntax.

## 4. Existing plain-text TODO formats

### 4.1 GitHub Flavored Markdown task lists

Official spec:
- https://github.github.io/gfm/#task-list-items-extension-

The standard syntax is:
- unchecked task-list item
- checked task-list item

GFM formally defines the task-list marker and renders it as a semantic checkbox.

Lesson:
- Spectodo should reuse standard task-list syntax for primary completion rather than inventing a replacement.

### 4.2 todo.txt

Source:
- https://github.com/todotxt/todo.txt

Core rule:
- one line represents one task

Design principles:
- human-readable without special tooling
- platform/tool independent
- lightweight lexical markers for completion, priority, project, and context
- completed tasks use a leading lowercase x

Lesson:
- one-record-per-line is well established.
- fields should be sparse and lexically compact.
- ordinary text tools should remain useful.

### 4.3 TODO.md standard (todo-md)

Source:
- https://github.com/todo-md/todo-md

Properties:
- Markdown/Git-native
- one-line task records
- standard checkboxes
- sections for grouping
- open / declined / done states
- optional owner/tag metadata

Lesson:
- a close precedent already exists for human- and machine-processable TODO.md.
- Spectodo must justify each addition beyond this simpler model.
- multi-stage product lifecycle/progress is likely the main differentiator, not basic TODO syntax.

### 4.4 TaskPaper

Sources:
- https://guide.taskpaper.com/getting-started/
- https://guide.taskpaper.com/using-taskpaper/making-lists.html

TaskPaper uses:
- projects
- tasks
- notes
- tags

Tasks are one-line records. Completion is represented with @done and visually struck through.

Lesson:
- simple item types plus extensible metadata can scale far.
- completion presentation matters.

### 4.5 Org mode

Sources:
- https://orgmode.org/manual/
- https://orgmode.org/manual/Workflow-states.html

Org defaults to binary TODO/DONE but supports multiple workflow states such as TODO -> FEEDBACK -> VERIFY -> DONE.

The workflow syntax explicitly distinguishes states that still require action from DONE states.

Lesson:
- binary "needs action vs done" and detailed workflow state can coexist.
- this is an important precedent for Spectodo's checkbox plus detailed progress.
- Org's overall complexity should not be copied.

## 5. Existing developer/project systems

### Backlog.md

Sources:
- https://github.com/MrLesk/Backlog.md
- https://github.com/MrLesk/Backlog.md/blob/main/src/guidelines/agent-guidelines.md

Strengths:
- acceptance criteria
- Definition of Done
- structured task metadata
- references
- agent workflow

Mismatch:
- CLI is the authoritative interface
- direct Markdown editing is prohibited
- task files carry plan, notes, comments, final summary
- much heavier than Spectodo's mobile/Markdown target

### OpenSpec / Spec Kit

Sources:
- https://github.com/Fission-AI/OpenSpec
- https://github.com/github/spec-kit

Useful ideas:
- specs are first-class artifacts
- change workflows and phase discipline
- AI-agent integration

Mismatch:
- oriented around change/spec-development workflows
- multiple artifacts and command/tool flows
- not primarily a persistent, compact application inventory

## 6. Software completion semantics

### 6.1 Definition of Done research

Source:
- https://doi.org/10.1016/j.jss.2022.111479
- https://arxiv.org/abs/2208.04003

Survey:
- 137 practitioners
- 45 countries

Reported:
- 93% considered DoD at least valuable
- benefits included completeness, product quality, and ensuring required activities are executed
- recurring problems included infeasible, incorrect, unavailable, and creeping DoDs

Implication:

Spectodo should have a clear common completion rule, but requiring a large fixed checklist for every item risks reproducing "creeping DoD".

The current fixed D/I/P/V model therefore needs evidence, not assumption.

### 6.2 Overall completion and detailed state are distinct

Existing precedent:

- GFM: checked vs unchecked
- Org: actionable vs done plus workflow states
- TaskPaper: @done plus arbitrary tags
- DoD practice: final completion gate plus item-specific criteria

This supports a Spectodo design where:
- checkbox = glanceable overall incomplete/complete state
- additional status = explanation of why an item is or is not complete

But secondary metadata must remain lightweight.

## 7. Requirements and verification

### 7.1 Spectodo items are often requirements, not ordinary tasks

Persistent product capability:
- "ユーザーがメールアドレスとパスワードでログインできる"

Disposable implementation action:
- "ログイン画面を実装する"

The first remains useful after completion; the second is mostly historical after completion.

Implication:
Spectodo's canonical inventory should favor verifiable product requirements/capabilities. Implementation actions should generally live elsewhere.

### 7.2 Gherkin

Source:
- https://cucumber.io/docs/gherkin/reference/

Gherkin emphasizes observable actions/outcomes and hiding implementation details.

Lesson:
- Spectodo item text should state observable capability/outcome where possible.
- implementation notes should remain elsewhere.
- vague noun phrases are poor checkable requirements.

### 7.3 Requirements traceability

Sources:
- https://doi.org/10.1145/3672608.3707952
- https://link.springer.com/article/10.1007/s00766-023-00412-z
- https://doi.org/10.1016/j.jss.2018.09.001

Traceability links requirements to other lifecycle artifacts. Reviews repeatedly identify maintenance cost and incomplete lifecycle coverage as practical problems.

Lesson:
- stable IDs and cheap reference links are justified.
- mandatory rich trace graphs are not.

### 7.4 Doorstop and ReqIF

Doorstop:
- https://github.com/doorstop-dev/doorstop

ReqIF:
- https://www.omg.org/reqif/

These represent the heavier requirements-management end:
- structured requirements
- stable identity
- relationships
- validation
- machine-readable schema/interchange

Lesson:
Spectodo can borrow identity, validation, and traceability concepts without inheriting YAML/XML-level verbosity.

## 8. What the research changes for Spectodo

### Strengthened directions

- standard Markdown checkbox for primary complete/incomplete visibility
- one specification item per source line
- category grouping
- stable IDs
- plain text/Markdown canonical source
- completed capability items remain visible
- optional lightweight references
- design/implementation notes remain outside the inventory
- Agent assistance should reduce manual metadata work

### Reopened questions

#### Fixed D/I/P/V on every item

This is no longer safe to assume.

Questions:
- Are all four axes useful on every item?
- Could some be implicit in a project-level Definition of Done?
- Should detailed axes only appear while incomplete?
- Is deployment often release/project-level rather than item-level?
- Is a single workflow state plus evidence enough in some projects?

#### Inventory vs active work queue

Research distinguishes comprehensive overview from selective active-priority views.

Spectodo may keep a canonical complete inventory while deriving a smaller active view. It should not permanently encode every daily-planning concern.

#### Principles vs checkable requirements

Principles such as "CLIを前提にしない" should either:
- be rewritten as verifiable requirements, or
- live outside the checklist as invariants/principles.

## 9. Research-derived evaluation criteria

Before stabilizing the language, candidate formats should be compared on:

1. Glanceability
2. Low maintenance effort
3. One-line integrity
4. Verifiability
5. Persistent specification value
6. Structure without overload
7. Portability
8. Adaptability
9. Low-cost traceability
10. No renderer dependency
11. Realistic-scale usability
12. Separation of permanent inventory and active focus

## 10. Next empirical work

Do not add more fields immediately.

Instead:

- construct a realistic 100+ item fixture
- compare multiple candidate line syntaxes side by side
- measure visual density and line length at mobile width
- compare explicit D/I/P/V against reduced or implicit models
- test how quickly unfinished/partial/unverified items can be found
- test repeated ChatGPT/Coding-Agent updates for format drift
- determine whether deployment belongs at item or release/project level
- separate principles from checkable requirements in Spectodo's own inventory

## 11. Bottom line

The strongest signal from the research is not "add more metadata".

It is:

Make important state visible, keep interaction lightweight, preserve a comprehensive categorized overview, use explicit completion semantics, and only add structure that demonstrably helps users manage or verify work.

For Spectodo, the standard Markdown checkbox is foundational. The current four-axis detail model must earn its complexity through testing.
