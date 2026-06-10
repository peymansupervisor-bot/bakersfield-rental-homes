import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Moving to Bakersfield CA 2026 | Renter\'s Relocation Guide',
  description: 'Planning to move to Bakersfield, CA? This guide covers the best neighborhoods, average rent prices, cost of living, schools, commute times, and what to expect as a new renter in Kern County.',
  keywords: [
    'moving to Bakersfield CA',
    'relocating to Bakersfield California',
    'moving to Bakersfield guide',
    'Bakersfield CA cost of living',
    'best neighborhoods in Bakersfield CA',
    'Bakersfield CA for renters',
    'is Bakersfield CA a good place to live',
    'moving to Kern County CA',
    'Bakersfield CA neighborhoods guide',
    'pros and cons of living in Bakersfield CA',
  ],
  alternates: { canonical: 'https://bakersfieldrentalhomes.com/blog/moving-to-bakersfield-ca' },
  openGraph: {
    title: 'Moving to Bakersfield CA 2026 | Renter\'s Relocation Guide',
    description: 'Everything you need to know before moving to Bakersfield, CA — neighborhoods, rent prices, cost of living, schools, and commute.',
    url: 'https://bakersfieldrentalhomes.com/blog/moving-to-bakersfield-ca',
    siteName: 'Bakersfield Rental Homes',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Moving to Bakersfield CA guide' }],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moving to Bakersfield CA 2026 | Renter\'s Relocation Guide',
    description: 'Neighborhoods, rent prices, cost of living, schools, and commute — everything renters need to know before moving to Bakersfield.',
    images: ['/opengraph-image'],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bakersfieldrentalhomes.com' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://bakersfieldrentalhomes.com/blog' },
    { '@type': 'ListItem', position: 3, name: 'Moving to Bakersfield CA', item: 'https://bakersfieldrentalhomes.com/blog/moving-to-bakersfield-ca' },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Moving to Bakersfield CA 2026: A Renter\'s Relocation Guide',
  description: 'Everything renters need to know before moving to Bakersfield, CA — neighborhoods, rent prices, cost of living, schools, and commute times.',
  datePublished: '2026-06-10',
  dateModified: '2026-06-10',
  author: { '@type': 'Organization', name: 'Bakersfield Brokers', url: 'https://bakersfieldrentalhomes.com' },
  publisher: { '@type': 'Organization', name: 'Bakersfield Brokers', url: 'https://bakersfieldrentalhomes.com' },
  mainEntityOfPage: 'https://bakersfieldrentalhomes.com/blog/moving-to-bakersfield-ca',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Bakersfield CA a good place to live?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bakersfield is a good place to live if you value affordable housing, a low cost of living, and a strong local economy anchored by agriculture, oil, and healthcare. It\'s California\'s 9th largest city with over 400,000 residents. The trade-offs are summer heat (100°F+ in July and August), air quality issues due to the valley geography, and fewer cultural amenities than Los Angeles or San Francisco.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does it cost to rent in Bakersfield CA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'As of 2026, average rent in Bakersfield ranges from $900–$1,200/mo for a 1-bedroom, $1,100–$1,600/mo for a 2-bedroom, $1,500–$2,200/mo for a 3-bedroom, and $1,900–$2,800/mo for a 4-bedroom home. Bakersfield is one of California\'s most affordable rental markets.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the best neighborhoods to rent in Bakersfield?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The best neighborhoods depend on your priorities. Northwest Bakersfield and Seven Oaks/Stockdale are top picks for families and professionals — newer homes, good schools, lower crime. Southwest Bakersfield offers more affordable rents with easy freeway access. East Bakersfield and Oleander-Sunset have Bakersfield\'s most historic character and walkable streets.',
      },
    },
    {
      '@type': 'Question',
      name: 'How far is Bakersfield from Los Angeles?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bakersfield is approximately 110 miles north of Los Angeles via the I-5 or Highway 99. Drive time is typically 1.5 to 2 hours depending on traffic. Many Bakersfield residents commute to LA occasionally, and some remote workers live in Bakersfield full-time while visiting LA offices a few times per month.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Bakersfield safe to live in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bakersfield\'s safety varies significantly by neighborhood. Northwest Bakersfield, Seven Oaks, Stockdale, and Southwest Bakersfield have low crime rates comparable to most California suburbs. Parts of East Bakersfield and downtown have higher crime rates. As with any city, researching specific neighborhoods before renting is important.',
      },
    },
  ],
}

