@echo off
setlocal EnableExtensions EnableDelayedExpansion
chcp 65001 >nul

cd /d "%~dp0.."

REM Ensure Docker Desktop paths are available in current shell
if exist "%ProgramFiles%\Docker\Docker\resources\bin" set "PATH=%ProgramFiles%\Docker\Docker\resources\bin;%PATH%"
if exist "%ProgramFiles%\Docker\Docker" set "PATH=%ProgramFiles%\Docker\Docker;%PATH%"

where docker >nul 2>nul
if errorlevel 1 (
  echo [INFO] Docker not found. Trying to install via winget...
  where winget >nul 2>nul
  if errorlevel 1 (
    echo [ERROR] winget not found. Install Docker Desktop manually:
    echo         https://www.docker.com/products/docker-desktop/
    exit /b 1
  )

  winget install -e --id Docker.DockerDesktop --accept-source-agreements --accept-package-agreements
  if errorlevel 1 (
    echo [ERROR] Failed to install Docker Desktop automatically.
    exit /b 1
  )

  REM Refresh PATH for this process after install
  if exist "%ProgramFiles%\Docker\Docker\resources\bin" set "PATH=%ProgramFiles%\Docker\Docker\resources\bin;%PATH%"
  if exist "%ProgramFiles%\Docker\Docker" set "PATH=%ProgramFiles%\Docker\Docker;%PATH%"
)

REM Try to start Docker Desktop automatically
if exist "%ProgramFiles%\Docker\Docker\Docker Desktop.exe" (
  start "" "%ProgramFiles%\Docker\Docker\Docker Desktop.exe"
)

echo [INFO] Waiting for Docker engine and compose...
set /a tries=0
:wait_docker
set /a tries+=1

docker info >nul 2>nul
if errorlevel 1 goto still_waiting

docker compose version >nul 2>nul
if not errorlevel 1 goto docker_ready

:still_waiting
if !tries! geq 60 goto docker_not_ready
powershell -NoProfile -Command "Start-Sleep -Seconds 2" >nul 2>nul
goto wait_docker

:docker_not_ready
echo [ERROR] Docker is installed but not ready.
echo         Open Docker Desktop and wait until status is "Engine running".
echo         Then run this script again.
exit /b 1

:docker_ready
if not exist backend\.env (
  copy backend\.env.example backend\.env >nul
  echo [INFO] Created backend\.env from backend\.env.example
)

if not exist frontend\.env.local (
  copy frontend\.env.example frontend\.env.local >nul
  echo [INFO] Created frontend\.env.local from frontend\.env.example
)

echo [INFO] Building and starting services...
docker compose up -d --build
if errorlevel 1 (
  echo [ERROR] Failed to start containers.
  exit /b 1
)

echo [INFO] Waiting for API health endpoint...
set /a counter=0
:wait_api
set /a counter+=1
curl -sf http://localhost/api/health >nul 2>nul
if not errorlevel 1 goto ok
curl -sf http://localhost/health >nul 2>nul
if not errorlevel 1 goto ok
if !counter! geq 30 goto done_wait
powershell -NoProfile -Command "Start-Sleep -Seconds 2" >nul 2>nul
goto wait_api

:done_wait
echo [WARN] Health endpoint did not respond in time, but services may still be starting.

:ok
echo.
echo [OK] Project is running on localhost
echo - Site: http://localhost
echo - API:  http://localhost/api
echo.
echo Useful commands:
echo - Logs: docker compose logs -f
echo - Stop: docker compose down
exit /b 0
