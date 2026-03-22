import Link from 'next/link';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin/guard';
import { deleteAdminUserForm } from '@/lib/admin/actions/users';
import {
  adminBtnDanger,
  adminBtnPrimary,
  adminBtnSecondary,
} from '@/components/admin/AdminField';

export default async function AdminUsersPage() {
  const me = await requireAdmin();
  const users = await prisma.adminUser.findMany({
    orderBy: { email: 'asc' },
  });

  if (me.role !== 'ADMIN') {
    return (
      <div className="admin-card max-w-lg">
        <p className="text-brand-ink-muted">
          רק משתמשים בתפקיד ADMIN יכולים לנהל חשבונות ניהול.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-leaf">
            אבטחה
          </p>
          <h1 className="mt-1 text-3xl font-bold text-brand-ink">משתמשי ניהול</h1>
          <p className="mt-2 max-w-xl text-sm text-brand-ink-muted">
            הרשאות ADMIN מלאות או EDITOR לתוכן בלבד.
          </p>
        </div>
        <Link href="/admin/users/new" className={adminBtnPrimary}>
          + משתמש חדש
        </Link>
      </div>

      <div className="admin-table-wrap">
        <table className="w-full min-w-[480px] text-sm">
          <thead className="border-b border-brand-border bg-brand-cream/80">
            <tr>
              <th className="p-4 text-start text-xs font-bold uppercase tracking-wide text-brand-ink-muted">
                אימייל
              </th>
              <th className="p-4 text-start text-xs font-bold uppercase tracking-wide text-brand-ink-muted">
                שם
              </th>
              <th className="p-4 text-start text-xs font-bold uppercase tracking-wide text-brand-ink-muted">
                תפקיד
              </th>
              <th className="p-4 text-end text-xs font-bold uppercase tracking-wide text-brand-ink-muted">
                פעולות
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border/50 bg-white">
            {users.map((u) => (
              <tr key={u.id} className="transition hover:bg-brand-cream/40">
                <td className="p-4 font-medium text-brand-ink">{u.email}</td>
                <td className="p-4 text-brand-ink-muted">{u.name ?? '—'}</td>
                <td className="p-4">
                  <span className="inline-flex rounded-full bg-brand-cream px-2.5 py-0.5 text-xs font-semibold text-brand-leaf-dark">
                    {u.role}
                  </span>
                </td>
                <td className="p-4 text-end">
                  <div className="flex flex-wrap justify-end gap-2">
                    <Link
                      href={`/admin/users/${u.id}`}
                      className={adminBtnSecondary + ' !px-3 !py-1.5 !text-xs'}
                    >
                      עריכה
                    </Link>
                    <form action={deleteAdminUserForm}>
                      <input type="hidden" name="id" value={u.id} />
                      <button
                        type="submit"
                        disabled={u.id === me.id}
                        className={adminBtnDanger + ' disabled:opacity-40'}
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
