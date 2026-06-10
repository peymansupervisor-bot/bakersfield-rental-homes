import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Section 8 Housing in Bakersfield CA: Complete 2026 Guide | Bakersfield Rental Homes',
  description: 'How to use a Housing Choice Voucher (Section 8) to rent in Bakersfield, CA. Covers how to apply through HACK, find landlords, pass inspection, and your rights under California SB 329.',
  keywords: [
    'section 8 housing Bakersfield CA',
    'housing choice voucher Bakersfield',
    'how to use section 8 voucher Bakersfield',
    'HACK housing authority Bakersfield',
    'Housing Authority of the County of Kern',
    'section 8 landlords Bakersfield CA',
    'section 8 rentals Kern County',
    'housing voucher Bakersfield 2026',
    'SB 329 California landlord voucher',
    'HACK approved rentals Bakersfield',
    'how to apply section 8 Bakersfield',
    'section 8 inspection Bakersfield',
  ],
  alternates: { canonical: 'https://bakersfieldrentalhomes.com/blog/section-8-housing-bakersfield' },
  openGraph: {
    title: 'Section 8 Housing in Bakersfield CA: Complete 2026 Guide',
    description: 'How to use a Housing Choice Voucher to rent in Bakersfield — applying through HACK, finding landlords, passing inspection, and your rights under SB 329.',
    url: 'https://bakersfieldrentalhomes.com/blog/section-8-housing-bakersfield',
    siteName: 'Bakersfield Rental Homes',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Section 8 housing guide Bakersfield CA 2026' }],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Section 8 Housing in Bakersfield CA: 2026 Guide',
    description: 'How to use a Housing Choice Voucher in Bakersfield — applying, finding landlords, and your rights under California law.',
    images: ['/opengraph-image'],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bakersfieldrentalhomes.com' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://bakersfieldrentalhomes.com/blog' },
    { '@type': 'ListItem', position: 3, name: 'Section 8 Housing in Bakersfield CA: 2026 Guide', item: 'https://bakersfieldrentalhomes.com/blog/section-8-housing-bakersfield' },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Section 8 Housing in Bakersfield CA: Complete 2026 Guide',
  description: 'How to use a Housing Choice Voucher (Section 8) to rent in Bakersfield, CA — applying through HACK, finding landlords, passing inspection, and your rights under SB 329.',
  datePublished: '2026-06-10',
  dateModified: '2026-06-10',
  author: { '@type': 'Organization', name: 'Bakersfield Brokers', url: 'https://bakersfieldrentalhomes.com' },
  publisher: {
    '@type': 'Organization',
    name: 'Bakersfield Brokers',
    url: 'https://bakersfieldrentalhomes.com',
    logo: { '@type': 'ImageObject', url: 'https://bakersfieldrentalhomes.com/og-image.jpg' },
  },
  mainEntityOfPage: 'https://bakersfieldrentalhomes.com/blog/section-8-housing-bakersfield',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I apply for Section 8 in Bakersfield CA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Section 8 applications in Bakersfield are handled by the Housing Authority of the County of Kern (HACK) at 601 24th Street, Bakersfield, CA 93301. Call (661) 631-8500 or visit kernha.org to check whether the waiting list is currently open. When the list opens, you must apply during the open enrollment window — HACK does not accept applications year-round.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a landlord refuse Section 8 in California?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Since January 1, 2020, California SB 329 prohibits landlords from refusing to rent to a tenant solely because they have a Housing Choice Voucher (Section 8). Source of income — including housing vouchers — is a protected class under California\'s Fair Employment and Housing Act. A landlord who rejects you because of your voucher is violating state law.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long is the Section 8 waiting list in Bakersfield?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The HACK Housing Choice Voucher waiting list is frequently closed due to high demand. When it does open, wait times have historically ranged from 1 to 3+ years depending on preference points (veterans, disabled individuals, and local residents receive priority). Check kernha.org or call (661) 631-8500 for current wait list status.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does Section 8 pay for in Bakersfield CA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HACK pays the landlord directly each month. The voucher covers the difference between your portion of the rent (typically 30% of your adjusted gross income) and the actual rent — up to the Payment Standard set by HACK. As of 2025–2026, Payment Standards in Bakersfield are approximately $1,100–$1,350 for a 1-bedroom, $1,350–$1,700 for a 2-bedroom, and $1,750–$2,100 for a 3-bedroom.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens during a Section 8 inspection in Bakersfield?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Before you move in, HACK must inspect the unit to ensure it meets HUD Housing Quality Standards (HQS). An inspector checks items like working heat, hot water, smoke detectors, window locks, no pest infestations, and overall structural soundness. If the unit passes, HACK approves it and issues the Housing Assistance Payments (HAP) contract to the landlord. If it fails, the landlord must make repairs before you can move in.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long do I have to find a home after receiving a Section 8 voucher in Bakersfield?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HACK typically gives voucher holders 60 to 120 days to find an eligible unit and have it approved. If you need more time, you can request an extension from HACK before your deadline. Finding a willing landlord quickly is the most important factor — once a landlord agrees, the inspection and approval process usually takes 1–2 weeks.',
      },
    },
  ],
}

