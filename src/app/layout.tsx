import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '@/styles/global.css';
import '@/styles/pages.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import NewsBar from '@/components/NewsBar';
import PageTransition from '@/components/PageTransition';
import JsonLd from '@/components/JsonLd';
import { iskola } from '@/data/iskola';
import { SITE_URL, abs } from '@/lib/util';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${iskola.nev} – Köszöntjük weblapunkon`, template: `%s – ${iskola.nev}` },
  description: 'A Zsirai Általános Iskola hivatalos honlapja – hírek, tanév rendje, dokumentumok, elérhetőségek.',
  authors: [{ name: iskola.nev }],
  manifest: '/manifest.webmanifest',
  icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }, { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' }], apple: '/icons/apple-touch-icon.png' },
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
  openGraph: { type: 'website', locale: 'hu_HU', siteName: iskola.nev, images: ['/images/dc9fb91b_iskolakep.webp'] },
  twitter: { card: 'summary_large_image' },
  other: { 'geo.region': 'HU-GS', 'geo.placename': 'Zsira', 'format-detection': 'telephone=yes' },
};

export const viewport: Viewport = { themeColor: '#1f6b3a', colorScheme: 'light', viewportFit: 'cover' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="hu" className="lenis">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
        <JsonLd data={{
          '@context': 'https://schema.org', '@type': 'School', '@id': `${SITE_URL}/#school`, name: iskola.nev, telephone: '+36 99 543015',
          address: { '@type': 'PostalAddress', streetAddress: 'Fő utca 37.', postalCode: '9476', addressLocality: 'Zsira', addressCountry: 'HU' },
          url: `${SITE_URL}/`, logo: abs('/icons/icon-512.png'), image: abs('/images/dc9fb91b_iskolakep.webp'),
        }} />
        <JsonLd data={{ '@context': 'https://schema.org', '@type': 'WebSite', name: iskola.nev, url: `${SITE_URL}/`, inLanguage: 'hu' }} />
      </head>
      <body>
        <a className="skip-link" href="#main">Ugrás a tartalomra</a>
        <Header />
        <NewsBar />
        <main id="main"><PageTransition>{children}</PageTransition></main>
        <Footer />
        <SmoothScroll />
      </body>
    </html>
  );
}
