// Server Component — fetches listing at request time.
// The full page HTML (title, price, description, photos) is sent to the browser
// already populated — no client-side loading spinner on first visit.
import { notFound } from 'next/navigation'
import type { Listing } from '@/lib/supabase'
import ListingDetailClient from './ListingDetailClient'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

async function getListing(slug: string): Promise<Listing | null> {
  try {
    // Try slug first, fall back to UUID for existing listings
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug)
    const filter = isUuid ? `id=eq.${slug}` : `slug=eq.${slug}`

    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/listings?${filter}&select=*&limit=1`,
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

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const listing = await getListing(params.slug)
  if (!listing) return { title: 'Listing Not Found' }
  const description = listing.description?.slice(0, 160) ??
    `${listing.bedrooms} bed, ${listing.bathrooms} bath home for rent in ${listing.city}, CA. $${listing.monthly_rent.toLocaleString()}/mo.`
  const urlSlug = listing.slug ?? listing.id
  const canonicalUrl = `https://bakersfieldrentalhomes.com/listings/${urlSlug}`
  const ogImage = listing.photos?.[0] ?? 'https://bakersfieldrentalhomes.com/og-default.jpg'
  return {
    title: `${listing.title} — For Rent in Bakersfield, CA`,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${listing.title} — For Rent in Bakersfield, CA`,
      description,
      url: canonicalUrl,
      siteName: 'Bakersfield Rental Homes',
      images: [{ url: ogImage, width: 1200, height: 630, alt: listing.title }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${listing.title} — For Rent in Bakersfield, CA`,
      description,
      images: [ogImage],
    },
  }
}

export default async function ListingDetailPage({ params }: { params: { slug: string } }) {
  const listing = await getListing(params.slug)
  if (!listing) notFound()

  const urlSlug = listing.slug ?? listing.id

  const canonicalUrl = `https://bakersfieldrentalhomes.com/listings/${urlSlug}`

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: listing.title,
    description: listing.description,
    url: canonicalUrl,
    datePosted: listing.listed_date ?? listing.created_at,
    image: listing.photos ?? [],
    offers: {
      '@type': 'Offer',
      price: listing.monthly_rent,
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: listing.monthly_rent,
        priceCurrency: 'USD',
        referenceQuantity: {
          '@type': 'QuantitativeValue',
          value: 1,
          unitCode: 'MON',
        },
      },
      availability: listing.rental_status === 'vacant'
        ? 'https://schema.org/InStock'
        : listing.rental_status === 'pending'
        ? 'https://schema.org/LimitedAvailability'
        : 'https://schema.org/SoldOut',
    },
    floorSize: {
      '@type': 'QuantitativeValue',
      value: listing.living_area_sqft,
      unitCode: 'FTK',
    },
    numberOfRooms: listing.bedrooms,
    numberOfBathroomsTotal: listing.bathrooms,
    petsAllowed: listing.pets_allowed,
    address: {
      '@type': 'PostalAddress',
      streetAddress: listing.address,
      addressLocality: listing.city,
      addressRegion: listing.state ?? 'CA',
      postalCode: listing.zip,
      addressCountry: 'US',
    },
    landlord: {
      '@type': 'Person',
      name: listing.contact_name,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ListingDetailClient listing={listing} />
    </>
  )
}
