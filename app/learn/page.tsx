import type { Metadata } from 'next';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import Breadcrumbs from '@/components/Breadcrumbs';
import { absoluteUrl } from '@/lib/site';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export const metadata: Metadata = {
  title: 'מדריכים ומילות מפתח — CBD ושמן קנאביס',
  description:
    'מדריכים מקצועיים: שמן קנאביס, CBD, cbd oil, שאלות נפוצות וזנב ארוך — הכל נמשך מהמסד.',
  alternates: { canonical: absoluteUrl('/learn') },
};

export default async function LearnIndexPage() {
  const pages = await prisma.contentPage.findMany({
    where: { isPublished: true },
    orderBy: [{ title: 'asc' }],
    include: { category: true },
  });

  const crumbs = [
    { name: 'דף הבית', href: '/' },
    { name: 'מדריכים ומילות מפתח', href: '/learn' },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'מדריכים ומילות מפתח',
    url: absoluteUrl('/learn'),
    hasPart: pages.map((p) => ({
      '@type': 'WebPage',
      name: p.title,
      url: absoluteUrl(`/learn/${p.slug}`),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen">
        <div className="container mx-auto max-w-4xl px-6 py-12">
          <Breadcrumbs items={crumbs} />
          <h1 className="mb-4 text-3xl font-bold text-neutral-100">
            מדריכים ומילות מפתח
          </h1>
          <p className="mb-10 text-neutral-400">
            עמודי תוכן סמכותיים — כותרות, תיאורים ופירורי לחם מותאמים ל־SEO. הנתונים
            נטענים ממסד הנתונים.
          </p>
          <ul className="space-y-3">
            {pages.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/learn/${p.slug}`}
                  className="text-amber-500 hover:text-amber-400"
                >
                  {p.title}
                </Link>
                {p.category ? (
                  <span className="mr-2 text-sm text-neutral-500">
                    · {p.category.name}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
