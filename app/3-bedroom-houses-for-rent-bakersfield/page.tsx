import Link from 'next/link'
import type { Metadata } from 'next'
import type { Listing } from '@/lib/supabase'

export const revalidate = 60

export const metadata: Metadata = {
  title: '3 Bedroom Houses for Rent in Bakersfield CA',
  description:
    'Find 3 bedroom houses for rent in Bakersfield, CA. Browse 3-bed rental homes posted directly by local landlords — no broker fees, no middlemen. Single-family homes, pet-friendly options, and long-term leases in Kern County.',
  keywords: [
    '3 bedroom houses for rent Bakersfield CA',
    '3 bed homes for rent Bakersfield',
    'three bedroom rental Bakersfield CA',
    '3 bedroom rental Kern County',
    '3 bedroom home for rent Bakersfield CA',
    'three bed house Bakersfield no broker fee',
    'direct landlord 3 bedroom Bakersfield',
    'single family 3 bedroom Bakersfield rental',
  ],
  alternates: { canonical: 'https://bakersfieldrentalhomes.com/3-bedroom-houses-for-rent-bakersfield' },
  openGraph: {
    title: '3 Bedroom Houses for Rent in Bakersfield CA',
    description: 'Browse 3-bedroom rental homes in Bakersfield, CA. Rent directly from local landlords — no broker fees.',
    url: 'https://bakersfieldrentalhomes.com/3-bedroom-houses-for-rent-bakersfield',
    siteName: 'Bakersfield Rental Homes',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: '3 bedroom houses for rent in Bakersfield CA' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '3 Bedroom Houses for Rent in Bakersfield CA',
    description: 'Browse 3-bedroom rental homes in Bakersfield, CA. No broker fees.',
    images: ['/opengraph-image'],
  },
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

async function get3BedListings(): Promise<Listing[]> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/listings?status=eq.active&bedrooms=eq.3&city=eq.Bakersfield&order=created_at.desc`,
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
    { '@type': 'ListItem', position: 2, name: '3 Bedroom Houses for Rent Bakersfield', item: 'https://bakersfieldrentalhomes.com/3-bedroom-houses-for-rent-bakersfield' },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does a 3 bedroom house cost to rent in Bakersfield CA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'As of 2026, 3-bedroom houses for rent in Bakersfield, CA typically range from $1,500 to $2,200 per month depending on neighborhood, condition, and amenities. Bakersfield remains one of California\'s most affordable rental markets. Browse current listings for up-to-date pricing.',
      },
    },
    {
      '@type': 'Question',
      name: 'What neighborhoods in Bakersfield have 3 bedroom homes for rent?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '3-bedroom rental homes are available across Bakersfield including Northwest Bakersfield, Southwest Bakersfield, Rosedale, East Bakersfield, and the Oleander-Sunset area. Each neighborhood has different price points and character — browse listings and filter by zip code to find the right fit.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there pet-friendly 3 bedroom rentals in Bakersfield?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Several 3-bedroom rentals in Bakersfield allow pets. Use the Pets Allowed filter on our listings page, or contact landlords directly to confirm their pet policy.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to pay a broker fee to rent a 3-bedroom home in Bakersfield?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not through Bakersfield Rental Homes. Every listing is posted directly by the property owner. There are no broker commissions or finder\'s fees charged to tenants.',
      },
    },
  ],
}

const STATS = [
  { value: '3 Beds', label: 'Ideal for families and roommates' },
  { value: '$1,500–$2,200', label: 'Typical monthly rent range' },
  { value: 'No Fees', label: 'Rent direct from the owner' },
  { value: 'All Areas', label: 'Every Bakersfield neighborhood' },
]

export default async function ThreeBedPage() {
  const listings = await get3BedListings()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main id="main-content">

        {/* Hero */}
        <section
          className="relative py-24 px-6 text-center overflow-hidden"
          style={{ backgroundColor: '#1C3D5A' }}
          aria-labelledby="three-bed-heading"
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#C9A961' }} aria-hidden="true">
            Bakersfield, CA · No Broker Fees · Direct from Owner
          </p>
          <h1
            id="three-bed-heading"
            className="text-4xl md:text-5xl font-bold mb-5 max-w-3xl mx-auto"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}
          >
            3 Bedroom Houses for Rent in Bakersfield CA
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-10" style={{ color: 'rgba(247,245,240,0.8)' }}>
            Browse 3-bedroom rental homes across Bakersfield — posted directly by local landlords.
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
        <section className="py-14 px-6 md:px-10" style={{ backgroundColor: '#F7F5F0' }} aria-label="Key facts about 3-bedroom rentals in Bakersfield">
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
              3-Bedroom Rentals Available Now
            </h2>
            {listings.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-base mb-2" style={{ color: '#555' }}>No 3-bedroom listings are currently available.</p>
                <p className="text-sm mb-6" style={{ color: '#595959' }}>Browse all listings and filter by bedrooms, or sign up for alerts when a new 3-bedroom home is posted.</p>
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
                          <img src={l.photos[0]} alt="" role="presentation" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
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
              <Link href="/blog/average-rent-bakersfield-2026" className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-80"
                style={{ backgroundColor: '#fff', color: '#1C3D5A', border: '1px solid rgba(28,61,90,0.2)' }}>
                Average Rent Guide 2026
              </Link>
              <Link href="/2-bedroom-houses-for-rent-bakersfield" className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-80"
                style={{ backgroundColor: '#fff', color: '#1C3D5A', border: '1px solid rgba(28,61,90,0.2)' }}>
                2 Bedroom Rentals
              </Link>
              <Link href="/4-bedroom-houses-for-rent-bakersfield" className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-80"
                style={{ backgroundColor: '#fff', color: '#1C3D5A', border: '1px solid rgba(28,61,90,0.2)' }}>
                4 Bedroom Rentals
              </Link>
              <Link href="/pet-friendly-rentals-bakersfield" className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-80"
                style={{ backgroundColor: '#fff', color: '#1C3D5A', border: '1px solid rgba(28,61,90,0.2)' }}>
                Pet Friendly Rentals
              </Link>
              <Link href="/horse-property-for-rent-bakersfield" className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-80"
                style={{ backgroundColor: '#fff', color: '#1C3D5A', border: '1px solid rgba(28,61,90,0.2)' }}>
                Horse Property Rentals
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
            Have a 3-Bedroom Home to Rent?
          </h2>
          <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: 'rgba(247,245,240,0.8)' }}>
            List your home directly and connect with qualified tenants in Bakersfield — no broker fees, no commissions.
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
