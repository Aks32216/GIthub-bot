# GitHub Bot

Event-driven GitHub automation bot. Currently: project scaffold only.

- `backend/` – NestJS + Prisma + PostgreSQL
- `frontend/` – React + Vite + Tailwind CSS

## Run locally

Requires Node 20+ and Docker.

```bash
docker compose up -d                 # Postgres on :5433

cd backend
cp .env.example .env
npm install                          # also runs prisma generate
npm run start:dev                    # http://localhost:3000/api

cd ../frontend
cp .env.example .env
npm install
npm run dev                          # http://localhost:5173
```

Endpoints: `GET /api` (hello world), `GET /api/health` (includes DB ping).

## Environment variables

See `backend/.env.example` and `frontend/.env.example`.
