import type { ContentPage } from '@prisma/client';
import { saveContentPage } from '@/lib/admin/actions/content-pages';
import {
  AdminField,
  adminInputClass,
  adminBtnPrimary,
} from '@/components/admin/AdminField';

function phrasesText(tp: unknown): string {
  if (Array.isArray(tp) && tp.every((x) => typeof x === 'string')) {
    return tp.join('\n');
  }
  return '';
}

function jsonPretty(v: unknown): string {
  if (v === null || v === undefined) return '';
  try {
    return JSON.stringify(v, null, 2);
  } catch {
    return '';
  }
}

type Cat = { id: string; name: string };

export function ContentPageForm({
  page,
  categories,
}: {
  page: ContentPage | null;
  categories: Cat[];
}) {
  const p = page;

  return (
    <div className="admin-card mx-auto max-w-3xl">
    <form action={saveContentPage} className="space-y-5">
      {p ? <input type="hidden" name="id" value={p.id} /> : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <AdminField label="סלאג (אנגלית/מקף)">
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
      <AdminField label="מילות מפתח SEO (מופרדות בפסיק)">
        <input
          className={adminInputClass}
          name="seoKeywords"
          defaultValue={p?.seoKeywords ?? ''}
        />
      </AdminField>
      <AdminField label="נתיב קנוני" hint="למשל /learn/my-slug או /about">
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
      <AdminField
        label="פירורי לחם (JSON)"
        hint='[{"name":"...","href":"..."}]'
      >
        <textarea
          className={`${adminInputClass} min-h-[100px] font-mono text-xs`}
          name="breadcrumbJson"
          defaultValue={jsonPretty(p?.breadcrumbJson)}
        />
      </AdminField>
      <AdminField label="מילות מפתח / ביטויים (שורה לכל אחד)">
        <textarea
          className={`${adminInputClass} min-h-[100px]`}
          name="targetPhrases"
          defaultValue={phrasesText(p?.targetPhrasesJson)}
        />
      </AdminField>
      <AdminField
        label="FAQ JSON-LD (מערך שאלות/תשובות)"
        hint='[{"question":"...","answer":"..."}]'
      >
        <textarea
          className={`${adminInputClass} min-h-[120px] font-mono text-xs`}
          name="faqJson"
          defaultValue={jsonPretty(p?.faqJson)}
        />
      </AdminField>
      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="showInLearnIndex"
            defaultChecked={p?.showInLearnIndex !== false}
            className="rounded border-brand-border text-brand-leaf"
          />
          הצג ברשימת /learn
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="isPublished"
            defaultChecked={p?.isPublished !== false}
            className="rounded border-brand-border text-brand-leaf"
          />
          פורסם
        </label>
      </div>
      <button type="submit" className={adminBtnPrimary}>
        שמור
      </button>
    </form>
    </div>
  );
}
