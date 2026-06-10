import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bakersfield Condors Player Housing | AHL Rentals for Hockey Players',
  description: 'Rental homes in Bakersfield CA for Bakersfield Condors players and AHL hockey professionals. Furnished and unfurnished houses for the 7-month season, flexible leases, direct from landlords. No broker fees.',
  keywords: [
    'Bakersfield Condors player housing',
    'AHL player housing Bakersfield CA',
    'hockey player housing Bakersfield',
    'Bakersfield Condors housing rental',
    'professional athlete housing Bakersfield CA',
    'furnished rental hockey player Bakersfield',
    'AHL housing Bakersfield California',
    'Condors hockey player rental home',
    'Edmonton Oilers affiliate housing Bakersfield',
    'short term rental Bakersfield hockey season',
  ],
  alternates: { canonical: 'https://bakersfieldrentalhomes.com/bakersfield-condors-player-housing' },
  openGraph: {
    title: 'Bakersfield Condors Player Housing | AHL Rentals',
    description: 'Rental homes for Bakersfield Condors players and AHL hockey professionals. Furnished options, flexible season leases, direct from local landlords.',
    url: 'https://bakersfieldrentalhomes.com/bakersfield-condors-player-housing',
    siteName: 'Bakersfield Rental Homes',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Bakersfield Condors player housing rentals' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bakersfield Condors Player Housing | AHL Rentals',
    description: 'Homes for Bakersfield Condors players — furnished, flexible season leases, direct from Bakersfield landlords.',
    images: ['/opengraph-image'],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bakersfieldrentalhomes.com' },
    { '@type': 'ListItem', position: 2, name: 'Condors Player Housing', item: 'https://bakersfieldrentalhomes.com/bakersfield-condors-player-housing' },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Where do Bakersfield Condors players live?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bakersfield Condors players typically rent homes in Northwest Bakersfield, Southwest Bakersfield, and areas within 15–20 minutes of Mechanics Bank Arena in downtown Bakersfield. Many players prefer single-family homes with private yards for the 7-month AHL season (October through April/May). Some players bring family members and prefer larger 3–4 bedroom homes.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long is the Bakersfield Condors hockey season?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The AHL regular season runs from October through April, with playoffs extending through May or June. Most Condors players need housing for 7 to 9 months depending on the team\'s playoff run and whether they get called up to or sent down from the Edmonton Oilers during the season.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do Bakersfield Condors players need furnished rentals?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Many Condors players — especially younger players on their first AHL assignment — prefer furnished homes because they travel light and don\'t own furniture. Players called up from junior hockey or recently signed from Europe often need a fully furnished home immediately. More established players with families sometimes prefer unfurnished homes where they can bring their own belongings.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much do AHL hockey players earn?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AHL player salaries range from approximately $55,000 to $70,000 per year at the league minimum, up to $150,000+ for veterans and players on two-way NHL/AHL contracts. Players on active two-way contracts with the Edmonton Oilers earn NHL-level salaries (often $750,000–$1M+) even while playing in Bakersfield. Housing budget is typically not a concern for most Condors players.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do Condors players find housing in Bakersfield?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Players and their agents typically search online platforms, ask teammates for recommendations, or work through the team\'s hockey operations staff. Landlords who have rented to Condors players before are often referred by word of mouth within the team. Listing on BakersfieldRentalHomes.com and noting athlete and season-lease flexibility helps landlords connect with players and agents directly.',
      },
    },
  ],
}

const SEASON_TIMELINE = [
  { month: 'September', event: 'Training camp & roster cuts — players assigned to Bakersfield need housing immediately' },
  { month: 'October', event: 'AHL regular season begins — all roster players need to be settled' },
  { month: 'Nov–Feb', event: 'Mid-season call-ups and send-downs — roster moves may require quick housing changes' },
  { month: 'March–April', event: 'Regular season winds down — playoff picture clarifies' },
  { month: 'May–June', event: 'Playoffs (if qualified) — season extends; some players vacate if eliminated' },
  { month: 'July–August', event: 'Off-season — some players stay in Bakersfield; others return home or sign elsewhere' },
]

