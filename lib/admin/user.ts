import 'server-only';
import prisma from '@/lib/prisma';
import { verifyAdminToken } from '@/lib/admin/jwt';
import { ADMIN_TOKEN_COOKIE } from '@/lib/admin/session';
import { cookies } from 'next/headers';

export async function getAdminFromCookie() {
  const token = (await cookies()).get(ADMIN_TOKEN_COOKIE)?.value;
  const payload = await verifyAdminToken(token);
  if (!payload) return null;
  const user = await prisma.adminUser.findUnique({ where: { id: payload.sub } });
  if (!user) return null;
  return user;
}

export function isAdminRole(role: string) {
  return role === 'ADMIN';
}
