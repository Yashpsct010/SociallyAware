# ---- Stage 1: Build Frontend ----
FROM node:20 AS frontend-builder
WORKDIR /app
COPY package.json package-lock.json* ./
# Use install instead of ci to be more flexible with lockfiles
RUN npm install
COPY . .
RUN npm run build

# ---- Stage 2: Build Backend & Final Image ----
FROM node:20-slim
WORKDIR /app

# Copy backend package files
COPY serverless/package.json ./
# Install only production dependencies
RUN npm install --omit=dev

# Copy backend source (everything in serverless/)
COPY serverless/ ./

# Copy the built frontend from Stage 1
COPY --from=frontend-builder /app/dist ./dist

# Final sanity check: List files to logs so we can debug if it fails
RUN ls -la && ls -la dist/

ENV PORT=8080
EXPOSE 8080

CMD ["node", "local-server.js"]
