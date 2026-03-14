#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

SUDO=""
if [[ "${EUID:-$(id -u)}" -ne 0 ]]; then
  if command -v sudo >/dev/null 2>&1; then
    SUDO="sudo"
  else
    echo "❌ Нужны права root/sudo для установки Docker, но sudo не найден."
    exit 1
  fi
fi

install_docker() {
  echo "⚙️ Docker не найден. Запускаю автоустановку (Linux, get.docker.com)..."

  if ! command -v curl >/dev/null 2>&1; then
    if command -v apt-get >/dev/null 2>&1; then
      $SUDO apt-get update
      $SUDO apt-get install -y curl ca-certificates
    elif command -v yum >/dev/null 2>&1; then
      $SUDO yum install -y curl ca-certificates
    elif command -v dnf >/dev/null 2>&1; then
      $SUDO dnf install -y curl ca-certificates
    else
      echo "❌ Не удалось установить curl автоматически (неизвестный пакетный менеджер)."
      exit 1
    fi
  fi

  curl -fsSL https://get.docker.com -o /tmp/get-docker.sh
  $SUDO sh /tmp/get-docker.sh
  rm -f /tmp/get-docker.sh

  if [[ -n "$SUDO" ]]; then
    $SUDO usermod -aG docker "$USER" || true
    echo "ℹ️ Пользователь добавлен в группу docker. Если потребуется, перелогиньтесь."
  fi

  if command -v systemctl >/dev/null 2>&1; then
    $SUDO systemctl enable --now docker || true
  fi
}

ensure_docker_and_compose() {
  if ! command -v docker >/dev/null 2>&1; then
    install_docker
  fi

  if ! docker compose version >/dev/null 2>&1; then
    echo "⚙️ Docker Compose plugin не найден. Пробую доустановить..."
    if command -v apt-get >/dev/null 2>&1; then
      $SUDO apt-get update
      $SUDO apt-get install -y docker-compose-plugin
    elif command -v dnf >/dev/null 2>&1; then
      $SUDO dnf install -y docker-compose-plugin || true
    elif command -v yum >/dev/null 2>&1; then
      $SUDO yum install -y docker-compose-plugin || true
    fi
  fi

  if ! docker compose version >/dev/null 2>&1; then
    echo "❌ Не удалось подготовить docker compose. Установите Docker Compose plugin вручную."
    exit 1
  fi
}

ensure_docker_and_compose

if [[ ! -f backend/.env ]]; then
  cp backend/.env.example backend/.env
  echo "ℹ️ Создан backend/.env из backend/.env.example"
fi

if [[ ! -f frontend/.env.local ]]; then
  cp frontend/.env.example frontend/.env.local
  echo "ℹ️ Создан frontend/.env.local из frontend/.env.example"
fi

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

echo
echo "✅ Проект запущен на localhost"
echo "- Сайт: http://localhost"
echo "- API:  http://localhost/api"
echo
echo "Полезные команды:"
echo "- Логи:   docker compose logs -f"
echo "- Стоп:   docker compose down"
