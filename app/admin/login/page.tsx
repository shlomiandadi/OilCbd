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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-bg via-white to-[#dce8de] p-6">
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(45,106,62,0.12),transparent)]"
        aria-hidden
      />
      <div className="relative w-full max-w-md space-y-8 rounded-3xl border border-brand-border/60 bg-white/90 p-8 shadow-admin-card backdrop-blur-sm">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-leaf">
            OilCbd
          </p>
          <h1 className="mt-2 text-2xl font-bold text-brand-ink">כניסה לניהול</h1>
          <p className="mt-1 text-sm text-brand-ink-muted">ממשק ניהול תוכן ומוצרים</p>
        </div>
        {err ? (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-800">
            {err}
          </p>
        ) : null}
        <form action={adminLogin} className="space-y-5">
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
            className="w-full rounded-xl bg-gradient-to-l from-brand-leaf to-brand-leaf-dark py-3 text-sm font-bold text-white shadow-lg shadow-brand-leaf/25 transition hover:brightness-105"
          >
            התחבר
          </button>
        </form>
      </div>
    </div>
  );
}
