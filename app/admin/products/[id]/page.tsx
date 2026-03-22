import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin/guard';
import { ProductForm } from '@/components/admin/ProductForm';
import { ProductVariantForm } from '@/components/admin/ProductVariantForm';

type Props = { params: Promise<{ id: string }> };

export default async function EditProductPage({ params }: Props) {
  await requireAdmin();
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      variants: { orderBy: [{ sortOrder: 'asc' }, { price: 'asc' }] },
    },
  });
  if (!product) notFound();

  return (
    <div className="space-y-10">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/products"
          className="text-sm text-neutral-400 hover:text-amber-400"
        >
          ← חזרה
        </Link>
        <h1 className="text-2xl font-semibold">עריכת מוצר</h1>
      </div>
      <section className="space-y-4">
        <h2 className="text-lg font-medium text-amber-400/90">פרטי מוצר</h2>
        <ProductForm product={product} />
      </section>
      <section className="space-y-4">
        <h2 className="text-lg font-medium text-amber-400/90">וריאציות</h2>
        <div className="space-y-4">
          {product.variants.map((v) => (
            <ProductVariantForm key={v.id} variant={v} productId={product.id} />
          ))}
        </div>
        <div>
          <h3 className="mb-2 text-sm text-neutral-400">הוספת וריאציה</h3>
          <ProductVariantForm variant={null} productId={product.id} />
        </div>
      </section>
    </div>
  );
}
