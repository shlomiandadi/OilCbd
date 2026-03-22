'use client';

import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';

export default function Header() {
  const openCart = useCartStore((s) => s.openCart);
  const itemCount = useCartStore((s) =>
    s.items.reduce((n, i) => n + i.quantity, 0)
  );

  return (
    <header className="sticky top-0 z-30 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-amber-500">
          OilCbd
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/checkout"
            className="text-sm text-neutral-400 transition-colors hover:text-amber-500"
          >
            תשלום
          </Link>
          <button
            type="button"
            onClick={openCart}
            className="relative rounded-full border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm font-medium text-neutral-200 transition-colors hover:border-amber-500/50"
          >
            עגלה
            {itemCount > 0 && (
              <span className="absolute -left-2 -top-2 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-amber-500 px-1 text-xs font-bold text-neutral-950">
                {itemCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
