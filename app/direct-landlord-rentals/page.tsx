import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import type { Listing } from '@/lib/supabase'
import { NEIGHBORHOODS } from '@/lib/neighborhoods'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const metadata: Metadata = {
  title: 'Direct Landlord Rentals in Bakersfield CA',
  description:
    'Rent directly from local landlords in Bakersfield, CA. No broker fees, no middlemen, faster approvals. Browse houses for rent by owner in Bakersfield — updated daily.',
  keywords: [
    'direct landlord rentals Bakersfield CA',
    'houses for rent by owner Bakersfield CA',
    'rent from owner Bakersfield',
    'Bakersfield no broker fee rentals',
    'Bakersfield private landlord listings',
    'rental listings without realtor Bakersfield',
    'Bakersfield rental homes direct from owner',
    'no middleman rentals Bakersfield',
    'horse property for rent Bakersfield CA',
    'horse property rental Bakersfield',
    'equestrian property rental Kern County',
  ],
  alternates: { canonical: 'https://bakersfieldrentalhomes.com/direct-landlord-rentals' },
  openGraph: {
    title: 'Direct Landlord Rentals in Bakersfield CA',
    description: 'Rent directly from local landlords in Bakersfield. No broker fees, no middlemen, faster approvals.',
    url: 'https://bakersfieldrentalhomes.com/direct-landlord-rentals',
    siteName: 'Bakersfield Rental Homes',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Direct landlord rentals Bakersfield CA' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Direct Landlord Rentals in Bakersfield CA',
    description: 'Rent directly from local landlords in Bakersfield. No broker fees, faster approvals.',
    images: ['/opengraph-image'],
  },
}

