import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Stats from '@/components/Stats'
import Community from '@/components/Community'
import Niko from '@/components/Niko'
import Contact from '@/components/Contact'
import Subscribe from '@/components/Subscribe'
import { getHomepage, urlFor } from '@/lib/sanity.client'

export const metadata: Metadata = {
  title: 'Bakersfield Rental Homes | Houses & Homes For Rent in Bakersfield CA',
  description:
    'Find houses and homes for rent in Bakersfield, CA. Quality single-family rentals, pet-friendly homes, and short-term leases throughout Kern County. Trusted local property management.',
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
      <Hero heroHeadline={cms?.heroHeadline} />
      <Services
        services={cms?.services}
      />
      <Stats stats={cms?.stats} />
      <Subscribe />
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
      <Contact
        headline={cms?.contactHeadline}
        description={cms?.contactDescription}
      />
    </main>
  )
}
