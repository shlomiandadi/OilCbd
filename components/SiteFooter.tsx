import Link from 'next/link';
import prisma from '@/lib/prisma';
import { loadSiteText, SITE_TEXT_DEFAULTS } from '@/lib/site-text';
import {
  FALLBACK_FOOTER_DISCLAIMER,
  FALLBACK_FOOTER_NAV,
} from '@/lib/site-nav-fallback';

export const runtime = 'nodejs';

const FOOTER_KEYS = [
  'footer.column.links',
  'footer.column.statement',
  'footer.copyright',
  'footer.disclaimer',
  'site.brand.name',
] as const;

export default async function SiteFooter() {
  let footerLinks = FALLBACK_FOOTER_NAV;

  try {
    footerLinks = await prisma.siteNavLink.findMany({
      where: { section: 'footer' },
      orderBy: { sortOrder: 'asc' },
    });
  } catch (e) {
    console.error('[SiteFooter] siteNavLink.findMany failed:', e);
  }

  const t = await loadSiteText(prisma, [...FOOTER_KEYS]);
  const linksTitle = t['footer.column.links'] ?? SITE_TEXT_DEFAULTS['footer.column.links'];
  const statementTitle =
    t['footer.column.statement'] ?? SITE_TEXT_DEFAULTS['footer.column.statement'];
  const brandName = t['site.brand.name'] ?? SITE_TEXT_DEFAULTS['site.brand.name'];
  const year = new Date().getFullYear();
  const copyrightLine = (t['footer.copyright'] ?? SITE_TEXT_DEFAULTS['footer.copyright'])
    .replace(/__YEAR__/g, String(year))
    .replace(/__BRAND__/g, brandName);
  const disclaimerText =
    t['footer.disclaimer'] ?? FALLBACK_FOOTER_DISCLAIMER;

  return (
    <footer className="mt-auto border-t border-emerald-950/15 bg-gradient-to-b from-emerald-950 to-[#0f2415] text-emerald-50">
      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-emerald-300/90">
              {linksTitle}
            </h2>
            <nav className="flex flex-col gap-2 text-sm text-emerald-100/80" aria-label="פוטר">
              {footerLinks.map((l) => (
                <Link
                  key={l.id}
                  href={l.href}
                  className="transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="md:col-span-2 lg:col-span-2">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-emerald-300/90">
              {statementTitle}
            </h2>
            <p className="text-sm leading-relaxed text-emerald-100/70">{disclaimerText}</p>
          </div>
        </div>
        <p className="mt-10 border-t border-emerald-800/40 pt-8 text-center text-xs text-emerald-200/50">
          {copyrightLine}
        </p>
      </div>
    </footer>
  );
}
