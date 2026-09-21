# GitHub Android Rendered-Markdown Validation

> Date: 2026-09-21
>
> Purpose: define the acceptance surface and pass/fail criteria for Spectodo smartphone human inspection. This does not evaluate direct source editing.

## Surface

- App: GitHub for Android
- File: `SPECTODO.md`
- View: rendered Markdown file view
- Orientation: normal portrait use
- Interaction: human inspection only
- Not evaluated: raw/source view, GitHub edit UI, mobile browser, desktop mode, custom renderer, direct Markdown editing

ChatGPT Android operation is covered separately by the AI-first workflow requirement.

## What the human needs to inspect

A user should be able to identify, from the rendered Markdown:

1. category boundaries
2. overall checkbox state
3. item ID
4. target version
5. numeric priority
6. requirement statement
7. D/I/P/V detailed state
8. `!gap` when present

References may be followed when detail is needed; their destination content is outside this rendering test.

## Pass criteria

The rendered view passes when:

- ordinary reading can be done by vertical scrolling
- requirement records wrap naturally instead of requiring horizontal scrolling to reach important state
- category boundaries remain visually distinguishable
- unchecked and checked requirements can be distinguished at a glance
- the requirement statement remains readable despite the structural metadata
- D/I/P/V and `!gap` remain inspectable without switching to source/edit mode
- no dedicated Spectodo renderer is needed

## Fail criteria

The rendered view fails if any of the following is necessary for normal inspection:

- horizontal scrolling to understand a requirement
- opening raw/source view to find essential state
- entering the edit UI
- using a custom renderer
- mentally reconstructing which metadata belongs to which requirement because wrapping/layout separates it ambiguously

## Evidence

Validation requires direct observation in GitHub Android. Repository/API inspection is insufficient because it does not establish the Android app's actual rendered layout.


## Observed result

Direct observation in GitHub Android:

- the rendered inventory is not especially easy to read
- no horizontal scrolling is required because the content is not rendered as a table
- the current flat one-line requirement structure remains usable for inspection
- introducing nesting solely to improve readability is not justified for v0.1

Decision: accept the current rendered-Markdown readability for v0.1. Readability improvement may be reconsidered later only if concrete use shows that the flat structure is insufficient.
