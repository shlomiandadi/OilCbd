import Link from 'next/link';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin/guard';
import {
  CategoryForm,
  buildParentOptions,
} from '@/components/admin/CategoryForm';

export default async function NewCategoryPage() {
  await requireAdmin();
  const all = await prisma.contentCategory.findMany();
  const parentOptions = buildParentOptions(all, null);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/categories"
          className="text-sm text-neutral-400 hover:text-amber-400"
        >
          ← חזרה
        </Link>
        <h1 className="text-2xl font-semibold">קטגוריה חדשה</h1>
      </div>
      <CategoryForm category={null} parentOptions={parentOptions} />
    </div>
  );
}
