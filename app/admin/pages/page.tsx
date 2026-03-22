import Link from 'next/link';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin/guard';
import { deleteContentPageForm } from '@/lib/admin/actions/content-pages';
import {
  adminBtnDanger,
  adminBtnPrimary,
  adminBtnSecondary,
} from '@/components/admin/AdminField';

export default async function AdminContentPagesPage() {
  await requireAdmin();
  const pages = await prisma.contentPage.findMany({
    orderBy: [{ updatedAt: 'desc' }],
    select: {
      id: true,
      slug: true,
      title: true,
      isPublished: true,
      canonicalPath: true,
      updatedAt: true,
    },
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-leaf">
            תוכן סטטי
          </p>
          <h1 className="mt-1 text-3xl font-bold text-brand-ink">עמודי תוכן</h1>
          <p className="mt-2 max-w-xl text-sm text-brand-ink-muted">
            מדריכים, דפי SEO ועמודי מפתח — כולל מטא ו־FAQ.
          </p>
        </div>
        <Link href="/admin/pages/new" className={adminBtnPrimary}>
          + עמוד חדש
        </Link>
      </div>

      <div className="admin-table-wrap">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="border-b border-brand-border bg-brand-cream/80">
            <tr>
              <th className="p-4 text-start text-xs font-bold uppercase tracking-wide text-brand-ink-muted">
                כותרת
              </th>
              <th className="p-4 text-start text-xs font-bold uppercase tracking-wide text-brand-ink-muted">
                סלאג
              </th>
              <th className="p-4 text-start text-xs font-bold uppercase tracking-wide text-brand-ink-muted">
                קנוני
              </th>
              <th className="p-4 text-start text-xs font-bold uppercase tracking-wide text-brand-ink-muted">
                פורסם
              </th>
              <th className="p-4 text-end text-xs font-bold uppercase tracking-wide text-brand-ink-muted">
                פעולות
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border/50 bg-white">
            {pages.map((p) => (
              <tr key={p.id} className="transition hover:bg-brand-cream/40">
                <td className="p-4 font-medium text-brand-ink">{p.title}</td>
                <td className="p-4 font-mono text-xs text-brand-ink-muted">{p.slug}</td>
                <td className="p-4 text-xs text-brand-ink-muted">{p.canonicalPath}</td>
                <td className="p-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      p.isPublished
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {p.isPublished ? 'פורסם' : 'טיוטה'}
                  </span>
                </td>
                <td className="p-4 text-end">
                  <div className="flex flex-wrap justify-end gap-2">
                    <Link
                      href={`/admin/pages/${p.id}`}
                      className={adminBtnSecondary + ' !px-3 !py-1.5 !text-xs'}
                    >
                      עריכה
                    </Link>
                    <form action={deleteContentPageForm}>
                      <input type="hidden" name="id" value={p.id} />
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
