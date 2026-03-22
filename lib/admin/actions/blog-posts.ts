'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin/guard';
import { parseJson } from '@/lib/admin/json';
import { redirect } from 'next/navigation';

function defaultBreadcrumb(slug: string, title: string) {
  return [
    { name: 'דף הבית', href: '/' },
    { name: 'בלוג', href: '/blog' },
    { name: title, href: `/blog/${slug}` },
  ];
}

export async function saveBlogPost(formData: FormData) {
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
  const coverImage = String(formData.get('coverImage') ?? '').trim() || null;
  const ogImage = String(formData.get('ogImage') ?? '').trim() || null;
  const breadcrumbRaw = String(formData.get('breadcrumbJson') ?? '');
  const isPublished = formData.get('isPublished') === 'on';
  const publishedAtStr = String(formData.get('publishedAt') ?? '').trim();
  const publishedAt = publishedAtStr
    ? new Date(publishedAtStr)
    : isPublished
      ? new Date()
      : null;

  if (!slug || !title || !seoTitle || !seoDescription) {
    throw new Error('שדות חובה חסרים');
  }
  if (!canonicalPath) canonicalPath = `/blog/${slug}`;

  const breadcrumbJson = parseJson(
    breadcrumbRaw,
    defaultBreadcrumb(slug, title)
  );

  if (id) {
    await prisma.blogPost.update({
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
        coverImage,
        ogImage,
        breadcrumbJson,
        isPublished,
        publishedAt,
      },
    });
  } else {
    const exists = await prisma.blogPost.findUnique({ where: { slug } });
    if (exists) throw new Error('הסלאג כבר בשימוש');
    await prisma.blogPost.create({
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
        coverImage,
        ogImage,
        breadcrumbJson,
        isPublished,
        publishedAt,
      },
    });
  }

  revalidatePath('/blog');
  revalidatePath(`/blog/${slug}`);
  revalidatePath('/admin/posts');
  redirect('/admin/posts');
}

export async function deleteBlogPost(id: string) {
  await requireAdmin();
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (post) {
    await prisma.blogPost.delete({ where: { id } });
    revalidatePath('/blog');
    if (post.slug) revalidatePath(`/blog/${post.slug}`);
  }
  redirect('/admin/posts');
}

export async function deleteBlogPostForm(formData: FormData) {
  await deleteBlogPost(String(formData.get('id') ?? ''));
}
