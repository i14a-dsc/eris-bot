@echo off
:a
setlocal
pushd %~dp0
node .
endlocal
goto a
