import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Moving from Texas to Bakersfield CA | Relocation Guide 2026',
  description: 'Moving from Texas to Bakersfield, CA? Compare cost of living, housing, oil & gas job opportunities, climate, and taxes. Everything Texans need to know before relocating to Kern County.',
  keywords: [
    'moving from Texas to Bakersfield CA',
    'relocating from Texas to Bakersfield',
    'Texas to Bakersfield relocation',
    'Bakersfield CA vs Texas cost of living',
    'oil and gas jobs Bakersfield CA',
    'Permian Basin to San Joaquin Valley',
    'moving from Texas to California',
    'Bakersfield CA housing for Texans',
    'Kern County oil jobs relocation',
    'Texas to California move guide',
  ],
  alternates: { canonical: 'https://bakersfieldrentalhomes.com/blog/moving-from-texas-to-bakersfield' },
  openGraph: {
    title: 'Moving from Texas to Bakersfield CA | Relocation Guide 2026',
    description: 'Compare cost of living, housing costs, oil & gas jobs, climate, and taxes. Everything Texans need before moving to Bakersfield, CA.',
    url: 'https://bakersfieldrentalhomes.com/blog/moving-from-texas-to-bakersfield',
    siteName: 'Bakersfield Rental Homes',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Moving from Texas to Bakersfield CA' }],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moving from Texas to Bakersfield CA | 2026 Guide',
    description: 'Oil & gas transfers, cost of living, housing, and what Texans should know before moving to Kern County, CA.',
    images: ['/opengraph-image'],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bakersfieldrentalhomes.com' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://bakersfieldrentalhomes.com/blog' },
    { '@type': 'ListItem', position: 3, name: 'Moving from Texas to Bakersfield', item: 'https://bakersfieldrentalhomes.com/blog/moving-from-texas-to-bakersfield' },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Moving from Texas to Bakersfield CA: A 2026 Relocation Guide',
  description: 'Everything Texans need to know before moving to Bakersfield, CA — oil & gas job market, cost of living, housing, climate, and taxes.',
  datePublished: '2026-06-10',
  dateModified: '2026-06-10',
  author: { '@type': 'Organization', name: 'Bakersfield Brokers', url: 'https://bakersfieldrentalhomes.com' },
  publisher: { '@type': 'Organization', name: 'Bakersfield Brokers', url: 'https://bakersfieldrentalhomes.com' },
  mainEntityOfPage: 'https://bakersfieldrentalhomes.com/blog/moving-from-texas-to-bakersfield',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Bakersfield CA cheaper than Texas cities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bakersfield is cheaper than Austin and Dallas for housing, but California\'s income tax (up to 13.3%) offsets much of the savings for high earners. For oil & gas workers on field pay scales, Bakersfield housing costs are comparable to Midland/Odessa TX, but significantly cheaper than Houston suburbs. Groceries and gas tend to cost slightly more in California.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there oil and gas jobs in Bakersfield CA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Kern County is California\'s largest oil-producing county, accounting for roughly 70% of the state\'s crude oil output. Major employers include California Resources Corporation (CRC), Aera Energy, Chevron, and Berry Petroleum. The San Joaquin Valley\'s oilfields hire drillers, engineers, pumpers, operators, and field technicians — many of the same roles found in the Permian Basin.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does California income tax affect a move from Texas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Texas has no state income tax. California\'s top marginal rate is 13.3%, one of the highest in the country. For a household earning $100,000/year, California income tax is roughly $6,000–$8,000 more than Texas. This is partly offset by Bakersfield\'s lower housing costs vs. comparable Texas metros — but it\'s an important factor for high earners to model before moving.',
      },
    },
    {
      '@type': 'Question',
      name: 'How similar is the Bakersfield climate to Texas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bakersfield and West Texas (Midland/Odessa) share a hot, dry, semi-arid climate. Both see summer temperatures above 100°F. Bakersfield has milder winters than North Texas (rarely freezes) but worse air quality due to its geography — the valley traps smog and agricultural dust. Humidity is low in both regions.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the best Bakersfield neighborhoods for people relocating from Texas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Texans moving to Bakersfield for oil & gas work tend to settle in Northwest Bakersfield and Southwest Bakersfield — both offer newer single-family homes, good schools, and a suburban feel similar to Midland or Odessa TX. Remote workers and professionals often prefer the Stockdale/Seven Oaks area for its upscale homes and low crime. Families typically avoid East Bakersfield until they\'re familiar with the city.',
      },
    },
  ],
}

