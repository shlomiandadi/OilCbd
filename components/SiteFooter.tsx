import Link from 'next/link';
import prisma from '@/lib/prisma';

export default async function SiteFooter() {
  const [footerLinks, disclaimer] = await Promise.all([
    prisma.siteNavLink.findMany({
      where: { section: 'footer' },
      orderBy: { sortOrder: 'asc' },
    }),
    prisma.siteSetting.findUnique({ where: { key: 'footer.disclaimer' } }),
  ]);

  return (
    <footer className="mt-auto border-t border-neutral-800 bg-neutral-950">
      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-amber-500">
              קישורים
            </h2>
            <nav className="flex flex-col gap-2 text-sm text-neutral-400" aria-label="פוטר">
              {footerLinks.map((l) => (
                <Link
                  key={l.id}
                  href={l.href}
                  className="hover:text-amber-500 transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="md:col-span-2 lg:col-span-2">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-amber-500">
              הצהרה
            </h2>
            <p className="text-sm leading-relaxed text-neutral-500">
              {disclaimer?.value ??
                'המידע באתר מיועד לידע כללי בלבד ואינו מהווה ייעוץ רפואי, משפטי או מקצועי. יש להתייעץ עם רופא לפני שימוש במוצרי CBD או קנאביס.'}
            </p>
          </div>
        </div>
        <p className="mt-10 border-t border-neutral-800 pt-8 text-center text-xs text-neutral-600">
          © {new Date().getFullYear()} OilCbd — שמני CBD וקנאביס איכותיים
        </p>
      </div>
    </footer>
  );
}
