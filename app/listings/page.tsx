import type { Metadata } from 'next'
import type { Listing } from '@/lib/supabase'
import ListingsClient from './ListingsClient'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Houses for Rent in Bakersfield CA | Browse Listings — No Broker Fees',
  description:
    'Browse houses and homes for rent in Bakersfield, CA — posted directly by local landlords. No broker fees. Filter by beds, price, ZIP, and pet policy. Single-family homes in every Bakersfield neighborhood.',
  keywords: [
    'houses for rent Bakersfield CA',
    'homes for rent Bakersfield California',
    'Kern County rentals',
    'pet-friendly rentals Bakersfield',
    'single family homes for rent Bakersfield',
    'direct landlord rentals Bakersfield CA',
    'no broker fee rentals Bakersfield',
    'long term rentals Bakersfield CA',
    'rent from owner Bakersfield',
    'Bakersfield rental homes',
    'horse property for rent Bakersfield CA',
    'horse property rental Kern County',
    'equestrian rental Bakersfield',
  ],
  alternates: { canonical: 'https://bakersfieldrentalhomes.com/listings' },
  openGraph: {
    title: 'Houses for Rent in Bakersfield CA | No Broker Fees',
    description:
      'Browse houses for rent in Bakersfield, CA — posted directly by local landlords. No broker fees. Filter by beds, price, ZIP, and pet policy.',
    url: 'https://bakersfieldrentalhomes.com/listings',
    siteName: 'Bakersfield Rental Homes',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Browse rental homes in Bakersfield, CA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Houses for Rent in Bakersfield CA | No Broker Fees',
    description: 'Browse houses for rent in Bakersfield, CA — direct from owners. No broker fees. Filter by beds, price, ZIP, and pet policy.',
    images: ['/opengraph-image'],
  },
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

async function getListings(): Promise<Listing[]> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/listings?select=*&status=eq.active&city=eq.Bakersfield&order=featured.desc,created_at.desc`,
      {
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
        next: { revalidate: 60 },
      }
    )
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Bakersfield Rental Homes',
  url: 'https://bakersfieldrentalhomes.com',
  logo: 'https://bakersfieldrentalhomes.com/favicon.svg',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bakersfield',
    addressRegion: 'CA',
    addressCountry: 'US',
  },
  areaServed: [
    { '@type': 'City', name: 'Bakersfield', containedInPlace: { '@type': 'State', name: 'California' } },
  ],
  description: 'Direct landlord rentals in Bakersfield, CA. No broker fees, no middlemen.',
  sameAs: ['https://bakersfieldrentalhomes.com/listings'],
}

export default async function ListingsPage() {
  const listings = await getListings()
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Rental Homes in Bakersfield, CA',
    url: 'https://bakersfieldrentalhomes.com/listings',
    numberOfItems: listings.length,
    itemListElement: listings.map((l, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://bakersfieldrentalhomes.com/listings/${l.slug ?? l.id}`,
      name: l.title,
    })),
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bakersfieldrentalhomes.com' },
      { '@type': 'ListItem', position: 2, name: 'Listings', item: 'https://bakersfieldrentalhomes.com/listings' },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ListingsClient initialListings={listings} />
    </>
  )
}
