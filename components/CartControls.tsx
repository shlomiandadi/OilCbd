'use client';

import { useCartStore } from '@/store/cartStore';

export default function CartControls() {
  const openCart = useCartStore((s) => s.openCart);
  const itemCount = useCartStore((s) =>
    s.items.reduce((n, i) => n + i.quantity, 0)
  );

  return (
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
  );
}
