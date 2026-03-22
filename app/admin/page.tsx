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
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-neutral-100">סקירה</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-5 transition-colors hover:border-amber-700/50"
          >
            <div className="text-3xl font-bold text-amber-400">{c.count}</div>
            <div className="mt-1 text-sm text-neutral-300">{c.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
