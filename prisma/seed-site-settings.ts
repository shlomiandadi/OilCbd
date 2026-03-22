import type { PrismaClient } from '@prisma/client';
import { SITE_TEXT_DEFAULTS } from '../lib/site-text';

/** Upsert כל טקסטי האתר מ־SITE_TEXT_DEFAULTS (דף הבית, הדר, פוטר) */
export async function seedSiteSettings(prisma: PrismaClient) {
  for (const [key, value] of Object.entries(SITE_TEXT_DEFAULTS)) {
    await prisma.siteSetting.upsert({
      where: { key },
      create: { key, value },
      update: { value },
    });
  }
}
