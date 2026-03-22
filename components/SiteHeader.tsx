import Link from 'next/link';
import prisma from '@/lib/prisma';
import CartControls from '@/components/CartControls';
import { FALLBACK_HEADER_NAV } from '@/lib/site-nav-fallback';

export const runtime = 'nodejs';

export default async function SiteHeader() {
  let links = FALLBACK_HEADER_NAV;
  try {
    links = await prisma.siteNavLink.findMany({
      where: { section: 'header' },
      orderBy: { sortOrder: 'asc' },
    });
  } catch (e) {
    console.error('[SiteHeader] siteNavLink.findMany failed:', e);
  }

  return (
    <header className="sticky top-0 z-30 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-amber-500">
          OilCbd
        </Link>
        <nav
          className="flex flex-wrap items-center justify-end gap-4 text-sm md:gap-6"
          aria-label="ניווט ראשי"
        >
          {links.map((l) => (
            <Link
              key={l.id}
              href={l.href}
              className="text-neutral-400 transition-colors hover:text-amber-500"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/checkout"
            className="text-neutral-400 transition-colors hover:text-amber-500"
          >
            תשלום
          </Link>
          <CartControls />
        </nav>
      </div>
    </header>
  );
}
