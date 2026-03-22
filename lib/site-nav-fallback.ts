import type { NavNode } from '@/lib/nav-tree';

/** כשה־DB לא זמין בפרודקשן — ניווט בסיסי שלא תלוי ב־SiteNavLink */
export type FallbackNavItem = { id: string; label: string; href: string };

export const FALLBACK_HEADER_TREE: NavNode[] = [
  { id: 'fb-p', label: 'מוצרים', href: '/', sortOrder: 0, children: [] },
  { id: 'fb-a', label: 'מי אנחנו', href: '/about', sortOrder: 1, children: [] },
  { id: 'fb-c', label: 'צור קשר', href: '/contact', sortOrder: 2, children: [] },
  {
    id: 'fb-s',
    label: 'שמן קנאביס',
    href: '/learn/shemen-cannabis',
    sortOrder: 3,
    children: [
      {
        id: 'fb-s1',
        label: 'שמן קנאביס לכאבים',
        href: '/learn/shemen-cannabis-le-kaavim',
        sortOrder: 0,
        children: [],
      },
      {
        id: 'fb-s2',
        label: 'מה זה שמן קנאביס',
        href: '/learn/ma-ze-shemen-cannabis',
        sortOrder: 1,
        children: [],
      },
      {
        id: 'fb-s3',
        label: 'שמן קנאביס חוקי',
        href: '/learn/shemen-cannabis-huki',
        sortOrder: 2,
        children: [],
      },
    ],
  },
  { id: 'fb-l', label: 'מדריכים', href: '/learn', sortOrder: 4, children: [] },
  { id: 'fb-b', label: 'בלוג', href: '/blog', sortOrder: 5, children: [] },
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
  { id: 'fallback-footer-about', label: 'מי אנחנו', href: '/about' },
  { id: 'fallback-footer-contact', label: 'צור קשר', href: '/contact' },
];

export const FALLBACK_FOOTER_DISCLAIMER =
  'המידע באתר מיועד לידע כללי בלבד ואינו מהווה ייעוץ רפואי, משפטי או מקצועי. יש להתייעץ עם רופא לפני שימוש במוצרי CBD או קנאביס.';
