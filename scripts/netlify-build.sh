#!/usr/bin/env sh
# Netlify: מיגרציה עם חיבור ישיר (מונע P1002 advisory lock עם Neon pooler),
# ואז build עם DATABASE_URL המקורי (pooler) לשאילתות Next.
set -e
ORIGINAL_URL="$DATABASE_URL"
MIGRATE_URL="${DIRECT_URL:-${DATABASE_URL_UNPOOLED:-$ORIGINAL_URL}}"
export DATABASE_URL="$MIGRATE_URL"
npx prisma migrate deploy
export DATABASE_URL="$ORIGINAL_URL"
npm run build
