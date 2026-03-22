import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import ContentPageArticle from '@/components/ContentPageArticle';
import { getPublishedContentPage } from '@/lib/content-page';
import { buildContentMetadata } from '@/lib/cms-seo';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPublishedContentPage(slug);
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
  const page = await getPublishedContentPage(slug);
  if (!page) notFound();
  const learnPath = `/learn/${slug}`;
  if (page.canonicalPath !== learnPath) {
    redirect(page.canonicalPath);
  }
  return <ContentPageArticle page={page} />;
}
