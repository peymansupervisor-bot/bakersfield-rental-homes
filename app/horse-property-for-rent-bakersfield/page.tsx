import Link from 'next/link'
import type { Metadata } from 'next'
import type { Listing } from '@/lib/supabase'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Horse Property for Rent in Bakersfield CA | Equestrian Rentals',
  description:
    'Find horse property and equestrian rentals in Bakersfield, CA and Kern County. Rent directly from local landlords — no broker fees, no middlemen. Acreage, stalls, and fenced pastures available.',
  keywords: [
    'horse property for rent Bakersfield CA',
    'equestrian rental Bakersfield',
    'horse property rental Kern County',
    'acreage rental Bakersfield CA',
    'horse stall rental Bakersfield',
    'ranch rental Bakersfield CA',
    'rural rental Bakersfield CA',
    'pasture rental Kern County',
    'direct landlord horse property Bakersfield',
  ],
  alternates: { canonical: 'https://bakersfieldrentalhomes.com/horse-property-for-rent-bakersfield' },
  openGraph: {
    title: 'Horse Property for Rent in Bakersfield CA',
    description: 'Equestrian and horse property rentals in Bakersfield, CA. Rent directly from local landlords — no broker fees.',
    url: 'https://bakersfieldrentalhomes.com/horse-property-for-rent-bakersfield',
    siteName: 'Bakersfield Rental Homes',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Horse property for rent in Bakersfield CA' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Horse Property for Rent in Bakersfield CA',
    description: 'Equestrian and horse property rentals in Bakersfield, CA. No broker fees.',
    images: ['/opengraph-image'],
  },
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

async function getHorseListings(): Promise<Listing[]> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/listings?status=eq.active&amenities=cs.{Horse Property}&order=created_at.desc`,
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
    { '@type': 'ListItem', position: 2, name: 'Horse Property for Rent', item: 'https://bakersfieldrentalhomes.com/horse-property-for-rent-bakersfield' },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Are there horse properties for rent in Bakersfield CA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Bakersfield and Kern County have a strong equestrian tradition. Horse properties for rent in Bakersfield range from acreage with existing stalls and fenced pastures to rural lots where tenants can build their own setup. Browse current listings on this page.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I look for in a horse property rental in Bakersfield?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Key features to look for include the number of horse stalls or covered shelters, size and fencing of the pasture, water access and irrigation, proximity to riding trails or arenas, and zoning for livestock. Contact each landlord directly to confirm what animal types and numbers are permitted.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does it cost to rent a horse property in Bakersfield?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Horse property rentals in Bakersfield and Kern County typically range from $1,800 to $3,500 per month depending on acreage, number of stalls, and proximity to town. Contact landlords directly for current pricing.',
      },
    },
  ],
}

const FEATURES = [
  { icon: '🏡', title: 'Acreage & Pasture', body: 'Properties with fenced land suitable for horses, livestock, and outdoor living — from small lots to full ranch-style acreage.' },
  { icon: '🐴', title: 'Horse Stalls & Shelters', body: 'Many properties include covered stalls, run-in shelters, or barn structures. Details vary — contact landlords directly.' },
  { icon: '💧', title: 'Water & Utilities', body: 'Rural properties in Kern County often have well water or agricultural irrigation access. Confirm details with each property owner.' },
  { icon: '🚫', title: 'No Broker Fees', body: 'Every listing is posted directly by the property owner. You pay no broker commission or finder\'s fee.' },
]

export default async function HorsePropertyPage() {
  const listings = await getHorseListings()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main id="main-content">

        {/* Hero */}
        <section
          className="relative py-24 px-6 text-center overflow-hidden"
          style={{ backgroundColor: '#1C3D5A' }}
          aria-labelledby="horse-heading"
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#C9A961' }}>
            Bakersfield, CA · Kern County · No Broker Fees
          </p>
          <h1
            id="horse-heading"
            className="text-4xl md:text-5xl font-bold mb-5 max-w-3xl mx-auto"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}
          >
            Horse Property for Rent in Bakersfield CA
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-10" style={{ color: 'rgba(247,245,240,0.8)' }}>
            Equestrian and rural rentals in Bakersfield and Kern County — posted directly by local landlords.
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

        {/* Features */}
        <section className="py-20 px-6 md:px-10" style={{ backgroundColor: '#F7F5F0' }} aria-labelledby="features-heading">
          <h2 id="features-heading" className="sr-only">Why rent a horse property through Bakersfield Rental Homes</h2>
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(f => (
              <div key={f.title} className="rounded-2xl p-6 text-center" style={{ backgroundColor: '#fff', border: '1px solid rgba(201,169,97,0.15)' }}>
                <div className="text-3xl mb-3" aria-hidden="true">{f.icon}</div>
                <h3 className="text-sm font-semibold mb-2" style={{ color: '#1C3D5A', fontFamily: 'Inter, sans-serif' }}>{f.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#555' }}>{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Listings */}
        <section className="py-16 px-6 md:px-10" style={{ backgroundColor: '#F7F5F0' }} aria-labelledby="listings-heading">
          <div className="max-w-5xl mx-auto">
            <h2 id="listings-heading" className="text-2xl font-bold mb-8 text-center" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              Current Horse Property Listings
            </h2>
            {listings.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-base mb-2" style={{ color: '#555' }}>No horse properties are currently listed.</p>
                <p className="text-sm mb-6" style={{ color: '#777' }}>Browse all available rentals or sign up to be notified when a new equestrian property is posted.</p>
                <Link href="/listings" className="px-6 py-3 rounded-full font-semibold text-sm tracking-wider uppercase transition-all hover:opacity-90"
                  style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0' }}>
                  Browse All Listings
                </Link>
              </div>
            ) : (
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0 m-0">
                {listings.map(l => (
                  <li key={l.id}>
                    <Link href={`/listings/${l.slug ?? l.id}`} className="block rounded-2xl overflow-hidden transition-all hover:shadow-lg"
                      style={{ border: '1px solid rgba(201,169,97,0.2)', backgroundColor: '#fff' }}>
                      {l.photos?.[0] && (
                        <div className="relative w-full" style={{ paddingTop: '60%', position: 'relative' }}>
                          <img src={l.photos[0]} alt={l.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                        </div>
                      )}
                      <div className="p-4">
                        <p className="font-semibold text-sm mb-1" style={{ color: '#1C3D5A' }}>{l.title}</p>
                        <p className="text-xs mb-2" style={{ color: '#777' }}>{l.address}</p>
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

        {/* Related searches */}
        <section className="py-14 px-6 md:px-10" style={{ backgroundColor: '#F7F5F0' }} aria-labelledby="related-heading">
          <div className="max-w-3xl mx-auto text-center">
            <h2 id="related-heading" className="text-xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              More Rental Searches in Bakersfield
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/pet-friendly-rentals-bakersfield" className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-80"
                style={{ backgroundColor: '#fff', color: '#1C3D5A', border: '1px solid rgba(28,61,90,0.2)' }}>
                Pet Friendly Rentals
              </Link>
              <Link href="/3-bedroom-houses-for-rent-bakersfield" className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-80"
                style={{ backgroundColor: '#fff', color: '#1C3D5A', border: '1px solid rgba(28,61,90,0.2)' }}>
                3 Bedroom Houses
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
            Have a Horse Property to Rent?
          </h2>
          <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: 'rgba(247,245,240,0.8)' }}>
            List your equestrian property directly and connect with qualified tenants — no broker fees, no middlemen.
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
