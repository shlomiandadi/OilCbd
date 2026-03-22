import type { AdminUser } from '@prisma/client';
import { saveAdminUser } from '@/lib/admin/actions/users';
import { AdminField, adminInputClass } from '@/components/admin/AdminField';

export function AdminUserForm({ user }: { user: AdminUser | null }) {
  const u = user;

  return (
    <form action={saveAdminUser} className="mx-auto max-w-md space-y-4">
      {u ? <input type="hidden" name="id" value={u.id} /> : null}
      <AdminField label="אימייל">
        <input
          className={adminInputClass}
          type="email"
          name="email"
          required
          defaultValue={u?.email ?? ''}
        />
      </AdminField>
      <AdminField
        label={u ? 'סיסמה חדשה (השאירו ריק ללא שינוי)' : 'סיסמה'}
        hint={u ? undefined : 'לפחות 8 תווים'}
      >
        <input
          className={adminInputClass}
          type="password"
          name="password"
          required={!u}
          autoComplete="new-password"
        />
      </AdminField>
      <AdminField label="שם תצוגה">
        <input
          className={adminInputClass}
          name="name"
          defaultValue={u?.name ?? ''}
        />
      </AdminField>
      <AdminField label="תפקיד">
        <select
          className={adminInputClass}
          name="role"
          defaultValue={u?.role ?? 'EDITOR'}
        >
          <option value="ADMIN">ADMIN — מלא</option>
          <option value="EDITOR">EDITOR — תוכן בלבד</option>
        </select>
      </AdminField>
      <button
        type="submit"
        className="rounded-lg bg-amber-600 px-6 py-2.5 text-sm font-medium text-neutral-950 hover:bg-amber-500"
      >
        שמור
      </button>
    </form>
  );
}
