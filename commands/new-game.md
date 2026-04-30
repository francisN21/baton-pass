Run the baton-pass `new-game` move.

Bootstrap the minimum shared memory and state files so multi-agent work can begin safely.

Steps:
1. Check whether `baton-pass.config.json` already exists. If it does and `--force` was not passed, stop and tell the user.
2. Copy or create the following files using the baton-pass skill templates:
   - `baton-pass.config.json`
   - `baton-pass.state.json`
   - `docs/agent-handoff.md`
   - `docs/current-state.md`
   - `docs/next-task.md`
   - `docs/progress.md`
3. Do not overwrite any file that already exists unless the user explicitly passed `--force`.
4. After creating the files, tell the user what was written and what to do next:
   - Review `baton-pass.config.json` and adjust paths if needed
   - Fill in `docs/current-state.md` and `docs/next-task.md`
   - Customize `docs/agent-handoff.md` with repo-specific rules
   - Start appending sessions to `docs/progress.md`

Arguments: $ARGUMENTS
