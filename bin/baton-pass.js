#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const PKG_ROOT = path.resolve(__dirname, '..')
const COMMANDS_SRC = path.join(PKG_ROOT, 'commands')
const TEMPLATES_SRC = path.join(PKG_ROOT, 'templates')

const MOVES = ['new-game', 'save-state', 'baton-pass', 'foresight', 'dragon-dance', 'party-check', 'hindsight']

const HELP = `
baton-pass — low-token handoff workflow for multi-agent repos

Usage:
  npx baton-pass init [target-dir]      install everything (commands + docs files)
  npx baton-pass commands [target-dir]  install only Claude Code slash commands
  npx baton-pass help                   show this message

Examples:
  npx baton-pass init
  npx baton-pass init ./my-project
  npx baton-pass commands

After init, use these slash commands in Claude Code:
  /new-game        bootstrap the workflow
  /save-state      pause safely
  /baton-pass      transfer to next agent
  /foresight       verify alignment before acting
  /dragon-dance    record a workflow lesson
  /party-check     check current ownership
  /hindsight       audit the full baton chain
`.trim()

function copyFile(src, dest, force) {
  const dir = path.dirname(dest)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  if (fs.existsSync(dest) && !force) {
    console.log(`  skip   ${dest}`)
    return
  }
  fs.copyFileSync(src, dest)
  console.log(`  write  ${dest}`)
}

function installCommands(targetDir, force) {
  const dest = path.join(targetDir, '.claude', 'commands')
  console.log('\nInstalling Claude Code slash commands...')
  for (const move of MOVES) {
    const src = path.join(COMMANDS_SRC, `${move}.md`)
    if (fs.existsSync(src)) {
      copyFile(src, path.join(dest, `${move}.md`), force)
    }
  }
}

function installDocs(targetDir, force) {
  const configDest = path.join(targetDir, 'baton-pass.config.json')
  copyFile(path.join(TEMPLATES_SRC, 'baton-pass.config.template.json'), configDest, force)

  const config = JSON.parse(fs.readFileSync(configDest, 'utf8'))
  const p = config.paths

  const docFiles = [
    { template: 'agent-handoff.template.md',       dest: p.handoff },
    { template: 'current-state.template.md',        dest: p.currentState },
    { template: 'next-task.template.md',             dest: p.nextTask },
    { template: 'progress-log.template.md',          dest: p.progressLog },
    { template: 'baton-pass.state.template.json',    dest: p.stateFile },
  ]

  console.log('\nInstalling shared memory files...')
  for (const entry of docFiles) {
    const src = path.join(TEMPLATES_SRC, entry.template)
    copyFile(src, path.join(targetDir, entry.dest), force)
  }
}

function init(targetDir, force) {
  console.log(`\nRunning baton-pass new-game in: ${path.resolve(targetDir)}`)
  installDocs(targetDir, force)
  installCommands(targetDir, force)
  console.log(`
Done. Next steps:
  1. Review baton-pass.config.json — adjust paths if needed
  2. Fill in docs/current-state.md and docs/next-task.md
  3. Customize docs/agent-handoff.md with repo-specific rules
  4. Start appending sessions to docs/progress.md

Slash commands are ready in .claude/commands/
Use /new-game, /save-state, /baton-pass, /foresight, /dragon-dance, /party-check, /hindsight in Claude Code.
`)
}

const args = process.argv.slice(2)
const cmd = args[0]
const targetDir = args.find(a => !a.startsWith('--') && a !== cmd) || '.'
const force = args.includes('--force')

switch (cmd) {
  case 'init':
    init(targetDir, force)
    break
  case 'commands':
    installCommands(targetDir, force)
    console.log('\nDone.')
    break
  case 'help':
  case '--help':
  case '-h':
  case undefined:
    console.log(HELP)
    break
  default:
    console.error(`Unknown command: ${cmd}\n`)
    console.log(HELP)
    process.exit(1)
}
