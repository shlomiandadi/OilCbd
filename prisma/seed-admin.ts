import bcrypt from 'bcryptjs';
import type { PrismaClient } from '@prisma/client';

/** יוצר/מעדכן משתמש אדמין אם מוגדרים ADMIN_SEED_EMAIL ו־ADMIN_SEED_PASSWORD */
export async function seedAdminUser(prisma: PrismaClient) {
  const email = process.env.ADMIN_SEED_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_SEED_PASSWORD;
  if (!email || !password) {
    console.warn(
      '[seed] דילוג על יצירת אדמין: הגדרו ADMIN_SEED_EMAIL ו־ADMIN_SEED_PASSWORD ב־.env'
    );
    return;
  }
  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.adminUser.upsert({
    where: { email },
    create: {
      email,
      passwordHash,
      name: 'מנהל',
      role: 'ADMIN',
    },
    update: { passwordHash },
  });
  console.log(`[seed] משתמש ניהול: ${email}`);
}
