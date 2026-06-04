import type { Metadata } from 'next'
import type { Listing } from '@/lib/supabase'
import ListingsClient from './ListingsClient'

export const metadata: Metadata = {
  title: 'Homes For Rent in Bakersfield, CA',
  description:
    'Browse houses and homes for rent in Bakersfield, CA. Filter by beds, baths, price, and zip. Single-family, pet-friendly, and long-term rentals in Kern County.',
  alternates: { canonical: 'https://bakersfieldrentalhomes.com/listings' },
  openGraph: {
    title: 'Homes For Rent in Bakersfield, CA',
    description:
      'Browse houses and homes for rent in Bakersfield, CA. Single-family, pet-friendly, and long-term rentals in Kern County.',
    url: 'https://bakersfieldrentalhomes.com/listings',
    siteName: 'Bakersfield Rental Homes',
    type: 'website',
    images: [
      {
        url: 'https://bakersfieldrentalhomes.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Browse rental homes in Bakersfield, CA',
      },
    ],
  },
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

async function getListings(): Promise<Listing[]> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/listings?select=*&status=eq.active&city=eq.Bakersfield&order=created_at.desc`,
      {
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
        next: { revalidate: 3600 },
      }
    )
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

async function getLAListings(): Promise<Listing[]> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/listings?select=*&status=eq.active&city=eq.Los Angeles&order=created_at.desc`,
      {
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
        next: { revalidate: 3600 },
      }
    )
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export default async function ListingsPage() {
  const [listings, laListings] = await Promise.all([getListings(), getLAListings()])
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
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <ListingsClient initialListings={listings} laListings={laListings} />
    </>
  )
}