async function getActiveListings(): Promise<Listing[]> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/listings?status=eq.active&rental_status=neq.rented&order=created_at.desc&limit=6`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
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

const BENEFITS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'No Broker Fees',
    body: 'Every listing on this site is rented directly by the owner. You never pay a broker commission or finder\'s fee.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Faster Approvals',
    body: 'Talk directly with the landlord — no property management layers, no slow back-and-forth. Decisions happen faster.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Real Local Landlords',
    body: 'Every listing is a real home in Bakersfield — posted by a real property owner, not a national corporation or out-of-state management company.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'Updated Daily',
    body: 'Listings go live as soon as landlords post them. No stale inventory, no properties already rented by the time you call.',
  },
]

const FAQS = [
  {
    q: 'What does "direct landlord rental" mean?',
    a: 'It means you rent the home directly from the owner — with no real estate agent, property management company, or broker in between. This saves you fees and speeds up the process.',
  },
  {
    q: 'Are there really no broker fees?',
    a: 'Correct. Every listing on Bakersfield Rental Homes is posted by the property owner directly. There are no finder\'s fees or broker commissions charged to tenants.',
  },
  {
    q: 'How do I apply for a direct landlord rental?',
    a: 'Click any listing to view the property details and contact the landlord directly. Most owners respond within 24 hours. You\'ll work out the application, lease, and move-in dates one-on-one.',
  },
  {
    q: 'Are direct landlord rentals safe?',
    a: 'We require landlords to complete an identity verification step before their listing goes live, which helps reduce fraudulent postings. However, no platform can guarantee complete elimination of fraud. We strongly recommend visiting any property in person before signing a lease, independently verifying ownership through the Kern County Assessor-Recorder\'s Office, and never sending any payment before a signed rental agreement is in place.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Direct Landlord Rentals in Bakersfield CA',
  description: 'Rent directly from local landlords in Bakersfield, CA with no broker fees or middlemen.',
  url: 'https://bakersfieldrentalhomes.com/direct-landlord-rentals',
  provider: {
    '@type': 'Organization',
    name: 'Bakersfield Rental Homes',
    url: 'https://bakersfieldrentalhomes.com',
  },
}

export default async function DirectLandlordRentalsPage() {
  const listings = await getActiveListings()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />

      <main id="main-content">

        {/* Hero */}
        <section
          className="relative py-24 px-6 text-center overflow-hidden"
          style={{ backgroundColor: '#1C3D5A' }}
          aria-labelledby="dlr-heading"
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#C9A961' }}>
            Bakersfield, CA · No Broker Fees · No Middlemen
          </p>
          <h1
            id="dlr-heading"
            className="text-4xl md:text-5xl font-bold mb-5 max-w-3xl mx-auto"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}
          >
            Houses for Rent by Owner in Bakersfield CA
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-10" style={{ color: 'rgba(247,245,240,0.8)' }}>
            Built for Bakersfield landlords and local renters — no broker fees, no middlemen, no property management layers.
            Faster approvals, better communication, direct from the owner.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/listings"
              className="px-8 py-3.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#C9A961', color: '#1C3D5A' }}
            >
              Browse Available Rentals
            </Link>
            <Link
              href="/list"
              className="px-8 py-3.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-80"
              style={{ border: '1px solid rgba(201,169,97,0.5)', color: '#C9A961' }}
            >
              List Your Property
            </Link>
          </div>
        </section>

        {/* Why direct */}
        <section className="py-16 px-6" style={{ backgroundColor: '#F7F5F0' }} aria-labelledby="benefits-heading">
          <div className="max-w-5xl mx-auto">
            <h2
              id="benefits-heading"
              className="text-3xl font-bold text-center mb-12"
              style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}
            >
              Why Rent Directly from a Landlord?
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8" role="list">
              {BENEFITS.map(b => (
                <li key={b.title} className="flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(201,169,97,0.15)', color: '#C9A961' }}>
                    {b.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-base mb-1" style={{ color: '#1C3D5A' }}>{b.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#2B2B2B' }}>{b.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Featured listings */}
        {listings.length > 0 && (
          <section className="py-16 px-6" aria-labelledby="featured-heading">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-baseline justify-between mb-8">
                <h2
                  id="featured-heading"
                  className="text-3xl font-bold"
                  style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}
                >
                  Available Now — Direct from Owners
                </h2>
                <Link href="/listings" className="text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: '#7d6019' }}>
                  View all →
                </Link>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
                {listings.map((listing, index) => (
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
                              alt={`${listing.title} — direct landlord rental in Bakersfield CA`}
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
                          <div
                            className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
                            style={{ backgroundColor: 'rgba(201,169,97,0.9)', color: '#1C3D5A' }}
                          >
                            Direct Landlord
                          </div>
                        </div>
                        <div className="p-5">
                          <h3
                            className="font-semibold text-base mb-1 line-clamp-1 group-hover:text-[#C9A961] transition-colors"
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
              <div className="mt-10 text-center">
                <Link
                  href="/listings"
                  className="inline-block px-8 py-3 rounded-full text-sm font-semibold transition-opacity hover:opacity-80"
                  style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0' }}
                >
                  Browse All Direct Landlord Listings
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* By neighborhood */}
        <section className="py-16 px-6" style={{ backgroundColor: '#F7F5F0' }} aria-labelledby="neighborhoods-heading">
          <div className="max-w-5xl mx-auto">
            <h2
              id="neighborhoods-heading"
              className="text-3xl font-bold text-center mb-4"
              style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}
            >
              Direct Rentals by Neighborhood
            </h2>
            <p className="text-center text-sm mb-10" style={{ color: '#616161' }}>
              Browse owner-direct homes in your preferred area of Bakersfield.
            </p>
            <nav aria-label="Rentals by neighborhood" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {NEIGHBORHOODS.map(n => (
                <Link
                  key={n.slug}
                  href={`/neighborhoods/${n.slug}`}
                  className="flex flex-col gap-1 p-5 rounded-2xl transition-shadow hover:shadow-md group"
                  style={{ backgroundColor: '#fff', border: '1px solid rgba(201,169,97,0.15)' }}
                >
                  <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#7d6019' }}>
                    {n.zips.join(' · ')}
                  </span>
                  <span
                    className="font-semibold group-hover:text-[#C9A961] transition-colors"
                    style={{ color: '#1C3D5A', fontFamily: 'Playfair Display, Georgia, serif' }}
                  >
                    {n.name}
                  </span>
                  <span className="text-xs leading-snug" style={{ color: '#616161' }}>{n.tagline}</span>
                </Link>
              ))}
            </nav>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-6" aria-labelledby="faq-heading">
          <div className="max-w-3xl mx-auto">
            <h2
              id="faq-heading"
              className="text-3xl font-bold text-center mb-10"
              style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}
            >
              Common Questions
            </h2>
            <dl className="space-y-6">
              {FAQS.map(({ q, a }) => (
                <div key={q} className="rounded-2xl p-6" style={{ backgroundColor: '#F7F5F0', border: '1px solid rgba(201,169,97,0.12)' }}>
                  <dt className="font-semibold mb-2" style={{ color: '#1C3D5A' }}>{q}</dt>
                  <dd className="text-sm leading-relaxed" style={{ color: '#2B2B2B' }}>{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* CTA */}
        <section
          className="py-16 px-6 text-center"
          style={{ backgroundColor: '#1C3D5A' }}
          aria-labelledby="cta-heading"
        >
          <h2
            id="cta-heading"
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}
          >
            Ready to Find Your Next Home?
          </h2>
          <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: 'rgba(247,245,240,0.75)' }}>
            Browse available homes rented directly by Bakersfield landlords — no broker, no fees, no runaround.
          </p>
          <Link
            href="/listings"
            className="inline-block px-10 py-4 rounded-full text-base font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#C9A961', color: '#1C3D5A' }}
          >
            View All Direct Landlord Listings
          </Link>
        </section>

      </main>
    </>
  )
}
