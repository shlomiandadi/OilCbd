import type { Product } from '@prisma/client';
import { saveProduct } from '@/lib/admin/actions/products';
import { AdminField, adminInputClass } from '@/components/admin/AdminField';

function jsonPretty(v: unknown): string {
  if (v === null || v === undefined) return '';
  try {
    return JSON.stringify(v, null, 2);
  } catch {
    return '';
  }
}

function galleryText(g: unknown): string {
  if (Array.isArray(g) && g.every((x) => typeof x === 'string')) {
    return JSON.stringify(g, null, 2);
  }
  return '';
}

export function ProductForm({ product }: { product: Product | null }) {
  const p = product;

  return (
    <form action={saveProduct} className="mx-auto max-w-3xl space-y-5">
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
        <AdminField label="שם מוצר">
          <input
            className={adminInputClass}
            name="name"
            required
            defaultValue={p?.name ?? ''}
          />
        </AdminField>
      </div>
      <AdminField label="תיאור (Markdown או טקסט)">
        <textarea
          className={`${adminInputClass} min-h-[160px]`}
          name="description"
          required
          defaultValue={p?.description ?? ''}
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
      <AdminField label="מילות מפתח SEO">
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
      <AdminField label="תמונת OG (URL)">
        <input
          className={adminInputClass}
          name="ogImage"
          defaultValue={p?.ogImage ?? ''}
        />
      </AdminField>
      <AdminField label="פירורי לחם (JSON)">
        <textarea
          className={`${adminInputClass} min-h-[100px] font-mono text-xs`}
          name="breadcrumbJson"
          defaultValue={jsonPretty(p?.breadcrumbJson)}
        />
      </AdminField>
      <AdminField
        label="גלריית תמונות (JSON — מערך URL-ים)"
        hint='["https://...","https://..."]'
      >
        <textarea
          className={`${adminInputClass} min-h-[100px] font-mono text-xs`}
          name="galleryJson"
          defaultValue={galleryText(p?.galleryJson)}
        />
      </AdminField>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="isActive"
          defaultChecked={p?.isActive !== false}
          className="rounded border-neutral-600"
        />
        מוצר פעיל
      </label>
      <button
        type="submit"
        className="rounded-lg bg-amber-600 px-6 py-2.5 text-sm font-medium text-neutral-950 hover:bg-amber-500"
      >
        שמור מוצר
      </button>
    </form>
  );
}
