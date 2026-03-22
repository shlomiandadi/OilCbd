import type { ContentCategory, ContentPage } from '@prisma/client';
import { absoluteUrl } from '@/lib/site';
import { faqPageJsonLd, parseFaqJson } from '@/lib/faq-jsonld';
import { parseBreadcrumbJson } from '@/lib/seo';
import Breadcrumbs from '@/components/Breadcrumbs';
import MarkdownBody from '@/components/MarkdownBody';

type Props = { page: ContentPage & { category: ContentCategory | null } };

export default function ContentPageArticle({ page }: Props) {
  const crumbs = parseBreadcrumbJson(page.breadcrumbJson);
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'http://localhost:3000';

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

  const faqItems = parseFaqJson(page.faqJson);
  const faqLd = faqPageJsonLd(faqItems);

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
      {faqLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      ) : null}
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
            <p className="mb-2 text-sm font-semibold text-brand-leaf">
              {page.category?.name ?? 'מדריך'}
            </p>
            <h1 className="text-3xl font-bold text-brand-ink md:text-4xl">
              {page.title}
            </h1>
            {page.excerpt ? (
              <p className="mt-4 text-lg text-brand-ink-muted">{page.excerpt}</p>
            ) : null}
          </header>
          <MarkdownBody content={page.bodyMarkdown} />
        </article>
      </main>
    </>
  );
}
