param(
  [string]$RootPath = ".",
  [switch]$Force
)

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$packageRoot = Split-Path -Parent $scriptDir
$templatesDir = Join-Path $packageRoot "templates"
$resolvedRoot = Resolve-Path -Path $RootPath

function Copy-IfNeeded {
  param(
    [string]$TemplatePath,
    [string]$TargetPath
  )

  $targetDir = Split-Path -Parent $TargetPath
  if ($targetDir -and -not (Test-Path -LiteralPath $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
  }

  if ((Test-Path -LiteralPath $TargetPath) -and -not $Force) {
    Write-Host "skip  $TargetPath"
    return
  }

  Copy-Item -LiteralPath $TemplatePath -Destination $TargetPath -Force
  Write-Host "write $TargetPath"
}

$configTarget = Join-Path $resolvedRoot "baton-pass.config.json"
$configTemplate = Join-Path $templatesDir "baton-pass.config.template.json"
Copy-IfNeeded -TemplatePath $configTemplate -TargetPath $configTarget

$config = Get-Content -LiteralPath $configTarget -Raw | ConvertFrom-Json

$targets = @(
  @{ Template = "agent-handoff.template.md"; Target = $config.paths.handoff }
  @{ Template = "current-state.template.md"; Target = $config.paths.currentState }
  @{ Template = "next-task.template.md"; Target = $config.paths.nextTask }
  @{ Template = "progress-log.template.md"; Target = $config.paths.progressLog }
  @{ Template = "baton-pass.state.template.json"; Target = $config.paths.stateFile }
)

foreach ($entry in $targets) {
  $templatePath = Join-Path $templatesDir $entry.Template
  $targetPath = Join-Path $resolvedRoot $entry.Target
  Copy-IfNeeded -TemplatePath $templatePath -TargetPath $targetPath
}

Write-Host ""
Write-Host "Baton Pass new-game complete."
Write-Host "Next:"
Write-Host "- Review baton-pass.config.json"
Write-Host "- Review baton-pass.state.json"
Write-Host "- Customize docs/agent-handoff.md for your repo"
Write-Host "- Fill in docs/current-state.md and docs/next-task.md"
Write-Host "- Start appending real sessions to docs/progress.md"
