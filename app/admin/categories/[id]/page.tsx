import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin/guard';
import {
  CategoryForm,
  buildParentOptions,
} from '@/components/admin/CategoryForm';

type Props = { params: Promise<{ id: string }> };

export default async function EditCategoryPage({ params }: Props) {
  await requireAdmin();
  const { id } = await params;
  const category = await prisma.contentCategory.findUnique({ where: { id } });
  if (!category) notFound();

  const all = await prisma.contentCategory.findMany();
  const parentOptions = buildParentOptions(all, id);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/categories"
          className="text-sm font-medium text-brand-leaf hover:text-brand-leaf-dark"
        >
          ← חזרה
        </Link>
        <h1 className="text-2xl font-semibold">עריכת קטגוריה</h1>
      </div>
      <CategoryForm category={category} parentOptions={parentOptions} />
    </div>
  );
}
