# 🏃 Baton Pass

> **A low-token handoff workflow for multi-agent repos.**
> When one AI runs out of context, the next one picks up exactly where it left off — no recap, no drift, no duplicated work.

Built for teams running **Claude + Codex** (or any two agents) on the same repo.

---

## The Move Set

```
new-game     ──  bootstrap the workflow in a fresh repo
save-state   ──  pause safely, ownership stays with you
baton-pass   ──  transfer when tokens are low or ownership changes
foresight    ──  receive or resume, verify alignment before acting
dragon-dance ──  record a real workflow lesson (conditional, not automatic)
party-check  ──  see who owns the work right now
hindsight    ──  audit the full baton chain — milestones, verifications, risks, open items
```

---

## Why This Exists

Context windows end. Agents forget. Handoffs fail silently.

The usual result: the next agent restates everything from scratch, misses a decision that was made two sessions ago, or picks up stale assumptions from docs that haven't been updated since Tuesday.

`baton-pass` fixes that with one core idea — **write only the delta, not the recap.**

---

## The Three Rules That Matter Most

### 1. Default to delta, not recap
Do not restate stable project history unless the receiver genuinely cannot continue without it.
A good baton is smaller than a project summary.

### 2. Commit before you hand off
Never transfer a dirty working tree without naming the uncommitted state explicitly.
A dirty tree at handoff means the receiver does not know what is real.

### 3. Be honest about what was verified
Use these exact terms — nothing more, nothing less:

| Term | Meaning |
|---|---|
| `passed` | ran locally, output confirmed clean |
| `passed outside sandbox` | ran locally, not in CI/build environment |
| `not run — [reason]` | skipped, state the reason |
| `expected to pass, unverified` | not run, believed correct |

> **Never write `passed` when you mean `expected to pass, unverified`.**
> That single ambiguity causes more handoff rework than anything else.

---

## How Each Move Works

### 🎮 `new-game`
**Use once, at repo start.**

Bootstraps the minimum shared memory so multi-agent work can begin safely.

Creates:
```
baton-pass.config.json
baton-pass.state.json
docs/agent-handoff.md
docs/current-state.md
docs/next-task.md
docs/progress.md
```

---

### 💾 `save-state`
**Use when you must stop but ownership isn't changing.**

Write the minimum needed for future-you to resume:
- current task
- stopped at
- files touched
- next immediate action
- blocker or risk

---

### 🏃 `baton-pass`
**Use when tokens are low or the next agent takes over.**

Write only:
- goal
- completed
- files changed
- verified *(honest — use the vocabulary above)*
- next task
- risks
- next agent

Commit first. If you cannot commit, name the uncommitted state in the baton.

---

### 🔮 `foresight`
**Use when receiving a baton or returning after a pause.**

Check before you touch anything:
```
→ current user goal
→ working tree status
→ latest commit(s)
→ current-state
→ next-task
→ latest progress entry
→ files named in the baton
```

Then:
```
aligned     →  continue
misaligned  →  correct docs first, then continue
              if the drift reveals a reusable lesson → run dragon-dance
```

---

### 🐉 `dragon-dance`
**Use only when a real workflow lesson appeared.**

Good triggers:
- the baton was stale or incomplete
- a verification claim was misleading
- the receiver had to re-audit too much
- the same workflow mistake could repeat

If nothing was learned — **skip it entirely.** Dragon dance is not a ceremony.
It is a repair.

---

### 🎉 `party-check`
**Use when you need to know who owns the work right now.**

Reads from `baton-pass.state.json` and the Turn State block in `next-task`.
Cheap. No full audit needed.

---

### 🔍 `hindsight`
**Use when you need a full audit of what actually happened across the chain.**

Good triggers:
- a milestone is complete and you want a clean record
- something feels wrong and you need to trace the source
- a new agent is joining and needs the full picture, not just the last baton
- a `foresight` found severe drift and you need to know how far back it started
- the project is being reviewed, handed to a human, or archived

What it produces:
- baton chain table (who passed to whom, when, and why)
- milestones claimed per agent with honest verification status
- verification gaps (claims made without supporting evidence)
- risks carried forward without resolution
- drift that accumulated across batons
- open items that were never closed
- verdict: `clean`, `gaps found`, `risks unresolved`, or `action required`

**Do not run `hindsight` after every baton.** It is an audit, not a routine step.

---

## Turn State

Every `next-task` file carries a **Turn State block** at the very top.
It's the first thing you read. It tells you who owns the work before you open anything else.

```md
## Turn State
- State:       handed-off
- Last Move:   baton-pass
- Last Agent:  codex
- Next Agent:  claude
- Updated At:  2026-04-17
```

`baton-pass.state.json` mirrors this for programmatic use.
When you update one, update both. If they disagree, **`next-task` wins.**

Recommended state values:

