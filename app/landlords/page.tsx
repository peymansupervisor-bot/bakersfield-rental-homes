import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'List Your Bakersfield Rental Free | For Landlords — No Broker Fees',
  description: 'List your Bakersfield rental property for free on BakersfieldRentalHomes.com. No broker fees, no middlemen — tenants contact you directly. Identity-verified landlords only. Takes 8 minutes.',
  keywords: [
    'list rental property Bakersfield CA',
    'advertise rental home Bakersfield',
    'free rental listing Bakersfield CA',
    'landlord Bakersfield CA',
    'rent out house Bakersfield CA',
    'post rental listing Bakersfield',
    'Bakersfield property management free listing',
  ],
  alternates: { canonical: 'https://bakersfieldrentalhomes.com/landlords' },
  openGraph: {
    title: 'List Your Bakersfield Rental Free — Tenants Contact You Directly',
    description: 'Free listings for Bakersfield landlords. No broker fees, no middlemen. Takes 8 minutes. Identity-verified landlords only.',
    url: 'https://bakersfieldrentalhomes.com/landlords',
    siteName: 'Bakersfield Rental Homes',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'List your Bakersfield rental free' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'List Your Bakersfield Rental Free',
    description: 'No broker fees, no middlemen. Tenants contact you directly. Takes 8 minutes.',
    images: ['/opengraph-image'],
  },
}

const BENEFITS = [
  {
    icon: '🆓',
    title: 'Completely Free to List',
    body: 'No setup fees, no monthly subscription, no commission. Posting your rental costs nothing.',
  },
  {
    icon: '📞',
    title: 'Tenants Contact You Directly',
    body: 'Your phone and email go straight on your listing. No middleman, no approval queue — renters call you.',
  },
  {
    icon: '✅',
    title: 'Identity-Verified Landlords Only',
    body: 'Every landlord is verified before going live. That keeps scammers out and makes your listing more trustworthy.',
  },
  {
    icon: '⚡',
    title: 'Live in Under 8 Minutes',
    body: 'Fill out the form, upload photos, verify your identity — your listing is live the same day.',
  },
  {
    icon: '🎯',
    title: 'Bakersfield Renters Only',
    body: 'We focus exclusively on Bakersfield and Kern County. Every visitor is looking to rent locally — no noise from other markets.',
  },
  {
    icon: '🔍',
    title: 'Built for Search Engines',
    body: 'Every listing gets its own page optimized for Google. Renters searching "3 bedroom for rent Bakersfield" can find your home.',
  },
]

const NICHES = [
  {
    title: 'Insurance & ALE Housing',
    description: 'Insurance companies relocating displaced families often pay 2× market rent for 3–6 month furnished placements. Your listing reaches adjusters searching for exactly this.',
    href: '/insurance-housing-bakersfield',
    color: '#1C3D5A',
  },
  {
    title: 'Travel Nurse Housing',
    description: 'Kern Medical, Adventist Health, and Dignity Health bring dozens of traveling nurses to Bakersfield on 13-week contracts. They need furnished homes and pay a premium.',
    href: '/travel-nurse-housing-bakersfield',
    color: '#2a5278',
  },
  {
    title: 'Bakersfield Condors Players',
    description: 'AHL hockey players need housing October through May. Many prefer furnished single-family homes and have generous housing budgets — especially two-way NHL players.',
    href: '/bakersfield-condors-player-housing',
    color: '#1C3D5A',
  },
]

const VS = [
  { feature: 'Listing fee', us: 'Free', zillow: '$29–$299/mo', craigslist: 'Free (expires)' },
  { feature: 'Tenant contacts you directly', us: '✓', zillow: 'Via Zillow inbox', craigslist: '✓' },
  { feature: 'Listing stays live', us: 'Until rented', zillow: 'While paid', craigslist: '30 days then re-post' },
  { feature: 'Bakersfield-specific', us: '✓', zillow: '✗', craigslist: '✗' },
  { feature: 'Identity-verified landlords', us: '✓', zillow: '✗', craigslist: '✗' },
  { feature: 'Niche tenant traffic (ALE, nurses, hockey)', us: '✓', zillow: '✗', craigslist: '✗' },
]

