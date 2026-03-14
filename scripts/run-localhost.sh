#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if ! command -v docker >/dev/null 2>&1; then
  echo "❌ Docker не найден. Установите Docker и повторите запуск."
  exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "❌ Docker Compose plugin не найден. Установите docker compose plugin."
  exit 1
fi

if [[ ! -f backend/.env ]]; then
  cp backend/.env.example backend/.env
  echo "ℹ️ Создан backend/.env из backend/.env.example"
fi

if [[ ! -f frontend/.env.local ]]; then
  cp frontend/.env.example frontend/.env.local
  echo "ℹ️ Создан frontend/.env.local из frontend/.env.example"
fi

# Для docker-compose используются env_file .env.example,
# поэтому дополнительно подхватываем реальные env, если они есть.
export COMPOSE_DOCKER_CLI_BUILD=1
export DOCKER_BUILDKIT=1

echo "🚀 Сборка и запуск сервисов..."
docker compose up -d --build

echo "⏳ Ожидание доступности API..."
for i in {1..30}; do
  if curl -sf http://localhost/api/health >/dev/null 2>&1 || curl -sf http://localhost/health >/dev/null 2>&1; then
    break
  fi
  sleep 2
done

echo "\n✅ Проект запущен на localhost"
echo "- Сайт: http://localhost"
echo "- API:  http://localhost/api"
echo "\nПолезные команды:"
echo "- Логи:   docker compose logs -f"
echo "- Стоп:   docker compose down"
