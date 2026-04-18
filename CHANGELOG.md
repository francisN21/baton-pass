# Changelog

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
