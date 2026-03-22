import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { requireAdminRole } from '@/lib/admin/guard';
import { AdminUserForm } from '@/components/admin/AdminUserForm';

type Props = { params: Promise<{ id: string }> };

export default async function EditAdminUserPage({ params }: Props) {
  await requireAdminRole();
  const { id } = await params;
  const user = await prisma.adminUser.findUnique({ where: { id } });
  if (!user) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/users"
          className="text-sm text-neutral-400 hover:text-amber-400"
        >
          ← חזרה
        </Link>
        <h1 className="text-2xl font-semibold">עריכת משתמש</h1>
      </div>
      <AdminUserForm user={user} />
    </div>
  );
}
