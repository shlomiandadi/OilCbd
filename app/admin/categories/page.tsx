import Link from 'next/link';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin/guard';
import { deleteContentCategoryForm } from '@/lib/admin/actions/categories';

export default async function AdminCategoriesPage() {
  await requireAdmin();
  const categories = await prisma.contentCategory.findMany({
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    include: { parent: true },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">קטגוריות תוכן</h1>
        <Link
          href="/admin/categories/new"
          className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-neutral-950 hover:bg-amber-500"
        >
          קטגוריה חדשה
        </Link>
      </div>
      <div className="overflow-x-auto rounded-xl border border-neutral-800">
        <table className="w-full min-w-[560px] text-sm">
          <thead className="border-b border-neutral-800 bg-neutral-900/60">
            <tr>
              <th className="p-3 text-start text-neutral-400">שם</th>
              <th className="p-3 text-start text-neutral-400">סלאג</th>
              <th className="p-3 text-start text-neutral-400">אב</th>
              <th className="p-3 text-end text-neutral-400">פעולות</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr
                key={c.id}
                className="border-b border-neutral-800/80 hover:bg-neutral-900/30"
              >
                <td className="p-3">{c.name}</td>
                <td className="p-3 font-mono text-xs text-neutral-400">
                  {c.slug}
                </td>
                <td className="p-3 text-neutral-500">
                  {c.parent?.name ?? '—'}
                </td>
                <td className="p-3 text-end">
                  <div className="flex flex-wrap justify-end gap-2">
                    <Link
                      href={`/admin/categories/${c.id}`}
                      className="rounded border border-neutral-600 px-2 py-1 text-xs hover:bg-neutral-800"
                    >
                      עריכה
                    </Link>
                    <form action={deleteContentCategoryForm}>
                      <input type="hidden" name="id" value={c.id} />
                      <button
                        type="submit"
                        className="rounded border border-red-900/60 px-2 py-1 text-xs text-red-300 hover:bg-red-950/40"
                      >
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
