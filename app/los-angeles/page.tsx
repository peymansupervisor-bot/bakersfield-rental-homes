import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import type { Listing } from '@/lib/supabase'
import { statusLabel, statusColor, statusBg } from '@/lib/rentalStatus'

export const dynamic = 'force-dynamic'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const SITE_URL = 'https://bakersfieldrentalhomes.com'
const PAGE_URL = `${SITE_URL}/los-angeles`

export const metadata: Metadata = {
  title: 'Condos & Apartments for Rent in Los Angeles & West Hollywood CA | No Broker Fees',
  description:
    'Browse direct landlord rentals in Los Angeles and West Hollywood, CA. No broker fees, no middlemen — rent directly from the owner. Updated listings with photos, pricing, and contact info.',
  keywords: [
    'condos for rent West Hollywood CA',
    'apartments for rent West Hollywood CA 90046',
    'direct landlord rentals Los Angeles CA',
    'no broker fee rentals West Hollywood',
    'rent condo West Hollywood CA',
    'Los Angeles rental homes direct from owner',
    'West Hollywood condos for rent no fee',
    'rent apartment Los Angeles direct landlord',
    'luxury rentals West Hollywood CA',
    '8210 Fountain Ave West Hollywood rent',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Condos & Apartments for Rent in Los Angeles & West Hollywood CA',
    description: 'Direct landlord rentals in Los Angeles and West Hollywood, CA. No broker fees, no middlemen.',
    url: PAGE_URL,
    siteName: 'Bakersfield Rental Homes',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Condos for rent in West Hollywood and Los Angeles CA' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Condos & Apartments for Rent in Los Angeles & West Hollywood CA',
    description: 'Direct landlord rentals in Los Angeles and West Hollywood. No broker fees.',
    images: ['/opengraph-image'],
  },
}

