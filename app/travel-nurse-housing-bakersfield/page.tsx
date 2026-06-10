import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Travel Nurse Housing Bakersfield CA | Furnished Rentals 3–6 Month',
  description: 'Furnished short-term rentals in Bakersfield CA for travel nurses and healthcare travelers. 13-week and 6-month leases near Kern Medical, Adventist Health, and Dignity Health. Direct from landlords — no platform fees.',
  keywords: [
    'travel nurse housing Bakersfield CA',
    'furnished rental Bakersfield CA travel nurse',
    'traveling nurse housing Bakersfield',
    'short term furnished rental Bakersfield CA',
    'furnished finder Bakersfield CA',
    'travel healthcare housing Bakersfield',
    '3 month furnished rental Bakersfield',
    '13 week rental Bakersfield CA',
    'Kern Medical Center housing travel nurse',
    'Adventist Health Bakersfield housing',
    'Dignity Health Bakersfield nurse housing',
    'traveling doctor housing Bakersfield CA',
    'furnished house for rent Bakersfield',
    'corporate housing Bakersfield CA healthcare',
  ],
  alternates: { canonical: 'https://bakersfieldrentalhomes.com/travel-nurse-housing-bakersfield' },
  openGraph: {
    title: 'Travel Nurse Housing Bakersfield CA | Furnished Rentals 3–6 Month',
    description: 'Furnished homes for travel nurses and healthcare travelers in Bakersfield, CA. 13-week and 6-month leases near Kern Medical, Adventist Health, and Dignity Health.',
    url: 'https://bakersfieldrentalhomes.com/travel-nurse-housing-bakersfield',
    siteName: 'Bakersfield Rental Homes',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Travel nurse housing in Bakersfield CA' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Travel Nurse Housing Bakersfield CA | Furnished Rentals',
    description: 'Furnished 3–6 month rentals for travel nurses near Kern Medical, Adventist Health, and Dignity Health in Bakersfield, CA.',
    images: ['/opengraph-image'],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bakersfieldrentalhomes.com' },
    { '@type': 'ListItem', position: 2, name: 'Travel Nurse Housing Bakersfield', item: 'https://bakersfieldrentalhomes.com/travel-nurse-housing-bakersfield' },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does furnished travel nurse housing cost in Bakersfield CA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Furnished travel nurse housing in Bakersfield typically ranges from $1,800 to $3,200 per month depending on size, location, and amenity level. Most travel nurse housing stipends in the Bakersfield area range from $1,400 to $2,200 per week in total pay package, with housing stipends varying by agency and assignment. Many landlords price furnished rentals at 20–40% above the unfurnished market rate.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which hospitals in Bakersfield hire travel nurses?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bakersfield\'s major hospitals that regularly use travel nurses include Kern Medical Center (the county teaching hospital), Adventist Health Bakersfield, Dignity Health — Mercy & Memorial hospitals, and Bakersfield Heart Hospital. Kern Medical Center is Bakersfield\'s largest employer of travel nurses and is located in central Bakersfield.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I find furnished housing in Bakersfield as a travel nurse without using Furnished Finder?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Many Bakersfield landlords list directly on BakersfieldRentalHomes.com and are open to 13-week and 6-month furnished lease arrangements. Renting direct from a landlord eliminates platform fees charged by Furnished Finder or corporate housing companies. You can contact landlords directly to ask about furnishing and lease length flexibility.',
      },
    },
    {
      '@type': 'Question',
      name: 'What neighborhoods are closest to Kern Medical Center for travel nurses?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Kern Medical Center is located on Stockdale Highway in central-west Bakersfield. The closest rental neighborhoods are the Oleander-Sunset area (5–10 min), Southwest Bakersfield (10–15 min), and Northwest Bakersfield (15–20 min). Most of Bakersfield is within a 20-minute drive of any hospital due to the city\'s relatively compact layout and low traffic.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are Bakersfield landlords open to furnishing homes for travel nurses?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Many Bakersfield landlords are open to furnishing or partially furnishing homes for travel nurses, especially for 3–6 month lease terms. Landlords who furnish typically charge 20–40% above the unfurnished market rate, which is usually well within a travel nurse\'s housing stipend. Contact landlords directly through BakersfieldRentalHomes.com to discuss furnishing and lease terms.',
      },
    },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Travel Nurse & Healthcare Traveler Housing — Bakersfield CA',
  description: 'Furnished and unfurnished short-term rentals for travel nurses, travel doctors, and healthcare travelers in Bakersfield, CA. 13-week and 6-month leases near all major Bakersfield hospitals.',
  provider: { '@type': 'Organization', name: 'Bakersfield Brokers', url: 'https://bakersfieldrentalhomes.com' },
  areaServed: { '@type': 'City', name: 'Bakersfield', containedInPlace: { '@type': 'AdministrativeArea', name: 'Kern County' } },
  serviceType: 'Travel Nurse Housing / Short-Term Furnished Rental',
}

