# syntax=docker.io/docker/dockerfile:1

# === Base image ===
FROM node:20-alpine AS base

# Add system dependencies
RUN apk add --no-cache libc6-compat

WORKDIR /app

# === Install dependencies ===
FROM base AS deps

# Copy package files
COPY package.json pnpm-lock.yaml* .npmrc* ./

# Enable pnpm (comes with corepack)
RUN corepack enable pnpm

# Install dependencies (production + build)
RUN pnpm install --frozen-lockfile

# === Build stage ===
FROM base AS builder
WORKDIR /app

# Copy node_modules from deps
COPY --from=deps /app/node_modules ./node_modules

# Copy full source
COPY . .

# Use production env file
COPY .env.production .env

# Build Next.js app
RUN pnpm build

# === Final runtime image ===
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4747

# Create non-root user
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

# Copy built assets
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Use non-root user
USER nextjs

EXPOSE 4747

# Start Next.js standalone server
CMD ["node", "server.js"]
