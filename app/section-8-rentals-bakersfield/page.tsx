import Link from 'next/link'
import type { Metadata } from 'next'
import type { Listing } from '@/lib/supabase'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Section 8 Rentals in Bakersfield CA | Housing Voucher Accepted',
  description:
    'Find Section 8 rentals in Bakersfield, CA. Browse houses for rent that accept Housing Choice Vouchers — posted directly by local landlords. No broker fees. Kern County Housing Authority approved properties.',
  keywords: [
    'section 8 rentals Bakersfield CA',
    'section 8 houses for rent Bakersfield',
    'housing voucher rentals Bakersfield CA',
    'housing choice voucher Bakersfield',
    'HCV rentals Bakersfield CA',
    'KCHA approved rentals Bakersfield',
    'Kern County Housing Authority rentals',
    'section 8 landlords Bakersfield CA',
    'low income rentals Bakersfield CA',
    'affordable housing Bakersfield CA',
    'section 8 accepted houses Bakersfield',
    'housing assistance rentals Bakersfield',
  ],
  alternates: { canonical: 'https://bakersfieldrentalhomes.com/section-8-rentals-bakersfield' },
  openGraph: {
    title: 'Section 8 Rentals in Bakersfield CA | Housing Voucher Accepted',
    description: 'Browse Section 8 / Housing Choice Voucher rentals in Bakersfield, CA. Rent directly from local landlords — no broker fees.',
    url: 'https://bakersfieldrentalhomes.com/section-8-rentals-bakersfield',
    siteName: 'Bakersfield Rental Homes',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Section 8 rentals in Bakersfield CA' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Section 8 Rentals in Bakersfield CA | Housing Voucher Accepted',
    description: 'Browse Section 8 / Housing Choice Voucher rentals in Bakersfield, CA. No broker fees.',
    images: ['/opengraph-image'],
  },
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