const HOSPITALS = [
  {
    name: 'Kern Medical Center',
    type: 'County Teaching Hospital',
    beds: '222 beds',
    location: 'Stockdale Hwy, Central Bakersfield',
    notes: 'Largest public hospital in Kern County. Level II trauma center. Heavy travel nurse usage across ICU, ER, med-surg, and specialty units.',
    driveTime: '5–20 min from most neighborhoods',
  },
  {
    name: 'Adventist Health Bakersfield',
    type: 'Non-profit Community Hospital',
    beds: '254 beds',
    location: 'Truxtun Ave, Central Bakersfield',
    notes: 'Active travel nurse program across multiple departments. Strong reputation for nurse culture.',
    driveTime: '10–20 min from most neighborhoods',
  },
  {
    name: 'Dignity Health — Mercy & Memorial',
    type: 'Regional Health System (2 campuses)',
    beds: '380+ beds combined',
    location: 'Multiple Bakersfield locations',
    notes: 'Two campuses with high travel nurse volume. Memorial is on 34th St; Mercy is in central Bakersfield.',
    driveTime: '10–25 min from most neighborhoods',
  },
  {
    name: 'Bakersfield Heart Hospital',
    type: 'Specialty Cardiac Hospital',
    beds: '47 beds',
    location: 'Fruitvale Ave, Northwest Bakersfield',
    notes: 'Boutique cardiac specialty hospital. Travel nurses in cardiac, telemetry, and cath lab roles.',
    driveTime: '5–15 min from Northwest Bakersfield',
  },
]

const FURNISHING_GUIDE = [
  { item: 'Bed frame + mattress (queen or king)', priority: 'Essential', note: 'Travel nurses work long shifts — sleep quality matters' },
  { item: 'Dresser or wardrobe', priority: 'Essential', note: 'They arrive with luggage, not moving boxes' },
  { item: 'Sofa or sectional', priority: 'Essential', note: 'Living space for 13 weeks of off-shift downtime' },
  { item: 'Kitchen table + 2–4 chairs', priority: 'Essential', note: 'Meal prepping is common — nurses eat at home often' },
  { item: 'Basic kitchen supplies', priority: 'Essential', note: 'Pots, pans, plates, utensils, coffee maker' },
  { item: 'Wi-Fi / internet', priority: 'Essential', note: 'Non-negotiable — nurses chart, study, and stream off shift' },
  { item: 'TV + TV stand', priority: 'Recommended', note: 'Standard expectation for furnished units' },
  { item: 'Washer & dryer (in-unit)', priority: 'Recommended', note: 'Scrubs need frequent washing — shared laundry is a dealbreaker for many' },
  { item: 'Desk or workspace', priority: 'Recommended', note: 'Many travelers study for certifications or do telehealth on days off' },
  { item: 'Bed linens & towels (starter set)', priority: 'Optional', note: 'Nice touch — many nurses travel with their own' },
  { item: 'Blackout curtains', priority: 'Optional', note: 'Night shift nurses sleep during the day — highly appreciated' },
]

