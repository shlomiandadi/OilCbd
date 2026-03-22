'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import CartControls from '@/components/CartControls';
import type { NavNode } from '@/lib/nav-tree';

export type HeaderLabels = {
  brandInitials: string;
  brandName: string;
  ctaCatalog: string;
  ctaCatalogHref: string;
  ctaCheckout: string;
  ctaCheckoutHref: string;
  mobileMenuTitle: string;
  mobileCatalogCta: string;
};

type Props = { navTree: NavNode[]; labels: HeaderLabels };

function DesktopItem({ node }: { node: NavNode }) {
  if (node.children.length === 0) {
    return (
      <Link
        href={node.href}
        className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-300 transition hover:bg-neutral-800/80 hover:text-amber-400"
      >
        {node.label}
      </Link>
    );
  }

  return (
    <div className="group relative">
      <Link
        href={node.href}
        className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-neutral-300 transition hover:bg-neutral-800/80 hover:text-amber-400"
      >
        {node.label}
        <span className="text-[10px] opacity-70" aria-hidden>
          ▾
        </span>
      </Link>
      <div
        className="invisible absolute right-0 top-full z-50 mt-1 max-h-[min(70vh,28rem)] w-[min(100vw-2rem,20rem)] overflow-y-auto rounded-xl border border-neutral-700 bg-neutral-950/98 py-2 opacity-0 shadow-2xl backdrop-blur-md transition group-hover:visible group-hover:opacity-100"
        role="menu"
      >
        <Link
          href={node.href}
          className="block px-4 py-2.5 text-sm font-semibold text-amber-400 hover:bg-neutral-800/80"
          role="menuitem"
        >
          עמוד מוקד: {node.label}
        </Link>
        <div className="my-1 border-t border-neutral-800" />
        {node.children.map((c) => (
          <Link
            key={c.id}
            href={c.href}
            className="block px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800/80 hover:text-amber-400"
            role="menuitem"
          >
            {c.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function SiteHeaderClient({ navTree, labels }: Props) {
  const [open, setOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<Set<string>>(new Set());

  const toggleMobile = useCallback((id: string) => {
    setExpandedMobile((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const {
    brandInitials,
    brandName,
    ctaCatalog,
    ctaCatalogHref,
    ctaCheckout,
    ctaCheckoutHref,
    mobileMenuTitle,
    mobileCatalogCta,
  } = labels;

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

  const renderMobile = (nodes: NavNode[], depth = 0) =>
    nodes.map((node) => (
      <div key={node.id} className={depth > 0 ? 'mr-2 border-r border-neutral-800 pr-2' : ''}>
        {node.children.length === 0 ? (
          <Link
            href={node.href}
            className="block rounded-xl px-4 py-3 text-base font-medium text-neutral-200 hover:bg-neutral-800"
            onClick={() => setOpen(false)}
          >
            {node.label}
          </Link>
        ) : (
          <>
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-neutral-200 hover:bg-neutral-800"
              aria-expanded={expandedMobile.has(node.id)}
              onClick={() => toggleMobile(node.id)}
            >
              {node.label}
              <span className="text-xs text-neutral-500">{expandedMobile.has(node.id) ? '▴' : '▾'}</span>
            </button>
            {expandedMobile.has(node.id) ? (
              <div className="mt-1 space-y-1">
                <Link
                  href={node.href}
                  className="block rounded-lg px-4 py-2 text-sm font-semibold text-amber-500/90 hover:bg-neutral-800/80"
                  onClick={() => setOpen(false)}
                >
                  עמוד מוקד: {node.label}
                </Link>
                {renderMobile(node.children, depth + 1)}
              </div>
            ) : null}
          </>
        )}
      </div>
    ));

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
              {brandInitials.slice(0, 3)}
            </span>
            <span className="text-lg font-bold tracking-tight text-neutral-50 transition group-hover:text-amber-400 sm:text-xl">
              {brandName}
            </span>
          </Link>

          <nav
            className="hidden flex-wrap items-center justify-center gap-0.5 md:flex lg:gap-1"
            aria-label="ניווט ראשי"
          >
            {navTree.map((node) => (
              <DesktopItem key={node.id} node={node} />
            ))}
            <Link
              href={ctaCheckoutHref}
              className="mr-1 rounded-lg px-3 py-2 text-sm font-medium text-neutral-300 transition hover:bg-neutral-800/80 hover:text-amber-400"
            >
              {ctaCheckout}
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href={ctaCatalogHref}
              className="hidden rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-400 transition hover:border-amber-400 hover:bg-amber-500/20 lg:inline-flex"
            >
              {ctaCatalog}
            </Link>
            <Link
              href={ctaCheckoutHref}
              className="hidden rounded-full bg-gradient-to-l from-amber-500 to-amber-600 px-4 py-2 text-sm font-bold text-neutral-950 shadow-md shadow-amber-500/25 transition hover:brightness-110 sm:inline-flex"
            >
              {ctaCheckout}
            </Link>
            <CartControls />
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-700 bg-neutral-900/80 text-neutral-200 md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">{mobileMenuTitle}</span>
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
        className={`fixed inset-y-0 right-0 z-40 flex w-[min(100vw-2rem,22rem)] flex-col border-l border-neutral-800 bg-neutral-950 shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="border-b border-neutral-800 px-5 py-4">
          <p className="text-xs font-medium uppercase tracking-widest text-amber-500/90">
            {mobileMenuTitle}
          </p>
        </div>
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4" aria-label="ניווט מובייל">
          {renderMobile(navTree)}
          <Link
            href={ctaCheckoutHref}
            className="rounded-xl px-4 py-3 text-base font-medium text-neutral-200 hover:bg-neutral-800"
            onClick={() => setOpen(false)}
          >
            {ctaCheckout}
          </Link>
          <Link
            href={ctaCatalogHref}
            className="mt-2 rounded-xl bg-amber-500/15 px-4 py-3 text-center text-base font-bold text-amber-400"
            onClick={() => setOpen(false)}
          >
            {mobileCatalogCta}
          </Link>
        </nav>
      </div>
    </>
  );
}
