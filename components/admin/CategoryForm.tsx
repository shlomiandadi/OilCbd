import type { ContentCategory } from '@prisma/client';
import { saveContentCategory } from '@/lib/admin/actions/categories';
import { AdminField, adminInputClass } from '@/components/admin/AdminField';

type Opt = { id: string; label: string };

export function CategoryForm({
  category,
  parentOptions,
}: {
  category: ContentCategory | null;
  parentOptions: Opt[];
}) {
  const c = category;

  return (
    <form action={saveContentCategory} className="mx-auto max-w-xl space-y-4">
      {c ? <input type="hidden" name="id" value={c.id} /> : null}
      <AdminField label="סלאג">
        <input
          className={adminInputClass}
          name="slug"
          required
          defaultValue={c?.slug ?? ''}
        />
      </AdminField>
      <AdminField label="שם תצוגה">
        <input
          className={adminInputClass}
          name="name"
          required
          defaultValue={c?.name ?? ''}
        />
      </AdminField>
      <AdminField label="תיאור">
        <textarea
          className={`${adminInputClass} min-h-[80px]`}
          name="description"
          defaultValue={c?.description ?? ''}
        />
      </AdminField>
      <AdminField label="SEO title">
        <input
          className={adminInputClass}
          name="seoTitle"
          defaultValue={c?.seoTitle ?? ''}
        />
      </AdminField>
      <AdminField label="SEO description">
        <textarea
          className={`${adminInputClass} min-h-[60px]`}
          name="seoDescription"
          defaultValue={c?.seoDescription ?? ''}
        />
      </AdminField>
      <AdminField label="סדר מיון">
        <input
          className={adminInputClass}
          name="sortOrder"
          type="number"
          defaultValue={c?.sortOrder ?? 0}
        />
      </AdminField>
      <AdminField label="קטגוריית אב (תת־קטגוריה)">
        <select
          className={adminInputClass}
          name="parentId"
          defaultValue={c?.parentId ?? ''}
        >
          <option value="">— ללא (רמה עליונה) —</option>
          {parentOptions.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
      </AdminField>
      <button
        type="submit"
        className="rounded-lg bg-amber-600 px-6 py-2.5 text-sm font-medium text-neutral-950 hover:bg-amber-500"
      >
        שמור
      </button>
    </form>
  );
}

function buildParentOptions(
  all: ContentCategory[],
  excludeId: string | null
): Opt[] {
  const byId = new Map(all.map((x) => [x.id, x]));
  function labelFor(cat: ContentCategory): string {
    const parts: string[] = [];
    let cur: ContentCategory | undefined = cat;
    let guard = 0;
    while (cur && guard++ < 20) {
      parts.unshift(cur.name);
      cur = cur.parentId ? byId.get(cur.parentId) : undefined;
    }
    return parts.join(' › ');
  }
  return all
    .filter((x) => x.id !== excludeId)
    .map((x) => ({ id: x.id, label: labelFor(x) }));
}

export { buildParentOptions };
