// Server Component — fetches listing at request time.
// The full page HTML (title, price, description, photos) is sent to the browser
// already populated — no client-side loading spinner on first visit.
import { notFound } from 'next/navigation'
import type { Listing } from '@/lib/supabase'
import ListingDetailClient from './ListingDetailClient'

async function getListing(id: string): Promise<Listing | null> {
  try {
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/listings?id=eq.${id}&select=*&limit=1`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
        next: { revalidate: 60 },
      }
    )
    if (!res.ok) return null
    const rows: Listing[] = await res.json()
    return rows[0] ?? null
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const listing = await getListing(params.id)
  if (!listing) return { title: 'Listing Not Found' }
  const description = listing.description?.slice(0, 160) ??
    `${listing.bedrooms} bed, ${listing.bathrooms} bath home for rent in ${listing.city}, CA. $${listing.monthly_rent.toLocaleString()}/mo.`
  const canonicalUrl = `https://bakersfieldrentalhomes.com/listings/${params.id}`
  const ogImage = listing.photos?.[0] ?? 'https://bakersfieldrentalhomes.com/og-default.jpg'
  return {
    title: `${listing.title} — ${listing.address}`,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${listing.title} — ${listing.address}`,
      description,
      url: canonicalUrl,
      siteName: 'Bakersfield Rental Homes',
      images: [{ url: ogImage, width: 1200, height: 630, alt: listing.title }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${listing.title} — ${listing.address}`,
      description,
      images: [ogImage],
    },
  }
}

export default async function ListingDetailPage({ params }: { params: { id: string } }) {
  const listing = await getListing(params.id)
  if (!listing) notFound()
  return <ListingDetailClient listing={listing} />
}
