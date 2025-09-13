# Book Library (Full Stack)

NestJS + SQLite + React/TS + file upload (local) + simple token auth.

## Local Dev (no Docker)

Backend:
```bash
cd backend
cp .env.example .env
mkdir -p uploads database
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


# (Docker) It's still has problem when call file to display, so can't run full-loop

```bash
docker compose build
docker compose up -d
# Frontend: http://localhost:5173  (login: admin/admin)
# Backend:  http://localhost:4000
```

* Seed runs automatically on backend start (idempotent).


## API Notes
- `POST /auth/login` => `{ token }`  (admin/admin)
- `GET /books?q=...` list/search
- `GET /books/:id` get
- `POST /books` (multipart) create (fields: title, author, isbn, publicationYear, quantity, cover?)
- `PATCH /books/:id` (multipart) update
- `DELETE /books/:id`
- `POST /books/:id/borrow`
- `POST /books/:id/return`

## Note
- I tried using Docker Compose to simplify development and run the project on other machines, but it was still unsuccessful.
- I also tried creating a development setup with Docker Compose to enable hot reload during development, but that was also unsuccessful.