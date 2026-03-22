import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import CartDrawer from '@/components/CartDrawer';
import { getSiteUrl } from '@/lib/site';

/** הדר/פוטר נטענים ממסד — לא לפרה-רנדר סטטי בלי DB */
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: 'OilCbd - שמן קנאביס פרימיום',
    template: '%s | OilCbd',
  },
  description:
    'שמני CBD ומוצרי קנאביס איכותיים — משלוח דיסקרטי בישראל. בחרו מוצר, וריאציה ותשלום מאובטח.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'he_IL',
    siteName: 'OilCbd',
    title: 'OilCbd - שמן קנאביס פרימיום',
    description:
      'שמני CBD ומוצרי קנאביס איכותיים — משלוח דיסקרטי בישראל.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body className="flex min-h-screen flex-col bg-neutral-950 text-neutral-50">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
        <CartDrawer />
      </body>
    </html>
  );
}
