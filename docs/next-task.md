# Next Task

## Turn State
- State: handed-off
- Last Move: baton-pass
- Last Agent: Claude Sonnet 4.6
- Next Agent: Codex
- Updated At: 2026-04-29

## Task
Audit the baton-pass repo for correctness, completeness, and consistency across all published files.

## Why This Is Next
v0.6.1 just shipped to npm and git. Before further development, Codex should verify the repo is internally consistent and the published package is correct.

## Last Verified Against
- recent commit(s): e1f919e (Release 0.6.1: add Claude Code plugin manifest and expand npm package contents)
- recent verification: npm publish confirmed live at baton-pass@0.6.1

## Read These First
- `SKILL.md` — canonical move set and rules
- `README.md` — published install instructions
- `package.json` — what is shipped in the npm package
- `docs/progress.md` — full session history and baton details

## Files Expected to Change
- Any file where the audit finds inaccuracies or inconsistencies
- `docs/agent-handoff.md` — needs repo-specific content (currently placeholder)
- `baton-pass.config.json` — may need path corrections

## Acceptance Criteria
- `bin/baton-pass.js` is correctly wired and functional as a CLI entry point
- All `commands/*.md` match the move set described in `SKILL.md`
- All `templates/` match the output specs in `SKILL.md`
- `README.md` install instructions are accurate for both plugin and npx paths
- `.claude-plugin/plugin.json` and `marketplace.json` are correct
- No inconsistencies between `package.json` files array and what is needed at runtime

## Verification
- not run — audit not yet started

## Do Not Touch
- `docs/progress.md` — append only, do not rewrite existing entries

## If Blocked
- Check `docs/progress.md` Session 002 baton for full context
