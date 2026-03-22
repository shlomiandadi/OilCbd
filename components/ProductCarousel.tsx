'use client';

import ProductCard from '@/components/ProductCard';

export type CarouselCard = {
  key: string;
  id: string;
  productSlug: string;
  name: string;
  variantLabel: string;
  description: string;
  price: number;
  cbdPercentage: number;
  image: string;
  promo?: boolean;
};

type Props = {
  title: string;
  subtitle?: string;
  items: CarouselCard[];
};

/** גלילה אופקית עם snap — נוח לנייד ול־RTL */
export default function ProductCarousel({ title, subtitle, items }: Props) {
  if (items.length === 0) return null;

  return (
    <section className="relative" aria-labelledby="carousel-heading">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-neutral-100 sm:text-3xl" id="carousel-heading">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-1 max-w-2xl text-neutral-400">{subtitle}</p>
        ) : null}
        <p className="mt-2 text-sm text-neutral-500">
          גלילה אופקית — גררו עם האצבע או עם העכבר
        </p>
      </div>

      <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
        <div
          className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pt-1"
          style={{ scrollPaddingInline: '1rem' }}
        >
          {items.map((c) => (
            <div
              key={c.key}
              className="w-[min(100%,340px)] shrink-0 snap-center sm:w-[300px] md:w-[320px]"
            >
              <div className="relative h-full">
                {c.promo ? (
                  <span className="absolute -top-1 left-1/2 z-20 -translate-x-1/2 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
                    מבצע
                  </span>
                ) : null}
                <ProductCard
                  id={c.id}
                  name={c.name}
                  productSlug={c.productSlug}
                  variantLabel={c.variantLabel}
                  description={c.description}
                  price={c.price}
                  cbdPercentage={c.cbdPercentage}
                  image={c.image}
                  variant="compact"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
