'use server';

import { revalidatePath } from 'next/cache';
import { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin/guard';
import { parseJson, linesToPhrases } from '@/lib/admin/json';
import { redirect } from 'next/navigation';

function defaultBreadcrumb(slug: string, title: string) {
  return [
    { name: 'דף הבית', href: '/' },
    { name: 'מדריכים ומילות מפתח', href: '/learn' },
    { name: title, href: `/learn/${slug}` },
  ];
}

export async function saveContentPage(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get('id') ?? '').trim();
  const slug = String(formData.get('slug') ?? '')
    .trim()
    .replace(/\s+/g, '-');
  const title = String(formData.get('title') ?? '').trim();
  const categoryId = String(formData.get('categoryId') ?? '').trim() || null;
  const excerpt = String(formData.get('excerpt') ?? '').trim() || null;
  const bodyMarkdown = String(formData.get('bodyMarkdown') ?? '');
  const seoTitle = String(formData.get('seoTitle') ?? '').trim();
  const seoDescription = String(formData.get('seoDescription') ?? '').trim();
  const seoKeywords = String(formData.get('seoKeywords') ?? '').trim() || null;
  let canonicalPath = String(formData.get('canonicalPath') ?? '').trim();
  const ogImage = String(formData.get('ogImage') ?? '').trim() || null;
  const breadcrumbRaw = String(formData.get('breadcrumbJson') ?? '');
  const phrasesRaw = String(formData.get('targetPhrases') ?? '');
  const faqRaw = String(formData.get('faqJson') ?? '');
  const showInLearnIndex = formData.get('showInLearnIndex') === 'on';
  const isPublished = formData.get('isPublished') === 'on';

  if (!slug || !title || !seoTitle || !seoDescription) {
    throw new Error('שדות חובה חסרים');
  }
  if (!canonicalPath) canonicalPath = `/learn/${slug}`;

  const breadcrumbJson = parseJson(
    breadcrumbRaw,
    defaultBreadcrumb(slug, title)
  );
  const targetPhrasesJson = linesToPhrases(phrasesRaw);
  const faqJson = faqRaw.trim() ? parseJson(faqRaw, []) : null;

  if (id) {
    await prisma.contentPage.update({
      where: { id },
      data: {
        slug,
        categoryId,
        title,
        excerpt,
        bodyMarkdown,
        seoTitle,
        seoDescription,
        seoKeywords,
        canonicalPath,
        ogImage,
        breadcrumbJson,
        targetPhrasesJson,
        faqJson:
          faqJson === null ? Prisma.DbNull : (faqJson as Prisma.InputJsonValue),
        showInLearnIndex,
        isPublished,
      },
    });
  } else {
    const exists = await prisma.contentPage.findUnique({ where: { slug } });
    if (exists) throw new Error('הסלאג כבר בשימוש');
    await prisma.contentPage.create({
      data: {
        slug,
        categoryId,
        title,
        excerpt,
        bodyMarkdown,
        seoTitle,
        seoDescription,
        seoKeywords,
        canonicalPath,
        ogImage,
        breadcrumbJson,
        targetPhrasesJson,
        ...(faqJson === null
          ? {}
          : { faqJson: faqJson as Prisma.InputJsonValue }),
        showInLearnIndex,
        isPublished,
      },
    });
  }

  revalidatePath('/learn');
  revalidatePath(`/learn/${slug}`);
  revalidatePath('/about');
  revalidatePath('/contact');
  revalidatePath('/admin/pages');
  redirect('/admin/pages');
}

export async function deleteContentPage(id: string) {
  await requireAdmin();
  const page = await prisma.contentPage.findUnique({ where: { id } });
  if (page) {
    await prisma.contentPage.delete({ where: { id } });
    revalidatePath('/learn');
    if (page.slug) revalidatePath(`/learn/${page.slug}`);
  }
  redirect('/admin/pages');
}

export async function deleteContentPageForm(formData: FormData) {
  await deleteContentPage(String(formData.get('id') ?? ''));
}
