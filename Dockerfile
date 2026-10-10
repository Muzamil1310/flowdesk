# syntax=docker/dockerfile:1
# FlowDesk Phase 5 Multi-Stage Production Dockerfile

# Stage 1: Build Frontend & Server Assets
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production Minimal Runtime (Zero devDependencies, No tsx required)
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Install production dependencies only (pruned from dev tooling)
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy pre-compiled distribution (Vite client assets + compiled server.js)
COPY --from=builder /app/dist ./dist

# Run as non-root user for security
USER node

EXPOSE 3000

# Run pure Node 22 ESM runtime directly
CMD ["node", "dist/server.js"]
