import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Insurance Housing Bakersfield CA | ALE Temporary Rentals for Displaced Families',
  description: 'Temporary rental housing in Bakersfield CA for insurance-displaced families. ALE housing, fire and flood relocation rentals, 3–6 month leases. Landlords earn premium rates. Insurance adjusters find available homes fast.',
  keywords: [
    'insurance housing Bakersfield CA',
    'ALE housing Bakersfield',
    'additional living expense housing Bakersfield',
    'temporary rental housing Bakersfield insurance',
    'insurance relocation housing Kern County',
    'short term rental insurance Bakersfield',
    '3 month rental Bakersfield CA',
    '6 month rental Bakersfield CA',
    'fire damage housing Bakersfield',
    'flood displacement housing Bakersfield CA',
    'furnished rental insurance Bakersfield',
    'insurance adjuster housing Bakersfield',
    'corporate housing Bakersfield CA',
    'ALE rental Kern County',
  ],
  alternates: { canonical: 'https://bakersfieldrentalhomes.com/insurance-housing-bakersfield' },
  openGraph: {
    title: 'Insurance Housing Bakersfield CA | ALE Temporary Rentals',
    description: 'ALE and insurance relocation housing in Bakersfield, CA. 3–6 month rentals for fire and flood-displaced families. Adjusters find homes fast. Landlords earn premium rates.',
    url: 'https://bakersfieldrentalhomes.com/insurance-housing-bakersfield',
    siteName: 'Bakersfield Rental Homes',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Insurance housing and ALE rentals in Bakersfield CA' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Insurance Housing Bakersfield CA | ALE Temporary Rentals',
    description: 'ALE housing for displaced families in Bakersfield, CA. 3–6 month leases, premium rates, direct landlord contact.',
    images: ['/opengraph-image'],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bakersfieldrentalhomes.com' },
    { '@type': 'ListItem', position: 2, name: 'Insurance Housing Bakersfield', item: 'https://bakersfieldrentalhomes.com/insurance-housing-bakersfield' },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is ALE housing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ALE stands for Additional Living Expense — a standard coverage in most homeowners and renters insurance policies. When a home becomes uninhabitable due to fire, flood, or other covered damage, the insurance policy pays for temporary housing while repairs are completed. ALE housing placements typically last 3 to 6 months, sometimes longer for major repairs or rebuilds.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much do insurance companies pay for temporary housing in Bakersfield?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Insurance ALE housing budgets in Bakersfield typically range from $2,500 to $4,500 per month for a single-family home, depending on the policy limits and the size of the displaced family. This is often 1.5 to 2 times the standard market rent, because ALE benefits are based on the family\'s pre-loss housing standard — not the local market average.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can landlords in Bakersfield rent directly to insurance companies?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Landlords can rent directly to insurance-displaced families or work with the insurance company\'s housing coordinator. The lease is typically signed with the displaced family (the policyholder), with ALE benefits paying the rent directly to the landlord or reimbursing the tenant. Some insurers use third-party relocation firms to coordinate placements.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are insurance companies looking for in ALE rental homes in Bakersfield?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Insurance adjusters look for homes that are comparable to the displaced family\'s pre-loss residence — similar square footage, bedrooms, neighborhood quality, and school district. Homes should be move-in ready, clean, and available quickly (often within 3–7 days of a claim). Furnished or partially furnished homes are preferred. Pet-friendly homes are a plus when the family has pets.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I list my Bakersfield rental property for insurance housing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'List your property on BakersfieldRentalHomes.com and indicate in your listing that you are open to short-term and ALE rentals. Insurance coordinators and adjusters search local rental platforms when placing displaced families. You can also contact local insurance offices and property damage restoration companies directly to let them know your property is available.',
      },
    },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Insurance ALE Housing Placement — Bakersfield CA',
  description: 'Temporary rental housing for insurance-displaced families in Bakersfield, CA. 3–6 month ALE leases available across all Bakersfield neighborhoods.',
  provider: { '@type': 'Organization', name: 'Bakersfield Brokers', url: 'https://bakersfieldrentalhomes.com' },
  areaServed: { '@type': 'City', name: 'Bakersfield', containedInPlace: { '@type': 'AdministrativeArea', name: 'Kern County' } },
  serviceType: 'ALE Housing / Insurance Temporary Rental',
}

