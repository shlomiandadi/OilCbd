'use server';

import { revalidatePath } from 'next/cache';
import { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin/guard';
import { parseJson } from '@/lib/admin/json';
import { redirect } from 'next/navigation';

export async function saveProduct(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get('id') ?? '').trim();
  const slug = String(formData.get('slug') ?? '')
    .trim()
    .replace(/\s+/g, '-');
  const name = String(formData.get('name') ?? '').trim();
  const description = String(formData.get('description') ?? '');
  const seoTitle = String(formData.get('seoTitle') ?? '').trim();
  const seoDescription = String(formData.get('seoDescription') ?? '').trim();
  const seoKeywords = String(formData.get('seoKeywords') ?? '').trim() || null;
  let canonicalPath = String(formData.get('canonicalPath') ?? '').trim();
  const ogImage = String(formData.get('ogImage') ?? '').trim() || null;
  const breadcrumbRaw = String(formData.get('breadcrumbJson') ?? '');
  const galleryRaw = String(formData.get('galleryJson') ?? '');
  const isActive = formData.get('isActive') === 'on';

  if (!slug || !name || !seoTitle || !seoDescription) {
    throw new Error('שדות חובה חסרים');
  }
  if (!canonicalPath) canonicalPath = `/products/${slug}`;

  const breadcrumbJson = parseJson(breadcrumbRaw, [
    { name: 'דף הבית', href: '/' },
    { name: 'מוצרים', href: '/' },
    { name: name, href: canonicalPath },
  ]);

  const galleryParsed = galleryRaw.trim()
    ? parseJson(galleryRaw, [] as string[])
    : null;
  const galleryJson: Prisma.InputJsonValue | typeof Prisma.JsonNull =
    galleryParsed === null
      ? Prisma.JsonNull
      : Array.isArray(galleryParsed)
        ? galleryParsed
        : [];

  if (id) {
    await prisma.product.update({
      where: { id },
      data: {
        slug,
        name,
        description,
        seoTitle,
        seoDescription,
        seoKeywords,
        canonicalPath,
        ogImage,
        breadcrumbJson,
        galleryJson,
        isActive,
      },
    });
  } else {
    const exists = await prisma.product.findUnique({ where: { slug } });
    if (exists) throw new Error('הסלאג כבר בשימוש');
    await prisma.product.create({
      data: {
        slug,
        name,
        description,
        seoTitle,
        seoDescription,
        seoKeywords,
        canonicalPath,
        ogImage,
        breadcrumbJson,
        galleryJson:
          galleryParsed === null ? undefined : (galleryJson as Prisma.InputJsonValue),
        isActive,
      },
    });
  }

  revalidatePath('/');
  revalidatePath(`/products/${slug}`);
  revalidatePath('/admin/products');
  redirect('/admin/products');
}

export async function deleteProduct(id: string) {
  await requireAdmin();
  const p = await prisma.product.findUnique({ where: { id } });
  if (p) {
    await prisma.product.delete({ where: { id } });
    revalidatePath('/');
    revalidatePath(`/products/${p.slug}`);
  }
  redirect('/admin/products');
}

export async function saveProductVariant(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get('id') ?? '').trim();
  const productId = String(formData.get('productId') ?? '').trim();
  const label = String(formData.get('label') ?? '').trim();
  const price = Number(formData.get('price'));
  const image = String(formData.get('image') ?? '').trim();
  const cbdPercentage = Number(formData.get('cbdPercentage'));
  const thcRaw = String(formData.get('thcPercentage') ?? '').trim();
  const thcPercentage = thcRaw === '' ? null : Number(thcRaw);
  const volumeMl = Number(formData.get('volumeMl'));
  const stock = Number(formData.get('stock'));
  const sortOrder = Number(formData.get('sortOrder') ?? '0');
  const labResultsUrl =
    String(formData.get('labResultsUrl') ?? '').trim() || null;
  const isActive = formData.get('isActive') === 'on';

  if (!productId || !label || !image || Number.isNaN(price)) {
    throw new Error('שדות חובה לוריאציה');
  }

  if (id) {
    await prisma.productVariant.update({
      where: { id },
      data: {
        label,
        price,
        image,
        cbdPercentage: Number.isNaN(cbdPercentage) ? 0 : cbdPercentage,
        thcPercentage,
        volumeMl: Number.isNaN(volumeMl) ? 0 : volumeMl,
        stock: Number.isNaN(stock) ? 0 : stock,
        sortOrder: Number.isNaN(sortOrder) ? 0 : sortOrder,
        labResultsUrl,
        isActive,
      },
    });
  } else {
    await prisma.productVariant.create({
      data: {
        productId,
        label,
        price,
        image,
        cbdPercentage: Number.isNaN(cbdPercentage) ? 0 : cbdPercentage,
        thcPercentage,
        volumeMl: Number.isNaN(volumeMl) ? 0 : volumeMl,
        stock: Number.isNaN(stock) ? 0 : stock,
        sortOrder: Number.isNaN(sortOrder) ? 0 : sortOrder,
        labResultsUrl,
        isActive,
      },
    });
  }

  const product = await prisma.product.findUnique({ where: { id: productId } });
  revalidatePath('/');
  if (product) revalidatePath(`/products/${product.slug}`);
  redirect(`/admin/products/${productId}`);
}

export async function deleteProductVariant(id: string, productId: string) {
  await requireAdmin();
  await prisma.productVariant.delete({ where: { id } });
  const product = await prisma.product.findUnique({ where: { id: productId } });
  revalidatePath('/');
  if (product) revalidatePath(`/products/${product.slug}`);
  redirect(`/admin/products/${productId}`);
}

export async function deleteProductForm(formData: FormData) {
  await deleteProduct(String(formData.get('id') ?? ''));
}

export async function deleteProductVariantForm(formData: FormData) {
  await deleteProductVariant(
    String(formData.get('id') ?? ''),
    String(formData.get('productId') ?? '')
  );
}
