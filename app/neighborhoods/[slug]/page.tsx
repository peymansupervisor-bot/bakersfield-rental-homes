import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import type { Listing } from '@/lib/supabase'
import { NEIGHBORHOODS, getNeighborhood } from '@/lib/neighborhoods'
import { statusLabel, statusColor } from '@/lib/rentalStatus'

export const dynamic = 'force-dynamic'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

async function getListingsByZips(zips: string[]): Promise<Listing[]> {
  try {
    const zipFilter = zips.map(z => `zip.eq.${z}`).join(',')
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/listings?or=(${zipFilter})&status=eq.active&order=created_at.desc`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
        cache: 'no-store',
      }
    )
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export async function generateStaticParams() {
  return NEIGHBORHOODS.map(n => ({ slug: n.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const hood = getNeighborhood(params.slug)
  if (!hood) return { title: 'Neighborhood Not Found' }

  const title = `Houses for Rent in ${hood.name}, Bakersfield CA`
  const description = `Find direct landlord rentals in ${hood.name}, Bakersfield CA. ${hood.tagline}. No broker fees, fast approvals, updated listings daily.`
  const url = `https://bakersfieldrentalhomes.com/neighborhoods/${hood.slug}`

  return {
    title,
    description,
    keywords: [
      `houses for rent in ${hood.name} Bakersfield`,
      `${hood.name} Bakersfield rentals`,
      `${hood.name} rental homes`,
      `rent from owner ${hood.name} Bakersfield`,
      `direct landlord rentals ${hood.name}`,
      ...hood.zips.map(z => `rentals ${z}`),
    ],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Bakersfield Rental Homes',
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: title }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/opengraph-image'],
    },
  }
}

