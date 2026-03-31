@echo off
setlocal
cd /d "%~dp0"
powershell -ExecutionPolicy Bypass -File "scripts\open-local-preview.ps1" "/variant-a-figma"
endlocal
