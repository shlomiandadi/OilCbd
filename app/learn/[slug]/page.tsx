import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { absoluteUrl } from '@/lib/site';
import { parseBreadcrumbJson } from '@/lib/seo';
import { buildContentMetadata } from '@/lib/cms-seo';
import Breadcrumbs from '@/components/Breadcrumbs';
import MarkdownBody from '@/components/MarkdownBody';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await prisma.contentPage.findFirst({
    where: { slug, isPublished: true },
  });
  if (!page) return { title: 'לא נמצא' };
  return buildContentMetadata({
    seoTitle: page.seoTitle,
    seoDescription: page.seoDescription,
    seoKeywords: page.seoKeywords,
    canonicalPath: page.canonicalPath,
    ogImage: page.ogImage,
  });
}

export default async function LearnArticlePage({ params }: Props) {
  const { slug } = await params;
  const page = await prisma.contentPage.findFirst({
    where: { slug, isPublished: true },
    include: { category: true },
  });
  if (!page) notFound();

  const crumbs = parseBreadcrumbJson(page.breadcrumbJson);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'http://localhost:3000';
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: (crumbs.length
      ? crumbs
      : [
          { name: 'דף הבית', href: '/' },
          { name: page.title, href: page.canonicalPath },
        ]
    ).map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.href.startsWith('http')
        ? item.href
        : `${siteUrl}${item.href.startsWith('/') ? item.href : `/${item.href}`}`,
    })),
  };

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.title,
    description: page.seoDescription,
    url: absoluteUrl(page.canonicalPath),
    inLanguage: 'he-IL',
    author: { '@type': 'Organization', name: 'OilCbd' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <main className="min-h-screen">
        <article className="container mx-auto max-w-3xl px-6 py-12">
          <Breadcrumbs
            items={
              crumbs.length
                ? crumbs
                : [
                    { name: 'דף הבית', href: '/' },
                    { name: page.title, href: page.canonicalPath },
                  ]
            }
          />
          <header className="mb-10">
            <p className="mb-2 text-sm text-amber-500/90">
              {page.category?.name ?? 'מדריך'}
            </p>
            <h1 className="text-3xl font-bold text-neutral-100 md:text-4xl">
              {page.title}
            </h1>
            {page.excerpt ? (
              <p className="mt-4 text-lg text-neutral-400">{page.excerpt}</p>
            ) : null}
          </header>
          <MarkdownBody content={page.bodyMarkdown} />
        </article>
      </main>
    </>
  );
}
