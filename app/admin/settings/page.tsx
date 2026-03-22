import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin/guard';
import { saveSiteSetting, deleteSiteSettingForm } from '@/lib/admin/actions/settings';
import {
  AdminField,
  adminInputClass,
  adminBtnDanger,
  adminBtnPrimary,
  adminBtnSecondary,
} from '@/components/admin/AdminField';

export default async function AdminSettingsPage() {
  await requireAdmin();
  const rows = await prisma.siteSetting.findMany({
    orderBy: { key: 'asc' },
  });

  return (
    <div className="space-y-10">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-leaf">
          אתר
        </p>
        <h1 className="mt-1 text-3xl font-bold text-brand-ink">טקסטים גלובליים</h1>
        <p className="mt-2 max-w-2xl text-sm text-brand-ink-muted">
          מפתחות דף הבית, הדר ופוטר. ערכי JSON (כרטיסי אמון) — JSON תקין בלבד.
        </p>
      </div>

      <div className="admin-card border-2 border-dashed border-brand-border/70 !bg-brand-cream/30">
        <h2 className="mb-4 text-sm font-semibold text-brand-leaf">מפתח חדש</h2>
        <form action={saveSiteSetting} className="max-w-2xl space-y-4">
          <AdminField label="מפתח">
            <input className={adminInputClass} name="key" required />
          </AdminField>
          <AdminField label="ערך">
            <textarea
              className={`${adminInputClass} min-h-[100px] font-mono text-xs`}
              name="value"
              required
            />
          </AdminField>
          <button type="submit" className={adminBtnPrimary}>
            שמור מפתח
          </button>
        </form>
      </div>

      <div className="space-y-4">
        {rows.map((r) => (
          <div key={r.key} className="admin-card !p-5">
            <form action={saveSiteSetting} className="space-y-4">
              <input type="hidden" name="key" value={r.key} />
              <p className="font-mono text-xs font-semibold text-brand-leaf">{r.key}</p>
              <AdminField label="ערך">
                <textarea
                  className={`${adminInputClass} min-h-[120px] font-mono text-xs`}
                  name="value"
                  required
                  defaultValue={r.value}
                />
              </AdminField>
              <div className="flex flex-wrap gap-3">
                <button type="submit" className={adminBtnSecondary}>
                  עדכן
                </button>
              </div>
            </form>
            <form action={deleteSiteSettingForm} className="mt-4 border-t border-brand-border/60 pt-4">
              <input type="hidden" name="key" value={r.key} />
              <button type="submit" className={adminBtnDanger}>
                מחק מפתח (זהירות)
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
