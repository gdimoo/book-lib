# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY tsconfig.json nest-cli.json* ./
COPY src ./src
RUN npm run build

# ---- Runtime stage ----
FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache curl
ENV PORT=4000
ENV AUTH_TOKEN=sk_demo_token_123
ENV UPLOAD_DIR=/app/uploads
ENV DB_PATH=/app/database/db.sqlite
RUN mkdir -p /app/uploads /app/database
COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm ci --omit=dev
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
EXPOSE 4000
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
