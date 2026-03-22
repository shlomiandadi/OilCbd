'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin/guard';
import { redirect } from 'next/navigation';

export async function saveSiteSetting(formData: FormData) {
  await requireAdmin();
  const key = String(formData.get('key') ?? '').trim();
  const value = String(formData.get('value') ?? '');
  if (!key) throw new Error('מפתח חסר');

  await prisma.siteSetting.upsert({
    where: { key },
    create: { key, value },
    update: { value },
  });

  revalidatePath('/');
  redirect('/admin/settings');
}

export async function deleteSiteSetting(key: string) {
  await requireAdmin();
  await prisma.siteSetting.delete({ where: { key } }).catch(() => {});
  revalidatePath('/');
  redirect('/admin/settings');
}

export async function deleteSiteSettingForm(formData: FormData) {
  await deleteSiteSetting(String(formData.get('key') ?? ''));
}