const SECTIONS = [
  {
    id: 'what-is-section-8',
    title: 'What Is Section 8 Housing in Bakersfield?',
    content: [
      'Section 8 is the common name for the federal Housing Choice Voucher (HCV) program. It\'s administered locally in Bakersfield and Kern County by the Housing Authority of the County of Kern — known as HACK. The program helps low-income families, seniors, and disabled individuals afford private market rental housing by subsidizing a portion of the monthly rent.',
      'Unlike public housing (government-owned units), Section 8 lets you choose your own home from private landlords. HACK pays the landlord directly each month, covering the gap between what you can afford and the actual rent — up to the local Payment Standard. You pay your share (generally 30% of your adjusted gross income) to the landlord on top of the subsidy.',
      'Bakersfield has one of the largest Section 8 communities in California\'s Central Valley. Kern County\'s affordable cost of living means vouchers stretch further here than in Los Angeles or the Bay Area, making it an attractive market for voucher holders looking for space, yards, and single-family homes.',
    ],
  },
  {
    id: 'how-to-apply',
    title: 'How to Apply for Section 8 Through HACK',
    content: [
      'Applications for the Housing Choice Voucher program in Bakersfield are handled exclusively by HACK — the Housing Authority of the County of Kern. Their office is located at 601 24th Street, Bakersfield, CA 93301, and they can be reached at (661) 631-8500, Monday through Friday, 8 AM to 5 PM.',
      'The waiting list is frequently closed. HACK only accepts applications during open enrollment windows, which are announced on their website at kernha.org. When the list does open, you must apply during that window — there is no ongoing rolling enrollment. Sign up for HACK notifications at kernha.org to be alerted when the list opens.',
      'When applying, you\'ll need to provide identification for all household members, income documentation, current housing information, and any preference qualifications. HACK gives priority points to veterans, people with disabilities, and current Kern County residents. Once you\'re on the list and reach the top, HACK will contact you for a formal eligibility interview and briefing session.',
      'After the briefing, you\'ll receive your voucher and a search deadline — typically 60 to 120 days to find an eligible unit. If you need more time, request an extension from HACK before your deadline expires.',
    ],
  },
  {
    id: 'payment-standards',
    title: 'What Your Voucher Covers: Payment Standards',
    content: [
      'HACK sets Payment Standards — the maximum subsidy it will pay toward rent in Bakersfield. These are based on HUD\'s Fair Market Rents (FMR) for Kern County and are updated periodically. As of 2025–2026, approximate Payment Standards for Bakersfield are:',
      '• Studio / Efficiency: ~$950–$1,100/month\n• 1 Bedroom: ~$1,100–$1,350/month\n• 2 Bedroom: ~$1,350–$1,700/month\n• 3 Bedroom: ~$1,750–$2,100/month\n• 4 Bedroom: ~$2,100–$2,500/month',
      'You can rent a unit that costs more than the Payment Standard — but you\'d pay the difference out of pocket, on top of your 30% income share. HACK will verify that the rent is "reasonable" compared to similar unassisted units in the area before approving any lease.',
      'Contact HACK directly at (661) 631-8500 for the most current Payment Standards, as they are updated annually.',
    ],
  },
  {
    id: 'finding-a-landlord',
    title: 'Finding a Section 8 Landlord in Bakersfield',
    content: [
      'Finding a willing landlord is often the hardest part of using a voucher in Bakersfield. Many landlords are unfamiliar with the program, worry about inspections, or have had past experiences that made them hesitant. The good news: California law is firmly on your side.',
      'Browse the listings on our Section 8 rentals page — these are Bakersfield landlords who have explicitly indicated they accept Housing Choice Vouchers. Contact them directly, confirm the unit is still available, and let them know upfront that you have a voucher.',
      'You can also call HACK at (661) 631-8500 and ask for their list of landlords who have participated in the program before. Experienced voucher landlords know the inspection process and tend to move faster. Word-of-mouth in the local Bakersfield rental community is also valuable — our Facebook community group has thousands of local members who share leads.',
      'When approaching a new landlord, be prepared to explain how the program works: HACK pays their share directly to the landlord every month on a consistent schedule, the landlord keeps the tenancy agreement directly with you, and HACK\'s share does not come out of your pocket. Many landlords become strong program supporters once they understand the payment reliability.',
    ],
  },
  {
    id: 'sb-329-california-law',
    title: 'California Law: Landlords Cannot Refuse Your Voucher',
    content: [
      'Since January 1, 2020, California Senate Bill 329 (SB 329) prohibits landlords from refusing to rent to tenants because they have a Housing Choice Voucher or other housing subsidy. Source of income is now a protected class under the California Fair Employment and Housing Act (FEHA) — the same law that protects against discrimination based on race, religion, disability, and other characteristics.',
      'This is a powerful protection. If a landlord refuses to rent to you because of your voucher — says "we don\'t accept Section 8," screens you out based on income source, or withdraws an offer once they learn you have a voucher — they are violating state law. You can file a complaint with the California Civil Rights Department (CRD) at calcivilrights.ca.gov.',
      'SB 329 applies to most private residential rentals in California, including single-family homes and apartments. Exceptions are narrow: owner-occupied single-family homes where the owner rents no other residential property may be exempt. In Bakersfield, the vast majority of rental homes are covered.',
      'Knowing this law gives you confidence when approaching landlords. If a listing says "no Section 8," you can politely inform the landlord of their obligation under SB 329. Many landlords who are unaware of the law become compliant once informed — they\'re not necessarily hostile, just uninformed.',
    ],
  },
  {
    id: 'hack-inspection',
    title: 'The HACK Inspection: What to Expect',
    content: [
      'Before you can move in, HACK must inspect the rental unit to confirm it meets HUD Housing Quality Standards (HQS). This is a mandatory step — no inspection, no voucher use. The inspection is free and is conducted by a HACK housing inspector.',
      'The inspector will check: working heat and hot water, functioning smoke and carbon monoxide detectors, secure window and door locks, no pest infestations, no visible mold or lead paint hazards, working electrical outlets, functional plumbing, and overall structural safety.',
      'If the unit passes inspection, HACK and the landlord sign a Housing Assistance Payments (HAP) contract, and you can execute your lease. If the unit fails, the landlord must make the required repairs and request a re-inspection before you can move in.',
      'Inspections typically take 1–2 weeks to schedule from the time a landlord agrees. Factor this into your timeline — if your voucher deadline is approaching, let HACK know so they can prioritize. Annual re-inspections are also required each year you remain in the unit.',
    ],
  },
]