const COMPANIES_WHO_USE_ALE = [
  'State Farm', 'Allstate', 'Farmers Insurance', 'AAA', 'USAA',
  'Liberty Mutual', 'Nationwide', 'Travelers', 'Mercury Insurance', 'Safeco',
]

const ALE_PROCESS = [
  {
    step: '1',
    title: 'Claim Filed',
    desc: 'Homeowner or renter files a claim after fire, flood, or other covered damage makes their home uninhabitable.',
  },
  {
    step: '2',
    title: 'ALE Benefits Activated',
    desc: 'The insurance adjuster reviews the policy\'s ALE coverage and establishes a daily or monthly housing budget based on the family\'s pre-loss standard.',
  },
  {
    step: '3',
    title: 'Housing Search Begins',
    desc: 'The adjuster or a third-party relocation firm searches for available homes comparable to the family\'s original residence. Speed matters — families are often displaced immediately.',
  },
  {
    step: '4',
    title: 'Landlord Direct Contact',
    desc: 'The coordinator contacts landlords directly to confirm availability, confirm the property is comparable, and negotiate lease terms. Bakersfield landlords listed on BakersfieldRentalHomes.com are easy to reach.',
  },
  {
    step: '5',
    title: 'Lease Signed',
    desc: 'A standard short-term lease is signed — usually 3 to 6 months with possible extension. ALE benefits pay rent directly or reimburse the tenant.',
  },
  {
    step: '6',
    title: 'Premium Payment',
    desc: 'Landlords typically receive 1.5–2× market rate because ALE budgets are set to the family\'s pre-loss standard, not local market averages.',
  },
]