const COST_COMPARISON = [
  { category: 'Rent (3BR house)', bakersfield: '$1,500–$2,200', midland: '$1,400–$2,000', austin: '$2,200–$3,200', houston: '$1,600–$2,400' },
  { category: 'State income tax', bakersfield: 'Up to 13.3%', midland: 'None', austin: 'None', houston: 'None' },
  { category: 'Gas (per gallon)', bakersfield: '~$4.20', midland: '~$3.10', austin: '~$3.20', houston: '~$3.10' },
  { category: 'Groceries', bakersfield: 'Slightly above TX', midland: 'Below US avg', austin: 'At US avg', houston: 'At US avg' },
  { category: 'Property tax rate', bakersfield: '~1.1%', midland: '~2.2%', austin: '~2.0%', houston: '~2.1%' },
  { category: 'Utilities (summer)', bakersfield: '$180–$280', midland: '$200–$320', austin: '$160–$250', houston: '$180–$280' },
]

const OIL_COMPARISON = [
  { label: 'Primary formation', bakersfield: 'San Joaquin Valley (Monterey Shale, Kern River field)', texas: 'Permian Basin (Wolfcamp, Bone Spring, Delaware)' },
  { label: 'Production type', bakersfield: 'Heavy oil, steamflooding, secondary recovery', texas: 'Light tight oil, horizontal drilling, fracking' },
  { label: 'Major operators', bakersfield: 'CRC, Aera Energy, Chevron, Berry Petroleum', texas: 'Pioneer, Occidental, ConocoPhillips, ExxonMobil' },
  { label: 'Common roles', bakersfield: 'Operators, pumpers, engineers, HSE, logistics', texas: 'Drillers, completions, engineers, water management' },
  { label: 'Regulatory environment', bakersfield: 'California DOGGR / CalGEM — stricter than Texas', texas: 'Texas RRC — more permissive' },
  { label: 'Boom/bust cycle', bakersfield: 'More stable due to heavy oil recovery techniques', texas: 'More volatile, tied closely to WTI price swings' },
]

