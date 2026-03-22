import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin/guard';
import { saveSiteSetting, deleteSiteSettingForm } from '@/lib/admin/actions/settings';
import { AdminField, adminInputClass } from '@/components/admin/AdminField';

export default async function AdminSettingsPage() {
  await requireAdmin();
  const rows = await prisma.siteSetting.findMany({
    orderBy: { key: 'asc' },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">טקסטים גלובליים</h1>
      <p className="text-sm text-neutral-500">
        מפתחות כמו דף הבית, הדר ופוטר. ערכי JSON (כרטיסי אמון) יש לערוך כ־JSON תקין.
      </p>

      <div className="rounded-xl border border-dashed border-neutral-700 p-4">
        <h2 className="mb-3 text-sm font-medium text-amber-400/90">מפתח חדש</h2>
        <form action={saveSiteSetting} className="space-y-3">
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
          <button
            type="submit"
            className="rounded-lg bg-amber-600 px-4 py-2 text-sm text-neutral-950 hover:bg-amber-500"
          >
            שמור
          </button>
        </form>
      </div>

      <div className="space-y-4">
        {rows.map((r) => (
          <div
            key={r.key}
            className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-4"
          >
            <form action={saveSiteSetting} className="space-y-3">
              <input type="hidden" name="key" value={r.key} />
              <p className="font-mono text-xs text-amber-500/90">{r.key}</p>
              <AdminField label="ערך">
                <textarea
                  className={`${adminInputClass} min-h-[120px] font-mono text-xs`}
                  name="value"
                  required
                  defaultValue={r.value}
                />
              </AdminField>
              <div className="flex flex-wrap gap-2">
                <button
                  type="submit"
                  className="rounded-lg bg-neutral-700 px-4 py-2 text-sm hover:bg-neutral-600"
                >
                  עדכן
                </button>
              </div>
            </form>
            <form action={deleteSiteSettingForm} className="mt-2">
              <input type="hidden" name="key" value={r.key} />
              <button
                type="submit"
                className="text-xs text-red-400 hover:text-red-300"
              >
                מחק מפתח (יזהר — עלול לשבור את האתר)
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
