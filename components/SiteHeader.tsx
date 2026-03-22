import prisma from '@/lib/prisma';
import SiteHeaderClient from '@/components/SiteHeaderClient';
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

  return <SiteHeaderClient links={links} />;
}
