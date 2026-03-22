import Link from 'next/link';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin/guard';
import { BlogPostForm } from '@/components/admin/BlogPostForm';

export default async function NewBlogPostPage() {
  await requireAdmin();
  const categories = await prisma.contentCategory.findMany({
    orderBy: { sortOrder: 'asc' },
    select: { id: true, name: true },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/posts"
          className="text-sm text-neutral-400 hover:text-amber-400"
        >
          ← חזרה
        </Link>
        <h1 className="text-2xl font-semibold">פוסט חדש</h1>
      </div>
      <BlogPostForm post={null} categories={categories} />
    </div>
  );
}
