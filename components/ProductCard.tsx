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
  /** תווית וריאציה (נפח / ריכוז) — מוצגת מתחת לשם */
  variantLabel?: string;
  /** קישור לדף מוצר (SEO) */
  productSlug?: string;
  /** קומפקטי לסליידר */
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
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 transition-all duration-500 hover:border-amber-500/50">
      <div className="absolute right-4 top-4 z-10 rounded-full border border-amber-500/30 bg-neutral-950/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-500 backdrop-blur-sm">
        {cbdPercentage > 0 ? `${cbdPercentage}% CBD` : 'CBD'}
      </div>
      <div
        className={`relative w-full overflow-hidden bg-neutral-800 ${compact ? 'h-48' : 'h-64'}`}
      >
        <Image src={image} alt={name} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out opacity-90 group-hover:opacity-100" />
      </div>
      <div className="flex flex-grow flex-col p-5 sm:p-6">
        <h3 className="mb-1 text-lg font-bold text-neutral-100 sm:text-xl">
          {productSlug ? (
            <Link
              href={`/products/${productSlug}`}
              className="hover:text-amber-400 transition-colors"
            >
              {name}
            </Link>
          ) : (
            name
          )}
        </h3>
        {variantLabel ? (
          <p className="mb-2 text-sm font-medium text-amber-500/90">{variantLabel}</p>
        ) : null}
        <p
          className={`mb-4 flex-grow text-sm leading-relaxed text-neutral-400 ${compact ? 'line-clamp-3' : ''}`}
        >
          {description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-800">
          <span className="text-2xl font-light text-amber-500">₪{price}</span>
          <button onClick={() => addItem({ id, name, price, quantity: 1, image })} className="text-sm font-semibold bg-transparent border border-neutral-600 text-neutral-300 hover:bg-amber-500 hover:text-neutral-950 hover:border-amber-500 px-5 py-2 rounded-full transition-all duration-300">
            הוסף לעגלה
          </button>
        </div>
      </div>
    </div>
  );
}