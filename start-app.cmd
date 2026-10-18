@echo off
title Achu Bridal Studio - Backend
cd /d "%~dp0"

set "MONGO_EXE=%~dp0.tools\mongodb-win32-x86_64-windows-8.0.34\bin\mongod.exe"
set "NODE_DIR=%~dp0.tools\node"
set "PATH=%NODE_DIR%;%PATH%"

echo ============================================
echo   Achu Bridal Studio - starting backend
echo ============================================
echo.

netstat -ano | findstr ":27017" | findstr "LISTENING" >nul
if errorlevel 1 (
  echo [1/2] Starting local MongoDB...
  start "Achu Bridal MongoDB" /min "%MONGO_EXE%" --dbpath "%~dp0.tools\mongodb-data" --port 27017 --bind_ip 127.0.0.1 --logpath "%~dp0.tools\mongodb-logs\mongod.log" --logappend
  ping 127.0.0.1 -n 7 >nul
) else (
  echo [1/2] MongoDB already running on port 27017.
)

echo [2/2] Starting API server on http://localhost:5000
echo.
echo   Keep this window OPEN while using the website.
echo   Press Ctrl+C to stop the server.
echo.
echo   Admin login: admin@achubridal.com / Admin@12345
echo ============================================
echo.

cd /d "%~dp0server"
"%NODE_DIR%\node.exe" server.js

echo.
echo Server stopped.
pause
