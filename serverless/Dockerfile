FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

COPY . .

# Cloud Run injects PORT env var, default to 8080
ENV PORT=8080

EXPOSE 8080

CMD ["node", "local-server.js"]
