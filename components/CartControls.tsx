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
      className="relative rounded-full border border-brand-border bg-white px-4 py-2 text-sm font-medium text-brand-ink shadow-sm transition-colors hover:border-brand-leaf/50 hover:text-brand-leaf"
    >
      עגלה
      {itemCount > 0 && (
        <span className="absolute -left-2 -top-2 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-brand-leaf px-1 text-xs font-bold text-white shadow-sm">
          {itemCount}
        </span>
      )}
    </button>
  );
}
