# VPS deployment guide

1. Install Docker and Docker Compose plugin.
2. Clone repository to `/opt/aof`.
3. Configure env values in `backend/.env` and `frontend/.env.local` (and adjust compose env_file if needed).
4. Run:
   ```bash
   docker compose pull
   docker compose up -d --build
   ```
5. Configure DNS and TLS certificate.
6. For updates:
   ```bash
   git pull
   docker compose up -d --build
   ```
