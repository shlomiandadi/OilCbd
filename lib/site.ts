const DEFAULT_SITE_URL = 'https://oil-cbd.netlify.app/';

/** כתובת האתר הבסיסית (לקנוניקל ו־Open Graph). הגדר ב־.env: NEXT_PUBLIC_SITE_URL */
export function getSiteUrl(): string {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL)
    .replace(/\/$/, '')
    .trim();
  if (!raw) return DEFAULT_SITE_URL;
  try {
    new URL(raw);
    return raw;
  } catch {
    console.warn('[getSiteUrl] NEXT_PUBLIC_SITE_URL לא תקין, משתמשים בברירת מחדל:', raw);
    return DEFAULT_SITE_URL;
  }
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}
