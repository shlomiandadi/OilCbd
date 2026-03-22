import { adminLogin } from '@/lib/admin/actions/auth';
import { AdminField, adminInputClass } from '@/components/admin/AdminField';

type Props = {
  searchParams: Promise<{ err?: string; next?: string }>;
};

export default async function AdminLoginPage({ searchParams }: Props) {
  const sp = await searchParams;
  const err = sp.err ? decodeURIComponent(sp.err) : '';
  const next = sp.next && sp.next.startsWith('/') && !sp.next.startsWith('//')
    ? sp.next
    : '/admin';

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 p-6">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8">
        <h1 className="text-center text-xl font-semibold text-amber-400">
          כניסה לניהול
        </h1>
        {err ? (
          <p className="rounded-lg bg-red-950/50 px-3 py-2 text-center text-sm text-red-300">
            {err}
          </p>
        ) : null}
        <form action={adminLogin} className="space-y-4">
          <input type="hidden" name="next" value={next} />
          <AdminField label="אימייל">
            <input
              className={adminInputClass}
              type="email"
              name="email"
              required
              autoComplete="email"
            />
          </AdminField>
          <AdminField label="סיסמה">
            <input
              className={adminInputClass}
              type="password"
              name="password"
              required
              autoComplete="current-password"
            />
          </AdminField>
          <button
            type="submit"
            className="w-full rounded-lg bg-amber-600 py-2.5 text-sm font-medium text-neutral-950 hover:bg-amber-500"
          >
            התחבר
          </button>
        </form>
      </div>
    </div>
  );
}
