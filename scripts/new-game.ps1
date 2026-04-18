param(
  [string]$RootPath = ".",
  [switch]$Force
)

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$initScript = Join-Path $scriptDir "init-baton-pass.ps1"

& $initScript -RootPath $RootPath -Force:$Force
