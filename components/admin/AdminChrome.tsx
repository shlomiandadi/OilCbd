'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { adminLogout } from '@/lib/admin/actions/auth';

const allLinks = [
  { href: '/admin', label: 'סקירה' },
  { href: '/admin/pages', label: 'עמודי תוכן' },
  { href: '/admin/posts', label: 'פוסטים' },
  { href: '/admin/products', label: 'מוצרים' },
  { href: '/admin/categories', label: 'קטגוריות' },
  { href: '/admin/nav', label: 'תפריט והפוטר' },
  { href: '/admin/settings', label: 'טקסטים גלובליים' },
  { href: '/admin/users', label: 'משתמשים', adminOnly: true },
] as const;

export function AdminChrome({
  children,
  canManageUsers = false,
}: {
  children: React.ReactNode;
  canManageUsers?: boolean;
}) {
  const pathname = usePathname();
  if (pathname === '/admin/login') return <>{children}</>;

  const links = allLinks.filter(
    (l) => !('adminOnly' in l && l.adminOnly) || canManageUsers
  );

  return (
    <div className="flex min-h-screen">
      <aside className="w-56 shrink-0 border-e border-neutral-800 bg-neutral-900/90 p-4">
        <div className="mb-6 text-sm font-semibold text-amber-400">OilCbd — ניהול</div>
        <nav className="flex flex-col gap-0.5">
          {links.map((l) => {
            const active =
              pathname === l.href ||
              (l.href !== '/admin' && pathname.startsWith(l.href + '/'));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                  active
                    ? 'bg-amber-500/15 text-amber-300'
                    : 'text-neutral-300 hover:bg-neutral-800'
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <form action={adminLogout} className="mt-8">
          <button
            type="submit"
            className="w-full rounded-lg border border-neutral-600 px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-800"
          >
            התנתק
          </button>
        </form>
      </aside>
      <main className="min-w-0 flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}
