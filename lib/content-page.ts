import prisma from '@/lib/prisma';

export async function getPublishedContentPage(slug: string) {
  return prisma.contentPage.findFirst({
    where: { slug, isPublished: true },
    include: { category: true },
  });
}
