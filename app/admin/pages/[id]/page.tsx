import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin/guard';
import { ContentPageForm } from '@/components/admin/ContentPageForm';

type Props = { params: Promise<{ id: string }> };

export default async function EditContentPagePage({ params }: Props) {
  await requireAdmin();
  const { id } = await params;
  const page = await prisma.contentPage.findUnique({ where: { id } });
  if (!page) notFound();

  const categories = await prisma.contentCategory.findMany({
    orderBy: { sortOrder: 'asc' },
    select: { id: true, name: true },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/pages"
          className="text-sm text-neutral-400 hover:text-amber-400"
        >
          ← חזרה
        </Link>
        <h1 className="text-2xl font-semibold">עריכת עמוד</h1>
      </div>
      <ContentPageForm page={page} categories={categories} />
    </div>
  );
}
