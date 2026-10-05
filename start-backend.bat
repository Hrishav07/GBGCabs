@echo off
title GoBabyGo Cabs - PHP Backend Server
echo ==============================================================================
echo GoBabyGo Cabs - PHP 8.3 Backend Server
echo Running on: http://localhost:8000
echo API Health: http://localhost:8000/api/health
echo Press Ctrl+C to stop the server
echo ==============================================================================
php -S localhost:8000 backend/router.php
pause
