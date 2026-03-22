/** כתובת האתר הבסיסית (לקנוניקל ו־Open Graph). הגדר ב־.env: NEXT_PUBLIC_SITE_URL */
export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '');
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}
