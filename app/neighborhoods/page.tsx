import Link from 'next/link'
import type { Metadata } from 'next'
import { NEIGHBORHOODS } from '@/lib/neighborhoods'

export const metadata: Metadata = {
  title: 'Bakersfield Neighborhoods | Find Rentals by Area',
  description:
    'Browse direct landlord rentals by neighborhood in Bakersfield, CA. Northwest, Southwest, Rosedale, East Bakersfield, and Oleander-Sunset — no broker fees, no middlemen.',
  keywords: [
    'Bakersfield neighborhoods for rent',
    'rent by neighborhood Bakersfield CA',
    'best areas to rent in Bakersfield',
    'Bakersfield rental areas',
    'direct landlord rentals Bakersfield neighborhoods',
  ],
  alternates: { canonical: 'https://bakersfieldrentalhomes.com/neighborhoods' },
  openGraph: {
    title: 'Bakersfield Neighborhoods | Find Rentals by Area',
    description: 'Direct landlord rentals by neighborhood in Bakersfield, CA. No broker fees.',
    url: 'https://bakersfieldrentalhomes.com/neighborhoods',
    siteName: 'Bakersfield Rental Homes',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Bakersfield rental neighborhoods' }],
    type: 'website',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bakersfieldrentalhomes.com' },
    { '@type': 'ListItem', position: 2, name: 'Neighborhoods', item: 'https://bakersfieldrentalhomes.com/neighborhoods' },
  ],
}

export default function NeighborhoodsIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main id="main-content" className="max-w-5xl mx-auto px-6 py-16">
      <div className="text-center mb-14">
        <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7d6019' }}>
          Direct from Landlords · No Broker Fees
        </p>
        <h1
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}
        >
          Bakersfield Rentals by Neighborhood
        </h1>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: '#2B2B2B' }}>
          Find houses for rent directly from local landlords across Bakersfield, CA.
          Choose your neighborhood to see available homes with no middlemen and no broker fees.
        </p>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6" role="list">
        {NEIGHBORHOODS.map(hood => (
          <li key={hood.slug}>
            <Link href={`/neighborhoods/${hood.slug}`} className="block group">
              <article
                className="h-full rounded-2xl p-7 transition-shadow duration-300 hover:shadow-lg"
                style={{ backgroundColor: '#F7F5F0', border: '1px solid rgba(201,169,97,0.15)' }}
              >
                <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: '#7d6019' }}>
                  {hood.zips.join(' · ')}
                </p>
                <h2
                  className="text-xl font-bold mb-2 group-hover:text-[#C9A961] transition-colors duration-200"
                  style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}
                >
                  {hood.name}
                </h2>
                <p className="text-sm mb-5 leading-relaxed" style={{ color: '#2B2B2B' }}>
                  {hood.tagline}
                </p>
                <div className="flex flex-wrap gap-2">
                  {hood.highlights.slice(0, 3).map(h => (
                    <span
                      key={h}
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: 'rgba(28,61,90,0.07)', color: '#1C3D5A' }}
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </article>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-12 text-center">
        <Link
          href="/listings"
          className="inline-block px-8 py-3 rounded-full text-sm font-semibold transition-opacity hover:opacity-80"
          style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0' }}
        >
          Browse All Listings
        </Link>
      </div>
      </main>
    </>
  )
}
