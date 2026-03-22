/**
 * נירמול DATABASE_URL — Netlify / העתקות עם BOM, רישיות, טקסט לפני ה-URL
 */
export function normalizeDatabaseUrlString(raw: string): string {
  let t = raw.trim().replace(/^\uFEFF/, '');

  if (
    (t.startsWith('"') && t.endsWith('"')) ||
    (t.startsWith("'") && t.endsWith("'"))
  ) {
    t = t.slice(1, -1).trim().replace(/^\uFEFF/, '');
  }

  const lower = t.toLowerCase();
  if (!lower.startsWith('postgresql://') && !lower.startsWith('postgres://')) {
    const idxPg = lower.indexOf('postgresql://');
    const idxP = lower.indexOf('postgres://');
    if (idxPg >= 0) t = t.slice(idxPg);
    else if (idxP >= 0) t = t.slice(idxP);
  }

  const m = t.match(/^(postgres(ql)?):\/\//i);
  if (m) {
    const rest = t.slice(m[0].length);
    return `postgresql://${rest}`;
  }

  return t;
}

export function isValidPostgresUrl(t: string): boolean {
  const s = t.trim();
  return s.startsWith('postgresql://') || s.startsWith('postgres://');
}
