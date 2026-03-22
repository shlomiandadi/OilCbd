import 'server-only';
import { redirect } from 'next/navigation';
import { getAdminFromCookie } from '@/lib/admin/user';

export async function requireAdmin() {
  const u = await getAdminFromCookie();
  if (!u) redirect('/admin/login');
  return u;
}

/** רק ADMIN — ניהול משתמשים */
export async function requireAdminRole() {
  const u = await requireAdmin();
  if (u.role !== 'ADMIN') redirect('/admin');
  return u;
}
