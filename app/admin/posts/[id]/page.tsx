import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin/guard';
import { BlogPostForm } from '@/components/admin/BlogPostForm';

type Props = { params: Promise<{ id: string }> };

export default async function EditBlogPostPage({ params }: Props) {
  await requireAdmin();
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  const categories = await prisma.contentCategory.findMany({
    orderBy: { sortOrder: 'asc' },
    select: { id: true, name: true },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/posts"
          className="text-sm font-medium text-brand-leaf hover:text-brand-leaf-dark"
        >
          ← חזרה
        </Link>
        <h1 className="text-2xl font-semibold">עריכת פוסט</h1>
      </div>
      <BlogPostForm post={post} categories={categories} />
    </div>
  );
}
