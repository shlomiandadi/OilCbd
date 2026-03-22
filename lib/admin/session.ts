import 'server-only';
import { cookies } from 'next/headers';
import { signAdminToken, ADMIN_TOKEN_MAX_AGE } from '@/lib/admin/jwt';
import type { AdminJwtPayload } from '@/lib/admin/jwt';

const COOKIE = 'admin_token';

export async function setAdminCookie(token: string) {
  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: ADMIN_TOKEN_MAX_AGE,
  });
}

export async function clearAdminCookie() {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function createAdminSession(payload: AdminJwtPayload) {
  const token = await signAdminToken(payload);
  await setAdminCookie(token);
}

export { COOKIE as ADMIN_TOKEN_COOKIE };
export type { AdminJwtPayload };
