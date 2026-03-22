import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

/** מניעת יצירת לקוחות מרובים באותו process (חשוב גם ב־Vercel warm instances) */
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

globalForPrisma.prisma = prisma;

export default prisma;