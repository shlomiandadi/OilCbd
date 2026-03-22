import type { Metadata } from 'next';
import { absoluteUrl } from '@/lib/site';

export function buildContentMetadata(opts: {
  seoTitle: string;
  seoDescription: string;
  seoKeywords?: string | null;
  canonicalPath: string;
  ogImage?: string | null;
  fallbackOg?: string;
}): Metadata {
  const canonicalUrl = absoluteUrl(opts.canonicalPath);
  const keywords = opts.seoKeywords
    ? opts.seoKeywords.split(',').map((k) => k.trim()).filter(Boolean)
    : undefined;
  const og = opts.ogImage ?? opts.fallbackOg;

  return {
    title: opts.seoTitle,
    description: opts.seoDescription,
    keywords,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: 'article',
      locale: 'he_IL',
      url: canonicalUrl,
      title: opts.seoTitle,
      description: opts.seoDescription,
      ...(og ? { images: [{ url: og, alt: opts.seoTitle }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: opts.seoTitle,
      description: opts.seoDescription,
      ...(og ? { images: [og] } : {}),
    },
    robots: { index: true, follow: true },
  };
}
