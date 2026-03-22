import prisma from '@/lib/prisma';
import { buildNavTree } from '@/lib/nav-tree';
import { loadSiteText, SITE_TEXT_DEFAULTS } from '@/lib/site-text';
import SiteHeaderClient, { type HeaderLabels } from '@/components/SiteHeaderClient';
import { FALLBACK_HEADER_TREE } from '@/lib/site-nav-fallback';

export const runtime = 'nodejs';

const HEADER_KEYS = [
  'site.brand.initials',
  'site.brand.name',
  'header.cta.catalog',
  'header.cta.catalogHref',
  'header.cta.checkout',
  'header.cta.checkoutHref',
  'header.mobile.menuTitle',
  'header.mobile.catalogCta',
] as const;

export default async function SiteHeader() {
  let navTree = FALLBACK_HEADER_TREE;
  try {
    const rows = await prisma.siteNavLink.findMany({
      where: { section: 'header' },
      orderBy: [{ sortOrder: 'asc' }],
      select: {
        id: true,
        label: true,
        href: true,
        parentId: true,
        sortOrder: true,
      },
    });
    navTree = buildNavTree(rows);
  } catch (e) {
    console.error('[SiteHeader] siteNavLink.findMany failed:', e);
  }

  const t = await loadSiteText(prisma, [...HEADER_KEYS]);
  const labels: HeaderLabels = {
    brandInitials: t['site.brand.initials'] ?? SITE_TEXT_DEFAULTS['site.brand.initials'],
    brandName: t['site.brand.name'] ?? SITE_TEXT_DEFAULTS['site.brand.name'],
    ctaCatalog: t['header.cta.catalog'] ?? SITE_TEXT_DEFAULTS['header.cta.catalog'],
    ctaCatalogHref: t['header.cta.catalogHref'] ?? SITE_TEXT_DEFAULTS['header.cta.catalogHref'],
    ctaCheckout: t['header.cta.checkout'] ?? SITE_TEXT_DEFAULTS['header.cta.checkout'],
    ctaCheckoutHref: t['header.cta.checkoutHref'] ?? SITE_TEXT_DEFAULTS['header.cta.checkoutHref'],
    mobileMenuTitle: t['header.mobile.menuTitle'] ?? SITE_TEXT_DEFAULTS['header.mobile.menuTitle'],
    mobileCatalogCta:
      t['header.mobile.catalogCta'] ?? SITE_TEXT_DEFAULTS['header.mobile.catalogCta'],
  };

  return <SiteHeaderClient navTree={navTree} labels={labels} />;
}
