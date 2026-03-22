import Link from 'next/link';
import { requireAdmin } from '@/lib/admin/guard';
import { ProductForm } from '@/components/admin/ProductForm';

export default async function NewProductPage() {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/products"
          className="text-sm font-medium text-brand-leaf hover:text-brand-leaf-dark"
        >
          ← חזרה
        </Link>
        <h1 className="text-2xl font-semibold">מוצר חדש</h1>
      </div>
      <p className="text-sm text-neutral-500">
        אחרי השמירה עברו לעריכת המוצר כדי להוסיף וריאציות (מחיר, תמונה, מלאי).
      </p>
      <ProductForm product={null} />
    </div>
  );
}
