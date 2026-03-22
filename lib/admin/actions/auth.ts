'use server';

import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { createAdminSession, clearAdminCookie } from '@/lib/admin/session';

export async function adminLogin(formData: FormData) {
  const email = String(formData.get('email') ?? '')
    .trim()
    .toLowerCase();
  const password = String(formData.get('password') ?? '');
  let next = String(formData.get('next') ?? '/admin');
  if (!next.startsWith('/') || next.startsWith('//')) next = '/admin';

  if (!email || !password) {
    redirect(`/admin/login?err=${encodeURIComponent('מלאו אימייל וסיסמה')}`);
  }

  const user = await prisma.adminUser.findUnique({ where: { email } });
  const ok =
    user && (await bcrypt.compare(password, user.passwordHash));
  if (!ok) {
    redirect(`/admin/login?err=${encodeURIComponent('אימייל או סיסמה שגויים')}`);
  }

  await createAdminSession({
    sub: user!.id,
    email: user!.email,
    role: user!.role,
  });
  redirect(next);
}

export async function adminLogout() {
  await clearAdminCookie();
  redirect('/admin/login');
}