const NEIGHBORHOODS = [
  {
    name: 'Northwest Bakersfield',
    slug: 'northwest-bakersfield',
    rent: '$1,400–$2,200/mo',
    vibe: 'Suburban, family-friendly, newer construction',
    schools: 'Highly rated — Norris and Panama-Buena Vista school districts',
    pros: 'Low crime, newer homes, good schools, shopping nearby',
    cons: 'More expensive, car-dependent, far from downtown',
  },
  {
    name: 'Southwest Bakersfield',
    slug: 'southwest-bakersfield',
    rent: '$1,200–$1,800/mo',
    vibe: 'Diverse, working families, practical',
    schools: 'Kern High School District — mix of schools',
    pros: 'Affordable rents, central freeway access, larger lots',
    cons: 'Some areas have higher crime, older housing stock',
  },
  {
    name: 'Rosedale / Seven Oaks',
    slug: 'rosedale',
    rent: '$1,600–$2,600/mo',
    vibe: 'Upscale, master-planned, quiet',
    schools: 'Some of Bakersfield\'s top-rated public schools',
    pros: 'Beautiful homes, parks, very safe, great for families',
    cons: 'Highest rents in Bakersfield, very car-dependent',
  },
  {
    name: 'East Bakersfield',
    slug: 'east-bakersfield',
    rent: '$900–$1,400/mo',
    vibe: 'Historic, eclectic, arts community',
    schools: 'Kern City School District — mixed ratings',
    pros: 'Most affordable rents, historic architecture, near downtown',
    cons: 'Higher crime in some pockets, older infrastructure',
  },
  {
    name: 'Oleander-Sunset',
    slug: 'oleander-sunset',
    rent: '$1,100–$1,700/mo',
    vibe: 'Quiet, tree-lined, mid-century charm',
    schools: 'Kern City and Bakersfield City school districts',
    pros: 'Mature trees, walkable streets, central location',
    cons: 'Some traffic on main corridors, older homes need updates',
  },
]

const COST_COMPARISON = [
  { category: 'Rent (2BR)', bakersfield: '$1,100–$1,600', losAngeles: '$2,800–$3,800', sanFrancisco: '$3,500–$4,800' },
  { category: 'Gas (per gallon)', bakersfield: '~$4.20', losAngeles: '~$4.80', sanFrancisco: '~$5.10' },
  { category: 'Groceries', bakersfield: 'Below CA average', losAngeles: 'At CA average', sanFrancisco: 'Above CA average' },
  { category: 'Utilities (monthly)', bakersfield: '$150–$250', losAngeles: '$100–$180', sanFrancisco: '$80–$140' },
  { category: 'Property tax rate', bakersfield: '~1.1%', losAngeles: '~1.2%', sanFrancisco: '~1.2%' },
]

