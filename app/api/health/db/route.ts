import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** בדיקת חיבור Prisma ב-Netlify — פתחו GET /api/health/db */
export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    const productCount = await prisma.product.count();
    const variantCount = await prisma.productVariant.count();
    return NextResponse.json({
      ok: true,
      database: 'connected',
      productCount,
      variantCount,
    });
  } catch (e) {
    const message =
      e instanceof Error ? e.message.replace(/postgresql:\/\/[^@\s]+@/g, 'postgresql://***@') : 'unknown';
    const code =
      e && typeof e === 'object' && 'code' in e ? String((e as { code: string }).code) : undefined;
    console.error('[health/db]', e);
    return NextResponse.json(
      {
        ok: false,
        database: 'error',
        prismaCode: code,
        message,
      },
      { status: 500 }
    );
  }
}
