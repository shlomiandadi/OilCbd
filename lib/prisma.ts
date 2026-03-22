import { PrismaClient } from '@prisma/client';
import { normalizeDatabaseUrlString } from '@/lib/database-url';

/** Netlify / העתקה — Prisma דורש postgresql:// בתחילת המחרוזת */
function applyDatabaseUrlFromEnv(): void {
  const v = process.env.DATABASE_URL;
  if (v === undefined || v === '') return;
  process.env.DATABASE_URL = normalizeDatabaseUrlString(v);
}

applyDatabaseUrlFromEnv();

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

/** מניעת יצירת לקוחות מרובים באותו process (חשוב גם ב־Netlify) */
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

globalForPrisma.prisma = prisma;

export default prisma;