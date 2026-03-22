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
}: ProductProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="group relative bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-500 flex flex-col h-full">
      <div className="absolute top-4 right-4 z-10 bg-neutral-950/80 backdrop-blur-sm border border-amber-500/30 text-amber-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
        {cbdPercentage > 0 ? `${cbdPercentage}% CBD` : 'CBD'}
      </div>
      <div className="relative h-64 w-full overflow-hidden bg-neutral-800">
        <Image src={image} alt={name} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out opacity-90 group-hover:opacity-100" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-neutral-100 mb-1">
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
        <p className="text-neutral-400 text-sm mb-6 flex-grow leading-relaxed">{description}</p>
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