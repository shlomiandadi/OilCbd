'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { adminLogout } from '@/lib/admin/actions/auth';

const allLinks = [
  { href: '/admin', label: 'סקירה', icon: '◆' },
  { href: '/admin/pages', label: 'עמודי תוכן', icon: '◇' },
  { href: '/admin/posts', label: 'פוסטים', icon: '◇' },
  { href: '/admin/products', label: 'מוצרים', icon: '◇' },
  { href: '/admin/categories', label: 'קטגוריות', icon: '◇' },
  { href: '/admin/nav', label: 'תפריט והפוטר', icon: '◇' },
  { href: '/admin/settings', label: 'טקסטים גלובליים', icon: '◇' },
  { href: '/admin/users', label: 'משתמשים', icon: '◇', adminOnly: true },
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
    <div className="admin-app flex min-h-screen bg-[#e8efe9]">
      <aside className="relative flex w-60 shrink-0 flex-col border-e border-emerald-950/10 bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white shadow-xl lg:w-64">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_0%_0%,rgba(255,255,255,0.08),transparent)]"
          aria-hidden
        />
        <div className="relative border-b border-white/10 px-5 py-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300/80">
            OilCbd
          </p>
          <p className="mt-1 text-lg font-bold tracking-tight text-white">לוח בקרה</p>
        </div>
        <nav className="relative flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-4">
          {links.map((l) => {
            const active =
              pathname === l.href ||
              (l.href !== '/admin' && pathname.startsWith(l.href + '/'));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? 'bg-white/15 text-white shadow-inner ring-1 ring-white/20'
                    : 'text-emerald-100/85 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="text-[10px] opacity-60" aria-hidden>
                  {l.icon}
                </span>
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="relative border-t border-white/10 p-4">
          <form action={adminLogout}>
            <button
              type="submit"
              className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2.5 text-sm text-emerald-100 transition hover:bg-white/10 hover:text-white"
            >
              התנתק
            </button>
          </form>
        </div>
      </aside>

      <main className="relative min-w-0 flex-1 overflow-auto">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_100%_0%,rgba(45,106,62,0.06),transparent)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl space-y-8 px-5 py-8 lg:px-10 lg:py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
