import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import ConditionalLayout from '@/components/ConditionalLayout'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const SITE_URL = 'https://bakersfieldrentalhomes.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Bakersfield Rental Homes | Houses & Homes For Rent in Bakersfield CA',
    template: '%s | Bakersfield Rental Homes',
  },
  description: 'Find houses and homes for rent in Bakersfield, CA. Bakersfield Rental Homes offers quality single-family rentals, short-term rentals, and long-term leases in Kern County. Browse available properties now.',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website', locale: 'en_US', url: SITE_URL,
    siteName: 'Bakersfield Rental Homes',
    title: 'Bakersfield Rental Homes | Houses & Homes For Rent in Bakersfield CA',
    description: 'Find quality houses and homes for rent in Bakersfield, CA.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Bakersfield Rental Homes' }],
  },
  twitter: { card: 'summary_large_image', images: ['/og-image.jpg'] },
  alternates: { canonical: SITE_URL },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Bakersfield Rental Homes',
  url: 'https://bakersfieldrentalhomes.com',
  logo: 'https://bakersfieldrentalhomes.com/og-image.jpg',
  image: 'https://bakersfieldrentalhomes.com/og-image.jpg',
  description: 'Find quality houses and homes for rent in Bakersfield, CA. Single-family rentals, pet-friendly homes, and long-term leases in Kern County.',
  telephone: '+16613811818',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bakersfield',
    addressRegion: 'CA',
    postalCode: '93301',
    addressCountry: 'US',
  },
  areaServed: {
    '@type': 'City',
    name: 'Bakersfield',
  },
  sameAs: [],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://uosxqpoxpzrqfazphhhd.supabase.co" />
        <link rel="dns-prefetch" href="https://uosxqpoxpzrqfazphhhd.supabase.co" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  )
}
