import Link from 'next/link';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin/guard';
import { deleteProductForm } from '@/lib/admin/actions/products';
import {
  adminBtnDanger,
  adminBtnPrimary,
  adminBtnSecondary,
} from '@/components/admin/AdminField';

export default async function AdminProductsPage() {
  await requireAdmin();
  const products = await prisma.product.findMany({
    orderBy: [{ updatedAt: 'desc' }],
    include: {
      _count: { select: { variants: true } },
    },
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-leaf">
            קטלוג
          </p>
          <h1 className="mt-1 text-3xl font-bold text-brand-ink">מוצרים</h1>
          <p className="mt-2 max-w-xl text-sm text-brand-ink-muted">
            מוצרים, וריאציות וגלריית תמונות.
          </p>
        </div>
        <Link href="/admin/products/new" className={adminBtnPrimary}>
          + מוצר חדש
        </Link>
      </div>

      <div className="admin-table-wrap">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="border-b border-brand-border bg-brand-cream/80">
            <tr>
              <th className="p-4 text-start text-xs font-bold uppercase tracking-wide text-brand-ink-muted">
                שם
              </th>
              <th className="p-4 text-start text-xs font-bold uppercase tracking-wide text-brand-ink-muted">
                סלאג
              </th>
              <th className="p-4 text-start text-xs font-bold uppercase tracking-wide text-brand-ink-muted">
                וריאציות
              </th>
              <th className="p-4 text-start text-xs font-bold uppercase tracking-wide text-brand-ink-muted">
                פעיל
              </th>
              <th className="p-4 text-end text-xs font-bold uppercase tracking-wide text-brand-ink-muted">
                פעולות
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border/50 bg-white">
            {products.map((p) => (
              <tr key={p.id} className="transition hover:bg-brand-cream/40">
                <td className="p-4 font-medium text-brand-ink">{p.name}</td>
                <td className="p-4 font-mono text-xs text-brand-ink-muted">{p.slug}</td>
                <td className="p-4 text-brand-ink-muted">{p._count.variants}</td>
                <td className="p-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      p.isActive
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {p.isActive ? 'כן' : 'לא'}
                  </span>
                </td>
                <td className="p-4 text-end">
                  <div className="flex flex-wrap justify-end gap-2">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className={adminBtnSecondary + ' !px-3 !py-1.5 !text-xs'}
                    >
                      עריכה
                    </Link>
                    <form action={deleteProductForm}>
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
