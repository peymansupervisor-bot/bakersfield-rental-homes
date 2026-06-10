import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tenant Rights in California 2026 | Bakersfield Renter\'s Guide',
  description: 'Know your rights as a renter in California. A practical 2026 guide covering security deposits, eviction protections, rent increases, habitability standards, and tenant rights specific to Bakersfield and Kern County.',
  keywords: [
    'tenant rights California 2026',
    'renter rights California',
    'California tenant laws 2026',
    'Bakersfield tenant rights',
    'security deposit rules California',
    'eviction laws California 2026',
    'rent increase limits California',
    'California habitability standards',
    'Kern County renter rights',
    'AB 1482 California rent control',
  ],
  alternates: { canonical: 'https://bakersfieldrentalhomes.com/blog/tenant-rights-california-2026' },
  openGraph: {
    title: 'Tenant Rights in California 2026 | Bakersfield Renter\'s Guide',
    description: 'A practical guide to California tenant rights in 2026 — security deposits, eviction protections, rent increases, and habitability standards.',
    url: 'https://bakersfieldrentalhomes.com/blog/tenant-rights-california-2026',
    siteName: 'Bakersfield Rental Homes',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Tenant rights California 2026' }],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tenant Rights in California 2026',
    description: 'A practical guide to California tenant rights — security deposits, eviction protections, rent increases, and habitability.',
    images: ['/opengraph-image'],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bakersfieldrentalhomes.com' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://bakersfieldrentalhomes.com/blog' },
    { '@type': 'ListItem', position: 3, name: 'Tenant Rights in California 2026', item: 'https://bakersfieldrentalhomes.com/blog/tenant-rights-california-2026' },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Tenant Rights in California 2026: A Bakersfield Renter\'s Guide',
  description: 'A practical 2026 guide to California tenant rights covering security deposits, eviction protections, rent increases, and habitability standards.',
  datePublished: '2026-06-09',
  dateModified: '2026-06-09',
  author: { '@type': 'Organization', name: 'Bakersfield Brokers', url: 'https://bakersfieldrentalhomes.com' },
  publisher: {
    '@type': 'Organization',
    name: 'Bakersfield Brokers',
    url: 'https://bakersfieldrentalhomes.com',
    logo: { '@type': 'ImageObject', url: 'https://bakersfieldrentalhomes.com/og-image.jpg' },
  },
  mainEntityOfPage: 'https://bakersfieldrentalhomes.com/blog/tenant-rights-california-2026',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much can a landlord charge for a security deposit in California?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'As of April 1, 2024, AB 12 limits security deposits in California to a maximum of one month\'s rent for most residential tenants, regardless of whether the unit is furnished or unfurnished. Small landlords who own no more than two properties with a total of no more than four units may charge up to two months\' rent. Pet deposits are included within this cap — landlords cannot charge a separate pet deposit on top of a security deposit that already equals one month\'s rent.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a landlord raise rent in California without notice?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. California law requires landlords to give written notice before raising rent. For rent increases of 10% or less, landlords must give at least 30 days\' notice. For increases greater than 10%, at least 90 days\' notice is required. Under AB 1482 (the Tenant Protection Act), most tenants in buildings over 15 years old are also protected from annual rent increases exceeding 5% plus local CPI (or 10%, whichever is lower).',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a just cause eviction in California?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under AB 1482, landlords covered by the law cannot evict tenants without "just cause" after 12 months of tenancy. Just cause includes: non-payment of rent, breach of lease, criminal activity, or the landlord\'s intent to move in or substantially remodel. Evictions without just cause are illegal for covered tenants and can result in significant penalties for landlords.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are a landlord\'s habitability obligations in California?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'California Civil Code §1941 requires landlords to maintain rental units in a "habitable" condition. This means: working plumbing and heating, weatherproofing, no pest infestations, adequate lighting in common areas, clean and sanitary premises, working smoke and carbon monoxide detectors, and no toxic mold. If a landlord fails to make repairs after written notice, tenants may have the right to repair-and-deduct, rent withholding, or lease termination depending on the severity.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does a landlord have to return a security deposit in California?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'California landlords must return a security deposit — or provide an itemized statement of deductions — within 21 calendar days of the tenant vacating the unit. If the landlord fails to do so, the tenant may be entitled to the full deposit amount plus up to twice the deposit in penalties if a court finds the withholding was in bad faith.',
      },
    },
  ],
}

