import type { Metadata } from 'next'
import type { Listing } from '@/lib/supabase'
import ListingsClient from './ListingsClient'

export const metadata: Metadata = {
  title: 'Houses & Homes For Rent in Bakersfield CA | Browse Listings',
  description:
    'Browse available houses and homes for rent in Bakersfield, CA. Filter by bedrooms, bathrooms, price, and zip code. Single-family homes, pet-friendly rentals, and long-term leases in Kern County.',
  alternates: { canonical: 'https://bakersfieldrentalhomes.com/listings' },
  openGraph: {
    title: 'Houses & Homes For Rent in Bakersfield CA',
    description:
      'Browse available rental homes in Bakersfield, CA. Single-family homes, pet-friendly rentals, and long-term leases in Kern County.',
    url: 'https://bakersfieldrentalhomes.com/listings',
    siteName: 'Bakersfield Rental Homes',
    type: 'website',
  },
}

async function getListings(): Promise<Listing[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/listings?select=*&status=eq.active&order=created_at.desc`,
      {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
        },
        next: { revalidate: 60 },
      }
    )
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export default async function ListingsPage() {
  const listings = await getListings()
  return <ListingsClient initialListings={listings} />
}
