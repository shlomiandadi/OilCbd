import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin/guard';
import { saveNavLink, deleteNavLinkForm } from '@/lib/admin/actions/nav';
import {
  AdminField,
  adminInputClass,
  adminBtnDanger,
  adminBtnPrimary,
  adminBtnSecondary,
} from '@/components/admin/AdminField';

export default async function AdminNavPage() {
  await requireAdmin();
  const links = await prisma.siteNavLink.findMany({
    orderBy: [{ section: 'asc' }, { parentId: 'asc' }, { sortOrder: 'asc' }],
  });

  function parentOptions(section: string, excludeId: string) {
    return links.filter(
      (l) =>
        l.section === section &&
        l.parentId === null &&
        l.id !== excludeId
    );
  }

  const sections = ['header', 'footer'] as const;

  return (
    <div className="space-y-10">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-leaf">
          ניווט
        </p>
        <h1 className="mt-1 text-3xl font-bold text-brand-ink">תפריט והפוטר</h1>
        <p className="mt-2 max-w-2xl text-sm text-brand-ink-muted">
          קישורים עם הורה מוצגים כתת־תפריט באתר. מחיקת הורה מוחקת גם ילדים (cascade).
        </p>
      </div>

      {sections.map((section) => (
        <section key={section} className="space-y-6">
          <h2 className="border-b border-brand-border pb-2 text-lg font-bold text-brand-ink">
            {section === 'header' ? 'כותרת (הדר)' : 'פוטר'}
          </h2>

          <div className="admin-card border-2 border-dashed border-brand-border/70 !bg-brand-cream/30">
            <h3 className="mb-4 text-sm font-semibold text-brand-leaf">קישור חדש</h3>
            <form action={saveNavLink} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <input type="hidden" name="section" value={section} />
              <AdminField label="תווית">
                <input className={adminInputClass} name="label" required />
              </AdminField>
              <AdminField label="href">
                <input className={adminInputClass} name="href" required />
              </AdminField>
              <AdminField label="סדר">
                <input
                  className={adminInputClass}
                  name="sortOrder"
                  type="number"
                  defaultValue={0}
                />
              </AdminField>
              <AdminField label="הורה (אופציונלי)">
                <select className={adminInputClass} name="parentId">
                  <option value="">— שורש —</option>
                  {parentOptions(section, '').map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </AdminField>
              <div className="sm:col-span-2 lg:col-span-4">
                <button type="submit" className={adminBtnPrimary}>
                  הוסף קישור
                </button>
              </div>
            </form>
          </div>

          <div className="grid gap-4 lg:grid-cols-1">
            {links
              .filter((l) => l.section === section)
              .map((row) => (
                <div key={row.id} className="admin-card !p-5">
                  <form
                    action={saveNavLink}
                    className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:items-end"
                  >
                    <input type="hidden" name="id" value={row.id} />
                    <input type="hidden" name="section" value={row.section} />
                    <AdminField label="תווית">
                      <input
                        className={adminInputClass}
                        name="label"
                        required
                        defaultValue={row.label}
                      />
                    </AdminField>
                    <AdminField label="href">
                      <input
                        className={adminInputClass}
                        name="href"
                        required
                        defaultValue={row.href}
                      />
                    </AdminField>
                    <AdminField label="סדר">
                      <input
                        className={adminInputClass}
                        name="sortOrder"
                        type="number"
                        defaultValue={row.sortOrder}
                      />
                    </AdminField>
                    <AdminField label="הורה">
                      <select
                        className={adminInputClass}
                        name="parentId"
                        defaultValue={row.parentId ?? ''}
                      >
                        <option value="">— שורש —</option>
                        {parentOptions(section, row.id).map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.label}
                          </option>
                        ))}
                      </select>
                    </AdminField>
                    <div className="flex flex-wrap gap-2 lg:justify-end">
                      <button type="submit" className={adminBtnSecondary}>
                        שמור
                      </button>
                    </div>
                  </form>
                  <form action={deleteNavLinkForm} className="mt-4 border-t border-brand-border/60 pt-4">
                    <input type="hidden" name="id" value={row.id} />
                    <button type="submit" className={adminBtnDanger}>
                      מחק קישור
                    </button>
                  </form>
                </div>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