async function getSection8Listings(): Promise<Listing[]> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/listings?status=eq.active&city=eq.Bakersfield&section_8=eq.true&order=featured.desc,created_at.desc`,
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
    { '@type': 'ListItem', position: 2, name: 'Listings', item: 'https://bakersfieldrentalhomes.com/listings' },
    { '@type': 'ListItem', position: 3, name: 'Section 8 Rentals Bakersfield', item: 'https://bakersfieldrentalhomes.com/section-8-rentals-bakersfield' },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Section 8 housing in Bakersfield CA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Section 8 is the federal Housing Choice Voucher (HCV) program administered locally by the Kern County Housing Authority (KCHA). It helps low-income families, seniors, and disabled individuals pay rent by covering a portion of the monthly rent directly to the landlord. Tenants pay the difference between the actual rent and the voucher amount.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I apply for Section 8 in Bakersfield CA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Applications for the Housing Choice Voucher program in Bakersfield are handled by the Kern County Housing Authority at 601 24th Street, Bakersfield, CA 93301. You can call them at (661) 631-8500. Note that the waiting list is often closed — check kernha.org for current status.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I find Section 8 landlords in Bakersfield?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Browse listings on this page — these are Bakersfield landlords who accept Housing Choice Vouchers. You can also search the KCHA\'s approved landlord list or use the HUD resource locator at hud.gov. When contacting a landlord, let them know upfront that you have a housing voucher so they can confirm their property qualifies.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a landlord refuse Section 8 in California?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Since 2020, California law (SB 329) prohibits landlords from refusing to rent to tenants because they have a Section 8 or housing voucher. Source of income is a protected class in California. Landlords who list on this page have agreed to accept vouchers.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the payment standards for Section 8 in Bakersfield CA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Kern County Housing Authority sets Fair Market Rents (FMR) that determine how much the voucher covers. As of 2025, FMRs for Bakersfield are approximately $1,100–$1,300 for a 1-bedroom, $1,350–$1,600 for a 2-bedroom, and $1,750–$2,100 for a 3-bedroom. Contact KCHA at (661) 631-8500 for current payment standards.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to rent a home with a Section 8 voucher in Bakersfield?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Once you have your voucher, you typically have 60–120 days to find a unit. KCHA must inspect and approve the property before you can move in — this inspection usually takes 1–2 weeks after a landlord agrees to rent to you. Finding a willing landlord quickly is the most important step.',
      },
    },
  ],
}

const STATS = [
  { value: 'Vouchers OK', label: 'Housing Choice Vouchers accepted' },
  { value: 'No Broker Fee', label: 'Rent direct from the owner' },
  { value: 'KCHA Eligible', label: 'Kern County Housing Authority area' },
  { value: 'CA Law', label: 'Landlords cannot refuse vouchers in CA' },
]

const HOW_IT_WORKS = [
  {
    step: '1',
    title: 'Get Your Voucher',
    body: 'Apply through the Kern County Housing Authority (KCHA). Once approved, you\'ll receive a voucher that covers a portion of your rent.',
  },
  {
    step: '2',
    title: 'Find a Listing',
    body: 'Browse the listings on this page. These landlords accept housing vouchers. Contact them directly — no middleman.',
  },
  {
    step: '3',
    title: 'Schedule a KCHA Inspection',
    body: 'Once a landlord agrees, KCHA inspects the unit to make sure it meets HUD housing quality standards. This usually takes 1–2 weeks.',
  },
  {
    step: '4',
    title: 'Move In',
    body: 'After KCHA approves the unit, you sign your lease. KCHA pays the landlord directly each month. You pay only your share.',
  },
]

export default async function Section8Page() {
  const listings = await getSection8Listings()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main id="main-content">

        {/* Hero */}
        <section
          className="relative py-24 px-6 text-center overflow-hidden"
          style={{ backgroundColor: '#1C3D5A' }}
          aria-labelledby="section8-heading"
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#C9A961' }} aria-hidden="true">
            Bakersfield, CA · Housing Choice Vouchers Welcome · Kern County
          </p>
          <h1
            id="section8-heading"
            className="text-4xl md:text-5xl font-bold mb-5 max-w-3xl mx-auto"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}
          >
            Section 8 Rentals in Bakersfield CA
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-4" style={{ color: 'rgba(247,245,240,0.8)' }}>
            Browse houses for rent in Bakersfield that accept Housing Choice Vouchers — posted directly by local landlords.
            No broker fees, no middlemen.
          </p>
          <p className="text-sm max-w-xl mx-auto mb-10" style={{ color: 'rgba(247,245,240,0.55)' }}>
            Under California law (SB 329), landlords cannot refuse to rent to tenants with a housing voucher.
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
              href="/landlords"
              className="px-7 py-3.5 rounded-full font-semibold text-sm tracking-wider uppercase transition-all hover:opacity-90"
              style={{ backgroundColor: 'transparent', color: '#F7F5F0', border: '1px solid rgba(247,245,240,0.4)' }}
            >
              I'm a Landlord
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section className="py-14 px-6 md:px-10" style={{ backgroundColor: '#F7F5F0' }} aria-label="Key facts about Section 8 rentals in Bakersfield">
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
            <h2 id="listings-heading" className="text-2xl font-bold mb-3 text-center" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              Section 8 Rentals Available Now
            </h2>
            <p className="text-sm text-center mb-8" style={{ color: '#616161' }}>
              These landlords have indicated they accept Housing Choice Vouchers. Contact them directly to confirm availability and start the KCHA approval process.
            </p>
            {listings.length === 0 ? (
              <div className="text-center py-16 rounded-2xl" style={{ backgroundColor: '#fff', border: '1px solid rgba(201,169,97,0.15)' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(201,169,97,0.1)' }}>
                  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                    <path d="M16 4L28 10V28H20V22H12V28H4V10L16 4Z" fill="#C9A961" opacity="0.5"/>
                  </svg>
                </div>
                <p className="text-base font-semibold mb-2" style={{ color: '#1C3D5A' }}>No Section 8 listings posted yet</p>
                <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: '#595959' }}>
                  Browse all listings and contact landlords directly — under California law, they cannot refuse your voucher.
                </p>
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
                      aria-label={`View listing: ${l.title} — ${l.address} — $${l.monthly_rent.toLocaleString()}/mo — Section 8 accepted`}
                      className="block rounded-2xl overflow-hidden transition-all hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A961]"
                      style={{ border: '1px solid rgba(201,169,97,0.2)', backgroundColor: '#fff' }}>
                      {l.photos?.[0] && (
                        <div style={{ position: 'relative', paddingTop: '60%' }}>
                          <img
                            src={l.photos[0]}
                            alt={`${l.title} — ${l.bedrooms === 0 ? 'Studio' : `${l.bedrooms} bed`} house for rent in ${l.city}, CA — Section 8 accepted`}
                            className="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full tracking-widest uppercase"
                            style={{ backgroundColor: 'rgba(45,122,79,0.1)', color: '#2D7A4F' }}>
                            ✓ Section 8 OK
                          </span>
                        </div>
                        <p className="font-semibold text-sm mb-1" style={{ color: '#1C3D5A' }}>{l.title}</p>
                        <p className="text-xs mb-2" style={{ color: '#595959' }}>{l.address}, {l.city}, CA</p>
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-sm" style={{ color: '#C9A961' }}>${l.monthly_rent.toLocaleString()}/mo</p>
                          <p className="text-xs" style={{ color: '#595959' }}>
                            {l.bedrooms === 0 ? 'Studio' : `${l.bedrooms} BD`} · {l.bathrooms} BA
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 px-6 md:px-10" style={{ backgroundColor: '#fff' }} aria-labelledby="how-it-works-heading">
          <div className="max-w-4xl mx-auto">
            <h2 id="how-it-works-heading" className="text-2xl font-bold mb-3 text-center" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              How Section 8 Works in Bakersfield
            </h2>
            <p className="text-sm text-center mb-10 max-w-xl mx-auto" style={{ color: '#616161' }}>
              The Housing Choice Voucher program pays landlords directly — you only pay your share of the rent.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {HOW_IT_WORKS.map(item => (
                <div key={item.step} className="flex gap-4 p-5 rounded-2xl" style={{ border: '1px solid rgba(201,169,97,0.15)', backgroundColor: '#F7F5F0' }}>
                  <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm"
                    style={{ backgroundColor: '#1C3D5A', color: '#C9A961' }}>
                    {item.step}
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-1" style={{ color: '#1C3D5A' }}>{item.title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: '#595959' }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* KCHA contact info */}
        <section className="py-14 px-6 md:px-10" style={{ backgroundColor: '#F7F5F0' }} aria-labelledby="kcha-heading">
          <div className="max-w-2xl mx-auto text-center">
            <h2 id="kcha-heading" className="text-xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              Kern County Housing Authority (KCHA)
            </h2>
            <p className="text-sm mb-6" style={{ color: '#595959' }}>
              The KCHA administers the Housing Choice Voucher program for Bakersfield and Kern County.
            </p>
            <div className="inline-flex flex-col gap-3 text-sm p-6 rounded-2xl text-left"
              style={{ backgroundColor: '#fff', border: '1px solid rgba(201,169,97,0.2)' }}>
              <div className="flex items-start gap-3">
                <span style={{ color: '#C9A961' }}>📍</span>
                <span style={{ color: '#2B2B2B' }}>601 24th Street, Bakersfield, CA 93301</span>
              </div>
              <div className="flex items-start gap-3">
                <span style={{ color: '#C9A961' }}>📞</span>
                <span style={{ color: '#2B2B2B' }}>(661) 631-8500</span>
              </div>
              <div className="flex items-start gap-3">
                <span style={{ color: '#C9A961' }}>🌐</span>
                <span style={{ color: '#2B2B2B' }}>kernha.org</span>
              </div>
              <div className="flex items-start gap-3">
                <span style={{ color: '#C9A961' }}>🕐</span>
                <span style={{ color: '#2B2B2B' }}>Mon–Fri, 8:00 AM – 5:00 PM</span>
              </div>
            </div>
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
              <Link href="/listings" className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-80"
                style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0' }}>
                All Listings
              </Link>
              <Link href="/2-bedroom-houses-for-rent-bakersfield" className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-80"
                style={{ backgroundColor: '#fff', color: '#1C3D5A', border: '1px solid rgba(28,61,90,0.2)' }}>
                2 Bedroom Rentals
              </Link>
              <Link href="/3-bedroom-houses-for-rent-bakersfield" className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-80"
                style={{ backgroundColor: '#fff', color: '#1C3D5A', border: '1px solid rgba(28,61,90,0.2)' }}>
                3 Bedroom Rentals
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
              <Link href="/blog/tenant-rights-california-2026" className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-80"
                style={{ backgroundColor: '#fff', color: '#1C3D5A', border: '1px solid rgba(28,61,90,0.2)' }}>
                Tenant Rights Guide
              </Link>
            </div>
          </div>
        </section>

        {/* Landlord CTA */}
        <section className="py-20 px-6 text-center" style={{ backgroundColor: '#1C3D5A' }}>
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}>
            Landlord? Accept Section 8 Tenants.
          </h2>
          <p className="text-base mb-3 max-w-xl mx-auto" style={{ color: 'rgba(247,245,240,0.8)' }}>
            Housing voucher tenants are reliable — KCHA pays their portion of rent directly to you every month. List your Bakersfield property and reach this large, underserved community.
          </p>
          <p className="text-sm mb-8 max-w-lg mx-auto" style={{ color: 'rgba(247,245,240,0.55)' }}>
            Under California SB 329, you are already required to accept vouchers. List your property and let tenants find you.
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
