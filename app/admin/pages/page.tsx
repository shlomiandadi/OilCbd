import Link from 'next/link';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin/guard';
import { deleteContentPageForm } from '@/lib/admin/actions/content-pages';

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
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">עמודי תוכן</h1>
        <Link
          href="/admin/pages/new"
          className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-neutral-950 hover:bg-amber-500"
        >
          עמוד חדש
        </Link>
      </div>
      <div className="overflow-x-auto rounded-xl border border-neutral-800">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="border-b border-neutral-800 bg-neutral-900/60">
            <tr>
              <th className="p-3 text-start font-medium text-neutral-400">
                כותרת
              </th>
              <th className="p-3 text-start font-medium text-neutral-400">
                סלאג
              </th>
              <th className="p-3 text-start font-medium text-neutral-400">
                קנוני
              </th>
              <th className="p-3 text-start font-medium text-neutral-400">
                פורסם
              </th>
              <th className="p-3 text-end font-medium text-neutral-400">פעולות</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((p) => (
              <tr
                key={p.id}
                className="border-b border-neutral-800/80 hover:bg-neutral-900/30"
              >
                <td className="p-3">{p.title}</td>
                <td className="p-3 font-mono text-xs text-neutral-400">
                  {p.slug}
                </td>
                <td className="p-3 text-xs text-neutral-500">{p.canonicalPath}</td>
                <td className="p-3">{p.isPublished ? 'כן' : 'לא'}</td>
                <td className="p-3 text-end">
                  <div className="flex flex-wrap justify-end gap-2">
                    <Link
                      href={`/admin/pages/${p.id}`}
                      className="rounded border border-neutral-600 px-2 py-1 text-xs hover:bg-neutral-800"
                    >
                      עריכה
                    </Link>
                    <form action={deleteContentPageForm}>
                      <input type="hidden" name="id" value={p.id} />
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