export default function Section8BlogPost() {
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
              <span className="text-xs" style={{ color: 'rgba(247,245,240,0.6)' }}>June 2026 · 9 min read</span>
            </div>
            <h1
              id="article-heading"
              className="text-3xl md:text-4xl font-bold mb-5 leading-tight"
              style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}
            >
              Section 8 Housing in Bakersfield CA:<br />Complete 2026 Guide
            </h1>
            <p className="text-lg" style={{ color: 'rgba(247,245,240,0.8)' }}>
              How to apply for a Housing Choice Voucher, find a landlord, pass inspection, and rent in Bakersfield — plus your rights under California law.
            </p>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="max-w-3xl mx-auto px-6 pt-10">
          <div className="rounded-xl px-5 py-4 text-xs leading-relaxed" style={{ backgroundColor: '#FFF8EE', border: '1px solid rgba(201,169,97,0.3)', color: '#7d6019' }}>
            <strong>Note:</strong> This guide is for informational purposes only and does not constitute legal advice. Program rules and payment standards change — always verify current information directly with <strong>HACK</strong> at (661) 631-8500 or <strong>kernha.org</strong>.
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
                <p key={i} className="text-base mb-4 whitespace-pre-line" style={{ lineHeight: 1.85 }}>{para}</p>
              ))}
            </section>
          ))}

          {/* HACK contact box */}
          <div className="rounded-2xl p-6 mb-12" style={{ backgroundColor: '#F7F5F0', border: '1px solid rgba(201,169,97,0.25)' }}>
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#C9A961' }}>
              Housing Authority of the County of Kern (HACK)
            </p>
            <ul className="space-y-2 list-none p-0 m-0 text-sm" style={{ color: '#2B2B2B' }}>
              {[
                { icon: '📍', text: '601 24th Street, Bakersfield, CA 93301' },
                { icon: '📞', text: '(661) 631-8500' },
                { icon: '🌐', text: 'kernha.org' },
                { icon: '🕐', text: 'Monday – Friday, 8:00 AM – 5:00 PM' },
              ].map(item => (
                <li key={item.text} className="flex items-start gap-3" style={{ lineHeight: 1.7 }}>
                  <span aria-hidden="true">{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick reference box */}
          <div className="rounded-2xl p-6 mb-12" style={{ backgroundColor: '#F7F5F0', border: '1px solid rgba(201,169,97,0.25)' }}>
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#C9A961' }}>Quick Reference: Key Facts</p>
            <ul className="space-y-3 list-none p-0 m-0">
              {[
                'Section 8 is the Housing Choice Voucher program — HACK pays landlords directly',
                'You pay ~30% of your adjusted gross income; HACK covers the rest up to the Payment Standard',
                'California SB 329 (2020): landlords cannot refuse your voucher — it\'s the law',
                'Apply through HACK at kernha.org — waiting list opens periodically',
                'After receiving your voucher, you have 60–120 days to find a unit',
                'HACK must inspect and approve the unit before you move in (takes 1–2 weeks)',
                'Annual re-inspections are required to keep the HAP contract active',
              ].map(fact => (
                <li key={fact} className="flex items-start gap-3 text-sm" style={{ lineHeight: 1.7 }}>
                  <span style={{ color: '#C9A961', flexShrink: 0, marginTop: 2 }} aria-hidden="true">✓</span>
                  <span>{fact}</span>
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

          {/* Section 8 listings CTA */}
          <div className="rounded-2xl p-8 text-center mb-10" style={{ backgroundColor: '#1C3D5A' }}>
            <h2 className="text-xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}>
              Browse Section 8-Friendly Rentals in Bakersfield
            </h2>
            <p className="text-sm mb-6" style={{ color: 'rgba(247,245,240,0.8)' }}>
              These Bakersfield landlords accept Housing Choice Vouchers — posted directly, no broker fees.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/section-8-rentals-bakersfield"
                className="px-6 py-3 rounded-full font-semibold text-sm tracking-wider uppercase transition-all hover:opacity-90"
                style={{ backgroundColor: '#C9A961', color: '#1C3D5A' }}>
                Section 8 Rentals
              </Link>
              <Link href="/listings"
                className="px-6 py-3 rounded-full font-semibold text-sm tracking-wider uppercase transition-all hover:opacity-90"
                style={{ backgroundColor: 'transparent', color: '#F7F5F0', border: '1px solid rgba(247,245,240,0.4)' }}>
                All Listings
              </Link>
            </div>
          </div>

          {/* Related */}
          <div className="mt-10 pt-8 border-t" style={{ borderColor: 'rgba(201,169,97,0.2)' }}>
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#888' }}>More Guides</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/blog/tenant-rights-california-2026"
                className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:opacity-80"
                style={{ backgroundColor: '#F7F5F0', color: '#1C3D5A', border: '1px solid rgba(28,61,90,0.15)' }}>
                Tenant Rights in California 2026
              </Link>
              <Link href="/blog/average-rent-bakersfield-2026"
                className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:opacity-80"
                style={{ backgroundColor: '#F7F5F0', color: '#1C3D5A', border: '1px solid rgba(28,61,90,0.15)' }}>
                Average Rent in Bakersfield 2026
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
