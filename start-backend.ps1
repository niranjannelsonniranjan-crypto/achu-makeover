# Note: Using MongoDB Atlas (cloud MongoDB) - no local MongoDB needed
Write-Host "Using MongoDB Atlas (cloud MongoDB)..." -ForegroundColor Green

# Start Backend Server
Write-Host "`nStarting Backend Server..." -ForegroundColor Green
$nodePath = "C:\New folder\Achu bridal\backend\server\.tools\node\node.exe"
$serverPath = "C:\New folder\Achu bridal\backend\server\server.js"

Set-Location "C:\New folder\Achu bridal\backend\server"

# Environment variables are loaded from .env file

Write-Host "Server will run on http://localhost:5000" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host "`n========================================`n" -ForegroundColor Cyan

& $nodePath $serverPath
