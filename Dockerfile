# Install dependencies only when needed
FROM node:20-bookworm-slim AS deps
RUN apt-get update && apt-get install -y --no-install-recommends \
	make \
	gcc \
	g++ \
	python3 \
	&& rm -rf /var/lib/apt/lists/*
WORKDIR /app

RUN corepack enable

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile


# Rebuild the source code only when needed
FROM node:20-bookworm-slim AS builder
ENV GENERATE_SOURCEMAP=false

WORKDIR /app
RUN corepack enable
ARG NEXT_PUBLIC_API_KEY=https://api.symoria.io/v1/api/admin
ARG NEXT_PUBLIC_PLACES_API_KEY=
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

ENV NEXT_PUBLIC_API_KEY=$NEXT_PUBLIC_API_KEY
ENV NEXT_PUBLIC_PLACES_API_KEY=$NEXT_PUBLIC_PLACES_API_KEY
ENV NODE_ENV=production
RUN pnpm run build

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM node:20-bookworm-slim AS runner
WORKDIR /app

RUN corepack enable

# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/ ./.next/

USER nextjs

EXPOSE 3000

ENV PORT=3000
CMD ["pnpm","start"]
