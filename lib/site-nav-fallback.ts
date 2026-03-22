/** כשה־DB לא זמין בפרודקשן — ניווט בסיסי שלא תלוי ב־SiteNavLink */
export type FallbackNavItem = { id: string; label: string; href: string };

export const FALLBACK_HEADER_NAV: FallbackNavItem[] = [
  { id: 'fallback-header-products', label: 'מוצרים', href: '/' },
  { id: 'fallback-header-learn', label: 'מדריכים', href: '/learn' },
  { id: 'fallback-header-blog', label: 'בלוג', href: '/blog' },
];

export const FALLBACK_FOOTER_NAV: FallbackNavItem[] = [
  { id: 'fallback-footer-learn', label: 'מדריכים', href: '/learn' },
  { id: 'fallback-footer-blog', label: 'בלוג', href: '/blog' },
  { id: 'fallback-footer-checkout', label: 'תשלום', href: '/checkout' },
  {
    id: 'fallback-footer-privacy',
    label: 'מדיניות פרטיות',
    href: '/learn/privacy-policy',
  },
];

export const FALLBACK_FOOTER_DISCLAIMER =
  'המידע באתר מיועד לידע כללי בלבד ואינו מהווה ייעוץ רפואי, משפטי או מקצועי. יש להתייעץ עם רופא לפני שימוש במוצרי CBD או קנאביס.';