const STEPS = [
  { n: 1, title: 'Property Details', body: 'Address, bedrooms, bathrooms, rent, deposit, lease term. Takes about 2 minutes.' },
  { n: 2, title: 'Description & Amenities', body: 'Write a short description and check off your amenities. Takes about 3 minutes.' },
  { n: 3, title: 'Upload Photos', body: 'At least 10 photos. Drag & drop or select from your phone. Takes about 2 minutes.' },
  { n: 4, title: 'Verify & Publish', body: 'A quick free selfie + ID scan confirms you\'re a real landlord. Your listing goes live immediately.' },
]

export default function LandlordsPage() {
  return (
    <main id="main-content" className="min-h-screen" style={{ backgroundColor: '#F7F5F0' }}>

      {/* Hero */}
      <section
        className="py-24 px-6 text-center"
        style={{ background: 'linear-gradient(160deg, #1C3D5A 0%, #2a5278 60%, #1C3D5A 100%)' }}
        aria-labelledby="hero-heading"
      >
        <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#C9A961', letterSpacing: '0.2em' }}>
          For Bakersfield Landlords
        </p>
        <h1 id="hero-heading" className="text-4xl md:text-5xl font-bold mb-5 leading-tight"
          style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}>
          List Your Rental Free.<br />Tenants Contact You Directly.
        </h1>
        <p className="text-base max-w-xl mx-auto mb-10" style={{ color: 'rgba(247,245,240,0.82)' }}>
          No broker fees. No middlemen. No monthly subscription. Post your Bakersfield home and start hearing from renters today — it takes 8 minutes.
        </p>
        <Link
          href="/list"
          className="inline-block px-10 py-4 rounded-2xl text-sm font-bold tracking-widest uppercase transition-all hover:opacity-90"
          style={{ backgroundColor: '#C9A961', color: '#1C3D5A', letterSpacing: '0.14em' }}
        >
          List My Property — Free →
        </Link>
        <p className="text-xs mt-4" style={{ color: 'rgba(247,245,240,0.5)' }}>
          Identity-verified landlords only · No credit card required
        </p>
      </section>

      {/* Benefits grid */}
      <section className="max-w-5xl mx-auto px-6 py-20" aria-labelledby="benefits-heading">
        <h2 id="benefits-heading" className="text-3xl font-bold text-center mb-3"
          style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
          Why Landlords Choose Us
        </h2>
        <p className="text-center text-sm mb-12" style={{ color: '#595959' }}>
          Built by a Bakersfield landlord, for Bakersfield landlords.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map(b => (
            <div key={b.title} className="bg-white rounded-2xl p-6"
              style={{ border: '1px solid rgba(201,169,97,0.15)' }}>
              <div className="text-2xl mb-3" aria-hidden="true">{b.icon}</div>
              <h3 className="text-base font-bold mb-2" style={{ color: '#1C3D5A' }}>{b.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#595959' }}>{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6" style={{ backgroundColor: '#1C3D5A' }} aria-labelledby="how-heading">
        <div className="max-w-4xl mx-auto">
          <h2 id="how-heading" className="text-3xl font-bold text-center mb-3"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}>
            How to List — 4 Steps
          </h2>
          <p className="text-center text-sm mb-12" style={{ color: 'rgba(247,245,240,0.7)' }}>
            From start to live listing in about 8 minutes
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map(s => (
              <div key={s.n} className="text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4"
                  style={{ backgroundColor: '#C9A961', color: '#1C3D5A' }}>
                  {s.n}
                </div>
                <h3 className="text-sm font-bold mb-2" style={{ color: '#F7F5F0' }}>{s.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(247,245,240,0.7)' }}>{s.body}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/list"
              className="inline-block px-10 py-4 rounded-2xl text-sm font-bold tracking-widest uppercase transition-all hover:opacity-90"
              style={{ backgroundColor: '#C9A961', color: '#1C3D5A', letterSpacing: '0.14em' }}
            >
              Start My Free Listing →
            </Link>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="max-w-4xl mx-auto px-6 py-20" aria-labelledby="compare-heading">
        <h2 id="compare-heading" className="text-3xl font-bold text-center mb-3"
          style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
          How We Compare
        </h2>
        <p className="text-center text-sm mb-10" style={{ color: '#595959' }}>
          vs. Zillow Rentals and Craigslist
        </p>
        <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid rgba(201,169,97,0.2)' }}>
          <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#1C3D5A' }}>
                <th scope="col" className="text-left px-5 py-4 font-semibold" style={{ color: '#C9A961' }}>Feature</th>
                <th scope="col" className="px-5 py-4 font-bold text-center" style={{ color: '#C9A961' }}>BakersfieldRentalHomes</th>
                <th scope="col" className="px-5 py-4 font-semibold text-center" style={{ color: 'rgba(247,245,240,0.7)' }}>Zillow Rentals</th>
                <th scope="col" className="px-5 py-4 font-semibold text-center" style={{ color: 'rgba(247,245,240,0.7)' }}>Craigslist</th>
              </tr>
            </thead>
            <tbody>
              {VS.map((row, i) => (
                <tr key={row.feature}
                  style={{ backgroundColor: i % 2 === 0 ? 'white' : '#faf9f7', borderBottom: '1px solid #f0ece4' }}>
                  <td className="px-5 py-4 font-medium" style={{ color: '#2B2B2B' }}>{row.feature}</td>
                  <td className="px-5 py-4 text-center font-bold" style={{ color: '#2D7A4F' }}>{row.us}</td>
                  <td className="px-5 py-4 text-center" style={{ color: '#595959' }}>{row.zillow}</td>
                  <td className="px-5 py-4 text-center" style={{ color: '#595959' }}>{row.craigslist}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Niche tenant markets */}
      <section className="py-20 px-6" style={{ backgroundColor: '#f0ece4' }} aria-labelledby="niches-heading">
        <div className="max-w-5xl mx-auto">
          <h2 id="niches-heading" className="text-3xl font-bold text-center mb-3"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
            We Attract Tenants Other Sites Don't
          </h2>
          <p className="text-center text-sm mb-12 max-w-xl mx-auto" style={{ color: '#595959' }}>
            We've built dedicated pages for three high-value tenant groups that search Bakersfield specifically. If your property fits any of these, you're ahead of every other listing site.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {NICHES.map(n => (
              <div key={n.title} className="rounded-2xl overflow-hidden"
                style={{ border: '1px solid rgba(28,61,90,0.12)' }}>
                <div className="px-6 py-5" style={{ backgroundColor: n.color }}>
                  <h3 className="text-base font-bold" style={{ color: '#C9A961' }}>{n.title}</h3>
                </div>
                <div className="bg-white px-6 py-5">
                  <p className="text-sm leading-relaxed mb-4" style={{ color: '#595959' }}>{n.description}</p>
                  <Link href={n.href}
                    className="text-xs font-semibold underline"
                    style={{ color: '#1C3D5A' }}>
                    Learn more →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 text-center" aria-labelledby="cta-heading">
        <h2 id="cta-heading" className="text-3xl font-bold mb-4"
          style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
          Ready to List Your Property?
        </h2>
        <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: '#595959' }}>
          It's free, takes 8 minutes, and your listing stays live until your home is rented. No credit card. No monthly fees.
        </p>
        <Link
          href="/list"
          className="inline-block px-10 py-4 rounded-2xl text-sm font-bold tracking-widest uppercase transition-all hover:opacity-90 mb-4"
          style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0', letterSpacing: '0.14em' }}
        >
          List My Property — Free →
        </Link>
        <p className="text-xs block" style={{ color: '#595959' }}>
          Questions? Browse{' '}
          <Link href="/listings" className="underline" style={{ color: '#1C3D5A' }}>
            current listings
          </Link>{' '}
          to see what a live listing looks like.
        </p>
      </section>

    </main>
  )
}
