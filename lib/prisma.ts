import { PrismaClient } from '@prisma/client';

/** Netlify/UI לפעמים שומרים מרכאות או רווחים — Prisma דורש postgresql:// בתחילת המחרוזת */
function normalizeDatabaseUrl(): void {
  const v = process.env.DATABASE_URL;
  if (v === undefined || v === '') return;
  let t = v.trim();
  if (
    (t.startsWith('"') && t.endsWith('"')) ||
    (t.startsWith("'") && t.endsWith("'"))
  ) {
    t = t.slice(1, -1).trim();
  }
  if (t !== v) {
    process.env.DATABASE_URL = t;
  }
}

normalizeDatabaseUrl();

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

/** מניעת יצירת לקוחות מרובים באותו process (חשוב גם ב־Netlify) */
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

globalForPrisma.prisma = prisma;

export default prisma;