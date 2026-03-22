import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import {
  isValidPostgresUrl,
  normalizeDatabaseUrlString,
} from '@/lib/database-url';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function checkDatabaseUrl(): { ok: true } | { ok: false; body: Record<string, unknown> } {
  const raw = process.env.DATABASE_URL;
  if (raw === undefined || raw === '') {
    return {
      ok: false,
      body: {
        ok: false,
        database: 'error',
        issue: 'DATABASE_URL_missing',
        hintHe:
          'המשתנה DATABASE_URL ריק או לא קיים בסביבת הריצה. ב-Netlify: Environment variables → ודאו שבקשר Production יש ערך, ושהסקופ כולל Functions ו-Runtime.',
      },
    };
  }

  const normalized = normalizeDatabaseUrlString(raw);
  if (!isValidPostgresUrl(normalized)) {
    const head = normalized.slice(0, 24);
    return {
      ok: false,
      body: {
        ok: false,
        database: 'error',
        issue: 'DATABASE_URL_invalid_prefix',
        hintHe:
          'הערך חייב להכיל מחרוזת מלאה שמתחילה ב-postgresql:// (מ-Neon: Connection string). נפוץ: טקסט נוסף לפני ה-URL, או רישיות לא סטנדרטיות — עדכנו את הקוד לנרמול אוטומטי; אם עדיין נכשל, הדביקו רק את ה-URL מהדשבורד של Neon.',
        lengthChars: normalized.length,
        firstCharsPreview: head.replace(/[^\x20-\x7E]/g, '?'),
      },
    };
  }

  return { ok: true };
}

/** בדיקת חיבור Prisma ב-Netlify — פתחו GET /api/health/db */
export async function GET() {
  const urlCheck = checkDatabaseUrl();
  if (!urlCheck.ok) {
    return NextResponse.json(urlCheck.body, { status: 500 });
  }

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
