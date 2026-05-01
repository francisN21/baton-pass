# Changelog

## 0.6.4 - 2026-04-30

- Fixed plugin load error: "Path escapes plugin directory: ./ (skills)". Moved SKILL.md into a `skills/` subdirectory and updated `plugin.json` skills path from `"./"` to `"skills/"`. Also removed `./` prefix from `commands` path.

## 0.6.3 - 2026-04-30

- Added missing `templates/baton-pass.template.md` — the `/baton-pass` command referenced it but it did not exist; all other moves already had corresponding templates.
- Fixed `commands/new-game.md` step 2 hardcoded template path (`docs/skills/baton-pass/templates/`) — replaced with a generic reference that works regardless of install method.
- Fixed `templates/progress-log.template.md` Session 001 entry: removed hardcoded dragon-dance block (anti-pattern — dragon-dance should only appear when a real lesson was learned); replaced with the same commented-out optional format used in `progress-session.template.md`.
- Fixed `templates/progress-log.template.md` reference to `templates/progress-session.template.md` — that path does not exist in a user's repo after install; updated to clarify the template lives in the skill package.

## 0.6.2 - 2026-04-29

- Fixed `new-game` bash script creating a file named `baton-pass` in the repo root instead of `docs/agent-handoff.md`. Root cause: `"handoff"` key appeared in both `triggers` and `paths` sections of the config template; sed matched the wrong one first. Renamed `triggers.handoff` to `triggers.transfer` to eliminate the collision.

## 0.6.1 - 2026-04-29

- Added Claude Code plugin manifest at `.claude-plugin/plugin.json`.
- Added Claude Code marketplace manifest at `.claude-plugin/marketplace.json` using the published npm package as the plugin source.
- Updated npm package contents to ship `.claude-plugin/`.
- Clarified README install paths for Claude Code plugin install vs npm CLI install.

## 0.6.0 - 2026-04-18

- Added `package.json` — package is now installable via `npx baton-pass`
- Added `bin/baton-pass.js` — zero-dependency Node.js CLI with `init`, `commands`, and `help` subcommands
- `npx baton-pass init` installs shared memory files and Claude Code slash commands in one step
- `npx baton-pass commands` installs only the slash commands
- Both commands accept an optional `[target-dir]` and `--force` flag
- Rewrote README Quick Start to lead with the npx command

## 0.5.0 - 2026-04-18

- Added `commands/` directory with Claude Code slash command files for all seven moves: `new-game`, `save-state`, `baton-pass`, `foresight`, `dragon-dance`, `party-check`, `hindsight`
- Updated `init-baton-pass.ps1` and `init-baton-pass.sh` to copy command files into `.claude/commands/` automatically during `new-game`
- Updated README Quick Start — added step-by-step setup instructions and slash command usage examples
- Updated repository layout in README to include `commands/` directory

## 0.4.0 - 2026-04-18

- Added `hindsight` move — full baton chain audit covering milestones claimed, verification gaps, risks carried forward, drift across batons, and open items never resolved
- Added `hindsight.template.md` with baton chain table, per-agent milestone log, verification gap section, risk tracking, drift log, and audit verdict field
- Added `hindsight` to the move set, when-to-use rules, output spec, and anti-patterns in SKILL.md
- Added `hindsight` section to README.md with good triggers, output summary, and flow example
- Updated anti-patterns in both SKILL.md and README.md: do not run hindsight after every baton

## 0.3.0 - 2026-04-18

- Fixed dragon-dance.template.md header — removed "Use this after every baton-pass" (contradicted the conditional rule in SKILL.md)
- Fixed agent-handoff.template.md — removed "include one dragon-dance improvement" from the handoff rule; dragon-dance is now explicitly conditional in the template
- Fixed progress-session.template.md — moved Dragon Dance section into a commented-out optional block so it is not filled out reflexively
- Added Turn State block to next-task.template.md — Last Move, Last Agent, Next Agent, Updated At at the top of the file for immediate ownership orientation
- Added action paths to foresight.template.md — "aligned → continue" and "misaligned → correct docs first, then continue; if drift reveals a lesson, run dragon-dance" directly in the template
- Added commit discipline to SKILL.md — commit before handing off, never hand off a dirty tree without naming uncommitted state
- Added verification vocabulary to SKILL.md — passed / passed outside sandbox / not run — [reason] / expected to pass unverified; explicit rule against writing "passed" when you mean "expected to pass, unverified"
- Added Turn State section to SKILL.md — explains next-task as primary, baton-pass.state.json as mirror; defines all state values
- Extended Anti-Patterns in SKILL.md with the two most common real failure modes from practice
- Rewrote README.md — aligned with all changes; added Turn State explanation, core rules table, verification vocabulary, anti-patterns, cleaner flow examples
- Updated example-baton-pass.md — matches current baton template structure with Turn State block at top

## 0.2.0 - 2026-04-17

- Reframed the package around a low-token-first philosophy
- Replaced the old bootstrap naming with `new-game`
- Added `save-state`, `foresight`, and `party-check`
- Added a lightweight shared status model in `baton-pass.state.json`
- Added bootstrap support for both config and state files
- Added templates for save-state, foresight, party-check, and shared state
- Clarified the sender/receiver flow:
  - sender uses `save-state` or `baton-pass`
  - receiver uses `foresight`
  - `dragon-dance` happens only when a real workflow lesson appears

## 0.1.0 - 2026-04-15

- Initial public version of the `baton-pass` skill
- Added the core `baton-pass` workflow in `SKILL.md`
- Added `dragon-dance` as the built-in improvement loop
- Added reusable templates for current state, next task, progress sessions, and dragon-dance notes
- Added an example handoff
- Added repository wrapper files for easier GitHub publishing
