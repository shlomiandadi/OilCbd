import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin/guard';
import { saveNavLink, deleteNavLinkForm } from '@/lib/admin/actions/nav';
import { AdminField, adminInputClass } from '@/components/admin/AdminField';

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
      <h1 className="text-2xl font-semibold">תפריט והפוטר</h1>
      <p className="text-sm text-neutral-500">
        קישורים עם הורה מוצגים כתת־תפריט באתר. מחקה ימחק גם ילדים (cascade).
      </p>

      {sections.map((section) => (
        <section key={section} className="space-y-4">
          <h2 className="text-lg font-medium text-amber-400/90">
            {section === 'header' ? 'כותרת (הדר)' : 'פוטר'}
          </h2>

          <div className="rounded-xl border border-dashed border-neutral-700 p-4">
            <h3 className="mb-3 text-sm text-neutral-400">קישור חדש</h3>
            <form action={saveNavLink} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
                <button
                  type="submit"
                  className="rounded-lg bg-amber-600 px-4 py-2 text-sm text-neutral-950 hover:bg-amber-500"
                >
                  הוסף
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-3">
            {links
              .filter((l) => l.section === section)
              .map((row) => (
                <div
                  key={row.id}
                  className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-4"
                >
                  <form
                    action={saveNavLink}
                    className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
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
                    <div className="flex items-end gap-2">
                      <button
                        type="submit"
                        className="rounded-lg bg-neutral-700 px-4 py-2 text-sm hover:bg-neutral-600"
                      >
                        שמור
                      </button>
                    </div>
                  </form>
                  <form action={deleteNavLinkForm} className="mt-2">
                    <input type="hidden" name="id" value={row.id} />
                    <button
                      type="submit"
                      className="text-xs text-red-400 hover:text-red-300"
                    >
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