export default function TexasToBakersfieldPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main id="main-content">

        {/* Hero */}
        <section className="py-20 px-6 text-center" style={{ backgroundColor: '#1C3D5A' }} aria-labelledby="hero-heading">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex justify-center gap-2 text-xs list-none p-0 m-0" style={{ color: 'rgba(247,245,240,0.6)' }}>
              <li><Link href="/" style={{ color: 'rgba(247,245,240,0.6)' }} className="hover:underline">Home</Link></li>
              <li aria-hidden="true">›</li>
              <li><Link href="/blog" style={{ color: 'rgba(247,245,240,0.6)' }} className="hover:underline">Blog</Link></li>
              <li aria-hidden="true">›</li>
              <li style={{ color: '#C9A961' }}>Texas to Bakersfield</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#C9A961' }}>
            Relocation Guide · June 2026 · 6 min read
          </p>
          <h1
            id="hero-heading"
            className="text-4xl md:text-5xl font-bold mb-5 max-w-3xl mx-auto"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}
          >
            Moving from Texas to Bakersfield, CA
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(247,245,240,0.8)' }}>
            Oil & gas transfers, cost of living, housing, climate, and taxes — what every Texan needs to know before relocating to Kern County.
          </p>
        </section>

        {/* TL;DR */}
        <section className="py-10 px-6" style={{ backgroundColor: '#F7F5F0' }}>
          <div className="max-w-2xl mx-auto rounded-2xl p-7" style={{ backgroundColor: '#fff', border: '2px solid rgba(201,169,97,0.3)' }}>
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#C9A961' }}>The Short Version</p>
            <ul className="space-y-2 list-none p-0 m-0">
              {[
                'Bakersfield is California\'s oil capital — Kern County produces ~70% of California\'s crude oil',
                'Housing costs are comparable to Midland/Odessa and cheaper than Austin or Houston suburbs',
                'California income tax (up to 13.3%) is the biggest financial shock for Texans — plan accordingly',
                'Climate is very similar to West Texas: hot, dry summers, mild winters, low humidity',
                'Northwest Bakersfield is the most popular landing spot for oil & gas workers',
                'No broker fees on listings at BakersfieldRentalHomes.com — rent direct from landlords',
              ].map(item => (
                <li key={item} className="flex items-start gap-2 text-sm" style={{ color: '#333' }}>
                  <span style={{ color: '#C9A961', flexShrink: 0 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* TOC */}
        <section className="py-8 px-6" style={{ backgroundColor: '#F7F5F0' }}>
          <div className="max-w-2xl mx-auto">
            <nav aria-label="Table of contents">
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#1C3D5A' }}>In This Guide</p>
              <ol className="space-y-1 list-none p-0 m-0">
                {[
                  ['#oil-gas', 'Oil & Gas: Permian Basin vs. San Joaquin Valley'],
                  ['#cost', 'Cost of Living Comparison'],
                  ['#housing', 'Housing & Rent in Bakersfield'],
                  ['#taxes', 'The Texas vs. California Tax Difference'],
                  ['#climate', 'Climate Comparison'],
                  ['#neighborhoods', 'Best Neighborhoods for Texas Transplants'],
                  ['#faq', 'Frequently Asked Questions'],
                ].map(([href, label]) => (
                  <li key={href}>
                    <a href={href} className="text-sm hover:underline" style={{ color: '#1C3D5A' }}>{label}</a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </section>

        {/* Oil & Gas */}
        <section id="oil-gas" className="py-14 px-6" style={{ backgroundColor: '#fff' }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              Oil & Gas: Permian Basin vs. San Joaquin Valley
            </h2>
            <p className="text-sm leading-relaxed mb-5" style={{ color: '#444' }}>
              The Bakersfield–Texas oil corridor is real. Kern County has been producing oil since 1899, and its oilfields employ thousands of workers in roles directly parallel to what you'd find in Midland, Odessa, or the Permian Basin. Workers transfer between the two regions regularly — both for company assignments and voluntary moves.
            </p>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#444' }}>
              The biggest differences are in the <em>type</em> of production. West Texas is dominated by horizontal drilling and hydraulic fracturing of light tight oil. The San Joaquin Valley primarily produces heavy crude using steamflooding and secondary recovery — older technology but remarkably steady production.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse" aria-label="Oil field comparison: San Joaquin Valley vs Permian Basin">
                <thead>
                  <tr style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0' }}>
                    <th className="text-left p-3 font-semibold rounded-tl-lg">Factor</th>
                    <th className="text-left p-3 font-semibold">Bakersfield / San Joaquin</th>
                    <th className="text-left p-3 font-semibold rounded-tr-lg">Permian Basin (TX)</th>
                  </tr>
                </thead>
                <tbody>
                  {OIL_COMPARISON.map((row, i) => (
                    <tr key={row.label} style={{ backgroundColor: i % 2 === 0 ? '#F7F5F0' : '#fff' }}>
                      <td className="p-3 font-semibold" style={{ color: '#1C3D5A' }}>{row.label}</td>
                      <td className="p-3" style={{ color: '#444' }}>{row.bakersfield}</td>
                      <td className="p-3" style={{ color: '#444' }}>{row.texas}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 p-5 rounded-xl" style={{ backgroundColor: 'rgba(201,169,97,0.1)', border: '1px solid rgba(201,169,97,0.3)' }}>
              <p className="text-sm font-semibold mb-1" style={{ color: '#1C3D5A' }}>Regulatory note for Texans</p>
              <p className="text-sm" style={{ color: '#444' }}>
                California's oil and gas regulator (CalGEM) is significantly stricter than the Texas Railroad Commission. Environmental compliance, permitting timelines, and setback rules are more demanding. Workers transferring from Texas should expect a steeper regulatory learning curve and different operational constraints.
              </p>
            </div>
          </div>
        </section>

        {/* Cost of living */}
        <section id="cost" className="py-14 px-6" style={{ backgroundColor: '#F7F5F0' }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              Cost of Living: Bakersfield vs. Texas Cities
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#444' }}>
              Bakersfield is cheap by California standards, but it's not as cheap as most Texas cities once you factor in California's income tax. Here's the honest comparison:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse" aria-label="Cost of living comparison: Bakersfield vs Texas cities">
                <thead>
                  <tr style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0' }}>
                    <th className="text-left p-3 font-semibold rounded-tl-lg">Category</th>
                    <th className="text-left p-3 font-semibold">Bakersfield CA</th>
                    <th className="text-left p-3 font-semibold">Midland TX</th>
                    <th className="text-left p-3 font-semibold">Austin TX</th>
                    <th className="text-left p-3 font-semibold rounded-tr-lg">Houston TX</th>
                  </tr>
                </thead>
                <tbody>
                  {COST_COMPARISON.map((row, i) => (
                    <tr key={row.category} style={{ backgroundColor: i % 2 === 0 ? '#fff' : '#F7F5F0' }}>
                      <td className="p-3 font-semibold" style={{ color: '#1C3D5A' }}>{row.category}</td>
                      <td className="p-3" style={{ color: '#444' }}>{row.bakersfield}</td>
                      <td className="p-3" style={{ color: '#444' }}>{row.midland}</td>
                      <td className="p-3" style={{ color: '#444' }}>{row.austin}</td>
                      <td className="p-3" style={{ color: '#444' }}>{row.houston}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs mt-3" style={{ color: '#888' }}>Housing costs are rental market estimates as of 2026. Tax rates are approximate.</p>
          </div>
        </section>

        {/* Housing */}
        <section id="housing" className="py-14 px-6" style={{ backgroundColor: '#fff' }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              Housing & Rent in Bakersfield
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#444' }}>
              Bakersfield's rental market offers single-family homes that would be hard to find at these prices anywhere else in California. For Texans used to renting a house (not an apartment), you'll feel right at home — standalone houses with yards are the norm, not the exception.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                { type: '2 Bedroom House', range: '$1,100–$1,600/mo', note: 'Widely available across all neighborhoods' },
                { type: '3 Bedroom House', range: '$1,500–$2,200/mo', note: 'Most common rental type for families' },
                { type: '4 Bedroom House', range: '$1,900–$2,800/mo', note: 'Available in Northwest and Seven Oaks' },
                { type: 'Large lot / rural', range: '$1,400–$2,200/mo', note: 'Kern County outskirts — horse property available' },
              ].map(h => (
                <div key={h.type} className="p-4 rounded-xl" style={{ backgroundColor: '#F7F5F0', border: '1px solid rgba(201,169,97,0.15)' }}>
                  <p className="font-semibold text-sm mb-1" style={{ color: '#1C3D5A' }}>{h.type}</p>
                  <p className="font-bold text-sm mb-1" style={{ color: '#C9A961' }}>{h.range}</p>
                  <p className="text-xs" style={{ color: '#888' }}>{h.note}</p>
                </div>
              ))}
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#444' }}>
              Most Bakersfield rentals are posted directly by landlords with no broker involved — meaning no finder's fees or agent commissions charged to tenants. This is different from many Texas markets where property management companies dominate.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/listings" className="px-5 py-2.5 rounded-full font-semibold text-sm tracking-wider uppercase transition-all hover:opacity-90"
                style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0' }}>
                Browse Available Rentals
              </Link>
              <Link href="/3-bedroom-houses-for-rent-bakersfield" className="px-5 py-2.5 rounded-full font-semibold text-sm tracking-wider uppercase transition-all hover:opacity-90"
                style={{ backgroundColor: 'transparent', color: '#1C3D5A', border: '1px solid rgba(28,61,90,0.3)' }}>
                3 Bedroom Homes
              </Link>
            </div>
          </div>
        </section>

        {/* Taxes */}
        <section id="taxes" className="py-14 px-6" style={{ backgroundColor: '#F7F5F0' }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              The Tax Reality: Texas vs. California
            </h2>
            <div className="p-5 rounded-xl mb-6" style={{ backgroundColor: '#fff3cd', border: '1px solid #d4a800' }}>
              <p className="text-sm font-semibold mb-1" style={{ color: '#7d5a00' }}>Important: This Is Not Financial Advice</p>
              <p className="text-xs" style={{ color: '#7d5a00' }}>Tax situations vary. Consult a CPA familiar with both Texas and California tax law before making a move based on tax considerations.</p>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#444' }}>
              The #1 financial shock for Texans moving to California is the state income tax. Here's what to expect:
            </p>
            <div className="space-y-4 mb-6">
              {[
                { label: 'Texas state income tax', value: '0%', note: 'Texas funds the state through property taxes and sales tax instead' },
                { label: 'California state income tax (median income ~$70k)', value: '~4–6%', note: 'Effective rate for middle-income households' },
                { label: 'California state income tax ($120k household)', value: '~8–9%', note: 'Common for oil & gas technical roles' },
                { label: 'California property tax', value: '~1.1%', note: 'Lower than Texas (~2.1–2.3%), which partially offsets income tax for homebuyers' },
                { label: 'California sales tax (Kern County)', value: '~8.25%', note: 'Higher than most Texas counties (~6.25–8.25%)' },
              ].map(t => (
                <div key={t.label} className="flex items-start justify-between gap-4 p-4 rounded-xl" style={{ backgroundColor: '#fff', border: '1px solid rgba(28,61,90,0.08)' }}>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#1C3D5A' }}>{t.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#888' }}>{t.note}</p>
                  </div>
                  <span className="font-bold text-sm flex-shrink-0" style={{ color: '#C9A961' }}>{t.value}</span>
                </div>
              ))}
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#444' }}>
              For oil & gas workers on field pay scales, the income tax difference is real but manageable — especially if you're leaving a high-cost Texas metro like Midland during a boom cycle. For remote workers keeping a coastal salary, the math often still works in Bakersfield's favor compared to renting in Los Angeles or the Bay Area.
            </p>
          </div>
        </section>

        {/* Climate */}
        <section id="climate" className="py-14 px-6" style={{ backgroundColor: '#fff' }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              Climate: How Bakersfield Compares to Texas
            </h2>
            <p className="text-sm leading-relaxed mb-5" style={{ color: '#444' }}>
              Good news for Texans: you already know how to live in heat. Bakersfield's climate is one of the easiest adjustments for Texas transplants.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                {
                  title: 'Summer Heat',
                  bfield: '95–110°F (Jun–Sep). Dry heat, low humidity. Similar to West Texas.',
                  texas: 'Midland: 95–105°F, humid. Houston: 90–98°F with high humidity.',
                  verdict: 'Comparable — Bakersfield may feel more comfortable due to lower humidity',
                },
                {
                  title: 'Winter',
                  bfield: '35–60°F. Mild, rarely freezes in the city. No winter storms.',
                  texas: 'North TX: hard freezes possible. Houston: mild but occasional ice (see 2021).',
                  verdict: 'Bakersfield wins — more reliable winters with no freeze risk',
                },
                {
                  title: 'Air Quality',
                  bfield: 'One of the worst in the US due to valley geography trapping pollution and agricultural dust.',
                  texas: 'Midland/Odessa: oil field emissions. Houston: petrochemical corridor. Both have poor air days.',
                  verdict: 'Bakersfield is worse on average — important for respiratory health',
                },
                {
                  title: 'Natural Disasters',
                  bfield: 'Earthquake risk (on active faults). Rare flooding. No hurricanes or tornadoes.',
                  texas: 'Hurricanes (Gulf Coast), tornadoes (North TX), severe winter storms.',
                  verdict: 'Different risks — earthquake vs. storm. Neither is risk-free.',
                },
              ].map(c => (
                <div key={c.title} className="p-5 rounded-xl" style={{ backgroundColor: '#F7F5F0', border: '1px solid rgba(28,61,90,0.08)' }}>
                  <h3 className="font-bold text-sm mb-3" style={{ color: '#1C3D5A' }}>{c.title}</h3>
                  <p className="text-xs mb-1"><span className="font-semibold" style={{ color: '#1C3D5A' }}>Bakersfield: </span><span style={{ color: '#444' }}>{c.bfield}</span></p>
                  <p className="text-xs mb-2"><span className="font-semibold" style={{ color: '#555' }}>Texas: </span><span style={{ color: '#444' }}>{c.texas}</span></p>
                  <p className="text-xs italic" style={{ color: '#888' }}>{c.verdict}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Neighborhoods */}
        <section id="neighborhoods" className="py-14 px-6" style={{ backgroundColor: '#F7F5F0' }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              Best Neighborhoods for Texas Transplants
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#444' }}>
              Texans moving to Bakersfield for oil work or remote jobs tend to cluster in a few areas. Here's where to look first:
            </p>
            <div className="space-y-4">
              {[
                {
                  name: 'Northwest Bakersfield',
                  why: 'The most popular landing spot for oil & gas workers. Newer construction, low crime, good schools, and a suburban feel similar to Midland or Odessa. Easy access to the oilfields via Rosedale Highway.',
                  rent: '$1,400–$2,200/mo',
                  slug: 'northwest-bakersfield',
                },
                {
                  name: 'Southwest Bakersfield',
                  why: 'Larger lots, more affordable rents, and quick freeway access (Hwy 99, Hwy 58). Popular with families who want space without Northwest prices. Some areas feel similar to outer Houston suburbs.',
                  rent: '$1,200–$1,800/mo',
                  slug: 'southwest-bakersfield',
                },
                {
                  name: 'Seven Oaks / Stockdale',
                  why: 'Bakersfield\'s most upscale area — master-planned, gated sections, beautiful homes. Popular with engineers, managers, and remote workers who want the nicest neighborhoods in the city.',
                  rent: '$1,800–$2,800/mo',
                  slug: 'rosedale',
                },
              ].map(n => (
                <div key={n.name} className="rounded-2xl p-5" style={{ backgroundColor: '#fff', border: '1px solid rgba(201,169,97,0.2)' }}>
                  <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                    <h3 className="font-bold text-base" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>{n.name}</h3>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(201,169,97,0.12)', color: '#7d6019' }}>{n.rent}</span>
                  </div>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: '#555' }}>{n.why}</p>
                  <Link href={`/neighborhoods/${n.slug}`} className="text-xs font-semibold hover:underline" style={{ color: '#C9A961' }}>
                    Full neighborhood guide →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-14 px-6" style={{ backgroundColor: '#fff' }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
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
        <section className="py-16 px-6" style={{ backgroundColor: '#1C3D5A' }}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}>
              Ready to Find a Rental in Bakersfield?
            </h2>
            <p className="text-sm mb-7 max-w-md mx-auto" style={{ color: 'rgba(247,245,240,0.8)' }}>
              Browse houses posted directly by Bakersfield landlords. No broker fees, no middlemen — just homes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/listings"
                className="px-7 py-3.5 rounded-full font-semibold text-sm tracking-wider uppercase transition-all hover:opacity-90"
                style={{ backgroundColor: '#C9A961', color: '#1C3D5A' }}>
                Browse All Listings
              </Link>
              <Link href="/neighborhoods"
                className="px-7 py-3.5 rounded-full font-semibold text-sm tracking-wider uppercase transition-all hover:opacity-90"
                style={{ backgroundColor: 'transparent', color: '#F7F5F0', border: '1px solid rgba(247,245,240,0.4)' }}>
                Explore Neighborhoods
              </Link>
            </div>
            <div className="mt-10 pt-8 border-t flex flex-wrap justify-center gap-4" style={{ borderColor: 'rgba(247,245,240,0.1)' }}>
              <Link href="/blog/moving-to-bakersfield-ca" className="text-xs hover:underline" style={{ color: 'rgba(247,245,240,0.6)' }}>Full Bakersfield Relocation Guide</Link>
              <Link href="/blog/average-rent-bakersfield-2026" className="text-xs hover:underline" style={{ color: 'rgba(247,245,240,0.6)' }}>Average Rent in Bakersfield 2026</Link>
              <Link href="/blog/tenant-rights-california-2026" className="text-xs hover:underline" style={{ color: 'rgba(247,245,240,0.6)' }}>California Tenant Rights</Link>
              <Link href="/3-bedroom-houses-for-rent-bakersfield" className="text-xs hover:underline" style={{ color: 'rgba(247,245,240,0.6)' }}>3 Bedroom Rentals</Link>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}
