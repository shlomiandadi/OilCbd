import Link from 'next/link';
import { requireAdminRole } from '@/lib/admin/guard';
import { AdminUserForm } from '@/components/admin/AdminUserForm';

export default async function NewAdminUserPage() {
  await requireAdminRole();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/users"
          className="text-sm text-neutral-400 hover:text-amber-400"
        >
          ← חזרה
        </Link>
        <h1 className="text-2xl font-semibold">משתמש ניהול חדש</h1>
      </div>
      <AdminUserForm user={null} />
    </div>
  );
}
