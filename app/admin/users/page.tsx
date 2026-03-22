import Link from 'next/link';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin/guard';
import { deleteAdminUserForm } from '@/lib/admin/actions/users';

export default async function AdminUsersPage() {
  const me = await requireAdmin();
  const users = await prisma.adminUser.findMany({
    orderBy: { email: 'asc' },
  });

  if (me.role !== 'ADMIN') {
    return (
      <p className="text-neutral-400">
        רק משתמשים בתפקיד ADMIN יכולים לנהל חשבונות ניהול.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">משתמשי ניהול</h1>
        <Link
          href="/admin/users/new"
          className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-neutral-950 hover:bg-amber-500"
        >
          משתמש חדש
        </Link>
      </div>
      <div className="overflow-x-auto rounded-xl border border-neutral-800">
        <table className="w-full min-w-[480px] text-sm">
          <thead className="border-b border-neutral-800 bg-neutral-900/60">
            <tr>
              <th className="p-3 text-start text-neutral-400">אימייל</th>
              <th className="p-3 text-start text-neutral-400">שם</th>
              <th className="p-3 text-start text-neutral-400">תפקיד</th>
              <th className="p-3 text-end text-neutral-400">פעולות</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr
                key={u.id}
                className="border-b border-neutral-800/80 hover:bg-neutral-900/30"
              >
                <td className="p-3">{u.email}</td>
                <td className="p-3 text-neutral-500">{u.name ?? '—'}</td>
                <td className="p-3">{u.role}</td>
                <td className="p-3 text-end">
                  <div className="flex flex-wrap justify-end gap-2">
                    <Link
                      href={`/admin/users/${u.id}`}
                      className="rounded border border-neutral-600 px-2 py-1 text-xs hover:bg-neutral-800"
                    >
                      עריכה
                    </Link>
                    <form action={deleteAdminUserForm}>
                      <input type="hidden" name="id" value={u.id} />
                      <button
                        type="submit"
                        disabled={u.id === me.id}
                        className="rounded border border-red-900/60 px-2 py-1 text-xs text-red-300 hover:bg-red-950/40 disabled:opacity-30"
                      >
                        מחק
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
