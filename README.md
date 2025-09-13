# Book Library (Full Stack)

NestJS + SQLite + React/TS + file upload (local) + simple token auth.

## Quick Start (Docker)

```bash
docker compose build
docker compose up -d
# Frontend: http://localhost:5173  (login: admin/admin)
# Backend:  http://localhost:4000
```

* Seed runs automatically on backend start (idempotent).

## Local Dev (no Docker)

Backend:
```bash
cd backend
cp .env.example .env
npm i
npm run seed
npm run start:dev
```

Frontend:
```bash
cd frontend
npm i
npm run dev
```

## API Notes
- `POST /auth/login` => `{ token }`  (admin/admin)
- `GET /books?q=...` list/search
- `GET /books/:id` get
- `POST /books` (multipart) create (fields: title, author, isbn, publicationYear, quantity, cover?)
- `PATCH /books/:id` (multipart) update
- `DELETE /books/:id`
- `POST /books/:id/borrow`
- `POST /books/:id/return`
