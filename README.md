# Академия будущего — production-ready редизайн платформы

Полноценный full-stack проект для центра психологической помощи подросткам.

## Стек
- **Frontend**: Next.js 14 (App Router), React, TailwindCSS, SSR/SEO
- **Backend**: Node.js, Express, Prisma ORM, JWT, REST API
- **DB**: PostgreSQL
- **Infra**: Docker, Docker Compose, Nginx reverse proxy

## Быстрый старт (Docker)
```bash
docker compose up --build
```

После старта:
- Frontend: http://localhost
- API: http://localhost/api

## Запуск в localhost одной командой
Linux/macOS:
```bash
sh scripts/run-localhost.sh
```

Windows:
```bat
scripts\run-localhost.bat
```

Скрипты автоматически:
- при необходимости устанавливают Docker (`.sh` для Linux, `.bat` для Windows через winget и автозапуск Docker Desktop),
- создают `backend/.env` и `frontend/.env.local` из `.env.example` (если файлов нет),
- собирают и поднимают контейнеры,
- выводят адреса проекта и полезные команды.

## Локальный запуск
### 1) Backend
```bash
cd backend
cp .env.example .env
npm install
npx prisma migrate dev --name init
npm run dev
```

### 2) Frontend
```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```


### Частая ошибка Docker build
Если видите ошибку вида:
`failed to calculate checksum ... "/app/public": not found`

Причина: в Next.js проекте отсутствует папка `frontend/public`.
В репозитории уже добавлен `frontend/public/.gitkeep`, чтобы сборка Docker проходила стабильно.


### Prisma/OpenSSL ошибка в backend
Если видите ошибку Prisma вида `Could not parse schema engine response` и предупреждения про OpenSSL:
1. Используйте обновлённый backend-образ (на `node:20-bookworm-slim` с установленным `openssl`).
2. Пересоберите backend без кэша:
   ```bash
   docker compose build --no-cache backend
   docker compose up -d
   ```

## VPS деплой (кратко)
1. Установить Docker + Docker Compose.
2. Склонировать репозиторий и заполнить `.env` файлы.
3. Запустить `docker compose up -d --build`.
4. Подключить домен к серверу (A-запись), выпустить TLS (например через certbot + nginx).
5. Настроить backup PostgreSQL и ротацию логов.

## Production структура
- `frontend/` — публичный сайт + SSR + admin UI
- `backend/` — REST API + auth + админка API
- `nginx/` — reverse proxy + кэширование статики
- `scripts/` — служебные скрипты


## Деплой фронтенда на GitHub Pages (`.github.io`)
Можно развернуть только статический frontend (без backend внутри GitHub Pages).

Кратко:
1. Включите `Settings -> Pages -> Source: GitHub Actions`.
2. Добавьте secrets: `NEXT_PUBLIC_API_URL`, `API_URL`.
3. Запустите workflow `.github/workflows/deploy-frontend-pages.yml`.

Подробная инструкция: `docs/github-pages.md`.