export default async function NeighborhoodPage({
  params,
}: {
  params: { slug: string }
}) {
  const hood = getNeighborhood(params.slug)
  if (!hood) notFound()

  const listings = await getListingsByZips(hood.zips)
  const activeListings = listings.filter(l => l.rental_status !== 'rented')

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: `Direct Landlord Rentals in ${hood.name}, Bakersfield CA`,
    description: hood.description,
    url: `https://bakersfieldrentalhomes.com/neighborhoods/${hood.slug}`,
    areaServed: {
      '@type': 'Place',
      name: `${hood.name}, Bakersfield, CA`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bakersfield',
        addressRegion: 'CA',
        postalCode: hood.zips[0],
        addressCountry: 'US',
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <main id="main-content">
        {/* Hero */}
        <section
          className="relative py-20 px-6 text-center"
          style={{ backgroundColor: '#1C3D5A' }}
          aria-labelledby="neighborhood-heading"
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#C9A961' }}>
            Direct Landlord Rentals · No Broker Fees
          </p>
          <h1
            id="neighborhood-heading"
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}
          >
            Houses for Rent in {hood.name}
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: 'rgba(247,245,240,0.8)' }}>
            {hood.tagline} — rented directly by local landlords in Bakersfield, CA.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {hood.highlights.map(h => (
              <span
                key={h}
                className="px-4 py-1.5 rounded-full text-sm font-medium"
                style={{ backgroundColor: 'rgba(201,169,97,0.15)', color: '#C9A961', border: '1px solid rgba(201,169,97,0.3)' }}
              >
                {h}
              </span>
            ))}
          </div>
        </section>

        {/* About */}
        <section className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
            About {hood.name}
          </h2>
          <p className="text-base leading-relaxed" style={{ color: '#2B2B2B' }}>
            {hood.description}
          </p>
        </section>

        {/* Listings */}
        <section className="max-w-6xl mx-auto px-6 pb-16" aria-labelledby="listings-heading">
          <div className="flex items-baseline justify-between mb-8">
            <h2 id="listings-heading" className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              Available Rentals in {hood.name}
            </h2>
            <span className="text-sm" style={{ color: '#616161' }}>
              {activeListings.length} {activeListings.length === 1 ? 'home' : 'homes'} available
            </span>
          </div>

          {activeListings.length === 0 ? (
            <div className="text-center py-16 rounded-2xl" style={{ backgroundColor: '#F7F5F0' }}>
              <p className="text-lg font-medium mb-2" style={{ color: '#1C3D5A' }}>No listings right now</p>
              <p className="text-sm mb-6" style={{ color: '#616161' }}>
                New properties in {hood.name} are added regularly — check back soon or browse all listings.
              </p>
              <Link
                href="/listings"
                className="inline-block px-6 py-3 rounded-full text-sm font-semibold"
                style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0' }}
              >
                Browse All Listings
              </Link>
            </div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
              {activeListings.map((listing, index) => (
                <li key={listing.id} className="card-animate" style={{ animationDelay: `${index * 0.06}s` }}>
                  <Link href={`/listings/${listing.slug ?? listing.id}`} className="block group">
                    <article
                      className="bg-white rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-lg"
                      style={{ border: '1px solid rgba(201,169,97,0.12)' }}
                    >
                      <div className="relative overflow-hidden aspect-[4/3]" style={{ backgroundColor: '#e8e5df' }}>
                        {listing.photos?.[0] ? (
                          <Image
                            src={listing.photos[0]}
                            alt={`${listing.title} — ${listing.bedrooms} bed, ${listing.bathrooms} bath home for rent in ${hood.name}, Bakersfield CA`}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            priority={index < 3}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                              <rect width="40" height="40" rx="20" fill="#f0ece4"/>
                              <path d="M12 28l6-8 4 5 3-4 5 7H12z" fill="#C9A961" opacity="0.5"/>
                            </svg>
                          </div>
                        )}
                        <div
                          className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-sm font-bold"
                          style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0' }}
                        >
                          ${listing.monthly_rent.toLocaleString()}/mo
                        </div>
                        {listing.rental_status && (
                          <span
                            className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
                            aria-label={`Status: ${statusLabel(listing.rental_status)}`}
                            style={{ backgroundColor: statusColor(listing.rental_status), color: '#fff' }}
                          >
                            <span aria-hidden="true">● </span>{statusLabel(listing.rental_status)}
                          </span>
                        )}
                      </div>
                      <div className="p-5">
                        <h3
                          className="font-semibold text-base mb-1 line-clamp-1 group-hover:text-[#C9A961] transition-colors duration-200"
                          style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}
                        >
                          {listing.title}
                        </h3>
                        <p className="text-xs mb-4 line-clamp-1" style={{ color: '#616161' }}>
                          {listing.address}, Bakersfield, CA {listing.zip}
                        </p>
                        <div className="flex items-center gap-4 text-xs" style={{ color: '#555' }}>
                          <span>{listing.bedrooms === 0 ? 'Studio' : `${listing.bedrooms} BD`}</span>
                          <span>{listing.bathrooms} BA</span>
                          <span>{listing.living_area_sqft.toLocaleString()} sqft</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-10 text-center">
            <Link
              href="/listings"
              className="inline-block px-8 py-3 rounded-full text-sm font-semibold transition-opacity hover:opacity-80"
              style={{ backgroundColor: '#C9A961', color: '#1C3D5A' }}
            >
              View All Bakersfield Listings
            </Link>
          </div>
        </section>

        {/* Neighborhood nav */}
        <section className="border-t py-12 px-6" style={{ borderColor: 'rgba(201,169,97,0.15)' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center text-sm font-semibold tracking-widest uppercase mb-6" style={{ color: '#616161' }}>
              Explore Other Neighborhoods
            </h2>
            <nav aria-label="Other neighborhoods" className="flex flex-wrap justify-center gap-3">
              {NEIGHBORHOODS.filter(n => n.slug !== hood.slug).map(n => (
                <Link
                  key={n.slug}
                  href={`/neighborhoods/${n.slug}`}
                  className="px-5 py-2 rounded-full text-sm font-medium transition-colors hover:bg-[#1C3D5A] hover:text-white"
                  style={{ border: '1px solid rgba(28,61,90,0.2)', color: '#1C3D5A' }}
                >
                  {n.name}
                </Link>
              ))}
            </nav>
          </div>
        </section>
      </main>
    </>
  )
}
