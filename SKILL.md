# Skill: Baton Pass

Purpose: preserve continuity between multiple agents with the least amount of text necessary.

This is a low-token workflow utility, not a documentation ceremony.

## The Move Set

- `new-game` = initialize the workflow in a fresh repo
- `save-state` = pause safely without handing off
- `baton-pass` = transfer work when tokens are low or ownership changes
- `foresight` = receive or resume work, verify alignment, then continue
- `dragon-dance` = improve the workflow only when a real lesson was learned
- `party-check` = inspect who last acted, who should act next, and the current repo state

## Core Rule

Default to delta, not recap.

Do not restate stable project history unless the receiver cannot continue safely without it.

## When To Use Each Move

### `new-game`

Use once at repo start, or when introducing this workflow into a repo that has no shared memory files yet.

### `save-state`

Use when:
- you must stop suddenly
- you are pausing work for later
- ownership is not changing yet

`save-state` is a local checkpoint, not a transfer.

### `baton-pass`

Use when:
- tokens are low
- another agent is taking over
- you need a transferable continuity package

`baton-pass` is a transfer checkpoint.

### `foresight`

Use when:
- receiving a baton
- returning after a save-state
- there is any doubt that the written state still matches the repo

### `dragon-dance`

Use only when:
- the workflow itself learned something
- the receiver found drift
- the baton omitted something important
- a new rule would clearly prevent repeated waste

Do not trigger `dragon-dance` by reflex.
Do not include it in every session or `baton-pass` by default.

### `party-check`

Use when:
- you forgot whose turn it is
- multiple agents share the repo
- you want the current status without paying for a full `foresight`

## What Each Move Should Write

### `save-state`

Minimal output:
- current task
- stopped at
- files touched
- next immediate action
- blocker or risk

### `baton-pass`

Minimal output:
- goal
- done
- files
- verified
- next
- risks
- next agent

Commit discipline:
- Commit before handing off, or document why not.
- Never hand off a dirty working tree without naming the uncommitted state explicitly.
- If verification was not run, say so — do not imply it passed.

### `foresight`

Minimal output:
- aligned or not
- if not aligned, what was stale or missing
- corrected next step only if needed

### `dragon-dance`

Minimal output:
- problem
- impact
- improvement
- new convention

### `party-check`

Minimal output:
- state
- last move
- last agent
- next agent
- updated at
- short summary

## Receive Procedure For `foresight`

Check only the minimum needed to avoid missteps:
- current user goal
- working tree status
- latest commit(s)
- `current-state`
- `next-task`
- latest `progress` entry
- files named in the saved state or baton

Then decide:
- if aligned, continue
- if misaligned, correct the baton and continue
- if the misalignment reveals a reusable lesson, run `dragon-dance`

## State Model

Use the shared state file to track:
- current state
- last move
- last agent
- next agent
- updated time
- summary

Recommended states:
- `active`
- `paused`
- `handed-off`
- `claimed`
- `blocked`

## Verification Vocabulary

Use consistent language so receivers know exactly what was checked.

- `passed` — ran locally, output confirmed clean
- `passed outside sandbox` — ran locally but not in the CI/build environment
- `not run — [reason]` — skipped, state the reason
- `expected to pass, unverified` — not run, but believed correct

Never write `passed` when you mean `expected to pass, unverified`.
That single ambiguity causes the most handoff rework.

## Turn State

The Turn State block in `next-task` is the primary human-readable ownership signal.
`baton-pass.state.json` mirrors it for programmatic use.

When updating one, update both. If they ever disagree, `next-task` wins.

Recommended `state` values in both:
- `active` — someone is working now
- `paused` — stopped safely, same agent will resume
- `handed-off` — transferred, waiting for receiver to claim
- `claimed` — receiver has run `foresight` and is continuing
- `blocked` — cannot proceed, reason should be in `next-task`

## Anti-Patterns

Avoid:
- using `baton-pass` for every tiny checkpoint
- using `dragon-dance` when nothing was learned
- rewriting all memory files for trivial work
- turning `foresight` into a full repo audit every time
- restating the whole project instead of the delta
- writing `passed` when you mean `expected to pass, unverified`
- handing off with a dirty working tree without naming the uncommitted state

## Best Practical Flow

Pause:
- `save-state`
- later `foresight`

Transfer:
- `baton-pass`
- receiver runs `foresight`

Improve:
- `dragon-dance` only if `foresight` exposed a meaningful workflow issue

Check turn ownership:
- `party-check`
