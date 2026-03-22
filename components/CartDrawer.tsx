'use client';

import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CartDrawer() {
  const { items, removeItem, totalPrice, isOpen, closeCart } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null;

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-brand-ink/30 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={closeCart}
        aria-hidden={!isOpen}
      />
      <div
        className={`fixed left-0 top-0 z-50 flex h-full w-full transform flex-col border-r border-brand-border bg-white shadow-2xl transition-transform duration-500 sm:w-[400px] ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-brand-border p-6">
          <button
            type="button"
            onClick={closeCart}
            className="text-brand-ink-muted transition-colors hover:text-brand-leaf"
            aria-label="סגור"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="text-xl font-bold uppercase tracking-widest text-brand-ink">
            העגלה שלך
          </h2>
        </div>
        <div className="flex-1 space-y-6 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-brand-ink-muted">
              <p>העגלה שלך ריקה כרגע.</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-xl border border-brand-border/80 bg-brand-cream/40 p-4"
              >
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-brand-muted">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-brand-ink">{item.name}</h4>
                  <p className="font-medium text-brand-leaf-dark">₪{item.price}</p>
                  <p className="text-xs text-brand-ink-muted">כמות: {item.quantity}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-brand-ink-muted hover:text-red-600"
                  aria-label="הסר"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <div className="border-t border-brand-border bg-brand-cream/30 p-6">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-brand-ink-muted">סך הכל</span>
              <span className="text-2xl font-semibold text-brand-leaf-dark">₪{totalPrice()}</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full rounded-xl bg-gradient-to-l from-brand-leaf to-brand-leaf-dark py-4 text-center font-bold text-white shadow-md shadow-brand-leaf/20 transition hover:brightness-105"
            >
              המשך לתשלום מאובטח
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