export default function InsuranceHousingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <main id="main-content">

        {/* Hero */}
        <section
          className="relative py-24 px-6 text-center overflow-hidden"
          style={{ backgroundColor: '#1C3D5A' }}
          aria-labelledby="hero-heading"
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#C9A961' }}>
            Bakersfield, CA · ALE & Insurance Relocation Housing
          </p>
          <h1
            id="hero-heading"
            className="text-4xl md:text-5xl font-bold mb-5 max-w-3xl mx-auto"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}
          >
            Insurance & ALE Housing in Bakersfield, CA
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-10" style={{ color: 'rgba(247,245,240,0.8)' }}>
            Temporary rental homes for fire and flood-displaced families. 3–6 month leases, move-in ready, direct from local landlords — no middlemen.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/listings"
              className="px-7 py-3.5 rounded-full font-semibold text-sm tracking-wider uppercase transition-all hover:opacity-90"
              style={{ backgroundColor: '#C9A961', color: '#1C3D5A' }}
            >
              View Available Homes
            </Link>
            <Link
              href="/list"
              className="px-7 py-3.5 rounded-full font-semibold text-sm tracking-wider uppercase transition-all hover:opacity-90"
              style={{ backgroundColor: 'transparent', color: '#F7F5F0', border: '1px solid rgba(247,245,240,0.4)' }}
            >
              List Your Property for ALE
            </Link>
          </div>
        </section>

        {/* Two audiences */}
        <section className="py-16 px-6 md:px-10" style={{ backgroundColor: '#F7F5F0' }} aria-labelledby="audiences-heading">
          <h2 id="audiences-heading" className="sr-only">Who This Page Is For</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* For adjusters */}
            <div className="rounded-2xl p-8" style={{ backgroundColor: '#fff', border: '1px solid rgba(201,169,97,0.25)' }}>
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#C9A961' }}>For Insurance Adjusters & Coordinators</p>
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
                Find Bakersfield Homes Fast for Displaced Clients
              </h3>
              <ul className="space-y-3 mb-6 list-none p-0 m-0">
                {[
                  'Direct landlord contact — no property management middlemen',
                  'Homes available across all Bakersfield neighborhoods and ZIP codes',
                  '3, 6, and 12-month leases accommodated',
                  'Mix of furnished and unfurnished homes available',
                  'Pet-friendly options for displaced families with animals',
                  'Move-in ready homes — landlords respond quickly',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm" style={{ color: '#444' }}>
                    <span style={{ color: '#C9A961', flexShrink: 0 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/listings"
                className="block w-full text-center py-3.5 rounded-full font-semibold text-sm tracking-wider uppercase transition-all hover:opacity-90"
                style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0' }}
              >
                Browse Available Homes
              </Link>
            </div>

            {/* For landlords */}
            <div className="rounded-2xl p-8" style={{ backgroundColor: '#1C3D5A' }}>
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#C9A961' }}>For Bakersfield Landlords</p>
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}>
                Earn 1.5–2× Market Rent on ALE Placements
              </h3>
              <ul className="space-y-3 mb-6 list-none p-0 m-0">
                {[
                  'Insurance ALE budgets are set to the family\'s pre-loss standard — not market average',
                  'Guaranteed payment through insurance carriers or verified policyholders',
                  'Short-term commitments: 3–6 months with possible extension',
                  'Tenants are typically homeowners — motivated to care for the property',
                  'No long vacancy periods: ALE placements move fast',
                  'List your property for free on BakersfieldRentalHomes.com',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm" style={{ color: 'rgba(247,245,240,0.85)' }}>
                    <span style={{ color: '#C9A961', flexShrink: 0 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/list"
                className="block w-full text-center py-3.5 rounded-full font-semibold text-sm tracking-wider uppercase transition-all hover:opacity-90"
                style={{ backgroundColor: '#C9A961', color: '#1C3D5A' }}
              >
                List Your Property
              </Link>
            </div>

          </div>
        </section>

        {/* What is ALE */}
        <section className="py-16 px-6" style={{ backgroundColor: '#fff' }} aria-labelledby="ale-heading">
          <div className="max-w-2xl mx-auto">
            <h2 id="ale-heading" className="text-2xl font-bold mb-5" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              What Is ALE Housing and How Does It Work?
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#444' }}>
              <strong>ALE</strong> — Additional Living Expense — is a standard benefit in most homeowners and renters insurance policies. When a covered event (fire, flood, smoke damage, storm damage) makes a home uninhabitable, the policy pays for the family to live elsewhere while repairs are completed.
            </p>
            <p className="text-sm leading-relaxed mb-8" style={{ color: '#444' }}>
              In Kern County, fires and floods are common enough that insurance companies actively maintain relationships with local landlords who can provide quality temporary housing quickly. The placement process moves fast — families are often displaced within 24 hours and need a home immediately.
            </p>

            <h3 className="text-lg font-bold mb-5" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              The ALE Housing Process — Step by Step
            </h3>
            <div className="space-y-4">
              {ALE_PROCESS.map(s => (
                <div key={s.step} className="flex gap-4">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                    style={{ backgroundColor: '#1C3D5A', color: '#C9A961' }}
                    aria-hidden="true"
                  >
                    {s.step}
                  </div>
                  <div className="pt-1">
                    <p className="font-semibold text-sm mb-1" style={{ color: '#1C3D5A' }}>{s.title}</p>
                    <p className="text-sm leading-relaxed" style={{ color: '#555' }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Insurance companies */}
        <section className="py-14 px-6" style={{ backgroundColor: '#F7F5F0' }} aria-labelledby="carriers-heading">
          <div className="max-w-2xl mx-auto text-center">
            <h2 id="carriers-heading" className="text-xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              Insurance Carriers That Use ALE Housing in Bakersfield
            </h2>
            <p className="text-sm mb-7" style={{ color: '#555' }}>
              Most major homeowners insurance carriers active in Kern County place displaced policyholders through ALE housing. Adjusters and relocation coordinators from these companies actively search for available rental homes in Bakersfield.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {COMPANIES_WHO_USE_ALE.map(company => (
                <span
                  key={company}
                  className="px-4 py-2 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: '#fff', color: '#1C3D5A', border: '1px solid rgba(28,61,90,0.15)' }}
                >
                  {company}
                </span>
              ))}
            </div>
            <p className="text-xs mt-5" style={{ color: '#999' }}>
              Many carriers also work through third-party ALE housing specialists such as Temporary Accommodations, Renters Reference, and Premier Corporate Relocation.
            </p>
          </div>
        </section>

        {/* What landlords should know */}
        <section className="py-16 px-6" style={{ backgroundColor: '#fff' }} aria-labelledby="landlords-heading">
          <div className="max-w-2xl mx-auto">
            <h2 id="landlords-heading" className="text-2xl font-bold mb-5" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              What Bakersfield Landlords Should Know About ALE Tenants
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#444' }}>
              ALE placements are among the most reliable short-term rental arrangements a landlord can enter into. Here's why:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                {
                  title: 'Guaranteed-Backed Rent',
                  desc: 'Rent is backed by an insurance policy, not just the tenant\'s income. Payment is reliable and typically processed quickly.',
                },
                {
                  title: 'Homeowner Tenants',
                  desc: 'ALE-displaced families are usually homeowners — people accustomed to caring for a property. They\'re motivated to be good tenants.',
                },
                {
                  title: 'Premium Rates',
                  desc: 'ALE budgets are based on the family\'s pre-loss housing standard. A family displaced from a $400k home will have a budget that exceeds average market rent.',
                },
                {
                  title: 'Defined Term',
                  desc: '3–6 months is the typical commitment, with a clear end date. Extensions happen but are negotiated in advance — no indefinite tenancy.',
                },
                {
                  title: 'Fast Placement',
                  desc: 'Adjusters move quickly. When your property is listed and available, ALE coordinators can place a family within days, eliminating vacancy gaps.',
                },
                {
                  title: 'Repeat Business',
                  desc: 'Insurance adjusters and relocation coordinators work with landlords repeatedly. One good ALE placement often leads to more referrals.',
                },
              ].map(item => (
                <div key={item.title} className="p-5 rounded-xl" style={{ backgroundColor: '#F7F5F0', border: '1px solid rgba(201,169,97,0.15)' }}>
                  <p className="font-semibold text-sm mb-2" style={{ color: '#1C3D5A' }}>{item.title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: '#555' }}>{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="p-5 rounded-xl" style={{ backgroundColor: 'rgba(201,169,97,0.1)', border: '1px solid rgba(201,169,97,0.3)' }}>
              <p className="text-sm font-semibold mb-1" style={{ color: '#1C3D5A' }}>Tip: Mention ALE availability in your listing</p>
              <p className="text-sm" style={{ color: '#444' }}>
                When listing on BakersfieldRentalHomes.com, note in your description that you are open to short-term, 3–6 month, and insurance ALE leases. Adjusters searching for available homes specifically look for landlords who understand the ALE process and can move quickly.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-6" style={{ backgroundColor: '#F7F5F0' }} aria-labelledby="faq-heading">
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

        {/* Related */}
        <section className="py-14 px-6" style={{ backgroundColor: '#fff' }} aria-labelledby="related-heading">
          <div className="max-w-3xl mx-auto text-center">
            <h2 id="related-heading" className="text-xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              More Resources for Bakersfield Renters & Landlords
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                ['/listings', 'Browse All Listings'],
                ['/list', 'List Your Property'],
                ['/3-bedroom-houses-for-rent-bakersfield', '3 Bedroom Homes'],
                ['/4-bedroom-houses-for-rent-bakersfield', '4 Bedroom Homes'],
                ['/pet-friendly-rentals-bakersfield', 'Pet-Friendly Rentals'],
                ['/neighborhoods', 'Neighborhoods Guide'],
                ['/blog/tenant-rights-california-2026', 'Tenant Rights Guide'],
                ['/direct-landlord-rentals', 'Direct Landlord Rentals'],
              ].map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-80"
                  style={{ backgroundColor: '#F7F5F0', color: '#1C3D5A', border: '1px solid rgba(28,61,90,0.15)' }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 text-center" style={{ backgroundColor: '#1C3D5A' }}>
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}>
            Have a Property Available for ALE Housing?
          </h2>
          <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: 'rgba(247,245,240,0.8)' }}>
            List your Bakersfield home directly and connect with insurance adjusters and displaced families — no broker fees, no commissions, premium rent.
          </p>
          <Link
            href="/list"
            className="px-8 py-4 rounded-full font-semibold text-sm tracking-wider uppercase transition-all hover:opacity-90"
            style={{ backgroundColor: '#C9A961', color: '#1C3D5A' }}
          >
            List Your Property for Free
          </Link>
        </section>

      </main>
    </>
  )
}
