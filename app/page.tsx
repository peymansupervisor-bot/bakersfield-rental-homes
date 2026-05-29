import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Stats from '@/components/Stats'
import Community from '@/components/Community'
import Niko from '@/components/Niko'
import Contact from '@/components/Contact'

export const metadata: Metadata = {
  title: 'Bakersfield Rental Homes | Houses & Homes For Rent in Bakersfield CA',
  description:
    'Find houses and homes for rent in Bakersfield, CA. Quality single-family rentals, pet-friendly homes, and short-term leases throughout Kern County. Trusted local property management.',
  alternates: {
    canonical: 'https://bakersfieldrentalhomes.com',
  },
}

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <Services />
      <Stats />
      <Community />
      <Niko />
      <Contact />
    </main>
  )
}
