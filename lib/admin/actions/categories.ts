'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin/guard';
import { redirect } from 'next/navigation';

export async function saveContentCategory(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get('id') ?? '').trim();
  const slug = String(formData.get('slug') ?? '')
    .trim()
    .replace(/\s+/g, '-');
  const name = String(formData.get('name') ?? '').trim();
  const description = String(formData.get('description') ?? '').trim() || null;
  const seoTitle = String(formData.get('seoTitle') ?? '').trim() || null;
  const seoDescription =
    String(formData.get('seoDescription') ?? '').trim() || null;
  const sortOrder = Number(formData.get('sortOrder') ?? '0');
  let parentId = String(formData.get('parentId') ?? '').trim() || null;
  if (parentId === id) parentId = null;

  if (!slug || !name) throw new Error('סלאג ושם חובה');

  if (id) {
    await prisma.contentCategory.update({
      where: { id },
      data: {
        slug,
        name,
        description,
        seoTitle,
        seoDescription,
        sortOrder: Number.isNaN(sortOrder) ? 0 : sortOrder,
        parentId,
      },
    });
  } else {
    const exists = await prisma.contentCategory.findUnique({ where: { slug } });
    if (exists) throw new Error('סלאג קטגוריה כבר קיים');
    await prisma.contentCategory.create({
      data: {
        slug,
        name,
        description,
        seoTitle,
        seoDescription,
        sortOrder: Number.isNaN(sortOrder) ? 0 : sortOrder,
        parentId,
      },
    });
  }

  revalidatePath('/learn');
  revalidatePath('/blog');
  redirect('/admin/categories');
}

export async function deleteContentCategory(id: string) {
  await requireAdmin();
  await prisma.contentCategory.delete({ where: { id } });
  revalidatePath('/learn');
  revalidatePath('/blog');
  redirect('/admin/categories');
}

export async function deleteContentCategoryForm(formData: FormData) {
  await deleteContentCategory(String(formData.get('id') ?? ''));
}
