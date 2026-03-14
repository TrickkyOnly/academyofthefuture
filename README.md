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
```bash
bash scripts/run-localhost.sh
```
Скрипт автоматически:
- при необходимости устанавливает Docker и Docker Compose plugin (Linux, нужен root/sudo),
- создаёт `backend/.env` и `frontend/.env.local` из `.env.example` (если файлов нет),
- собирает и поднимает контейнеры,
- выводит адреса проекта и полезные команды.

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
