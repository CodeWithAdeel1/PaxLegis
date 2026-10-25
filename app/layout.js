import './globals.css';
import { Manrope, Source_Serif_4 } from 'next/font/google';
import { SITE } from '../lib/site';
import PublicSiteShell from '../components/PublicSiteShell';

const manrope = Manrope({ subsets: ['latin'], display: 'swap', variable: '--font-body' });
const sourceSerif = Source_Serif_4({ subsets: ['latin'], display: 'swap', variable: '--font-heading' });

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: 'Lawyers in Pakistan | PaxLegis', template: `%s | ${SITE.short}` },
  description: 'Practical legal guidance for family, criminal, civil, tax and other matters in Pakistan. Remote consultations may be available for overseas clients.',
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: 'en_PK',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'PaxLegis Advocates & Legal Consultants' }],
  },
  twitter: { card: 'summary_large_image', images: ['/opengraph-image'] },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.webmanifest',
  robots: { index: true, follow: true },
};

export const viewport = { themeColor: '#0f2e2a' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${sourceSerif.variable}`}>
        <PublicSiteShell>{children}</PublicSiteShell>
      </body>
    </html>
  );
}
