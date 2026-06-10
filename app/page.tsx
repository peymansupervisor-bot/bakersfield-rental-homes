import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Stats from '@/components/Stats'
import Community from '@/components/Community'
import Niko from '@/components/Niko'
import Picasso from '@/components/Picasso'
import Contact from '@/components/Contact'
import Subscribe from '@/components/Subscribe'
import { getHomepage, urlFor } from '@/lib/sanity.client'

export const metadata: Metadata = {
  title: 'Bakersfield Rental Homes | Houses & Homes For Rent in Bakersfield CA',
  description:
    'Find houses and homes for rent in Bakersfield, CA. Browse listings posted directly by local landlords — no broker fees, no middlemen. Single-family homes and pet-friendly rentals in Kern County.',
  keywords: [
    'houses for rent Bakersfield CA',
    'homes for rent Bakersfield California',
    'Bakersfield rental homes',
    'direct landlord rentals Bakersfield',
    'no broker fee rentals Bakersfield',
    'pet friendly rentals Bakersfield CA',
    '3 bedroom houses for rent Bakersfield CA',
    'horse property for rent Bakersfield CA',
    'Kern County rental homes',
    'rent from owner Bakersfield CA',
    'single family homes for rent Bakersfield',
    'long term rentals Bakersfield CA',
  ],
  alternates: { canonical: 'https://bakersfieldrentalhomes.com' },
}

export default async function Home() {
  const cms = await getHomepage()

  // Niko photos: use Sanity images if available, otherwise fallback to local
  const nikoAltDefaults = [
    'Niko the dog relaxing in a fenced backyard at a pet-friendly Bakersfield rental home',
    'Niko lounging inside a well-maintained Bakersfield rental house',
    'Niko sitting on the front porch of a rental home in Bakersfield, CA',
    'Niko exploring a tree-lined Bakersfield neighborhood near rental properties',
  ]
  const nikoPhotos = cms?.nikoPhotos?.length
    ? cms.nikoPhotos.map((img: any, i: number) => ({
        src: urlFor(img).width(800).url(),
        alt: img.alt || nikoAltDefaults[i] || `Niko at a Bakersfield rental property — photo ${i + 1}`,
      }))
    : undefined

  return (
    <main id="main-content">
      <Hero heroHeadline={'Real landlords.\nReal listings.\nNo broker fees.'} />
      <Services
        services={cms?.services}
      />
      <Stats stats={cms?.stats} />
      <Subscribe />

      {/* Popular searches — internal linking hub for SEO */}
      <section className="py-14 px-6 md:px-10" style={{ backgroundColor: '#F7F5F0' }} aria-labelledby="popular-searches-heading">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#8a6d1f', letterSpacing: '0.2em' }}>
            Popular Searches
          </p>
          <h2 id="popular-searches-heading" className="text-2xl font-bold mb-7"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
            Find the Right Rental in Bakersfield
          </h2>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-3">
            <Link href="/listings" className="px-4 py-2 rounded-full text-sm font-semibold text-center transition-all hover:opacity-80"
              style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0' }}>
              All Rentals
            </Link>
            <Link href="/studio-for-rent-bakersfield" className="px-4 py-2 rounded-full text-sm font-semibold text-center transition-all hover:opacity-80"
              style={{ backgroundColor: '#fff', color: '#1C3D5A', border: '1px solid rgba(28,61,90,0.2)' }}>
              Studios
            </Link>
            <Link href="/1-bedroom-houses-for-rent-bakersfield" className="px-4 py-2 rounded-full text-sm font-semibold text-center transition-all hover:opacity-80"
              style={{ backgroundColor: '#fff', color: '#1C3D5A', border: '1px solid rgba(28,61,90,0.2)' }}>
              1 Bedroom Houses
            </Link>
            <Link href="/pet-friendly-rentals-bakersfield" className="px-4 py-2 rounded-full text-sm font-semibold text-center transition-all hover:opacity-80"
              style={{ backgroundColor: '#fff', color: '#1C3D5A', border: '1px solid rgba(28,61,90,0.2)' }}>
              Pet Friendly Rentals
            </Link>
            <Link href="/3-bedroom-houses-for-rent-bakersfield" className="px-4 py-2 rounded-full text-sm font-semibold text-center transition-all hover:opacity-80"
              style={{ backgroundColor: '#fff', color: '#1C3D5A', border: '1px solid rgba(28,61,90,0.2)' }}>
              3 Bedroom Houses
            </Link>
            <Link href="/horse-property-for-rent-bakersfield" className="px-4 py-2 rounded-full text-sm font-semibold text-center transition-all hover:opacity-80"
              style={{ backgroundColor: '#fff', color: '#1C3D5A', border: '1px solid rgba(28,61,90,0.2)' }}>
              Horse Property Rentals
            </Link>
            <Link href="/direct-landlord-rentals" className="px-4 py-2 rounded-full text-sm font-semibold text-center transition-all hover:opacity-80"
              style={{ backgroundColor: '#fff', color: '#1C3D5A', border: '1px solid rgba(28,61,90,0.2)' }}>
              Direct Landlord Rentals
            </Link>
            <Link href="/neighborhoods" className="px-4 py-2 rounded-full text-sm font-semibold text-center transition-all hover:opacity-80"
              style={{ backgroundColor: '#fff', color: '#1C3D5A', border: '1px solid rgba(28,61,90,0.2)' }}>
              Rentals by Neighborhood
            </Link>
          </div>
        </div>
      </section>

      <Community
        headline={cms?.communityHeadline}
        description={cms?.communityDescription}
        facebookUrl={cms?.facebookUrl}
      />
      <Niko
        headline={cms?.nikoHeadline}
        description={cms?.nikoDescription}
        photos={nikoPhotos}
        cards={cms?.nikoCards}
      />
      <Picasso />
      <Contact
        headline={cms?.contactHeadline}
        description={cms?.contactDescription}
      />
    </main>
  )
}
