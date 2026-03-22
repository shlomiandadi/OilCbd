import Link from 'next/link';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin/guard';
import { ContentPageForm } from '@/components/admin/ContentPageForm';

export default async function NewContentPagePage() {
  await requireAdmin();
  const categories = await prisma.contentCategory.findMany({
    orderBy: { sortOrder: 'asc' },
    select: { id: true, name: true },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/pages"
          className="text-sm font-medium text-brand-leaf hover:text-brand-leaf-dark"
        >
          ← חזרה
        </Link>
        <h1 className="text-2xl font-semibold">עמוד תוכן חדש</h1>
      </div>
      <ContentPageForm page={null} categories={categories} />
    </div>
  );
}
