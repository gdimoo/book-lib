#!/bin/sh
set -e
mkdir -p "${UPLOAD_DIR:-/app/uploads}" /app/database
echo "Seeding database (if empty)…"
node dist/seed.js || echo "Seed skipped/failed (non-fatal)"
echo "Starting API…"
exec node dist/main.js
