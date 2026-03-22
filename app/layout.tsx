import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { getSiteUrl } from '@/lib/site';

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
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