const LANDLORD_BENEFITS = [
  { title: '20–40% Premium Rent', desc: 'Furnished short-term rentals command significantly above market rate. A 3-bed that rents for $1,600/mo unfurnished often fetches $2,100–$2,400/mo furnished to a travel nurse.' },
  { title: 'Low-Risk Tenants', desc: 'Travel nurses are employed by staffing agencies, background-checked, licensed professionals earning $70–$120k+ per assignment. Eviction risk is extremely low.' },
  { title: 'Repeat Bookings', desc: 'Nurses on back-to-back contracts at the same hospital often extend or return. Word travels fast in travel nurse communities — one good experience brings referrals.' },
  { title: 'Short Vacancy Cycles', desc: '13-week contracts end and new assignments begin constantly. With the right listing, your property rarely sits empty between placements.' },
  { title: 'Property Care', desc: 'Healthcare professionals are accustomed to clean, organized environments. Most travel nurses keep rentals in excellent condition.' },
  { title: 'Zillow & Direct Inquiries', desc: 'Travel nurses actively call landlords from Zillow and other platforms asking about furnishing. A landlord willing to furnish is immediately differentiated.' },
]

export default function TravelNurseHousingPage() {
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
            Bakersfield, CA · Furnished Short-Term Rentals · 13-Week & 6-Month Leases
          </p>
          <h1
            id="hero-heading"
            className="text-4xl md:text-5xl font-bold mb-5 max-w-3xl mx-auto"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}
          >
            Travel Nurse Housing in Bakersfield, CA
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-10" style={{ color: 'rgba(247,245,240,0.8)' }}>
            Furnished and unfurnished rentals for travel nurses and healthcare travelers near Kern Medical, Adventist Health, and Dignity Health — rented directly from local landlords.
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
              List for Travel Nurses
            </Link>
          </div>
        </section>

        {/* Two audiences */}
        <section className="py-16 px-6 md:px-10" style={{ backgroundColor: '#F7F5F0' }}>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* For nurses */}
            <div className="rounded-2xl p-8" style={{ backgroundColor: '#fff', border: '1px solid rgba(201,169,97,0.25)' }}>
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#C9A961' }}>For Travel Nurses & Healthcare Travelers</p>
              <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
                Find a Home in Bakersfield Without Platform Fees
              </h2>
              <ul className="space-y-3 mb-6 list-none p-0 m-0">
                {[
                  'Direct landlord contact — no Furnished Finder or corporate housing fees',
                  '13-week and 6-month leases accommodated',
                  'Many landlords open to furnishing — ask directly',
                  'Pet-friendly options available',
                  'All neighborhoods within 20 min of Kern Medical Center',
                  'Single-family homes with private yards — not apartment-style units',
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
              <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#F7F5F0' }}>
                Earn 20–40% More by Furnishing for Travel Nurses
              </h2>
              <ul className="space-y-3 mb-6 list-none p-0 m-0">
                {[
                  'Travel nurses call from Zillow asking if you\'ll furnish — say yes and charge more',
                  'Housing stipends run $1,500–$2,000+/week — nurses have the budget',
                  'Background-checked professionals employed by major staffing agencies',
                  'Defined 13-week contracts with clear end dates',
                  'Bakersfield hospitals employ hundreds of travel nurses at any given time',
                  'Low furnishing cost: $3,000–$6,000 pays off after one placement',
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

        {/* Hospitals */}
        <section className="py-16 px-6" style={{ backgroundColor: '#fff' }} aria-labelledby="hospitals-heading">
          <div className="max-w-3xl mx-auto">
            <h2 id="hospitals-heading" className="text-2xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              Bakersfield Hospitals That Hire Travel Nurses
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: '#444' }}>
              Bakersfield's hospital system is larger than most people expect for a city of its size. Kern County's population of nearly one million — spread across a huge geographic area — creates consistent demand for healthcare workers, which drives steady travel nurse assignments year-round.
            </p>
            <div className="space-y-5">
              {HOSPITALS.map(h => (
                <div key={h.name} className="rounded-2xl p-6" style={{ backgroundColor: '#F7F5F0', border: '1px solid rgba(28,61,90,0.08)' }}>
                  <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
                    <h3 className="font-bold text-base" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>{h.name}</h3>
                    <span className="text-xs px-3 py-1 rounded-full font-semibold flex-shrink-0"
                      style={{ backgroundColor: 'rgba(201,169,97,0.15)', color: '#7d6019' }}>{h.beds}</span>
                  </div>
                  <p className="text-xs font-semibold mb-2" style={{ color: '#888' }}>{h.type} · {h.location}</p>
                  <p className="text-sm leading-relaxed mb-2" style={{ color: '#555' }}>{h.notes}</p>
                  <p className="text-xs font-semibold" style={{ color: '#1C3D5A' }}>Drive time: <span style={{ color: '#C9A961' }}>{h.driveTime}</span></p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Furnishing guide for landlords */}
        <section className="py-16 px-6" style={{ backgroundColor: '#F7F5F0' }} aria-labelledby="furnishing-heading">
          <div className="max-w-3xl mx-auto">
            <h2 id="furnishing-heading" className="text-2xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              What Travel Nurses Need: Furnishing Guide for Landlords
            </h2>
            <p className="text-sm leading-relaxed mb-7" style={{ color: '#444' }}>
              When a travel nurse calls from Zillow asking if you'll furnish — here's exactly what they need. A basic furnishing investment of $3,000–$6,000 can increase your monthly rent by $400–$800 and pay for itself within the first contract.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse" aria-label="Furnishing checklist for travel nurse rentals">
                <thead>
                  <tr style={{ backgroundColor: '#1C3D5A', color: '#F7F5F0' }}>
                    <th className="text-left p-3 font-semibold rounded-tl-lg">Item</th>
                    <th className="text-left p-3 font-semibold">Priority</th>
                    <th className="text-left p-3 font-semibold rounded-tr-lg">Why It Matters</th>
                  </tr>
                </thead>
                <tbody>
                  {FURNISHING_GUIDE.map((item, i) => (
                    <tr key={item.item} style={{ backgroundColor: i % 2 === 0 ? '#fff' : '#F7F5F0' }}>
                      <td className="p-3 font-medium text-xs" style={{ color: '#1C3D5A' }}>{item.item}</td>
                      <td className="p-3">
                        <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                          style={{
                            backgroundColor: item.priority === 'Essential' ? 'rgba(28,61,90,0.1)' : item.priority === 'Recommended' ? 'rgba(201,169,97,0.15)' : 'rgba(150,150,150,0.1)',
                            color: item.priority === 'Essential' ? '#1C3D5A' : item.priority === 'Recommended' ? '#7d6019' : '#888',
                          }}>
                          {item.priority}
                        </span>
                      </td>
                      <td className="p-3 text-xs" style={{ color: '#555' }}>{item.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 p-5 rounded-xl" style={{ backgroundColor: 'rgba(201,169,97,0.1)', border: '1px solid rgba(201,169,97,0.3)' }}>
              <p className="text-sm font-semibold mb-1" style={{ color: '#1C3D5A' }}>The ROI of furnishing</p>
              <p className="text-sm" style={{ color: '#444' }}>
                A 3-bedroom home furnished for ~$5,000 and rented to a travel nurse at $2,200/mo instead of $1,600/mo unfurnished earns an extra $600/mo — recovering the furnishing cost in under 9 months. After that, every travel nurse placement is pure premium.
              </p>
            </div>
          </div>
        </section>

        {/* Why landlords should target this market */}
        <section className="py-16 px-6" style={{ backgroundColor: '#fff' }} aria-labelledby="benefits-heading">
          <div className="max-w-3xl mx-auto">
            <h2 id="benefits-heading" className="text-2xl font-bold mb-8" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              Why Travel Nurses Are Great Tenants
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {LANDLORD_BENEFITS.map(b => (
                <div key={b.title} className="p-5 rounded-xl" style={{ backgroundColor: '#F7F5F0', border: '1px solid rgba(201,169,97,0.15)' }}>
                  <p className="font-bold text-sm mb-2" style={{ color: '#1C3D5A' }}>{b.title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: '#555' }}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Neighborhoods */}
        <section className="py-16 px-6" style={{ backgroundColor: '#F7F5F0' }} aria-labelledby="neighborhoods-heading">
          <div className="max-w-2xl mx-auto">
            <h2 id="neighborhoods-heading" className="text-2xl font-bold mb-5" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>
              Best Neighborhoods for Travel Nurses in Bakersfield
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#444' }}>
              Bakersfield is a compact city — most neighborhoods are within 20 minutes of any hospital. Here's what each area offers for healthcare travelers:
            </p>
            <div className="space-y-4">
              {[
                {
                  name: 'Oleander-Sunset',
                  slug: 'oleander-sunset',
                  distance: '5–10 min to Kern Medical',
                  desc: 'Quiet, tree-lined neighborhood close to the hospital corridor. Affordable rents and a calm environment — great for recovering from night shifts.',
                  rent: '$1,100–$1,700/mo unfurnished',
                },
                {
                  name: 'Northwest Bakersfield',
                  slug: 'northwest-bakersfield',
                  distance: '15–20 min to most hospitals',
                  desc: 'Safest and most modern neighborhood in Bakersfield. Newer homes, good grocery stores, and a suburban feel. Popular with travel nurses who prioritize comfort and safety.',
                  rent: '$1,400–$2,200/mo unfurnished',
                },
                {
                  name: 'Southwest Bakersfield',
                  slug: 'southwest-bakersfield',
                  distance: '10–15 min to most hospitals',
                  desc: 'Affordable, centrally located, with quick freeway access. Good value for nurses who want more space for less money.',
                  rent: '$1,200–$1,800/mo unfurnished',
                },
              ].map(n => (
                <div key={n.name} className="rounded-2xl p-5" style={{ backgroundColor: '#fff', border: '1px solid rgba(201,169,97,0.2)' }}>
                  <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                    <h3 className="font-bold text-base" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1C3D5A' }}>{n.name}</h3>
                    <span className="text-xs font-bold px-3 py-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor: 'rgba(28,61,90,0.08)', color: '#1C3D5A' }}>{n.distance}</span>
                  </div>
                  <p className="text-sm leading-relaxed mb-2" style={{ color: '#555' }}>{n.desc}</p>
                  <p className="text-xs font-semibold" style={{ color: '#C9A961' }}>{n.rent}</p>
                  <Link href={`/neighborhoods/${n.slug}`} className="mt-2 inline-block text-xs font-semibold hover:underline" style={{ color: '#1C3D5A' }}>
                    Neighborhood guide →
                  </Link>
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
              More Bakersfield Rental Resources
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                ['/listings', 'All Listings'],
                ['/insurance-housing-bakersfield', 'Insurance & ALE Housing'],
                ['/3-bedroom-houses-for-rent-bakersfield', '3 Bedroom Rentals'],
                ['/4-bedroom-houses-for-rent-bakersfield', '4 Bedroom Rentals'],
                ['/pet-friendly-rentals-bakersfield', 'Pet-Friendly Rentals'],
                ['/neighborhoods', 'Neighborhoods Guide'],
                ['/blog/average-rent-bakersfield-2026', 'Average Rent 2026'],
                ['/direct-landlord-rentals', 'Direct Landlord Rentals'],
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
            Have a Home Perfect for a Travel Nurse?
          </h2>
          <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: 'rgba(247,245,240,0.8)' }}>
            List your Bakersfield property and reach travel nurses directly — no platform fees, premium monthly rent.
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
