'use server';

import { revalidatePath } from 'next/cache';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { requireAdminRole } from '@/lib/admin/guard';
import { getAdminFromCookie } from '@/lib/admin/user';
import { redirect } from 'next/navigation';

export async function saveAdminUser(formData: FormData) {
  await requireAdminRole();
  const id = String(formData.get('id') ?? '').trim();
  const email = String(formData.get('email') ?? '')
    .trim()
    .toLowerCase();
  const password = String(formData.get('password') ?? '');
  const name = String(formData.get('name') ?? '').trim() || null;
  const role = String(formData.get('role') ?? 'EDITOR').trim();
  const validRole = role === 'ADMIN' ? 'ADMIN' : 'EDITOR';

  if (!email) throw new Error('אימייל חובה');

  if (id) {
    const data: {
      email: string;
      name: string | null;
      role: string;
      passwordHash?: string;
    } = { email, name, role: validRole };
    if (password.length > 0) {
      data.passwordHash = await bcrypt.hash(password, 12);
    }
    await prisma.adminUser.update({
      where: { id },
      data,
    });
  } else {
    if (password.length < 8) {
      throw new Error('סיסמה חייבת להכיל לפחות 8 תווים');
    }
    const exists = await prisma.adminUser.findUnique({ where: { email } });
    if (exists) throw new Error('אימייל כבר רשום');
    await prisma.adminUser.create({
      data: {
        email,
        name,
        role: validRole,
        passwordHash: await bcrypt.hash(password, 12),
      },
    });
  }

  revalidatePath('/admin/users');
  redirect('/admin/users');
}

export async function deleteAdminUser(id: string) {
  await requireAdminRole();
  const me = await getAdminFromCookie();
  if (me?.id === id) {
    redirect('/admin/users?err=self');
  }
  const count = await prisma.adminUser.count();
  if (count <= 1) {
    redirect('/admin/users?err=last');
  }
  await prisma.adminUser.delete({ where: { id } });
  revalidatePath('/admin/users');
  redirect('/admin/users');
}

export async function deleteAdminUserForm(formData: FormData) {
  await deleteAdminUser(String(formData.get('id') ?? ''));
}
