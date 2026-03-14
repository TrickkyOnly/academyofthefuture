# Деплой на GitHub Pages (`*.github.io`)

## Важно: ограничения
GitHub Pages может хостить **только статический фронтенд**.

Поэтому ваш full-stack проект разворачивается так:
- `frontend` (статический экспорт Next.js) → GitHub Pages.
- `backend` (Express + PostgreSQL + Prisma) → отдельный VPS/Render/Railway/Fly.io.

Если API не опубликован во внешнем интернете, формы/админка не будут работать на `github.io`.

## 1) Включить GitHub Pages
1. Откройте `Settings -> Pages` в репозитории.
2. Source: **GitHub Actions**.

## 2) Добавить Secrets
В `Settings -> Secrets and variables -> Actions` добавьте:
- `NEXT_PUBLIC_API_URL` — публичный URL API, например `https://api.yourdomain.com/api`.
- `API_URL` — URL для build-time fetch (можно такой же, как выше).

## 3) Workflow
В репозитории есть workflow: `.github/workflows/deploy-frontend-pages.yml`.

Он:
- собирает фронтенд в режиме static export,
- публикует папку `frontend/out` в GitHub Pages.

## 4) Base path
Для репозитория `academyofthefuture` используется `NEXT_PUBLIC_BASE_PATH=/academyofthefuture`.

Итоговый адрес будет:
`https://<username>.github.io/academyofthefuture`

## 5) Что не будет работать без внешнего backend
- отправка заявок,
- админ-авторизация,
- Telegram-уведомления,
- любые CRUD операции.

Для полноценного production используйте Docker/VPS (см. основной README).
