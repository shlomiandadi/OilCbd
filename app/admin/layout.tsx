import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { AdminChrome } from '@/components/admin/AdminChrome';
import { getAdminFromCookie } from '@/lib/admin/user';

export const metadata: Metadata = {
  title: 'ניהול',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await getAdminFromCookie();
  return (
    <AdminChrome canManageUsers={user?.role === 'ADMIN'}>
      {children}
    </AdminChrome>
  );
}
