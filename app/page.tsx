import type { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
import DeliveryInfo from '@/components/DeliveryInfo';

export const dynamic = 'force-dynamic';
/** Prisma דורש Node.js (לא Edge) — חשוב ב-Netlify */
export const runtime = 'nodejs';

type ProductWithVariants = Prisma.ProductGetPayload<{
  include: { variants: true };
}>;

export default async function HomePage() {
  let products: ProductWithVariants[] = [];
  let loadError: string | null = null;

  try {
    products = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
      include: {
        variants: {
          where: { isActive: true },
          orderBy: [{ sortOrder: 'asc' }, { price: 'asc' }],
        },
      },
    });
  } catch (e) {
    console.error('[HomePage] prisma.product.findMany failed:', e);
    loadError =
      e instanceof Error ? e.message : 'שגיאה לא ידועה בחיבור למסד הנתונים';
  }

  const cards = products.flatMap((p) =>
    p.variants.map((v) => ({
      key: v.id,
      id: v.id,
      productSlug: p.slug,
      name: p.name,
      variantLabel: v.label,
      description: p.description,
      price: v.price,
      cbdPercentage: v.cbdPercentage,
      image: v.image,
    }))
  );

  return (
    <main className="min-h-screen">
      <section className="container mx-auto px-6 py-16">
        <h1 className="mb-4 text-center text-4xl font-bold text-neutral-100">
          שמן CBD פרימיום
        </h1>
        <p className="mb-12 text-center text-neutral-400">
          בחרו מוצר ווריאציה — משלוח מהיר ודיסקרטי
        </p>
        {cards.length === 0 ? (
          <div className="mx-auto max-w-xl text-center text-neutral-500">
            <p className="mb-3">
              אין מוצרים להצגה. ב־Netlify:{' '}
              <strong className="text-neutral-300">Site configuration → Environment variables</strong>
              — הוסיפו{' '}
              <code className="rounded bg-neutral-900 px-2 py-0.5 text-amber-500/90">
                DATABASE_URL
              </code>{' '}
              (אותה מחרוזת כמו ב־.env המקומי, בלי מרכאות) וגם{' '}
              <code className="rounded bg-neutral-900 px-2 py-0.5 text-amber-500/90">
                NEXT_PUBLIC_SITE_URL
              </code>{' '}
              עם כתובת האתר (למשל https://oil-cbd.netlify.app). שמרו, אחר כך{' '}
              <strong className="text-neutral-300">Deploys → Trigger deploy → Clear cache and deploy site</strong>
              . מהמחשב, מול אותו DB, הריצו פעם אחת:{' '}
              <code className="rounded bg-neutral-900 px-2 py-0.5 text-amber-500/90">
                npx prisma migrate deploy
              </code>{' '}
              ואז{' '}
              <code className="rounded bg-neutral-900 px-2 py-0.5 text-amber-500/90">
                npx prisma db seed
              </code>
              .
            </p>
            <p className="mb-3 text-xs text-neutral-600">
              בדיקת חיבור מהירה: פתחו{' '}
              <code className="rounded bg-neutral-900 px-1 text-amber-500/80">/api/health/db</code>
              — אם <code className="text-green-500/90">ok: true</code> והמספרים &gt; 0, הבעיה לא ב־DB.
            </p>
            {loadError ? (
              <p
                className="rounded-lg border border-red-900/50 bg-red-950/40 p-3 text-sm text-red-200/90"
                dir="ltr"
              >
                {process.env.NODE_ENV === 'development'
                  ? loadError
                  : 'שגיאת חיבור למסד (Prisma). ב־Netlify ודאו ש־DATABASE_URL מוגדר למצב Production, ללא מרכאות סביב הערך. בלוגי Deploy חפשו [HomePage].'}
              </p>
            ) : products.length > 0 ? (
              <p className="text-sm text-neutral-600">
                יש מוצרים במסד אך אין וריאציות פעילות — בדקו ב־Prisma Studio ש־
                <code className="mx-1 text-amber-500/80">isActive</code>
                מופעל על הוריאציות.
              </p>
            ) : null}
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((c) => (
              <ProductCard
                key={c.key}
                id={c.id}
                name={c.name}
                productSlug={c.productSlug}
                variantLabel={c.variantLabel}
                description={c.description}
                price={c.price}
                cbdPercentage={c.cbdPercentage}
                image={c.image}
              />
            ))}
          </div>
        )}
      </section>
      <DeliveryInfo />
    </main>
  );
}
