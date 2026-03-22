import Link from 'next/link';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin/guard';
import { deleteBlogPostForm } from '@/lib/admin/actions/blog-posts';

export default async function AdminPostsPage() {
  await requireAdmin();
  const posts = await prisma.blogPost.findMany({
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
        <h1 className="text-2xl font-semibold">פוסטים</h1>
        <Link
          href="/admin/posts/new"
          className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-neutral-950 hover:bg-amber-500"
        >
          פוסט חדש
        </Link>
      </div>
      <div className="overflow-x-auto rounded-xl border border-neutral-800">
        <table className="w-full min-w-[600px] text-sm">
          <thead className="border-b border-neutral-800 bg-neutral-900/60">
            <tr>
              <th className="p-3 text-start text-neutral-400">כותרת</th>
              <th className="p-3 text-start text-neutral-400">סלאג</th>
              <th className="p-3 text-start text-neutral-400">פורסם</th>
              <th className="p-3 text-end text-neutral-400">פעולות</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr
                key={p.id}
                className="border-b border-neutral-800/80 hover:bg-neutral-900/30"
              >
                <td className="p-3">{p.title}</td>
                <td className="p-3 font-mono text-xs text-neutral-400">
                  {p.slug}
                </td>
                <td className="p-3">{p.isPublished ? 'כן' : 'לא'}</td>
                <td className="p-3 text-end">
                  <div className="flex flex-wrap justify-end gap-2">
                    <Link
                      href={`/admin/posts/${p.id}`}
                      className="rounded border border-neutral-600 px-2 py-1 text-xs hover:bg-neutral-800"
                    >
                      עריכה
                    </Link>
                    <form action={deleteBlogPostForm}>
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
