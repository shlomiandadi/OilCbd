import type { BlogPost } from '@prisma/client';
import { saveBlogPost } from '@/lib/admin/actions/blog-posts';
import { AdminField, adminInputClass } from '@/components/admin/AdminField';

function jsonPretty(v: unknown): string {
  if (v === null || v === undefined) return '';
  try {
    return JSON.stringify(v, null, 2);
  } catch {
    return '';
  }
}

type Cat = { id: string; name: string };

function publishedLocal(post: BlogPost | null): string {
  if (!post?.publishedAt) return '';
  const d = new Date(post.publishedAt);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function BlogPostForm({
  post,
  categories,
}: {
  post: BlogPost | null;
  categories: Cat[];
}) {
  const p = post;

  return (
    <form action={saveBlogPost} className="mx-auto max-w-3xl space-y-5">
      {p ? <input type="hidden" name="id" value={p.id} /> : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <AdminField label="סלאג">
          <input
            className={adminInputClass}
            name="slug"
            required
            defaultValue={p?.slug ?? ''}
          />
        </AdminField>
        <AdminField label="כותרת">
          <input
            className={adminInputClass}
            name="title"
            required
            defaultValue={p?.title ?? ''}
          />
        </AdminField>
      </div>
      <AdminField label="קטגוריה">
        <select
          className={adminInputClass}
          name="categoryId"
          defaultValue={p?.categoryId ?? ''}
        >
          <option value="">— ללא —</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </AdminField>
      <AdminField label="תקציר">
        <textarea
          className={`${adminInputClass} min-h-[72px]`}
          name="excerpt"
          defaultValue={p?.excerpt ?? ''}
        />
      </AdminField>
      <AdminField label="גוף (Markdown)">
        <textarea
          className={`${adminInputClass} min-h-[220px] font-mono text-xs`}
          name="bodyMarkdown"
          required
          defaultValue={p?.bodyMarkdown ?? ''}
        />
      </AdminField>
      <div className="grid gap-4 sm:grid-cols-2">
        <AdminField label="SEO title">
          <input
            className={adminInputClass}
            name="seoTitle"
            required
            defaultValue={p?.seoTitle ?? ''}
          />
        </AdminField>
        <AdminField label="SEO description">
          <textarea
            className={`${adminInputClass} min-h-[80px]`}
            name="seoDescription"
            required
            defaultValue={p?.seoDescription ?? ''}
          />
        </AdminField>
      </div>
      <AdminField label="מילות מפתח">
        <input
          className={adminInputClass}
          name="seoKeywords"
          defaultValue={p?.seoKeywords ?? ''}
        />
      </AdminField>
      <AdminField label="נתיב קנוני">
        <input
          className={adminInputClass}
          name="canonicalPath"
          defaultValue={p?.canonicalPath ?? ''}
        />
      </AdminField>
      <div className="grid gap-4 sm:grid-cols-2">
        <AdminField label="תמונת שער (URL)">
          <input
            className={adminInputClass}
            name="coverImage"
            defaultValue={p?.coverImage ?? ''}
          />
        </AdminField>
        <AdminField label="OG image (URL)">
          <input
            className={adminInputClass}
            name="ogImage"
            defaultValue={p?.ogImage ?? ''}
          />
        </AdminField>
      </div>
      <AdminField label="פירורי לחם (JSON)">
        <textarea
          className={`${adminInputClass} min-h-[100px] font-mono text-xs`}
          name="breadcrumbJson"
          defaultValue={jsonPretty(p?.breadcrumbJson)}
        />
      </AdminField>
      <AdminField label="תאריך פרסום (מקומי)">
        <input
          className={adminInputClass}
          type="datetime-local"
          name="publishedAt"
          defaultValue={publishedLocal(p)}
        />
      </AdminField>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="isPublished"
          defaultChecked={p?.isPublished !== false}
          className="rounded border-neutral-600"
        />
        פורסם
      </label>
      <button
        type="submit"
        className="rounded-lg bg-amber-600 px-6 py-2.5 text-sm font-medium text-neutral-950 hover:bg-amber-500"
      >
        שמור
      </button>
    </form>
  );
}
