import Link from 'next/link';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin/guard';
import { deleteContentCategoryForm } from '@/lib/admin/actions/categories';
import {
  adminBtnDanger,
  adminBtnPrimary,
  adminBtnSecondary,
} from '@/components/admin/AdminField';

export default async function AdminCategoriesPage() {
  await requireAdmin();
  const categories = await prisma.contentCategory.findMany({
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    include: { parent: true },
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-leaf">
            ארגון
          </p>
          <h1 className="mt-1 text-3xl font-bold text-brand-ink">קטגוריות תוכן</h1>
          <p className="mt-2 max-w-xl text-sm text-brand-ink-muted">
            קטגוריות ראשיות ותת־קטגוריות למדריכים ובלוג.
          </p>
        </div>
        <Link href="/admin/categories/new" className={adminBtnPrimary}>
          + קטגוריה חדשה
        </Link>
      </div>

      <div className="admin-table-wrap">
        <table className="w-full min-w-[560px] text-sm">
          <thead className="border-b border-brand-border bg-brand-cream/80">
            <tr>
              <th className="p-4 text-start text-xs font-bold uppercase tracking-wide text-brand-ink-muted">
                שם
              </th>
              <th className="p-4 text-start text-xs font-bold uppercase tracking-wide text-brand-ink-muted">
                סלאג
              </th>
              <th className="p-4 text-start text-xs font-bold uppercase tracking-wide text-brand-ink-muted">
                אב
              </th>
              <th className="p-4 text-end text-xs font-bold uppercase tracking-wide text-brand-ink-muted">
                פעולות
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border/50 bg-white">
            {categories.map((c) => (
              <tr key={c.id} className="transition hover:bg-brand-cream/40">
                <td className="p-4 font-medium text-brand-ink">{c.name}</td>
                <td className="p-4 font-mono text-xs text-brand-ink-muted">{c.slug}</td>
                <td className="p-4 text-brand-ink-muted">{c.parent?.name ?? '—'}</td>
                <td className="p-4 text-end">
                  <div className="flex flex-wrap justify-end gap-2">
                    <Link
                      href={`/admin/categories/${c.id}`}
                      className={adminBtnSecondary + ' !px-3 !py-1.5 !text-xs'}
                    >
                      עריכה
                    </Link>
                    <form action={deleteContentCategoryForm}>
                      <input type="hidden" name="id" value={c.id} />
                      <button type="submit" className={adminBtnDanger}>
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