export default function MovingToBakersfieldPage() {
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
              <li style={{ color: '#C9A961' }}>Moving to Bakersfield</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#C9A961' }}>
            Renter's Guide · June 2026 · 7 min read
          </p>
          <h1
            id="hero-heading"
            className="text-4xl md:text-5xl font-bold mb-5 max-w-3xl mx-auto"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}
          >
            Moving to Bakersfield, CA: What Renters Need to Know in 2026
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(247,245,240,0.8)' }}>
            Neighborhoods, rent prices, cost of living, schools, and what life is actually like in California's most affordable large city.
          </p>
        </section>

        {/* TL;DR box */}
        <section className="py-10 px-6" style={{ backgroundColor: '#F7F5F0' }}>
          <div className="max-w-2xl mx-auto rounded-2xl p-7" style={{ backgroundColor: '#fff', border: '2px solid rgba(201,169,97,0.3)' }}>
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#C9A961' }}>Quick Summary</p>
            <ul className="space-y-2 list-none p-0 m-0">
              {[
                'Bakersfield is California\'s 9th largest city — 400,000+ residents in Kern County',
                '2-bedroom rent averages $1,100–$1,600/mo, roughly half of Los Angeles',
                'Best neighborhoods for renters: Northwest Bakersfield, Stockdale/Seven Oaks, Oleander-Sunset',
                'Summer heat is real — expect 100°F+ in July and August',
                'Strong job market: oil, agriculture, logistics, healthcare, and remote work',
                'I-5 and Hwy 99 put LA about 1.5–2 hours away',
              ].map(item => (
                <li key={item} className="flex items-start gap-2 text-sm" style={{ color: '#333' }}>
                  <span aria-hidden="true" style={{ color: '#C9A961', flexShrink: 0 }}>✓</span>
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
                  ['#why-bakersfield', 'Why People Are Moving to Bakersfield'],
                  ['#neighborhoods', 'Best Neighborhoods for Renters'],
                  ['#cost-of-living', 'Cost of Living vs. Other California Cities'],
                  ['#weather', 'Weather & Climate'],
                  ['#jobs', 'Jobs & Economy'],
                  ['#schools', 'Schools & Families'],
                  ['#commute', 'Commute & Getting Around'],
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

        {/* Why Bakersfield */}
        <section id="why-bakersfield" className="py-14 px-6" style={{ backgroundColor: '#fff' }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-5" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              Why People Are Moving to Bakersfield
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#444' }}>
              Bakersfield has become one of California's fastest-growing cities for a simple reason: it offers a California lifestyle at a fraction of coastal prices. With the rise of remote work, thousands of former LA and Bay Area residents have relocated to Bakersfield — keeping their coastal salaries while paying Kern County rents.
            </p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#444' }}>
              The city sits in the southern San Joaquin Valley, surrounded by the Sierra Nevada to the east, the Tehachapi Mountains to the south, and the Coast Ranges to the west. It's a working city — built on oil, agriculture, and logistics — and it shows in the practical, affordable character of the housing market.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: '#444' }}>
              Bakersfield is also the birthplace of the "Bakersfield Sound" — the country music style pioneered by Buck Owens and Merle Haggard — and has a surprisingly rich arts and live music scene that locals are proud of.
            </p>
          </div>
        </section>

        {/* Neighborhoods */}
        <section id="neighborhoods" className="py-14 px-6" style={{ backgroundColor: '#F7F5F0' }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              Best Neighborhoods for Renters in Bakersfield
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: '#444' }}>
              Bakersfield's neighborhoods differ significantly in price, character, and quality of life. Here's what renters need to know about each major area.
            </p>
            <div className="space-y-5">
              {NEIGHBORHOODS.map(n => (
                <div key={n.slug} className="rounded-2xl p-6" style={{ backgroundColor: '#fff', border: '1px solid rgba(201,169,97,0.2)' }}>
                  <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                    <h3 className="text-lg font-bold" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>{n.name}</h3>
                    <span className="text-sm font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(201,169,97,0.12)', color: '#7d6019' }}>{n.rent}</span>
                  </div>
                  <p className="text-xs mb-3 italic" style={{ color: '#595959' }}>{n.vibe}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs" style={{ color: '#444' }}>
                    <div><span className="font-semibold" style={{ color: '#1C3D5A' }}>Schools: </span>{n.schools}</div>
                    <div><span className="font-semibold" style={{ color: '#2a7a2a' }}>Pros: </span>{n.pros}</div>
                    <div className="md:col-start-2"><span className="font-semibold" style={{ color: '#8a2a2a' }}>Cons: </span>{n.cons}</div>
                  </div>
                  <Link href={`/neighborhoods/${n.slug}`} className="mt-4 inline-block text-xs font-semibold hover:underline" style={{ color: '#C9A961' }}>
                    Full neighborhood guide →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cost of living */}
        <section id="cost-of-living" className="py-14 px-6" style={{ backgroundColor: '#fff' }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              Bakersfield Cost of Living vs. Other California Cities
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#444' }}>
              Bakersfield consistently ranks as one of California's most affordable large cities. Here's how it compares:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse" aria-label="Cost of living comparison">
                <thead>
                  <tr style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0' }}>
                    <th scope="col" className="text-left p-3 font-semibold rounded-tl-lg">Category</th>
                    <th scope="col" className="text-left p-3 font-semibold">Bakersfield</th>
                    <th scope="col" className="text-left p-3 font-semibold">Los Angeles</th>
                    <th scope="col" className="text-left p-3 font-semibold rounded-tr-lg">San Francisco</th>
                  </tr>
                </thead>
                <tbody>
                  {COST_COMPARISON.map((row, i) => (
                    <tr key={row.category} style={{ backgroundColor: i % 2 === 0 ? '#F7F5F0' : '#fff' }}>
                      <td className="p-3 font-semibold" style={{ color: '#1C3D5A' }}>{row.category}</td>
                      <td className="p-3" style={{ color: '#2a7a2a', fontWeight: 600 }}>{row.bakersfield}</td>
                      <td className="p-3" style={{ color: '#555' }}>{row.losAngeles}</td>
                      <td className="p-3" style={{ color: '#555' }}>{row.sanFrancisco}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs mt-4" style={{ color: '#595959' }}>Note: utilities are higher in Bakersfield due to summer cooling costs — AC runs 5–6 months a year.</p>
            <div className="mt-6 p-5 rounded-xl" style={{ backgroundColor: 'rgba(201,169,97,0.1)', border: '1px solid rgba(201,169,97,0.3)' }}>
              <p className="text-sm font-semibold mb-1" style={{ color: '#1C3D5A' }}>The bottom line on rent</p>
              <p className="text-sm" style={{ color: '#444' }}>
                A 3-bedroom home that rents for $2,200/mo in Northwest Bakersfield would cost $4,500–$5,500/mo in a comparable LA suburb. For remote workers, that savings can be $25,000–$40,000 per year — enough to buy a car, max out a 401k, and still have money left over.
              </p>
            </div>
          </div>
        </section>

        {/* Weather */}
        <section id="weather" className="py-14 px-6" style={{ backgroundColor: '#F7F5F0' }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-5" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              Weather & Climate in Bakersfield
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#444' }}>
              Bakersfield has a semi-arid climate — hot, dry summers and mild winters. This is the #1 adjustment new residents mention.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { season: 'Summer (Jun–Sep)', desc: '95–110°F. Air conditioning is essential and runs for months. Utility bills rise significantly. Early mornings and evenings are manageable.' },
                { season: 'Fall (Oct–Nov)', desc: '65–85°F. Widely considered Bakersfield\'s best season. Comfortable temperatures, low humidity, beautiful light.' },
                { season: 'Winter (Dec–Feb)', desc: '35–60°F. Mild by California standards. Occasional frost. Rarely snows in the city — but mountains an hour away get snow.' },
                { season: 'Spring (Mar–May)', desc: '60–85°F. Pleasant with wildflowers blooming in the hills. Occasional wind. A great time to explore the outdoors.' },
              ].map(s => (
                <div key={s.season} className="p-4 rounded-xl" style={{ backgroundColor: '#fff', border: '1px solid rgba(28,61,90,0.1)' }}>
                  <p className="font-semibold text-sm mb-1" style={{ color: '#1C3D5A' }}>{s.season}</p>
                  <p className="text-xs leading-relaxed" style={{ color: '#555' }}>{s.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-sm leading-relaxed mt-5" style={{ color: '#444' }}>
              <strong>Air quality note:</strong> Bakersfield sits in a bowl formed by surrounding mountains, which traps smog and agricultural dust. The American Lung Association regularly ranks Bakersfield among the worst air quality metros in the US. If you have asthma or respiratory issues, research this carefully before relocating.
            </p>
          </div>
        </section>

        {/* Jobs */}
        <section id="jobs" className="py-14 px-6" style={{ backgroundColor: '#fff' }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-5" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              Jobs & Economy in Bakersfield
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#444' }}>
              Bakersfield's economy is driven by four major industries — each offering strong local employment:
            </p>
            <div className="space-y-4">
              {[
                { industry: 'Oil & Gas', detail: 'Kern County is California\'s top oil-producing county. Energy companies like Chevron, California Resources Corporation, and Berry Petroleum are major local employers offering high-paying technical roles.' },
                { industry: 'Agriculture', detail: 'The southern San Joaquin Valley produces grapes, almonds, pistachios, citrus, and vegetables. Agricultural management, processing, and logistics roles are abundant.' },
                { industry: 'Healthcare', detail: 'Kern Medical Center, Adventist Health, and Dignity Health operate large hospitals. Healthcare is Bakersfield\'s fastest-growing employment sector.' },
                { industry: 'Logistics & Warehousing', detail: 'Bakersfield\'s central California location and freeway access (I-5, Hwy 99, Hwy 58) make it a logistics hub. Amazon, Target, and other major distributors operate large facilities here.' },
                { industry: 'Remote Work', detail: 'A growing share of Bakersfield residents work remotely for coastal employers. The cost-of-living arbitrage is a strong draw for tech and professional services workers.' },
              ].map(j => (
                <div key={j.industry} className="flex gap-4">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#C9A961' }} aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-sm mb-1" style={{ color: '#1C3D5A' }}>{j.industry}</p>
                    <p className="text-xs leading-relaxed" style={{ color: '#555' }}>{j.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Schools */}
        <section id="schools" className="py-14 px-6" style={{ backgroundColor: '#F7F5F0' }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-5" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              Schools & Families in Bakersfield
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#444' }}>
              Bakersfield has multiple school districts with a wide range of quality. Families moving with children should research specific schools carefully — district boundaries matter a lot here.
            </p>
            <div className="space-y-4 mb-6">
              {[
                { district: 'Norris School District', area: 'Northwest Bakersfield', rating: 'Highest rated' },
                { district: 'Panama-Buena Vista USD', area: 'Southwest / Northwest', rating: 'Above average' },
                { district: 'Fruitvale School District', area: 'Rosedale / West', rating: 'Above average' },
                { district: 'Bakersfield City School District', area: 'Central / East', rating: 'Average' },
                { district: 'Kern City School District', area: 'East / Oleander', rating: 'Mixed' },
              ].map(d => (
                <div key={d.district} className="flex items-center justify-between p-4 rounded-xl gap-4" style={{ backgroundColor: '#fff', border: '1px solid rgba(201,169,97,0.15)' }}>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: '#1C3D5A' }}>{d.district}</p>
                    <p className="text-xs" style={{ color: '#595959' }}>{d.area}</p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full font-semibold flex-shrink-0" style={{ backgroundColor: 'rgba(201,169,97,0.12)', color: '#7d6019' }}>{d.rating}</span>
                </div>
              ))}
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#444' }}>
              California State University Bakersfield (CSUB) is the city's main university, with around 11,000 students. Bakersfield College is a well-regarded community college with strong transfer rates to UC and CSU campuses.
            </p>
          </div>
        </section>

        {/* Commute */}
        <section id="commute" className="py-14 px-6" style={{ backgroundColor: '#fff' }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-5" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              Commute & Getting Around Bakersfield
            </h2>
            <p className="text-sm leading-relaxed mb-5" style={{ color: '#444' }}>
              Bakersfield is a car-dependent city. Public transit exists (GET Bus system) but is limited. Most residents drive everywhere.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                { dest: 'Within Bakersfield', time: '10–25 min', note: 'Cross-city commutes are short by California standards' },
                { dest: 'Los Angeles (I-5)', time: '~1.5–2 hrs', note: 'Via Tejon Pass — can be slow in snow or heavy traffic' },
                { dest: 'Los Angeles (Hwy 99)', time: '~2–2.5 hrs', note: 'Via the valley — more reliable in winter' },
                { dest: 'Fresno', time: '~1 hr', note: 'Via Highway 99 north' },
                { dest: 'Las Vegas', time: '~3.5 hrs', note: 'Popular weekend destination via I-15' },
                { dest: 'San Francisco', time: '~3.5 hrs', note: 'Via I-5 north' },
              ].map(c => (
                <div key={c.dest} className="p-4 rounded-xl" style={{ backgroundColor: '#F7F5F0', border: '1px solid rgba(28,61,90,0.08)' }}>
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-semibold text-sm" style={{ color: '#1C3D5A' }}>{c.dest}</p>
                    <span className="text-xs font-bold" style={{ color: '#C9A961' }}>{c.time}</span>
                  </div>
                  <p className="text-xs" style={{ color: '#595959' }}>{c.note}</p>
                </div>
              ))}
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#444' }}>
              Amtrak's San Joaquins line connects Bakersfield to the Bay Area and Sacramento. The Kern Regional Transit and GET Bus systems cover the city but require planning if you don't have a car.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-14 px-6" style={{ backgroundColor: '#F7F5F0' }}>
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
              Ready to Find Your Bakersfield Rental?
            </h2>
            <p className="text-sm mb-7 max-w-md mx-auto" style={{ color: 'rgba(247,245,240,0.8)' }}>
              Browse houses for rent posted directly by local landlords — no broker fees, no middlemen.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/listings"
                className="px-7 py-3.5 rounded-full font-semibold text-sm tracking-wider uppercase transition-all hover:opacity-90"
                style={{ backgroundColor: '#C9A961', color: '#1C3D5A' }}>
                Browse Listings
              </Link>
              <Link href="/neighborhoods"
                className="px-7 py-3.5 rounded-full font-semibold text-sm tracking-wider uppercase transition-all hover:opacity-90"
                style={{ backgroundColor: 'transparent', color: '#F7F5F0', border: '1px solid rgba(247,245,240,0.4)' }}>
                Explore Neighborhoods
              </Link>
            </div>
            <div className="mt-10 pt-8 border-t flex flex-wrap justify-center gap-4" style={{ borderColor: 'rgba(247,245,240,0.1)' }}>
              <Link href="/blog/average-rent-bakersfield-2026" className="text-xs hover:underline" style={{ color: 'rgba(247,245,240,0.6)' }}>Average Rent in Bakersfield 2026</Link>
              <Link href="/blog/tenant-rights-california-2026" className="text-xs hover:underline" style={{ color: 'rgba(247,245,240,0.6)' }}>Tenant Rights Guide</Link>
              <Link href="/2-bedroom-houses-for-rent-bakersfield" className="text-xs hover:underline" style={{ color: 'rgba(247,245,240,0.6)' }}>2 Bedroom Rentals</Link>
              <Link href="/3-bedroom-houses-for-rent-bakersfield" className="text-xs hover:underline" style={{ color: 'rgba(247,245,240,0.6)' }}>3 Bedroom Rentals</Link>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}
