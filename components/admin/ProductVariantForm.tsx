import type { ProductVariant } from '@prisma/client';
import {
  saveProductVariant,
  deleteProductVariantForm,
} from '@/lib/admin/actions/products';
import { AdminField, adminInputClass } from '@/components/admin/AdminField';

export function ProductVariantForm({
  variant,
  productId,
}: {
  variant: ProductVariant | null;
  productId: string;
}) {
  const v = variant;

  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900/40 p-4">
      <form action={saveProductVariant} className="space-y-3">
        {v ? <input type="hidden" name="id" value={v.id} /> : null}
        <input type="hidden" name="productId" value={productId} />
        <div className="grid gap-3 sm:grid-cols-2">
          <AdminField label="תווית וריאציה">
            <input
              className={adminInputClass}
              name="label"
              required
              defaultValue={v?.label ?? ''}
            />
          </AdminField>
          <AdminField label="מחיר (₪)">
            <input
              className={adminInputClass}
              name="price"
              type="number"
              step="0.01"
              required
              defaultValue={v?.price ?? ''}
            />
          </AdminField>
        </div>
        <AdminField label="תמונה (URL)">
          <input
            className={adminInputClass}
            name="image"
            required
            defaultValue={v?.image ?? ''}
          />
        </AdminField>
        <div className="grid gap-3 sm:grid-cols-3">
          <AdminField label="% CBD">
            <input
              className={adminInputClass}
              name="cbdPercentage"
              type="number"
              step="0.01"
              defaultValue={v?.cbdPercentage ?? 0}
            />
          </AdminField>
          <AdminField label="% THC (ריק = ללא)">
            <input
              className={adminInputClass}
              name="thcPercentage"
              type="number"
              step="0.01"
              defaultValue={v?.thcPercentage ?? ''}
            />
          </AdminField>
          <AdminField label="נפח מ״ל">
            <input
              className={adminInputClass}
              name="volumeMl"
              type="number"
              defaultValue={v?.volumeMl ?? 0}
            />
          </AdminField>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <AdminField label="מלאי">
            <input
              className={adminInputClass}
              name="stock"
              type="number"
              defaultValue={v?.stock ?? 0}
            />
          </AdminField>
          <AdminField label="סדר מיון">
            <input
              className={adminInputClass}
              name="sortOrder"
              type="number"
              defaultValue={v?.sortOrder ?? 0}
            />
          </AdminField>
        </div>
        <AdminField label="קישור תוצאות מעבדה (אופציונלי)">
          <input
            className={adminInputClass}
            name="labResultsUrl"
            defaultValue={v?.labResultsUrl ?? ''}
          />
        </AdminField>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="isActive"
            defaultChecked={v?.isActive !== false}
            className="rounded border-neutral-600"
          />
          פעיל
        </label>
        <button
          type="submit"
          className="rounded bg-amber-600/90 px-4 py-2 text-sm text-neutral-950 hover:bg-amber-500"
        >
          {v ? 'עדכן וריאציה' : 'הוסף וריאציה'}
        </button>
      </form>
      {v ? (
        <form action={deleteProductVariantForm} className="mt-3">
          <input type="hidden" name="id" value={v.id} />
          <input type="hidden" name="productId" value={productId} />
          <button
            type="submit"
            className="text-xs text-red-400 hover:text-red-300"
          >
            מחק וריאציה
          </button>
        </form>
      ) : null}
    </div>
  );
}
