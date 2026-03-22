'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import CartControls from '@/components/CartControls';

export type HeaderNavLink = { id: string; label: string; href: string };

type Props = { links: HeaderNavLink[] };

export default function SiteHeaderClient({ links }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onResize = () => {
      if (window.matchMedia('(min-width: 768px)').matches) setOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-amber-500/10 bg-neutral-950/85 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2"
            onClick={() => setOpen(false)}
          >
            <span
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-700 text-sm font-black text-neutral-950 shadow-lg shadow-amber-500/20"
              aria-hidden
            >
              OC
            </span>
            <span className="text-lg font-bold tracking-tight text-neutral-50 transition group-hover:text-amber-400 sm:text-xl">
              OilCbd
            </span>
          </Link>

          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="ניווט ראשי"
          >
            {links.map((l) => (
              <Link
                key={l.id}
                href={l.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-300 transition hover:bg-neutral-800/80 hover:text-amber-400"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/checkout"
              className="mr-2 rounded-lg px-3 py-2 text-sm font-medium text-neutral-300 transition hover:bg-neutral-800/80 hover:text-amber-400"
            >
              תשלום
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/#catalog"
              className="hidden rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-400 transition hover:border-amber-400 hover:bg-amber-500/20 lg:inline-flex"
            >
              לקטלוג
            </Link>
            <Link
              href="/checkout"
              className="hidden rounded-full bg-gradient-to-l from-amber-500 to-amber-600 px-4 py-2 text-sm font-bold text-neutral-950 shadow-md shadow-amber-500/25 transition hover:brightness-110 sm:inline-flex"
            >
              סיום הזמנה
            </Link>
            <CartControls />
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-700 bg-neutral-900/80 text-neutral-200 md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">תפריט</span>
              {open ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-nav"
        className={`fixed inset-0 z-30 bg-black/60 backdrop-blur-sm transition-opacity md:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      />
      <div
        className={`fixed inset-y-0 right-0 z-40 flex w-[min(100vw-3rem,20rem)] flex-col border-l border-neutral-800 bg-neutral-950 shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="border-b border-neutral-800 px-5 py-4">
          <p className="text-xs font-medium uppercase tracking-widest text-amber-500/90">
            תפריט
          </p>
        </div>
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4" aria-label="ניווט מובייל">
          {links.map((l) => (
            <Link
              key={l.id}
              href={l.href}
              className="rounded-xl px-4 py-3 text-base font-medium text-neutral-200 hover:bg-neutral-800"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/checkout"
            className="rounded-xl px-4 py-3 text-base font-medium text-neutral-200 hover:bg-neutral-800"
            onClick={() => setOpen(false)}
          >
            תשלום
          </Link>
          <Link
            href="/#catalog"
            className="mt-2 rounded-xl bg-amber-500/15 px-4 py-3 text-center text-base font-bold text-amber-400"
            onClick={() => setOpen(false)}
          >
            לקטלוג המוצרים
          </Link>
        </nav>
      </div>
    </>
  );
}