const PLAYER_TYPES = [
  {
    type: 'Young First-Year AHL Player',
    profile: 'Recently drafted or signed, first professional season, 19–22 years old. Often comes from junior hockey in Canada or Europe.',
    housing: 'Needs a fully furnished home immediately. Usually alone or with one roommate (teammate). Prefers something close to the rink.',
    budget: '$1,400–$1,900/mo furnished',
  },
  {
    type: 'Veteran AHL Player',
    profile: 'Experienced AHL or minor league player, 25–32 years old. May be a career AHL player or a pro returning from injury.',
    housing: 'May be unfurnished or partially furnished. Often knows exactly what they want and moves quickly.',
    budget: '$1,600–$2,200/mo',
  },
  {
    type: 'Two-Way NHL/AHL Player',
    profile: 'On active contract with the Edmonton Oilers, assigned to Bakersfield. Could be called up or sent down during the season.',
    housing: 'Wants quality housing, may bring a partner or family. Comfortable with premium rent — NHL salary continues during AHL assignment.',
    budget: '$2,000–$3,000/mo furnished',
  },
  {
    type: 'Player with Family',
    profile: 'Married or has children. Partner and kids may or may not relocate depending on season length and call-up expectations.',
    housing: 'Needs 3–4 bedrooms, good school district, family-friendly neighborhood. Wants a real home, not a crash pad.',
    budget: '$1,800–$2,800/mo',
  },
]