const SECTIONS = [
  {
    id: 'security-deposit',
    title: 'Security Deposits: The New 1-Month Cap (AB 12)',
    content: [
      'The biggest change for California renters in recent years came with AB 12, which took effect April 1, 2024. For most tenants, landlords are now limited to charging a maximum of one month\'s rent as a security deposit — period. This applies whether the unit is furnished or unfurnished.',
      'There is a narrow exception: small landlords who own no more than two properties with a total of four or fewer units may still charge up to two months\' rent. But for most rental situations in Bakersfield — especially properties managed by larger landlords or property management companies — the one-month cap applies.',
      'Critically, pet deposits are now included within this cap. A landlord cannot charge you a $1,500 security deposit and then a separate $500 pet deposit. The total cannot exceed one month\'s rent (or two months for small landlords).',
      'At move-out, your landlord must return your deposit — or send an itemized written statement of any deductions — within 21 calendar days. Legitimate deductions include unpaid rent and damages beyond normal wear and tear. Painting walls a different color, minor carpet wear, and small scuffs are normal wear and tear and cannot be charged to you.',
    ],
  },
  {
    id: 'rent-increases',
    title: 'Rent Increases: Notice Requirements and AB 1482 Caps',
    content: [
      'California law requires advance written notice for any rent increase. For increases of 10% or less, your landlord must give at least 30 days\' written notice. For increases exceeding 10%, they must give at least 90 days\' written notice. A notice slipped under your door the day before is not legally sufficient.',
      'Many Bakersfield tenants also benefit from AB 1482, the Tenant Protection Act of 2019. This law caps annual rent increases at 5% plus local CPI (Consumer Price Index), or 10% — whichever is lower — for covered tenants. As of 2026, that typically means rent increases cannot exceed 8-10% in a given year.',
      'AB 1482 covers most apartments and single-family homes that are more than 15 years old, unless the property is specifically exempted. Exemptions include: condos or single-family homes where the owner has provided proper written notice of the exemption, owner-occupied duplexes, and properties with restricted affordable housing agreements.',
      'If you\'re unsure whether your home is covered, the California Department of Housing & Community Development maintains an online lookup tool. In Bakersfield, the majority of older single-family rentals fall under AB 1482 protection.',
    ],
  },
  {
    id: 'eviction',
    title: 'Eviction Protections: Just Cause After 12 Months',
    content: [
      'Once you\'ve rented a property for 12 months, AB 1482 kicks in with "just cause" eviction protections — meaning your landlord cannot evict you without a legally recognized reason. This is one of the most important protections California tenants have.',
      'Just cause evictions fall into two categories. "At-fault" just causes include non-payment of rent, lease violations (like unauthorized pets or occupants), criminal activity on the property, or subletting without permission. "No-fault" just causes include the owner moving into the unit, taking the unit off the rental market (Ellis Act withdrawal), or substantial remodeling that requires the tenant to vacate.',
      'For no-fault evictions, landlords are typically required to pay relocation assistance equal to one month\'s rent. If your landlord attempts to evict you without just cause and you\'ve been there over 12 months, this is illegal under California law.',
      'The formal eviction process in California requires a written notice (3-day, 30-day, or 60-day depending on the situation), followed by an Unlawful Detainer lawsuit filed in court if you don\'t vacate. A landlord cannot change your locks, remove your belongings, or shut off your utilities to force you out — these are illegal "self-help" evictions and expose the landlord to significant liability.',
    ],
  },
  {
    id: 'habitability',
    title: 'Habitability: What Your Landlord Must Maintain',
    content: [
      'California Civil Code §1941 requires every landlord to maintain rental units in a habitable condition. This is not optional — it\'s the law. A habitable unit must have: effective waterproofing and weatherproofing, unbroken windows and doors, working plumbing and gas systems, hot and cold running water, working heating, adequate lighting and ventilation in common areas, clean and sanitary premises free of pests, working smoke detectors and carbon monoxide detectors, and no toxic mold.',
      'If your unit has a habitability problem — a broken heater in winter, a pest infestation, a leaking roof, no hot water — you must give your landlord written notice and a reasonable time to fix it. "Reasonable time" varies by urgency: 24-48 hours for an emergency (no heat in winter, no running water), 30 days for less urgent repairs.',
      'If your landlord fails to act, California gives tenants several remedies. The repair-and-deduct remedy lets you hire a licensed contractor to fix the problem and deduct the cost from your rent (up to one month\'s rent, limited to twice per year). You may also have the right to withhold rent, terminate the lease, or sue for damages — but these options carry risk and ideally should involve an attorney.',
    ],
  },
  {
    id: 'retaliation',
    title: 'Retaliation: You\'re Protected for Exercising Your Rights',
    content: [
      'California law prohibits landlord retaliation. If you report a habitability issue, contact a government agency about conditions, join a tenants\' union, or exercise any other legal right, your landlord cannot respond by raising your rent, decreasing services, or attempting to evict you.',
      'Retaliation is presumed if a landlord takes adverse action within 180 days of you exercising a protected right. The burden then shifts to the landlord to prove the action wasn\'t retaliatory. If you believe you\'re being retaliated against, document everything in writing and consider contacting a local tenant rights organization or attorney.',
    ],
  },
]

