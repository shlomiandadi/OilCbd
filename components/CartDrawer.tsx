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
      <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={closeCart}></div>
      <div className={`fixed top-0 left-0 h-full w-full sm:w-[400px] bg-neutral-950 border-r border-neutral-800 z-50 transform transition-transform duration-500 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center p-6 border-b border-neutral-800">
          <button onClick={closeCart} className="text-neutral-400 hover:text-amber-500 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          <h2 className="text-xl font-bold text-neutral-100 uppercase tracking-widest">העגלה שלך</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-neutral-500">
              <p>העגלה שלך ריקה כרגע.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 items-center bg-neutral-900/50 p-4 rounded-xl border border-neutral-800/50">
                <div className="relative w-16 h-16 bg-neutral-800 rounded-lg overflow-hidden flex-shrink-0">
                   <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="text-neutral-100 font-semibold text-sm">{item.name}</h4>
                  <p className="text-amber-500 font-medium">₪{item.price}</p>
                  <p className="text-neutral-500 text-xs">כמות: {item.quantity}</p>
                </div>
                <button onClick={() => removeItem(item.id)} className="text-neutral-500 hover:text-red-500 p-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <div className="p-6 bg-neutral-900 border-t border-neutral-800">
            <div className="flex justify-between items-center mb-6">
              <span className="text-neutral-400">סך הכל</span>
              <span className="text-2xl font-light text-amber-500">₪{totalPrice()}</span>
            </div>
            <Link href="/checkout" onClick={closeCart} className="block text-center w-full bg-amber-500 text-neutral-950 font-bold py-4 rounded-xl hover:bg-amber-400 transition-all">
              המשך לתשלום מאובטח
            </Link>
          </div>
        )}
      </div>
    </>
  );
}