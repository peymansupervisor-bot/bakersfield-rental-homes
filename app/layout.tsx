import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// Self-hosted via next/font — no external Google Fonts round trip
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
  description:
    'Find houses and homes for rent in Bakersfield, CA. Bakersfield Rental Homes offers quality single-family rentals, short-term rentals, and long-term leases in Kern County. Browse available properties now.',
  keywords: [
    'homes for rent in Bakersfield',
    'houses for rent in Bakersfield CA',
    'Bakersfield rental homes',
    'Bakersfield rentals',
    'rent a house Bakersfield',
    'Bakersfield CA short term rental',
    'short term rental Bakersfield',
    'Bakersfield rental property',
    'rental homes Bakersfield California',
    'Bakersfield homes for lease',
    'single family homes for rent Bakersfield',
    'Kern County rentals',
    'Bakersfield property management',
    'houses for rent Bakersfield 93301',
    'houses for rent Bakersfield 93309',
    'pet friendly rentals Bakersfield',
    'affordable homes for rent Bakersfield',
    'Bakersfield real estate rentals',
    'long term rentals Bakersfield CA',
    'Bakersfield residential rentals',
  ],
  authors: [{ name: 'Bakersfield Rental Homes', url: SITE_URL }],
  creator: 'Bakersfield Rental Homes',
  publisher: 'Bakersfield Rental Homes',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Bakersfield Rental Homes',
    title: 'Bakersfield Rental Homes | Houses & Homes For Rent in Bakersfield CA',
    description:
      'Find quality houses and homes for rent in Bakersfield, CA. Short-term and long-term rentals available in Kern County. Pet-friendly options. Browse listings now.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Bakersfield Rental Homes – Houses for Rent in Bakersfield CA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bakersfield Rental Homes | Houses For Rent in Bakersfield CA',
    description:
      'Quality homes for rent in Bakersfield, CA. Short-term & long-term rentals in Kern County. Pet-friendly options available.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: 'real estate',
  other: {
    'geo.region': 'US-CA',
    'geo.placename': 'Bakersfield',
    'geo.position': '35.3733;-119.0187',
    'ICBM': '35.3733, -119.0187',
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'RealEstateAgent'],
  name: 'Bakersfield Rental Homes',
  description: 'Bakersfield Rental Homes offers quality houses and homes for rent in Bakersfield, CA.',
  url: SITE_URL,
  telephone: '+1-661-381-1818',
  email: 'info@bakersfieldrentalhomes.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bakersfield',
    addressRegion: 'CA',
    postalCode: '93301',
    addressCountry: 'US',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 35.3733, longitude: -119.0187 },
  areaServed: [
    { '@type': 'City', name: 'Bakersfield', sameAs: 'https://www.wikidata.org/wiki/Q488134' },
    { '@type': 'AdministrativeArea', name: 'Kern County' },
  ],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '17:00',
  },
  image: `${SITE_URL}/og-image.jpg`,
  priceRange: '$$',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Are there houses for rent in Bakersfield CA?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Bakersfield Rental Homes offers single-family homes for rent throughout Bakersfield and Kern County, CA.' } },
    { '@type': 'Question', name: 'Does Bakersfield Rental Homes offer short-term rentals?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We offer both short-term and long-term rental options in Bakersfield, CA. Contact us at (661) 381-1818.' } },
    { '@type': 'Question', name: 'Are pet-friendly rental homes available in Bakersfield?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Many of our rental homes in Bakersfield are pet-friendly.' } },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://uosxqpoxpzrqfazphhhd.supabase.co" />
        <link rel="dns-prefetch" href="https://uosxqpoxpzrqfazphhhd.supabase.co" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
