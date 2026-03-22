import type { Prisma } from '@prisma/client';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
import ProductCarousel, { type CarouselCard } from '@/components/ProductCarousel';
import DeliveryInfo from '@/components/DeliveryInfo';
import HomeSeoSection from '@/components/HomeSeoSection';
import MarkdownBody from '@/components/MarkdownBody';
import { loadSiteText, parseTrustCards, SITE_TEXT_DEFAULTS } from '@/lib/site-text';

export const dynamic = 'force-dynamic';
/** Prisma דורש Node.js (לא Edge) — חשוב ב-Netlify */
export const runtime = 'nodejs';

type ProductWithVariants = Prisma.ProductGetPayload<{
  include: { variants: true };
}>;

const HOME_KEYS = Object.keys(SITE_TEXT_DEFAULTS).filter((k) => k.startsWith('home.'));

function homeText(map: Record<string, string>, key: string): string {
  return map[key] ?? SITE_TEXT_DEFAULTS[key] ?? '';
}

export default async function HomePage() {
  const home = await loadSiteText(prisma, HOME_KEYS);

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

  const byPrice = [...cards].sort((a, b) => a.price - b.price);
  const carouselItems: CarouselCard[] = byPrice.slice(0, 8).map((c, i) => ({
    ...c,
    promo: i < 3,
  }));

  let trustCards = parseTrustCards(home['home.trust.cardsJson']);
  if (trustCards.length === 0) {
    trustCards = parseTrustCards(SITE_TEXT_DEFAULTS['home.trust.cardsJson']);
  }

  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden border-b border-amber-500/10">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(245,158,11,0.18),transparent)]"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_50%,rgba(16,185,129,0.08),transparent)]" />
        <div className="container relative mx-auto max-w-5xl px-4 pb-16 pt-14 text-center sm:px-6 sm:pb-20 sm:pt-20">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-amber-500/90">
            {homeText(home, 'home.hero.kicker')}
          </p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-neutral-50 sm:text-5xl md:text-6xl">
            {homeText(home, 'home.hero.title1')}
            <span className="mt-2 block bg-gradient-to-l from-amber-200 to-amber-500 bg-clip-text text-transparent">
              {homeText(home, 'home.hero.title2')}
            </span>
          </h1>
          <div className="mx-auto mt-6 max-w-2xl text-pretty">
            <MarkdownBody
              content={homeText(home, 'home.hero.leadMarkdown')}
              className="prose-lg prose-p:leading-relaxed prose-p:text-neutral-400"
            />
          </div>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={homeText(home, 'home.hero.ctaPrimaryHref')}
              className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-gradient-to-l from-amber-500 to-amber-600 px-8 py-3.5 text-base font-bold text-neutral-950 shadow-lg shadow-amber-500/30 transition hover:brightness-110"
            >
              {homeText(home, 'home.hero.ctaPrimary')}
            </Link>
            <Link
              href={homeText(home, 'home.hero.ctaSecondaryHref')}
              className="inline-flex min-w-[200px] items-center justify-center rounded-full border border-neutral-600 bg-neutral-900/80 px-8 py-3.5 text-base font-semibold text-neutral-200 transition hover:border-amber-500/50 hover:text-amber-400"
            >
              {homeText(home, 'home.hero.ctaSecondary')}
            </Link>
            <Link
              href={homeText(home, 'home.hero.ctaBlogHref')}
              className="text-sm font-medium text-amber-500/90 underline-offset-4 hover:text-amber-400 hover:underline"
            >
              {homeText(home, 'home.hero.ctaBlog')}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-neutral-800/80 bg-neutral-950/50">
        <div className="container mx-auto grid max-w-5xl gap-6 px-4 py-10 sm:grid-cols-3 sm:px-6">
          {trustCards.map((x) => (
            <div
              key={x.title}
              className="rounded-2xl border border-neutral-800/90 bg-neutral-900/40 p-5 text-center sm:text-right"
            >
              <h2 className="text-sm font-bold text-amber-400">{x.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">{x.body}</p>
            </div>
          ))}
        </div>
      </section>

      {cards.length > 0 ? (
        <div className="container mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <ProductCarousel
            title={homeText(home, 'home.carousel.title')}
            subtitle={homeText(home, 'home.carousel.subtitle')}
            hint={homeText(home, 'home.carousel.hint')}
            items={carouselItems}
          />
        </div>
      ) : null}

      <div className="container mx-auto max-w-6xl px-4 pb-6 sm:px-6">
        <HomeSeoSection markdown={homeText(home, 'home.seo.markdown')} />
      </div>

      <section id="catalog" className="scroll-mt-24">
        <div className="container mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="mb-10 text-center sm:text-right">
            <h2 className="text-3xl font-bold text-neutral-100">
              {homeText(home, 'home.catalog.title')}
            </h2>
            <p className="mt-2 text-neutral-400">{homeText(home, 'home.catalog.subtitle')}</p>
          </div>

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
        </div>
      </section>

      <div className="container mx-auto max-w-4xl px-4 pb-16 sm:px-6">
        <DeliveryInfo
          title={homeText(home, 'home.delivery.title')}
          bodyMarkdown={homeText(home, 'home.delivery.bodyMarkdown')}
        />
      </div>
    </main>
  );
}
