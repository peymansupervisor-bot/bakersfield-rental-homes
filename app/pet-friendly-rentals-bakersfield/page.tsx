import Link from 'next/link'
import type { Metadata } from 'next'
import type { Listing } from '@/lib/supabase'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Pet Friendly Houses for Rent in Bakersfield CA',
  description:
    'Find pet-friendly rental homes in Bakersfield, CA. Browse houses that allow dogs and cats, posted directly by local landlords. No broker fees, no middlemen. Fenced yards, long-term leases.',
  keywords: [
    'pet friendly houses for rent Bakersfield CA',
    'pet friendly rentals Bakersfield',
    'dog friendly rentals Bakersfield CA',
    'houses for rent that allow pets Bakersfield',
    'pet friendly homes Bakersfield CA',
    'Bakersfield CA rentals cats allowed',
    'fenced yard rentals Bakersfield',
    'no broker fee pet friendly Bakersfield rental',
    'direct landlord pet friendly Bakersfield',
  ],
  alternates: { canonical: 'https://bakersfieldrentalhomes.com/pet-friendly-rentals-bakersfield' },
  openGraph: {
    title: 'Pet Friendly Houses for Rent in Bakersfield CA',
    description: 'Browse pet-friendly rental homes in Bakersfield, CA. No broker fees — rent directly from local landlords.',
    url: 'https://bakersfieldrentalhomes.com/pet-friendly-rentals-bakersfield',
    siteName: 'Bakersfield Rental Homes',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Pet friendly houses for rent in Bakersfield CA' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pet Friendly Houses for Rent in Bakersfield CA',
    description: 'Browse pet-friendly rental homes in Bakersfield, CA. No broker fees.',
    images: ['/opengraph-image'],
  },
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

async function getPetFriendlyListings(): Promise<Listing[]> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/listings?status=eq.active&pets_allowed=eq.true&city=eq.Bakersfield&order=created_at.desc`,
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
    { '@type': 'ListItem', position: 2, name: 'Pet Friendly Rentals Bakersfield', item: 'https://bakersfieldrentalhomes.com/pet-friendly-rentals-bakersfield' },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Are there pet-friendly houses for rent in Bakersfield CA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Many landlords on Bakersfield Rental Homes allow pets including dogs and cats. Use the Pets Allowed filter on the listings page, or browse this page for properties that explicitly welcome pets.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do landlords in Bakersfield charge a pet deposit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most landlords in Bakersfield who allow pets require an additional pet deposit or monthly pet fee. California law limits the total security deposit to two months\' rent for unfurnished units. Contact each landlord directly to confirm their pet policy and any associated fees.',
      },
    },
    {
      '@type': 'Question',
      name: 'What types of pets do Bakersfield landlords allow?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pet policies vary by landlord. Most pet-friendly rentals in Bakersfield allow small to medium dogs and cats. Some may have breed or weight restrictions. Contact the property owner directly to confirm what pets are permitted before applying.',
      },
    },
  ],
}

const BENEFITS = [
  { icon: '🐶', title: 'Dogs Welcome', body: 'Many listings welcome dogs of all sizes. Contact each landlord directly to confirm breed and weight policies.' },
  { icon: '🐱', title: 'Cats Allowed', body: 'Find homes where cats are welcome. Indoor and outdoor cats — ask each owner about their specific rules.' },
  { icon: '🌿', title: 'Fenced Yards', body: 'Browse listings with fenced backyards — ideal for pets who need a safe outdoor space.' },
  { icon: '🚫', title: 'No Broker Fees', body: 'Every listing is posted directly by the owner. No finder\'s fees or broker commissions charged to you.' },
]

export default async function PetFriendlyRentalsPage() {
  const listings = await getPetFriendlyListings()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main id="main-content">

        {/* Hero */}
        <section
          className="relative py-24 px-6 text-center overflow-hidden"
          style={{ backgroundColor: '#1C3D5A' }}
          aria-labelledby="pet-heading"
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#C9A961' }}>
            Bakersfield, CA · Dogs &amp; Cats Welcome · No Broker Fees
          </p>
          <h1
            id="pet-heading"
            className="text-4xl md:text-5xl font-bold mb-5 max-w-3xl mx-auto"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}
          >
            Pet Friendly Houses for Rent in Bakersfield CA
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-10" style={{ color: 'rgba(247,245,240,0.8)' }}>
            Browse rental homes in Bakersfield that welcome your pets — posted directly by local landlords.
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

        {/* Benefits */}
        <section className="py-20 px-6 md:px-10" style={{ backgroundColor: '#F7F5F0' }} aria-labelledby="benefits-heading">
          <h2 id="benefits-heading" className="sr-only">Why use Bakersfield Rental Homes for pet-friendly rentals</h2>
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map(b => (
              <div key={b.title} className="rounded-2xl p-6 text-center" style={{ backgroundColor: '#fff', border: '1px solid rgba(201,169,97,0.15)' }}>
                <div className="text-3xl mb-3" aria-hidden="true">{b.icon}</div>
                <h3 className="text-sm font-semibold mb-2" style={{ color: '#1C3D5A', fontFamily: 'Inter, sans-serif' }}>{b.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#555' }}>{b.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Listings */}
        <section className="py-16 px-6 md:px-10" style={{ backgroundColor: '#F7F5F0' }} aria-labelledby="listings-heading">
          <div className="max-w-5xl mx-auto">
            <h2 id="listings-heading" className="text-2xl font-bold mb-8 text-center" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              Pet Friendly Rentals Available Now
            </h2>
            {listings.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-base mb-2" style={{ color: '#555' }}>No pet-friendly listings are currently available.</p>
                <p className="text-sm mb-6" style={{ color: '#777' }}>Browse all listings and use the Pets Allowed filter, or sign up for alerts when a new pet-friendly home is posted.</p>
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
                        <div style={{ position: 'relative', paddingTop: '60%' }}>
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

        {/* CTA */}
        <section className="py-20 px-6 text-center" style={{ backgroundColor: '#1C3D5A' }}>
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}>
            Have a Pet-Friendly Property to Rent?
          </h2>
          <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: 'rgba(247,245,240,0.8)' }}>
            Listing your pet-friendly home on Bakersfield Rental Homes connects you with responsible, vetted tenants who are actively searching for properties like yours.
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
