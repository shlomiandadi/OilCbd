import { SignJWT, jwtVerify } from 'jose';

const MAX_AGE_SEC = 60 * 60 * 24 * 7;

function getSecretKeyBytes(): Uint8Array | null {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (s && s.length >= 16) return new TextEncoder().encode(s);
  if (process.env.NODE_ENV === 'development') {
    return new TextEncoder().encode('dev-admin-secret-min-16-chars');
  }
  return null;
}

export type AdminJwtPayload = {
  sub: string;
  email: string;
  role: string;
};

export async function signAdminToken(payload: AdminJwtPayload): Promise<string> {
  const key = getSecretKeyBytes();
  if (!key) {
    throw new Error('ADMIN_SESSION_SECRET חייב להיות מוגדר (לפחות 16 תווים)');
  }
  return new SignJWT({ email: payload.email, role: payload.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SEC}s`)
    .sign(key);
}

export async function verifyAdminToken(
  token: string | undefined
): Promise<AdminJwtPayload | null> {
  const key = getSecretKeyBytes();
  if (!key || !token) return null;
  try {
    const { payload } = await jwtVerify(token, key);
    const sub = String(payload.sub ?? '');
    if (!sub) return null;
    return {
      sub,
      email: String(payload.email ?? ''),
      role: String(payload.role ?? 'EDITOR'),
    };
  } catch {
    return null;
  }
}

export const ADMIN_TOKEN_MAX_AGE = MAX_AGE_SEC;
