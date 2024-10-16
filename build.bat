@echo off
setlocal
pushd %~dp0
npm run build
echo Build complete.
echo.
endlocal
