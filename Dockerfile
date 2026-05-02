# ---- Stage 1: Build Frontend ----
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build

# ---- Stage 2: Build Backend & Final Image ----
FROM node:20-alpine
WORKDIR /app

# Copy backend package files
COPY serverless/package.json serverless/package-lock.json* ./
RUN npm ci --omit=dev

# Copy backend source
COPY serverless/ ./

# Copy the built frontend from Stage 1 into the backend's dist folder
COPY --from=frontend-builder /app/dist ./dist

# Cloud Run default port
ENV PORT=8080
EXPOSE 8080

CMD ["node", "local-server.js"]
