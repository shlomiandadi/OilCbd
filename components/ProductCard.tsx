'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';

interface ProductProps {
  id: string;
  name: string;
  description: string;
  price: number;
  cbdPercentage: number;
  image: string;
  variantLabel?: string;
  productSlug?: string;
  variant?: 'default' | 'compact';
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  cbdPercentage,
  image,
  variantLabel,
  productSlug,
  variant = 'default',
}: ProductProps) {
  const addItem = useCartStore((state) => state.addItem);
  const compact = variant === 'compact';

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-brand-border bg-white shadow-brand-soft transition-all duration-300 hover:border-brand-leaf/40 hover:shadow-lg">
      <div className="absolute right-4 top-4 z-10 rounded-full border border-brand-leaf/25 bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-leaf-dark shadow-sm backdrop-blur-sm">
        {cbdPercentage > 0 ? `${cbdPercentage}% CBD` : 'CBD'}
      </div>
      <div
        className={`relative w-full overflow-hidden bg-brand-muted/50 ${compact ? 'h-48' : 'h-64'}`}
      >
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover opacity-95 transition duration-700 ease-in-out group-hover:scale-105 group-hover:opacity-100"
        />
      </div>
      <div className="flex flex-grow flex-col p-5 sm:p-6">
        <h3 className="mb-1 text-lg font-bold text-brand-ink sm:text-xl">
          {productSlug ? (
            <Link
              href={`/products/${productSlug}`}
              className="transition-colors hover:text-brand-leaf"
            >
              {name}
            </Link>
          ) : (
            name
          )}
        </h3>
        {variantLabel ? (
          <p className="mb-2 text-sm font-medium text-brand-leaf">{variantLabel}</p>
        ) : null}
        <p
          className={`mb-4 flex-grow text-sm leading-relaxed text-brand-ink-muted ${compact ? 'line-clamp-3' : ''}`}
        >
          {description}
        </p>
        <div className="mt-auto flex items-center justify-between border-t border-brand-border/80 pt-4">
          <span className="text-2xl font-semibold text-brand-leaf-dark">₪{price}</span>
          <button
            onClick={() => addItem({ id, name, price, quantity: 1, image })}
            className="rounded-full border border-brand-leaf/40 bg-brand-cream px-5 py-2 text-sm font-semibold text-brand-leaf-dark transition duration-300 hover:bg-brand-leaf hover:text-white"
          >
            הוסף לעגלה
          </button>
        </div>
      </div>
    </div>
  );
}
