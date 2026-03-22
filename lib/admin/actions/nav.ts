'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin/guard';
import { redirect } from 'next/navigation';

export async function saveNavLink(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get('id') ?? '').trim();
  const section = String(formData.get('section') ?? '').trim();
  const label = String(formData.get('label') ?? '').trim();
  const href = String(formData.get('href') ?? '').trim();
  const sortOrder = Number(formData.get('sortOrder') ?? '0');
  const parentId = String(formData.get('parentId') ?? '').trim() || null;

  if (!section || !label || !href) throw new Error('שדות חובה');

  if (id) {
    await prisma.siteNavLink.update({
      where: { id },
      data: {
        section,
        label,
        href,
        sortOrder: Number.isNaN(sortOrder) ? 0 : sortOrder,
        parentId: parentId || null,
      },
    });
  } else {
    await prisma.siteNavLink.create({
      data: {
        section,
        label,
        href,
        sortOrder: Number.isNaN(sortOrder) ? 0 : sortOrder,
        parentId: parentId || null,
      },
    });
  }

  revalidatePath('/');
  redirect('/admin/nav');
}

export async function deleteNavLink(id: string) {
  await requireAdmin();
  await prisma.siteNavLink.delete({ where: { id } });
  revalidatePath('/');
  redirect('/admin/nav');
}

export async function deleteNavLinkForm(formData: FormData) {
  await deleteNavLink(String(formData.get('id') ?? ''));
}
