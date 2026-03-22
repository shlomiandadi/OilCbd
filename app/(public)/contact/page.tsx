import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ContentPageArticle from '@/components/ContentPageArticle';
import { getPublishedContentPage } from '@/lib/content-page';
import { buildContentMetadata } from '@/lib/cms-seo';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPublishedContentPage('contact');
  if (!page) return { title: 'לא נמצא' };
  return buildContentMetadata({
    seoTitle: page.seoTitle,
    seoDescription: page.seoDescription,
    seoKeywords: page.seoKeywords,
    canonicalPath: page.canonicalPath,
    ogImage: page.ogImage,
  });
}

export default async function ContactPage() {
  const page = await getPublishedContentPage('contact');
  if (!page) notFound();
  return <ContentPageArticle page={page} />;
}