export default function CondorsPlayerHousingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main id="main-content">

        {/* Hero */}
        <section
          className="relative py-24 px-6 text-center overflow-hidden"
          style={{ backgroundColor: '#1C3D5A' }}
          aria-labelledby="hero-heading"
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#C9A961' }}>
            Bakersfield, CA · AHL Hockey Season Rentals · Direct from Local Landlords
          </p>
          <h1
            id="hero-heading"
            className="text-4xl md:text-5xl font-bold mb-5 max-w-3xl mx-auto"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}
          >
            Housing for Bakersfield Condors Players
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-4" style={{ color: 'rgba(247,245,240,0.8)' }}>
            Furnished and unfurnished rental homes for AHL hockey players — flexible season leases, direct from Bakersfield landlords. No broker fees.
          </p>
          <p className="text-sm max-w-xl mx-auto mb-10" style={{ color: 'rgba(201,169,97,0.9)' }}>
            Bakersfield Condors · Edmonton Oilers AHL Affiliate · Mechanics Bank Arena
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/listings"
              className="px-7 py-3.5 rounded-full font-semibold text-sm tracking-wider uppercase transition-all hover:opacity-90"
              style={{ backgroundColor: '#C9A961', color: '#1C3D5A' }}
            >
              Browse Available Homes
            </Link>
            <Link
              href="/list"
              className="px-7 py-3.5 rounded-full font-semibold text-sm tracking-wider uppercase transition-all hover:opacity-90"
              style={{ backgroundColor: 'transparent', color: '#F7F5F0', border: '1px solid rgba(247,245,240,0.4)' }}
            >
              List Your Property
            </Link>
          </div>
        </section>

        {/* About the Condors */}
        <section className="py-14 px-6" style={{ backgroundColor: '#F7F5F0' }} aria-labelledby="about-heading">
          <div className="max-w-2xl mx-auto">
            <h2 id="about-heading" className="text-2xl font-bold mb-5" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              The Bakersfield Condors & the AHL Housing Need
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#444' }}>
              The Bakersfield Condors are the American Hockey League affiliate of the Edmonton Oilers — one of the NHL's most storied franchises. Every season, 20–25 professional hockey players relocate to Bakersfield from across North America and Europe to play at Mechanics Bank Arena in downtown Bakersfield.
            </p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#444' }}>
              These players need housing fast. Roster assignments happen quickly — sometimes with only days notice between being sent down from Edmonton and needing a home in Bakersfield. The team's hockey operations staff and player agents scramble to find quality rentals before the season starts in October.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: '#444' }}>
              Landlords who have rented to Condors players describe them as excellent tenants: respectful, clean, and financially reliable. Word travels fast in the locker room — a great landlord gets repeat business and referrals from teammates season after season.
            </p>

            <div className="mt-7 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: '20–25', label: 'Players per season' },
                { value: '7–9 mo', label: 'Season length' },
                { value: 'AHL', label: 'NHL\'s top development league' },
                { value: 'Oct–Jun', label: 'Housing needed' },
              ].map(s => (
                <div key={s.label} className="text-center p-4 rounded-xl" style={{ backgroundColor: '#fff', border: '1px solid rgba(201,169,97,0.2)' }}>
                  <p className="text-xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>{s.value}</p>
                  <p className="text-xs" style={{ color: '#595959' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Player types */}
        <section className="py-16 px-6" style={{ backgroundColor: '#fff' }} aria-labelledby="players-heading">
          <div className="max-w-3xl mx-auto">
            <h2 id="players-heading" className="text-2xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              Understanding Your Tenant: Types of Condors Players
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: '#444' }}>
              Not every Condors player has the same housing needs. Here's what to expect from each type:
            </p>
            <div className="space-y-5">
              {PLAYER_TYPES.map(p => (
                <div key={p.type} className="rounded-2xl p-6" style={{ backgroundColor: '#F7F5F0', border: '1px solid rgba(201,169,97,0.2)' }}>
                  <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                    <h3 className="font-bold text-base" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>{p.type}</h3>
                    <span className="text-xs font-bold px-3 py-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor: 'rgba(201,169,97,0.15)', color: '#7d6019' }}>{p.budget}</span>
                  </div>
                  <p className="text-xs mb-2"><span className="font-semibold" style={{ color: '#1C3D5A' }}>Profile: </span><span style={{ color: '#555' }}>{p.profile}</span></p>
                  <p className="text-xs"><span className="font-semibold" style={{ color: '#1C3D5A' }}>Housing needs: </span><span style={{ color: '#555' }}>{p.housing}</span></p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Season timeline */}
        <section className="py-16 px-6" style={{ backgroundColor: '#F7F5F0' }} aria-labelledby="timeline-heading">
          <div className="max-w-2xl mx-auto">
            <h2 id="timeline-heading" className="text-2xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              The AHL Season Calendar — When Players Need Housing
            </h2>
            <p className="text-sm leading-relaxed mb-7" style={{ color: '#444' }}>
              The AHL season follows a predictable calendar. Landlords who know this rhythm can time their property's availability to capture the September surge when roster assignments happen.
            </p>
            <div className="space-y-4">
              {SEASON_TIMELINE.map((item, i) => (
                <div key={item.month} className="flex gap-4">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: i === 0 || i === 1 ? '#1C3D5A' : 'rgba(28,61,90,0.15)', color: i === 0 || i === 1 ? '#C9A961' : '#1C3D5A' }}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </div>
                  <div className="pb-4 border-b w-full" style={{ borderColor: 'rgba(201,169,97,0.15)' }}>
                    <p className="font-bold text-sm mb-1" style={{ color: '#1C3D5A' }}>{item.month}</p>
                    <p className="text-xs leading-relaxed" style={{ color: '#555' }}>{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-5 rounded-xl" style={{ backgroundColor: 'rgba(201,169,97,0.1)', border: '1px solid rgba(201,169,97,0.3)' }}>
              <p className="text-sm font-semibold mb-1" style={{ color: '#1C3D5A' }}>Pro tip for landlords</p>
              <p className="text-sm" style={{ color: '#444' }}>
                List your property by <strong>August</strong> if you want to capture the early September rush when rosters are finalized. Players and agents are actively searching in the weeks before training camp. A property that's available and listed by late August rarely sits empty into October.
              </p>
            </div>
          </div>
        </section>

        {/* Why great tenants */}
        <section className="py-16 px-6" style={{ backgroundColor: '#fff' }} aria-labelledby="tenants-heading">
          <div className="max-w-3xl mx-auto">
            <h2 id="tenants-heading" className="text-2xl font-bold mb-8" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              Why Professional Hockey Players Make Excellent Tenants
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                {
                  title: 'Financially Reliable',
                  desc: 'AHL salaries start at $55,000/year minimum. Two-way NHL/AHL players earn significantly more. Agents handle finances — rent is never a concern.',
                },
                {
                  title: 'Professional Discipline',
                  desc: 'Hockey players maintain strict daily routines — practice, gym, recovery, sleep. Your home is a place to rest, not party. They need to perform at a professional level every night.',
                },
                {
                  title: 'Clean and Respectful',
                  desc: 'Athletes who\'ve lived in billet homes, hotels, and team housing throughout their careers know how to take care of a space. Property damage is extremely rare.',
                },
                {
                  title: 'Clear End Date',
                  desc: 'The season ends. Players know it, landlords know it. There\'s no indefinite tenancy — the lease has a natural conclusion built into the hockey calendar.',
                },
                {
                  title: 'Roster Word of Mouth',
                  desc: 'One great landlord experience spreads through the entire locker room. A player who had a good experience will recommend your property to a teammate the following season.',
                },
                {
                  title: 'Unique Experience',
                  desc: 'Renting to a professional athlete is something most landlords remember fondly. Many build genuine friendships with players who come back season after season.',
                },
              ].map(b => (
                <div key={b.title} className="p-5 rounded-xl" style={{ backgroundColor: '#F7F5F0', border: '1px solid rgba(201,169,97,0.15)' }}>
                  <p className="font-bold text-sm mb-2" style={{ color: '#1C3D5A' }}>{b.title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: '#555' }}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Neighborhoods */}
        <section className="py-14 px-6" style={{ backgroundColor: '#F7F5F0' }} aria-labelledby="neighborhoods-heading">
          <div className="max-w-2xl mx-auto">
            <h2 id="neighborhoods-heading" className="text-xl font-bold mb-5" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              Neighborhoods Near Mechanics Bank Arena
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#444' }}>
              Mechanics Bank Arena is located in downtown Bakersfield. Players typically want to be within 15–20 minutes. Here's what each area offers:
            </p>
            <div className="space-y-4">
              {[
                { name: 'Oleander-Sunset', slug: 'oleander-sunset', drive: '10–15 min', note: 'Quiet, central, tree-lined streets. Popular with veteran players who want calm and proximity.' },
                { name: 'Southwest Bakersfield', slug: 'southwest-bakersfield', drive: '15–20 min', note: 'More affordable, larger homes. Good for players with families needing more space.' },
                { name: 'Northwest Bakersfield', slug: 'northwest-bakersfield', drive: '20–25 min', note: 'Safest area, newest homes. Popular with two-way players and families who want a premium environment.' },
              ].map(n => (
                <div key={n.name} className="flex items-start justify-between gap-4 p-4 rounded-xl" style={{ backgroundColor: '#fff', border: '1px solid rgba(28,61,90,0.1)' }}>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: '#1C3D5A' }}>{n.name}</p>
                    <p className="text-xs mt-1" style={{ color: '#555' }}>{n.note}</p>
                    <Link href={`/neighborhoods/${n.slug}`} className="text-xs font-semibold hover:underline mt-1 inline-block" style={{ color: '#C9A961' }}>
                      Neighborhood guide →
                    </Link>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full flex-shrink-0"
                    style={{ backgroundColor: 'rgba(28,61,90,0.08)', color: '#1C3D5A' }}>{n.drive}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-6" style={{ backgroundColor: '#fff' }} aria-labelledby="faq-heading">
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
        <section className="py-12 px-6" style={{ backgroundColor: '#F7F5F0' }}>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-lg font-bold mb-5" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              More Specialty Rental Resources
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                ['/travel-nurse-housing-bakersfield', 'Travel Nurse Housing'],
                ['/insurance-housing-bakersfield', 'Insurance & ALE Housing'],
                ['/listings', 'All Listings'],
                ['/3-bedroom-houses-for-rent-bakersfield', '3 Bedroom Rentals'],
                ['/4-bedroom-houses-for-rent-bakersfield', '4 Bedroom Rentals'],
                ['/neighborhoods', 'Neighborhoods Guide'],
                ['/list', 'List Your Property'],
              ].map(([href, label]) => (
                <Link key={href} href={href}
                  className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-80"
                  style={{ backgroundColor: '#fff', color: '#1C3D5A', border: '1px solid rgba(28,61,90,0.15)' }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 text-center" style={{ backgroundColor: '#1C3D5A' }}>
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}>
            Ready to Host a Condors Player?
          </h2>
          <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: 'rgba(247,245,240,0.8)' }}>
            List your Bakersfield home and connect directly with players and agents. No broker fees — keep the full rent.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/list"
              className="px-8 py-4 rounded-full font-semibold text-sm tracking-wider uppercase transition-all hover:opacity-90"
              style={{ backgroundColor: '#C9A961', color: '#1C3D5A' }}>
              List Your Property
            </Link>
            <Link href="/listings"
              className="px-8 py-4 rounded-full font-semibold text-sm tracking-wider uppercase transition-all hover:opacity-90"
              style={{ backgroundColor: 'transparent', color: '#F7F5F0', border: '1px solid rgba(247,245,240,0.4)' }}>
              Browse Available Homes
            </Link>
          </div>
        </section>

      </main>
    </>
  )
}