async function getLAListings(): Promise<Listing[]> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/listings?select=*&status=eq.active&city=in.(Los%20Angeles,West%20Hollywood)&order=created_at.desc`,
      {
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
        cache: 'no-store',
      }
    )
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

function ListingCard({ listing, index }: { listing: Listing; index: number }) {
  const isPriority = index < 2
  const urlSlug = listing.slug ?? listing.id
  return (
    <Link href={`/listings/${urlSlug}`} className="block group">
      <article
        className="bg-white rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-lg"
        style={{ border: '1px solid rgba(201,169,97,0.12)' }}
      >
        <div className="relative overflow-hidden aspect-[4/3]" style={{ backgroundColor: '#e8e5df' }}>
          {listing.photos?.[0] ? (
            <Image
              src={listing.photos[0]}
              alt={`${listing.title} — ${listing.bedrooms} bed, ${listing.bathrooms} bath condo for rent in ${listing.city}, CA`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority={isPriority}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center" aria-hidden="true">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="20" fill="#f0ece4"/>
                <path d="M12 28l6-8 4 5 3-4 5 7H12z" fill="#C9A961" opacity="0.5"/>
              </svg>
            </div>
          )}
          <div
            className="absolute top-3 left-3 px-3 py-1.5 rounded-full text-sm font-bold"
            style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0' }}
            aria-label={`Rent: $${listing.monthly_rent.toLocaleString()} per month`}
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
          <h2
            className="font-semibold text-base mb-1 line-clamp-1 group-hover:text-[#C9A961] transition-colors duration-200"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}
          >
            {listing.title}
          </h2>
          <p className="text-xs mb-4 line-clamp-1" style={{ color: '#616161' }}>
            {listing.address}, {listing.city}, CA {listing.zip}
          </p>
          <div className="flex items-center gap-4 text-xs" style={{ color: '#555' }}>
            <span>{listing.bedrooms === 0 ? 'Studio' : `${listing.bedrooms} BD`}</span>
            <span>{listing.bathrooms} BA</span>
            <span>{listing.living_area_sqft.toLocaleString()} sqft</span>
          </div>
          {listing.amenities?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {listing.amenities.slice(0, 3).map(a => (
                <span key={a} className="text-[10px] px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: '#f0ece4', color: '#616161' }}>
                  {a}
                </span>
              ))}
              {listing.amenities.length > 3 && (
                <span className="text-[10px] px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: '#f0ece4', color: '#616161' }}>
                  +{listing.amenities.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}

export default async function LosAngelesPage() {
  const listings = await getLAListings()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Direct Landlord Rentals in Los Angeles & West Hollywood, CA',
    url: PAGE_URL,
    numberOfItems: listings.length,
    itemListElement: listings.map((l, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/listings/${l.slug ?? l.id}`,
      name: l.title,
    })),
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Are there condos for rent in West Hollywood with no broker fee?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Our West Hollywood listings are rented directly by the property owner — no broker, no agent fee. Contact the landlord directly through the listing page.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does it cost to rent a condo in West Hollywood CA?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Condos in West Hollywood, CA typically rent from $3,500 to over $6,000 per month depending on size, building amenities, and location. Our current listings show up-to-date pricing directly from landlords.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the zip code for West Hollywood rentals?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'West Hollywood, CA rentals are primarily in zip codes 90046, 90048, and 90069. Our listing at 8210 Fountain Ave is in the 90046 zip code.',
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main id="main-content" className="min-h-screen" style={{ backgroundColor: '#F7F5F0' }}>

        {/* Hero */}
        <div
          className="py-16 px-6 text-center"
          style={{ background: 'linear-gradient(to bottom, #1C3D5A 0%, #2a5278 100%)' }}
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: '#C9A961', letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif' }}>
            Direct from Landlords · No Broker Fees
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}
          >
            Condos & Apartments for Rent<br />in Los Angeles & West Hollywood
          </h1>
          <p className="text-base max-w-2xl mx-auto mb-6" style={{ color: 'rgba(247,245,240,0.75)' }}>
            Rent directly from the owner in Los Angeles and West Hollywood, CA.
            No broker fees, no middlemen — faster approvals and direct contact with your landlord.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 rounded-full text-xs font-semibold"
              style={{ backgroundColor: 'rgba(201,169,97,0.15)', color: '#C9A961', border: '1px solid rgba(201,169,97,0.3)' }}>
              West Hollywood, CA
            </span>
            <span className="px-4 py-2 rounded-full text-xs font-semibold"
              style={{ backgroundColor: 'rgba(201,169,97,0.15)', color: '#C9A961', border: '1px solid rgba(201,169,97,0.3)' }}>
              Los Angeles, CA
            </span>
            <span className="px-4 py-2 rounded-full text-xs font-semibold"
              style={{ backgroundColor: 'rgba(201,169,97,0.15)', color: '#C9A961', border: '1px solid rgba(201,169,97,0.3)' }}>
              Zip: 90046 · 90048 · 90069
            </span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-10 py-12">

          {/* Listings */}
          {listings.length > 0 ? (
            <>
              <div className="mb-8 flex items-end justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase mb-1"
                    style={{ color: '#7d6019' }}>
                    Available Now · Los Angeles Area
                  </p>
                  <h2 className="text-2xl font-bold"
                    style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
                    {listings.length} {listings.length === 1 ? 'Property' : 'Properties'} Available
                  </h2>
                </div>
                <Link href="/listings"
                  className="text-xs font-semibold tracking-widest uppercase transition-opacity hover:opacity-70"
                  style={{ color: '#1C3D5A', letterSpacing: '0.12em' }}>
                  View All Listings →
                </Link>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
                {listings.map((l, i) => (
                  <li key={l.id}>
                    <ListingCard listing={l} index={i} />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg font-semibold mb-2" style={{ color: '#1C3D5A', fontFamily: 'Playfair Display, Georgia, serif' }}>
                No listings available right now
              </p>
              <p className="text-sm mb-6" style={{ color: '#616161' }}>
                Check back soon — new properties are added regularly.
              </p>
              <Link href="/listings"
                className="inline-block px-8 py-3 rounded-xl text-sm font-semibold tracking-widest uppercase"
                style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0', letterSpacing: '0.1em' }}>
                Browse All Listings
              </Link>
            </div>
          )}

          {/* Why rent direct */}
          <section
            className="mt-16 rounded-2xl p-8 md:p-12"
            style={{ backgroundColor: 'white', border: '1px solid rgba(201,169,97,0.15)' }}
            aria-labelledby="why-direct-heading"
          >
            <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: '#7d6019' }}>
              No Agent · No Commission · No Hassle
            </p>
            <h2 id="why-direct-heading" className="text-2xl font-bold mb-6"
              style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              Why Rent Directly from the Owner in LA?
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { dt: 'No Broker Fees', dd: 'Save thousands — you deal directly with the owner, not an agent who adds a commission layer.' },
                { dt: 'Faster Approvals', dd: 'Owners make their own decisions. No corporate approval chains or delayed responses.' },
                { dt: 'Direct Communication', dd: 'Text, call, or email the landlord directly. Maintenance requests get handled faster.' },
              ].map(({ dt, dd }) => (
                <div key={dt} className="rounded-xl p-5" style={{ backgroundColor: '#F7F5F0' }}>
                  <dt className="font-semibold text-sm mb-2" style={{ color: '#1C3D5A', fontFamily: 'Playfair Display, Georgia, serif' }}>
                    <span style={{ color: '#C9A961' }} aria-hidden="true">✓ </span>{dt}
                  </dt>
                  <dd className="text-sm leading-relaxed" style={{ color: '#555' }}>{dd}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* FAQ */}
          <section className="mt-12" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-2xl font-bold mb-6"
              style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              Frequently Asked Questions
            </h2>
            <dl className="space-y-4">
              {[
                {
                  dt: 'Are there condos for rent in West Hollywood with no broker fee?',
                  dd: 'Yes. Our West Hollywood listings are rented directly by the property owner — no broker, no agent fee. Contact the landlord directly through the listing page.',
                },
                {
                  dt: 'How much does it cost to rent a condo in West Hollywood CA?',
                  dd: 'Condos in West Hollywood, CA typically rent from $3,500 to over $6,000 per month depending on size, building amenities, and location. Our current listings show up-to-date pricing directly from landlords.',
                },
                {
                  dt: 'What is the zip code for West Hollywood rentals?',
                  dd: 'West Hollywood, CA rentals are primarily in zip codes 90046, 90048, and 90069. Our listing at 8210 Fountain Ave is in the 90046 zip code.',
                },
              ].map(({ dt, dd }) => (
                <div key={dt} className="rounded-2xl p-6 bg-white"
                  style={{ border: '1px solid rgba(201,169,97,0.12)' }}>
                  <dt className="font-semibold text-sm mb-2" style={{ color: '#1C3D5A' }}>{dt}</dt>
                  <dd className="text-sm leading-relaxed" style={{ color: '#555' }}>{dd}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Cross-link to Bakersfield */}
          <section className="mt-12 rounded-2xl p-8 text-center"
            style={{ background: 'linear-gradient(135deg, #1C3D5A 0%, #2a5278 100%)' }}
            aria-labelledby="bakersfield-link-heading">
            <p className="text-xs font-semibold tracking-widest uppercase mb-2"
              style={{ color: '#C9A961', letterSpacing: '0.18em' }}>
              Also Available
            </p>
            <h2 id="bakersfield-link-heading" className="text-xl font-bold mb-3"
              style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}>
              Looking for Rentals in Bakersfield?
            </h2>
            <p className="text-sm mb-6" style={{ color: 'rgba(247,245,240,0.75)' }}>
              We specialize in direct landlord rentals across Kern County — houses, single-family homes, and more with no broker fees.
            </p>
            <Link href="/listings"
              className="inline-block px-8 py-3 rounded-xl text-sm font-semibold tracking-widest uppercase transition-all hover:opacity-90"
              style={{ backgroundColor: '#C9A961', color: '#1C3D5A', letterSpacing: '0.1em' }}>
              Browse Bakersfield Listings
            </Link>
          </section>

        </div>
      </main>
    </>
  )
}
