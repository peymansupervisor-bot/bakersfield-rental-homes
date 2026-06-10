import Link from 'next/link'
import type { Metadata } from 'next'
import type { Listing } from '@/lib/supabase'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Studio for Rent in Bakersfield CA | No Broker Fees',
  description:
    'Find a studio for rent in Bakersfield, CA. Browse studio rentals posted directly by local landlords — no broker fees, no middlemen. Affordable studio homes and long-term leases in Kern County.',
  keywords: [
    'studio for rent Bakersfield CA',
    'studio apartment Bakersfield CA',
    'studio rental Bakersfield California',
    'studio home for rent Bakersfield',
    'affordable studio rental Bakersfield CA',
    'studio rental Kern County',
    'direct landlord studio Bakersfield',
    'studio no broker fee Bakersfield',
  ],
  alternates: { canonical: 'https://bakersfieldrentalhomes.com/studio-for-rent-bakersfield' },
  openGraph: {
    title: 'Studio for Rent in Bakersfield CA | No Broker Fees',
    description: 'Browse studio rentals in Bakersfield, CA. Rent directly from local landlords — no broker fees.',
    url: 'https://bakersfieldrentalhomes.com/studio-for-rent-bakersfield',
    siteName: 'Bakersfield Rental Homes',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Studio for rent in Bakersfield CA' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Studio for Rent in Bakersfield CA | No Broker Fees',
    description: 'Browse studio rentals in Bakersfield, CA. No broker fees.',
    images: ['/opengraph-image'],
  },
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

