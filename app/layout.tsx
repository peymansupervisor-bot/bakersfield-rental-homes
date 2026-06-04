import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import ConditionalLayout from '@/components/ConditionalLayout'
import ChatWidget from '@/components/ChatWidget'
import { Analytics } from '@vercel/analytics/react'

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
  description: 'Find houses and homes for rent in Bakersfield, CA. Quality single-family rentals, pet-friendly homes, and long-term leases in Kern County.',
  robots: { index: true, follow: true },
  verification: { google: 'qHesuDsAQNBfL8wULF0DGs-LNlNpAbQ2rrxfg53PDS8' },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website', locale: 'en_US', url: SITE_URL,
    siteName: 'Bakersfield Rental Homes',
    title: 'Bakersfield Rental Homes | Houses & Homes For Rent in Bakersfield CA',
    description: 'Find houses and homes for rent in Bakersfield, CA. Quality single-family rentals, pet-friendly homes, and long-term leases throughout Kern County. Trusted local property management.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Bakersfield Rental Homes — Houses & Homes For Rent in Bakersfield CA' }],
  },
  twitter: { card: 'summary_large_image', images: ['/opengraph-image'] },
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
  sameAs: ['https://www.facebook.com/bakersfieldrentalhomes/'],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I find houses for rent in Bakersfield, CA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Browse our listings at bakersfieldrentalhomes.com/listings and filter by bedrooms, zip code, school district, and pet policy. All properties are managed directly by local landlords.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there pet-friendly rentals in Bakersfield?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Many of our Bakersfield rental homes are pet-friendly, including properties with fenced yards. Use the Pets Allowed filter on the listings page to find pet-friendly homes.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I list my rental property in Bakersfield?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Landlords can list their Bakersfield rental home at bakersfieldrentalhomes.com/list. The process takes a few minutes and connects you directly with qualified local tenants.',
      },
    },
    {
      '@type': 'Question',
      name: 'What school districts are near rental homes in Bakersfield?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our listings cover homes in several Bakersfield school districts including Panama-Buena Vista, Bakersfield City, Kern High, Fruitvale, Rosedale Union, and Norris. You can filter by district on the listings page.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much is rent in Bakersfield CA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'As of 2026, average rent in Bakersfield CA ranges from $1,200–$1,500/month for a 2-bedroom home and $1,500–$2,000/month for a 3-bedroom single-family home, making it one of the more affordable cities in California. Browse current listings at bakersfieldrentalhomes.com/listings for up-to-date pricing.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the best neighborhoods in Bakersfield for renters?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Popular neighborhoods for renters in Bakersfield include Northwest Bakersfield (family-friendly, top-rated schools), Rosedale (quiet suburban feel), Oleander-Sunset (central, walkable), and East Bakersfield (most affordable). Use our listings page to filter by zip code and find homes in your preferred area.',
      },
    },
    {
      '@type': 'Question',
      name: 'What credit score is needed to rent in Bakersfield?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most Bakersfield landlords look for a credit score of 620 or higher, though requirements vary by property. Some owners listed on Bakersfield Rental Homes work directly with tenants and may consider income, rental history, and references alongside credit score.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the rental application requirements in Bakersfield CA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Typical rental application requirements in Bakersfield include a valid photo ID, proof of income (pay stubs or bank statements), credit check, rental history or references, and a completed application form. Requirements vary by landlord — contact the property owner directly through our listings for specifics.',
      },
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <ConditionalLayout>{children}</ConditionalLayout>
        <ChatWidget />
        <Analytics />
      </body>
    </html>
  )
}
