import Link from 'next/link';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin/guard';

export default async function AdminDashboardPage() {
  await requireAdmin();
  const [
    contentPages,
    blogPosts,
    products,
    navLinks,
    settings,
    categories,
    users,
  ] = await Promise.all([
    prisma.contentPage.count(),
    prisma.blogPost.count(),
    prisma.product.count(),
    prisma.siteNavLink.count(),
    prisma.siteSetting.count(),
    prisma.contentCategory.count(),
    prisma.adminUser.count(),
  ]);

  const cards = [
    { href: '/admin/pages', label: 'עמודי תוכן', count: contentPages },
    { href: '/admin/posts', label: 'פוסטים', count: blogPosts },
    { href: '/admin/products', label: 'מוצרים', count: products },
    { href: '/admin/nav', label: 'קישורי תפריט', count: navLinks },
    { href: '/admin/settings', label: 'הגדרות טקסט', count: settings },
    { href: '/admin/categories', label: 'קטגוריות', count: categories },
    { href: '/admin/users', label: 'משתמשי ניהול', count: users },
  ];

  return (
    <div className="space-y-10">
      <header className="admin-card !p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-leaf">
          סקירה כללית
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-brand-ink">
          ברוכים השבים
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-ink-muted">
          ניהול תוכן, מוצרים, תפריט והגדרות האתר — הכל במקום אחד. בחרו אזור מהכרטיסים
          למטה.
        </p>
      </header>

      <section>
        <h2 className="mb-4 text-sm font-semibold text-brand-ink-muted">פעילות מהירה</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group admin-card flex flex-col !p-6 transition hover:border-brand-leaf/35 hover:shadow-lg"
            >
              <div className="text-4xl font-bold tabular-nums text-brand-leaf">
                {c.count}
              </div>
              <div className="mt-2 text-sm font-semibold text-brand-ink group-hover:text-brand-leaf-dark">
                {c.label}
              </div>
              <span className="mt-3 text-xs text-brand-ink-muted opacity-0 transition group-hover:opacity-100">
                פתח ←
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
