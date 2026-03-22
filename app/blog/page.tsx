import type { Metadata } from 'next';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import Breadcrumbs from '@/components/Breadcrumbs';
import { absoluteUrl } from '@/lib/site';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export const metadata: Metadata = {
  title: 'בלוג — מאמרים על CBD ושמן קנאביס',
  description: 'מאמרים, מדריכים ועדכונים — התוכן נטען ממסד הנתונים.',
  alternates: { canonical: absoluteUrl('/blog') },
};

export default async function BlogIndexPage() {
  const posts = await prisma.blogPost.findMany({
    where: { isPublished: true },
    orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
    include: { category: true },
  });

  const crumbs = [
    { name: 'דף הבית', href: '/' },
    { name: 'בלוג', href: '/blog' },
  ];

  return (
    <main className="min-h-screen">
      <div className="container mx-auto max-w-4xl px-6 py-12">
        <Breadcrumbs items={crumbs} />
        <h1 className="mb-4 text-3xl font-bold text-neutral-100">בלוג</h1>
        <p className="mb-10 text-neutral-400">
          מאמרים מלאי SEO — כותרת, תיאור ופירורי לחם מוגדרים במסד.
        </p>
        <ul className="space-y-8">
          {posts.map((post) => (
            <li
              key={post.id}
              className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6"
            >
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-xl font-semibold text-amber-500 hover:text-amber-400">
                  {post.title}
                </h2>
              </Link>
              {post.excerpt ? (
                <p className="mt-2 text-sm text-neutral-400">{post.excerpt}</p>
              ) : null}
              {post.category ? (
                <p className="mt-2 text-xs text-neutral-500">{post.category.name}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
