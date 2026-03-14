@echo off
setlocal enabledelayedexpansion

cd /d "%~dp0.."

where docker >nul 2>nul
if errorlevel 1 (
  echo [INFO] Docker не найден. Пытаюсь установить через winget...
  where winget >nul 2>nul
  if errorlevel 1 (
    echo [ERROR] winget не найден. Установите Docker Desktop вручную:
    echo         https://www.docker.com/products/docker-desktop/
    exit /b 1
  )

  winget install -e --id Docker.DockerDesktop --accept-source-agreements --accept-package-agreements
  if errorlevel 1 (
    echo [ERROR] Не удалось установить Docker Desktop автоматически.
    exit /b 1
  )

  echo [INFO] Docker Desktop установлен. Запустите Docker Desktop и дождитесь статуса "Engine running".
)

echo [INFO] Проверка доступности docker compose...
docker compose version >nul 2>nul
if errorlevel 1 (
  echo [ERROR] docker compose недоступен. Убедитесь, что Docker Desktop запущен.
  exit /b 1
)

if not exist backend\.env (
  copy backend\.env.example backend\.env >nul
  echo [INFO] Создан backend\.env из backend\.env.example
)

if not exist frontend\.env.local (
  copy frontend\.env.example frontend\.env.local >nul
  echo [INFO] Создан frontend\.env.local из frontend\.env.example
)

echo [INFO] Сборка и запуск сервисов...
docker compose up -d --build
if errorlevel 1 (
  echo [ERROR] Не удалось поднять контейнеры.
  exit /b 1
)

echo [INFO] Ожидание API...
set /a counter=0
:wait_loop
set /a counter+=1
curl -sf http://localhost/api/health >nul 2>nul
if not errorlevel 1 goto ok
curl -sf http://localhost/health >nul 2>nul
if not errorlevel 1 goto ok
if !counter! geq 30 goto done_wait
powershell -NoProfile -Command "Start-Sleep -Seconds 2" >nul 2>nul
goto wait_loop

:done_wait
echo [WARN] Health endpoint не ответил вовремя, но сервисы могли запуститься.

:ok
echo.
echo [OK] Проект запущен на localhost
echo - Сайт: http://localhost
echo - API:  http://localhost/api
echo.
echo Полезные команды:
echo - Логи: docker compose logs -f
echo - Стоп: docker compose down
exit /b 0