| State | Meaning |
|---|---|
| `active` | someone is working right now |
| `paused` | stopped safely, same agent will resume |
| `handed-off` | transferred, waiting for receiver to claim |
| `claimed` | receiver ran `foresight` and is continuing |
| `blocked` | cannot proceed — reason is in `next-task` |

---

## Recommended Flows

**Normal pause/resume:**
```
save-state  →  foresight  →  continue
```

**Low-token transfer:**
```
baton-pass  →  foresight  →  continue
```

**Drift found on receive:**
```
foresight  →  correct docs  →  dragon-dance (if lesson)  →  continue
```

**Ownership check:**
```
party-check
```

**Full chain audit:**
```
hindsight  →  dragon-dance (if gaps or unresolved risks found)
```

---

## Why Claude + Codex

The strongest use case is pairing Claude and Codex so they **cross-check each other** instead of relying on one model's memory across sessions.

That gives you:
- stale assumptions caught faster
- less handoff drift between sessions
- continuity when tokens run low
- one agent verifying the other's baton before continuing

If you are already on Claude Pro and a paid ChatGPT/Codex plan, this is a much cleaner workflow than improvising continuity from scratch each session.

---

## Anti-Patterns

```
✗  using baton-pass for every tiny checkpoint
✗  running dragon-dance when nothing was learned
✗  running hindsight after every baton — it is an audit, not a routine step
✗  rewriting all memory files for trivial work
✗  turning foresight into a full repo audit every time
✗  writing "passed" when you mean "expected to pass, unverified"
✗  handing off with a dirty tree without naming the uncommitted state
```

---

## Install For Claude Code

Use this path when you want Baton Pass to behave like the public Claude Code skill/plugin repos.

In Claude Code:

```text
/plugin marketplace add francisN21/baton-pass
/plugin install baton-pass@baton-pass
```

From a terminal:

```bash
claude plugin marketplace add https://github.com/francisN21/baton-pass
claude plugin install baton-pass@baton-pass
```

After installing the plugin, Claude Code can use the `baton-pass` skill automatically and these slash commands become available:

```text
/new-game
/save-state
/baton-pass
/foresight
/dragon-dance
/party-check
/hindsight
```

## Install Project Files

Use this path when you want to add the shared handoff files and `.claude/commands/` into a repo.

```bash
npx baton-pass init
```

This installs the shared memory files and Claude Code slash commands into your project.

`npm install baton-pass` or `npm install -g baton-pass` installs the Node CLI package. It does not, by itself, enable the Claude Code skill. Use the plugin install above for Claude Code skill activation.

---

### What gets installed

**Shared memory files** (tracked in your repo):
```
baton-pass.config.json
baton-pass.state.json
docs/agent-handoff.md
docs/current-state.md
docs/next-task.md
docs/progress.md
```

**Claude Code slash commands** (in `.claude/commands/`):
```
/new-game
/save-state
/baton-pass
/foresight
/dragon-dance
/party-check
/hindsight
```

Each command tells Claude exactly what to do for that move — no copy-pasting instructions.

---

### Options

```bash
npx baton-pass init [target-dir]      # install into a specific directory
npx baton-pass commands [target-dir]  # install only slash commands
npx baton-pass init --force           # overwrite existing files
npx baton-pass help
```

---

### After init

1. Adjust `baton-pass.config.json` if your repo uses different file paths.
2. Fill in `docs/current-state.md` and `docs/next-task.md`.
3. Add repo-specific rules to `docs/agent-handoff.md`. Keep the portable skill generic — project rules stay local.

---

### Manual install (no npx)

```bash
# Bash
./scripts/new-game.sh

# PowerShell
./scripts/new-game.ps1
```

Or follow the step-by-step path in [INIT.md](./INIT.md).

---

## Repository Layout

```
baton-pass/
├── package.json
├── README.md
├── SKILL.md
├── INIT.md
├── LICENSE
├── CONTRIBUTING.md
├── CHANGELOG.md
├── bin/
│   └── baton-pass.js
├── scripts/
│   ├── new-game.ps1
│   ├── new-game.sh
│   ├── init-baton-pass.ps1
│   └── init-baton-pass.sh
├── commands/
│   ├── new-game.md
│   ├── save-state.md
│   ├── baton-pass.md
│   ├── foresight.md
│   ├── dragon-dance.md
│   ├── party-check.md
│   └── hindsight.md
├── examples/
│   └── example-baton-pass.md
└── templates/
    ├── agent-handoff.template.md
    ├── baton-pass.config.template.json
    ├── baton-pass.state.template.json
    ├── current-state.template.md
    ├── next-task.template.md
    ├── progress-log.template.md
    ├── progress-session.template.md
    ├── save-state.template.md
    ├── foresight.template.md
    ├── dragon-dance.template.md
    ├── party-check.template.md
    └── hindsight.template.md
```

---

## License

[MIT](./LICENSE) — use it, adapt it, share it.