async function getStudioListings(): Promise<Listing[]> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/listings?status=eq.active&bedrooms=eq.0&city=eq.Bakersfield&order=created_at.desc`,
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

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bakersfieldrentalhomes.com' },
    { '@type': 'ListItem', position: 2, name: 'Studio for Rent Bakersfield', item: 'https://bakersfieldrentalhomes.com/studio-for-rent-bakersfield' },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does a studio rental cost in Bakersfield CA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'As of 2026, studio rentals in Bakersfield, CA typically range from $700 to $1,000 per month depending on location and amenities. Bakersfield is one of the most affordable rental markets in California.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where can I find a studio for rent in Bakersfield?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Studio rentals in Bakersfield are most common in East Bakersfield, Downtown, and the Oleander-Sunset area. Browse our listings and filter by bedrooms to find available studios near you.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are studio rentals in Bakersfield pet friendly?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Some studio rentals in Bakersfield allow pets. Use the Pets Allowed filter on our listings page or contact the landlord directly to confirm their pet policy.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to pay a broker fee to rent a studio in Bakersfield?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not through Bakersfield Rental Homes. Every listing is posted directly by the property owner. There are no broker commissions or finder\'s fees charged to tenants.',
      },
    },
  ],
}

const STATS = [
  { value: 'Studio', label: 'Ideal for singles and minimalists' },
  { value: '$700–$1,000', label: 'Typical monthly rent range' },
  { value: 'No Fees', label: 'Rent direct from the owner' },
  { value: 'All Areas', label: 'Every Bakersfield neighborhood' },
]

export default async function StudioPage() {
  const listings = await getStudioListings()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main id="main-content">

        {/* Hero */}
        <section
          className="relative py-24 px-6 text-center overflow-hidden"
          style={{ backgroundColor: '#1C3D5A' }}
          aria-labelledby="studio-heading"
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#C9A961' }} aria-hidden="true">
            Bakersfield, CA · No Broker Fees · Direct from Owner
          </p>
          <h1
            id="studio-heading"
            className="text-4xl md:text-5xl font-bold mb-5 max-w-3xl mx-auto"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}
          >
            Studio for Rent in Bakersfield CA
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-10" style={{ color: 'rgba(247,245,240,0.8)' }}>
            Browse studio rentals across Bakersfield — posted directly by local landlords.
            No broker fees, no middlemen.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/listings"
              className="px-7 py-3.5 rounded-full font-semibold text-sm tracking-wider uppercase transition-all hover:opacity-90"
              style={{ backgroundColor: '#C9A961', color: '#1C3D5A' }}
            >
              Browse All Listings
            </Link>
            <Link
              href="/list"
              className="px-7 py-3.5 rounded-full font-semibold text-sm tracking-wider uppercase transition-all hover:opacity-90"
              style={{ backgroundColor: 'transparent', color: '#F7F5F0', border: '1px solid rgba(247,245,240,0.4)' }}
            >
              List Your Property
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section className="py-14 px-6 md:px-10" style={{ backgroundColor: '#F7F5F0' }} aria-label="Key facts about studio rentals in Bakersfield">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map(s => (
              <div key={s.value} className="text-center">
                <p className="text-xl font-bold mb-1" style={{ color: '#1C3D5A', fontFamily: 'Playfair Display, Georgia, serif' }}>{s.value}</p>
                <p className="text-xs" style={{ color: '#595959' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Listings */}
        <section className="py-16 px-6 md:px-10" style={{ backgroundColor: '#F7F5F0' }} aria-labelledby="listings-heading">
          <div className="max-w-5xl mx-auto">
            <h2 id="listings-heading" className="text-2xl font-bold mb-8 text-center" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              Studio Rentals Available Now
            </h2>
            {listings.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-base mb-2" style={{ color: '#555' }}>No studio listings are currently available.</p>
                <p className="text-sm mb-6" style={{ color: '#595959' }}>Browse all listings and filter by bedrooms, or sign up for alerts when a new studio is posted.</p>
                <Link href="/listings" className="px-6 py-3 rounded-full font-semibold text-sm tracking-wider uppercase transition-all hover:opacity-90"
                  style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0' }}>
                  Browse All Listings
                </Link>
              </div>
            ) : (
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0 m-0">
                {listings.map(l => (
                  <li key={l.id}>
                    <Link href={`/listings/${l.slug ?? l.id}`}
                      aria-label={`View listing: ${l.title} — ${l.address} — $${l.monthly_rent.toLocaleString()}/mo`}
                      className="block rounded-2xl overflow-hidden transition-all hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A961]"
                      style={{ border: '1px solid rgba(201,169,97,0.2)', backgroundColor: '#fff' }}>
                      {l.photos?.[0] && (
                        <div style={{ position: 'relative', paddingTop: '60%' }}>
                          <img
                            src={l.photos[0]}
                            alt={`${l.title} — studio for rent in ${l.city}, CA`}
                            className="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <p className="font-semibold text-sm mb-1" style={{ color: '#1C3D5A' }}>{l.title}</p>
                        <p className="text-xs mb-2" style={{ color: '#595959' }}>{l.address}</p>
                        <p className="font-bold text-sm" style={{ color: '#C9A961' }}>${l.monthly_rent.toLocaleString()}/mo</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-6 md:px-10" style={{ backgroundColor: '#fff' }} aria-labelledby="faq-heading">
          <div className="max-w-2xl mx-auto">
            <h2 id="faq-heading" className="text-2xl font-bold mb-8 text-center" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              Frequently Asked Questions
            </h2>
            <dl className="space-y-6">
              {faqSchema.mainEntity.map(item => (
                <div key={item.name} className="border-b pb-5" style={{ borderColor: 'rgba(201,169,97,0.2)' }}>
                  <dt className="font-semibold text-sm mb-2" style={{ color: '#1C3D5A' }}>{item.name}</dt>
                  <dd className="text-sm leading-relaxed" style={{ color: '#555' }}>{item.acceptedAnswer.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Related pages */}
        <section className="py-14 px-6 md:px-10" style={{ backgroundColor: '#F7F5F0' }} aria-labelledby="related-heading">
          <div className="max-w-3xl mx-auto text-center">
            <h2 id="related-heading" className="text-xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              More Rental Searches
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/1-bedroom-houses-for-rent-bakersfield" className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-80"
                style={{ backgroundColor: '#fff', color: '#1C3D5A', border: '1px solid rgba(28,61,90,0.2)' }}>
                1 Bedroom Rentals
              </Link>
              <Link href="/2-bedroom-houses-for-rent-bakersfield" className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-80"
                style={{ backgroundColor: '#fff', color: '#1C3D5A', border: '1px solid rgba(28,61,90,0.2)' }}>
                2 Bedroom Rentals
              </Link>
              <Link href="/pet-friendly-rentals-bakersfield" className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-80"
                style={{ backgroundColor: '#fff', color: '#1C3D5A', border: '1px solid rgba(28,61,90,0.2)' }}>
                Pet Friendly Rentals
              </Link>
              <Link href="/direct-landlord-rentals" className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-80"
                style={{ backgroundColor: '#fff', color: '#1C3D5A', border: '1px solid rgba(28,61,90,0.2)' }}>
                Direct Landlord Rentals
              </Link>
              <Link href="/neighborhoods" className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-80"
                style={{ backgroundColor: '#fff', color: '#1C3D5A', border: '1px solid rgba(28,61,90,0.2)' }}>
                Rentals by Neighborhood
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 text-center" style={{ backgroundColor: '#1C3D5A' }}>
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}>
            Have a Studio to Rent in Bakersfield?
          </h2>
          <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: 'rgba(247,245,240,0.8)' }}>
            List your property directly and connect with qualified tenants — no broker fees, no commissions.
          </p>
          <Link href="/list" className="px-8 py-4 rounded-full font-semibold text-sm tracking-wider uppercase transition-all hover:opacity-90"
            style={{ backgroundColor: '#C9A961', color: '#1C3D5A' }}>
            List Your Property
          </Link>
        </section>

      </main>
    </>
  )
}
