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
  const post = await prisma.blogPost.findFirst({
    where: { slug, isPublished: true },
  });
  if (!post) return { title: 'לא נמצא' };
  return buildContentMetadata({
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    seoKeywords: post.seoKeywords,
    canonicalPath: post.canonicalPath,
    ogImage: post.ogImage ?? post.coverImage,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.blogPost.findFirst({
    where: { slug, isPublished: true },
    include: { category: true },
  });
  if (!post) notFound();

  const crumbs = parseBreadcrumbJson(post.breadcrumbJson);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'http://localhost:3000';
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: (crumbs.length
      ? crumbs
      : [
          { name: 'דף הבית', href: '/' },
          { name: 'בלוג', href: '/blog' },
          { name: post.title, href: post.canonicalPath },
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

  const blogLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.seoDescription,
    url: absoluteUrl(post.canonicalPath),
    datePublished: post.publishedAt?.toISOString() ?? post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: { '@type': 'Organization', name: 'OilCbd' },
    publisher: { '@type': 'Organization', name: 'OilCbd' },
    inLanguage: 'he-IL',
    ...(post.coverImage ? { image: [post.coverImage] } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogLd) }}
      />
      <main className="min-h-screen">
        <article className="container mx-auto max-w-3xl px-6 py-12">
          <Breadcrumbs
            items={
              crumbs.length
                ? crumbs
                : [
                    { name: 'דף הבית', href: '/' },
                    { name: 'בלוג', href: '/blog' },
                    { name: post.title, href: post.canonicalPath },
                  ]
            }
          />
          <header className="mb-10">
            <p className="mb-2 text-sm font-semibold text-brand-leaf">
              {post.category?.name ?? 'בלוג'}
            </p>
            <h1 className="text-3xl font-bold text-brand-ink md:text-4xl">
              {post.title}
            </h1>
            {post.excerpt ? (
              <p className="mt-4 text-lg text-brand-ink-muted">{post.excerpt}</p>
            ) : null}
          </header>
          <MarkdownBody content={post.bodyMarkdown} />
        </article>
      </main>
    </>
  );
}
