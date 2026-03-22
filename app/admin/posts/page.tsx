import Link from 'next/link';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin/guard';
import { deleteBlogPostForm } from '@/lib/admin/actions/blog-posts';
import {
  adminBtnDanger,
  adminBtnPrimary,
  adminBtnSecondary,
} from '@/components/admin/AdminField';

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
    <div className="space-y-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-leaf">
            בלוג
          </p>
          <h1 className="mt-1 text-3xl font-bold text-brand-ink">פוסטים</h1>
          <p className="mt-2 max-w-xl text-sm text-brand-ink-muted">
            מאמרים, כותרות SEO ותמונות שער.
          </p>
        </div>
        <Link href="/admin/posts/new" className={adminBtnPrimary}>
          + פוסט חדש
        </Link>
      </div>

      <div className="admin-table-wrap">
        <table className="w-full min-w-[600px] text-sm">
          <thead className="border-b border-brand-border bg-brand-cream/80">
            <tr>
              <th className="p-4 text-start text-xs font-bold uppercase tracking-wide text-brand-ink-muted">
                כותרת
              </th>
              <th className="p-4 text-start text-xs font-bold uppercase tracking-wide text-brand-ink-muted">
                סלאג
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
            {posts.map((p) => (
              <tr key={p.id} className="transition hover:bg-brand-cream/40">
                <td className="p-4 font-medium text-brand-ink">{p.title}</td>
                <td className="p-4 font-mono text-xs text-brand-ink-muted">{p.slug}</td>
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
                      href={`/admin/posts/${p.id}`}
                      className={adminBtnSecondary + ' !px-3 !py-1.5 !text-xs'}
                    >
                      עריכה
                    </Link>
                    <form action={deleteBlogPostForm}>
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