export default function TenantRightsPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main id="main-content">

        {/* Hero */}
        <section className="py-20 px-6 text-center" style={{ backgroundColor: '#1C3D5A' }} aria-labelledby="article-heading">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
                style={{ backgroundColor: 'rgba(201,169,97,0.2)', color: '#C9A961' }}>
                Renter's Guide
              </span>
              <span className="text-xs" style={{ color: 'rgba(247,245,240,0.6)' }}>June 2026 · 8 min read</span>
            </div>
            <h1
              id="article-heading"
              className="text-3xl md:text-4xl font-bold mb-5 leading-tight"
              style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}
            >
              Tenant Rights in California 2026:<br />A Bakersfield Renter's Guide
            </h1>
            <p className="text-lg" style={{ color: 'rgba(247,245,240,0.8)' }}>
              Security deposits, eviction protections, rent increase limits, and habitability standards — what every Bakersfield renter needs to know.
            </p>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="max-w-3xl mx-auto px-6 pt-10">
          <div className="rounded-xl px-5 py-4 text-xs leading-relaxed" style={{ backgroundColor: '#FFF8EE', border: '1px solid rgba(201,169,97,0.3)', color: '#7d6019' }}>
            <strong>Note:</strong> This guide is for informational purposes only and does not constitute legal advice. Laws change — always verify current rules with a licensed California attorney or a tenant rights organization like <strong>Kern County Legal Services</strong> before taking action.
          </div>
        </div>

        {/* Table of contents */}
        <nav className="max-w-3xl mx-auto px-6 py-8" aria-label="Article sections">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#888' }}>In This Guide</p>
          <ol className="space-y-1.5 list-none p-0 m-0">
            {SECTIONS.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-sm transition-colors hover:opacity-70"
                  style={{ color: '#1C3D5A', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                  {i + 1}. {s.title}
                </a>
              </li>
            ))}
            <li>
              <a href="#faq" className="text-sm transition-colors hover:opacity-70"
                style={{ color: '#1C3D5A', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                {SECTIONS.length + 1}. Frequently Asked Questions
              </a>
            </li>
          </ol>
        </nav>

        {/* Article body */}
        <article className="max-w-3xl mx-auto px-6 pb-14" style={{ color: '#2B2B2B' }}>

          {SECTIONS.map(section => (
            <section key={section.id} id={section.id} className="mb-12">
              <h2 className="text-2xl font-bold mb-5" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
                {section.title}
              </h2>
              {section.content.map((para, i) => (
                <p key={i} className="text-base mb-4" style={{ lineHeight: 1.85 }}>{para}</p>
              ))}
            </section>
          ))}

          {/* Key rights summary box */}
          <div className="rounded-2xl p-6 mb-12" style={{ backgroundColor: '#F7F5F0', border: '1px solid rgba(201,169,97,0.25)' }}>
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#C9A961' }}>Quick Reference: Your Key Rights</p>
            <ul className="space-y-3 list-none p-0 m-0">
              {[
                'Security deposit capped at 1 month\'s rent (AB 12, effective April 2024)',
                'Deposit returned or itemized within 21 days of move-out',
                '30 days\' notice for rent increases ≤10%; 90 days for increases >10%',
                'Rent increases capped at 5% + CPI (max 10%) under AB 1482 for covered units',
                'Just cause required for eviction after 12 months of tenancy',
                'Landlord cannot self-help evict (no lock changes, utility shutoffs)',
                'Unit must be habitable — working heat, plumbing, no pests, no mold',
                'Retaliation for exercising your rights is illegal',
              ].map(right => (
                <li key={right} className="flex items-start gap-3 text-sm" style={{ lineHeight: 1.7 }}>
                  <span style={{ color: '#C9A961', flexShrink: 0, marginTop: 2 }} aria-hidden="true">✓</span>
                  <span>{right}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* FAQ */}
          <section id="faq" className="mb-12" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-2xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
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
          </section>

          {/* Resources */}
          <section className="mb-12" aria-labelledby="resources-heading">
            <h2 id="resources-heading" className="text-xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              Kern County Tenant Resources
            </h2>
            <ul className="space-y-2 list-none p-0 m-0">
              {[
                { name: 'Kern County Legal Services', desc: 'Free legal assistance for low-income Kern County residents, including tenant rights issues' },
                { name: 'California Courts — Tenant Resources (courts.ca.gov)', desc: 'Official California court system guide to tenant and landlord rights' },
                { name: 'California Department of Housing & Community Development', desc: 'AB 1482 coverage lookup and renter protections information' },
                { name: 'Bakersfield City Code Enforcement', desc: 'Report habitability violations and substandard housing conditions in Bakersfield' },
              ].map(r => (
                <li key={r.name} className="flex items-start gap-3 text-sm py-2 border-b" style={{ borderColor: 'rgba(201,169,97,0.15)', lineHeight: 1.7 }}>
                  <span style={{ color: '#C9A961', flexShrink: 0, marginTop: 2 }} aria-hidden="true">→</span>
                  <span><strong style={{ color: '#1C3D5A' }}>{r.name}</strong> — {r.desc}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* CTA */}
          <div className="rounded-2xl p-8 text-center" style={{ backgroundColor: '#1C3D5A' }}>
            <h2 className="text-xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}>
              Looking for a Rental in Bakersfield?
            </h2>
            <p className="text-sm mb-6" style={{ color: 'rgba(247,245,240,0.8)' }}>
              Browse direct landlord rentals — no broker fees, no middlemen. Rent from owners who know Bakersfield.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/listings"
                className="px-6 py-3 rounded-full font-semibold text-sm tracking-wider uppercase transition-all hover:opacity-90"
                style={{ backgroundColor: '#C9A961', color: '#1C3D5A' }}>
                Browse All Listings
              </Link>
              <Link href="/direct-landlord-rentals"
                className="px-6 py-3 rounded-full font-semibold text-sm tracking-wider uppercase transition-all hover:opacity-90"
                style={{ backgroundColor: 'transparent', color: '#F7F5F0', border: '1px solid rgba(247,245,240,0.4)' }}>
                Direct Landlord Rentals
              </Link>
            </div>
          </div>

          {/* Related */}
          <div className="mt-10 pt-8 border-t" style={{ borderColor: 'rgba(201,169,97,0.2)' }}>
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#888' }}>More Guides</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/blog/average-rent-bakersfield-2026"
                className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:opacity-80"
                style={{ backgroundColor: '#F7F5F0', color: '#1C3D5A', border: '1px solid rgba(28,61,90,0.15)' }}>
                Average Rent in Bakersfield 2026
              </Link>
              <Link href="/pet-friendly-rentals-bakersfield"
                className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:opacity-80"
                style={{ backgroundColor: '#F7F5F0', color: '#1C3D5A', border: '1px solid rgba(28,61,90,0.15)' }}>
                Pet-Friendly Rentals
              </Link>
              <Link href="/neighborhoods"
                className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:opacity-80"
                style={{ backgroundColor: '#F7F5F0', color: '#1C3D5A', border: '1px solid rgba(28,61,90,0.15)' }}>
                Neighborhood Guides
              </Link>
            </div>
          </div>

        </article>
      </main>
    </>
  )
}
