// Server Component — fetches listing at request time.
// The full page HTML (title, price, description, photos) is sent to the browser
// already populated — no client-side loading spinner on first visit.
import { notFound } from 'next/navigation'
import type { Listing } from '@/lib/supabase'
import ListingDetailClient from './ListingDetailClient'

export const dynamic = 'force-dynamic'

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
  const rawDesc = listing.description?.slice(0, 160) ?? ''
  const description = rawDesc
    ? (rawDesc.length < (listing.description?.length ?? 0) ? rawDesc.replace(/\s\S*$/, '…') : rawDesc)
    : `${listing.bedrooms} bed, ${listing.bathrooms} bath home for rent in ${listing.city}, CA. $${listing.monthly_rent.toLocaleString()}/mo.`
  const urlSlug = listing.slug ?? listing.id
  const canonicalUrl = `https://bakersfieldrentalhomes.com/listings/${urlSlug}`
  const ogImage = listing.photos?.[0] ?? 'https://bakersfieldrentalhomes.com/og-default.jpg'
  const bedsLabel = listing.bedrooms === 0 ? 'Studio' : `${listing.bedrooms}-Bedroom`
  const city = listing.city ?? 'Bakersfield'
  const zip = listing.zip ?? ''
  const propertyWord = city === 'Bakersfield' ? 'House' : 'Condo'
  const seoTitle = `${bedsLabel} ${propertyWord} for Rent in ${city} CA ${zip} — ${listing.address}`
  const ogTitle = `${listing.address} — ${bedsLabel} For Rent in ${city}, CA`
  return {
    title: seoTitle,
    description,
    keywords: [
      `${listing.address} for rent`,
      `${propertyWord.toLowerCase()}s for rent in ${city} CA ${zip}`,
      `${listing.bedrooms} bedroom ${propertyWord.toLowerCase()} for rent ${city}`,
      `${city} CA ${zip} rental`,
      `rent ${propertyWord.toLowerCase()} ${city} ${zip}`,
      `direct landlord rental ${city}`,
      `no broker fee ${city} rental`,
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: ogTitle,
      description,
      url: canonicalUrl,
      siteName: 'Bakersfield Rental Homes',
      images: [{ url: ogImage, width: 1200, height: 630, alt: ogTitle }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
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

  const isCondo = (listing.city ?? '') !== 'Bakersfield'
  const schema = {
    '@context': 'https://schema.org',
    '@type': isCondo ? 'Apartment' : 'SingleFamilyResidence',
    name: listing.title,
    description: listing.description,
    url: canonicalUrl,
    datePosted: listing.listed_date ?? listing.created_at,
    image: listing.photos ?? [],
    floorSize: {
      '@type': 'QuantitativeValue',
      value: listing.living_area_sqft,
      unitCode: 'FTK',
    },
    numberOfRooms: listing.bedrooms,
    numberOfBathroomsTotal: listing.bathrooms,
    petsAllowed: listing.pets_allowed,
    amenityFeature: (listing.amenities ?? []).map((a: string) => ({
      '@type': 'LocationFeatureSpecification',
      name: a,
      value: true,
    })),
    address: {
      '@type': 'PostalAddress',
      streetAddress: listing.address,
      addressLocality: listing.city,
      addressRegion: listing.state ?? 'CA',
      postalCode: listing.zip,
      addressCountry: 'US',
    },
    offers: {
      '@type': 'Offer',
      price: listing.monthly_rent,
      priceCurrency: 'USD',
      availability: listing.rental_status === 'vacant'
        ? 'https://schema.org/InStock'
        : listing.rental_status === 'pending'
        ? 'https://schema.org/LimitedAvailability'
        : 'https://schema.org/SoldOut',
      availabilityStarts: listing.available_date ?? undefined,
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
      seller: {
        '@type': 'Person',
        name: listing.contact_name,
      },
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
