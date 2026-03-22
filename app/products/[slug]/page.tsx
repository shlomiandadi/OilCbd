import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';
import { absoluteUrl } from '@/lib/site';
import { parseBreadcrumbJson } from '@/lib/seo';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductCard from '@/components/ProductCard';

export const runtime = 'nodejs';

type PageProps = { params: Promise<{ slug: string }> };

async function getProduct(slug: string) {
  return prisma.product.findFirst({
    where: { slug, isActive: true },
    include: {
      variants: {
        where: { isActive: true },
        orderBy: [{ sortOrder: 'asc' }, { price: 'asc' }],
      },
    },
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) {
    return { title: 'מוצר לא נמצא', robots: { index: false, follow: true } };
  }

  const canonicalUrl = absoluteUrl(product.canonicalPath);
  const keywords = product.seoKeywords
    ? product.seoKeywords.split(',').map((k) => k.trim()).filter(Boolean)
    : undefined;
  const ogImage = product.ogImage ?? product.variants[0]?.image ?? undefined;

  return {
    title: product.seoTitle,
    description: product.seoDescription,
    keywords,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: 'website',
      locale: 'he_IL',
      url: canonicalUrl,
      title: product.seoTitle,
      description: product.seoDescription,
      ...(ogImage ? { images: [{ url: ogImage, alt: product.name }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: product.seoTitle,
      description: product.seoDescription,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    robots: { index: true, follow: true },
  };
}

function productJsonLd(
  product: Prisma.ProductGetPayload<{ include: { variants: true } }>,
  siteUrl: string
) {
  const prices = product.variants.map((v) => v.price);
  const low = prices.length ? Math.min(...prices) : 0;
  const high = prices.length ? Math.max(...prices) : 0;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.ogImage ?? product.variants[0]?.image,
    brand: { '@type': 'Brand', name: 'OilCbd' },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'ILS',
      lowPrice: low,
      highPrice: high,
      offerCount: product.variants.length,
      availability: 'https://schema.org/InStock',
      url: `${siteUrl}${product.canonicalPath.startsWith('/') ? product.canonicalPath : `/${product.canonicalPath}`}`,
    },
  };
}

function breadcrumbJsonLd(
  items: { name: string; href: string }[],
  siteUrl: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.href.startsWith('http') ? item.href : `${siteUrl}${item.href.startsWith('/') ? item.href : `/${item.href}`}`,
    })),
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product || product.variants.length === 0) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'http://localhost:3000';
  const crumbs = parseBreadcrumbJson(product.breadcrumbJson);
  const pLd = productJsonLd(product, siteUrl);
  const bLd = breadcrumbJsonLd(crumbs.length > 0 ? crumbs : [{ name: 'דף הבית', href: '/' }, { name: product.name, href: product.canonicalPath }], siteUrl);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bLd) }}
      />
      <main className="min-h-screen">
        <article className="container mx-auto px-6 py-12 max-w-6xl">
          <Breadcrumbs items={crumbs.length > 0 ? crumbs : [{ name: 'דף הבית', href: '/' }, { name: product.name, href: product.canonicalPath }]} />
          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">{product.name}</h1>
            <p className="text-neutral-400 leading-relaxed max-w-3xl whitespace-pre-wrap">{product.description}</p>
          </header>
          <h2 className="text-lg font-semibold text-amber-500/90 mb-6">בחרו נפח וריכוז</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {product.variants.map((v) => (
              <ProductCard
                key={v.id}
                id={v.id}
                name={product.name}
                variantLabel={v.label}
                description={product.description}
                price={v.price}
                cbdPercentage={v.cbdPercentage}
                image={v.image}
              />
            ))}
          </div>
        </article>
      </main>
    </>
  );
}
